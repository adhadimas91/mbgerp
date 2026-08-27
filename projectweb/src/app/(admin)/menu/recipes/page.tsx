import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";

export const metadata: Metadata = {
  title: "Kalkulator Gizi & Formulasi Resep | ERP MBG",
  description: "Perhitungan otomatis kalori, protein, lemak, dan karbohidrat berdasarkan bahan resep",
};

export default function MenuRecipesPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 3: Menu & Nutrition"
      badgeText="Standar AKG Kemenkes"
      pageTitle="Kalkulator Gizi & Formulasi Resep Standar"
      description="Perhitungan otomatis kandungan kalori, protein nabati/hewani, karbohidrat, lemak, dan mikronutrisi dari komposisi bahan baku resep makanan."
    />
  );
}
