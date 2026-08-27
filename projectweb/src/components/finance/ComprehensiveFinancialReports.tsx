"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import Link from "next/link";
import { OfficialFinancialReportPrintModal, ReportType } from "./OfficialFinancialReportPrintModal";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const ComprehensiveFinancialReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ReportType>("LRA");
  const [selectedEntity, setSelectedEntity] = useState<string>("SEMUA_NASIONAL");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("YTD_2026");
  const [accountingStandard, setAccountingStandard] = useState<string>("SAP_AKRUAL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  const entityLabels: Record<string, string> = {
    SEMUA_NASIONAL: "Konsolidasi Nasional MBG (Semua SPPG)",
    SPPG_01: "SPPG Harmoni Sentral 01 (Jakarta Pusat)",
    SPPG_02: "SPPG Melati Mandiri 02 (Jakarta Selatan)",
    SPPG_03: "SPPG Garuda Sehat 03 (Jakarta Timur)",
  };

  const periodLabels: Record<string, string> = {
    YTD_2026: "Tahun Berjalan 2026 (Januari - Agustus 2026)",
    Q3_2026: "Triwulan III 2026 (Juli - September 2026)",
    AUG_2026: "Bulan Agustus 2026",
    SEMESTER_1: "Semester I 2026 (Januari - Juni 2026)",
  };

  const handleExportCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Kode Akun,Uraian,Pagu DPA (IDR),Realisasi SP2D (IDR),Sisa Pagu (IDR),Persentase Serap\n" +
      "5.1.01.01,Belanja Bahan Baku Pangan (Food Cost 75%),63375000000,39870000000,23505000000,62.9%\n" +
      "5.1.01.02,Belanja Operasional & Tenaga Kerja Dapur (15%),12675000000,7840000000,4835000000,61.8%\n" +
      "5.1.01.03,Belanja Logistik & Armada Berpendingin (8%),6760000000,4120000000,2640000000,60.9%\n" +
      "5.1.01.04,Belanja Pengendalian Mutu & ISO Lab (2%),1690000000,930000000,760000000,55.0%\n" +
      "TOTAL,JUMLAH BELANJA MBG,84500000000,52760000000,31740000000,62.45%\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Laporan_Keuangan_MBG_${activeTab}_${selectedPeriod}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSyncData = () => {
    setSyncNotice("Sinkronisasi mutasi kas bank BUMN, SP2D, dan invoice PO supplier berhasil diperbarui!");
    setTimeout(() => setSyncNotice(null), 4000);
  };

  // ApexCharts Data
  const monthlyTrendOptions: ApexOptions = {
    chart: { type: "bar", height: 280, toolbar: { show: false }, fontFamily: "inherit" },
    plotOptions: { bar: { horizontal: false, columnWidth: "50%", borderRadius: 5 } },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    colors: ["#10b981", "#3b82f6"],
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu"],
      labels: { style: { colors: "#6b7280", fontSize: "11px" } },
    },
    yaxis: {
      labels: {
        formatter: (val) => `Rp ${(val / 1000000000).toFixed(1)}M`,
        style: { colors: "#6b7280", fontSize: "11px" },
      },
    },
    fill: { opacity: 1 },
    tooltip: { y: { formatter: (val) => `Rp ${(val / 1000000000).toFixed(2)} Miliar` } },
    legend: { position: "top", horizontalAlign: "right" },
    grid: { borderColor: "#f1f5f9" },
  };

  const monthlyTrendSeries = [
    {
      name: "Realisasi Belanja SP2D",
      data: [4200000000, 5800000000, 6400000000, 7100000000, 7500000000, 7800000000, 8100000000, 5860000000],
    },
    {
      name: "Target Pagu Alokasi",
      data: [7000000000, 7000000000, 7000000000, 7000000000, 7000000000, 7000000000, 7000000000, 7000000000],
    },
  ];

  const posCompositionOptions: ApexOptions = {
    chart: { type: "donut", height: 280, fontFamily: "inherit" },
    labels: [
      "Bahan Baku Pangan (75%)",
      "Operasional & Brigade (15%)",
      "Logistik & Armada (8%)",
      "Pengendalian Mutu & QC (2%)",
    ],
    colors: ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6"],
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
              label: "Realisasi",
              formatter: () => "Rp 52.76 M",
            },
          },
        },
      },
    },
  };

  const posCompositionSeries = [75.6, 14.8, 7.8, 1.8];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {syncNotice && (
        <div className="p-4 rounded-xl bg-emerald-600 text-white shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-2 text-xs font-bold">
            <span>✓</span>
            <span>{syncNotice}</span>
          </div>
          <button onClick={() => setSyncNotice(null)} className="text-white hover:opacity-80 text-sm">
            ✕
          </button>
        </div>
      )}

      {/* Top Banner Executive Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white shadow-xl border border-emerald-800/40">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Official Financial Statement Hub
              </span>
              <span className="text-xs text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full font-mono">
                DIPA-MBG-2026-PUSAT-001
              </span>
              <span className="text-xs text-amber-300 bg-amber-500/10 border border-amber-400/30 px-2.5 py-0.5 rounded-full font-semibold">
                Standar Akuntansi Pemerintahan (SAP Akrual)
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
              Pusat Laporan Keuangan Terpadu & Akuntabilitas Program MBG
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl">
              Laporan akuntabilitas keuangan komprehensif berstandar BGN, Kemenkeu & BPK: Laporan Realisasi Anggaran (LRA), Laporan Operasional (LO), Neraca, Laporan Arus Kas (LAK), Analisis Unit Cost HPP, dan Kepatuhan Pajak Negara.
            </p>
          </div>

          {/* Filters Area */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-2.5 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-emerald-300">Entitas Satker:</span>
                <select
                  value={selectedEntity}
                  onChange={(e) => setSelectedEntity(e.target.value)}
                  className="bg-slate-900/80 text-white text-xs font-semibold rounded px-2.5 py-1 border border-white/20 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                >
                  <option value="SEMUA_NASIONAL">Konsolidasi Nasional MBG</option>
                  <option value="SPPG_01">SPPG Harmoni Sentral 01 (Pusat)</option>
                  <option value="SPPG_02">SPPG Melati Mandiri 02 (Selatan)</option>
                  <option value="SPPG_03">SPPG Garuda Sehat 03 (Timur)</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-emerald-300">Periode:</span>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="bg-slate-900/80 text-white text-xs font-semibold rounded px-2.5 py-1 border border-white/20 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                >
                  <option value="YTD_2026">Tahun Berjalan 2026 (YTD)</option>
                  <option value="Q3_2026">Triwulan III 2026</option>
                  <option value="AUG_2026">Bulan Agustus 2026</option>
                  <option value="SEMESTER_1">Semester I 2026</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="font-semibold text-white">Status Buku Kas:</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">100% RECONCILED</span>
            <span>•</span>
            <span>Audit Trail SHA-256 Valid</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleSyncData}
              className="px-3.5 py-2 text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-colors flex items-center gap-1.5"
            >
              <span>🔄</span>
              <span>Sinkronkan Mutasi</span>
            </button>

            <button
              type="button"
              onClick={handleExportCsv}
              className="px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <span>📥</span>
              <span>Ekspor CSV / Excel</span>
            </button>

            <button
              type="button"
              onClick={() => setIsPrintModalOpen(true)}
              className="px-3.5 py-2 text-xs font-bold text-gray-900 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <span>🖨️</span>
              <span>Cetak Laporan Resmi BPK</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Executive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Card 1: Pagu DIPA */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-theme-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
              Pagu DIPA APBN
            </span>
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50 text-xs">
              🏛️
            </span>
          </div>
          <div className="text-xl font-black text-gray-900 dark:text-white font-mono">
            Rp 84.50 M
          </div>
          <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
            Alokasi Pagu MBG 2026
          </div>
        </div>

        {/* Card 2: Realisasi Belanja */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-theme-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Realisasi Belanja
            </span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 text-xs">
              💰
            </span>
          </div>
          <div className="text-xl font-black text-emerald-700 dark:text-emerald-300 font-mono">
            Rp 52.76 M
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
            62.45% Serapan (On-Track)
          </div>
        </div>

        {/* Card 3: Surplus Operasional */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-theme-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Surplus Operasional
            </span>
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/50 text-xs">
              📈
            </span>
          </div>
          <div className="text-xl font-black text-purple-700 dark:text-purple-300 font-mono">
            +Rp 2.24 M
          </div>
          <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
            Laporan Operasional (LO)
          </div>
        </div>

        {/* Card 4: Total Aset Bersih */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-theme-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Total Aset Bersih
            </span>
            <span className="p-1.5 rounded-lg bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 text-xs">
              🏢
            </span>
          </div>
          <div className="text-xl font-black text-cyan-700 dark:text-cyan-300 font-mono">
            Rp 36.81 M
          </div>
          <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
            Kas, Stok & Mesin SPPG
          </div>
        </div>

        {/* Card 5: Kas di Bank BUMN */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-theme-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Kas di Bank (Giro SP2D)
            </span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/50 text-xs">
              🏦
            </span>
          </div>
          <div className="text-xl font-black text-amber-700 dark:text-amber-300 font-mono">
            Rp 18.49 M
          </div>
          <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
            BRI, BNI & Mandiri MBG
          </div>
        </div>

        {/* Card 6: Setoran Pajak */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-theme-xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Setoran Pajak NTPN
            </span>
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-950/50 text-xs">
              🧾
            </span>
          </div>
          <div className="text-xl font-black text-teal-700 dark:text-teal-300 font-mono">
            Rp 1.83 M
          </div>
          <div className="text-[11px] text-teal-600 dark:text-teal-400 font-bold mt-1">
            100% Disetor ke Kas Negara
          </div>
        </div>
      </div>

      {/* Main Visualizations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Realisasi vs Target Bulanan */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-theme-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>📊</span> Tren Realisasi Penyerapan Belanja MBG Bulanan (Jan - Agu 2026)
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Perbandingan pengeluaran kas SP2D terhadap alokasi pagu standar per bulan.
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Akrual Rekonsiliasi Aktif
            </span>
          </div>
          <ReactApexChart
            options={monthlyTrendOptions}
            series={monthlyTrendSeries}
            type="bar"
            height={280}
          />
        </div>

        {/* Chart 2: Komposisi 4 Pos Standar BGN */}
        <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-theme-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>🥧</span> Komposisi Belanja 4 Pos BGN
              </h2>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded">
                Standar Regulasi
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Proporsi aktual belanja program MBG berdasarkan ketentuan BGN.
            </p>
          </div>
          <div className="my-auto">
            <ReactApexChart
              options={posCompositionOptions}
              series={posCompositionSeries}
              type="donut"
              height={280}
            />
          </div>
        </div>
      </div>

      {/* Tabs Navigation for 6 Financial Statements */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-theme-xs overflow-hidden">
        {/* Tab Headers */}
        <div className="flex items-center overflow-x-auto border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 p-2 gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("LRA")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "LRA"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <span>📜</span>
            <span>1. Laporan Realisasi Anggaran (LRA)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("LO")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "LO"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <span>📈</span>
            <span>2. Laporan Operasional (LO / Laba Rugi)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("NERACA")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "NERACA"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <span>🏛️</span>
            <span>3. Neraca Posisi Keuangan</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("LAK")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "LAK"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <span>💵</span>
            <span>4. Laporan Arus Kas (LAK)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("UNIT_COST")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "UNIT_COST"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <span>🍱</span>
            <span>5. Analisis Unit Cost HPP / Porsi</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("PAJAK")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "PAJAK"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <span>🧾</span>
            <span>6. Kepatuhan Pajak NTPN</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 space-y-4">
          {/* Sub Header per Tab */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-gray-200 dark:border-gray-800">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {activeTab === "LRA" && "Laporan Realisasi Anggaran (LRA) - Pagu vs SP2D"}
                {activeTab === "LO" && "Laporan Operasional (LO) - Pendapatan Transfer vs Beban MBG"}
                {activeTab === "NERACA" && "Neraca Posisi Keuangan - Aset, Kewajiban & Ekuitas"}
                {activeTab === "LAK" && "Laporan Arus Kas (LAK) - Operasi, Investasi & Pendanaan"}
                {activeTab === "UNIT_COST" && "Laporan Analisis Biaya Pokok Produksi (HPP) per Porsi"}
                {activeTab === "PAJAK" && "Laporan Rekapitulasi Pemotongan & Penyetoran Pajak Negara"}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Entitas: <span className="font-semibold text-gray-700 dark:text-gray-300">{entityLabels[selectedEntity]}</span> • Periode: <span className="font-semibold text-gray-700 dark:text-gray-300">{periodLabels[selectedPeriod]}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Cari kode akun atau uraian belanja..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs px-3 py-1.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 w-64"
              />
              <button
                type="button"
                onClick={() => setIsPrintModalOpen(true)}
                className="px-3 py-1.5 text-xs font-bold text-gray-900 bg-amber-400 hover:bg-amber-300 rounded-xl shadow transition-colors flex items-center gap-1"
              >
                <span>🖨️</span>
                <span>Cetak Tab Ini</span>
              </button>
            </div>
          </div>

          {/* TAB 1: LRA */}
          {activeTab === "LRA" && (
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Kode Akun</th>
                    <th className="px-4 py-3">Uraian Akun Belanja BGN</th>
                    <th className="px-4 py-3 text-right">Plafon DPA (Rp)</th>
                    <th className="px-4 py-3 text-right">Realisasi SP2D (Rp)</th>
                    <th className="px-4 py-3 text-right">Sisa Pagu (Rp)</th>
                    <th className="px-4 py-3 text-center">% Serap</th>
                    <th className="px-4 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800 font-mono">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                    <td className="px-4 py-3 text-gray-500">5.1.01.01</td>
                    <td className="px-4 py-3 font-sans font-bold text-gray-900 dark:text-white">
                      Belanja Bahan Baku Pangan (Food Cost 75%)
                      <div className="text-[10px] font-normal text-gray-500 font-sans">Beras, ayam karkas, telur omega-3, sayuran segar, buah & susu</div>
                    </td>
                    <td className="px-4 py-3 text-right">63.375.000.000</td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-600 dark:text-emerald-400">39.870.000.000</td>
                    <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">23.505.000.000</td>
                    <td className="px-4 py-3 text-center font-bold">62.9%</td>
                    <td className="px-4 py-3 text-center font-sans">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                        ON TRACK
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                    <td className="px-4 py-3 text-gray-500">5.1.01.02</td>
                    <td className="px-4 py-3 font-sans font-bold text-gray-900 dark:text-white">
                      Belanja Operasional Dapur & Tenaga Kerja Brigade (15%)
                      <div className="text-[10px] font-normal text-gray-500 font-sans">Upah shift juru masak, gas LPG 50kg, listrik chiller, sanitasi ISO 22000</div>
                    </td>
                    <td className="px-4 py-3 text-right">12.675.000.000</td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-600 dark:text-emerald-400">7.840.000.000</td>
                    <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">4.835.000.000</td>
                    <td className="px-4 py-3 text-center font-bold">61.8%</td>
                    <td className="px-4 py-3 text-center font-sans">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                        ON TRACK
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                    <td className="px-4 py-3 text-gray-500">5.1.01.03</td>
                    <td className="px-4 py-3 font-sans font-bold text-gray-900 dark:text-white">
                      Belanja Distribusi & Logistik Armada Berpendingin (8%)
                      <div className="text-[10px] font-normal text-gray-500 font-sans">BBM solar armada, sewa truk termal, insentif driver pengantaran sekolah</div>
                    </td>
                    <td className="px-4 py-3 text-right">6.760.000.000</td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-600 dark:text-emerald-400">4.120.000.000</td>
                    <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">2.640.000.000</td>
                    <td className="px-4 py-3 text-center font-bold">60.9%</td>
                    <td className="px-4 py-3 text-center font-sans">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                        ON TRACK
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                    <td className="px-4 py-3 text-gray-500">5.1.01.04</td>
                    <td className="px-4 py-3 font-sans font-bold text-gray-900 dark:text-white">
                      Belanja Pengendalian Mutu, Lab & Sertifikasi ISO (2%)
                      <div className="text-[10px] font-normal text-gray-500 font-sans">Uji organoleptik harian, swab mikrobiologi lab, surveillance audit ISO/Halal</div>
                    </td>
                    <td className="px-4 py-3 text-right">1.690.000.000</td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-600 dark:text-emerald-400">930.000.000</td>
                    <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300">760.000.000</td>
                    <td className="px-4 py-3 text-center font-bold">55.0%</td>
                    <td className="px-4 py-3 text-center font-sans">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                        OPTIMAL
                      </span>
                    </td>
                  </tr>

                  {/* Total Row */}
                  <tr className="bg-gray-100 dark:bg-gray-800/80 font-bold text-gray-900 dark:text-white">
                    <td colSpan={2} className="px-4 py-3 text-right font-sans uppercase">
                      JUMLAH TOTAL BELANJA MBG
                    </td>
                    <td className="px-4 py-3 text-right">84.500.000.000</td>
                    <td className="px-4 py-3 text-right text-emerald-700 dark:text-emerald-300 text-sm">
                      52.760.000.000
                    </td>
                    <td className="px-4 py-3 text-right">31.740.000.000</td>
                    <td className="px-4 py-3 text-center text-emerald-600">62.45%</td>
                    <td className="px-4 py-3 text-center font-sans">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                        TERKENDALI
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: LO */}
          {activeTab === "LO" && (
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Uraian Akun Operasional (LO)</th>
                    <th className="px-4 py-3 text-right">Tahun Berjalan 2026 (Rp)</th>
                    <th className="px-4 py-3 text-right">Tahun Lalu 2025 (Rp)</th>
                    <th className="px-4 py-3 text-center">Varians (YoY)</th>
                    <th className="px-4 py-3">Keterangan Akuntansi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800 font-mono">
                  <tr className="bg-gray-50 dark:bg-gray-800/40 font-bold font-sans text-gray-900 dark:text-white">
                    <td colSpan={5} className="px-4 py-2">I. PENDAPATAN OPERASIONAL MBG</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 pl-8 font-sans">Pendapatan Transfer DIPA APBN MBG</td>
                    <td className="px-4 py-2.5 text-right font-bold text-emerald-600">55.000.000.000</td>
                    <td className="px-4 py-2.5 text-right">40.000.000.000</td>
                    <td className="px-4 py-2.5 text-center text-emerald-600 font-bold">+37.5%</td>
                    <td className="px-4 py-2.5 text-gray-500 font-sans">Penyaluran SP2D Kas Negara BGN</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/40 font-bold font-sans text-gray-900 dark:text-white">
                    <td colSpan={5} className="px-4 py-2">II. BEBAN OPERASIONAL MBG</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 pl-8 font-sans">Beban Bahan Baku Pangan (Food Cost)</td>
                    <td className="px-4 py-2.5 text-right">39.870.000.000</td>
                    <td className="px-4 py-2.5 text-right">28.900.000.000</td>
                    <td className="px-4 py-2.5 text-center">+38.0%</td>
                    <td className="px-4 py-2.5 text-gray-500 font-sans">3-Way Matched Invoices PO</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 pl-8 font-sans">Beban Tenaga Kerja & Gaji Brigade</td>
                    <td className="px-4 py-2.5 text-right">7.840.000.000</td>
                    <td className="px-4 py-2.5 text-right">5.600.000.000</td>
                    <td className="px-4 py-2.5 text-center">+40.0%</td>
                    <td className="px-4 py-2.5 text-gray-500 font-sans">Payroll 3 shift dapur sentral</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 pl-8 font-sans">Beban Logistik & Bahan Bakar Armada</td>
                    <td className="px-4 py-2.5 text-right">4.120.000.000</td>
                    <td className="px-4 py-2.5 text-right">3.100.000.000</td>
                    <td className="px-4 py-2.5 text-center">+32.9%</td>
                    <td className="px-4 py-2.5 text-gray-500 font-sans">Distribusi drop-off sekolah</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 pl-8 font-sans">Beban Penyusutan Mesin & Armada</td>
                    <td className="px-4 py-2.5 text-right">930.000.000</td>
                    <td className="px-4 py-2.5 text-right">720.000.000</td>
                    <td className="px-4 py-2.5 text-center">+29.2%</td>
                    <td className="px-4 py-2.5 text-gray-500 font-sans">Depresiasi garis lurus (SAP)</td>
                  </tr>
                  <tr className="bg-emerald-50 dark:bg-emerald-950/40 font-bold font-sans text-gray-900 dark:text-white">
                    <td className="px-4 py-3 uppercase">SURPLUS / (DEFISIT) DARI OPERASI</td>
                    <td className="px-4 py-3 text-right font-mono text-emerald-700 dark:text-emerald-300 text-sm">
                      +2.240.000.000
                    </td>
                    <td className="px-4 py-3 text-right font-mono">+1.680.000.000</td>
                    <td className="px-4 py-3 text-center font-mono text-emerald-600">+33.3%</td>
                    <td className="px-4 py-3 text-emerald-700 font-semibold font-sans">Efisiensi Margin Operasional</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: NERACA */}
          {activeTab === "NERACA" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Sisi Kiri: ASET */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/50 border-b border-gray-200 dark:border-gray-800 font-bold text-xs text-blue-900 dark:text-blue-200">
                  ASET (AKTIVA MBG)
                </div>
                <table className="w-full text-xs text-left">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800 font-mono">
                    <tr className="bg-gray-50 dark:bg-gray-800/40 font-bold font-sans">
                      <td colSpan={2} className="px-4 py-2">ASET LANCAR</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 pl-6 font-sans">Kas di Bank BUMN (Giro SP2D)</td>
                      <td className="px-4 py-2 text-right">18.450.000.000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 pl-6 font-sans">Kas Kecil Bendahara SPPG (Petty Cash)</td>
                      <td className="px-4 py-2 text-right">42.550.000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 pl-6 font-sans">Persediaan Bahan Baku Gudang Terverifikasi</td>
                      <td className="px-4 py-2 text-right">4.820.000.000</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-800/40 font-bold font-sans">
                      <td colSpan={2} className="px-4 py-2">ASET TETAP & INFRASTRUKTUR DAPUR</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 pl-6 font-sans">Peralatan Mesin Masak, Boiler & Chiller</td>
                      <td className="px-4 py-2 text-right">8.750.000.000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 pl-6 font-sans">Armada Truk Box Berpendingin ISO 22000</td>
                      <td className="px-4 py-2 text-right">6.200.000.000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 pl-6 font-sans text-red-500">Akumulasi Penyusutan Aset Tetap</td>
                      <td className="px-4 py-2 text-right text-red-500">(1.450.000.000)</td>
                    </tr>
                    <tr className="bg-gray-100 dark:bg-gray-800 font-bold font-sans text-gray-900 dark:text-white">
                      <td className="px-4 py-3">TOTAL ASET MBG</td>
                      <td className="px-4 py-3 text-right font-mono text-emerald-600 text-sm">36.812.550.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Sisi Kanan: KEWAJIBAN & EKUITAS */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="p-3 bg-purple-50 dark:bg-purple-950/50 border-b border-gray-200 dark:border-gray-800 font-bold text-xs text-purple-900 dark:text-purple-200">
                  KEWAJIBAN & EKUITAS
                </div>
                <table className="w-full text-xs text-left">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800 font-mono">
                    <tr className="bg-gray-50 dark:bg-gray-800/40 font-bold font-sans">
                      <td colSpan={2} className="px-4 py-2">KEWAJIBAN JANGKA PENDEK</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 pl-6 font-sans">Utang Belanja Vendor Supplier (Faktur Matching)</td>
                      <td className="px-4 py-2 text-right">3.450.000.000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 pl-6 font-sans">Utang Pajak PPh/PPN Terutang</td>
                      <td className="px-4 py-2 text-right">485.000.000</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-gray-800/40 font-bold font-sans">
                      <td colSpan={2} className="px-4 py-2">EKUITAS DANA</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 pl-6 font-sans">Ekuitas Awal DIPA APBN</td>
                      <td className="px-4 py-2 text-right">30.637.550.000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 pl-6 font-sans">Surplus Operasional Berjalan (LO)</td>
                      <td className="px-4 py-2 text-right font-bold text-emerald-600">2.240.000.000</td>
                    </tr>
                    <tr className="bg-gray-100 dark:bg-gray-800 font-bold font-sans text-gray-900 dark:text-white">
                      <td className="px-4 py-3">TOTAL KEWAJIBAN & EKUITAS</td>
                      <td className="px-4 py-3 text-right font-mono text-emerald-600 text-sm">36.812.550.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: LAK */}
          {activeTab === "LAK" && (
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Aktivitas Arus Kas (Metode Langsung)</th>
                    <th className="px-4 py-3 text-right">Penerimaan Kas (Rp)</th>
                    <th className="px-4 py-3 text-right">Pengeluaran Kas (Rp)</th>
                    <th className="px-4 py-3 text-right">Arus Kas Bersih (Rp)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800 font-mono">
                  <tr>
                    <td className="px-4 py-3 font-bold font-sans">
                      1. Arus Kas dari Aktivitas Operasi
                      <div className="text-[10px] font-normal text-gray-500">Penyaluran SP2D transfer, belanja bahan pangan & upah dapur</div>
                    </td>
                    <td className="px-4 py-3 text-right">55.000.000.000</td>
                    <td className="px-4 py-3 text-right text-red-600">(51.830.000.000)</td>
                    <td className="px-4 py-3 text-right text-emerald-600 font-bold">+3.170.000.000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold font-sans">
                      2. Arus Kas dari Aktivitas Investasi
                      <div className="text-[10px] font-normal text-gray-500">Pengadaan boiler 200L & armada truk berpendingin baru</div>
                    </td>
                    <td className="px-4 py-3 text-right">-</td>
                    <td className="px-4 py-3 text-right text-red-600">(2.450.000.000)</td>
                    <td className="px-4 py-3 text-right text-red-600 font-bold">(2.450.000.000)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold font-sans">
                      3. Arus Kas dari Aktivitas Pendanaan
                      <div className="text-[10px] font-normal text-gray-500">Alokasi pagu penyertaan kas negara DIPA APBN</div>
                    </td>
                    <td className="px-4 py-3 text-right">17.772.550.000</td>
                    <td className="px-4 py-3 text-right">-</td>
                    <td className="px-4 py-3 text-right text-emerald-600 font-bold">+17.772.550.000</td>
                  </tr>
                  <tr className="bg-gray-100 dark:bg-gray-800 font-bold text-gray-900 dark:text-white">
                    <td colSpan={3} className="px-4 py-3 text-right font-sans uppercase">
                      SALDO AKHIR KAS MBG (BANK GIRO + KAS KECIL)
                    </td>
                    <td className="px-4 py-3 text-right text-emerald-700 dark:text-emerald-300 text-sm">
                      18.492.550.000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 5: UNIT COST HPP */}
          {activeTab === "UNIT_COST" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                    Standar Unit Cost BGN: Rp 15.000 / Porsi MBG
                  </h4>
                  <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
                    Realisasi Rata-rata HPP Nasional: <span className="font-mono font-bold">Rp 13.850 / porsi</span> (Efisiensi Margin: 7.67%)
                  </p>
                </div>
                <Link
                  href="/finance/kitchen"
                  className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition"
                >
                  Buka Dashboard Finansial Dapur SPPG →
                </Link>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
                <table className="w-full text-xs text-left">
                  <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="px-4 py-3">Komponen Biaya per Porsi</th>
                      <th className="px-4 py-3 text-right">Plafon Standar BGN</th>
                      <th className="px-4 py-3 text-right">Realisasi Aktual</th>
                      <th className="px-4 py-3 text-right">Hemat / (Over)</th>
                      <th className="px-4 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800 font-mono">
                    <tr>
                      <td className="px-4 py-2.5 font-sans font-semibold">1. Bahan Baku Pangan (Food Cost)</td>
                      <td className="px-4 py-2.5 text-right">Rp 11.250</td>
                      <td className="px-4 py-2.5 text-right font-bold text-emerald-600">Rp 9.950</td>
                      <td className="px-4 py-2.5 text-right text-emerald-600">Hemat Rp 1.300</td>
                      <td className="px-4 py-2.5 text-center font-sans">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">OPTIMAL</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-sans font-semibold">2. Tenaga Kerja Brigade Masak</td>
                      <td className="px-4 py-2.5 text-right">Rp 2.250</td>
                      <td className="px-4 py-2.5 text-right font-bold text-emerald-600">Rp 1.850</td>
                      <td className="px-4 py-2.5 text-right text-emerald-600">Hemat Rp 400</td>
                      <td className="px-4 py-2.5 text-center font-sans">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">OPTIMAL</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-sans font-semibold">3. Utilitas & Energi Dapur (Gas/Listrik/Air)</td>
                      <td className="px-4 py-2.5 text-right">Rp 800</td>
                      <td className="px-4 py-2.5 text-right font-bold text-amber-600">Rp 850</td>
                      <td className="px-4 py-2.5 text-right text-amber-600">Over Rp 50</td>
                      <td className="px-4 py-2.5 text-center font-sans">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">ATTENTION</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-sans font-semibold">4. Kemasan Food-Grade & Tray Sealing</td>
                      <td className="px-4 py-2.5 text-right">Rp 500</td>
                      <td className="px-4 py-2.5 text-right font-bold text-emerald-600">Rp 750</td>
                      <td className="px-4 py-2.5 text-right text-amber-600">Over Rp 250</td>
                      <td className="px-4 py-2.5 text-center font-sans">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">ATTENTION</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-sans font-semibold">5. Uji Lab QC & Sanitasi ISO 22000</td>
                      <td className="px-4 py-2.5 text-right">Rp 200</td>
                      <td className="px-4 py-2.5 text-right font-bold text-emerald-600">Rp 450</td>
                      <td className="px-4 py-2.5 text-right text-amber-600">Over Rp 250</td>
                      <td className="px-4 py-2.5 text-center font-sans">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">STANDAR ISO</span>
                      </td>
                    </tr>
                    <tr className="bg-gray-100 dark:bg-gray-800 font-bold font-sans text-gray-900 dark:text-white">
                      <td className="px-4 py-3">TOTAL HPP PRODUKSI PER PORSI</td>
                      <td className="px-4 py-3 text-right">Rp 15.000</td>
                      <td className="px-4 py-3 text-right text-emerald-700 dark:text-emerald-300 text-sm">
                        Rp 13.850
                      </td>
                      <td className="px-4 py-3 text-right text-emerald-600">Hemat Rp 1.150</td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          7.67% EFISIEN
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: PAJAK */}
          {activeTab === "PAJAK" && (
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Jenis Pajak</th>
                    <th className="px-4 py-3">Objek Belanja Pajak MBG</th>
                    <th className="px-4 py-3 text-center">Tarif</th>
                    <th className="px-4 py-3 text-right">Dasar Pengenaan Pajak (DPP)</th>
                    <th className="px-4 py-3 text-right">Pajak Disetor (Rp)</th>
                    <th className="px-4 py-3 text-center">Nomor NTPN DJP</th>
                    <th className="px-4 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800 font-mono">
                  <tr>
                    <td className="px-4 py-3 font-bold font-sans">PPh Pasal 22</td>
                    <td className="px-4 py-3 font-sans">Pengadaan Bahan Pokok Pangan Supplier PT Pangan Nusantara</td>
                    <td className="px-4 py-3 text-center">1.5%</td>
                    <td className="px-4 py-3 text-right">39.870.000.000</td>
                    <td className="px-4 py-3 text-right text-emerald-600 font-bold">598.050.000</td>
                    <td className="px-4 py-3 text-center text-gray-600">NTPN-8829-0192-3341</td>
                    <td className="px-4 py-3 text-center font-sans">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">LUNAS</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold font-sans">PPh Pasal 23</td>
                    <td className="px-4 py-3 font-sans">Jasa Ekspedisi Armada Berpendingin & Servis Mesin Boiler</td>
                    <td className="px-4 py-3 text-center">2.0%</td>
                    <td className="px-4 py-3 text-right">4.120.000.000</td>
                    <td className="px-4 py-3 text-right text-emerald-600 font-bold">82.400.000</td>
                    <td className="px-4 py-3 text-center text-gray-600">NTPN-4412-9018-7721</td>
                    <td className="px-4 py-3 text-center font-sans">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">LUNAS</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold font-sans">PPN Dalam Negeri</td>
                    <td className="px-4 py-3 font-sans">Barang Kena Pajak Kemasan Tray Sealer & Mesin Dapur</td>
                    <td className="px-4 py-3 text-center">11.0%</td>
                    <td className="px-4 py-3 text-right">10.450.000.000</td>
                    <td className="px-4 py-3 text-right text-emerald-600 font-bold">1.149.500.000</td>
                    <td className="px-4 py-3 text-center text-gray-600">NTPN-1109-3829-5562</td>
                    <td className="px-4 py-3 text-center font-sans">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">LUNAS</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-100 dark:bg-gray-800 font-bold text-gray-900 dark:text-white">
                    <td colSpan={4} className="px-4 py-3 text-right font-sans uppercase">
                      TOTAL SETORAN PAJAK NEGARA
                    </td>
                    <td className="px-4 py-3 text-right text-emerald-700 dark:text-emerald-300 text-sm">
                      1.829.950.000
                    </td>
                    <td colSpan={2} className="px-4 py-3 text-center text-emerald-600 font-sans">
                      ✓ 100% TERSETOR KE KAS NEGARA
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Official Print Modal */}
      <OfficialFinancialReportPrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        initialReportType={activeTab}
        periodLabel={periodLabels[selectedPeriod]}
        selectedEntity={entityLabels[selectedEntity]}
      />
    </div>
  );
};
