import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import AssetRegistryTable from "@/components/assets/AssetRegistryTable";

export const metadata: Metadata = {
  title: "Master Aset Tetap & QR Code | ERP MBG",
  description: "Pengelolaan aset dapur masak, kendaraan distribusi, pendingin, dan registrasi QR code",
};

export default function AssetsPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 5: Asset Management"
      badgeText="Fixed Asset & QR Code"
      pageTitle="Registrasi Master Aset Tetap & Label QR Code"
      description="Database aset tetap MBG (Peralatan Masak Komersial, Armada Kendaraan Distribusi, Chiller/Freezer, Perlengkapan Dapur) beserta nomor seri, depresiasi nilai buku, dan QR Code."
    >
      <AssetRegistryTable />
    </ModulePageLayout>
  );
}
