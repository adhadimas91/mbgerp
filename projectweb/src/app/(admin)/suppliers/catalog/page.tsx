import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";

export const metadata: Metadata = {
  title: "Katalog Bahan & Harga Dasar | ERP MBG",
  description: "Daftar produk, komoditas pangan, dan perbandingan harga dasar per unit",
};

export default function SupplierCatalogPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 1: Supplier Management"
      badgeText="Katalog Bahan Pangan"
      pageTitle="Katalog Komoditas Pangan & Harga Bahan"
      description="Daftar produk yang disediakan setiap supplier (Protein, Karbohidrat, Sayur, Buah) beserta unit standar dan harga perolehan."
    />
  );
}
