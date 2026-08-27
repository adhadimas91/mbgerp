import apiClient from "../lib/api";

export interface EmployeePayload {
  nik: string;
  name: string;
  role: string;
  kitchenUnitId?: string;
  phone: string;
  email?: string;
  bankAccount?: string;
  bpjsKetenagakerjaan?: string;
  foodHandlerCertExpiresAt?: string;
  baseSalary: number;
}

export const employeeService = {
  getEmployees: async (params?: { role?: string; search?: string }) => {
    const res = await apiClient.get("/employees", { params });
    return res.data?.data || res.data;
  },

  createEmployee: async (payload: EmployeePayload) => {
    const res = await apiClient.post("/employees", payload);
    return res.data?.data || res.data;
  },

  getShifts: async () => {
    const res = await apiClient.get("/employees/shifts");
    return res.data?.data || res.data;
  },

  recordAttendance: async (payload: { employeeId: string; shiftId: string; bodyTempC: number; isFitToWork: boolean; hygieneCheck: boolean }) => {
    const res = await apiClient.post("/employees/attendance", payload);
    return res.data?.data || res.data;
  },

  getPayrollRuns: async () => {
    const res = await apiClient.get("/employees/payroll");
    return res.data?.data || res.data;
  },
};

export default employeeService;
