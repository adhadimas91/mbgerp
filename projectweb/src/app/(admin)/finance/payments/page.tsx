import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import PaymentManagement from "@/components/finance/PaymentManagement";

export const metadata: Metadata = {
  title: "Pembayaran Supplier & Invoice | ERP MBG",
  description: "Status pembayaran invoice supplier (Pending, Paid, Overdue), 3-Way Matching, dan rekonsiliasi kas bank MBG",
};

export default function FinancePaymentsPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 5: Financial & Budget"
      badgeText="Pembayaran Vendor"
      pageTitle="Manajemen Pembayaran Supplier & Faktur"
      description="Monitoring status faktur supplier (Menunggu Persetujuan, Siap Bayar, Lunas, Jatuh Tempo), verifikasi 3-Way Matching, eksekusi transfer bank, dan rekonsiliasi kas."
    >
      <PaymentManagement />
    </ModulePageLayout>
  );
}
