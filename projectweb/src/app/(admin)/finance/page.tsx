import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import { FinanceOverviewDashboard } from "@/components/finance/FinanceOverviewDashboard";

export const metadata: Metadata = {
  title: "Dashboard Finansial & Anggaran MBG | ERP MBG",
  description:
    "Monitoring real-time alokasi DPA pagu anggaran, realisasi penyerapan kas SP2D, komitmen belanja, dan laporan akuntabilitas keuangan program MBG.",
};

export default function FinanceDashboardPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 5: Financial & Budget Management"
      badgeText="Executive Financial Hub"
      pageTitle="Dashboard Finansial, Anggaran & Realisasi Belanja MBG"
      description="Pusat pemantauan eksekutif plafon DPA APBN/DAK, realisasi penyerapan belanja 4 pos standar BGN (75% Bahan Baku, 15% Operasional, 8% Logistik, 2% QC), proyeksi runway kas, dan laporan akuntabilitas keuangan LRA."
    >
      <FinanceOverviewDashboard />
    </ModulePageLayout>
  );
}
