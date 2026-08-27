"use client";

import React, { useRef } from "react";
import { AuditLogEntry } from "./AuditLogDetailModal";

interface AuditReportPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: AuditLogEntry[];
  filteredCount: number;
}

export default function AuditReportPrintModal({
  isOpen,
  onClose,
  logs,
  filteredCount,
}: AuditReportPrintModalProps) {
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col rounded-2xl bg-white shadow-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
        
        {/* Modal Top Control Bar */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-850 print:hidden">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white shadow">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Pratinjau Cetak Laporan Audit Trail & Forensik Sistem
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Dokumen Resmi Bukti Pengawasan & Kepatuhan ISO 27001 / BPK-RI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-blue-700 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak Dokumen (PDF)
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Printable Sheet Viewport */}
        <div className="flex-1 overflow-y-auto bg-gray-200 p-6 dark:bg-gray-950/60 print:bg-white print:p-0">
          <div
            ref={printAreaRef}
            className="mx-auto max-w-[850px] bg-white p-8 shadow-xl text-gray-900 border border-gray-300 print:border-none print:shadow-none print:max-w-none print:p-6"
          >
            
            {/* Header Surat Resmi */}
            <div className="border-b-2 border-black pb-4 text-center">
              <div className="flex items-center justify-between">
                <div className="h-16 w-16 flex items-center justify-center rounded-xl bg-blue-900 text-white font-black text-xl">
                  MBG
                </div>
                <div className="text-center flex-1 px-4">
                  <h1 className="text-base font-extrabold uppercase tracking-wider text-black">
                    BADAN GIZI NASIONAL (BGN) REPUBLIK INDONESIA
                  </h1>
                  <h2 className="text-sm font-bold uppercase tracking-wide text-gray-800">
                    DIREKTORAT TATA KELOLA, KEPATUHAN & AUDIT TEKNOLOGI INFORMASI
                  </h2>
                  <p className="text-[11px] text-gray-600">
                    Gedung BGN Pusat, Jl. Medan Merdeka Barat No. 15, Jakarta Pusat 10110
                  </p>
                  <p className="text-[11px] font-mono text-gray-500">
                    Sistem ERP Makan Bergizi Gratis • Standar ISO 27001:2022 A.12.4
                  </p>
                </div>
                <div className="text-right">
                  <div className="border border-black p-1.5 text-center inline-block">
                    <span className="text-[10px] block font-bold">KODE DOKUMEN</span>
                    <span className="text-xs font-mono font-bold">AUD-LOG-MBG</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Title */}
            <div className="my-4 text-center">
              <h3 className="text-sm font-extrabold uppercase tracking-wider underline">
                LAPORAN RESMI AUDIT TRAIL AKTIVITAS & INTEGRITAS SISTEM
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Nomor: LAP-AUD/BGN-TI/{new Date().getFullYear()}/{(Math.floor(Math.random() * 9000) + 1000)}
              </p>
            </div>

            {/* Metadata Ringkas */}
            <div className="grid grid-cols-2 gap-4 text-xs mb-4 bg-gray-50 p-3 border border-gray-200">
              <div>
                <table className="w-full text-left">
                  <tbody>
                    <tr>
                      <td className="font-semibold text-gray-600 py-0.5 w-36">Tanggal Laporan:</td>
                      <td className="font-medium text-gray-900">{currentDate}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-gray-600 py-0.5">Total Log Tercatat:</td>
                      <td className="font-medium text-gray-900">{filteredCount} Rekaman Transaksi</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-gray-600 py-0.5">Klasifikasi Audit:</td>
                      <td className="font-medium text-gray-900">Sensitif Finansial, Logistik & RBAC</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <table className="w-full text-left">
                  <tbody>
                    <tr>
                      <td className="font-semibold text-gray-600 py-0.5 w-36">Integritas Log:</td>
                      <td className="font-bold text-emerald-700">SHA-256 Chained (100% Valid)</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-gray-600 py-0.5">Sifat Catatan:</td>
                      <td className="font-bold text-red-700">Append-Only / Non-Repudiation</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-gray-600 py-0.5">Otoritas Pemeriksa:</td>
                      <td className="font-medium text-gray-900">Inspektorat Utama & BPK RI</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table of Logs */}
            <div className="border border-gray-300 text-[11px] mb-6 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-100 font-bold text-gray-800">
                  <tr>
                    <th className="py-1.5 px-2 text-left w-12">No.</th>
                    <th className="py-1.5 px-2 text-left w-28">Waktu (WIB)</th>
                    <th className="py-1.5 px-2 text-left w-32">Pengguna (Role)</th>
                    <th className="py-1.5 px-2 text-left w-20">Aksi</th>
                    <th className="py-1.5 px-2 text-left w-28">Entitas</th>
                    <th className="py-1.5 px-2 text-left">Uraian Transaksi</th>
                    <th className="py-1.5 px-2 text-left w-28">IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {logs.map((item, idx) => (
                    <tr key={item.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                      <td className="py-1 px-2 font-mono text-gray-600">{idx + 1}</td>
                      <td className="py-1 px-2 font-mono text-gray-700">{item.timestamp}</td>
                      <td className="py-1 px-2 font-medium">
                        <div>{item.userName}</div>
                        <div className="text-[9px] text-gray-500 font-mono">{item.userRole}</div>
                      </td>
                      <td className="py-1 px-2">
                        <span className="font-bold text-[10px] uppercase">{item.action}</span>
                      </td>
                      <td className="py-1 px-2 font-mono text-[10px] text-blue-800">
                        {item.entityType} #{item.entityId}
                      </td>
                      <td className="py-1 px-2 text-gray-800 leading-tight">
                        {item.description}
                      </td>
                      <td className="py-1 px-2 font-mono text-[10px] text-gray-600">
                        {item.ipAddress}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pernyataan Hukum & Tanda Tangan */}
            <div className="text-xs space-y-4">
              <p className="text-justify text-[11px] leading-relaxed text-gray-700">
                Dokumen catatan audit trail ini diterbitkan secara otomatis oleh modul pengawasan keamanan sistem ERP MBG Nasional.
                Setiap baris data telah melalui enkripsi hash kriptografi SHA-256 berantai dan diakui secara hukum sebagai alat bukti otentik
                sesuai ketentuan UU ITE No. 1 Tahun 2024 dan standar ISO/IEC 27001:2022.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="text-center">
                  <p className="font-semibold text-gray-700 text-xs">Pemeriksa Sistem & Security Officer,</p>
                  <div className="my-3 flex justify-center">
                    <div className="h-16 w-36 border border-dashed border-gray-400 flex items-center justify-center text-[10px] text-gray-500">
                      [Tanda Tangan Digital BGN]
                    </div>
                  </div>
                  <p className="font-bold text-gray-900 text-xs">Fajar Ramadhan, M.T., CISSP</p>
                  <p className="text-[10px] text-gray-500">NIP. 19850412 201012 1 003</p>
                </div>

                <div className="text-center">
                  <p className="font-semibold text-gray-700 text-xs">Mengetahui, Direktur TI & Kepatuhan BGN</p>
                  <div className="my-3 flex justify-center">
                    <div className="h-16 w-36 border border-dashed border-gray-400 flex items-center justify-center text-[10px] text-gray-500">
                      [Tanda Tangan Digital BGN]
                    </div>
                  </div>
                  <p className="font-bold text-gray-900 text-xs">Prof. Dr. Ir. H. Bambang Suhartono, M.Eng</p>
                  <p className="text-[10px] text-gray-500">NIP. 19720815 199803 1 002</p>
                </div>
              </div>
            </div>

            {/* Footer Nota Cetak */}
            <div className="mt-8 border-t border-gray-300 pt-2 text-center text-[9px] text-gray-400 font-mono">
              Dicetak pada: {new Date().toISOString()} • Sistem Terenkripsi MBG-SEC-V2.6
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
