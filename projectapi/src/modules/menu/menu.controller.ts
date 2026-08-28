import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MenuService } from './menu.service';
import { AgeGroup } from '@prisma/client';

@ApiTags('Menu & Nutrisi AKG')
@Controller('menu')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('recipes')
  @ApiOperation({ summary: 'Daftar formula resep & standar makronutrisi AKG' })
  async getRecipes(@Query('ageGroup') ageGroup?: AgeGroup, @Query('search') search?: string) {
    return this.menuService.getRecipes({ ageGroup, search });
  }

  @Get('recipes/:id')
  @ApiOperation({ summary: 'Detail resep, takaran bahan & instruksi masak' })
  async getRecipe(@Param('id') id: string) {
    return this.menuService.getRecipe(id);
  }

  @Get(['daily-plans', 'daily-menus'])
  @ApiOperation({ summary: 'Kalender perencanaan siklus menu harian' })
  async getDailyMenus() {
    return this.menuService.getDailyMenus();
  }

  @Get('cost-analysis')
  @ApiOperation({ summary: 'Analisis HPP biaya porsi terhadap pagu nasional Rp 15.000' })
  async getCostAnalysis() {
    return this.menuService.getCostAnalysisSummary();
  }
}
