import type { Metadata } from "next";
import React from "react";
import MbgMetrics from "@/components/mbg/MbgMetrics";
import MbgRecentShipments from "@/components/mbg/MbgRecentShipments";
import MbgNutritionGauge from "@/components/mbg/MbgNutritionGauge";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import DemographicCard from "@/components/ecommerce/DemographicCard";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard Monitoring | ERP Manajemen MBG (Makanan Bergizi Gratis)",
  description: "Sistem ERP Terpadu untuk Monitoring Pengadaan, Gudang, Nutrisi, Logistik, dan Kepatuhan ISO MBG",
};

export default function MbgDashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white shadow-lg shadow-emerald-900/10">
        <div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm mb-2">
            Program Nasional MBG 2026
          </span>
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">
            Dashboard Operasional & Distribusi MBG
          </h1>
          <p className="text-sm text-emerald-100 mt-1 max-w-2xl">
            Pemantauan real-time pengadaan bahan baku, standar nutrisi pangan (ISO 22000), logistik pengiriman sekolah, dan akuntabilitas anggaran.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/dashboard/kitchen"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition"
          >
            <span>🍳</span> Buka Dapur SPPG
          </Link>
          <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
            <span className="text-[11px] uppercase tracking-wider text-emerald-200 block">Titik Sasaran</span>
            <span className="text-lg font-bold text-white">428 Sekolah</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
            <span className="text-[11px] uppercase tracking-wider text-emerald-200 block">Penerima Manfaat</span>
            <span className="text-lg font-bold text-white">135.000 Anak</span>
          </div>
        </div>
      </div>

      {/* KPI Metrics */}
      <MbgMetrics />

      {/* Main Charts & Analytics Grid */}
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-8 space-y-6">
          <MonthlySalesChart />
          <MbgRecentShipments />
        </div>

        <div className="col-span-12 xl:col-span-4 space-y-6">
          <MbgNutritionGauge />
          <MonthlyTarget />
          <DemographicCard />
        </div>
      </div>
    </div>
  );
}
