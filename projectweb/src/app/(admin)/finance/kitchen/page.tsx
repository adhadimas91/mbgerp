import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import { KitchenFinancialDashboard } from "@/components/finance/KitchenFinancialDashboard";

export const metadata: Metadata = {
  title: "Finansial & Biaya Operasional Dapur SPPG | ERP MBG",
  description:
    "Dashboard finansial eksekutif Kepala MBG / SPPG untuk memantau Biaya Pokok Produksi (HPP per porsi), realisasi serapan pos belanja, utilitas energi dapur, dan kas kecil operasional.",
};

export default function KitchenFinancePage() {
  return (
    <ModulePageLayout
      moduleName="Modul 5: Financial & Budget Management"
      badgeText="SPPG Cost & Finance Control"
      pageTitle="Finansial & Biaya Operasional Dapur Sentral SPPG"
      description="Pusat kendali eksekutif Kepala MBG untuk memantau efisiensi HPP aktual per porsi vs plafon BGN, alokasi biaya energi & utilitas dapur, upah brigade dapur, serta akuntabilitas kas kecil harian."
    >
      <KitchenFinancialDashboard />
    </ModulePageLayout>
  );
}
