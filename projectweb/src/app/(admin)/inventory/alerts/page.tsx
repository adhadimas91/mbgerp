import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";

export const metadata: Metadata = {
  title: "Peringatan Stok Rendah | ERP MBG",
  description: "Daftar bahan baku yang berada di bawah batas minimum threshold",
};

export default function StockAlertsPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 2: Inventory Management"
      badgeText="Early Warning System"
      pageTitle="Peringatan Stok Rendah & Restock Otomatis"
      description="Daftar komoditas bahan baku pangan yang berada di bawah ambang batas minimum (Min Stock Threshold) untuk segera diterbitkan PO pengadaan."
    />
  );
}
