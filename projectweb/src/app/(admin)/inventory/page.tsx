import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";

export const metadata: Metadata = {
  title: "Stok Bahan Baku & Gudang | ERP MBG",
  description: "Manajemen stok gudang pusat dan regional untuk pemenuhan menu harian MBG",
};

export default function InventoryPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 2: Inventory Management"
      badgeText="Gudang & Stok"
      pageTitle="Manajemen Stok Bahan Baku & Kapasitas Gudang"
      description="Monitoring ketersediaan bahan baku pangan (Protein, Karbohidrat, Sayuran) di seluruh fasilitas gudang kering dan penyimpanan berpendingin."
    />
  );
}
