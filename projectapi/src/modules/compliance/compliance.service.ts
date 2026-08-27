import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ComplianceService {
  constructor(private readonly prisma: PrismaService) {}

  async getAuditLogs(params?: { entityName?: string; action?: string; limit?: number }) {
    const where: any = {};
    if (params?.entityName) where.entityName = params.entityName;
    if (params?.action) where.action = params.action;

    return this.prisma.auditLog.findMany({
      where,
      take: params?.limit ? Number(params.limit) : 50,
      include: {
        user: { select: { fullName: true, role: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getQualityIncidents() {
    return this.prisma.qualityIncident.findMany({
      orderBy: { occurredAt: 'desc' },
    });
  }

  async getIsoComplianceOverview() {
    const incidents = await this.prisma.qualityIncident.findMany();
    const openIncidents = incidents.filter((i) => i.status !== 'CLOSED');

    return {
      standards: [
        { code: 'ISO_22000_2018', name: 'Sistem Manajemen Keamanan Pangan & HACCP', status: 'COMPLIANT', score: 98.4 },
        { code: 'ISO_9001_2015', name: 'Sistem Manajemen Mutu Operasional SPPG', status: 'COMPLIANT', score: 97.8 },
        { code: 'ISO_27001_2022', name: 'Keamanan Informasi, RBAC & Audit Trail Forensik', status: 'COMPLIANT', score: 99.1 },
        { code: 'HAS_23000', name: 'Sertifikasi Jaminan Produk Halal (SJPH BPJPH)', status: 'COMPLIANT', score: 100.0 },
      ],
      incidentsSummary: {
        totalIncidents: incidents.length,
        openIncidentsCount: openIncidents.length,
        criticalCount: incidents.filter((i) => i.severity === 'CRITICAL').length,
      },
    };
  }
}
