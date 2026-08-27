import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BudgetCategory, PaymentStatus } from '@prisma/client';

@Injectable()
export class FinanceService {
  constructor(private readonly prisma: PrismaService) {}

  async getBudgets(year?: number) {
    const fiscalYear = year ? Number(year) : 2026;
    return this.prisma.budget.findMany({
      where: { fiscalYear },
      include: {
        allocations: true,
      },
    });
  }

  async getExpenditures(params?: { category?: BudgetCategory; status?: PaymentStatus; search?: string }) {
    const where: any = {};
    if (params?.category) where.category = params.category;
    if (params?.status) where.status = params.status;
    if (params?.search) {
      where.OR = [
        { receiptNumber: { contains: params.search, mode: 'insensitive' } },
        { description: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.expenditure.findMany({
      where,
      include: {
        budget: { select: { dpaCode: true, regionName: true } },
        creator: { select: { fullName: true } },
        approver: { select: { fullName: true } },
      },
      orderBy: { transactedAt: 'desc' },
    });
  }

  async getInvoices() {
    return this.prisma.supplierInvoice.findMany({
      include: {
        supplier: true,
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPayments() {
    return this.prisma.payment.findMany({
      include: {
        invoice: { include: { supplier: true } },
      },
      orderBy: { paidAt: 'desc' },
    });
  }

  async getFinancialOverview() {
    const budgets = await this.prisma.budget.findMany({ include: { allocations: true } });
    const expenditures = await this.prisma.expenditure.findMany();

    const totalPagu = budgets.reduce((acc, b) => acc + b.totalCeilingPagu, 0);
    const totalRealized = budgets.reduce((acc, b) => acc + b.realizedAmount, 0);
    const totalRemaining = budgets.reduce((acc, b) => acc + b.remainingAmount, 0);
    const realizationRate = totalPagu > 0 ? Number(((totalRealized / totalPagu) * 100).toFixed(2)) : 0;

    return {
      summary: {
        fiscalYear: 2026,
        totalCeilingPagu: totalPagu,
        totalRealized: totalRealized,
        totalRemaining: totalRemaining,
        realizationRatePercentage: realizationRate,
        totalTransactions: expenditures.length,
      },
      budgets,
    };
  }
}
