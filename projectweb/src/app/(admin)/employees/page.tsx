import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import EmployeeRegistryTable from "@/components/employees/EmployeeRegistryTable";

import EmployeeNavigationTabs from "@/components/employees/EmployeeNavigationTabs";

export const metadata: Metadata = {
  title: "Direktori SDM & Karyawan Dapur | ERP MBG",
  description: "Manajemen data tenaga kerja dapur sentral SPPG, ahli gizi, helper, driver logistik, dan ID Card MBG",
};

export default function EmployeesPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 8: SDM & Karyawan"
      badgeText="Tenaga Kerja & ID Card"
      pageTitle="Direktori Master Tenaga Kerja & Kru Dapur MBG"
      description="Database personil dapur sentral (Head Chef, Juru Masak, Helper, Ahli Gizi, QC Auditor, Driver Logistik), status sertifikasi Food Handler Kemenkes, rekam MCU, dan generator ID Card resmi."
    >
      <div className="space-y-6">
        <EmployeeNavigationTabs />
        <EmployeeRegistryTable />
      </div>
    </ModulePageLayout>
  );
}
