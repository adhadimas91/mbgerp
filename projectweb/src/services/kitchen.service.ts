import apiClient from "../lib/api";

export interface ProductionBatchPayload {
  lineId: string;
  lineName: string;
  menuName: string;
  targetPortions: number;
  completedPortions?: number;
  status: "PREPARATION" | "COOKING" | "QC_HOLD" | "PACKAGING" | "READY_FOR_DISPATCH";
  scheduledStart: string;
  scheduledDeparture: string;
  coreTempC?: number;
}

export interface OrganolepticQcPayload {
  batchId: string;
  sampleTempC: number;
  tasteScore: number;
  aromaScore: number;
  textureScore: number;
  visualScore: number;
  retentionSampleCode: string;
  status: "RELEASED" | "REJECTED" | "HOLD";
  signedBy: string;
  notes?: string;
}

export const kitchenService = {
  getKitchenUnits: async () => {
    const res = await apiClient.get("/kitchen/units");
    return res.data?.data || res.data;
  },

  getBatches: async (params?: { date?: string; status?: string }) => {
    const res = await apiClient.get("/kitchen/batches", { params });
    return res.data?.data || res.data;
  },

  updateBatchStatus: async (batchId: string, payload: Partial<ProductionBatchPayload>) => {
    const res = await apiClient.patch(`/kitchen/batches/${batchId}`, payload);
    return res.data?.data || res.data;
  },

  logCcpTelemetry: async (payload: { lineId: string; sensorType: string; tempC: number; isWithinThreshold: boolean }) => {
    const res = await apiClient.post("/kitchen/ccp-telemetry", payload);
    return res.data?.data || res.data;
  },

  submitOrganolepticQc: async (payload: OrganolepticQcPayload) => {
    const res = await apiClient.post("/kitchen/organoleptic-qc", payload);
    return res.data?.data || res.data;
  },

  createRequisition: async (payload: { requestedBy: string; urgency: string; items: any[]; reason: string }) => {
    const res = await apiClient.post("/kitchen/requisitions", payload);
    return res.data?.data || res.data;
  },
};

export default kitchenService;
