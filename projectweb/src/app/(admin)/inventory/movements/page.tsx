import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import InventoryTable from "@/components/inventory/InventoryTable";

export const metadata: Metadata = {
  title: "Mutasi Stok (Barang Masuk & Keluar) | ERP MBG",
  description: "Pencatatan barang masuk dari supplier dan pengeluaran bahan untuk dapur masak MBG",
};

export default function StockMovementsPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 2: Inventory & Gudang"
      badgeText="Traceability & Lot Tracking"
      pageTitle="Mutasi Stok Barang Masuk & Pengeluaran Dapur MBG"
      description="Pencatatan pergerakan stok: Penerimaan Barang Masuk (dari Supplier / PO), Pengeluaran Bahan Baku ke Dapur Masak MBG (OUT), dan Penyesuaian Stok Rusak/Selisih (ADJUST)."
    >
      <InventoryTable />
    </ModulePageLayout>
  );
}
