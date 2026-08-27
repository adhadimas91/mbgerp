"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import Link from "next/link";
import { KitchenExpenseRecordModal, KitchenExpenseItem } from "./KitchenExpenseRecordModal";
import { KitchenCostAnalysisModal } from "./KitchenCostAnalysisModal";
import { KitchenFinancialReportPrintModal } from "./KitchenFinancialReportPrintModal";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface KitchenProfile {
  id: string;
  name: string;
  location: string;
  dpaCode: string;
  dailyCapacity: number;
  activePortionsToday: number;
  headChef: string;
  nutritionist: string;
  bgnPlafonPerPortion: number;
  currentHpp: number;
  monthlyBudget: number;
  monthlyRealized: number;
  pettyCashLimit: number;
  pettyCashBalance: number;
}

const KITCHEN_PROFILES: KitchenProfile[] = [
  {
    id: "SPPG-01",
    name: "SPPG Harmoni Sentral 01",
    location: "Gambir, Jakarta Pusat",
    dpaCode: "DPA-MBG-2026-SPPG01-PUSAT",
    dailyCapacity: 4000,
    activePortionsToday: 3500,
    headChef: "Chef Bambang Supardi",
    nutritionist: "drg. Fitriani, S.Gz",
    bgnPlafonPerPortion: 15000,
    currentHpp: 13850,
    monthlyBudget: 1312500000, // ~1.31 Miliar
    monthlyRealized: 825000000,
    pettyCashLimit: 25000000,
    pettyCashBalance: 14250000,
  },
  {
    id: "SPPG-02",
    name: "SPPG Melati Mandiri 02",
    location: "Kebayoran Baru, Jakarta Selatan",
    dpaCode: "DPA-MBG-2026-SPPG02-SELATAN",
    dailyCapacity: 3000,
    activePortionsToday: 2500,
    headChef: "Chef Aris Munandar",
    nutritionist: "Nurul Hidayah, S.Gz",
    bgnPlafonPerPortion: 15000,
    currentHpp: 14100,
    monthlyBudget: 937500000,
    monthlyRealized: 610000000,
    pettyCashLimit: 20000000,
    pettyCashBalance: 9800000,
  },
  {
    id: "SPPG-03",
    name: "SPPG Garuda Sehat 03",
    location: "Cakung, Jakarta Timur",
    dpaCode: "DPA-MBG-2026-SPPG03-TIMUR",
    dailyCapacity: 4500,
    activePortionsToday: 4000,
    headChef: "Chef Surya Wijaya",
    nutritionist: "Ratna Sari, M.Gz",
    bgnPlafonPerPortion: 15000,
    currentHpp: 13650,
    monthlyBudget: 1500000000,
    monthlyRealized: 980000000,
    pettyCashLimit: 30000000,
    pettyCashBalance: 18500000,
  },
];

const INITIAL_EXPENSES: KitchenExpenseItem[] = [
  {
    id: "EXP-DPR-001",
    date: "27 Agu 2026, 03:40 WIB",
    sppgUnit: "SPPG Harmoni Sentral 01",
    category: "BAHAN_TAMBAHAN",
    categoryLabel: "Bahan Baku & Bumbu Darurat",
    title: "Bumbu Rempah Segar & Daun Aromatik (Pasar Senen)",
    amount: 320000,
    vendor: "UD Bumbu Barokah",
    picName: "Chef Bambang Supardi",
    picRole: "Head Chef SPPG",
    receiptNumber: "RCP-DPR-20260827-01",
    paymentMethod: "KAS_KECIL",
    status: "APPROVED",
    notes: "Penambahan rempah untuk penyesuaian kuah kaldu ayam panggang batch 2.",
  },
  {
    id: "EXP-DPR-002",
    date: "27 Agu 2026, 04:15 WIB",
    sppgUnit: "SPPG Harmoni Sentral 01",
    category: "COLD_CHAIN",
    categoryLabel: "Es Batu Kristal Food Grade",
    title: "Isi Ulang 8 Bal Es Kristal Higienis Chiller Sayur",
    amount: 160000,
    vendor: "CV Polar Ice Kristal",
    picName: "Siti Rahma",
    picRole: "Packaging Lead",
    receiptNumber: "RCP-DPR-20260827-02",
    paymentMethod: "KAS_KECIL",
    status: "APPROVED",
    notes: "Holding dingin buah pisang & sayur lalapan sebelum tray packaging.",
  },
  {
    id: "EXP-DPR-003",
    date: "26 Agu 2026, 14:00 WIB",
    sppgUnit: "SPPG Harmoni Sentral 01",
    category: "SERVIS_ALAT",
    categoryLabel: "Servis Mesin Dapur Darurat",
    title: "Penggantian Silicone Heating Seal Tray Sealer Line 5",
    amount: 450000,
    vendor: "PT Teknik Packaging Mandiri",
    picName: "Agus Pratama",
    picRole: "Teknisi Maintenance Dapur",
    receiptNumber: "RCP-DPR-20260826-08",
    paymentMethod: "KAS_KECIL",
    status: "APPROVED",
    notes: "Preventive replacement agar sealing food tray kedap udara 100%.",
  },
  {
    id: "EXP-DPR-004",
    date: "26 Agu 2026, 09:30 WIB",
    sppgUnit: "SPPG Harmoni Sentral 01",
    category: "SANITASI",
    categoryLabel: "Chemical Sanitizer & APD",
    title: "Refill 5 Galon Food-Grade Hand Sanitizer & Hairnet Steril",
    amount: 580000,
    vendor: "CV Higiene Prima Food",
    picName: "drg. Fitriani",
    picRole: "Ahli Gizi SPPG",
    receiptNumber: "RCP-DPR-20260826-03",
    paymentMethod: "KAS_KECIL",
    status: "APPROVED",
    notes: "Stok gatekeeper higiene masuk area steril persiapan shift malam.",
  },
];

const MENU_ITEMS_COST = [
  {
    name: "Nasi Pulen Pandan Wangi",
    category: "Karbohidrat",
    portionWeight: "200 gram",
    rawMaterialCost: 1850,
    targetBudget: 2000,
    variance: -150,
    status: "OPTIMAL",
  },
  {
    name: "Ayam Panggang Kecap Rempah",
    category: "Protein Hewani",
    portionWeight: "100 gram",
    rawMaterialCost: 4850,
    targetBudget: 5200,
    variance: -350,
    status: "OPTIMAL",
  },
  {
    name: "Tumis Pelangi (Wortel, Buncis, Jagung)",
    category: "Sayuran Segar",
    portionWeight: "80 gram",
    rawMaterialCost: 1350,
    targetBudget: 1500,
    variance: -150,
    status: "OPTIMAL",
  },
  {
    name: "Tempe Mendoan Gurih Renyah",
    category: "Protein Nabati",
    portionWeight: "50 gram",
    rawMaterialCost: 950,
    targetBudget: 1000,
    variance: -50,
    status: "OPTIMAL",
  },
  {
    name: "Pisang Raja + Susu UHT 200ml",
    category: "Buah & Susu",
    portionWeight: "1 buah + 1 kotak",
    rawMaterialCost: 2450,
    targetBudget: 2600,
    variance: -150,
    status: "OPTIMAL",
  },
];

export const KitchenFinancialDashboard: React.FC = () => {
  const [selectedSppgId, setSelectedSppgId] = useState<string>("SPPG-01");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("TODAY");
  const [expenses, setExpenses] = useState<KitchenExpenseItem[]>(INITIAL_EXPENSES);
  const [expenseSearch, setExpenseSearch] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  // Modals state
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);
  const [isCostAnalysisModalOpen, setIsCostAnalysisModalOpen] = useState<boolean>(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);

  const currentProfile =
    KITCHEN_PROFILES.find((p) => p.id === selectedSppgId) || KITCHEN_PROFILES[0];

  const totalDailyPortions = currentProfile.activePortionsToday;
  const currentHpp = currentProfile.currentHpp;
  const totalDailyCost = totalDailyPortions * currentHpp;
  const standardBgnCost = totalDailyPortions * currentProfile.bgnPlafonPerPortion;
  const dailySavings = standardBgnCost - totalDailyCost;
  const efficiencyPercent = ((dailySavings / standardBgnCost) * 100).toFixed(1);

  // Breakdown Nominal
  const foodCostNominal = Math.round(totalDailyCost * 0.718);
  const laborCostNominal = Math.round(totalDailyCost * 0.134);
  const utilityCostNominal = Math.round(totalDailyCost * 0.082);
  const packagingCostNominal = Math.round(totalDailyCost * 0.045);
  const sanitationCostNominal = Math.round(totalDailyCost * 0.021);

  const handleSaveExpense = (newExp: KitchenExpenseItem) => {
    setExpenses([newExp, ...expenses]);
  };

  const filteredExpenses = expenses.filter((item) => {
    const matchSppg = item.sppgUnit === currentProfile.name;
    const matchSearch =
      item.title.toLowerCase().includes(expenseSearch.toLowerCase()) ||
      item.vendor.toLowerCase().includes(expenseSearch.toLowerCase()) ||
      item.receiptNumber.toLowerCase().includes(expenseSearch.toLowerCase()) ||
      item.picName.toLowerCase().includes(expenseSearch.toLowerCase());
    const matchCategory =
      categoryFilter === "ALL" || item.category === categoryFilter;
    return matchSppg && matchSearch && matchCategory;
  });

  const totalPettyCashSpent = expenses
    .filter((e) => e.sppgUnit === currentProfile.name && e.status === "APPROVED")
    .reduce((sum, item) => sum + item.amount, 0);

  // ApexChart 1: Weekly Daily Production Cost vs BGN Plafon
  const costTrendChartOptions: ApexOptions = {
    chart: {
      type: "area",
      height: 280,
      toolbar: { show: false },
      fontFamily: "inherit",
    },
    stroke: { curve: "smooth", width: [3, 2] },
    colors: ["#10b981", "#64748b"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: ["Kamis (21/8)", "Jumat (22/8)", "Sabtu (23/8)", "Senin (25/8)", "Selasa (26/8)", "Rabu (27/8)"],
      labels: { style: { colors: "#6b7280", fontSize: "11px" } },
    },
    yaxis: {
      labels: {
        formatter: (val) => `Rp ${(val / 1000000).toFixed(1)}jt`,
        style: { colors: "#6b7280", fontSize: "11px" },
      },
    },
    tooltip: {
      y: { formatter: (val) => `Rp ${val.toLocaleString("id-ID")}` },
    },
    legend: { position: "top", horizontalAlign: "right" },
    grid: { borderColor: "#f1f5f9" },
  };

  const costTrendChartSeries = [
    {
      name: "Realisasi Biaya Dapur",
      data: [46200000, 47800000, 48100000, 48900000, 48350000, 48475000],
    },
    {
      name: "Plafon Pagu BGN (Rp 15k)",
      data: [52500000, 52500000, 52500000, 52500000, 52500000, 52500000],
    },
  ];

  // ApexChart 2: Cost Structure Breakdown Donut
  const costBreakdownDonutOptions: ApexOptions = {
    chart: { type: "donut", height: 280, fontFamily: "inherit" },
    labels: [
      "Bahan Baku Pangan (71.8%)",
      "Tenaga Kerja Brigade (13.4%)",
      "Utilitas Gas/Listrik/Air (8.2%)",
      "Food Tray & Packaging (4.5%)",
      "Sanitasi & QC Lab (2.1%)",
    ],
    colors: ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"],
    legend: { position: "bottom", fontSize: "11px" },
    dataLabels: { enabled: true, formatter: (val) => `${Number(val).toFixed(1)}%` },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "HPP Total",
              formatter: () => `Rp ${currentHpp.toLocaleString("id-ID")}`,
            },
          },
        },
      },
    },
  };

  const costBreakdownDonutSeries = [71.8, 13.4, 8.2, 4.5, 2.1];

  // ApexChart 3: Live Energy & Utility Breakdown
  const energyBarChartOptions: ApexOptions = {
    chart: { type: "bar", height: 260, toolbar: { show: false }, fontFamily: "inherit" },
    plotOptions: { bar: { borderRadius: 6, columnWidth: "40%", distributed: true } },
    colors: ["#f97316", "#06b6d4", "#3b82f6", "#10b981"],
    xaxis: {
      categories: ["Gas LPG 50kg", "Listrik Chiller/Oven", "Air RO Sanitasi", "Chemical Sanitasi"],
      labels: { style: { fontSize: "10px", colors: "#6b7280" } },
    },
    yaxis: {
      labels: {
        formatter: (val) => `Rp ${(val / 1000).toFixed(0)}k`,
        style: { fontSize: "10px", colors: "#6b7280" },
      },
    },
    tooltip: { y: { formatter: (val) => `Rp ${val.toLocaleString("id-ID")}` } },
    legend: { show: false },
    grid: { borderColor: "#f1f5f9" },
  };

  const energyBarChartSeries = [
    {
      name: "Biaya Harian",
      data: [2350000, 1850000, 625000, 1000000],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Executive Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-emerald-950 text-white shadow-xl border border-emerald-900/30">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Executive Kitchen Finance Hub
              </span>
              <span className="text-xs text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full font-mono">
                {currentProfile.dpaCode}
              </span>
              <span className="text-xs text-amber-300 bg-amber-500/10 border border-amber-400/30 px-2.5 py-0.5 rounded-full font-semibold">
                Kepala MBG / Kepala SPPG Mode
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
              Dashboard Finansial & Biaya Operasional Dapur SPPG
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl">
              Pengawasan terpusat biaya pokok produksi (HPP per porsi), realisasi serapan anggaran belanja bahan baku pangan, biaya energi utilitas, tenaga kerja, serta akuntabilitas kas kecil dapur sentral.
            </p>
          </div>

          {/* Dapur Selector & Period Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-2.5 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-emerald-300">Unit Dapur SPPG:</span>
                <select
                  value={selectedSppgId}
                  onChange={(e) => setSelectedSppgId(e.target.value)}
                  className="bg-slate-900/80 text-white text-xs font-semibold rounded px-2.5 py-1 border border-white/20 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                >
                  {KITCHEN_PROFILES.map((prof) => (
                    <option key={prof.id} value={prof.id}>
                      {prof.name} ({prof.dailyCapacity.toLocaleString("id-ID")} Porsi)
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-emerald-300">Periode:</span>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="bg-slate-900/80 text-white text-xs font-semibold rounded px-2.5 py-1 border border-white/20 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                >
                  <option value="TODAY">Hari Ini (27 Agu 2026)</option>
                  <option value="THIS_WEEK">Minggu Ini (W34 2026)</option>
                  <option value="THIS_MONTH">Bulan Ini (Agustus 2026)</option>
                </select>
              </div>
            </div>

            {/* Direct Link to Kitchen Operations */}
            <Link
              href="/dashboard/kitchen"
              className="px-3.5 py-2 text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>🍳</span>
              <span>Lini Produksi Dapur</span>
            </Link>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="font-semibold text-white">PIC Dapur:</span>
            <span>{currentProfile.headChef}</span>
            <span>•</span>
            <span className="font-semibold text-white">Ahli Gizi:</span>
            <span>{currentProfile.nutritionist}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsExpenseModalOpen(true)}
              className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <span>➕</span>
              <span>Catat Kas Kecil Dapur</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCostAnalysisModalOpen(true)}
              className="px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <span>🎛️</span>
              <span>Analisis HPP & Skenario</span>
            </button>

            <button
              type="button"
              onClick={() => setIsPrintModalOpen(true)}
              className="px-3.5 py-2 text-xs font-bold text-gray-900 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <span>🖨️</span>
              <span>Cetak Laporan SPJ Dapur</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Executive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Card 1: Total Biaya Produksi */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-theme-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
              Total Biaya Produksi
            </span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50">
              💰
            </span>
          </div>
          <div className="text-xl font-black text-gray-900 dark:text-white font-mono">
            Rp {totalDailyCost.toLocaleString("id-ID")}
          </div>
          <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
            <span className="font-bold text-gray-800 dark:text-gray-200">{totalDailyPortions.toLocaleString("id-ID")}</span> porsi hari ini
          </div>
        </div>

        {/* Card 2: HPP per Porsi */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-theme-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              HPP Pokok / Porsi
            </span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50">
              🍱
            </span>
          </div>
          <div className="text-xl font-black text-emerald-700 dark:text-emerald-300 font-mono">
            Rp {currentHpp.toLocaleString("id-ID")}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
            <span>↓ Hemat Rp {dailySavings.toLocaleString("id-ID")} ({efficiencyPercent}%)</span>
          </div>
        </div>

        {/* Card 3: Food Cost Ratio */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-theme-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Food Cost Ratio
            </span>
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50">
              🥩
            </span>
          </div>
          <div className="text-xl font-black text-gray-900 dark:text-white font-mono">
            71.8%
          </div>
          <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
            Target BGN: <span className="font-bold text-emerald-600">Maks. 75.0%</span> (Aman)
          </div>
        </div>

        {/* Card 4: Biaya Operasional Utilitas */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-theme-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Energi & Utilitas (OPEX)
            </span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/50">
              ⚡
            </span>
          </div>
          <div className="text-xl font-black text-gray-900 dark:text-white font-mono">
            Rp {(utilityCostNominal / 1000000).toFixed(2)} jt
          </div>
          <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
            Gas LPG, Listrik & Air RO
          </div>
        </div>

        {/* Card 5: Biaya Tenaga Kerja (Labor) */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-theme-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Upah Tenaga Kerja Dapur
            </span>
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/50">
              👨‍🍳
            </span>
          </div>
          <div className="text-xl font-black text-gray-900 dark:text-white font-mono">
            Rp {(laborCostNominal / 1000000).toFixed(2)} jt
          </div>
          <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
            18 Kru Dapur (3 Shift Masak)
          </div>
        </div>

        {/* Card 6: Kas Kecil Dapur */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-theme-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Sisa Kas Kecil Dapur
            </span>
            <span className="p-1.5 rounded-lg bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50">
              🏷️
            </span>
          </div>
          <div className="text-xl font-black text-cyan-700 dark:text-cyan-300 font-mono">
            Rp {(currentProfile.pettyCashBalance / 1000000).toFixed(1)} jt
          </div>
          <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
            Pagu: Rp {(currentProfile.pettyCashLimit / 1000000).toFixed(0)} jt
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Realisasi Biaya Mingguan vs Pagu BGN */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-theme-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>📈</span> Tren Realisasi Biaya Produksi vs Plafon Pagu BGN
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Monitoring stabilitas HPP harian dapur terhadap plafon maksimal Rp 15.000 / porsi.
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              100% On-Budget
            </span>
          </div>
          <ReactApexChart
            options={costTrendChartOptions}
            series={costTrendChartSeries}
            type="area"
            height={280}
          />
        </div>

        {/* Chart 2: Komposisi Struktur Biaya HPP */}
        <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-theme-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>🍩</span> Komposisi HPP per Porsi
              </h2>
              <button
                type="button"
                onClick={() => setIsCostAnalysisModalOpen(true)}
                className="text-[11px] font-bold text-blue-600 hover:underline"
              >
                Rincian →
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Proporsi 5 pilar biaya operasional dapur sentral SPPG.
            </p>
          </div>
          <div className="my-auto">
            <ReactApexChart
              options={costBreakdownDonutOptions}
              series={costBreakdownDonutSeries}
              type="donut"
              height={280}
            />
          </div>
        </div>
      </div>

      {/* Live Telemetry & Utility Cost Meters Grid */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-theme-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                Pusat Telemetri & Monitoring Biaya Utilitas Operasional Dapur (OPEX)
              </h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Live meteran konsumsi energi, bahan bakar boiler masak, beban listrik cold chain, dan bahan kimia sanitasi ISO 22000.
            </p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200">
            Realtime IoT Meters Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Metric 1: Gas LPG 50kg */}
          <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/30">
            <div className="flex items-center justify-between text-xs font-bold text-orange-800 dark:text-orange-300">
              <span>🔥 Gas LPG 50kg Industri</span>
              <span className="font-mono">78% Kapasitas</span>
            </div>
            <div className="text-lg font-black text-gray-900 dark:text-white font-mono mt-2">
              Rp 2.350.000 <span className="text-xs text-gray-500 font-normal">/ hari</span>
            </div>
            <div className="text-[11px] text-gray-600 dark:text-gray-400 mt-1">
              Konsumsi: <strong>118 kg</strong> (Steam Boiler 200L, Tilting Wok & Oven)
            </div>
            <div className="w-full bg-orange-200 dark:bg-orange-900/40 rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: "78%" }}></div>
            </div>
          </div>

          {/* Metric 2: Listrik PLN Beban Chiller */}
          <div className="p-4 rounded-xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-900/30">
            <div className="flex items-center justify-between text-xs font-bold text-cyan-800 dark:text-cyan-300">
              <span>⚡ Listrik Cold Chain & Oven</span>
              <span className="font-mono">820 kWh</span>
            </div>
            <div className="text-lg font-black text-gray-900 dark:text-white font-mono mt-2">
              Rp 1.850.000 <span className="text-xs text-gray-500 font-normal">/ hari</span>
            </div>
            <div className="text-[11px] text-gray-600 dark:text-gray-400 mt-1">
              Beban Puncak: <strong>Cold Storage Chiller</strong> & Combi Steamer
            </div>
            <div className="w-full bg-cyan-200 dark:bg-cyan-900/40 rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: "65%" }}></div>
            </div>
          </div>

          {/* Metric 3: Air Filtrasi RO & Water Softener */}
          <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30">
            <div className="flex items-center justify-between text-xs font-bold text-blue-800 dark:text-blue-300">
              <span>💧 Air Filtrasi RO & Boiler</span>
              <span className="font-mono">14.5 m³</span>
            </div>
            <div className="text-lg font-black text-gray-900 dark:text-white font-mono mt-2">
              Rp 625.000 <span className="text-xs text-gray-500 font-normal">/ hari</span>
            </div>
            <div className="text-[11px] text-gray-600 dark:text-gray-400 mt-1">
              Kualitas Air: <strong>TDS 8 ppm</strong> (Steril Sanitasi Alat & Masak)
            </div>
            <div className="w-full bg-blue-200 dark:bg-blue-900/40 rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "45%" }}></div>
            </div>
          </div>

          {/* Metric 4: Chemical Sanitasi & Desinfektan */}
          <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-300">
              <span>🧼 Sanitasi & APD Dapur</span>
              <span className="font-mono">100% Steril</span>
            </div>
            <div className="text-lg font-black text-gray-900 dark:text-white font-mono mt-2">
              Rp 1.000.000 <span className="text-xs text-gray-500 font-normal">/ hari</span>
            </div>
            <div className="text-[11px] text-gray-600 dark:text-gray-400 mt-1">
              Standar: <strong>ISO 22000</strong> (Ecolab Food-Grade Sanitizer)
            </div>
            <div className="w-full bg-emerald-200 dark:bg-emerald-900/40 rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "90%" }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Columns: Recipe Costing Breakdown & Food Loss / Scrap Variance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recipe Costing per Menu Komponen */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-theme-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>📋</span> Rincian HPP Bahan Baku Resep Menu Hari Ini
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Evaluasi takaran porsi (gramatur) dan biaya bahan per komponen menu MBG.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg">
              Total Food Cost: Rp 11.450 / porsi
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 font-bold uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-2.5">Komponen Menu</th>
                  <th className="px-4 py-2.5">Kategori</th>
                  <th className="px-4 py-2.5">Gramatur / Porsi</th>
                  <th className="px-4 py-2.5 text-right">Biaya Riil</th>
                  <th className="px-4 py-2.5 text-right">Pagu Resep</th>
                  <th className="px-4 py-2.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {MENU_ITEMS_COST.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="px-4 py-2.5 font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </td>
                    <td className="px-4 py-2.5 text-gray-500 dark:text-gray-400">
                      {item.category}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-gray-600 dark:text-gray-300">
                      {item.portionWeight}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      Rp {item.rawMaterialCost.toLocaleString("id-ID")}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-gray-500">
                      Rp {item.targetBudget.toLocaleString("id-ID")}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                        Hemat {Math.abs(item.variance)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Food Loss & Trimming Scrap Variance Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-theme-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <span>♻️</span> Efisiensi Susut Bahan (Food Waste)
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                Grade A
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Monitoring kerugian susut pembersihan sayur, tulang daging, & scrap bahan.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Susut Sayur (Trimming Loss):</span>
                <span className="font-bold text-emerald-600">1.2% (Target &lt; 2.5%)</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "48%" }}></div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Susut Karkas Daging (Bone Loss):</span>
                <span className="font-bold text-emerald-600">1.5% (Target &lt; 3.0%)</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "50%" }}></div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Kerugian Spoilage / Rusak:</span>
                <span className="font-bold text-emerald-600">0.0% (Nol Insiden)</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "0%" }}></div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-[11px] text-emerald-900 dark:text-emerald-200">
            <strong>Estimasi Rupiah Terselamatkan:</strong> Rp 1.450.000 / hari berkat SOP potongan presisi Head Chef.
          </div>
        </div>
      </div>

      {/* Buku Kas Kecil & Pengeluaran Langsung Dapur (Petty Cash Ledger) */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-theme-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base">🧾</span>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                Buku Kas Kecil Operasional Dapur Sentral (Petty Cash Ledger)
              </h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Pencatatan pengeluaran kas langsung untuk kebutuhan mendesak dapur dengan otorisasi Kepala SPPG.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Cari pengeluaran, vendor, nomor kuitansi..."
              value={expenseSearch}
              onChange={(e) => setExpenseSearch(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
            >
              <option value="ALL">Semua Kategori</option>
              <option value="BAHAN_TAMBAHAN">Bahan Tambahan</option>
              <option value="COLD_CHAIN">Cold Chain & Es</option>
              <option value="SERVIS_ALAT">Servis Alat</option>
              <option value="SANITASI">Sanitasi</option>
            </select>
            <button
              type="button"
              onClick={() => setIsExpenseModalOpen(true)}
              className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow transition-colors flex items-center gap-1"
            >
              <span>+ Catat Baru</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold uppercase text-[10px]">
              <tr>
                <th className="px-4 py-3">Tanggal & Bukti</th>
                <th className="px-4 py-3">Kategori Pos</th>
                <th className="px-4 py-3">Deskripsi Pengeluaran</th>
                <th className="px-4 py-3 text-right">Nominal (Rp)</th>
                <th className="px-4 py-3">Vendor / Toko</th>
                <th className="px-4 py-3">PIC Pengaju</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-900 dark:text-white">{exp.date}</div>
                      <div className="font-mono text-[10px] text-gray-500">{exp.receiptNumber}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                        {exp.categoryLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-gray-900 dark:text-white">{exp.title}</div>
                      <div className="text-[10px] text-gray-500 dark:text-gray-400">{exp.notes}</div>
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      Rp {exp.amount.toLocaleString("id-ID")}
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      {exp.vendor}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900 dark:text-white">{exp.picName}</div>
                      <div className="text-[10px] text-gray-500">{exp.picRole}</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/40">
                        ✓ {exp.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                    Tidak ada catatan pengeluaran kas kecil yang cocok dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <KitchenExpenseRecordModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onSaveExpense={handleSaveExpense}
        currentSppg={currentProfile.name}
      />

      <KitchenCostAnalysisModal
        isOpen={isCostAnalysisModalOpen}
        onClose={() => setIsCostAnalysisModalOpen(false)}
        currentSppg={currentProfile.name}
        dailyPortions={totalDailyPortions}
        currentHpp={currentHpp}
      />

      <KitchenFinancialReportPrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        sppgName={currentProfile.name}
        periodLabel={selectedPeriod === "TODAY" ? "Harian - 27 Agustus 2026" : "Bulanan - Agustus 2026"}
        totalPortions={totalDailyPortions}
        totalProductionCost={totalDailyCost}
        currentHpp={currentHpp}
        foodCostNominal={foodCostNominal}
        laborCostNominal={laborCostNominal}
        utilityCostNominal={utilityCostNominal}
        packagingCostNominal={packagingCostNominal}
        sanitationCostNominal={sanitationCostNominal}
        pettyCashSpent={totalPettyCashSpent}
        pettyCashRemaining={currentProfile.pettyCashBalance}
      />
    </div>
  );
};
