import apiClient from "../lib/api";

export interface ExpenditurePayload {
  budgetAllocationId: string;
  recipient: string;
  description: string;
  grossAmount: number;
  taxPph22: number;
  taxPpn: number;
  netAmount: number;
  paymentMethod: string;
  invoiceNumber?: string;
  sp2dNumber?: string;
}

export const financeService = {
  getBudgets: async (year = 2026) => {
    const res = await apiClient.get("/finance/budgets", { params: { year } });
    return res.data?.data || res.data;
  },

  getExpenditures: async (params?: { category?: string; limit?: number }) => {
    const res = await apiClient.get("/finance/expenditures", { params });
    return res.data?.data || res.data;
  },

  createExpenditure: async (payload: ExpenditurePayload) => {
    const res = await apiClient.post("/finance/expenditures", payload);
    return res.data?.data || res.data;
  },

  getInvoices: async (params?: { status?: string }) => {
    const res = await apiClient.get("/finance/invoices", { params });
    return res.data?.data || res.data;
  },

  processPayment: async (payload: { invoiceId: string; sp2dNumber: string; bankAccount: string; amount: number }) => {
    const res = await apiClient.post("/finance/payments", payload);
    return res.data?.data || res.data;
  },

  getFinancialReports: async (period = "2026-Q1") => {
    const res = await apiClient.get("/finance/reports", { params: { period } });
    return res.data?.data || res.data;
  },
};

export default financeService;
