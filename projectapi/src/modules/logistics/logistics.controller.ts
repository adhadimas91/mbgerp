import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LogisticsService } from './logistics.service';
import { ShipmentStatus } from '@prisma/client';

@ApiTags('Logistik & Distribusi')
@Controller('logistics')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class LogisticsController {
  constructor(private readonly logisticsService: LogisticsService) {}

  @Get('distribution-points')
  @ApiOperation({ summary: 'Master data titik distribusi (Sekolah sasaran MBG) & koordinat GIS' })
  async getPoints(@Query('district') district?: string, @Query('search') search?: string) {
    return this.logisticsService.getDistributionPoints({ district, search });
  }

  @Get('shipments')
  @ApiOperation({ summary: 'Daftar pengiriman makanan bergizi & status resi waybill' })
  async getShipments(@Query('status') status?: ShipmentStatus, @Query('search') search?: string) {
    return this.logisticsService.getShipments({ status, search });
  }

  @Get('shipments/:id')
  @ApiOperation({ summary: 'Detail pengiriman, timeline tracking & bukti terima (PoD)' })
  async getShipment(@Param('id') id: string) {
    return this.logisticsService.getShipment(id);
  }

  @Get('fleet')
  @ApiOperation({ summary: 'Daftar armada kendaraan boks berpendingin / pemanas' })
  async getFleet() {
    return this.logisticsService.getFleetVehicles();
  }
}
