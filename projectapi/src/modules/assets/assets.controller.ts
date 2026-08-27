import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AssetsService } from './assets.service';
import { AssetCondition } from '@prisma/client';

@ApiTags('Manajemen Aset')
@Controller('assets')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get()
  @ApiOperation({ summary: 'Master data aset tetap dapur & armada MBG' })
  async getAssets(
    @Query('category') category?: string,
    @Query('condition') condition?: AssetCondition,
    @Query('search') search?: string,
  ) {
    return this.assetsService.getAssets({ category, condition, search });
  }

  @Get('maintenance')
  @ApiOperation({ summary: 'Jadwal servis berkala & pemeliharaan mesin/kendaraan' })
  async getMaintenance() {
    return this.assetsService.getMaintenanceSchedule();
  }

  @Get('hygiene-inspections')
  @ApiOperation({ summary: 'Log inspeksi kelaikan sanitasi alat masak ISO 22000' })
  async getHygieneInspections() {
    return this.assetsService.getHygieneInspections();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detail spesifikasi aset, riwayat servis & inspeksi' })
  async getAsset(@Param('id') id: string) {
    return this.assetsService.getAsset(id);
  }
}
