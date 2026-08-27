import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import RecipeBuilder from "@/components/menu/RecipeBuilder";

export const metadata: Metadata = {
  title: "Komposisi Resep & Kalkulator Gizi | ERP MBG",
  description: "Formulasi bahan baku per porsi dan kalkulator otomatis pemenuhan standar AKG Kemenkes",
};

export default function RecipesPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 3: Menu & Nutrition"
      badgeText="Formula Resep & AKG"
      pageTitle="Komposisi Resep Masakan & Kalkulator Gizi AKG"
      description="Peracikan takaran bahan baku resep makanan MBG, kalkulasi otomatis makronutrisi (Kalori, Protein, Karbohidrat, Lemak, Serat), dan validasi standar AKG Kementerian Kesehatan RI."
    >
      <RecipeBuilder />
    </ModulePageLayout>
  );
}
