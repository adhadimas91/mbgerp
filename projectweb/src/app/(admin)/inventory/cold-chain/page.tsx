import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";

export const metadata: Metadata = {
  title: "Cold Chain & Monitoring Suhu | ERP MBG",
  description: "Pencatatan suhu freezer/chiller dan pelacakan masa kadaluarsa (ISO 22000)",
};

export default function ColdChainPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 2: Inventory & ISO 22000"
      badgeText="Cold Chain Monitoring"
      pageTitle="Pemantauan Suhu Cold Chain & Batch Kadaluarsa"
      description="Pencatatan telemetri suhu ruang pendingin (-18°C s.d. 4°C), pelacakan nomor batch, tanggal kadaluarsa (Expiry Date), dan pencegahan kontaminasi pangan."
    />
  );
}
