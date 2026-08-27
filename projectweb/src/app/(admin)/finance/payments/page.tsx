import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";

export const metadata: Metadata = {
  title: "Pembayaran Supplier & Invoice | ERP MBG",
  description: "Status pembayaran invoice supplier (Pending, Paid, Overdue) dan jadwal termin",
};

export default function FinancePaymentsPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 5: Financial & Budget"
      badgeText="Pembayaran Vendor"
      pageTitle="Manajemen Pembayaran Supplier & Faktur"
      description="Monitoring status faktur supplier (Menunggu Persetujuan, Terbayar, Jatuh Tempo), jadwal termin pembayaran, dan riwayat bukti transfer bank."
    />
  );
}
