import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import LowStockAlerts from "@/components/inventory/LowStockAlerts";

export const metadata: Metadata = {
  title: "Peringatan Stok Rendah & Kadaluarsa | ERP MBG",
  description: "Notifikasi otomatis bahan baku menipis dan mendekati masa kadaluarsa",
};

export default function StockAlertsPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 2: Inventory & Gudang"
      badgeText="Early Warning System"
      pageTitle="Peringatan Dini Stok Rendah & Manajemen Kadaluarsa"
      description="Sistem deteksi dini ketersediaan bahan baku di bawah batas aman minimum (min stock threshold) serta pelacakan bahan baku yang mendekati masa kadaluarsa (FIFO alur dapur)."
    >
      <LowStockAlerts />
    </ModulePageLayout>
  );
}
