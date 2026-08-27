import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AgeGroup } from '@prisma/client';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async getRecipes(params?: { ageGroup?: AgeGroup; search?: string }) {
    const where: any = {};
    if (params?.ageGroup) where.targetAgeGroup = params.ageGroup;
    if (params?.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { code: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.recipe.findMany({
      where,
      include: {
        ingredients: { include: { product: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getRecipe(id: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: {
        ingredients: { include: { product: true } },
      },
    });

    if (!recipe) {
      throw new NotFoundException(`Resep dengan ID ${id} tidak ditemukan`);
    }

    return recipe;
  }

  async getDailyMenus() {
    return this.prisma.dailyMenu.findMany({
      include: {
        kitchenUnit: { select: { id: true, name: true, code: true } },
        recipe: {
          include: {
            ingredients: { include: { product: true } },
          },
        },
      },
      orderBy: { serveDate: 'asc' },
    });
  }

  async getCostAnalysisSummary() {
    const recipes = await this.prisma.recipe.findMany({
      include: { ingredients: { include: { product: true } } },
    });

    const paguCeiling = 15000;
    const recipeStats = recipes.map((r) => {
      const margin = paguCeiling - r.standardCostPorsi;
      const marginPercent = Number(((margin / paguCeiling) * 100).toFixed(1));
      return {
        id: r.id,
        code: r.code,
        name: r.name,
        targetAgeGroup: r.targetAgeGroup,
        costPorsi: r.standardCostPorsi,
        paguBgn: paguCeiling,
        efficiencyMargin: margin,
        efficiencyPercent: marginPercent,
        calories: r.targetCaloriesKcal,
        protein: r.targetProteinG,
      };
    });

    return {
      nationalPaguPerPortion: paguCeiling,
      totalRecipes: recipes.length,
      averageCost: recipes.length > 0 ? Number((recipes.reduce((acc, r) => acc + r.standardCostPorsi, 0) / recipes.length).toFixed(0)) : 0,
      recipeStats,
    };
  }
}
