import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";

export const metadata: Metadata = {
  title: "Pelaporan Insiden Mutu & Keamanan Pangan | ERP MBG",
  description: "Pencatatan insiden pangan, makanan rusak/terkontaminasi, dan tindakan korektif (CAPA)",
};

export default function IncidentReportsPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 11: ISO Compliance"
      badgeText="CAPA & Corrective Actions"
      pageTitle="Pelaporan Insiden Mutu & Investigasi Keamanan Pangan"
      description="Pencatatan temuan ketidaksesuaian mutu di lapangan (kemasan rusak, bahan kadaluarsa, anomali suhu), investigasi akar masalah, dan Corrective & Preventive Actions (CAPA)."
    />
  );
}
