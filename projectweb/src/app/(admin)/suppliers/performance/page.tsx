import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";

export const metadata: Metadata = {
  title: "Rating & Performa Supplier | ERP MBG",
  description: "Evaluasi ketepatan pengiriman dan mutu bahan pangan dari supplier",
};

export default function SupplierPerformancePage() {
  return (
    <ModulePageLayout
      moduleName="Modul 1: Supplier Management"
      badgeText="Evaluasi & Rating"
      pageTitle="Evaluasi Performa & Ketepatan Pengiriman Vendor"
      description="Metrik ketepatan waktu pengiriman, tingkat penolakan barang karena rusak, dan riwayat transaksi dengan supplier per wilayah."
    />
  );
}
