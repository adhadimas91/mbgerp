import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import SupplierTable from "@/components/suppliers/SupplierTable";

export const metadata: Metadata = {
  title: "Daftar Supplier & Vendor | ERP MBG",
  description: "Manajemen data vendor pengadaan bahan baku makanan bergizi gratis",
};

export default function SuppliersPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 1: Supplier Management"
      badgeText="ISO 22000 & BPOM Verified"
      pageTitle="Daftar Supplier & Vendor Terdaftar"
      description="Kelola data vendor resmi, profil perusahaan, kontak penanggung jawab, dan kelengkapan dokumen legalitas pengadaan bahan pangan MBG."
    >
      <SupplierTable />
    </ModulePageLayout>
  );
}
