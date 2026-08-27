"use client";

import React, { useRef } from "react";
import { IsoCertificate } from "./AddCertificateModal";

interface IsoAuditReportPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificates: IsoCertificate[];
}

export default function IsoAuditReportPrintModal({
  isOpen,
  onClose,
  certificates,
}: IsoAuditReportPrintModalProps) {
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
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-850 print:hidden">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Pratinjau Cetak Matriks Kepatuhan Standar ISO & Halal
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Laporan Akreditasi KAN, Kemenag & Sertifikasi Mutu Dapur MBG
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
                    DIREKTORAT PENJAMINAN MUTU, KESELAMATAN PANGAN & STANDARISASI
                  </h2>
                  <p className="text-[11px] text-gray-600">
                    Gedung BGN Pusat, Jl. Medan Merdeka Barat No. 15, Jakarta Pusat 10110
                  </p>
                  <p className="text-[11px] font-mono text-gray-500">
                    Matriks Akreditasi KAN • Standar ISO 22000 • ISO 9001 • ISO 27001 • Halal BPJPH
                  </p>
                </div>
                <div className="text-right">
                  <div className="border border-black p-1.5 text-center inline-block">
                    <span className="text-[10px] block font-bold">KODE FORM</span>
                    <span className="text-xs font-mono font-bold">MATRIKS-ISO</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="my-4 text-center">
              <h3 className="text-sm font-extrabold uppercase tracking-wider underline">
                LAPORAN MATRIKS MONITORING SERTIFIKASI & KEPATUHAN STANDAR MUTU MBG
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Nomor: LAP-MUTU/BGN/{new Date().getFullYear()}/{(Math.floor(Math.random() * 9000) + 1000)}
              </p>
            </div>

            {/* Summary KPI info */}
            <div className="grid grid-cols-2 gap-4 text-xs mb-4 bg-gray-50 p-3 border border-gray-200">
              <div>
                <table className="w-full text-left">
                  <tbody>
                    <tr>
                      <td className="font-semibold text-gray-600 py-0.5 w-40">Tanggal Penerbitan:</td>
                      <td className="font-medium text-gray-900">{currentDate}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-gray-600 py-0.5">Total Fasilitas Terdata:</td>
                      <td className="font-medium text-gray-900">{certificates.length} Entitas Dapur / Pemasok</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <table className="w-full text-left">
                  <tbody>
                    <tr>
                      <td className="font-semibold text-gray-600 py-0.5 w-40">Tingkat Kepatuhan:</td>
                      <td className="font-bold text-emerald-700">98.2% (Memenuhi Syarat BGN)</td>
                    </tr>
                    <tr>
                      <td className="font-semibold text-gray-600 py-0.5">Lembaga Akreditasi:</td>
                      <td className="font-medium text-gray-900">KAN, Sucofindo, Mutu Cert, BPJPH</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table */}
            <div className="border border-gray-300 text-[11px] mb-6 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-100 font-bold text-gray-800">
                  <tr>
                    <th className="py-2 px-2 text-left w-10">No.</th>
                    <th className="py-2 px-2 text-left w-28">No. Sertifikat</th>
                    <th className="py-2 px-2 text-left w-28">Standar</th>
                    <th className="py-2 px-2 text-left">Nama Fasilitas & Wilayah</th>
                    <th className="py-2 px-2 text-left w-28">Lembaga KAN</th>
                    <th className="py-2 px-2 text-left w-24">Kedaluwarsa</th>
                    <th className="py-2 px-2 text-center w-16">Skor</th>
                    <th className="py-2 px-2 text-center w-20">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {certificates.map((c, idx) => (
                    <tr key={c.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                      <td className="py-1.5 px-2 font-mono text-gray-600">{idx + 1}</td>
                      <td className="py-1.5 px-2 font-mono text-gray-800 font-bold">{c.certificateNumber}</td>
                      <td className="py-1.5 px-2 font-semibold text-blue-900">{c.standardType}</td>
                      <td className="py-1.5 px-2">
                        <div className="font-medium">{c.facilityName}</div>
                        <div className="text-[10px] text-gray-500">{c.region}</div>
                      </td>
                      <td className="py-1.5 px-2 text-[10px] text-gray-700">{c.certificationBody}</td>
                      <td className="py-1.5 px-2 font-mono text-[10px] text-gray-700">{c.expiryDate}</td>
                      <td className="py-1.5 px-2 text-center font-mono font-bold text-emerald-700">{c.complianceScore}%</td>
                      <td className="py-1.5 px-2 text-center font-bold text-[10px]">{c.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Signature Area */}
            <div className="text-xs space-y-4">
              <p className="text-justify text-[11px] leading-relaxed text-gray-700">
                Laporan matriks ini menyatakan bahwa seluruh fasilitas dan mitra operasional tertera telah melalui audit verifikasi berkala
                dan dinyatakan memenuhi standar mutu pangan, higienitas, dan keamanan informasi yang dipersyaratkan oleh Badan Gizi Nasional.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="text-center">
                  <p className="font-semibold text-gray-700 text-xs">Lead Quality & Food Safety Auditor,</p>
                  <div className="my-3 flex justify-center">
                    <div className="h-16 w-36 border border-dashed border-gray-400 flex items-center justify-center text-[10px] text-gray-500">
                      [Tanda Tangan Digital BGN]
                    </div>
                  </div>
                  <p className="font-bold text-gray-900 text-xs">Dewi Kartika, S.T., M.Sc</p>
                  <p className="text-[10px] text-gray-500">Lead Assessor ISO 22000 / HACCP</p>
                </div>

                <div className="text-center">
                  <p className="font-semibold text-gray-700 text-xs">Menyetujui, Direktur Mutu & Standarisasi BGN</p>
                  <div className="my-3 flex justify-center">
                    <div className="h-16 w-36 border border-dashed border-gray-400 flex items-center justify-center text-[10px] text-gray-500">
                      [Tanda Tangan Digital BGN]
                    </div>
                  </div>
                  <p className="font-bold text-gray-900 text-xs">Dr. drh. H. Agus Wibowo, M.Si</p>
                  <p className="text-[10px] text-gray-500">NIP. 19700310 199503 1 001</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
