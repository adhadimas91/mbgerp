import apiClient from "../lib/api";

export interface StockMovementPayload {
  productId: string;
  type: "IN" | "OUT" | "ADJUST";
  quantity: number;
  temperature?: number;
  batchNumber?: string;
  notes?: string;
  referenceNo?: string;
}

export const inventoryService = {
  getStocks: async (params?: { category?: string; status?: string; search?: string }) => {
    const res = await apiClient.get("/inventory/stocks", { params });
    return res.data?.data || res.data;
  },

  getProducts: async () => {
    const res = await apiClient.get("/inventory/products");
    return res.data?.data || res.data;
  },

  recordMovement: async (payload: StockMovementPayload) => {
    const res = await apiClient.post("/inventory/movements", payload);
    return res.data?.data || res.data;
  },

  getMovements: async (params?: { limit?: number }) => {
    const res = await apiClient.get("/inventory/movements", { params });
    return res.data?.data || res.data;
  },

  getColdChainSensors: async () => {
    const res = await apiClient.get("/inventory/cold-chain");
    return res.data?.data || res.data;
  },

  getAlerts: async () => {
    const res = await apiClient.get("/inventory/alerts");
    return res.data?.data || res.data;
  },
};

export default inventoryService;
