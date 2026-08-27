import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductCategory, StorageType } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getStocks(params?: { category?: ProductCategory; storageType?: StorageType; search?: string }) {
    const where: any = {};
    if (params?.category) where.product = { category: params.category };
    if (params?.storageType) where.product = { ...where.product, storageType: params.storageType };
    if (params?.search) {
      where.product = {
        ...where.product,
        OR: [
          { name: { contains: params.search, mode: 'insensitive' } },
          { sku: { contains: params.search, mode: 'insensitive' } },
        ],
      };
    }

    return this.prisma.stock.findMany({
      where,
      include: {
        product: true,
        warehouse: { select: { id: true, code: true, name: true } },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getMovements(limit = 20) {
    return this.prisma.stockMovement.findMany({
      take: limit,
      include: {
        product: true,
        warehouse: { select: { id: true, code: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getColdChainSensors() {
    return this.prisma.coldChainSensor.findMany({
      include: {
        warehouse: { select: { id: true, name: true, code: true } },
        readings: { take: 10, orderBy: { timestamp: 'desc' } },
      },
    });
  }

  async getAlerts() {
    const stocks = await this.prisma.stock.findMany({
      include: { product: true, warehouse: true },
    });

    const lowStocks = stocks.filter((s) => s.quantity <= s.product.minStockThreshold);
    const expiringSoon = stocks.filter((s) => {
      if (!s.expiryDate) return false;
      const daysLeft = (s.expiryDate.getTime() - Date.now()) / (1000 * 3600 * 24);
      return daysLeft >= 0 && daysLeft <= 7;
    });

    return {
      summary: {
        totalItems: stocks.length,
        lowStockCount: lowStocks.length,
        expiringSoonCount: expiringSoon.length,
      },
      lowStocks,
      expiringSoon,
    };
  }
}
