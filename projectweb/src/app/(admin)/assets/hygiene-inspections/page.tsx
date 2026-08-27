import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import HygieneInspectionsAudit from "@/components/assets/HygieneInspectionsAudit";

export const metadata: Metadata = {
  title: "Inspeksi Higienitas & Kelaikan Alat (ISO 22000) | ERP MBG",
  description: "Checklist berkala kebersihan dan sanitasi peralatan dapur sesuai standar ISO 22000",
};

export default function AssetHygienePage() {
  return (
    <ModulePageLayout
      moduleName="Modul 5: Asset & ISO 22000"
      badgeText="Sanitasi & Kelaikan Pangan"
      pageTitle="Inspeksi Higienitas & Kelaikan Peralatan Masak"
      description="Checklist audit kebersihan harian peralatan masak komersial, sanitasi wadah makanan bersekat, dan validasi standar keamanan pangan ISO 22000 / HACCP."
    >
      <HygieneInspectionsAudit />
    </ModulePageLayout>
  );
}
