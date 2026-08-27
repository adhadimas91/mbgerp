import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import RoleManagementDashboard from "@/components/settings/RoleManagementDashboard";

export const metadata: Metadata = {
  title: "Manajemen Peran & Hak Akses (Role & Permission) | ERP MBG",
  description: "Pengelolaan struktur peran sistem (ADMIN_PUSAT, ADMIN_REGIONAL, KEPALA_SPPG, AHLI_GIZI, PPK), hirarki otorisasi, dan matriks izin ISO 27001",
};

export default function RolesManagementPage() {
  return (
    <ModulePageLayout
      moduleName="Sistem & Keamanan (RBAC)"
      badgeText="Role & Permission Management"
      pageTitle="Manajemen Peran & Hak Akses (RBAC)"
      description="Pengelolaan master definisi peran sistem, hirarki wewenang otorisasi keputusan, kebijakan risiko keamanan (ISO/IEC 27001:2022), dan pemetaan izin akses 10 modul ERP MBG."
    >
      <RoleManagementDashboard />
    </ModulePageLayout>
  );
}
