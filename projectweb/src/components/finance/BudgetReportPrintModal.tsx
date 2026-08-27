"use client";

import React, { useRef } from "react";
import { BudgetAllocation } from "./CreateBudgetModal";

interface BudgetReportPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  budget: BudgetAllocation | null;
}

export default function BudgetReportPrintModal({
  isOpen,
  onClose,
  budget,
}: BudgetReportPrintModalProps) {
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !budget) return null;

  const handlePrint = () => {
    window.print();
  };

  const absorptionPercent = budget.totalCeiling > 0
    ? ((budget.disbursedAmount / budget.totalCeiling) * 100).toFixed(1)
    : "0.0";
  const remainingBalance = budget.totalCeiling - budget.disbursedAmount - budget.committedAmount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl transition-all dark:border-gray-800 dark:bg-gray-900 max-h-[95vh] overflow-y-auto">
        {/* Header toolbar */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </span>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Pratinjau Dokumen Pelaksanaan Anggaran (DPA) & LRA MBG
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 shadow-sm"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak Dokumen
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Printable Paper Canvas */}
        <div ref={printAreaRef} className="mt-4 rounded-xl border border-gray-300 bg-white p-8 text-black shadow-inner font-sans">
          {/* Official Letterhead */}
          <div className="border-b-2 border-black pb-3 text-center">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800">
              REPUBLIK INDONESIA - BADAN GIZI NASIONAL (BGN)
            </h2>
            <h1 className="text-base font-extrabold uppercase text-black">
              DOKUMEN PELAKSANAAN ANGGARAN & REALISASI KEUANGAN PROGRAM MBG
            </h1>
            <p className="text-xs text-gray-600">
              Standar Operasional Penyaluran Porsi Makanan Bergizi Gratis | Tahun Anggaran {budget.fiscalYear}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="mt-4 grid grid-cols-2 gap-4 text-xs border border-gray-300 p-3 rounded-md bg-gray-50/50">
            <div>
              <p><strong className="text-gray-700">Nomor DPA / SK:</strong> {budget.dpaCode}</p>
              <p><strong className="text-gray-700">Wilayah Satker:</strong> {budget.region}, {budget.province}</p>
              <p><strong className="text-gray-700">Sumber Pembiayaan:</strong> {budget.sourceOfFund}</p>
              <p><strong className="text-gray-700">Tahun Anggaran:</strong> {budget.fiscalYear}</p>
            </div>
            <div>
              <p><strong className="text-gray-700">Pejabat Pembuat Komitmen:</strong> {budget.picName}</p>
              <p><strong className="text-gray-700">Target Siswa Penerima:</strong> {budget.targetBeneficiaries.toLocaleString("id-ID")} Siswa</p>
              <p><strong className="text-gray-700">Kapasitas Harian:</strong> {budget.targetDailyPortions.toLocaleString("id-ID")} Porsi / Hari</p>
              <p><strong className="text-gray-700">Tanggal Cetak:</strong> {new Date().toLocaleDateString("id-ID", { dateStyle: "long" })}</p>
            </div>
          </div>

          {/* Financial Breakdown Table */}
          <div className="mt-4">
            <h3 className="text-xs font-bold uppercase text-gray-800 mb-2">
              I. Ringkasan Plafon & Realisasi Anggaran (LRA)
            </h3>
            <table className="w-full text-xs border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-gray-800">
                  <th className="border border-gray-300 p-2 text-left">Pos Belanja MBG</th>
                  <th className="border border-gray-300 p-2 text-right">Plafon DPA (Rp)</th>
                  <th className="border border-gray-300 p-2 text-right">Proporsi</th>
                  <th className="border border-gray-300 p-2 text-right">Realisasi SP2D (Rp)</th>
                  <th className="border border-gray-300 p-2 text-right">Sisa Saldo (Rp)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">1. Belanja Bahan Baku Pangan (Beras, Lauk, Sayur, Susu)</td>
                  <td className="border border-gray-300 p-2 text-right font-mono">Rp {budget.rawMaterialAllocation.toLocaleString("id-ID")}</td>
                  <td className="border border-gray-300 p-2 text-right">75.0%</td>
                  <td className="border border-gray-300 p-2 text-right font-mono">Rp {Math.round(budget.disbursedAmount * 0.75).toLocaleString("id-ID")}</td>
                  <td className="border border-gray-300 p-2 text-right font-mono">Rp {Math.round(budget.rawMaterialAllocation - (budget.disbursedAmount * 0.75)).toLocaleString("id-ID")}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">2. Belanja Operasional Dapur Sentral (Gas LPG, Listrik, Tenaga Masak)</td>
                  <td className="border border-gray-300 p-2 text-right font-mono">Rp {budget.operationalAllocation.toLocaleString("id-ID")}</td>
                  <td className="border border-gray-300 p-2 text-right">15.0%</td>
                  <td className="border border-gray-300 p-2 text-right font-mono">Rp {Math.round(budget.disbursedAmount * 0.15).toLocaleString("id-ID")}</td>
                  <td className="border border-gray-300 p-2 text-right font-mono">Rp {Math.round(budget.operationalAllocation - (budget.disbursedAmount * 0.15)).toLocaleString("id-ID")}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">3. Belanja Logistik Armada & Distribusi Panas/Dingin</td>
                  <td className="border border-gray-300 p-2 text-right font-mono">Rp {budget.logisticsAllocation.toLocaleString("id-ID")}</td>
                  <td className="border border-gray-300 p-2 text-right">8.0%</td>
                  <td className="border border-gray-300 p-2 text-right font-mono">Rp {Math.round(budget.disbursedAmount * 0.08).toLocaleString("id-ID")}</td>
                  <td className="border border-gray-300 p-2 text-right font-mono">Rp {Math.round(budget.logisticsAllocation - (budget.disbursedAmount * 0.08)).toLocaleString("id-ID")}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium">4. Belanja Pengujian Laboratorium, Mutu & ISO 22000</td>
                  <td className="border border-gray-300 p-2 text-right font-mono">Rp {budget.qaInspectionAllocation.toLocaleString("id-ID")}</td>
                  <td className="border border-gray-300 p-2 text-right">2.0%</td>
                  <td className="border border-gray-300 p-2 text-right font-mono">Rp {Math.round(budget.disbursedAmount * 0.02).toLocaleString("id-ID")}</td>
                  <td className="border border-gray-300 p-2 text-right font-mono">Rp {Math.round(budget.qaInspectionAllocation - (budget.disbursedAmount * 0.02)).toLocaleString("id-ID")}</td>
                </tr>
                <tr className="bg-emerald-50 font-bold">
                  <td className="border border-gray-300 p-2">TOTAL ANGGARAN KESELURUHAN</td>
                  <td className="border border-gray-300 p-2 text-right font-mono text-emerald-900">Rp {budget.totalCeiling.toLocaleString("id-ID")}</td>
                  <td className="border border-gray-300 p-2 text-right">100.0%</td>
                  <td className="border border-gray-300 p-2 text-right font-mono text-blue-900">Rp {budget.disbursedAmount.toLocaleString("id-ID")}</td>
                  <td className="border border-gray-300 p-2 text-right font-mono text-emerald-900">Rp {remainingBalance.toLocaleString("id-ID")}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Performance KPIs */}
          <div className="mt-4 grid grid-cols-3 gap-3 border border-gray-300 p-2.5 rounded-md text-xs bg-gray-50/30">
            <div>
              <span className="text-gray-500">Persentase Serapan Fiskal:</span>
              <p className="font-bold text-blue-700">{absorptionPercent}% Terserap</p>
            </div>
            <div>
              <span className="text-gray-500">Komitmen Kontrak Berjalan:</span>
              <p className="font-bold text-amber-700">Rp {budget.committedAmount.toLocaleString("id-ID")}</p>
            </div>
            <div>
              <span className="text-gray-500">Sisa Pagu Bersih (Kas):</span>
              <p className="font-bold text-emerald-700">Rp {remainingBalance.toLocaleString("id-ID")}</p>
            </div>
          </div>

          {/* Signatures & Security Stamp */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center text-xs">
            <div>
              <p className="text-gray-600">Diverifikasi oleh:</p>
              <p className="font-semibold text-gray-800">Bendahara Pengeluaran MBG</p>
              <div className="my-6 text-gray-300 text-xs italic">
                [ Tanda Tangan Digital Tersertifikasi ]
              </div>
              <p className="font-bold underline text-gray-900">Siti Rahmawati, S.E., Ak.</p>
              <p className="text-gray-500">NIP. 19850412 201001 2 003</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="h-16 w-16 border border-dashed border-emerald-600 rounded-lg p-1 flex items-center justify-center bg-emerald-50 text-[9px] text-emerald-800 font-mono text-center">
                QR VERIFIKASI BGN ERP MBG
              </div>
              <span className="mt-1 text-[10px] text-gray-400">ID: {budget.id}</span>
            </div>

            <div>
              <p className="text-gray-600">Disahkan oleh:</p>
              <p className="font-semibold text-gray-800">Kuasa Pengguna Anggaran (KPA)</p>
              <div className="my-6 text-gray-300 text-xs italic">
                [ Tanda Tangan Digital Tersertifikasi ]
              </div>
              <p className="font-bold underline text-gray-900">{budget.picName}</p>
              <p className="text-gray-500">NIP. 19780815 200501 1 008</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
