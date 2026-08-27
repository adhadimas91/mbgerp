"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ProductionBatchLine, UpdateProductionBatchModal } from "./UpdateProductionBatchModal";
import { OrganolepticRecord, OrganolepticQualityModal } from "./OrganolepticQualityModal";
import { KitchenSpkPrintModal } from "./KitchenSpkPrintModal";
import { KitchenRequisitionModal, KitchenRequisitionItem } from "./KitchenRequisitionModal";

const initialLines: ProductionBatchLine[] = [
  {
    id: "LINE-01",
    name: "Lini 1: Karbohidrat",
    category: "KARBOHIDRAT",
    menuItem: "Nasi Pulen Pandan Wangi",
    targetPortions: 3500,
    completedPortions: 3500,
    currentTemp: 68.5,
    targetTempMin: 60.0,
    status: "HOLDING",
    chefInCharge: "Chef Bambang Supardi",
    startTime: "03:00 WIB",
    estimatedFinish: "04:30 WIB",
    equipment: "Steam Boiler Cooker 200L (SB-01)",
  },
  {
    id: "LINE-02",
    name: "Lini 2: Protein Hewani",
    category: "PROTEIN",
    menuItem: "Ayam Panggang Kecap Rempah Madu",
    targetPortions: 3500,
    completedPortions: 2850,
    currentTemp: 84.5,
    targetTempMin: 75.0,
    status: "COOKING",
    chefInCharge: "Chef Rahmat Hidayat",
    startTime: "03:15 WIB",
    estimatedFinish: "05:15 WIB",
    equipment: "Tilting Bratt Pan & Combi Oven (BP-02)",
  },
  {
    id: "LINE-03",
    name: "Lini 3: Sayuran Segar",
    category: "SAYUR",
    menuItem: "Tumis Pelangi (Wortel, Buncis, Jagung)",
    targetPortions: 3500,
    completedPortions: 3200,
    currentTemp: 78.2,
    targetTempMin: 70.0,
    status: "COOKING",
    chefInCharge: "Chef Aisyah Lestari",
    startTime: "03:45 WIB",
    estimatedFinish: "05:00 WIB",
    equipment: "High-Pressure Wok Station (WK-03)",
  },
  {
    id: "LINE-04",
    name: "Lini 4: Protein Nabati",
    category: "PROTEIN",
    menuItem: "Tempe Mendoan Gurih Renyah",
    targetPortions: 3500,
    completedPortions: 3500,
    currentTemp: 64.0,
    targetTempMin: 60.0,
    status: "HOLDING",
    chefInCharge: "Chef Dedi Setiawan",
    startTime: "04:00 WIB",
    estimatedFinish: "05:10 WIB",
    equipment: "Deep Fryer Multi-Zone (DF-04)",
  },
  {
    id: "LINE-05",
    name: "Lini 5: Packaging & Quality Seal",
    category: "PACKAGING",
    menuItem: "Food Tray Sealing & Buah Pisang + Susu UHT",
    targetPortions: 3500,
    completedPortions: 2400,
    currentTemp: 62.5,
    targetTempMin: 60.0,
    status: "PACKAGING",
    chefInCharge: "Siti Rahma (Packaging Lead)",
    startTime: "04:30 WIB",
    estimatedFinish: "05:45 WIB",
    equipment: "Auto Tray Sealer Conveyor (TS-05)",
  },
];

const sampleOrganolepticSignature =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='100' viewBox='0 0 300 100'><path d='M25,65 Q60,15 100,50 T180,30 T260,60' stroke='%23059669' stroke-width='3.5' fill='none' stroke-linecap='round'/><path d='M70,75 L210,60' stroke='%23059669' stroke-width='2' fill='none'/><text x='180' y='85' font-family='sans-serif' font-size='9' fill='%23059669'>[QC Released - drg. Fitriani]</text></svg>";

const initialOrganoleptic: OrganolepticRecord = {
  id: "ORG-20260827-01",
  batchCode: "BATCH-01-PAGI",
  menuTitle: "Paket Menu A: Ayam Panggang Madu + Tumis Pelangi + Tempe + Pisang + Susu UHT",
  testedAt: "27 Agu 2026, 04:45 WIB",
  nutritionistName: "drg. Fitriani, S.Gz, RD",
  nutritionistNip: "19880512 201402 2 001",
  tasteScore: 4.8,
  aromaScore: 5.0,
  textureScore: 4.9,
  appearanceScore: 4.8,
  measuredTemp: 78.5,
  retentionSampleCode: "RET-20260827-01",
  retentionStorageLocation: "Chiller QC Unit CH-RET-01 (2.8°C)",
  halalCheck: true,
  hygieneCheck: true,
  status: "APPROVED",
  notes: "Cita rasa gurih seimbang, tidak berminyak, sayuran renyah segar, suhu inti ayam mencapai 84.5°C. Sangat layak konsumsi anak sekolah.",
  signatureSvg: sampleOrganolepticSignature,
};

export const KitchenOverviewDashboard: React.FC = () => {
  const [selectedSppg, setSelectedSppg] = useState("SPPG Harmoni Sentral 01 (Kapasitas 4.000 Porsi)");
  const [selectedBatch, setSelectedBatch] = useState("BATCH_1");
  const [lines, setLines] = useState<ProductionBatchLine[]>(initialLines);
  const [organoleptic, setOrganoleptic] = useState<OrganolepticRecord>(initialOrganoleptic);

  // Modals
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isQualityModalOpen, setIsQualityModalOpen] = useState(false);
  const [isSpkModalOpen, setIsSpkModalOpen] = useState(false);
  const [isRequisitionModalOpen, setIsRequisitionModalOpen] = useState(false);
  const [requisitionNotif, setRequisitionNotif] = useState<string | null>(null);

  // Summary Metrics
  const targetTotal = lines.reduce((acc, curr) => (curr.id === "LINE-05" ? curr.targetPortions : acc), 3500);
  const completedTotal = lines.find((l) => l.id === "LINE-05")?.completedPortions || 2400;
  const cookedProteinTotal = lines.find((l) => l.id === "LINE-02")?.completedPortions || 2850;
  const progressPercent = Math.round((completedTotal / targetTotal) * 100);

  const handleSaveRequisition = (req: {
    code: string;
    requestTime: string;
    requestedBy: string;
    targetLine: string;
    items: KitchenRequisitionItem[];
    urgency: string;
  }) => {
    setRequisitionNotif(`Permintaan bahan ${req.code} (${req.items.length} item) berhasil dikirim ke Gudang!`);
    setTimeout(() => setRequisitionNotif(null), 6000);
  };

  const spkData = {
    spkNumber: "SPM-SPPG01-20260827-001",
    spkDate: "Kamis, 27 Agustus 2026",
    sppgName: "SPPG Harmoni Sentral 01 (Jakarta Pusat)",
    targetBatch: "Batch 1 - Sarapan Pagi (03:00 - 06:30 WIB)",
    targetPortions: 3500,
    headChef: "Chef Rahmat Hidayat",
    nutritionist: "drg. Fitriani, S.Gz, RD",
    menuPackageName: "Paket MBG A-1: Nasi Pandan Wangi, Ayam Panggang Kecap Madu, Tumis Pelangi, Tempe Mendoan, Pisang Cavendish, Susu UHT 200ml",
    items: [
      {
        category: "Karbohidrat",
        name: "Nasi Putih Pulen Pandan Wangi",
        rawRequirement: "350 Kg Beras Ramos + 525 L Air Filter Ozon",
        standardTemp: "≥ 65°C (Holding)",
        line: "Line 1 - Steam Boiler 200L",
      },
      {
        category: "Protein Hewani",
        name: "Ayam Panggang Kecap Rempah",
        rawRequirement: "420 Kg Daging Ayam Dada Fillet + 35 Kg Bumbu Halus",
        standardTemp: "≥ 75°C (Core Temp)",
        line: "Line 2 - Bratt Pan & Combi Oven",
      },
      {
        category: "Sayuran & Serat",
        name: "Tumis Pelangi (Buncis + Wortel + Jagung)",
        rawRequirement: "180 Kg Sayur Segar Campur + 15 L Minyak Nabati",
        standardTemp: "≥ 70°C",
        line: "Line 3 - Wok Station",
      },
      {
        category: "Protein Nabati",
        name: "Tempe Mendoan Gurih Renyah",
        rawRequirement: "120 Kg Tempe Kedelai + 25 Kg Tepung Bumbu",
        standardTemp: "≥ 60°C",
        line: "Line 4 - Deep Fryer Multi-Zone",
      },
      {
        category: "Packaging & Buah",
        name: "Packing Ompreng + Pisang + Susu",
        rawRequirement: "3.500 Tray + 3.500 Pisang + 3.500 Susu UHT",
        standardTemp: "≥ 60°C (Seal Box)",
        line: "Line 5 - Auto Tray Sealer",
      },
    ],
    timeTable: [
      { step: "1. Thawing Bahan & Cuci Ozon Sayuran", time: "02:00 - 03:00 WIB", pic: "Tim Helper Prep", status: "SELESAI ✅" },
      { step: "2. Memasak Karbohidrat & Protein Utama", time: "03:00 - 04:30 WIB", pic: "Chef Lini 1 & 2", status: "SELESAI ✅" },
      { step: "3. Memasak Sayur Tumis & Lauk Nabati", time: "03:45 - 05:00 WIB", pic: "Chef Lini 3 & 4", status: "SEDANG PROSES ⏳" },
      { step: "4. Uji Organoleptik & Quality Release", time: "04:45 - 05:15 WIB", pic: "drg. Fitriani (Ahli Gizi)", status: "APPROVED ✅" },
      { step: "5. Packaging & Sealing Food Tray", time: "04:30 - 05:45 WIB", pic: "Tim Packaging 12 Orang", status: "SEDANG PROSES ⏳" },
      { step: "6. Loading Muat Armada Berpendingin", time: "05:45 - 06:15 WIB", pic: "Tim Logistik Armada", status: "STANDBY 🚚" },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification for Requisition */}
      {requisitionNotif && (
        <div className="p-4 rounded-xl bg-amber-500 text-white shadow-lg flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-2 text-xs font-bold">
            <span>📦</span>
            <span>{requisitionNotif}</span>
          </div>
          <button onClick={() => setRequisitionNotif(null)} className="text-white hover:opacity-80 text-sm">
            ✕
          </button>
        </div>
      )}

      {/* Top Banner with Kitchen SPPG Selector & Actions */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 text-white shadow-lg shadow-orange-950/10">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Kitchen Production
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/40 text-emerald-200 border border-emerald-400/30">
              ISO 22000 & HACCP Compliant
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight">
            Dashboard Dapur Sentral SPPG MBG
          </h1>
          <p className="text-sm text-orange-100 mt-1 max-w-2xl">
            Pusat kendali operasional produksi makanan bergizi, kontrol suhu titik kendali kritis (CCP), uji kelayakan organoleptik, dan kesiapan packing muat armada.
          </p>
        </div>

        {/* Filter Controls & Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-orange-200">Unit Dapur:</span>
              <select
                value={selectedSppg}
                onChange={(e) => setSelectedSppg(e.target.value)}
                className="bg-gray-900/40 text-white text-xs font-medium rounded px-2 py-1 border border-white/20 focus:outline-none"
              >
                <option value="SPPG Harmoni Sentral 01">SPPG Harmoni Sentral 01 (Pusat)</option>
                <option value="SPPG Melati Mandiri 02">SPPG Melati Mandiri 02 (Selatan)</option>
                <option value="SPPG Garuda Sehat 03">SPPG Garuda Sehat 03 (Timur)</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-orange-200">Shift Batch:</span>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="bg-gray-900/40 text-white text-xs font-medium rounded px-2 py-1 border border-white/20 focus:outline-none"
              >
                <option value="BATCH_1">Batch 1 (Sarapan 03:00 - 06:30)</option>
                <option value="BATCH_2">Batch 2 (Siang 07:30 - 11:00)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/finance/kitchen"
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-amber-400 text-gray-900 rounded-xl hover:bg-amber-300 transition shadow-sm"
            >
              <span>💰</span> Finansial Dapur
            </Link>
            <button
              onClick={() => setIsUpdateModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-white text-orange-800 rounded-xl hover:bg-orange-50 transition shadow-sm"
            >
              <span>⚙️</span> Update Lini Masak
            </button>
            <button
              onClick={() => setIsQualityModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition shadow-sm border border-emerald-400/40"
            >
              <span>✨</span> Uji Organoleptik
            </button>
            <button
              onClick={() => setIsSpkModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-white/20 hover:bg-white/30 text-white rounded-xl transition border border-white/30"
            >
              <span>🖨️</span> Cetak SPM
            </button>
            <button
              onClick={() => setIsRequisitionModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-amber-500/80 hover:bg-amber-500 text-white rounded-xl transition border border-amber-300/40"
            >
              <span>📦</span> Req Bahan
            </button>
          </div>
        </div>
      </div>

      {/* Countdown & Live Status Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="flex items-center justify-between p-3.5 bg-white border border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300 text-lg">
              ⏱️
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Departure Countdown
              </span>
              <p className="text-sm font-extrabold text-orange-600 dark:text-orange-400">
                28 Menit Menuju Muat (06:00)
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3.5 bg-white border border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-lg">
              👨‍🍳
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Kitchen Brigade On Duty
              </span>
              <p className="text-sm font-extrabold text-gray-800 dark:text-white">
                Chef Rahmat (32 Kru Hadir)
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3.5 bg-white border border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 text-lg">
              🧪
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Sampel Retensi 2x24 Jam
              </span>
              <p className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
                Locker CH-RET-01 (Tersimpan)
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3.5 bg-white border border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 text-lg">
              🛡️
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Health Gatekeeper
              </span>
              <p className="text-sm font-extrabold text-teal-600 dark:text-teal-400">
                100% Suhu &lt; 37.3°C &amp; APD OK
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Production KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1 */}
        <div className="p-4 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Target Porsi Pagi</span>
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 text-xs">
              🎯 Kuota
            </span>
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white">
            {targetTotal.toLocaleString()} <span className="text-xs font-normal text-gray-500">Porsi</span>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
            Untuk 8 Sekolah Sasaran Jakarta Pusat
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-4 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Realisasi Masak Lauk</span>
            <span className="p-1.5 rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300 text-xs">
              🍗 Masak
            </span>
          </div>
          <div className="text-2xl font-black text-orange-600 dark:text-orange-400">
            {cookedProteinTotal.toLocaleString()} <span className="text-xs font-normal text-gray-500">Porsi</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-orange-500 h-full rounded-full"
              style={{ width: `${Math.round((cookedProteinTotal / targetTotal) * 100)}%` }}
            />
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-4 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Selesai Pack &amp; Seal</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs">
              🍱 Food Tray
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {completedTotal.toLocaleString()} <span className="text-xs font-normal text-gray-500">Tray</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-4 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Kepatuhan CCP Suhu</span>
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300 text-xs">
              🌡️ ISO 22000
            </span>
          </div>
          <div className="text-2xl font-black text-teal-600 dark:text-teal-400">
            100% <span className="text-xs font-normal text-gray-500">Lolos</span>
          </div>
          <p className="text-[11px] text-teal-700 dark:text-teal-300 mt-1 font-medium">
            ✅ Semua Lini di atas Batas Kritis
          </p>
        </div>

        {/* Card 5 */}
        <div className="p-4 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Quality Release</span>
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300 text-xs">
              ⭐ Organoleptik
            </span>
          </div>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400">
            {organoleptic.tasteScore} / 5.0
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-bold">
            Approved by Ahli Gizi PIC
          </p>
        </div>
      </div>

      {/* Main Grid: Live Cooking Lines Monitor & CCP Telemetry Sensors */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Live Cooking Lines & Batch Table (8 Cols) */}
        <div className="col-span-12 xl:col-span-8 space-y-6">
          <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span>🍳</span> Monitoring Real-time Lini Masak Dapur SPPG
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Pantau alur masak per komponen resep, kontrol suhu sensor CCP, dan kapasitas output
                </p>
              </div>
              <button
                onClick={() => setIsUpdateModalOpen(true)}
                className="self-start sm:self-auto px-3 py-1.5 text-xs font-bold text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-lg dark:bg-orange-950/40 dark:text-orange-300 transition"
              >
                + Update Lini Masak
              </button>
            </div>

            {/* Production Lines Grid Cards */}
            <div className="space-y-3.5">
              {lines.map((line) => {
                const percent = Math.round((line.completedPortions / line.targetPortions) * 100);
                const isTempSafe = line.currentTemp >= line.targetTempMin;

                return (
                  <div
                    key={line.id}
                    className="p-4 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-gray-50/50 dark:bg-gray-800/40 hover:border-orange-300 transition space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm ${
                            line.category === "KARBOHIDRAT"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
                              : line.category === "PROTEIN"
                              ? "bg-orange-100 text-orange-800 dark:bg-orange-950/50 dark:text-orange-300"
                              : line.category === "SAYUR"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300"
                          }`}
                        >
                          {line.category === "KARBOHIDRAT" && "🍚"}
                          {line.category === "PROTEIN" && "🍗"}
                          {line.category === "SAYUR" && "🥦"}
                          {line.category === "PACKAGING" && "🍱"}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
                              {line.name}
                            </span>
                            <span className="text-[10px] text-gray-400">• {line.equipment}</span>
                          </div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                            {line.menuItem}
                          </h4>
                        </div>
                      </div>

                      {/* Status Badges */}
                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <div
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
                            isTempSafe
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
                              : "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300"
                          }`}
                        >
                          <span>🌡️ {line.currentTemp}°C</span>
                          <span className="text-[10px] font-normal opacity-80">(Min {line.targetTempMin}°C)</span>
                        </div>

                        <span
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                            line.status === "COMPLETED"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                              : line.status === "HOLDING"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
                              : line.status === "PACKAGING"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300"
                              : "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300"
                          }`}
                        >
                          {line.status === "HOLDING" && "🔥 Hot Holding"}
                          {line.status === "COOKING" && "🍳 Sedang Masak"}
                          {line.status === "PACKAGING" && "🍱 Pengemasan"}
                          {line.status === "COMPLETED" && "✅ Selesai"}
                          {line.status === "PREPARATION" && "⏳ Persiapan"}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar & PIC */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          PIC: <strong className="text-gray-700 dark:text-gray-200">{line.chefInCharge}</strong> ({line.startTime} - {line.estimatedFinish})
                        </span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          {line.completedPortions.toLocaleString()} / {line.targetPortions.toLocaleString()} Porsi ({percent}%)
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            percent >= 100 ? "bg-emerald-500" : "bg-gradient-to-r from-orange-500 to-amber-500"
                          }`}
                          style={{ width: `${Math.min(100, percent)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily Ingredient Requisition Status */}
          <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span>🥬</span> Alokasi &amp; Kesiapan Bahan Baku Dapur Hari Ini
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Tracking bahan baku keluar dari gudang terpadu ke area pengolahan dapur SPPG
                </p>
              </div>
              <button
                onClick={() => setIsRequisitionModalOpen(true)}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400"
              >
                + Tambah Req Bahan
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                    <th className="pb-2 font-semibold">Komoditas Bahan</th>
                    <th className="pb-2 font-semibold">Kuantitas Masak</th>
                    <th className="pb-2 font-semibold">Batch Asal &amp; Supplier</th>
                    <th className="pb-2 font-semibold">Tahap Prep</th>
                    <th className="pb-2 text-right font-semibold">Status Higiene</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <td className="py-2.5 font-bold text-gray-900 dark:text-white">Beras Ramos Pandan Wangi</td>
                    <td className="py-2.5 font-mono font-bold text-emerald-600">350 Kg</td>
                    <td className="py-2.5 text-gray-500">LOT-BRS-20260824 (PT Pangan Nusantara)</td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-900/30 text-[10px] font-bold">
                        Steam Cooker
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-bold text-emerald-600">✅ Terverifikasi Halal</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-gray-900 dark:text-white">Daging Ayam Dada Fillet</td>
                    <td className="py-2.5 font-mono font-bold text-emerald-600">420 Kg</td>
                    <td className="py-2.5 text-gray-500">LOT-AYM-20260826 (CV Unggas Makmur)</td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 rounded bg-orange-50 text-orange-700 dark:bg-orange-950/40 text-[10px] font-bold">
                        Marinasi &amp; Panggang
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-bold text-emerald-600">✅ RPH Halal BPJPH</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-gray-900 dark:text-white">Sayuran Campur (Buncis, Wortel)</td>
                    <td className="py-2.5 font-mono font-bold text-emerald-600">180 Kg</td>
                    <td className="py-2.5 text-gray-500">LOT-SAY-20260826 (Koperasi Tani Lembang)</td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 text-[10px] font-bold">
                        Cuci Ozon &amp; Wok
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-bold text-emerald-600">✅ Bebas Residu Pestisida</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-gray-900 dark:text-white">Tempe Kedelai Murni</td>
                    <td className="py-2.5 font-mono font-bold text-emerald-600">120 Kg</td>
                    <td className="py-2.5 text-gray-500">LOT-TMP-20260826 (Pengrajin Tempe Sehati)</td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 dark:bg-purple-900/30 text-[10px] font-bold">
                        Potong &amp; Goreng
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-bold text-emerald-600">✅ Fresh Daily</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-gray-900 dark:text-white">Pisang Cavendish &amp; Susu UHT</td>
                    <td className="py-2.5 font-mono font-bold text-emerald-600">3.500 Pcs/Pack</td>
                    <td className="py-2.5 text-gray-500">LOT-FRU-20260825 (PT Frisian Agraria)</td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 dark:bg-amber-950/40 text-[10px] font-bold">
                        Staging Tray Box
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-bold text-emerald-600">✅ BPOM MD Certified</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: HACCP Telemetry, Organoleptic Tasting & Brigade (4 Cols) */}
        <div className="col-span-12 xl:col-span-4 space-y-6">
          {/* HACCP Telemetry Sensors */}
          <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <span>📡</span> Sensor CCP HACCP Real-time
                </h4>
                <p className="text-[11px] text-gray-500">Standar Pengendalian Suhu ISO 22000</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold dark:bg-emerald-950/50 dark:text-emerald-300">
                LIVE
              </span>
            </div>

            <div className="space-y-3">
              {/* Sensor 1: Core Cooking Temp */}
              <div className="p-3 rounded-xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-900/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-orange-800 dark:text-orange-300 block">
                    Suhu Masak Inti Daging
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Batas Min: ≥ 75.0°C</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-orange-600 dark:text-orange-400">84.5°C</span>
                  <span className="text-[10px] font-bold text-emerald-600 block">✅ Matang Sempurna</span>
                </div>
              </div>

              {/* Sensor 2: Hot Holding Warmer */}
              <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 block">
                    Hot Holding Warmer Box
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Batas Min: ≥ 60.0°C</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-amber-600 dark:text-amber-400">67.8°C</span>
                  <span className="text-[10px] font-bold text-emerald-600 block">✅ Hangat Steril</span>
                </div>
              </div>

              {/* Sensor 3: Chiller Bahan Segar */}
              <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-800 dark:text-blue-300 block">
                    Chiller Sayur &amp; Buah Segar
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Ambang: 1°C - 4°C</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-blue-600 dark:text-blue-400">3.2°C</span>
                  <span className="text-[10px] font-bold text-emerald-600 block">✅ Optimal Fresh</span>
                </div>
              </div>

              {/* Sensor 4: Steam Sanitizer */}
              <div className="p-3 rounded-xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-900/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-teal-800 dark:text-teal-300 block">
                    Steam Sanitizer Ompreng
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Batas Min: ≥ 100°C</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-teal-600 dark:text-teal-400">102.5°C</span>
                  <span className="text-[10px] font-bold text-emerald-600 block">✅ 100% Steril Uap</span>
                </div>
              </div>
            </div>
          </div>

          {/* Organoleptic Release Card */}
          <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <span>📋</span> Hasil Uji Organoleptik &amp; Release
                </h4>
                <p className="text-[11px] text-gray-500">drg. Fitriani, S.Gz, RD (Ahli Gizi PIC)</p>
              </div>
              <button
                onClick={() => setIsQualityModalOpen(true)}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
              >
                Edit Uji
              </button>
            </div>

            {/* Scores Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <span className="text-gray-500 text-[10px] block">Rasa (Taste)</span>
                <span className="font-extrabold text-emerald-600">⭐ {organoleptic.tasteScore} / 5.0</span>
              </div>
              <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <span className="text-gray-500 text-[10px] block">Aroma (Smell)</span>
                <span className="font-extrabold text-emerald-600">⭐ {organoleptic.aromaScore} / 5.0</span>
              </div>
              <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <span className="text-gray-500 text-[10px] block">Tekstur (Texture)</span>
                <span className="font-extrabold text-emerald-600">⭐ {organoleptic.textureScore} / 5.0</span>
              </div>
              <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <span className="text-gray-500 text-[10px] block">Tampilan (Visual)</span>
                <span className="font-extrabold text-emerald-600">⭐ {organoleptic.appearanceScore} / 5.0</span>
              </div>
            </div>

            {/* Note & Sample */}
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/70 dark:bg-emerald-950/20 dark:border-emerald-900/30 text-xs space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-bold text-emerald-900 dark:text-emerald-300">
                  Status: DISETUJUI UNTUK DISTRIBUSI
                </span>
                <span className="text-[10px] font-mono text-emerald-700">78.5°C</span>
              </div>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 italic">
                &ldquo;{organoleptic.notes}&rdquo;
              </p>
              <div className="pt-1 text-[10px] text-gray-500 flex justify-between">
                <span>ID Sampel: {organoleptic.retentionSampleCode}</span>
                <span>Simpan 2x24 Jam</span>
              </div>
            </div>
          </div>

          {/* Kitchen Shift Brigade */}
          <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-sm space-y-3">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
              <span>👥</span> Struktur Shift Dapur SPPG Hari Ini
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                <span className="text-gray-600 dark:text-gray-400">Head Chef:</span>
                <span className="font-bold text-gray-900 dark:text-white">Chef Rahmat Hidayat</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                <span className="text-gray-600 dark:text-gray-400">Sous Chef:</span>
                <span className="font-bold text-gray-900 dark:text-white">Chef Bambang Supardi</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                <span className="text-gray-600 dark:text-gray-400">Lead Ahli Gizi:</span>
                <span className="font-bold text-gray-900 dark:text-white">drg. Fitriani, S.Gz, RD</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                <span className="text-gray-600 dark:text-gray-400">Food Handlers / Helper:</span>
                <span className="font-bold text-emerald-600">24 Personil (Lengkap)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                <span className="text-gray-600 dark:text-gray-400">Packaging &amp; QA Team:</span>
                <span className="font-bold text-emerald-600">6 Personil (Lengkap)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <UpdateProductionBatchModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        lines={lines}
        onSave={(updated) => setLines(updated)}
      />

      <OrganolepticQualityModal
        isOpen={isQualityModalOpen}
        onClose={() => setIsQualityModalOpen(false)}
        record={organoleptic}
        onSave={(updated) => setOrganoleptic(updated)}
      />

      <KitchenSpkPrintModal
        isOpen={isSpkModalOpen}
        onClose={() => setIsSpkModalOpen(false)}
        spkData={spkData}
      />

      <KitchenRequisitionModal
        isOpen={isRequisitionModalOpen}
        onClose={() => setIsRequisitionModalOpen(false)}
        onSubmit={handleSaveRequisition}
      />
    </div>
  );
};
