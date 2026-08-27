import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";

export const metadata: Metadata = {
  title: "Alokasi Anggaran MBG per Wilayah | ERP MBG",
  description: "Monitoring plafon anggaran per kabupaten/kota dan realisasi penyerapan dana",
};

export default function FinanceBudgetsPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 5: Financial & Budget"
      badgeText="Alokasi Anggaran APBN/APBD"
      pageTitle="Alokasi Anggaran MBG & Monitoring Realisasi"
      description="Plafon anggaran per regional/kabupaten, monitoring sisa pagu anggaran secara real-time, dan proyeksi pemenuhan porsi harian."
    />
  );
}
