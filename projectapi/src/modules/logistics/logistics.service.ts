import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ShipmentStatus } from '@prisma/client';

@Injectable()
export class LogisticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDistributionPoints(params?: { district?: string; search?: string }) {
    const where: any = {};
    if (params?.district) where.district = params.district;
    if (params?.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { code: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.distributionPoint.findMany({
      where,
      orderBy: { name: 'asc' },
    });
  }

  async getShipments(params?: { status?: ShipmentStatus; search?: string }) {
    const where: any = {};
    if (params?.status) where.status = params.status;
    if (params?.search) {
      where.OR = [
        { waybillNumber: { contains: params.search, mode: 'insensitive' } },
        { distributionPoint: { name: { contains: params.search, mode: 'insensitive' } } },
      ];
    }

    return this.prisma.shipment.findMany({
      where,
      include: {
        distributionPoint: true,
        vehicle: true,
        productionBatch: { select: { batchNumber: true, recipe: { select: { name: true } } } },
        deliveryProof: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getShipment(id: string) {
    const shipment = await this.prisma.shipment.findUnique({
      where: { id },
      include: {
        distributionPoint: true,
        vehicle: true,
        productionBatch: { include: { recipe: true, kitchenUnit: true } },
        deliveryProof: true,
        driver: { select: { fullName: true, phone: true } },
      },
    });

    if (!shipment) {
      throw new NotFoundException(`Pengiriman dengan ID ${id} tidak ditemukan`);
    }

    return shipment;
  }

  async getFleetVehicles() {
    return this.prisma.fleetVehicle.findMany({
      include: {
        _count: { select: { shipments: true } },
      },
    });
  }
}
