import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";

export const metadata: Metadata = {
  title: "Titik Distribusi (Sekolah & Sasaran) | ERP MBG",
  description: "Data lokasi sekolah, panti asuhan, geolokasi koordinat Lat/Lng, dan kontak penanggung jawab",
};

export default function DistributionPointsPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 4: Logistics & Distribution"
      badgeText="Geolokasi & Pemetaan"
      pageTitle="Daftar Titik Distribusi & Lokasi Sekolah Sasaran"
      description="Database sekolah dan lembaga penerima MBG, koordinat geolokasi (Lat/Lng) untuk optimasi rute armada pengantaran, dan kontak pengelola lokasi."
    />
  );
}
