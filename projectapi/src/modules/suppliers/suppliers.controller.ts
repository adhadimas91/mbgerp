import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SuppliersService } from './suppliers.service';
import { SupplierStatus, SupplierTier } from '@prisma/client';

@ApiTags('Supplier & Vendor')
@Controller('suppliers')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get()
  @ApiOperation({ summary: 'Daftar seluruh supplier rekanan MBG' })
  async findAll(
    @Query('status') status?: SupplierStatus,
    @Query('tier') tier?: SupplierTier,
    @Query('search') search?: string,
  ) {
    return this.suppliersService.findAll({ status, tier, search });
  }

  @Get(['scorecard', 'scorecards'])
  @ApiOperation({ summary: 'Ringkasan evaluasi skor KPI performa & mutu vendor' })
  async getScorecard() {
    return this.suppliersService.getScorecardSummary();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detail lengkap supplier, sertifikat, produk & histori PO' })
  async findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(id);
  }
}
