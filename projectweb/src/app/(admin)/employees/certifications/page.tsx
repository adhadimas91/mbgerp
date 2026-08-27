import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import CertificationMcuMatrix from "@/components/employees/CertificationMcuMatrix";

import EmployeeNavigationTabs from "@/components/employees/EmployeeNavigationTabs";

export const metadata: Metadata = {
  title: "Sertifikasi Food Handler & MCU | ERP MBG",
  description: "Matriks kepatuhan sertifikat Kemenkes, uji laboratorium Salmonella & TBC, serta audit kelaikan mutu",
};

export default function CertificationsPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 8: SDM & Karyawan"
      badgeText="Sertifikasi & MCU ISO 22000"
      pageTitle="Matriks Kepatuhan Sertifikasi Food Handler & Rekam Medis MCU"
      description="Pemantauan masa berlaku Sertifikat Penjamah Makanan Kemenkes RI, rekam uji lab rectal swab Salmonella, rontgen paru-paru, serologi Hepatitis A, dan cetak Berita Acara audit mutu BPOM."
    >
      <div className="space-y-6">
        <EmployeeNavigationTabs />
        <CertificationMcuMatrix />
      </div>
    </ModulePageLayout>
  );
}
