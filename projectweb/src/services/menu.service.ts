import apiClient from "../lib/api";

export interface RecipePayload {
  name: string;
  category: string;
  targetGroup: string;
  caloriesKcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
  estimatedCostPerPortion: number;
  ingredients: {
    productId?: string;
    ingredientName: string;
    quantityGrams: number;
    cost: number;
  }[];
}

export const menuService = {
  getRecipes: async (params?: { category?: string; targetGroup?: string }) => {
    const res = await apiClient.get("/menu/recipes", { params });
    return res.data?.data || res.data;
  },

  createRecipe: async (payload: RecipePayload) => {
    const res = await apiClient.post("/menu/recipes", payload);
    return res.data?.data || res.data;
  },

  getDailyMenus: async (params?: { startDate?: string; endDate?: string }) => {
    const res = await apiClient.get("/menu/daily-menus", { params });
    return res.data?.data || res.data;
  },

  analyzePortionCost: async (recipeId: string) => {
    const res = await apiClient.get(`/menu/recipes/${recipeId}/cost-analysis`);
    return res.data?.data || res.data;
  },
};

export default menuService;
