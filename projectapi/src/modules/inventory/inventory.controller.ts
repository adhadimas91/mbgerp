import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { InventoryService } from './inventory.service';
import { ProductCategory, StorageType } from '@prisma/client';

@ApiTags('Gudang & Stok')
@Controller('inventory')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('stocks')
  @ApiOperation({ summary: 'Master data stok bahan baku gudang & buffer' })
  async getStocks(
    @Query('category') category?: ProductCategory,
    @Query('storageType') storageType?: StorageType,
    @Query('search') search?: string,
  ) {
    return this.inventoryService.getStocks({ category, storageType, search });
  }

  @Get('movements')
  @ApiOperation({ summary: 'Histori mutasi stok masuk (IN) dan keluar (OUT)' })
  async getMovements(@Query('limit') limit?: number) {
    return this.inventoryService.getMovements(limit ? Number(limit) : 20);
  }

  @Get('cold-chain')
  @ApiOperation({ summary: 'Telemetri sensor IoT suhu & kelembaban cold storage' })
  async getColdChain() {
    return this.inventoryService.getColdChainSensors();
  }

  @Get('alerts')
  @ApiOperation({ summary: 'Peringatan dini stok menipis (ROP) & mendekati kedaluwarsa' })
  async getAlerts() {
    return this.inventoryService.getAlerts();
  }
}
