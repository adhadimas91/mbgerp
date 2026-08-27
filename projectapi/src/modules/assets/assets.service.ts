import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AssetCondition } from '@prisma/client';

@Injectable()
export class AssetsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAssets(params?: { category?: string; condition?: AssetCondition; search?: string }) {
    const where: any = {};
    if (params?.category) where.category = params.category;
    if (params?.condition) where.condition = params.condition;
    if (params?.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { assetCode: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.fixedAsset.findMany({
      where,
      include: {
        kitchenUnit: { select: { id: true, name: true, code: true } },
        _count: { select: { maintenanceOrders: true, inspections: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAsset(id: string) {
    const asset = await this.prisma.fixedAsset.findUnique({
      where: { id },
      include: {
        kitchenUnit: true,
        maintenanceOrders: { orderBy: { scheduledDate: 'desc' } },
        inspections: { orderBy: { inspectedAt: 'desc' } },
      },
    });

    if (!asset) {
      throw new NotFoundException(`Aset dengan ID ${id} tidak ditemukan`);
    }

    return asset;
  }

  async getMaintenanceSchedule() {
    return this.prisma.assetMaintenance.findMany({
      include: {
        asset: true,
      },
      orderBy: { scheduledDate: 'asc' },
    });
  }

  async getHygieneInspections() {
    return this.prisma.hygieneInspection.findMany({
      include: {
        asset: true,
        inspector: { select: { fullName: true, role: true } },
      },
      orderBy: { inspectedAt: 'desc' },
    });
  }
}
