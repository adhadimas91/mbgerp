import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";

export const metadata: Metadata = {
  title: "Pengiriman & Pelacakan Resi | ERP MBG",
  description: "Pembuatan resi pengiriman, status armada (Pending -> Shipped -> Delivered), dan ETA waktu tiba",
};

export default function ShipmentsPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 4: Logistics & Distribution"
      badgeText="Tracking Resi Pengiriman"
      pageTitle="Manajemen Surat Jalan & Tracking Pengiriman MBG"
      description="Pembuatan nomor resi surat jalan (Waybill), monitoring armada kurir, estimasi waktu tiba (ETA vs Aktual), dan update status pengantaran."
    />
  );
}
