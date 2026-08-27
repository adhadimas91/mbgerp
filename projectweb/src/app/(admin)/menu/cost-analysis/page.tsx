import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";

export const metadata: Metadata = {
  title: "Analisis Biaya per Porsi (HPP) | ERP MBG",
  description: "Perhitungan real-time Cost per Portion berdasarkan harga bahan baku di gudang",
};

export default function MenuCostAnalysisPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 3: Menu & Nutrition"
      badgeText="HPP & Budget Control"
      pageTitle="Analisis Biaya per Porsi (Cost per Portion)"
      description="Kalkulasi harga pokok porsi (HPP) secara real-time berdasarkan harga pembelian bahan baku terkini untuk memastikan kepatuhan batas plafon anggaran."
    />
  );
}
