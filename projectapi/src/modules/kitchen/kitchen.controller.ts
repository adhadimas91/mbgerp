import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { KitchenService } from './kitchen.service';
import { BatchStatus, CookingLine } from '@prisma/client';

@ApiTags('Dapur Sentral SPPG')
@Controller('kitchen')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) {}

  @Get('units')
  @ApiOperation({ summary: 'Daftar unit SPPG (Sentra Produksi Pangan Gizi)' })
  async getKitchenUnits() {
    return this.kitchenService.getKitchenUnits();
  }

  @Get('batches')
  @ApiOperation({ summary: 'Daftar batch produksi, lini masak & status' })
  async getBatches(@Query('status') status?: BatchStatus, @Query('cookingLine') cookingLine?: CookingLine) {
    return this.kitchenService.getProductionBatches({ status, cookingLine });
  }

  @Get('batches/:id')
  @ApiOperation({ summary: 'Detail batch produksi, log CCP HACCP & uji mutu organoleptik' })
  async getBatch(@Param('id') id: string) {
    return this.kitchenService.getBatch(id);
  }

  @Get('requisitions')
  @ApiOperation({ summary: 'Daftar voucher permintaan tambahan bahan baku (Kitchen Requisition)' })
  async getRequisitions() {
    return this.kitchenService.getRequisitions();
  }
}
