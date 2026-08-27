import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";

export const metadata: Metadata = {
  title: "Audit Trail (Immutable System Logs) | ERP MBG",
  description: "Catatan riwayat transaksi append-only yang tidak dapat dimanipulasi untuk transparansi dan audit BPK/Inspektorat",
};

export default function AuditLogsPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 7 & ISO 27001"
      badgeText="Append-Only Immutable"
      pageTitle="Audit Trail & Riwayat Perubahan Sistem (Immutable)"
      description="Pencatatan mutlak seluruh aktivitas sensitif sistem (Perubahan Stok, Status Resi, Transaksi Anggaran, Verifikasi Vendor) dengan diff nilai lama & baru (JSONB), IP address, dan user agent."
    />
  );
}
