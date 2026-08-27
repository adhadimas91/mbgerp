import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import UserManagementTable from "@/components/settings/UserManagementTable";

export const metadata: Metadata = {
  title: "Manajemen Pengguna & Hak Akses (RBAC) | ERP MBG",
  description: "Pengaturan akun pengguna, peran (ADMIN_PUSAT, ADMIN_REGIONAL, SUPPLIER, PENGELOLA), dan hak akses modul",
};

export default function UsersManagementPage() {
  return (
    <ModulePageLayout
      moduleName="Sistem & Keamanan (RBAC)"
      badgeText="Role-Based Access Control"
      pageTitle="Manajemen Pengguna & Hak Akses (RBAC)"
      description="Pengelolaan akun pengguna sistem, pembagian wewenang peran (Admin Pusat, Admin Regional, Supplier, Pengelola Dapur/Titik Distribusi), dan audit keamanan login berstandar ISO/IEC 27001:2022."
    >
      <UserManagementTable />
    </ModulePageLayout>
  );
}

