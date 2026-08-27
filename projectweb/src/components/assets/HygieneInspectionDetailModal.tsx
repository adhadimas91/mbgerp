"use client";

import React from "react";
import { HygieneAuditData } from "./NewHygieneInspectionModal";

interface HygieneInspectionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  audit: HygieneAuditData | null;
}

export default function HygieneInspectionDetailModal({
  isOpen,
  onClose,
  audit,
}: HygieneInspectionDetailModalProps) {
  if (!isOpen || !audit) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Laporan Hasil Audit Higienitas
                </h3>
                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {audit.auditNumber}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Standar Kelaikan Peralatan ISO 22000:2018 & HACCP MBG
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Score Banner */}
          <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                Status Kelaikan Fasilitas & Alat Dapur
              </span>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                {audit.facilityLocation}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Tanggal Audit: <strong>{audit.auditDate}</strong> • Auditor: <strong>{audit.auditorName}</strong>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-gray-500 uppercase block font-bold">Skor Akhir</span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  {audit.score}%
                </span>
              </div>
              <div className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-xs">
                {audit.grade}
              </div>
            </div>
          </div>

          {/* Checklist Items Breakdown */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-3">
              Rincian 8 Parameter Verifikasi Higienitas
            </h5>
            <div className="space-y-2">
              {audit.items.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-gray-400">({item.category})</span>
                    </div>
                    {item.notes && (
                      <p className="text-[11px] text-amber-700 dark:text-amber-400 pl-7">
                        Catatan: {item.notes}
                      </p>
                    )}
                  </div>

                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold rounded-md shrink-0 self-start sm:self-auto ${
                      item.status === "Lolos"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                        : item.status === "Perbaikan"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400"
                    }`}
                  >
                    {item.status === "Lolos" ? "✓ Sesuai (Lolos)" : item.status === "Perbaikan" ? "⚠ Perlu Perbaikan" : "✗ Kritis"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CAPA & Signature */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700 text-xs">
              <span className="font-bold text-gray-900 dark:text-white block mb-1">
                Tindakan Korektif (CAPA):
              </span>
              <p className="text-gray-700 dark:text-gray-300">
                {audit.capaNotes || "Tidak ada temuan kritis. Seluruh peralatan memenuhi standar higienitas pangan ISO 22000."}
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700 text-xs flex flex-col justify-between">
              <div>
                <span className="font-bold text-gray-900 dark:text-white block mb-1">
                  Validasi Tanda Tangan Auditor:
                </span>
                <p className="text-gray-500">{audit.auditorName}</p>
              </div>

              {audit.signatureDataUrl ? (
                <div className="mt-2 bg-white p-2 border border-gray-200 rounded-lg max-w-[200px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={audit.signatureDataUrl} alt="Tanda Tangan Auditor" className="h-10 object-contain" />
                </div>
              ) : (
                <span className="text-[10px] text-emerald-600 font-semibold mt-2">
                  ✓ Terverifikasi Digital secara Otomatis
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Cetak Dokumen Audit
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
