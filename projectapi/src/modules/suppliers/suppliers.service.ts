import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SupplierStatus, SupplierTier } from '@prisma/client';

@Injectable()
export class SuppliersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params?: { status?: SupplierStatus; tier?: SupplierTier; search?: string }) {
    const where: any = {};
    if (params?.status) where.status = params.status;
    if (params?.tier) where.tier = params.tier;
    if (params?.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { code: { contains: params.search, mode: 'insensitive' } },
        { category: { contains: params.search, mode: 'insensitive' } },
        { city: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.supplier.findMany({
      where,
      include: {
        certificates: true,
        _count: { select: { products: true, purchaseOrders: true, invoices: true } },
      },
      orderBy: { ratingScore: 'desc' },
    });
  }

  async findOne(id: string) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
      include: {
        certificates: true,
        products: { include: { product: true } },
        purchaseOrders: { take: 5, orderBy: { orderDate: 'desc' } },
        invoices: { take: 5, orderBy: { createdAt: 'desc' } },
      },
    });

    if (!supplier) {
      throw new NotFoundException(`Supplier dengan ID ${id} tidak ditemukan`);
    }

    return supplier;
  }

  async getScorecardSummary() {
    const suppliers = await this.prisma.supplier.findMany({
      select: {
        id: true,
        code: true,
        name: true,
        tier: true,
        ratingScore: true,
        onTimeDeliveryRate: true,
        qualityAcceptanceRate: true,
        iso22000Certified: true,
        halalCertified: true,
      },
    });

    const totalSuppliers = suppliers.length;
    const avgRating = totalSuppliers > 0 ? suppliers.reduce((acc, s) => acc + s.ratingScore, 0) / totalSuppliers : 0;
    const avgOtd = totalSuppliers > 0 ? suppliers.reduce((acc, s) => acc + s.onTimeDeliveryRate, 0) / totalSuppliers : 0;
    const avgQar = totalSuppliers > 0 ? suppliers.reduce((acc, s) => acc + s.qualityAcceptanceRate, 0) / totalSuppliers : 0;

    return {
      overview: {
        totalSuppliers,
        avgRatingScore: Number(avgRating.toFixed(2)),
        avgOnTimeDeliveryRate: Number(avgOtd.toFixed(1)),
        avgQualityAcceptanceRate: Number(avgQar.toFixed(1)),
        platinumTierCount: suppliers.filter((s) => s.tier === 'PLATINUM').length,
        goldTierCount: suppliers.filter((s) => s.tier === 'GOLD').length,
      },
      suppliers,
    };
  }
}
