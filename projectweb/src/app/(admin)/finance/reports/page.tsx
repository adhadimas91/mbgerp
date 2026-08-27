import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import { ComprehensiveFinancialReports } from "@/components/finance/ComprehensiveFinancialReports";

export const metadata: Metadata = {
  title: "Pusat Laporan Keuangan Terpadu MBG | ERP MBG",
  description:
    "Laporan keuangan terpadu program MBG berstandar SAP, BGN dan BPK: Laporan Realisasi Anggaran (LRA), Laporan Operasional (LO), Neraca, Laporan Arus Kas (LAK), Unit Cost HPP, dan Kepatuhan Pajak Negara.",
};

export default function FinancialReportsPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 5: Financial & Budget Management"
      badgeText="Official Financial Statements & Audit"
      pageTitle="Laporan Keuangan Terpadu & Akuntabilitas MBG"
      description="Pusat pelaporan keuangan resmi program Makan Bergizi Gratis (MBG) berbasis Standar Akuntansi Pemerintahan (SAP Akrual): LRA, Laporan Operasional (Laba Rugi), Neraca Keuangan, Arus Kas, Analisis Unit Cost HPP, dan Rekapitulasi Pajak NTPN."
    >
      <ComprehensiveFinancialReports />
    </ModulePageLayout>
  );
}
