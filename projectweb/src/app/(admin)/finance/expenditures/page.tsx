import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";

export const metadata: Metadata = {
  title: "Pencatatan Pengeluaran & Biaya Operasional | ERP MBG",
  description: "Pencatatan biaya pengadaan bahan, operasional logistik dapur, dan arsip invoice",
};

export default function FinanceExpendituresPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 5: Financial & Budget"
      badgeText="Pencatatan Pengeluaran"
      pageTitle="Pencatatan Biaya Operasional & Bahan Baku"
      description="Pencatatan transaksi pengeluaran (BBM armada, bahan baku dari PO, biaya dapur), upload berkas faktur/kuitansi, dan validasi persetujuan."
    />
  );
}
