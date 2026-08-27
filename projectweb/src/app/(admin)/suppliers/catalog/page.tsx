import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import SupplierCatalogGrid from "@/components/suppliers/SupplierCatalogGrid";

export const metadata: Metadata = {
  title: "Katalog Bahan Baku & Harga Dasar | ERP MBG",
  description: "Daftar komoditas bahan baku makanan dan manajemen harga satuan supplier",
};

export default function SupplierCatalogPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 1: Supplier Management"
      badgeText="Standar Harga Pangan Nasional"
      pageTitle="Katalog Komoditas Bahan Baku & Analisis Harga Satuan"
      description="Katalog bahan pangan (Protein, Karbohidrat, Sayur, Susu) yang disediakan supplier beserta perbandingan terhadap Harga Acuan Pemerintah (HAP Badan Pangan Nasional)."
    >
      <SupplierCatalogGrid />
    </ModulePageLayout>
  );
}
