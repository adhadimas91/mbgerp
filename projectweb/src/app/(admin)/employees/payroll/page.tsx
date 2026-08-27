import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import PayrollManagement from "@/components/employees/PayrollManagement";

import EmployeeNavigationTabs from "@/components/employees/EmployeeNavigationTabs";

export const metadata: Metadata = {
  title: "Kelola Gaji & Payroll Dapur | ERP MBG",
  description: "Penggajian bulanan SPPG, tunjangan higiene, insentif porsi MBG, BPJS, dan cetak slip gaji",
};

export default function PayrollPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 8: SDM & Karyawan"
      badgeText="Kelola Gaji & Insentif"
      pageTitle="Kelola Gaji (Payroll) & Insentif Kinerja Tenaga Kerja MBG"
      description="Perhitungan gaji pokok, tunjangan higiene dapur, insentif output porsi terdistribusi tepat waktu, potongan resmi BPJS & PPh 21, otorisasi SPJ/PPK, dan cetak slip gaji resmi BGN."
    >
      <div className="space-y-6">
        <EmployeeNavigationTabs />
        <PayrollManagement />
      </div>
    </ModulePageLayout>
  );
}
