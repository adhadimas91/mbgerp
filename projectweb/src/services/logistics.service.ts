import apiClient from "../lib/api";

export interface CreateShipmentPayload {
  waybillNumber: string;
  driverName: string;
  driverPhone: string;
  vehiclePlate: string;
  routeId?: string;
  targetSchool: string;
  portionCount: number;
  departureTime: string;
  estimatedArrival: string;
  initialTempC?: number;
}

export interface PodPayload {
  shipmentId: string;
  receivedBy: string;
  recipientRole: string;
  recipientPhone: string;
  receivedPortions: number;
  tempAtArrivalC: number;
  organolepticCheck: boolean;
  signatureDataUrl?: string;
  notes?: string;
  latitude?: number;
  longitude?: number;
}

export const logisticsService = {
  getDistributionPoints: async (params?: { cluster?: string }) => {
    const res = await apiClient.get("/logistics/distribution-points", { params });
    return res.data?.data || res.data;
  },

  getRoutes: async () => {
    const res = await apiClient.get("/logistics/routes");
    return res.data?.data || res.data;
  },

  getFleetVehicles: async () => {
    const res = await apiClient.get("/logistics/fleet");
    return res.data?.data || res.data;
  },

  getShipments: async (params?: { status?: string; date?: string }) => {
    const res = await apiClient.get("/logistics/shipments", { params });
    return res.data?.data || res.data;
  },

  createShipment: async (payload: CreateShipmentPayload) => {
    const res = await apiClient.post("/logistics/shipments", payload);
    return res.data?.data || res.data;
  },

  submitPod: async (payload: PodPayload) => {
    const res = await apiClient.post("/logistics/proof-of-delivery", payload);
    return res.data?.data || res.data;
  },
};

export default logisticsService;
