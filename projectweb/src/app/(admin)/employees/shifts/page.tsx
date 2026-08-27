import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import ShiftScheduleManager from "@/components/employees/ShiftScheduleManager";

import EmployeeNavigationTabs from "@/components/employees/EmployeeNavigationTabs";

export const metadata: Metadata = {
  title: "Shift & Presensi Higiene Dapur | ERP MBG",
  description: "Penjadwalan 3 shift dapur dini hari dan skrining kesehatan gatekeeper ISO 22000 harian",
};

export default function ShiftsPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 8: SDM & Karyawan"
      badgeText="Shift & Presensi Higiene"
      pageTitle="Jadwal Shift Kerja & Skrining Higiene Harian ISO 22000"
      description="Manajemen 3 shift operasional dapur sentral (02:00-07:00 Masak Subuh, 05:00-11:00 Packing & Distribusi, 09:00-16:00 Sanitasi) dan rekam skrining suhu/gejala sakit sebelum masuk dapur steril."
    >
      <div className="space-y-6">
        <EmployeeNavigationTabs />
        <ShiftScheduleManager />
      </div>
    </ModulePageLayout>
  );
}
