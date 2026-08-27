import apiClient from "../lib/api";

export interface AssetPayload {
  code: string;
  name: string;
  category: string;
  kitchenUnitId?: string;
  acquisitionDate: string;
  acquisitionCost: number;
  economicLifeMonths: number;
  currentValue: number;
  condition: "EXCELLENT" | "GOOD" | "FAIR" | "POOR";
  location: string;
}

export const assetService = {
  getAssets: async (params?: { category?: string; condition?: string; search?: string }) => {
    const res = await apiClient.get("/assets", { params });
    return res.data?.data || res.data;
  },

  createAsset: async (payload: AssetPayload) => {
    const res = await apiClient.post("/assets", payload);
    return res.data?.data || res.data;
  },

  getMaintenanceOrders: async (params?: { status?: string }) => {
    const res = await apiClient.get("/assets/maintenance", { params });
    return res.data?.data || res.data;
  },

  createMaintenanceOrder: async (payload: { assetId: string; type: string; description: string; estimatedCost: number }) => {
    const res = await apiClient.post("/assets/maintenance", payload);
    return res.data?.data || res.data;
  },

  getHygieneInspections: async () => {
    const res = await apiClient.get("/assets/hygiene-inspections");
    return res.data?.data || res.data;
  },

  createHygieneInspection: async (payload: { kitchenUnitId: string; inspectorName: string; score: number; passed: boolean; findings?: any[] }) => {
    const res = await apiClient.post("/assets/hygiene-inspections", payload);
    return res.data?.data || res.data;
  },
};

export default assetService;
