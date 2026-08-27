import apiClient from "../lib/api";

export interface CreateUserPayload {
  name: string;
  email: string;
  role: string;
  kitchenUnitId?: string;
  phone?: string;
  password?: string;
}

export const userService = {
  getUsers: async (params?: { role?: string; search?: string }) => {
    const res = await apiClient.get("/users", { params });
    return res.data?.data || res.data;
  },

  getRoles: async () => {
    const res = await apiClient.get("/users/roles");
    return res.data?.data || res.data;
  },

  createUser: async (payload: CreateUserPayload) => {
    const res = await apiClient.post("/users", payload);
    return res.data?.data || res.data;
  },

  updateUserRole: async (userId: string, role: string) => {
    const res = await apiClient.patch(`/users/${userId}/role`, { role });
    return res.data?.data || res.data;
  },

  revokeSession: async (userId: string, sessionId: string) => {
    const res = await apiClient.delete(`/users/${userId}/sessions/${sessionId}`);
    return res.data?.data || res.data;
  },
};

export default userService;
