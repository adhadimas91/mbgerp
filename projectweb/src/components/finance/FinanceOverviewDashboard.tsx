"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import Link from "next/link";
import { FinancialSimulationModal } from "./FinancialSimulationModal";
import { FinancialReportLraPrintModal } from "./FinancialReportLraPrintModal";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface RegionalData {
  id: string;
  region: string;
  province: string;
  dpaCode: string;
  ceiling: number;
  realized: number;
  committed: number;
  rate: number;
  dailyPortions: number;
  status: "OPTIMAL" | "ON_TRACK" | "NEED_ATTENTION";
}

const REGIONAL_BUDGETS: RegionalData[] = [
  {
    id: "REG-01",
    region: "Jakarta Pusat",
    province: "DKI Jakarta",
    dpaCode: "DPA-MBG-2026-JKTPUSAT",
    ceiling: 14500000000,
    realized: 8700000000,
    committed: 2900000000,
    rate: 60.0,
    dailyPortions: 4500,
    status: "OPTIMAL",
  },
  {
    id: "REG-02",
    region: "Jakarta Timur",
    province: "DKI Jakarta",
    dpaCode: "DPA-MBG-2026-JKTTIMUR",
    ceiling: 18200000000,
    realized: 12740000000,
    committed: 3640000000,
    rate: 70.0,
    dailyPortions: 5600,
    status: "OPTIMAL",
  },
  {
    id: "REG-03",
    region: "Kab. Bogor",
    province: "Jawa Barat",
    dpaCode: "DPA-MBG-2026-BOGOR",
    ceiling: 22000000000,
    realized: 8200000000,
    committed: 4400000000,
    rate: 37.3,
    dailyPortions: 7200,
    status: "NEED_ATTENTION",
  },
  {
    id: "REG-04",
    region: "Kota Bandung",
    province: "Jawa Barat",
    dpaCode: "DPA-MBG-2026-BDG",
    ceiling: 15800000000,
    realized: 7500000000,
    committed: 3160000000,
    rate: 47.5,
    dailyPortions: 4800,
    status: "ON_TRACK",
  },
  {
    id: "REG-05",
    region: "Kab. Tangerang",
    province: "Banten",
    dpaCode: "DPA-MBG-2026-TNG",
    ceiling: 14000000000,
    realized: 6020000000,
    committed: 2800000000,
    rate: 43.0,
    dailyPortions: 4200,
    status: "ON_TRACK",
  },
];

const RECENT_TRANSACTIONS = [
  {
    id: "TX-20260827-01",
    date: "27 Agu 2026, 14:15 WIB",
    title: "Pembayaran Bahan Baku Beras & Ayam (PT Pangan Nusantara)",
    category: "BAHAN_BAKU",
    amount: 145000000,
    type: "EXPENSE",
    bank: "BNI Giro Operasional",
    status: "SUCCESS",
    sp2dCode: "SP2D-MBG-20260827-048",
  },
  {
    id: "TX-20260827-02",
    date: "27 Agu 2026, 11:30 WIB",
    title: "Pencairan Dana APBN Termin III BGN Pusat",
    category: "REVENUE_SP2D",
    amount: 4500000000,
    type: "INCOME",
    bank: "Bank Mandiri Kas BGN",
    status: "SUCCESS",
    sp2dCode: "SP2D-KASNEG-2026-9912",
  },
  {
    id: "TX-20260826-03",
    date: "26 Agu 2026, 16:45 WIB",
    title: "Payroll Insentif & Gaji Karyawan Dapur SPPG Periode Agustus",
    category: "OPERATIONAL",
    amount: 96800000,
    type: "EXPENSE",
    bank: "BNI Giro Operasional",
    status: "SUCCESS",
    sp2dCode: "SP2D-MBG-20260826-033",
  },
  {
    id: "TX-20260826-04",
    date: "26 Agu 2026, 09:20 WIB",
    title: "Bahan Bakar Minyak (BBM) & Servis Armada Box Pendingin",
    category: "LOGISTICS",
    amount: 18450000,
    type: "EXPENSE",
    bank: "BRI Kas DAK MBG",
    status: "SUCCESS",
    sp2dCode: "SP2D-MBG-20260826-012",
  },
  {
    id: "TX-20260825-05",
    date: "25 Agu 2026, 15:00 WIB",
    title: "Pengadaan Reagen Uji Lab Higiene & Sertifikasi ISO 22000",
    category: "QUALITY",
    amount: 12500000,
    type: "EXPENSE",
    bank: "BNI Giro Operasional",
    status: "SUCCESS",
    sp2dCode: "SP2D-MBG-20260825-009",
  },
];

export const FinanceOverviewDashboard: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState("ALL");
  const [selectedPeriod, setSelectedPeriod] = useState("TA_2026");
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isReportPrintOpen, setIsReportPrintOpen] = useState(false);

  // Financial Calculations
  const totalCeiling = REGIONAL_BUDGETS.reduce((acc, curr) => acc + curr.ceiling, 0); // 84.5 M
  const totalRealized = REGIONAL_BUDGETS.reduce((acc, curr) => acc + curr.realized, 0); // 43.16 M
  const totalCommitted = REGIONAL_BUDGETS.reduce((acc, curr) => acc + curr.committed, 0); // 16.9 M
  const totalRemaining = totalCeiling - totalRealized - totalCommitted; // 24.44 M
  const overallAbsorptionRate = Math.round((totalRealized / totalCeiling) * 100);

  const formatRupiah = (val: number) => {
    return "Rp " + Math.round(val).toLocaleString("id-ID");
  };

  const filteredRegions =
    selectedProvince === "ALL"
      ? REGIONAL_BUDGETS
      : REGIONAL_BUDGETS.filter((r) => r.province === selectedProvince);

  // ApexCharts: Monthly Cashflow Multi-Series Bar/Line Chart
  const chartOptions: ApexOptions = {
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 300,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 4,
      },
    },
    colors: ["#10b981", "#3b82f6", "#f59e0b"],
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: "#64748b", fontSize: "11px" } },
    },
    yaxis: {
      labels: {
        style: { colors: "#64748b", fontSize: "11px" },
        formatter: (val) => `${val} M`,
      },
    },
    grid: {
      borderColor: "#f1f5f9",
      strokeDashArray: 4,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      fontSize: "12px",
      labels: { colors: "#64748b" },
    },
    tooltip: {
      y: {
        formatter: (val) => `Rp ${val} Miliar`,
      },
    },
  };

  const chartSeries = [
    {
      name: "Realisasi Belanja SP2D",
      data: [3.2, 4.1, 4.8, 5.2, 5.6, 6.2, 6.8, 7.2, 0, 0, 0, 0],
    },
    {
      name: "Komitmen Kontrak PO",
      data: [1.5, 1.8, 2.0, 2.2, 2.5, 2.8, 3.1, 3.2, 0, 0, 0, 0],
    },
    {
      name: "Alokasi Pagu Anggaran Bulanan",
      data: [7.0, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0],
    },
  ];

  // 4 Pillars BGN Categories
  const bgnPillars = [
    {
      code: "POS-01",
      name: "Bahan Baku Pangan Bergizi",
      percentageStandard: 75,
      allocated: totalCeiling * 0.75,
      realized: totalRealized * 0.76,
      committed: totalCommitted * 0.75,
      remaining: (totalCeiling * 0.75) - (totalRealized * 0.76),
      rate: Math.round(((totalRealized * 0.76) / (totalCeiling * 0.75)) * 100),
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
    },
    {
      code: "POS-02",
      name: "Biaya Operasional Dapur Sentral",
      percentageStandard: 15,
      allocated: totalCeiling * 0.15,
      realized: totalRealized * 0.14,
      committed: totalCommitted * 0.15,
      remaining: (totalCeiling * 0.15) - (totalRealized * 0.14),
      rate: Math.round(((totalRealized * 0.14) / (totalCeiling * 0.15)) * 100),
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300",
    },
    {
      code: "POS-03",
      name: "Logistik & Armada Pengantaran",
      percentageStandard: 8,
      allocated: totalCeiling * 0.08,
      realized: totalRealized * 0.08,
      committed: totalCommitted * 0.08,
      remaining: (totalCeiling * 0.08) - (totalRealized * 0.08),
      rate: Math.round(((totalRealized * 0.08) / (totalCeiling * 0.08)) * 100),
      color: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
    },
    {
      code: "POS-04",
      name: "Kualitas, Higiene & Kepatuhan ISO",
      percentageStandard: 2,
      allocated: totalCeiling * 0.02,
      realized: totalRealized * 0.02,
      committed: totalCommitted * 0.02,
      remaining: (totalCeiling * 0.02) - (totalRealized * 0.02),
      rate: Math.round(((totalRealized * 0.02) / (totalCeiling * 0.02)) * 100),
      color: "from-purple-500 to-pink-600",
      bgLight: "bg-purple-50 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300",
    },
  ];

  const reportData = {
    fiscalYear: 2026,
    periodName: "Semester I & II s.d Agustus 2026",
    totalCeiling,
    totalDisbursed: totalRealized,
    totalCommitted,
    totalRemaining,
    absorptionRate: overallAbsorptionRate,
    categories: bgnPillars,
    regionalBreakdown: REGIONAL_BUDGETS,
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Executive Overview */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-900 to-emerald-900 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              APBN &amp; DAK Non-Fisik T.A 2026
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20">
              Standar Alokasi BGN: 75% : 15% : 8% : 2%
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight">
            Dashboard Eksekutif Finansial &amp; Anggaran MBG
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Monitoring real-time alokasi DPA pagu anggaran, realisasi penyerapan kas SP2D, komitmen pengadaan bahan baku, serta rekonsiliasi kas bank BUMN terpadu.
          </p>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-300">Wilayah:</span>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="bg-slate-800 text-white text-xs font-medium rounded px-2 py-1 border border-white/20 focus:outline-none"
              >
                <option value="ALL">Seluruh Regional (Nasional)</option>
                <option value="DKI Jakarta">DKI Jakarta</option>
                <option value="Jawa Barat">Jawa Barat</option>
                <option value="Banten">Banten</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-300">Periode:</span>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-slate-800 text-white text-xs font-medium rounded px-2 py-1 border border-white/20 focus:outline-none"
              >
                <option value="TA_2026">T.A 2026 (Penuh)</option>
                <option value="SEM_1">Semester I 2026</option>
                <option value="TRI_3">Triwulan III (Jul - Sep)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setIsSimulatorOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-md transition"
            >
              <span>🧮</span> Simulator Proyeksi
            </button>
            <button
              onClick={() => setIsReportPrintOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md transition"
            >
              <span>🖨️</span> Cetak LRA MBG
            </button>
          </div>
        </div>
      </div>

      {/* 5 Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* KPI 1 */}
        <div className="p-4 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Plafon Pagu DPA</span>
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 text-xs">
              🏛️ DPA
            </span>
          </div>
          <div className="text-xl font-black text-gray-900 dark:text-white">
            {formatRupiah(totalCeiling)}
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
            Alokasi APBN Pusat &amp; DAK Non-Fisik
          </p>
        </div>

        {/* KPI 2 */}
        <div className="p-4 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Realisasi Serapan Kas</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs">
              💸 SP2D
            </span>
          </div>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
            {formatRupiah(totalRealized)}
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full"
              style={{ width: `${overallAbsorptionRate}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-500 mt-1">
            <span>Tingkat Serap:</span>
            <span className="font-bold text-emerald-600">{overallAbsorptionRate}%</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-4 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Dana Terikat PO</span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300 text-xs">
              📜 Komitmen
            </span>
          </div>
          <div className="text-xl font-black text-amber-600 dark:text-amber-400">
            {formatRupiah(totalCommitted)}
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
            Kontrak Suplai Aktif (PO Berjalan)
          </p>
        </div>

        {/* KPI 4 */}
        <div className="p-4 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Sisa Pagu Anggaran Bebas</span>
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300 text-xs">
              💰 Saldo
            </span>
          </div>
          <div className="text-xl font-black text-purple-600 dark:text-purple-400">
            {formatRupiah(totalRemaining)}
          </div>
          <p className="text-[11px] text-purple-700 dark:text-purple-300 mt-1 font-semibold">
            {Math.round((totalRemaining / totalCeiling) * 100)}% Tersedia untuk Triwulan IV
          </p>
        </div>

        {/* KPI 5 */}
        <div className="p-4 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Unit Cost Riil / Porsi</span>
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300 text-xs">
              🥗 Efisiensi
            </span>
          </div>
          <div className="text-xl font-black text-teal-600 dark:text-teal-400">
            Rp 14.250 <span className="text-xs font-normal text-gray-500">/ porsi</span>
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-bold">
            ⚡ 5.0% Lebih Hemat vs Pagu Rp 15.000
          </p>
        </div>
      </div>

      {/* 4 Pillars BGN Budget Category Grid */}
      <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span>📊</span> Struktur Alokasi &amp; Serapan 4 Pos Belanja Standar BGN
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Pedoman resmi alokasi komposisi pagu nasional (Bahan Baku 75%, Operasional 15%, Logistik 8%, QC/ISO 2%)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/finance/budgets"
              className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg dark:bg-blue-950/40 dark:text-blue-300 transition"
            >
              Kelola Alokasi Anggaran →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {bgnPillars.map((pillar) => (
            <div
              key={pillar.code}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-gray-50/50 dark:bg-gray-800/40 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-gray-500">
                  {pillar.code} ({pillar.percentageStandard}%)
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${pillar.bgLight}`}>
                  Serap: {pillar.rate}%
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">
                  {pillar.name}
                </h4>
                <div className="text-lg font-black text-gray-900 dark:text-white mt-1">
                  {formatRupiah(pillar.realized)}
                </div>
                <span className="text-[11px] text-gray-500 dark:text-gray-400 block">
                  dari total pagu {formatRupiah(pillar.allocated)}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${pillar.color} rounded-full`}
                    style={{ width: `${Math.min(100, pillar.rate)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>Sisa: {formatRupiah(pillar.remaining)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts & Cashflow Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left: Monthly Trend Chart (8 Cols) */}
        <div className="col-span-12 xl:col-span-8 p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>📈</span> Tren Arus Kas &amp; Penyerapan Anggaran Bulanan
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Perbandingan Realisasi SP2D vs Komitmen Kontrak vs Alokasi Pagu Rata-rata Bulanan (Miliar Rp)
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
              T.A 2026 Realtime
            </span>
          </div>

          <div>
            <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={280} />
          </div>
        </div>

        {/* Right: Bank Liquidity & Reconciliation Widget (4 Cols) */}
        <div className="col-span-12 xl:col-span-4 space-y-4">
          <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <span>🏦</span> Saldo Rekening Kas Terpadu
                </h4>
                <p className="text-[11px] text-gray-500">Rekonsiliasi Bank BUMN MBG</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-bold">
                100% Cocok
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Bank 1 */}
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gray-800 dark:text-gray-200">BNI Giro Operasional MBG</span>
                  <span className="text-[10px] font-mono text-gray-500">0199-2831-900</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-[11px]">Saldo Efektif:</span>
                  <span className="text-sm font-black text-gray-900 dark:text-white">Rp 12.840.000.000</span>
                </div>
              </div>

              {/* Bank 2 */}
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gray-800 dark:text-gray-200">Bank Mandiri Virtual Account PO</span>
                  <span className="text-[10px] font-mono text-gray-500">1420-0091-882</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-[11px]">Saldo Efektif:</span>
                  <span className="text-sm font-black text-gray-900 dark:text-white">Rp 8.650.000.000</span>
                </div>
              </div>

              {/* Bank 3 */}
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gray-800 dark:text-gray-200">BRI Kas DAK MBG Daerah</span>
                  <span className="text-[10px] font-mono text-gray-500">0341-0100-291</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-[11px]">Saldo Efektif:</span>
                  <span className="text-sm font-black text-gray-900 dark:text-white">Rp 2.950.000.000</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span className="text-xs text-gray-500">Total Kas Likuid:</span>
              <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                Rp 24.440.000.000
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Absorption Matrix & Recent Transactions Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left: Regional Budget Absorption Table (7 Cols) */}
        <div className="col-span-12 xl:col-span-7 p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>🗺️</span> Matriks Realisasi Serapan per Regional MBG
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Monitoring serapan DPA per kabupaten/kota sasaran MBG
              </p>
            </div>
            <Link
              href="/finance/budgets"
              className="text-xs font-bold text-blue-600 hover:text-blue-700"
            >
              Lihat Detail DPA →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                  <th className="pb-2 font-semibold">Wilayah / Satker</th>
                  <th className="pb-2 font-semibold">Pagu DPA</th>
                  <th className="pb-2 font-semibold">Realisasi SP2D</th>
                  <th className="pb-2 font-semibold">Kemajuan Serap</th>
                  <th className="pb-2 text-right font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                {filteredRegions.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40">
                    <td className="py-3">
                      <div className="font-bold text-gray-900 dark:text-white">{reg.region}</div>
                      <div className="text-[10px] text-gray-400">{reg.dpaCode}</div>
                    </td>
                    <td className="py-3 font-mono">{formatRupiah(reg.ceiling)}</td>
                    <td className="py-3 font-mono font-bold text-emerald-600">{formatRupiah(reg.realized)}</td>
                    <td className="py-3">
                      <div className="w-28">
                        <div className="flex justify-between text-[10px] mb-0.5">
                          <span className="font-bold text-gray-800 dark:text-gray-200">{reg.rate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              reg.rate >= 60
                                ? "bg-emerald-500"
                                : reg.rate >= 40
                                ? "bg-blue-500"
                                : "bg-amber-500"
                            }`}
                            style={{ width: `${reg.rate}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          reg.status === "OPTIMAL"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                            : reg.status === "ON_TRACK"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
                        }`}
                      >
                        {reg.status === "OPTIMAL" && "✅ Optimal"}
                        {reg.status === "ON_TRACK" && "🟢 On Track"}
                        {reg.status === "NEED_ATTENTION" && "⚠️ Akselerasi"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Recent Financial Transactions (5 Cols) */}
        <div className="col-span-12 xl:col-span-5 p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>🧾</span> Transaksi Kas &amp; SP2D Terkini
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Log mutasi kas masuk / keluar program MBG
              </p>
            </div>
            <Link
              href="/finance/expenditures"
              className="text-xs font-bold text-blue-600 hover:text-blue-700"
            >
              Semua SPJ →
            </Link>
          </div>

          <div className="space-y-3">
            {RECENT_TRANSACTIONS.map((tx) => (
              <div
                key={tx.id}
                className="p-3 rounded-xl border border-gray-100 dark:border-gray-700/60 bg-gray-50/50 dark:bg-gray-800/30 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      tx.type === "INCOME"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                    }`}
                  >
                    {tx.type === "INCOME" ? "⬇️" : "⬆️"}
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 dark:text-white line-clamp-1">
                      {tx.title}
                    </h5>
                    <div className="text-[10px] text-gray-500 flex items-center gap-2 mt-0.5">
                      <span>{tx.date}</span>
                      <span>•</span>
                      <span className="font-mono">{tx.bank}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div
                    className={`font-mono font-bold ${
                      tx.type === "INCOME" ? "text-emerald-600" : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {tx.type === "INCOME" ? "+" : "-"} {formatRupiah(tx.amount)}
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                    LUNAS
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/finance/budgets"
          className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-500 hover:shadow-md transition flex items-center gap-3"
        >
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300 text-xl">
            🏛️
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white">Alokasi Anggaran DPA</h4>
            <p className="text-[11px] text-gray-500">Plafon pagu regional &amp; sumber dana APBN</p>
          </div>
        </Link>

        <Link
          href="/finance/expenditures"
          className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-emerald-500 hover:shadow-md transition flex items-center gap-3"
        >
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300 text-xl">
            🧾
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white">Pencatatan Pengeluaran (SPJ)</h4>
            <p className="text-[11px] text-gray-500">Biaya bahan baku, operasional &amp; logistik</p>
          </div>
        </Link>

        <Link
          href="/finance/payments"
          className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-500 hover:shadow-md transition flex items-center gap-3"
        >
          <div className="p-3 rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-300 text-xl">
            💳
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white">Pembayaran Supplier &amp; PO</h4>
            <p className="text-[11px] text-gray-500">Verifikasi 3-way matching &amp; transfer SP2D</p>
          </div>
        </Link>
      </div>

      {/* Modals */}
      <FinancialSimulationModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        currentCeiling={totalCeiling}
      />

      <FinancialReportLraPrintModal
        isOpen={isReportPrintOpen}
        onClose={() => setIsReportPrintOpen(false)}
        reportData={reportData}
      />
    </div>
  );
};
