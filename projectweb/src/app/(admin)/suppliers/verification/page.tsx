import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import SupplierVerificationQueue from "@/components/suppliers/SupplierVerificationQueue";

export const metadata: Metadata = {
  title: "Verifikasi Dokumen & ISO Supplier | ERP MBG",
  description: "Verifikasi kepatuhan sertifikasi ISO 22000, ISO 9001, BPOM, dan Halal vendor",
};

export default function SupplierVerificationPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 1: Supplier & Kepatuhan"
      badgeText="Audit Legalitas & Mutu"
      pageTitle="Verifikasi Dokumen & Kepatuhan Standar ISO Vendor"
      description="Proses validasi legalitas usaha (NIB, NPWP), masa berlaku sertifikasi keamanan pangan (ISO 22000 / HACCP), sertifikat Halal MUI/BPJPH, dan audit kelayakan fasilitas produksi."
    >
      <SupplierVerificationQueue />
    </ModulePageLayout>
  );
}
