"use client";
import React, { useState } from "react";
import AddCertificationModal from "./AddCertificationModal";
import CertificationDetailModal from "./CertificationDetailModal";
import FoodHandlerCompliancePrintModal from "./FoodHandlerCompliancePrintModal";

export interface EmployeeCertRecord {
  id: string;
  employeeName: string;
  nip: string;
  role: string;
  sppgUnit: string;
  foodHandlerCert: {
    number: string;
    issuer: string;
    issuedDate: string;
    expiryDate: string;
    status: "VALID" | "EXPIRING_SOON" | "EXPIRED" | "NOT_CERTIFIED";
  };
  rectalSwabMcu: {
    labName: string;
    testDate: string;
    expiryDate: string;
    salmonellaResult: "NEGATIVE" | "POSITIVE";
    typhoidResult: "NEGATIVE" | "POSITIVE";
    status: "VALID" | "EXPIRING_SOON" | "EXPIRED";
  };
  thoraxXray: {
    testDate: string;
    expiryDate: string;
    result: "CLEAR_FIT" | "SUSPECT";
    status: "VALID" | "EXPIRED";
  };
  hepatitisATest: {
    testDate: string;
    result: "NON_REACTIVE" | "REACTIVE";
    status: "VALID" | "EXPIRED";
  };
  haccpCert?: {
    level: string;
    certNumber: string;
    issuedDate: string;
  };
  overallStatus: "COMPLIANT_FIT" | "ACTION_REQUIRED" | "RESTRICTED";
}

export const INITIAL_CERT_RECORDS: EmployeeCertRecord[] = [
  {
    id: "CERT-001",
    employeeName: "Chef Bambang Sutrisno",
    nip: "MBG-SPPG-2026-003",
    role: "Head Chef",
    sppgUnit: "SPPG Harmoni Gambir",
    foodHandlerCert: {
      number: "BNSP/CHEF/2025/9912",
      issuer: "BNSP & LSP Kuliner Indonesia",
      issuedDate: "2025-11-20",
      expiryDate: "2028-11-20",
      status: "VALID",
    },
    rectalSwabMcu: {
      labName: "Labkesda DKI Jakarta",
      testDate: "2026-08-01",
      expiryDate: "2027-02-01",
      salmonellaResult: "NEGATIVE",
      typhoidResult: "NEGATIVE",
      status: "VALID",
    },
    thoraxXray: {
      testDate: "2026-08-01",
      expiryDate: "2027-08-01",
      result: "CLEAR_FIT",
      status: "VALID",
    },
    hepatitisATest: {
      testDate: "2026-08-01",
      result: "NON_REACTIVE",
      status: "VALID",
    },
    haccpCert: {
      level: "HACCP Level 3 (Lead Implementer)",
      certNumber: "HACCP/MBG/2025/002",
      issuedDate: "2025-12-10",
    },
    overallStatus: "COMPLIANT_FIT",
  },
  {
    id: "CERT-002",
    employeeName: "Nurul Aini, S.Gz., Dietisien",
    nip: "MBG-SPPG-2026-002",
    role: "Ahli Gizi",
    sppgUnit: "SPPG Harmoni Gambir",
    foodHandlerCert: {
      number: "KEMENKES/NUT/2026/0122",
      issuer: "Persagi & Kemenkes RI",
      issuedDate: "2026-01-15",
      expiryDate: "2029-01-15",
      status: "VALID",
    },
    rectalSwabMcu: {
      labName: "Prodia Occupational Health",
      testDate: "2026-07-20",
      expiryDate: "2027-01-20",
      salmonellaResult: "NEGATIVE",
      typhoidResult: "NEGATIVE",
      status: "VALID",
    },
    thoraxXray: {
      testDate: "2026-07-20",
      expiryDate: "2027-07-20",
      result: "CLEAR_FIT",
      status: "VALID",
    },
    hepatitisATest: {
      testDate: "2026-07-20",
      result: "NON_REACTIVE",
      status: "VALID",
    },
    haccpCert: {
      level: "ISO 22000 & CCP Specialist",
      certNumber: "ISO22K/NUT/2026/019",
      issuedDate: "2026-01-18",
    },
    overallStatus: "COMPLIANT_FIT",
  },
  {
    id: "CERT-003",
    employeeName: "Siti Rahmawati",
    nip: "MBG-SPPG-2026-004",
    role: "Juru Masak",
    sppgUnit: "SPPG Harmoni Gambir",
    foodHandlerCert: {
      number: "KEMENKES/FH/2026/1042",
      issuer: "Dinas Kesehatan DKI Jakarta",
      issuedDate: "2026-02-10",
      expiryDate: "2029-02-10",
      status: "VALID",
    },
    rectalSwabMcu: {
      labName: "Labkesda DKI Jakarta",
      testDate: "2026-08-05",
      expiryDate: "2027-02-05",
      salmonellaResult: "NEGATIVE",
      typhoidResult: "NEGATIVE",
      status: "VALID",
    },
    thoraxXray: {
      testDate: "2026-08-05",
      expiryDate: "2027-08-05",
      result: "CLEAR_FIT",
      status: "VALID",
    },
    hepatitisATest: {
      testDate: "2026-08-05",
      result: "NON_REACTIVE",
      status: "VALID",
    },
    overallStatus: "COMPLIANT_FIT",
  },
  {
    id: "CERT-004",
    employeeName: "Agus Pratama",
    nip: "MBG-SPPG-2026-005",
    role: "Helper Dapur",
    sppgUnit: "SPPG Harmoni Gambir",
    foodHandlerCert: {
      number: "KEMENKES/FH/2026/1209",
      issuer: "Dinas Kesehatan DKI Jakarta",
      issuedDate: "2026-02-18",
      expiryDate: "2026-09-15",
      status: "EXPIRING_SOON",
    },
    rectalSwabMcu: {
      labName: "Labkesda DKI Jakarta",
      testDate: "2026-02-15",
      expiryDate: "2026-08-30",
      salmonellaResult: "NEGATIVE",
      typhoidResult: "NEGATIVE",
      status: "EXPIRING_SOON",
    },
    thoraxXray: {
      testDate: "2026-02-15",
      expiryDate: "2027-02-15",
      result: "CLEAR_FIT",
      status: "VALID",
    },
    hepatitisATest: {
      testDate: "2026-02-15",
      result: "NON_REACTIVE",
      status: "VALID",
    },
    overallStatus: "ACTION_REQUIRED",
  },
  {
    id: "CERT-005",
    employeeName: "Rian Hidayat",
    nip: "MBG-SPPG-2026-006",
    role: "Driver Logistik",
    sppgUnit: "SPPG Harmoni Gambir",
    foodHandlerCert: {
      number: "KEMENKES/LOG/2026/0488",
      issuer: "Dinkes DKI & Dishub",
      issuedDate: "2026-01-20",
      expiryDate: "2029-01-20",
      status: "VALID",
    },
    rectalSwabMcu: {
      labName: "Klinik Kimia Farma",
      testDate: "2026-07-25",
      expiryDate: "2027-01-25",
      salmonellaResult: "NEGATIVE",
      typhoidResult: "NEGATIVE",
      status: "VALID",
    },
    thoraxXray: {
      testDate: "2026-07-25",
      expiryDate: "2027-07-25",
      result: "CLEAR_FIT",
      status: "VALID",
    },
    hepatitisATest: {
      testDate: "2026-07-25",
      result: "NON_REACTIVE",
      status: "VALID",
    },
    overallStatus: "COMPLIANT_FIT",
  },
];

export default function CertificationMcuMatrix() {
  const [certRecords, setCertRecords] = useState<EmployeeCertRecord[]>(INITIAL_CERT_RECORDS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRecordDetail, setSelectedRecordDetail] = useState<EmployeeCertRecord | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const filteredRecords = certRecords.filter((r) => {
    const matchSearch =
      r.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.nip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.foodHandlerCert.number.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus =
      filterStatus === "ALL" ||
      (filterStatus === "COMPLIANT" && r.overallStatus === "COMPLIANT_FIT") ||
      (filterStatus === "ACTION_REQUIRED" && r.overallStatus === "ACTION_REQUIRED");

    return matchSearch && matchStatus;
  });

  const totalPersonnel = certRecords.length;
  const compliantCount = certRecords.filter((r) => r.overallStatus === "COMPLIANT_FIT").length;
  const actionRequiredCount = certRecords.filter((r) => r.overallStatus === "ACTION_REQUIRED").length;

  const handleAddRecord = (newRecord: EmployeeCertRecord) => {
    setCertRecords((prev) => [newRecord, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-theme-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
              Total Tenaga Kerja Dipantau
            </span>
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{totalPersonnel} Personil</h3>
            <p className="mt-1 text-xs text-gray-500">Kru Dapur, Helper & Driver Berkontak Pangan</p>
          </div>
        </div>

        <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-theme-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
              Sertifikasi & MCU Valid
            </span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {compliantCount} Personil ({Math.round((compliantCount / totalPersonnel) * 100)}%)
            </h3>
            <p className="mt-1 text-xs text-emerald-700 font-medium">Lolos Standar Audit ISO 22000 & Kemenkes</p>
          </div>
        </div>

        <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-theme-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
              Perlu Perpanjangan / MCU Ulang
            </span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400">{actionRequiredCount} Personil</h3>
            <p className="mt-1 text-xs text-gray-500">Masa berlaku &lt; 30 hari (Jadwalkan Labkesda)</p>
          </div>
        </div>
      </div>

      {/* Main Matrix Table */}
      <div className="p-6 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-theme-xs">
        {/* Table Controls */}
        <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Cari Tenaga Kerja, NIP, Nomor Sertifikat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:bg-gray-900/50 dark:border-gray-700 dark:text-white"
              />
              <svg
                className="w-4 h-4 text-gray-400 absolute left-3.5 top-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:bg-gray-900/50 dark:border-gray-700 dark:text-white"
            >
              <option value="ALL">Semua Status Kelayakan</option>
              <option value="COMPLIANT">Lolos Uji Penuh (Compliant)</option>
              <option value="ACTION_REQUIRED">Perlu Tindakan / Re-test</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak Dokumen Kepatuhan Audit
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white transition-colors rounded-xl bg-brand-500 hover:bg-brand-600 shadow-theme-xs cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Unggah Sertifikat / MCU Baru
            </button>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-800">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500 border-b border-gray-200 dark:bg-gray-900/50 dark:border-gray-800 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3.5">Tenaga Kerja & NIP</th>
                <th className="px-4 py-3.5">Sertifikat Food Handler</th>
                <th className="px-4 py-3.5">Swab Rectal (Salmonella)</th>
                <th className="px-4 py-3.5">Rontgen Toraks (TBC)</th>
                <th className="px-4 py-3.5">Hepatitis A (Anti-HAV)</th>
                <th className="px-4 py-3.5">Status Kelaikan</th>
                <th className="px-4 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
              {filteredRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-900/30 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {rec.employeeName}
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      {rec.role} • {rec.nip}
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    {rec.foodHandlerCert.status === "VALID" ? (
                      <div>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          ✓ Valid Aktif
                        </span>
                        <div className="text-[10px] font-mono text-gray-500">
                          Exp: {rec.foodHandlerCert.expiryDate}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 animate-pulse">
                          ⚠ Segera Expired
                        </span>
                        <div className="text-[10px] font-mono text-gray-500">
                          Exp: {rec.foodHandlerCert.expiryDate}
                        </div>
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-3.5">
                    <span className="inline-flex px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                      Negatif
                    </span>
                    <div className="text-[10px] text-gray-400">
                      Uji: {rec.rectalSwabMcu.testDate}
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <span className="inline-flex px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                      Sehat (Clear)
                    </span>
                    <div className="text-[10px] text-gray-400">
                      Exp: {rec.thoraxXray.expiryDate}
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <span className="inline-flex px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                      Non-Reaktif
                    </span>
                    <div className="text-[10px] text-gray-400">
                      Uji: {rec.hepatitisATest.testDate}
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    {rec.overallStatus === "COMPLIANT_FIT" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Layak Masak Penuh
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        Perlu Perpanjangan
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => setSelectedRecordDetail(rec)}
                      className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                      title="Lihat Berkas & Hasil Lab"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <AddCertificationModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddRecord}
        />
      )}

      {selectedRecordDetail && (
        <CertificationDetailModal
          record={selectedRecordDetail}
          isOpen={!!selectedRecordDetail}
          onClose={() => setSelectedRecordDetail(null)}
        />
      )}

      {isPrintModalOpen && (
        <FoodHandlerCompliancePrintModal
          records={certRecords}
          isOpen={isPrintModalOpen}
          onClose={() => setIsPrintModalOpen(false)}
        />
      )}
    </div>
  );
}
