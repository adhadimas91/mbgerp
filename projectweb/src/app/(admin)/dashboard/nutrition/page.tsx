import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import MbgNutritionGauge from "@/components/mbg/MbgNutritionGauge";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";

export const metadata: Metadata = {
  title: "Analisis Nutrisi Harian & Gizi MBG | ERP MBG",
  description: "Laporan analitik kecukupan gizi, kalori harian, dan kepatuhan standar nutrisi MBG",
};

export default function NutritionDashboardPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 6: Dashboard & Analytics"
      badgeText="Standar Gizi & Nutrisi"
      pageTitle="Analisis Nutrisi Harian & Kepatuhan Gizi MBG"
      description="Visualisasi grafik asupan gizi makro & mikro per kelompok usia, komposisi menu harian, dan evaluasi kepatuhan terhadap standar Angka Kecukupan Gizi (AKG)."
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-6">
          <MbgNutritionGauge />
        </div>
        <div className="col-span-12 xl:col-span-6">
          <StatisticsChart />
        </div>
      </div>
    </ModulePageLayout>
  );
}
