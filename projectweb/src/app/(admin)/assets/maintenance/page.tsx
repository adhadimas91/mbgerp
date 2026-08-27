import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import AssetMaintenanceSchedule from "@/components/assets/AssetMaintenanceSchedule";

export const metadata: Metadata = {
  title: "Jadwal Servis & Perbaikan Aset | ERP MBG",
  description: "Jadwal servis rutin kendaraan distribusi dan log riwayat perbaikan mesin dapur",
};

export default function AssetMaintenancePage() {
  return (
    <ModulePageLayout
      moduleName="Modul 5: Asset Management"
      badgeText="Maintenance Schedule"
      pageTitle="Jadwal Pemeliharaan Rutin & Riwayat Servis Aset"
      description="Jadwal servis berkala armada distribusi berpendingin, kalibrasi termometer cold chain, serta log biaya perbaikan dan suku cadang peralatan masak."
    >
      <AssetMaintenanceSchedule />
    </ModulePageLayout>
  );
}
