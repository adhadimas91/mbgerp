import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FinanceService } from './finance.service';
import { BudgetCategory, PaymentStatus } from '@prisma/client';

@ApiTags('Finansial & Anggaran')
@Controller('finance')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Ringkasan eksekutif realisasi anggaran & serapan APBN' })
  async getOverview() {
    return this.financeService.getFinancialOverview();
  }

  @Get('budgets')
  @ApiOperation({ summary: 'Daftar pagu DPA per wilayah & rincian alokasi pos belanja' })
  async getBudgets(@Query('year') year?: number) {
    return this.financeService.getBudgets(year);
  }

  @Get('expenditures')
  @ApiOperation({ summary: 'Daftar pencatatan belanja, kuitansi BKK & potongan pajak' })
  async getExpenditures(
    @Query('category') category?: BudgetCategory,
    @Query('status') status?: PaymentStatus,
    @Query('search') search?: string,
  ) {
    return this.financeService.getExpenditures({ category, status, search });
  }

  @Get('invoices')
  @ApiOperation({ summary: 'Daftar tagihan supplier & status validasi 3-Way Match' })
  async getInvoices() {
    return this.financeService.getInvoices();
  }

  @Get('payments')
  @ApiOperation({ summary: 'Histori pencairan dana SP2D & voucher bank BPV' })
  async getPayments() {
    return this.financeService.getPayments();
  }
}
