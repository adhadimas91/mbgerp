import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";

export const metadata: Metadata = {
  title: "Mutasi Stok (IN/OUT/ADJUST) | ERP MBG",
  description: "Pencatatan barang masuk dari supplier, barang keluar ke dapur, dan penyesuaian stok",
};

export default function StockMovementsPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 2: Inventory Management"
      badgeText="Mutasi Stok"
      pageTitle="Log Mutasi Barang Masuk & Keluar (IN / OUT / ADJUST)"
      description="Pencatatan alur keluar masuk bahan baku per nomor lot/batch, referensi surat jalan penerimaan, dan pengeluaran ke dapur produksi."
    />
  );
}
