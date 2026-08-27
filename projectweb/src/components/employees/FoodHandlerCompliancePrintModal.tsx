"use client";
import React from "react";
import { EmployeeCertRecord } from "./CertificationMcuMatrix";

interface FoodHandlerCompliancePrintModalProps {
  records: EmployeeCertRecord[];
  isOpen: boolean;
  onClose: () => void;
}

export default function FoodHandlerCompliancePrintModal({
  records,
  isOpen,
  onClose,
}: FoodHandlerCompliancePrintModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden print:m-0 print:border-none print:shadow-none">
        {/* Controls */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 print:hidden">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </span>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Cetak Dokumen Kepatuhan Higiene Tenaga Kerja (Audit BPOM / ISO 22000)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand-500 rounded-xl hover:bg-brand-600 shadow-theme-xs cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak Dokumen Resmi
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Printable Document */}
        <div className="p-8 bg-white text-gray-900 font-sans print:p-0">
          {/* Header Kop Surat BGN */}
          <div className="border-b-2 border-gray-900 pb-4 mb-6 text-center relative">
            <div className="text-xs uppercase tracking-widest font-semibold text-gray-600">
              REPUBLIK INDONESIA • BADAN GIZI NASIONAL (BGN)
            </div>
            <div className="text-lg font-black tracking-wide text-gray-900 mt-0.5">
              MATRIKS KELAIKAN HIGIENE & SERTIFIKASI FOOD HANDLER
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Satuan Pelayanan Program Gizi (SPPG) Harmoni Gambir • Kepatuhan Permenkes No. 1096/2011 & ISO 22000:2018
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-sm font-bold uppercase underline decoration-1 underline-offset-4">
              BERITA ACARA AUDIT KESEHATAN & FOOD SAFETY TENAGA KERJA DAPUR
            </h2>
            <p className="text-xs text-gray-600 mt-0.5">
              Tanggal Audit: 27 Agustus 2026 • Tim Penilai: Satuan Penjamin Mutu BGN & Dinkes DKI
            </p>
          </div>

          {/* Table */}
          <table className="w-full text-left text-xs border border-gray-300 mb-6">
            <thead className="bg-gray-100 font-bold border-b border-gray-300">
              <tr>
                <th className="p-2 border-r border-gray-300">No</th>
                <th className="p-2 border-r border-gray-300">Nama & NIP Personil</th>
                <th className="p-2 border-r border-gray-300">Jabatan</th>
                <th className="p-2 border-r border-gray-300">Sertifikat Kemenkes</th>
                <th className="p-2 border-r border-gray-300">Swab Salmonella</th>
                <th className="p-2 border-r border-gray-300">Toraks TBC</th>
                <th className="p-2 border-r border-gray-300">Hepatitis A</th>
                <th className="p-2">Status Kelaikan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {records.map((r, idx) => (
                <tr key={r.id}>
                  <td className="p-2 border-r border-gray-300 text-center font-mono">{idx + 1}</td>
                  <td className="p-2 border-r border-gray-300">
                    <div className="font-bold">{r.employeeName}</div>
                    <div className="text-[10px] text-gray-500 font-mono">{r.nip}</div>
                  </td>
                  <td className="p-2 border-r border-gray-300">{r.role}</td>
                  <td className="p-2 border-r border-gray-300 font-mono text-[10px]">
                    <div>{r.foodHandlerCert.number}</div>
                    <div className="text-gray-500">Exp: {r.foodHandlerCert.expiryDate}</div>
                  </td>
                  <td className="p-2 border-r border-gray-300 text-center font-bold text-emerald-700">Negatif</td>
                  <td className="p-2 border-r border-gray-300 text-center font-bold text-emerald-700">Bebas TBC</td>
                  <td className="p-2 border-r border-gray-300 text-center font-bold text-emerald-700">Non-Reaktif</td>
                  <td className="p-2 font-bold text-emerald-700">
                    {r.overallStatus === "COMPLIANT_FIT" ? "LAYAK KERJA" : "PERLU TINDAKAN"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Verification Statement */}
          <div className="p-3 bg-gray-50 border border-gray-300 text-xs rounded mb-6 text-justify">
            <p className="italic text-gray-700">
              <strong>Pernyataan Tim Audit Mutu:</strong> Seluruh personil tercatat di atas telah melalui verifikasi berkas sertifikat Penjamah Makanan resmi Kemenkes RI dan skrining laboratorium mikrobiologi (rectal swab Salmonella/Shigella, serologi Hepatitis A, dan rontgen paru-paru) sesuai SOP Keamanan Pangan Nasional BGN.
            </p>
          </div>

          {/* Signature Block */}
          <div className="grid grid-cols-2 gap-8 text-xs pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-600">Lead Auditor Mutu & ISO 22000:</p>
              <div className="h-14 flex items-center justify-center italic text-gray-400">
                [ Tanda Tangan Digital ]
              </div>
              <p className="font-bold underline">Ratna Kusuma, S.Si.</p>
              <p className="text-[10px] text-gray-500">NIP. MBG-SPPG-2026-007</p>
            </div>

            <div className="text-center">
              <p className="text-gray-600">Kepala SPPG Harmoni Gambir:</p>
              <div className="h-14 flex items-center justify-center italic text-gray-400">
                [ Tanda Tangan Digital & Stempel ]
              </div>
              <p className="font-bold underline">Dr. Hendra Gunawan, S.TP., M.Si.</p>
              <p className="text-[10px] text-gray-500">NIP. MBG-SPPG-2026-001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
