"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import Badge from "../ui/badge/Badge";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const MenuCostAnalysis: React.FC = () => {
  const [dailyPortions, setDailyPortions] = useState<number>(25000);
  const [schoolDays, setSchoolDays] = useState<number>(20);
  const [targetMaxBudget] = useState<number>(15000);

  // Components cost breakdown (Average per portion)
  const costBreakdown = [
    { name: "Protein Hewani Utama (Ayam/Sapi/Ikan)", cost: 5200, percentage: 36.6, color: "#2563eb" },
    { name: "Susu Sapi Murni Pasteurisasi MBG", cost: 2500, percentage: 17.6, color: "#059669" },
    { name: "Sayuran Segar & Buah-buahan", cost: 2450, percentage: 17.3, color: "#10b981" },
    { name: "Karbohidrat (Beras Premium IR-64)", cost: 2100, percentage: 14.8, color: "#f59e0b" },
    { name: "Kemasan Food-grade Bersekat & Biaya Olah", cost: 1200, percentage: 8.4, color: "#8b5cf6" },
    { name: "Bumbu Dapur Rempah & Minyak Kelapa", cost: 750, percentage: 5.3, color: "#ec4899" },
  ];

  const actualHppPerPortion = costBreakdown.reduce((acc, item) => acc + item.cost, 0);
  const marginSavingsPerPortion = targetMaxBudget - actualHppPerPortion;

  // Macro budget calculations
  const totalPortionsMonth = dailyPortions * schoolDays;
  const totalBudgetSpent = totalPortionsMonth * actualHppPerPortion;
  const totalPaguCeiling = totalPortionsMonth * targetMaxBudget;
  const totalSavings = totalPaguCeiling - totalBudgetSpent;

  // Apex Donut Chart Options
  const donutOptions: ApexOptions = {
    chart: { type: "donut", fontFamily: "inherit" },
    labels: costBreakdown.map((c) => c.name),
    colors: costBreakdown.map((c) => c.color),
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: {
      y: { formatter: (val) => `Rp ${val.toLocaleString("id-ID")} / porsi` },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "HPP Aktual",
              formatter: () => `Rp ${actualHppPerPortion.toLocaleString("id-ID")}`,
              fontSize: "14px",
              fontWeight: 700,
              color: "#10b981",
            },
          },
        },
      },
    },
  };

  const donutSeries = costBreakdown.map((c) => c.cost);

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-4.5 dark:border-gray-800 dark:bg-white/[0.03]">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Rata-rata HPP per Porsi</span>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            Rp {actualHppPerPortion.toLocaleString("id-ID")}
          </p>
          <span className="text-[11px] text-gray-400 mt-1 block">Komposisi lengkap 4 Sehat 5 Sempurna</span>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4.5 dark:border-gray-800 dark:bg-white/[0.03]">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Pagu Maksimal Nasional</span>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            Rp {targetMaxBudget.toLocaleString("id-ID")}
          </p>
          <span className="text-[11px] text-gray-400 mt-1 block">Batas pagu APBN per porsi makan siang</span>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4.5 dark:border-gray-800 dark:bg-white/[0.03]">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Efisiensi per Porsi</span>
          <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            Rp {marginSavingsPerPortion.toLocaleString("id-ID")}
          </p>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">5.3% di bawah batas pagu</span>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4.5 dark:border-gray-800 dark:bg-white/[0.03]">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Porsi Bulan Ini</span>
          <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
            {totalPortionsMonth.toLocaleString("id-ID")} Porsi
          </p>
          <span className="text-[11px] text-gray-400 mt-1 block">{dailyPortions.toLocaleString()} porsi x {schoolDays} hari</span>
        </div>
      </div>

      {/* Main Grid: Cost Breakdown & Macro Simulator */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Cost Breakdown Donut & Table */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
              Rincian Struktur Biaya Bahan per Porsi
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
              Alokasi biaya komoditas pangan untuk menjamin standar AKG Kemenkes terpenuhi
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-5 flex justify-center">
                <div className="w-56 h-56">
                  <ReactApexChart options={donutOptions} series={donutSeries} type="donut" height={224} />
                </div>
              </div>

              <div className="sm:col-span-7 space-y-2">
                {costBreakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                      <span className="text-gray-700 dark:text-gray-300 font-medium truncate">{item.name}</span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="font-bold text-gray-900 dark:text-white">Rp {item.cost.toLocaleString("id-ID")}</span>
                      <span className="text-[10px] text-gray-400 block">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Macro Budget Simulator */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Simulator Pagu Anggaran MBG
              </h3>
              <Badge color="primary" size="sm">Kalkulator Makro</Badge>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-gray-700 dark:text-gray-300">Target Porsi Harian:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">
                    {dailyPortions.toLocaleString("id-ID")} Porsi / Hari
                  </span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={100000}
                  step={2500}
                  value={dailyPortions}
                  onChange={(e) => setDailyPortions(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="text-gray-700 dark:text-gray-300">Jumlah Hari Belajar Aktif Sekolah:</span>
                  <span className="text-blue-600 dark:text-blue-400 font-extrabold text-sm">
                    {schoolDays} Hari / Bulan
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={25}
                  step={1}
                  value={schoolDays}
                  onChange={(e) => setSchoolDays(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
                />
              </div>

              {/* Simulation Results Card */}
              <div className="mt-4 rounded-2xl bg-emerald-50/50 p-4 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-emerald-900 dark:text-emerald-300">Total Proyeksi Anggaran Bulanan:</span>
                  <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">
                    Rp {(totalBudgetSpent / 1000000000).toFixed(2)} Miliar
                  </span>
                </div>

                <div className="flex justify-between items-center text-[11px] text-gray-500">
                  <span>Pagu Penuh Maksimal:</span>
                  <span>Rp {(totalPaguCeiling / 1000000000).toFixed(2)} Miliar</span>
                </div>

                <div className="pt-2 border-t border-emerald-200 dark:border-emerald-800/60 flex justify-between items-center text-xs">
                  <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                    Estimasi Efisiensi Anggaran (Penghematan):
                  </span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                    + Rp {(totalSavings / 1000000).toLocaleString("id-ID")} Juta
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCostAnalysis;
