"use client";

import React, { useState } from "react";
import CreateBudgetModal, { BudgetAllocation } from "./CreateBudgetModal";
import BudgetDetailModal from "./BudgetDetailModal";
import BudgetReportPrintModal from "./BudgetReportPrintModal";

const INITIAL_BUDGETS: BudgetAllocation[] = [
  {
    id: "BDG-101",
    dpaCode: "DPA-MBG-2026-JKTPUSAT",
    fiscalYear: 2026,
    region: "Jakarta Pusat",
    province: "DKI Jakarta",
    sourceOfFund: "APBN Pusat (Badan Gizi)",
    totalCeiling: 14500000000,
    rawMaterialAllocation: 10875000000,
    operationalAllocation: 2175000000,
    logisticsAllocation: 1160000000,
    qaInspectionAllocation: 290000000,
    disbursedAmount: 5800000000,
    committedAmount: 2900000000,
    targetDailyPortions: 4500,
    targetBeneficiaries: 4500,
    picName: "Drs. Heru Prasetyo, M.M",
    picContact: "0812-8899-7766",
    approvalStatus: "APPROVED",
    notes: "Penyaluran semester I mencakup 18 SD & 7 SMP di Jakarta Pusat.",
    lastUpdated: "2026-08-20",
  },
  {
    id: "BDG-102",
    dpaCode: "DPA-MBG-2026-JKTTIMUR",
    fiscalYear: 2026,
    region: "Jakarta Timur",
    province: "DKI Jakarta",
    sourceOfFund: "APBN Pusat (Badan Gizi)",
    totalCeiling: 18200000000,
    rawMaterialAllocation: 13650000000,
    operationalAllocation: 2730000000,
    logisticsAllocation: 1456000000,
    qaInspectionAllocation: 364000000,
    disbursedAmount: 9100000000,
    committedAmount: 3640000000,
    targetDailyPortions: 5600,
    targetBeneficiaries: 5600,
    picName: "Bambang Sudibyo, S.E.",
    picContact: "0813-2211-4455",
    approvalStatus: "APPROVED",
    notes: "Klaster Klender, Cakung & Matraman terlayani dari 2 dapur sentral.",
    lastUpdated: "2026-08-22",
  },
  {
    id: "BDG-103",
    dpaCode: "DPA-MBG-2026-BOGOR",
    fiscalYear: 2026,
    region: "Kab. Bogor",
    province: "Jawa Barat",
    sourceOfFund: "DAK Non-Fisik MBG",
    totalCeiling: 22000000000,
    rawMaterialAllocation: 16500000000,
    operationalAllocation: 3300000000,
    logisticsAllocation: 1760000000,
    qaInspectionAllocation: 440000000,
    disbursedAmount: 14300000000,
    committedAmount: 4400000000,
    targetDailyPortions: 7200,
    targetBeneficiaries: 7200,
    picName: "Ir. H. Dedi Mulyadi, M.Si",
    picContact: "0811-9988-1122",
    approvalStatus: "APPROVED",
    notes: "Wilayah sub-urban & perbukitan memerlukan alokasi logistik ekstra.",
    lastUpdated: "2026-08-25",
  },
  {
    id: "BDG-104",
    dpaCode: "DPA-MBG-2026-BANDUNG",
    fiscalYear: 2026,
    region: "Kota Bandung",
    province: "Jawa Barat",
    sourceOfFund: "APBD Provinsi",
    totalCeiling: 16000000000,
    rawMaterialAllocation: 12000000000,
    operationalAllocation: 2400000000,
    logisticsAllocation: 1280000000,
    qaInspectionAllocation: 320000000,
    disbursedAmount: 6400000000,
    committedAmount: 3200000000,
    targetDailyPortions: 5000,
    targetBeneficiaries: 5000,
    picName: "Dr. Hj. Nina Nurhayati",
    picContact: "0815-3344-7788",
    approvalStatus: "APPROVED",
    notes: "Didukung dana pendamping Pemprov Jabar untuk suplemen susu murni Lembang.",
    lastUpdated: "2026-08-18",
  },
  {
    id: "BDG-105",
    dpaCode: "DPA-MBG-2026-SURABAYA",
    fiscalYear: 2026,
    region: "Kota Surabaya",
    province: "Jawa Timur",
    sourceOfFund: "APBN Pusat (Badan Gizi)",
    totalCeiling: 19500000000,
    rawMaterialAllocation: 14625000000,
    operationalAllocation: 2925000000,
    logisticsAllocation: 1560000000,
    qaInspectionAllocation: 390000000,
    disbursedAmount: 11700000000,
    committedAmount: 3900000000,
    targetDailyPortions: 6100,
    targetBeneficiaries: 6100,
    picName: "Cahyono Wibowo, S.STP",
    picContact: "0812-7766-9900",
    approvalStatus: "APPROVED",
    notes: "Pengadaan ikan laut bersertifikasi mutu bekerjasama dengan PPI Brondong.",
    lastUpdated: "2026-08-24",
  },
  {
    id: "BDG-106",
    dpaCode: "DPA-MBG-2026-MEDAN",
    fiscalYear: 2026,
    region: "Kota Medan",
    province: "Sumatera Utara",
    sourceOfFund: "APBN Pusat (Badan Gizi)",
    totalCeiling: 15000000000,
    rawMaterialAllocation: 11250000000,
    operationalAllocation: 2250000000,
    logisticsAllocation: 1200000000,
    qaInspectionAllocation: 300000000,
    disbursedAmount: 4500000000,
    committedAmount: 3000000000,
    targetDailyPortions: 4800,
    targetBeneficiaries: 4800,
    picName: "Rizal Tanjung, M.M",
    picContact: "0813-5566-2211",
    approvalStatus: "APPROVED",
    notes: "Fase pilot Sumatera tahap awal mencakup 22 sekolah dasar negeri.",
    lastUpdated: "2026-08-15",
  },
];

export default function BudgetManagement() {
  const [budgets, setBudgets] = useState<BudgetAllocation[]>(INITIAL_BUDGETS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("ALL");
  const [selectedFundSource, setSelectedFundSource] = useState("ALL");
  const [selectedAbsorptionStatus, setSelectedAbsorptionStatus] = useState("ALL");

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<BudgetAllocation | null>(null);

  // Statistics calculation
  const totalCeilingAll = budgets.reduce((acc, b) => acc + b.totalCeiling, 0);
  const totalDisbursedAll = budgets.reduce((acc, b) => acc + b.disbursedAmount, 0);
  const totalCommittedAll = budgets.reduce((acc, b) => acc + b.committedAmount, 0);
  const totalRemainingAll = totalCeilingAll - totalDisbursedAll - totalCommittedAll;
  const overallAbsorptionRate = totalCeilingAll > 0 ? Math.round((totalDisbursedAll / totalCeilingAll) * 100) : 0;
  const totalTargetBeneficiaries = budgets.reduce((acc, b) => acc + b.targetBeneficiaries, 0);
  const totalDailyPortions = budgets.reduce((acc, b) => acc + b.targetDailyPortions, 0);

  // Handlers
  const handleSaveBudget = (data: BudgetAllocation) => {
    setBudgets((prev) => {
      const exists = prev.some((item) => item.id === data.id);
      if (exists) {
        return prev.map((item) => (item.id === data.id ? data : item));
      }
      return [data, ...prev];
    });
  };

  const handleOpenDetail = (budget: BudgetAllocation) => {
    setSelectedBudget(budget);
    setIsDetailModalOpen(true);
  };

  const handleOpenEdit = (budget: BudgetAllocation) => {
    setSelectedBudget(budget);
    setIsCreateModalOpen(true);
  };

  const handleOpenPrint = (budget: BudgetAllocation) => {
    setSelectedBudget(budget);
    setIsPrintModalOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedBudget(null);
    setIsCreateModalOpen(true);
  };

  // Filtering
  const filteredBudgets = budgets.filter((b) => {
    const matchesSearch =
      b.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.dpaCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.picName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProvince = selectedProvince === "ALL" || b.province === selectedProvince;
    const matchesFund = selectedFundSource === "ALL" || b.sourceOfFund === selectedFundSource;

    const absorptionRate = b.totalCeiling > 0 ? (b.disbursedAmount / b.totalCeiling) * 100 : 0;
    let absorptionCategory = "AMAN";
    if (absorptionRate >= 80) absorptionCategory = "TINGGI";
    else if (absorptionRate >= 50) absorptionCategory = "SEDANG";
    else absorptionCategory = "RENDAH";

    const matchesAbsorption =
      selectedAbsorptionStatus === "ALL" || selectedAbsorptionStatus === absorptionCategory;

    return matchesSearch && matchesProvince && matchesFund && matchesAbsorption;
  });

  return (
    <div className="space-y-6">
      {/* 1. Metric Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Plafon Pagu Nasional */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Total Plafon Pagu DPA
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              Rp {(totalCeilingAll / 1000000000).toFixed(2)} Miliar
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Mencakup {budgets.length} Wilayah Satker MBG
            </p>
          </div>
        </div>

        {/* Realisasi Penyerapan Kas */}
        <div className="rounded-2xl border border-blue-200 bg-white p-5 shadow-xs dark:border-blue-900/30 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Realisasi SP2D Cair
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
              Rp {(totalDisbursedAll / 1000000000).toFixed(2)} M
            </h3>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <span className="font-bold text-blue-600 dark:text-blue-400">{overallAbsorptionRate}%</span>
              <span>serapan fiskal berjalan</span>
            </div>
          </div>
        </div>

        {/* Komitmen Belanja (PO Terbit) */}
        <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-xs dark:border-amber-900/30 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Komitmen Belanja (PO)
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
              Rp {(totalCommittedAll / 1000000000).toFixed(2)} M
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              PO pengadaan bahan & logistik aktif
            </p>
          </div>
        </div>

        {/* Sisa Saldo Kas Aman */}
        <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-xs dark:border-emerald-900/30 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Sisa Saldo Kas Bebas
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              Rp {(totalRemainingAll / 1000000000).toFixed(2)} M
            </h3>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {totalTargetBeneficiaries.toLocaleString("id-ID")} Siswa
              </span>
              <span>({totalDailyPortions.toLocaleString("id-ID")} porsi/hari)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Controls Toolbar & Filters */}
      <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-gray-900 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Cari wilayah, No. DPA, PPK, atau provinsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-gray-50/50 py-2.5 pl-10 pr-4 text-sm text-gray-900 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="ALL">Semua Provinsi</option>
            <option value="DKI Jakarta">DKI Jakarta</option>
            <option value="Jawa Barat">Jawa Barat</option>
            <option value="Jawa Timur">Jawa Timur</option>
            <option value="Sumatera Utara">Sumatera Utara</option>
          </select>

          <select
            value={selectedFundSource}
            onChange={(e) => setSelectedFundSource(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="ALL">Semua Sumber Dana</option>
            <option value="APBN Pusat (Badan Gizi)">APBN Pusat</option>
            <option value="APBD Provinsi">APBD Provinsi</option>
            <option value="DAK Non-Fisik MBG">DAK Non-Fisik</option>
          </select>

          <select
            value={selectedAbsorptionStatus}
            onChange={(e) => setSelectedAbsorptionStatus(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="ALL">Semua Tingkat Serapan</option>
            <option value="TINGGI">Tinggi (≥ 80%)</option>
            <option value="SEDANG">Sedang (50 - 79%)</option>
            <option value="RENDAH">Awal / Rendah (&lt; 50%)</option>
          </select>

          {/* Action Button */}
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Alokasi Pagu Baru</span>
          </button>
        </div>
      </div>

      {/* 3. Budget Allocations Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50/75 text-xs uppercase font-semibold text-gray-500 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-400">
              <tr>
                <th className="px-5 py-3.5">Wilayah & Register DPA</th>
                <th className="px-4 py-3.5">Sumber Dana</th>
                <th className="px-4 py-3.5 text-right">Plafon Pagu</th>
                <th className="px-4 py-3.5 text-right">Realisasi SP2D</th>
                <th className="px-4 py-3.5 text-right">Komitmen PO</th>
                <th className="px-4 py-3.5 text-right">Sisa Saldo Kas</th>
                <th className="px-4 py-3.5 text-center">Progress Serapan</th>
                <th className="px-5 py-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredBudgets.length > 0 ? (
                filteredBudgets.map((b) => {
                  const absorptionPercent = b.totalCeiling > 0 ? Math.round((b.disbursedAmount / b.totalCeiling) * 100) : 0;
                  const committedPercent = b.totalCeiling > 0 ? Math.round((b.committedAmount / b.totalCeiling) * 100) : 0;
                  const remaining = b.totalCeiling - b.disbursedAmount - b.committedAmount;

                  return (
                    <tr key={b.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
                      {/* Region & Code */}
                      <td className="px-5 py-4">
                        <div className="font-bold text-gray-900 dark:text-white">{b.region}</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono text-xs text-gray-500 dark:text-gray-400">{b.dpaCode}</span>
                          <span className="inline-block h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">{b.province}</span>
                        </div>
                      </td>

                      {/* Source of Fund */}
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ${
                          b.sourceOfFund.includes("APBN")
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                            : b.sourceOfFund.includes("APBD")
                            ? "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                        }`}>
                          {b.sourceOfFund}
                        </span>
                        <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                          {b.targetDailyPortions.toLocaleString("id-ID")} porsi / hari
                        </div>
                      </td>

                      {/* Plafon Pagu */}
                      <td className="px-4 py-4 text-right font-semibold text-gray-900 dark:text-white font-mono">
                        Rp {b.totalCeiling.toLocaleString("id-ID")}
                      </td>

                      {/* Realisasi SP2D */}
                      <td className="px-4 py-4 text-right font-medium text-blue-600 dark:text-blue-400 font-mono">
                        Rp {b.disbursedAmount.toLocaleString("id-ID")}
                      </td>

                      {/* Komitmen PO */}
                      <td className="px-4 py-4 text-right font-medium text-amber-600 dark:text-amber-400 font-mono">
                        Rp {b.committedAmount.toLocaleString("id-ID")}
                      </td>

                      {/* Sisa Saldo Kas */}
                      <td className="px-4 py-4 text-right font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                        Rp {remaining.toLocaleString("id-ID")}
                      </td>

                      {/* Progress Serapan Bar */}
                      <td className="px-4 py-4 text-center">
                        <div className="w-28 mx-auto">
                          <div className="flex items-center justify-between text-[11px] mb-1 font-semibold">
                            <span className="text-blue-600 dark:text-blue-400">{absorptionPercent}%</span>
                            <span className="text-gray-400">+{committedPercent}%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 flex">
                            <div className="bg-blue-500 h-full" style={{ width: `${absorptionPercent}%` }} />
                            <div className="bg-amber-400 h-full" style={{ width: `${committedPercent}%` }} />
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleOpenDetail(b)}
                            title="Lihat Rincian Alokasi"
                            className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 hover:text-emerald-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>

                          <button
                            onClick={() => handleOpenPrint(b)}
                            title="Cetak Dokumen DPA / LRA"
                            className="rounded-lg p-1.5 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 dark:text-gray-400 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                          </button>

                          <button
                            onClick={() => handleOpenEdit(b)}
                            title="Ubah Alokasi"
                            className="rounded-lg p-1.5 text-gray-600 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="mt-2 text-sm font-medium">Tidak ada data alokasi anggaran yang sesuai filter.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <CreateBudgetModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveBudget}
        initialData={selectedBudget}
      />

      <BudgetDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        budget={selectedBudget}
        onEdit={handleOpenEdit}
        onPrint={handleOpenPrint}
      />

      <BudgetReportPrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        budget={selectedBudget}
      />
    </div>
  );
}
