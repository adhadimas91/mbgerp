import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import ExpenditureManagement from "@/components/finance/ExpenditureManagement";

export const metadata: Metadata = {
  title: "Pencatatan Pengeluaran & Biaya Operasional | ERP MBG",
  description: "Pencatatan biaya pengadaan bahan baku, operasional logistik dapur sentral, dan validasi kuitansi SPJ MBG",
};

export default function FinanceExpendituresPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 5: Financial & Budget"
      badgeText="Pencatatan Pengeluaran"
      pageTitle="Pencatatan Biaya Operasional & Bahan Baku"
      description="Pencatatan transaksi pengeluaran (BBM armada, bahan baku dari PO, operasional dapur), upload berkas faktur/kuitansi, pemotongan pajak PPh/PPN, dan validasi SPJ."
    >
      <ExpenditureManagement />
    </ModulePageLayout>
  );
}
