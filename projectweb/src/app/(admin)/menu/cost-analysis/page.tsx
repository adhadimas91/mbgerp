import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import MenuCostAnalysis from "@/components/menu/MenuCostAnalysis";

export const metadata: Metadata = {
  title: "Analisis Biaya per Porsi (HPP) | ERP MBG",
  description: "Perhitungan Harga Pokok Produksi menu makanan harian vs pagu anggaran MBG",
};

export default function CostAnalysisPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 3: Menu & Nutrition"
      badgeText="HPP & Pagu Anggaran"
      pageTitle="Analisis Biaya Pokok per Porsi (HPP) & Simulator Anggaran"
      description="Perhitungan Harga Pokok Produksi (HPP) makanan bergizi berdasarkan harga bahan baku pasar terkini, breakdown komponen biaya, dan perbandingan terhadap batas pagu APBN/APBD."
    >
      <MenuCostAnalysis />
    </ModulePageLayout>
  );
}
