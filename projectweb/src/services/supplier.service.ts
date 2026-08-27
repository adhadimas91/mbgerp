import apiClient from "../lib/api";

export interface SupplierPayload {
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  nib?: string;
  npwp?: string;
  dailyCapacity?: string;
  certifications?: string[];
  status?: "APPROVED" | "PENDING" | "REJECTED";
}

export const supplierService = {
  getAll: async (params?: { search?: string; status?: string; category?: string }) => {
    const res = await apiClient.get("/suppliers", { params });
    return res.data?.data || res.data;
  },

  getById: async (id: string) => {
    const res = await apiClient.get(`/suppliers/${id}`);
    return res.data?.data || res.data;
  },

  create: async (data: SupplierPayload) => {
    const res = await apiClient.post("/suppliers", data);
    return res.data?.data || res.data;
  },

  update: async (id: string, data: Partial<SupplierPayload>) => {
    const res = await apiClient.patch(`/suppliers/${id}`, data);
    return res.data?.data || res.data;
  },

  delete: async (id: string) => {
    const res = await apiClient.delete(`/suppliers/${id}`);
    return res.data?.data || res.data;
  },

  getScorecards: async () => {
    const res = await apiClient.get("/suppliers/scorecards");
    return res.data?.data || res.data;
  },

  verify: async (id: string, payload: { status: string; notes?: string }) => {
    const res = await apiClient.post(`/suppliers/${id}/verify`, payload);
    return res.data?.data || res.data;
  },
};

export default supplierService;
