import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import { KitchenOverviewDashboard } from "@/components/kitchen/KitchenOverviewDashboard";

export const metadata: Metadata = {
  title: "Dashboard Dapur Sentral SPPG MBG | ERP MBG",
  description:
    "Pusat kendali operasional produksi makanan bergizi, pemantauan lini masak, kepatuhan HACCP ISO 22000, uji organoleptik, dan kesiapan packing muat armada MBG.",
};

export default function KitchenDashboardPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 6: Dashboard & Operasional Dapur"
      badgeText="SPPG Central Kitchen"
      pageTitle="Dashboard Dapur Sentral SPPG & Produksi Makanan MBG"
      description="Pemantauan real-time alur masak per komponen menu, kepatuhan batas kendali kritis (CCP HACCP), lembar uji kelayakan organoleptik ahli gizi, serta pengawasan holding & packing sebelum muat ke armada pengiriman."
    >
      <KitchenOverviewDashboard />
    </ModulePageLayout>
  );
}
