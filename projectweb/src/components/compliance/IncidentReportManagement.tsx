"use client";

import React, { useState, useMemo } from "react";
import CreateIncidentReportModal, { IncidentReport } from "./CreateIncidentReportModal";
import IncidentDetailModal from "./IncidentDetailModal";
import IncidentReportPrintModal from "./IncidentReportPrintModal";

const INITIAL_INCIDENTS: IncidentReport[] = [
  {
    id: "INC-001",
    incidentCode: "INC-MBG-2026-8801",
    reportDate: "2026-08-27",
    incidentDate: "2026-08-27 08:05",
    facilityLocation: "Armada Mobil Termal MBG-04 (B-9021-TX)",
    region: "Jakarta Pusat",
    category: "FOOD_SAFETY_CCP",
    severity: "CRITICAL_P1",
    title: "Suhu Termal Makanan Siap Saji Turun di Bawah Batas CCP (58.2°C) Saat Pengantaran",
    description: "Sensor IoT mendeteksi penurunan suhu insulasi box termal armada MBG-04 di rute pengantaran Kemayoran-Senen menjadi 58.2°C selama lebih dari 15 menit (Batas minimum aman ISO 22000: 60°C).",
    affectedBatchNumber: "BATCH-HMN-20260827-01",
    affectedPortionsCount: 150,
    containmentAction: "Mobil diperintahkan putar balik ke Dapur Sentral Harmoni. 150 porsi dikarantina dan dimusnahkan sesuai SOP. Dapur cadangan segera memanaskan 150 porsi baru via steamer uap cepat.",
    rootCauseAnalysis: "1. Mengapa suhu turun? Pintu kompartemen termal armada tidak tertutup rapat akibat deformasi karet seal insulasi. 2. Mengapa tidak terdeteksi sebelum jalan? Pengecekan pra-keberangkatan driver hanya menguji visual tanpa pengetesan tekanan door-lock.",
    correctiveAction: "Penggantian seluruh gasket karet insulasi silicone tahan panas pada armada MBG-04 dan re-kalibrasi termometer probe inframerah.",
    preventiveAction: "Penerapan checklist pra-keberangkatan armada digital dengan foto bukti door-lock sebelum surat jalan diizinkan dispatch dari sistem.",
    picName: "Siti Rahmawati, S.Tr.Gz (QC Kitchen)",
    assignedAuditor: "Dewi Kartika, S.T. (Lead Auditor)",
    status: "CAPA_IMPLEMENTED",
    evidencePhotoName: "Foto_Insulasi_Seal_Rusak.jpg",
    auditorSignatureDate: "2026-08-27 11:30:00",
  },
  {
    id: "INC-002",
    incidentCode: "INC-MBG-2026-8802",
    reportDate: "2026-08-26",
    incidentDate: "2026-08-26 13:45",
    facilityLocation: "Dapur Sentral Klender - Jakarta Timur",
    region: "Jakarta Timur",
    category: "PACKAGING_DEFECT",
    severity: "MINOR_P3",
    title: "12 Unit Tutup Kemasan Food Tray Biodegradable Robek Saat Proses Sealing",
    description: "Mesin automatic heat sealer mengalami sedikit pergeseran dudukan rel tray sehingga film perekat menekan terlalu keras pada 12 kemasan.",
    affectedBatchNumber: "LOT-KLD-20260826-04",
    affectedPortionsCount: 12,
    containmentAction: "12 kemasan dipisahkan dari conveyor dan dipindahkan ke wadah steril baru sebelum makanan terkontaminasi.",
    rootCauseAnalysis: "Rel conveyor mesin sealing mengalami kelonggaran baut penyetel pemandu akibat getaran motor servo.",
    correctiveAction: "Pengencangan baut pemandu rel heat sealer dan uji coba 50 kemasan dummy tanpa kebocoran.",
    preventiveAction: "Penambahan inspeksi visual harian pada baut mechanical sealer di lembar preventive maintenance mesin dapur.",
    picName: "Budi Santoso, A.Md (Teknisi Dapur)",
    assignedAuditor: "Ir. Hendra Gunawan, MM",
    status: "VERIFIED_CLOSED",
    evidencePhotoName: "Foto_Tray_Robek.jpg",
    auditorSignatureDate: "2026-08-26 16:00:00",
  },
  {
    id: "INC-003",
    incidentCode: "INC-MBG-2026-8803",
    reportDate: "2026-08-26",
    incidentDate: "2026-08-26 06:30",
    facilityLocation: "Dapur Sentral Sentul - Kab. Bogor",
    region: "Kab. Bogor",
    category: "SUPPLIER_RAW_MATERIAL",
    severity: "MAJOR_P2",
    title: "Sayur Bayam dari Mitra Petani Cisarua Mengandung Residu Tanah & Layu",
    description: "Saat proses receiving dock, tim QC menemukan 45 Kg sayur bayam segar dari supplier CV Sayur Segar memiliki tingkat kesegaran di bawah 70% dan kebersihan akar belum memenuhi SOP pre-washing.",
    affectedBatchNumber: "RAW-BYM-20260826-02",
    affectedPortionsCount: 600,
    containmentAction: "Penerbitan Surat Penolakan Bahan Baku (Reject Notice) di dock penerimaan. Supplier diwajibkan mengirim ulang 45 Kg bayam grade A pengganti dalam waktu maksimal 2 jam.",
    rootCauseAnalysis: "Supplier melakukan pemanenan saat kondisi hujan deras sehari sebelumnya dan pencucian hidroponik tidak melalui tahap spin-drying.",
    correctiveAction: "Supplier mengirimkan batch pengganti 45 Kg yang telah disortir dan dicuci bersih sesuai standar HACCP.",
    preventiveAction: "Auditor melakukan sidak evaluasi SOP panen & pasca-panen langsung ke kebun mitra petani Cisarua.",
    picName: "Rian Prasetya, S.P. (Receiving QC)",
    assignedAuditor: "Budi Purnomo, S.Si",
    status: "UNDER_INVESTIGATION",
    evidencePhotoName: "Foto_Bayam_Layu.jpg",
  },
  {
    id: "INC-004",
    incidentCode: "INC-MBG-2026-8804",
    reportDate: "2026-08-25",
    incidentDate: "2026-08-25 15:10",
    facilityLocation: "Dapur Sentral Coblong - Kota Bandung",
    region: "Kota Bandung",
    category: "HYGIENE_SANATION",
    severity: "MINOR_P3",
    title: "Sensor Lampu Perangkap Serangga (Fly Catcher) Dapur Masak Padam",
    description: "Lampu UV fly catcher di area packaging porsi mati terputus filamennya pada saat inspeksi harian sore.",
    affectedBatchNumber: "N/A - Fasilitas",
    affectedPortionsCount: 0,
    containmentAction: "Area packaging ditutup sementara dan dibersihkan ekstra dengan lampu darurat.",
    rootCauseAnalysis: "Masa pakai tabung lampu UV telah melampaui 8.000 jam operasional.",
    correctiveAction: "Penggantian tabung UV baru dan perekat sticky-pad perangkap serangga.",
    preventiveAction: "Pencatatan jam terbang lampu UV di ERP MBG dengan alarm otomatis pergantian tabung setiap 7.000 jam.",
    picName: "Asep Sunandar (Sanitation Officer)",
    assignedAuditor: "Dra. Nur Indah, Apt.",
    status: "VERIFIED_CLOSED",
    evidencePhotoName: "Foto_Fly_Catcher.jpg",
    auditorSignatureDate: "2026-08-25 17:30:00",
  },
];

export default function IncidentReportManagement() {
  const [incidents, setIncidents] = useState<IncidentReport[]>(INITIAL_INCIDENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedRegion, setSelectedRegion] = useState<string>("ALL");

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedIncidentForDetail, setSelectedIncidentForDetail] = useState<IncidentReport | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedIncidentForPrint, setSelectedIncidentForPrint] = useState<IncidentReport | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const filteredIncidents = useMemo(() => {
    return incidents.filter((item) => {
      const matchSearch =
        searchQuery.trim() === "" ||
        item.incidentCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.facilityLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.affectedBatchNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.picName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = selectedCategory === "ALL" || item.category === selectedCategory;
      const matchSeverity = selectedSeverity === "ALL" || item.severity === selectedSeverity;
      const matchStatus = selectedStatus === "ALL" || item.status === selectedStatus;
      const matchRegion = selectedRegion === "ALL" || item.region === selectedRegion;

      return matchSearch && matchCategory && matchSeverity && matchStatus && matchRegion;
    });
  }, [incidents, searchQuery, selectedCategory, selectedSeverity, selectedStatus, selectedRegion]);

  const handleSaveIncident = (newIncident: IncidentReport) => {
    setIncidents([newIncident, ...incidents]);
  };

  const handleUpdateStatus = (
    id: string,
    newStatus: IncidentReport["status"],
    updatedData?: Partial<IncidentReport>
  ) => {
    setIncidents((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: newStatus,
              ...(updatedData || {}),
            }
          : item
      )
    );
    if (selectedIncidentForDetail && selectedIncidentForDetail.id === id) {
      setSelectedIncidentForDetail((prev) =>
        prev
          ? {
              ...prev,
              status: newStatus,
              ...(updatedData || {}),
            }
          : null
      );
    }
  };

  const handleOpenPrintModal = (inc: IncidentReport) => {
    setSelectedIncidentForPrint(inc);
    setIsPrintModalOpen(true);
  };

  // KPIs
  const totalCount = incidents.length;
  const criticalCount = incidents.filter((i) => i.severity === "CRITICAL_P1" && i.status !== "VERIFIED_CLOSED").length;
  const openCount = incidents.filter((i) => i.status !== "VERIFIED_CLOSED").length;
  const closedCount = incidents.filter((i) => i.status === "VERIFIED_CLOSED").length;
  const resolutionRate = Math.round((closedCount / (totalCount || 1)) * 100);

  const getSeverityBadge = (severity: IncidentReport["severity"]) => {
    switch (severity) {
      case "CRITICAL_P1":
        return "bg-rose-500 text-white animate-pulse";
      case "MAJOR_P2":
        return "bg-amber-500 text-white";
      case "MINOR_P3":
        return "bg-blue-500 text-white";
    }
  };

  const getStatusBadge = (status: IncidentReport["status"]) => {
    switch (status) {
      case "REPORTED":
        return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
      case "UNDER_INVESTIGATION":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300";
      case "CAPA_IMPLEMENTED":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";
      case "VERIFIED_CLOSED":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300";
    }
  };

  return (
    <div className="space-y-6">
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* KPI 1 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Insiden Terdata</p>
              <h3 className="mt-1 text-2xl font-black text-gray-900 dark:text-white font-mono">{totalCount}</h3>
              <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                Pangan, Suhu, Kemasan & Vendor
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Insiden Kritis (P1) Aktif</p>
              <h3 className="mt-1 text-2xl font-black text-rose-600 dark:text-rose-400 font-mono">{criticalCount}</h3>
              <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                {criticalCount > 0 ? "Perlu Respons Cepat < 2 Jam" : "Kondisi Terkendali"}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Proses Investigasi / CAPA</p>
              <h3 className="mt-1 text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">{openCount}</h3>
              <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                Dalam Penanganan Tim QC
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-sm dark:border-emerald-800/60 dark:bg-emerald-950/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">Tingkat Resolusi CAPA</p>
              <h3 className="mt-1 text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono">{resolutionRate}%</h3>
              <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                {closedCount} Insiden Telah Ditutup & Selesai
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* Toolbar & Filters */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 space-y-4">
        
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Kode Insiden, Judul, Lokasi Fasilitas, Batch Lot, atau PIC..."
              className="w-full rounded-xl border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 text-xs text-gray-900 placeholder-gray-400 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Action button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-rose-700 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Laporkan Insiden Mutu Baru
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 pt-2 border-t border-gray-100 dark:border-gray-800">
          
          <div>
            <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">
              Kategori Insiden
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1.5 text-xs text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="ALL">Semua Kategori</option>
              <option value="FOOD_SAFETY_CCP">Keamanan Pangan & CCP</option>
              <option value="COLD_CHAIN_LOGISTICS">Rantai Dingin / Armada</option>
              <option value="PACKAGING_DEFECT">Cacat Kemasan & Porsi</option>
              <option value="SUPPLIER_RAW_MATERIAL">Bahan Baku Supplier</option>
              <option value="HYGIENE_SANATION">Sanitasi & Kebersihan</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">
              Tingkat Keparahan (Severity)
            </label>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1.5 text-xs text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="ALL">Semua Tingkat</option>
              <option value="CRITICAL_P1">🔴 Critical (P1)</option>
              <option value="MAJOR_P2">🟠 Major (P2)</option>
              <option value="MINOR_P3">🟡 Minor (P3)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">
              Status CAPA
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1.5 text-xs text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="ALL">Semua Status</option>
              <option value="REPORTED">REPORTED (Dilaporkan)</option>
              <option value="UNDER_INVESTIGATION">UNDER_INVESTIGATION (RCA)</option>
              <option value="CAPA_IMPLEMENTED">CAPA_IMPLEMENTED (Terapkan)</option>
              <option value="VERIFIED_CLOSED">VERIFIED_CLOSED (Selesai)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">
              Wilayah Regional
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1.5 text-xs text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="ALL">Semua Wilayah</option>
              <option value="Jakarta Pusat">Jakarta Pusat</option>
              <option value="Jakarta Timur">Jakarta Timur</option>
              <option value="Kab. Bogor">Kab. Bogor</option>
              <option value="Kota Bandung">Kota Bandung</option>
            </select>
          </div>

        </div>

      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="border-b border-gray-100 bg-gray-50/70 p-4 dark:border-gray-800 dark:bg-gray-850 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              Log Pelaporan Insiden & Tindakan Korektif (CAPA Tracker)
            </h4>
            <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-800 dark:bg-rose-900/40 dark:text-rose-300">
              {filteredIncidents.length} Temuan Aktif
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
            Standar ISO 22000 Cl. 8.9 Non-Conformity
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-left text-xs">
            <thead className="bg-gray-50 dark:bg-gray-800/60 font-bold text-gray-600 dark:text-gray-300">
              <tr>
                <th className="py-3.5 px-4">Kode & Tanggal</th>
                <th className="py-3.5 px-4">Tingkat & Kategori</th>
                <th className="py-3.5 px-4">Judul & Uraian Temuan</th>
                <th className="py-3.5 px-4">Fasilitas / Batch</th>
                <th className="py-3.5 px-4">PIC / Auditor</th>
                <th className="py-3.5 px-4 text-center">Status CAPA</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredIncidents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    Tidak ditemukan rekaman laporan insiden yang sesuai dengan filter.
                  </td>
                </tr>
              ) : (
                filteredIncidents.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-850/60 transition-colors">
                    
                    {/* Code & Date */}
                    <td className="py-3.5 px-4 font-mono">
                      <div className="font-bold text-gray-900 dark:text-white">{item.incidentCode}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{item.incidentDate} WIB</div>
                    </td>

                    {/* Severity & Category */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${getSeverityBadge(item.severity)}`}>
                        {item.severity}
                      </span>
                      <div className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 mt-1">
                        {item.category}
                      </div>
                    </td>

                    {/* Title & description */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-bold text-gray-900 dark:text-white line-clamp-1">
                        {item.title}
                      </div>
                      <p className="text-[11px] text-gray-600 dark:text-gray-400 line-clamp-2 mt-0.5">
                        {item.description}
                      </p>
                    </td>

                    {/* Facility & Batch */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-gray-900 dark:text-white">{item.facilityLocation}</div>
                      <div className="font-mono text-[11px] text-gray-500">
                        {item.affectedBatchNumber} ({item.affectedPortionsCount} porsi)
                      </div>
                    </td>

                    {/* PIC & Auditor */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-gray-900 dark:text-white">{item.picName}</div>
                      <div className="text-[10px] text-gray-400">Auditor: {item.assignedAuditor}</div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${getStatusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedIncidentForDetail(item);
                            setIsDetailModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-2.5 py-1 text-xs font-semibold text-blue-600 shadow-sm hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700 transition-colors"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          CAPA
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Create Modal */}
      <CreateIncidentReportModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveIncident}
      />

      {/* Detail & CAPA RCA Modal */}
      <IncidentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedIncidentForDetail(null);
        }}
        incident={selectedIncidentForDetail}
        onUpdateStatus={handleUpdateStatus}
        onOpenPrintModal={handleOpenPrintModal}
      />

      {/* Print Modal */}
      <IncidentReportPrintModal
        isOpen={isPrintModalOpen}
        onClose={() => {
          setIsPrintModalOpen(false);
          setSelectedIncidentForPrint(null);
        }}
        incident={selectedIncidentForPrint}
      />

    </div>
  );
}
