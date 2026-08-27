"use client";

import React, { useState, useMemo } from "react";
import AuditLogDetailModal, { AuditLogEntry } from "./AuditLogDetailModal";
import AuditReportPrintModal from "./AuditReportPrintModal";

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "LOG-2026-0827-0091",
    timestamp: "2026-08-27 16:42:15",
    userId: "USR-001",
    userName: "Dr. Heru Prasetyo",
    userRole: "ADMIN_PUSAT",
    ipAddress: "182.253.120.45",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128.0.0.0",
    location: "Jakarta Pusat, DKI Jakarta",
    action: "APPROVE",
    entityType: "BUDGET_DPA",
    entityId: "DPA-MBG-2026-JKTPUSAT",
    description: "Otorisasi pengesahan revisi alokasi pagu DPA wilayah Jakarta Pusat senilai Rp 14.500.000.000 (Peningkatan kuota bahan baku +15%).",
    severity: "HIGH",
    prevHash: "0a89d71c9b2f34e8e19b671a5c689d02e3b8a1c97ef89a0b12d34e56f78a9b0c",
    recordHash: "9f83a42b10cd84e7235a960bf7e823a41c590bfa8319e7104cb5879a613d091e",
    oldValues: {
      totalCeiling: 12500000000,
      rawMaterialAllocation: 9375000000,
      approvalStatus: "PENDING_REVIEW",
      revisionNumber: 1,
    },
    newValues: {
      totalCeiling: 14500000000,
      rawMaterialAllocation: 10875000000,
      approvalStatus: "APPROVED",
      revisionNumber: 2,
    },
  },
  {
    id: "LOG-2026-0827-0090",
    timestamp: "2026-08-27 15:30:22",
    userId: "USR-042",
    userName: "Hj. Ratna Sari Dewi, S.E.",
    userRole: "BENDAHARA_PPK",
    ipAddress: "36.78.210.14",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Safari/537.36",
    location: "Bandung, Jawa Barat",
    action: "APPROVE",
    entityType: "PAYMENT_VOUCHER",
    entityId: "BPV-2026-0825-001",
    description: "Eksekusi SP2D pencairan transfer Bank BNI kepada PT Segar Makmur Abadi sebesar Rp 147.630.000 pasca validasi 3-Way Matching.",
    severity: "HIGH",
    prevHash: "6c781d02e3b8a1c97ef89a0b12d34e56f78a9b0c0a89d71c9b2f34e8e19b671a",
    recordHash: "0a89d71c9b2f34e8e19b671a5c689d02e3b8a1c97ef89a0b12d34e56f78a9b0c",
    oldValues: {
      paymentStatus: "PENDING_BENDAHARA",
      disbursementMethod: "BANK_TRANSFER_BUMN",
      sp2dNumber: null,
    },
    newValues: {
      paymentStatus: "PAID",
      disbursementMethod: "BANK_TRANSFER_BUMN",
      sp2dNumber: "SP2D-MBG-2026-08-88412",
      paidAt: "2026-08-27 15:30:00",
    },
  },
  {
    id: "LOG-2026-0827-0089",
    timestamp: "2026-08-27 14:15:08",
    userId: "USR-019",
    userName: "Agus Santoso (Petugas Cold Storage)",
    userRole: "PETUGAS_GUDANG",
    ipAddress: "114.122.90.11",
    userAgent: "Mobile Safari 17.4.1 (iOS)",
    location: "Dapur Sentral Harmoni, Jakarta",
    action: "UPDATE",
    entityType: "STOCK_MOVEMENT",
    entityId: "LOT-AYM-20260826-01",
    description: "Penerimaan mutasi stok ayam broiler karkas beku 500 Kg ke Cold Storage B. Pencatatan suhu core -18.5°C.",
    severity: "MEDIUM",
    prevHash: "e4a2d81f09c37b5e8a1d94b2f6c038e715d9a6c4b28e0f1375d8924cb10e74f8",
    recordHash: "6c781d02e3b8a1c97ef89a0b12d34e56f78a9b0c0a89d71c9b2f34e8e19b671a",
    oldValues: {
      stockQuantityKg: 1200,
      storageCompartment: "RECEIVING_DOCK",
      inspectionStatus: "PENDING_QC",
    },
    newValues: {
      stockQuantityKg: 1700,
      storageCompartment: "COLD_STORAGE_B",
      inspectionStatus: "PASSED_LAB",
      temperatureCelsius: -18.5,
    },
  },
  {
    id: "LOG-2026-0827-0088",
    timestamp: "2026-08-27 11:20:44",
    userId: "USR-008",
    userName: "Dewi Kartika, S.T.",
    userRole: "LEAD_AUDITOR",
    ipAddress: "103.21.244.5",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/128.0.0.0",
    location: "Surabaya, Jawa Timur",
    action: "CREATE",
    entityType: "HYGIENE_AUDIT",
    entityId: "AUD-ISO22K-8801",
    description: "Penerbitan Berita Acara Audit Higienitas Dapur Sentral Harmoni ISO 22000 dengan Skor 96/100 (Grade A - Sangat Baik).",
    severity: "LOW",
    prevHash: "3f980e12a45b7c89d0123456789abcdef0123456789abcdef0123456789abcde",
    recordHash: "e4a2d81f09c37b5e8a1d94b2f6c038e715d9a6c4b28e0f1375d8924cb10e74f8",
    oldValues: null,
    newValues: {
      auditNumber: "AUD-ISO22K-8801",
      facilityLocation: "Dapur Sentral Harmoni - Jakarta Pusat",
      score: 96,
      grade: "Grade A (Sangat Baik)",
      itemsAuditedCount: 8,
      leadAuditor: "Dewi Kartika, S.T.",
    },
  },
  {
    id: "LOG-2026-0827-0087",
    timestamp: "2026-08-27 09:12:00",
    userId: "USR-001",
    userName: "Dr. Heru Prasetyo",
    userRole: "ADMIN_PUSAT",
    ipAddress: "182.253.120.45",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0.0.0",
    location: "Jakarta Pusat, DKI Jakarta",
    action: "UPDATE",
    entityType: "USER_RBAC",
    entityId: "USR-042",
    description: "Modifikasi hak akses role Bendahara PPK Wilayah Bandung: Penambahan wewenang otorisasi SP2D di atas Rp 100 Juta.",
    severity: "CRITICAL",
    prevHash: "5b871c94d02e3b8a1c97ef89a0b12d34e56f78a9b0c0a89d71c9b2f34e8e19b6",
    recordHash: "3f980e12a45b7c89d0123456789abcdef0123456789abcdef0123456789abcde",
    oldValues: {
      roles: ["BENDAHARA_REGIONAL"],
      maxApprovalLimitRp: 100000000,
      twoFactorAuthEnforced: true,
    },
    newValues: {
      roles: ["BENDAHARA_REGIONAL", "PPK_VERIFICATOR"],
      maxApprovalLimitRp: 500000000,
      twoFactorAuthEnforced: true,
    },
  },
  {
    id: "LOG-2026-0827-0086",
    timestamp: "2026-08-27 08:05:33",
    userId: "SYS-DAEMON",
    userName: "MBG Fleet IoT Watcher",
    userRole: "SYSTEM_DAEMON",
    ipAddress: "10.200.0.1 (Internal Mesh)",
    userAgent: "Go-IoT-Client/2.4 (Alpine Linux)",
    location: "Jakarta Fleet Gateway",
    action: "SECURITY_ALERT",
    entityType: "SHIPMENT_WAYBILL",
    entityId: "SJ-MBG-20260827-001",
    description: "Peringatan Anomali Telemetri IoT: Suhu termal insulasi box pengiriman turun ke 58.2°C (Ambang batas minimum ISO 22000: 60°C).",
    severity: "CRITICAL",
    prevHash: "4a761e89b02f34e8e19b671a5c689d02e3b8a1c97ef89a0b12d34e56f78a9b0c",
    recordHash: "5b871c94d02e3b8a1c97ef89a0b12d34e56f78a9b0c0a89d71c9b2f34e8e19b6",
    oldValues: {
      boxTemperatureCelsius: 64.5,
      temperatureStatus: "OPTIMAL",
    },
    newValues: {
      boxTemperatureCelsius: 58.2,
      temperatureStatus: "TEMP_WARNING_CCP",
      alertDispatchedTo: ["DISPATCHER_JKT", "QA_OFFICER"],
    },
  },
  {
    id: "LOG-2026-0826-0085",
    timestamp: "2026-08-26 17:40:19",
    userId: "USR-003",
    userName: "Ir. Dedi Mulyadi, M.Si",
    userRole: "ADMIN_REGIONAL",
    ipAddress: "110.137.45.89",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/127.0.0.0",
    location: "Bogor, Jawa Barat",
    action: "STATUS_CHANGE",
    entityType: "SUPPLIER_VERIFICATION",
    entityId: "SUP-003",
    description: "Pembaruan status verifikasi sertifikasi Halal & ISO 22000 untuk CV Sayur Segar Agro Cisarua menjadi VERIFIED.",
    severity: "MEDIUM",
    prevHash: "1b234a56c789d0123456789abcdef0123456789abcdef0123456789abcdef0123",
    recordHash: "4a761e89b02f34e8e19b671a5c689d02e3b8a1c97ef89a0b12d34e56f78a9b0c",
    oldValues: {
      halalStatus: "UNDER_AUDIT",
      isoStatus: "SUBMITTED",
      vendorStatus: "PROVISIONAL",
    },
    newValues: {
      halalStatus: "CERTIFIED_BPJPH",
      isoStatus: "ISO22000_VERIFIED",
      vendorStatus: "VERIFIED_ACTIVE",
      certifiedUntil: "2028-08-26",
    },
  },
  {
    id: "LOG-2026-0826-0084",
    timestamp: "2026-08-26 14:10:55",
    userId: "USR-014",
    userName: "Siti Rahmawati (Kasir Pengeluaran)",
    userRole: "BENDAHARA_PPK",
    ipAddress: "180.252.88.23",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Firefox/129.0",
    location: "Jakarta Timur, DKI Jakarta",
    action: "CREATE",
    entityType: "EXPENDITURE_BKK",
    entityId: "BKK-2026-0826-003",
    description: "Penerbitan Bukti Kas Keluar (BKK) pengadaan kemasan ramah lingkungan Food Tray Biodegradable senilai Rp 8.880.000 (PPN 11% dipotong).",
    severity: "LOW",
    prevHash: "8f7e6d5c4b3a210987654321fedcba0987654321fedcba0987654321fedcba09",
    recordHash: "1b234a56c789d0123456789abcdef0123456789abcdef0123456789abcdef0123",
    oldValues: null,
    newValues: {
      bkkNumber: "BKK-2026-0826-003",
      category: "OPERASIONAL_KEMASAN",
      grossAmount: 8880000,
      taxPpn11: 880000,
      netDisbursed: 8000000,
      beneficiary: "PT PaperPack Green Indonesia",
    },
  },
];

export default function AuditLogViewer() {
  const [logs, setLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEntity, setSelectedEntity] = useState<string>("ALL");
  const [selectedAction, setSelectedAction] = useState<string>("ALL");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("ALL");
  const [selectedRole, setSelectedRole] = useState<string>("ALL");

  // Modals state
  const [selectedLogForDetail, setSelectedLogForDetail] = useState<AuditLogEntry | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Filter logic
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchSearch =
        searchQuery.trim() === "" ||
        log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.entityId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.ipAddress.includes(searchQuery);

      const matchEntity = selectedEntity === "ALL" || log.entityType === selectedEntity;
      const matchAction = selectedAction === "ALL" || log.action === selectedAction;
      const matchSeverity = selectedSeverity === "ALL" || log.severity === selectedSeverity;
      const matchRole = selectedRole === "ALL" || log.userRole === selectedRole;

      return matchSearch && matchEntity && matchAction && matchSeverity && matchRole;
    });
  }, [logs, searchQuery, selectedEntity, selectedAction, selectedSeverity, selectedRole]);

  // Statistics calculation
  const totalCount = logs.length;
  const criticalCount = logs.filter((l) => l.severity === "CRITICAL" || l.severity === "HIGH").length;
  const financialCount = logs.filter(
    (l) => l.entityType === "BUDGET_DPA" || l.entityType === "EXPENDITURE_BKK" || l.entityType === "PAYMENT_VOUCHER"
  ).length;

  const handleExportCSV = () => {
    const headers = ["ID Log", "Waktu", "User", "Role", "Aksi", "Entitas", "Entity ID", "Uraian", "IP Address", "Severity", "Hash SHA256"];
    const rows = filteredLogs.map((l) => [
      l.id,
      l.timestamp,
      `"${l.userName}"`,
      l.userRole,
      l.action,
      l.entityType,
      l.entityId,
      `"${l.description.replace(/"/g, '""')}"`,
      l.ipAddress,
      l.severity,
      l.recordHash,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Audit_Trail_MBG_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getActionStyle = (action: AuditLogEntry["action"]) => {
    switch (action) {
      case "CREATE":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800";
      case "UPDATE":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800";
      case "DELETE":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800";
      case "STATUS_CHANGE":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800";
      case "APPROVE":
        return "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-800";
      case "REJECT":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800";
      case "SECURITY_ALERT":
        return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Card 1: Total Logs */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Audit Records</p>
              <h3 className="mt-1 text-2xl font-black text-gray-900 dark:text-white font-mono">{totalCount}</h3>
              <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                ● Append-only immutable log
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2: Financial & Critical Logs */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Log Finansial & Otorisasi</p>
              <h3 className="mt-1 text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">{financialCount}</h3>
              <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                Pagu DPA, BKK Kas, & SP2D
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 3: High/Critical Alerts */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Alert Sensitif & RBAC</p>
              <h3 className="mt-1 text-2xl font-black text-rose-600 dark:text-rose-400 font-mono">{criticalCount}</h3>
              <p className="mt-1 text-[11px] text-rose-500 dark:text-rose-400 font-medium">
                Peringatan CCP & Hak Akses
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 4: SHA-256 Chain Status */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-sm dark:border-emerald-800/60 dark:bg-emerald-950/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">Rantai Kriptografi SHA-256</p>
              <h3 className="mt-1 text-xl font-extrabold text-emerald-700 dark:text-emerald-400">100% VALID</h3>
              <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
                ISO 27001 Sec 12.4 Compliant
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* Action and Filter Toolbar */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 space-y-4">
        
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari ID Log, Nama User, Entitas, Uraian, atau IP Address..."
              className="w-full rounded-xl border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 text-xs text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Export and Print Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Ekspor CSV
            </button>
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak BAST / Laporan Audit
            </button>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 pt-2 border-t border-gray-100 dark:border-gray-800">
          
          {/* Filter Entitas */}
          <div>
            <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">
              Entitas Sistem
            </label>
            <select
              value={selectedEntity}
              onChange={(e) => setSelectedEntity(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1.5 text-xs text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="ALL">Semua Entitas</option>
              <option value="BUDGET_DPA">Pagu Anggaran DPA</option>
              <option value="PAYMENT_VOUCHER">Voucher Bayar SP2D</option>
              <option value="EXPENDITURE_BKK">Bukti Kas Keluar BKK</option>
              <option value="STOCK_MOVEMENT">Stok & Gudang</option>
              <option value="SHIPMENT_WAYBILL">Surat Jalan Logistik</option>
              <option value="HYGIENE_AUDIT">Inspeksi ISO 22000</option>
              <option value="USER_RBAC">Hak Akses & Role</option>
              <option value="SUPPLIER_VERIFICATION">Verifikasi Vendor</option>
            </select>
          </div>

          {/* Filter Aksi */}
          <div>
            <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">
              Jenis Aksi Transaksi
            </label>
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1.5 text-xs text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="ALL">Semua Aksi</option>
              <option value="CREATE">CREATE (Baru)</option>
              <option value="UPDATE">UPDATE (Perubahan)</option>
              <option value="APPROVE">APPROVE (Otorisasi)</option>
              <option value="STATUS_CHANGE">STATUS_CHANGE</option>
              <option value="SECURITY_ALERT">SECURITY_ALERT</option>
              <option value="DELETE">DELETE (Hapus)</option>
            </select>
          </div>

          {/* Filter Severity */}
          <div>
            <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">
              Tingkat Sensitivitas
            </label>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1.5 text-xs text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="ALL">Semua Tingkat</option>
              <option value="CRITICAL">CRITICAL (Sangat Kritis)</option>
              <option value="HIGH">HIGH (Tinggi/Finansial)</option>
              <option value="MEDIUM">MEDIUM (Menengah)</option>
              <option value="LOW">LOW (Rutin)</option>
            </select>
          </div>

          {/* Filter Role */}
          <div>
            <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">
              Role Pelaksana
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1.5 text-xs text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="ALL">Semua Role</option>
              <option value="ADMIN_PUSAT">ADMIN_PUSAT</option>
              <option value="BENDAHARA_PPK">BENDAHARA_PPK</option>
              <option value="LEAD_AUDITOR">LEAD_AUDITOR</option>
              <option value="PETUGAS_GUDANG">PETUGAS_GUDANG</option>
              <option value="ADMIN_REGIONAL">ADMIN_REGIONAL</option>
              <option value="SYSTEM_DAEMON">SYSTEM_DAEMON</option>
            </select>
          </div>

        </div>

      </div>

      {/* Main Audit Trail Data Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="border-b border-gray-100 bg-gray-50/70 p-4 dark:border-gray-800 dark:bg-gray-850 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              Log Stream Aktivitas Append-Only
            </h4>
            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
              {filteredLogs.length} Rekaman Ditampilkan
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
            Format Waktu: WIB (UTC+7)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-left text-xs">
            <thead className="bg-gray-50 dark:bg-gray-800/60 font-bold text-gray-600 dark:text-gray-300">
              <tr>
                <th className="py-3.5 px-4">Waktu / ID Log</th>
                <th className="py-3.5 px-4">Pengguna / Role</th>
                <th className="py-3.5 px-4">Aksi & Sensitivitas</th>
                <th className="py-3.5 px-4">Entitas & Target</th>
                <th className="py-3.5 px-4">Uraian Perubahan Data</th>
                <th className="py-3.5 px-4">Klien & IP</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    Tidak ditemukan rekaman audit log yang sesuai dengan filter pencarian.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-850/60 transition-colors">
                    
                    {/* Timestamp & ID */}
                    <td className="py-3.5 px-4 font-mono">
                      <div className="font-semibold text-gray-900 dark:text-white">{log.timestamp}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{log.id}</div>
                    </td>

                    {/* Actor */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-gray-900 dark:text-white">{log.userName}</div>
                      <span className="inline-block mt-0.5 rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-mono font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                        {log.userRole}
                      </span>
                    </td>

                    {/* Action & Severity */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border ${getActionStyle(log.action)}`}>
                          {log.action}
                        </span>
                        {log.severity === "CRITICAL" && (
                          <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" title="Critical Event"></span>
                        )}
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono mt-1 font-semibold">
                        Sev: {log.severity}
                      </div>
                    </td>

                    {/* Entity */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                        {log.entityType}
                      </span>
                      <div className="font-mono text-[11px] text-gray-600 dark:text-gray-400 font-medium">
                        #{log.entityId}
                      </div>
                    </td>

                    {/* Description */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="line-clamp-2 text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                        {log.description}
                      </p>
                      {log.oldValues && log.newValues && (
                        <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                          Tersedia Diff JSONB
                        </span>
                      )}
                    </td>

                    {/* Client & IP */}
                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      <div className="text-gray-800 dark:text-gray-200 font-semibold">{log.ipAddress}</div>
                      <div className="text-gray-400 truncate max-w-[130px]">{log.location}</div>
                    </td>

                    {/* Action Button */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => {
                          setSelectedLogForDetail(log);
                          setIsDetailModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-2.5 py-1 text-xs font-semibold text-blue-600 shadow-sm hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700 transition-colors"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Inspeksi
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Detail Modal with Diff & Chain Hash */}
      <AuditLogDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedLogForDetail(null);
        }}
        log={selectedLogForDetail}
      />

      {/* Print / BAST Report Modal */}
      <AuditReportPrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        logs={filteredLogs}
        filteredCount={filteredLogs.length}
      />

    </div>
  );
}
