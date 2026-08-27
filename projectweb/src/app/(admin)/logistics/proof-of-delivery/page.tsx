import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import ProofOfDeliveryViewer from "@/components/logistics/ProofOfDeliveryViewer";

export const metadata: Metadata = {
  title: "Bukti Penerimaan (Proof of Delivery) | ERP MBG",
  description: "Verifikasi foto penerimaan makanan di sekolah dan tanda tangan digital kepala sekolah/guru",
};

export default function ProofOfDeliveryPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 4: Logistics & Distribution"
      badgeText="Proof of Delivery (PoD)"
      pageTitle="Verifikasi Bukti Penerimaan (Foto & TTD Digital)"
      description="Penyimpanan bukti serah terima porsi makanan higienis di sekolah, geotagging foto serah terima, dan tanda tangan digital pengelola lokasi."
    >
      <ProofOfDeliveryViewer />
    </ModulePageLayout>
  );
}
