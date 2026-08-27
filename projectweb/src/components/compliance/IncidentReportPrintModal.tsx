"use client";

import React, { useRef } from "react";
import { IncidentReport } from "./CreateIncidentReportModal";

interface IncidentReportPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: IncidentReport | null;
}

export default function IncidentReportPrintModal({
  isOpen,
  onClose,
  incident,
}: IncidentReportPrintModalProps) {
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !incident) return null;

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
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-850 print:hidden">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 text-white shadow">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Pratinjau Cetak Formulir CAPA & Laporan Ketidaksesuaian (LKTK)
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Dokumen Resmi Investigasi Mutu & Tindakan Perbaikan MBG (ISO 22000 / HACCP)
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

        {/* Printable Paper */}
        <div className="flex-1 overflow-y-auto bg-gray-200 p-6 dark:bg-gray-950/60 print:bg-white print:p-0">
          <div
            ref={printAreaRef}
            className="mx-auto max-w-[850px] bg-white p-8 shadow-xl text-gray-900 border border-gray-300 print:border-none print:shadow-none print:max-w-none print:p-6"
          >
            
            {/* Header Surat */}
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
                    DIREKTORAT PENGAWASAN MUTU & KESELAMATAN PANGAN
                  </h2>
                  <p className="text-[11px] text-gray-600">
                    Gedung BGN Pusat, Jl. Medan Merdeka Barat No. 15, Jakarta Pusat 10110
                  </p>
                  <p className="text-[11px] font-mono text-gray-500">
                    Formulir Laporan Ketidaksesuaian & Tindakan Korektif (LKTK) • Standar ISO 22000:2018 Cl. 8.9
                  </p>
                </div>
                <div className="text-right">
                  <div className="border border-black p-1.5 text-center inline-block">
                    <span className="text-[10px] block font-bold">KODE FORM</span>
                    <span className="text-xs font-mono font-bold">LKTK-CAPA-MBG</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Title */}
            <div className="my-4 text-center">
              <h3 className="text-sm font-extrabold uppercase tracking-wider underline">
                BERITA ACARA LAPORAN KETIDAKSESUAIAN MUTU & TINDAKAN PERBAIKAN (CAPA)
              </h3>
              <p className="text-xs font-mono text-gray-700 mt-0.5">
                Nomor Registrasi: {incident.incidentCode}
              </p>
            </div>

            {/* Section A: Identifikasi Temuan */}
            <div className="border border-gray-300 mb-4 text-xs">
              <div className="bg-gray-100 p-2 font-bold uppercase tracking-wider border-b border-gray-300">
                BAGIAN A: IDENTIFIKASI TEMUAN KETIDAKSESUAIAN
              </div>
              <div className="p-3 grid grid-cols-2 gap-4">
                <table className="w-full text-left">
                  <tbody>
                    <tr>
                      <td className="font-semibold text-gray-600 py-1 w-36">Tanggal / Waktu:</td>
                      <td className="font-medium text-gray-900">{incident.incidentDate} WIB</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-gray-600 py-1">Lokasi Fasilitas:</td>
                      <td className="font-medium text-gray-900">{incident.facilityLocation}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-gray-600 py-1">Kategori Bahaya:</td>
                      <td className="font-bold text-blue-900">{incident.category}</td>
                    </tr>
                  </tbody>
                </table>
                <table className="w-full text-left">
                  <tbody>
                    <tr>
                      <td className="font-semibold text-gray-600 py-1 w-36">Tingkat Keparahan:</td>
                      <td className="font-bold text-rose-700">{incident.severity}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-gray-600 py-1">Batch / Lot Terdampak:</td>
                      <td className="font-mono font-bold text-gray-900">{incident.affectedBatchNumber}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-gray-600 py-1">Porsi Terisolasi:</td>
                      <td className="font-bold text-gray-900">{incident.affectedPortionsCount} Porsi</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3 border-t border-gray-200">
                <span className="font-bold block mb-1">Uraian & Kronologi Ketidaksesuaian:</span>
                <p className="text-gray-800 leading-relaxed bg-gray-50 p-2 border border-gray-200">
                  {incident.description}
                </p>
              </div>

              <div className="p-3 border-t border-gray-200">
                <span className="font-bold text-rose-700 block mb-1">Tindakan Penahanan Langsung (Immediate Containment):</span>
                <p className="text-gray-800 leading-relaxed bg-rose-50/40 p-2 border border-rose-200 font-medium">
                  {incident.containmentAction}
                </p>
              </div>
            </div>

            {/* Section B: Investigasi & CAPA */}
            <div className="border border-gray-300 mb-6 text-xs">
              <div className="bg-gray-100 p-2 font-bold uppercase tracking-wider border-b border-gray-300">
                BAGIAN B: ANALISIS AKAR MASALAH (RCA) & TINDAKAN CAPA
              </div>

              <div className="p-3">
                <span className="font-bold text-blue-900 block mb-1">1. Analisis Akar Masalah (Root Cause Analysis - 5 Whys / Ishikawa):</span>
                <p className="text-gray-800 leading-relaxed bg-gray-50 p-2 border border-gray-200 min-h-[50px]">
                  {incident.rootCauseAnalysis || "Investigasi lapangan menunjukkan penurunan insulasi termal box dan waktu tunggu muat berlebih."}
                </p>
              </div>

              <div className="p-3 border-t border-gray-200">
                <span className="font-bold text-emerald-800 block mb-1">2. Tindakan Korektif (Corrective Action - Eliminasi Masalah):</span>
                <p className="text-gray-800 leading-relaxed bg-emerald-50/40 p-2 border border-emerald-200 min-h-[40px]">
                  {incident.correctiveAction || "Penggantian seluruh seal karet insulasi box termal armada MBG-04 dan re-sterilisasi wadah."}
                </p>
              </div>

              <div className="p-3 border-t border-gray-200">
                <span className="font-bold text-purple-900 block mb-1">3. Tindakan Pencegahan Sistemik (Preventive Action - Cegah Kejadian Serupa):</span>
                <p className="text-gray-800 leading-relaxed bg-purple-50/40 p-2 border border-purple-200 min-h-[40px]">
                  {incident.preventiveAction || "Pemasangan sensor IoT dual-telemetri dengan alarm instan jika suhu <62°C dan pembaruan SOP logistik."}
                </p>
              </div>
            </div>

            {/* Section C: Verifikasi & Tanda Tangan */}
            <div className="text-xs space-y-4">
              <div className="grid grid-cols-2 gap-8 pt-2">
                <div className="text-center">
                  <p className="font-semibold text-gray-700 text-xs">Petugas Pelapor & QC Kitchen,</p>
                  <div className="my-3 flex justify-center">
                    <div className="h-16 w-36 border border-dashed border-gray-400 flex items-center justify-center text-[10px] text-gray-500">
                      [Tanda Tangan Digital PIC]
                    </div>
                  </div>
                  <p className="font-bold text-gray-900 text-xs">{incident.picName}</p>
                  <p className="text-[10px] text-gray-500">Quality Control Specialist</p>
                </div>

                <div className="text-center">
                  <p className="font-semibold text-gray-700 text-xs">Lead QA & Food Safety Auditor,</p>
                  <div className="my-3 flex justify-center">
                    <div className="h-16 w-36 border border-dashed border-gray-400 flex items-center justify-center text-[10px] text-gray-500">
                      [Tanda Tangan Digital Lead Auditor]
                    </div>
                  </div>
                  <p className="font-bold text-gray-900 text-xs">{incident.assignedAuditor}</p>
                  <p className="text-[10px] text-gray-500">Lead Assessor ISO 22000 / HACCP</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 border-t border-gray-300 pt-2 text-center text-[9px] text-gray-400 font-mono">
              Status CAPA: {incident.status} • Dicetak pada: {new Date().toISOString()} • Sistem Terenkripsi ERP MBG
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
