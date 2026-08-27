import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import ColdChainTelemetry from "@/components/inventory/ColdChainTelemetry";

export const metadata: Metadata = {
  title: "Monitoring Cold Chain (Suhu Pendingin) | ERP MBG",
  description: "Log suhu ruang pendingin dan kendaraan distribusi cold chain sesuai ISO 22000",
};

export default function ColdChainPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 2 & ISO 22000"
      badgeText="IoT Telemetri 24/7"
      pageTitle="Monitoring Suhu Cold Chain & Log Ruang Pendingin"
      description="Pemantauan telemetri suhu real-time pada ruang penyimpanan pendingin (Cold Storage -18°C s/d 4°C) dan armada distribusi berpendingin untuk menjamin integritas rantai dingin bahan baku."
    >
      <ColdChainTelemetry />
    </ModulePageLayout>
  );
}
