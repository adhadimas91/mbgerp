"use client";

import React, { useState } from "react";
import NewHygieneInspectionModal, { HygieneAuditData } from "./NewHygieneInspectionModal";
import HygieneInspectionDetailModal from "./HygieneInspectionDetailModal";

const INITIAL_AUDITS: HygieneAuditData[] = [
  {
    id: "1",
    auditNumber: "AUD-ISO22K-8801",
    facilityLocation: "Dapur Sentral Harmoni - Jakarta Pusat",
    auditDate: "2026-02-27",
    auditorName: "Dewi Kartika, S.T. (Lead Auditor)",
    auditorTitle: "Food Safety Lead Specialist",
    score: 96,
    grade: "Grade A (Sangat Baik)",
    items: [
      {
        id: "item-1",
        category: "Peralatan Masak Utama",
        name: "Sterilisasi Oven & Steamer Uap (>100°C)",
        criteria: "Suhu boiler uap mencapai 105°C, bebas kerak residu organik makanan.",
        status: "Lolos",
      },
      {
        id: "item-2",
        category: "Wadah Kontak Makanan",
        name: "Sanitasi Food Pan SUS 304 MBG",
        criteria: "Seluruh wadah bersekat bebas goresan dalam, kering sempurna pasca sanitasi dishwasher.",
        status: "Lolos",
      },
      {
        id: "item-3",
        category: "Penyimpanan Dingin",
        name: "Sanitasi Cold Storage & Chiller",
        criteria: "Suhu stabil 2.8°C, pemisahan kompartemen sayur & ayam terisolasi baik.",
        status: "Lolos",
      },
      {
        id: "item-4",
        category: "Pengukuran & Lab",
        name: "Kalibrasi Termometer Probe Suhu",
        criteria: "Termometer Testo akurat, sertifikat kalibrasi aktif.",
        status: "Lolos",
      },
      {
        id: "item-5",
        category: "Pencegahan Kontaminasi Silang",
        name: "Talenan Berwarna (Color-Coded)",
        criteria: "4 warna talenan bersih terpisah rapi di rak gantung.",
        status: "Lolos",
      },
      {
        id: "item-6",
        category: "Ventilasi & Kebersihan Udara",
        name: "Exhaust Hood & Grease Trap",
        criteria: "Filter minyak bersih, tidak ada residu menetes.",
        status: "Lolos",
      },
      {
        id: "item-7",
        category: "Sanitasi Pencucian",
        name: "Suhu Air Bilas Dishwasher (>80°C)",
        criteria: "Suhu bilas final terbaca 86°C pada monitor digital Hobart.",
        status: "Lolos",
      },
      {
        id: "item-8",
        category: "Manajemen Limbah",
        name: "Tempat Sampah Tertutup & Terpilah",
        criteria: "Tempat sampah berpedal kaki berfungsi normal.",
        status: "Lolos",
      },
    ],
    capaNotes: "Kondisi dapur sangat bersih dan memenuhi kepatuhan ISO 22000:2018 secara optimal.",
  },
  {
    id: "2",
    auditNumber: "AUD-ISO22K-8802",
    facilityLocation: "SPPG Klender - Jakarta Timur",
    auditDate: "2026-02-25",
    auditorName: "Rudi Hartono, S.Si",
    auditorTitle: "Hygiene Inspector",
    score: 88,
    grade: "Grade B (Perlu Perbaikan)",
    items: [
      {
        id: "item-1",
        category: "Peralatan Masak Utama",
        name: "Sterilisasi Oven & Steamer Uap (>100°C)",
        criteria: "Suhu boiler uap normal 102°C.",
        status: "Lolos",
      },
      {
        id: "item-2",
        category: "Wadah Kontak Makanan",
        name: "Sanitasi Food Pan SUS 304 MBG",
        criteria: "Ditemukan 3 unit food pan yang belum kering sempurna saat ditumpuk.",
        status: "Perbaikan",
        notes: "Wajib menggunakan rak peniris khusus berjarak sebelum disimpan.",
      },
      {
        id: "item-3",
        category: "Penyimpanan Dingin",
        name: "Sanitasi Cold Storage & Chiller",
        criteria: "Suhu ruangan 3.2°C, pemisahan bahan pangan baik.",
        status: "Lolos",
      },
      {
        id: "item-4",
        category: "Pengukuran & Lab",
        name: "Kalibrasi Termometer Probe Suhu",
        criteria: "Termometer digital akurat.",
        status: "Lolos",
      },
      {
        id: "item-5",
        category: "Pencegahan Kontaminasi Silang",
        name: "Talenan Berwarna (Color-Coded)",
        criteria: "Talenan kuning (unggas) mengalami goresan pisau dalam.",
        status: "Perbaikan",
        notes: "Perlu penggantian papan talenan kuning baru demi higienitas.",
      },
      {
        id: "item-6",
        category: "Ventilasi & Kebersihan Udara",
        name: "Exhaust Hood & Grease Trap",
        criteria: "Perlu pembersihan grease trap akhir pekan ini.",
        status: "Lolos",
      },
      {
        id: "item-7",
        category: "Sanitasi Pencucian",
        name: "Suhu Air Bilas Dishwasher (>80°C)",
        criteria: "Suhu air bilas 82°C.",
        status: "Lolos",
      },
      {
        id: "item-8",
        category: "Manajemen Limbah",
        name: "Tempat Sampah Tertutup & Terpilah",
        criteria: "Tempat sampah tertutup rapat.",
        status: "Lolos",
      },
    ],
    capaNotes: "Penggantian 2 unit talenan kuning dan penataan rak peniris food pan stainless steel dalam waktu 2x24 jam.",
  },
  {
    id: "3",
    auditNumber: "AUD-ISO22K-8803",
    facilityLocation: "SPPG Cilandak - Jakarta Selatan",
    auditDate: "2026-02-23",
    auditorName: "Dewi Kartika, S.T. (Lead Auditor)",
    auditorTitle: "Food Safety Lead Specialist",
    score: 94,
    grade: "Grade A (Sangat Baik)",
    items: [
      {
        id: "item-1",
        category: "Peralatan Masak Utama",
        name: "Sterilisasi Oven & Steamer Uap (>100°C)",
        criteria: "Suhu uap steril stabil.",
        status: "Lolos",
      },
      {
        id: "item-2",
        category: "Wadah Kontak Makanan",
        name: "Sanitasi Food Pan SUS 304 MBG",
        criteria: "Kondisi stainless steel prima tanpa kerak gosong.",
        status: "Lolos",
      },
      {
        id: "item-3",
        category: "Penyimpanan Dingin",
        name: "Sanitasi Cold Storage & Chiller",
        criteria: "Suhu 3.0°C stabil dengan pencatatan log suhu otomatis.",
        status: "Lolos",
      },
      {
        id: "item-4",
        category: "Pengukuran & Lab",
        name: "Kalibrasi Termometer Probe Suhu",
        criteria: "Termometer lolos kalibrasi.",
        status: "Lolos",
      },
      {
        id: "item-5",
        category: "Pencegahan Kontaminasi Silang",
        name: "Talenan Berwarna (Color-Coded)",
        criteria: "Lengkap & bersih.",
        status: "Lolos",
      },
      {
        id: "item-6",
        category: "Ventilasi & Kebersihan Udara",
        name: "Exhaust Hood & Grease Trap",
        criteria: "Sistem cerobong bersih dan exhaust suction berfungsi kencang.",
        status: "Lolos",
      },
      {
        id: "item-7",
        category: "Sanitasi Pencucian",
        name: "Suhu Air Bilas Dishwasher (>80°C)",
        criteria: "Suhu air 84°C.",
        status: "Lolos",
      },
      {
        id: "item-8",
        category: "Manajemen Limbah",
        name: "Tempat Sampah Tertutup & Terpilah",
        criteria: "Pengosongan berkala berjalan sesuai SOP.",
        status: "Lolos",
      },
    ],
    capaNotes: "Lolos uji kelaikan higienitas ISO 22000.",
  },
];

export default function HygieneInspectionsAudit() {
  const [audits, setAudits] = useState<HygieneAuditData[]>(INITIAL_AUDITS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("ALL");
  const [selectedLocation, setSelectedLocation] = useState("ALL");

  const [isNewAuditOpen, setIsNewAuditOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState<HygieneAuditData | null>(null);

  // Metrics
  const totalAudits = audits.length;
  const averageScore =
    totalAudits > 0 ? Math.round(audits.reduce((acc, a) => acc + a.score, 0) / totalAudits) : 0;
  const gradeACount = audits.filter((a) => a.grade.includes("Grade A")).length;
  const capaActiveCount = audits.filter((a) => a.grade.includes("Grade B") || a.grade.includes("Grade C")).length;

  const filteredAudits = audits.filter((audit) => {
    const matchesSearch =
      audit.auditNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audit.facilityLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audit.auditorName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGrade = selectedGrade === "ALL" || audit.grade.includes(selectedGrade);
    const matchesLocation = selectedLocation === "ALL" || audit.facilityLocation === selectedLocation;

    return matchesSearch && matchesGrade && matchesLocation;
  });

  const handleSaveNewAudit = (newAudit: HygieneAuditData) => {
    setAudits((prev) => [newAudit, ...prev]);
    setIsNewAuditOpen(false);
  };

  const handleExportCsv = () => {
    const headers = ["No Dokumen,Lokasi Fasilitas,Tanggal Audit,Auditor Mutu,Skor (%),Grade,Tindakan Korektif (CAPA)"];
    const rows = filteredAudits.map((a) =>
      `"${a.auditNumber}","${a.facilityLocation}","${a.auditDate}","${a.auditorName}",${a.score},"${a.grade}","${a.capaNotes || "-"}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Audit_Higienitas_ISO22000_MBG_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* 4 Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Rata-rata Skor Sanitasi</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {averageScore}%
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <span>Standar Kepatuhan ISO 22000</span>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Dapur Lolos Grade A</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {gradeACount} <span className="text-xs font-normal text-gray-500">Unit</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-medium">
            <span>Tingkat Kelaikan & Sanitasi Tinggi</span>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Temuan Korektif (CAPA)</p>
              <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                {capaActiveCount} <span className="text-xs font-normal text-gray-500">Temuan</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium">
            <span>Perlu Tindak Lanjut Pembersihan</span>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Audit Bulan Ini</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {totalAudits} <span className="text-xs font-normal text-gray-500">Sesi</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400 font-medium">
            <span>Audit Higienitas Berkala</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Action */}
      <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari nomor audit, fasilitas dapur, auditor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Ekspor CSV Laporan
            </button>

            <button
              onClick={() => setIsNewAuditOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs hover:shadow transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Mulai Audit Higienitas Baru
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-gray-100 dark:border-gray-800 text-xs">
          <div>
            <label className="block font-medium text-gray-500 dark:text-gray-400 mb-1">Hasil Kelulusan (Grade):</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
            >
              <option value="ALL">Semua Grade</option>
              <option value="Grade A">Grade A (Sangat Baik / Lolos ISO)</option>
              <option value="Grade B">Grade B (Perlu Perbaikan / CAPA)</option>
              <option value="Grade C">Grade C (Tidak Lolos / Stop Pakai)</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-500 dark:text-gray-400 mb-1">Lokasi Fasilitas Dapur:</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
            >
              <option value="ALL">Semua Lokasi</option>
              <option value="Dapur Sentral Harmoni - Jakarta Pusat">Dapur Sentral Harmoni - Jakarta Pusat</option>
              <option value="SPPG Klender - Jakarta Timur">SPPG Klender - Jakarta Timur</option>
              <option value="SPPG Cilandak - Jakarta Selatan">SPPG Cilandak - Jakarta Selatan</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table of Hygiene Audits */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 font-semibold border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-4 py-3.5">No. Dokumen Audit</th>
                <th className="px-4 py-3.5">Fasilitas Dapur / SPPG</th>
                <th className="px-4 py-3.5">Tanggal Audit</th>
                <th className="px-4 py-3.5">Lead Auditor Mutu</th>
                <th className="px-4 py-3.5">Skor Sanitasi</th>
                <th className="px-4 py-3.5">Hasil Evaluasi</th>
                <th className="px-4 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredAudits.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    Tidak ada riwayat audit higienitas yang cocok dengan filter.
                  </td>
                </tr>
              ) : (
                filteredAudits.map((audit) => (
                  <tr key={audit.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors">
                    {/* No. Dokumen */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono text-[11px] font-bold border border-emerald-200 dark:border-emerald-800">
                          ISO
                        </div>
                        <span className="font-mono font-bold text-gray-900 dark:text-white">
                          {audit.auditNumber}
                        </span>
                      </div>
                    </td>

                    {/* Fasilitas */}
                    <td className="px-4 py-3 min-w-[200px]">
                      <div
                        onClick={() => {
                          setSelectedAudit(audit);
                          setIsDetailOpen(true);
                        }}
                        className="cursor-pointer group"
                      >
                        <span className="font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors block">
                          {audit.facilityLocation}
                        </span>
                        <span className="text-[11px] text-gray-500">
                          {audit.items.filter((i) => i.status === "Lolos").length} dari {audit.items.length} parameter lolos sempurna
                        </span>
                      </div>
                    </td>

                    {/* Tanggal */}
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300 font-medium">
                      {audit.auditDate}
                    </td>

                    {/* Auditor */}
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-900 dark:text-white block">
                        {audit.auditorName}
                      </span>
                      <span className="text-[10px] text-gray-500">{audit.auditorTitle}</span>
                    </td>

                    {/* Skor */}
                    <td className="px-4 py-3 whitespace-nowrap font-black text-sm text-emerald-600 dark:text-emerald-400">
                      {audit.score}%
                    </td>

                    {/* Grade */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold rounded-md ${
                          audit.score >= 90
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                            : audit.score >= 75
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                            : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400"
                        }`}
                      >
                        {audit.grade}
                      </span>
                    </td>

                    {/* Aksi */}
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedAudit(audit);
                          setIsDetailOpen(true);
                        }}
                        title="Lihat Detail & Laporan Lengkap"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 rounded-lg hover:bg-emerald-100 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Lihat Laporan
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <NewHygieneInspectionModal
        isOpen={isNewAuditOpen}
        onClose={() => setIsNewAuditOpen(false)}
        onSave={handleSaveNewAudit}
      />

      <HygieneInspectionDetailModal
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedAudit(null);
        }}
        audit={selectedAudit}
      />
    </div>
  );
}
