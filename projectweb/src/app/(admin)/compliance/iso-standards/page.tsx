import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import IsoComplianceMatrix from "@/components/compliance/IsoComplianceMatrix";

export const metadata: Metadata = {
  title: "Standar Kepatuhan ISO & Sertifikasi | ERP MBG",
  description: "Matriks kepatuhan ISO 22000 (Keamanan Pangan), ISO 9001 (Mutu), dan ISO 27001 (Keamanan Informasi)",
};

export default function IsoStandardsPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 11: ISO Compliance"
      badgeText="ISO 22000 • 9001 • 27001 • Halal"
      pageTitle="Matriks Kepatuhan Standar ISO & Sertifikasi MBG"
      description="Dashboard terpadu pemenuhan standar keamanan pangan (HACCP/ISO 22000), SOP mutu operasional (ISO 9001), sertifikasi Halal BPJPH, dan keamanan data informasi (ISO 27001)."
    >
      <IsoComplianceMatrix />
    </ModulePageLayout>
  );
}
