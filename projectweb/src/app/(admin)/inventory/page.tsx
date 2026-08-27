import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import InventoryTable from "@/components/inventory/InventoryTable";

export const metadata: Metadata = {
  title: "Stok Gudang & Bahan Baku | ERP MBG",
  description: "Monitoring stok bahan makanan di gudang pusat dan regional",
};

export default function InventoryPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 2: Inventory & Gudang"
      badgeText="Cold Chain & Dry Storage"
      pageTitle="Master Stok Bahan Baku & Manajemen Gudang"
      description="Monitoring ketersediaan bahan baku pangan harian (Protein, Karbohidrat, Sayur, Susu), klasifikasi ruang simpan berpendingin (Cold Storage), dan pelacakan Batch/Lot Number."
    >
      <InventoryTable />
    </ModulePageLayout>
  );
}
