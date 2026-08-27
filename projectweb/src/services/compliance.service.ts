import apiClient from "../lib/api";

export interface IncidentPayload {
  title: string;
  category: "FOOD_SAFETY" | "TEMPERATURE_ABNORMALITY" | "LOGISTICS_DELAY" | "PACKAGING_DAMAGE" | "HYGIENE_BREACH";
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  reportedBy: string;
  description: string;
  correctiveAction?: string;
  preventiveAction?: string;
  status?: "OPEN" | "INVESTIGATING" | "CAPA_SUBMITTED" | "RESOLVED";
}

export const complianceService = {
  getAuditLogs: async (params?: { entityType?: string; action?: string; limit?: number }) => {
    const res = await apiClient.get("/compliance/audit-logs", { params });
    return res.data?.data || res.data;
  },

  getIsoStandards: async () => {
    const res = await apiClient.get("/compliance/iso-standards");
    return res.data?.data || res.data;
  },

  getIncidents: async (params?: { severity?: string; status?: string }) => {
    const res = await apiClient.get("/compliance/incidents", { params });
    return res.data?.data || res.data;
  },

  createIncident: async (payload: IncidentPayload) => {
    const res = await apiClient.post("/compliance/incidents", payload);
    return res.data?.data || res.data;
  },
};

export default complianceService;
