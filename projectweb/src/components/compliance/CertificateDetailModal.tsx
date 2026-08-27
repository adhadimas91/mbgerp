"use client";

import React, { useState } from "react";
import { IsoCertificate } from "./AddCertificateModal";

interface CertificateDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  cert: IsoCertificate | null;
}

export default function CertificateDetailModal({
  isOpen,
  onClose,
  cert,
}: CertificateDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "clauses" | "surveillance">("overview");

  if (!isOpen || !cert) return null;

  // Calculate days remaining
  const today = new Date();
  const expDate = new Date(cert.expiryDate);
  const diffDays = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Clauses data based on standard
  const getStandardClauses = () => {
    switch (cert.standardType) {
      case "ISO_22000":
        return [
          { clause: "Klausul 7.2", title: "Kompetensi & Higienitas Personel Dapur", score: 98, status: "COMPLIANT" },
          { clause: "Klausul 8.2", title: "Program Persyaratan Dasar (PRP Sanitasi)", score: 95, status: "COMPLIANT" },
          { clause: "Klausul 8.5", title: "Sistem Pengendalian Bahaya HACCP (CCP Suhu >60°C)", score: 100, status: "COMPLIANT" },
          { clause: "Klausul 8.7", title: "Keterlacakan Bahan Baku (Traceability Lot)", score: 96, status: "COMPLIANT" },
          { clause: "Klausul 8.9", title: "Pengendalian Ketidaksesuaian Produk (Non-conformity)", score: 92, status: "COMPLIANT" },
        ];
      case "ISO_9001":
        return [
          { clause: "Klausul 5.2", title: "Kebijakan Mutu Pelayanan MBG", score: 100, status: "COMPLIANT" },
          { clause: "Klausul 6.1", title: "Manajemen Risiko Kegagalan Distribusi", score: 94, status: "COMPLIANT" },
          { clause: "Klausul 8.4", title: "Pengendalian Proses Vendor & Pemasok", score: 96, status: "COMPLIANT" },
          { clause: "Klausul 9.1", title: "Pemantauan Kepuasan Siswa/Sekolah Penerima", score: 98, status: "COMPLIANT" },
          { clause: "Klausul 10.2", title: "Tindakan Korektif & Evaluasi Berkala", score: 95, status: "COMPLIANT" },
        ];
      case "ISO_27001":
        return [
          { clause: "A.9.2", title: "Manajemen Hak Akses Pengguna (RBAC ERP)", score: 100, status: "COMPLIANT" },
          { clause: "A.10.1", title: "Enkripsi Kriptografi SHA-256 & TLS 1.3", score: 100, status: "COMPLIANT" },
          { clause: "A.12.4", title: "Pencatatan Audit Trail Immutable Append-Only", score: 100, status: "COMPLIANT" },
          { clause: "A.14.2", title: "Keamanan Pengembangan Aplikasi Siklus SDLC", score: 96, status: "COMPLIANT" },
          { clause: "A.16.1", title: "Manajemen & Respons Insiden Keamanan Siber", score: 98, status: "COMPLIANT" },
        ];
      case "HALAL_BPJPH":
        return [
          { clause: "Kriteria 1", title: "Komitmen Kebijakan Halal & Integritas Manajemen", score: 100, status: "COMPLIANT" },
          { clause: "Kriteria 2", title: "Penyelia Halal Bersertifikat Kompetensi", score: 100, status: "COMPLIANT" },
          { clause: "Kriteria 3", title: "Bahan Baku Daging & Bumbu 100% Bersertifikat Halal", score: 100, status: "COMPLIANT" },
          { clause: "Kriteria 4", title: "Pemisahan Fasilitas Produksi Bebas Kontaminasi Najis", score: 100, status: "COMPLIANT" },
          { clause: "Kriteria 5", title: "Audit Internal Halal Berkala per Semester", score: 95, status: "COMPLIANT" },
        ];
      default:
        return [
          { clause: "Klausul 1", title: "Sanitasi Sarana & Prasarana Dapur", score: 95, status: "COMPLIANT" },
          { clause: "Klausul 2", title: "Pengendalian Hama Terpadu (Pest Control)", score: 92, status: "COMPLIANT" },
          { clause: "Klausul 3", title: "Penyimpanan Suhu Bahan Dingin & Beku", score: 96, status: "COMPLIANT" },
        ];
    }
  };

  const clauses = getStandardClauses();

  const getStatusBadge = (status: IsoCertificate["status"]) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800";
      case "EXPIRING_SOON":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800";
      case "SURVEILLANCE_DUE":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800";
      case "EXPIRED":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-gray-50 via-white to-gray-50 p-5 dark:border-gray-800 dark:from-gray-900 dark:via-gray-850 dark:to-gray-900">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 shadow-inner">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-gray-500 dark:text-gray-400">{cert.certificateNumber}</span>
                <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-md border ${getStatusBadge(cert.status)}`}>
                  {cert.status}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 font-semibold">
                  Skor Kepatuhan: {cert.complianceScore}%
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">
                {cert.standardName}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50/50 px-6 dark:border-gray-800 dark:bg-gray-850">
          <button
            onClick={() => setActiveTab("overview")}
            className={`border-b-2 py-3 px-4 text-xs font-bold transition-all ${
              activeTab === "overview"
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            Ringkasan Sertifikat
          </button>
          <button
            onClick={() => setActiveTab("clauses")}
            className={`border-b-2 py-3 px-4 text-xs font-bold transition-all ${
              activeTab === "clauses"
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            Klausul Audit & Pemenuhan ({clauses.length})
          </button>
          <button
            onClick={() => setActiveTab("surveillance")}
            className={`border-b-2 py-3 px-4 text-xs font-bold transition-all ${
              activeTab === "surveillance"
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            Jadwal Surveillance & Histori
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              
              {/* Top Summary Banner */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50">
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">Fasilitas / Entitas</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white mt-0.5 block">
                    {cert.facilityName}
                  </span>
                  <span className="text-[11px] text-gray-500 font-mono">{cert.facilityType}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">Lembaga Akreditasi</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5 block">
                    {cert.certificationBody}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-semibold">Terakreditasi KAN/BPJPH</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">Masa Berlaku</span>
                  <span className="text-sm font-mono font-semibold text-gray-900 dark:text-white mt-0.5 block">
                    {cert.issuedDate} s.d {cert.expiryDate}
                  </span>
                  <span className={`text-[11px] font-bold ${diffDays < 60 ? "text-amber-600" : "text-emerald-600"}`}>
                    {diffDays > 0 ? `Tersisa ${diffDays} hari lagi` : "Sudah Kedaluwarsa"}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">Lead Auditor</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5 block">
                    {cert.leadAuditor}
                  </span>
                  <span className="text-[11px] text-gray-500">Certified Assessor</span>
                </div>
              </div>

              {/* Ruang Lingkup Sertifikasi */}
              <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4 dark:border-blue-900/40 dark:bg-blue-950/20">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                  Ruang Lingkup Sertifikasi (Scope of Approval)
                </span>
                <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                  {cert.scope}
                </p>
              </div>

              {/* Digital Certificate Visual Simulation */}
              <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-6 dark:border-gray-700 dark:bg-gray-850 shadow-sm relative overflow-hidden">
                <div className="absolute right-4 top-4 h-16 w-16 opacity-10 flex items-center justify-center font-black text-5xl">
                  ISO
                </div>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Terdaftar Resmi pada Portal Registri MBG KAN
                    </div>
                    <h4 className="text-base font-extrabold text-gray-900 dark:text-white">
                      Dokumen Digital Terakreditasi
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                      File Lampiran: {cert.attachedDocName || "Sertifikat_Akreditasi_Resmi.pdf"} (2.4 MB)
                    </p>
                  </div>
                  <button
                    onClick={() => alert(`Mengunduh salinan resmi sertifikat ${cert.certificateNumber}...`)}
                    className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-blue-700 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Salinan PDF
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CLAUSES */}
          {activeTab === "clauses" && (
            <div className="space-y-4">
              <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-left text-xs">
                  <thead className="bg-gray-100 dark:bg-gray-800 font-bold text-gray-700 dark:text-gray-300">
                    <tr>
                      <th className="py-3 px-4 w-28">Klausul</th>
                      <th className="py-3 px-4">Deskripsi Persyaratan Standar</th>
                      <th className="py-3 px-4 w-24 text-center">Skor</th>
                      <th className="py-3 px-4 w-32 text-center">Status Pemenuhan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {clauses.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-850">
                        <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                          {item.clause}
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                          {item.title}
                        </td>
                        <td className="py-3 px-4 text-center font-mono font-bold text-gray-800 dark:text-gray-200">
                          {item.score}%
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                            ✓ {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: SURVEILLANCE */}
          {activeTab === "surveillance" && (
            <div className="space-y-4">
              <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3">
                  Rencana & Histori Siklus Surveillance Audit (3 Tahun)
                </h4>
                
                <div className="space-y-4 font-mono text-xs">
                  
                  {/* Step 1 */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white font-bold text-xs shrink-0">
                      ✓
                    </div>
                    <div className="flex-1 bg-white p-3 rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-800">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 dark:text-white">Initial Certification Audit (Stage 1 & 2)</span>
                        <span className="text-emerald-600 font-semibold">{cert.issuedDate}</span>
                      </div>
                      <p className="text-[11px] text-gray-600 dark:text-gray-400 font-sans mt-1">
                        Audit awal kepatuhan penuh, tidak ada temuan Major NC. Sertifikat resmi diterbitkan.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-500 text-white font-bold text-xs shrink-0">
                      2
                    </div>
                    <div className="flex-1 bg-white p-3 rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-800">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-purple-700 dark:text-purple-400">Surveillance Audit Tahun ke-1</span>
                        <span className="text-purple-600 font-semibold">{cert.surveillanceDueDate}</span>
                      </div>
                      <p className="text-[11px] text-gray-600 dark:text-gray-400 font-sans mt-1">
                        Pemeriksaan kepatuhan berkelanjutan, verifikasi CAPA insiden mutu dan cold chain log.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-300 text-gray-700 font-bold text-xs shrink-0 dark:bg-gray-700 dark:text-gray-300">
                      3
                    </div>
                    <div className="flex-1 bg-white p-3 rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-800">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-700 dark:text-gray-300">Recertification Audit (Tahun ke-3)</span>
                        <span className="text-gray-500">{cert.expiryDate}</span>
                      </div>
                      <p className="text-[11px] text-gray-600 dark:text-gray-400 font-sans mt-1">
                        Audit resertifikasi siklus baru perpanjangan masa berlaku 3 tahun berikutnya.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-850">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
            Nomor Reg KAN: {cert.certificateNumber}
          </span>
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-900 px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
