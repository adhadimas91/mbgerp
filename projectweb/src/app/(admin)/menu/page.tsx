import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import MenuPlannerCalendar from "@/components/menu/MenuPlannerCalendar";

export const metadata: Metadata = {
  title: "Perencanaan Menu Harian MBG | ERP MBG",
  description: "Perencanaan siklus menu harian, mingguan, dan bulanan MBG",
};

export default function MenuPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 3: Menu & Nutrition"
      badgeText="Siklus Menu MBG"
      pageTitle="Perencanaan Menu Harian & Siklus Gizi"
      description="Pembuatan jadwal variasi menu makanan bergizi seimbang 4 Sehat 5 Sempurna untuk sekolah dan titik distribusi, target porsi, dan persetujuan Ahli Gizi."
    >
      <MenuPlannerCalendar />
    </ModulePageLayout>
  );
}
