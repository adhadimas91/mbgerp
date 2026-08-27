"use client";
import React from "react";
import Badge from "../ui/badge/Badge";

interface VendorPerformance {
  rank: number;
  id: string;
  name: string;
  category: string;
  onTimeDeliveryRate: number; // %
  qualityPassRate: number; // %
  foodSafetyScore: number; // %
  totalDeliveries: number;
  overallRating: number;
  tier: "PLATINUM" | "GOLD" | "SILVER";
}

const vendorScores: VendorPerformance[] = [
  {
    rank: 1,
    id: "SUP-101",
    name: "PT. Sumber Protein Nusantara",
    category: "Protein Hewani",
    onTimeDeliveryRate: 99.2,
    qualityPassRate: 99.8,
    foodSafetyScore: 100.0,
    totalDeliveries: 420,
    overallRating: 4.95,
    tier: "PLATINUM",
  },
  {
    rank: 2,
    id: "SUP-105",
    name: "PT. Susu Segar Nusantara Dairy",
    category: "Susu & Olahan",
    onTimeDeliveryRate: 98.6,
    qualityPassRate: 99.5,
    foodSafetyScore: 99.2,
    totalDeliveries: 380,
    overallRating: 4.92,
    tier: "PLATINUM",
  },
  {
    rank: 3,
    id: "SUP-102",
    name: "CV. Tani Makmur Beras Mandiri",
    category: "Karbohidrat & Beras",
    onTimeDeliveryRate: 97.4,
    qualityPassRate: 98.2,
    foodSafetyScore: 98.5,
    totalDeliveries: 510,
    overallRating: 4.85,
    tier: "GOLD",
  },
  {
    rank: 4,
    id: "SUP-103",
    name: "Koperasi Sayur Segar Lembang",
    category: "Sayuran & Buah",
    onTimeDeliveryRate: 95.8,
    qualityPassRate: 96.5,
    foodSafetyScore: 97.0,
    totalDeliveries: 290,
    overallRating: 4.72,
    tier: "GOLD",
  },
];

export const SupplierPerformanceScorecard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Rata-rata Ketepatan Waktu Pengiriman
          </span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">97.8%</span>
            <span className="text-xs font-medium text-emerald-600">▲ +1.2% bulan ini</span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">Tepat waktu tiba di dapur sebelum jam masak subuh</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Tingkat Kelulusan Uji Mutu Bahan (Pass Rate)
          </span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">98.5%</span>
            <span className="text-xs font-medium text-emerald-600">▲ +0.5% standar ISO 22000</span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">Lolos inspeksi organoleptik & uji suhu cold storage</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Kepatuhan Sertifikasi Higienitas
          </span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">99.1%</span>
            <span className="text-xs font-medium text-gray-400">100% Bebas Kontaminasi</span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400">Kepatuhan sanitasi armada & kemasan food-grade</p>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-gray-800 dark:text-white">
              Peringkat & Scorecard Vendor MBG Terbaik (Leaderboard)
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Evaluasi performa berbasis SLA pengiriman, audit keamanan pangan ISO 22000, dan nol retur
            </p>
          </div>
          <span className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            Periode: Q1 2026
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-[11px] font-semibold uppercase text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <th className="pb-3">Rank & Vendor</th>
                <th className="pb-3 px-3">Komoditas</th>
                <th className="pb-3 px-3">Ketepatan Waktu</th>
                <th className="pb-3 px-3">Kelulusan Mutu</th>
                <th className="pb-3 px-3">Skor ISO 22000</th>
                <th className="pb-3 px-3">Total Pengiriman</th>
                <th className="pb-3 pl-3 text-right">Rating & Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
              {vendorScores.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01]">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold ${
                        item.rank === 1
                          ? "bg-amber-400 text-amber-900"
                          : item.rank === 2
                          ? "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                          : item.rank === 3
                          ? "bg-amber-700 text-white"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800"
                      }`}>
                        #{item.rank}
                      </span>
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white block text-sm">
                          {item.name}
                        </span>
                        <span className="font-mono text-[11px] text-gray-400">{item.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-3 text-gray-700 dark:text-gray-300 font-medium">
                    {item.category}
                  </td>

                  <td className="py-4 px-3">
                    <span className="font-bold text-gray-900 dark:text-white">{item.onTimeDeliveryRate}%</span>
                  </td>

                  <td className="py-4 px-3">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{item.qualityPassRate}%</span>
                  </td>

                  <td className="py-4 px-3">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{item.foodSafetyScore}%</span>
                  </td>

                  <td className="py-4 px-3 font-medium text-gray-700 dark:text-gray-300">
                    {item.totalDeliveries} Batch
                  </td>

                  <td className="py-4 pl-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <span className="font-bold text-amber-500">★ {item.overallRating}</span>
                      <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                        item.tier === "PLATINUM"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300"
                      }`}>
                        {item.tier}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupplierPerformanceScorecard;
