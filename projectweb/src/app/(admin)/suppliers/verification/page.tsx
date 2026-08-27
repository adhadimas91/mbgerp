import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";

export const metadata: Metadata = {
  title: "Verifikasi & Kepatuhan Supplier | ERP MBG",
  description: "Verifikasi dokumen legal dan sertifikasi kepatuhan mutu ISO 22000, 9001, BPOM, Halal",
};

export default function SupplierVerificationPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 1: Supplier Management"
      badgeText="Kepatuhan & Sertifikasi"
      pageTitle="Verifikasi Dokumen & Kepatuhan ISO Vendor"
      description="Verifikasi masa berlaku sertifikasi keamanan pangan (ISO 22000), manajemen mutu (ISO 9001), nomor izin edar BPOM, dan sertifikat Halal."
    />
  );
}
