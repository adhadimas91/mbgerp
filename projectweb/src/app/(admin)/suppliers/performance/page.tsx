import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import SupplierPerformanceScorecard from "@/components/suppliers/SupplierPerformanceScorecard";

export const metadata: Metadata = {
  title: "Rating & Evaluasi Performa Supplier | ERP MBG",
  description: "Dashboard evaluasi ketepatan pengiriman dan mutu bahan pangan supplier",
};

export default function SupplierPerformancePage() {
  return (
    <ModulePageLayout
      moduleName="Modul 1: Supplier Management"
      badgeText="SLA & Rating Performa"
      pageTitle="Evaluasi Performa & Leaderboard Vendor MBG"
      description="Metrik evaluasi ketepatan waktu pengiriman (On-Time Delivery), tingkat kelulusan uji mutu keamanan pangan (ISO 22000), serta riwayat pemenuhan kuota bahan baku."
    >
      <SupplierPerformanceScorecard />
    </ModulePageLayout>
  );
}
