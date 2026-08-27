import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BatchStatus, CookingLine } from '@prisma/client';

@Injectable()
export class KitchenService {
  constructor(private readonly prisma: PrismaService) {}

  async getKitchenUnits() {
    return this.prisma.kitchenUnit.findMany({
      include: {
        warehouse: true,
        _count: { select: { batches: true, employees: true, routes: true } },
      },
    });
  }

  async getProductionBatches(params?: { status?: BatchStatus; cookingLine?: CookingLine }) {
    const where: any = {};
    if (params?.status) where.status = params.status;
    if (params?.cookingLine) where.cookingLine = params.cookingLine;

    return this.prisma.productionBatch.findMany({
      where,
      include: {
        recipe: true,
        kitchenUnit: { select: { id: true, name: true, code: true } },
        ccpLogs: true,
        qcTests: { include: { inspector: { select: { fullName: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getBatch(id: string) {
    const batch = await this.prisma.productionBatch.findUnique({
      where: { id },
      include: {
        recipe: { include: { ingredients: { include: { product: true } } } },
        kitchenUnit: true,
        ccpLogs: { orderBy: { timestamp: 'desc' } },
        qcTests: { include: { inspector: { select: { fullName: true, role: true } } } },
        shipments: { include: { distributionPoint: true, vehicle: true } },
      },
    });

    if (!batch) {
      throw new NotFoundException(`Batch produksi dengan ID ${id} tidak ditemukan`);
    }

    return batch;
  }

  async getRequisitions() {
    return this.prisma.kitchenRequisition.findMany({
      include: {
        kitchenUnit: { select: { id: true, name: true, code: true } },
        items: { include: { product: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
