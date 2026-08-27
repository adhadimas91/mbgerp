"use client";
import React, { useRef } from "react";
import { BrandLogo } from "@/components/common/BrandLogo";

interface FinancialReportLraPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportData: {
    fiscalYear: number;
    periodName: string;
    totalCeiling: number;
    totalDisbursed: number;
    totalCommitted: number;
    totalRemaining: number;
    absorptionRate: number;
    categories: {
      code: string;
      name: string;
      percentageStandard: number;
      allocated: number;
      realized: number;
      committed: number;
      remaining: number;
      rate: number;
    }[];
    regionalBreakdown: {
      region: string;
      dpaCode: string;
      ceiling: number;
      realized: number;
      rate: number;
      status: string;
    }[];
  };
}

export const FinancialReportLraPrintModal: React.FC<FinancialReportLraPrintModalProps> = ({
  isOpen,
  onClose,
  reportData,
}) => {
  const printRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const formatRupiah = (val: number) => {
    return "Rp " + Math.round(val).toLocaleString("id-ID");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
        {/* Top Action Bar (hidden on print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 print:hidden">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Cetak Laporan Realisasi Anggaran (LRA) MBG
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Format Standar Akuntabilitas Badan Gizi Nasional (BGN) RI &amp; Kemenkeu
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak Dokumen
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 rounded-lg hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div ref={printRef} className="flex-1 p-8 overflow-y-auto bg-white text-gray-900">
          {/* Letterhead */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-gray-900">
            <div className="flex items-center gap-3">
              <BrandLogo className="h-12 w-auto" />
              <div>
                <h1 className="text-base font-extrabold tracking-tight text-gray-900 uppercase">
                  BADAN GIZI NASIONAL (BGN) REPUBLIK INDONESIA
                </h1>
                <h2 className="text-xs font-bold text-emerald-800 uppercase">
                  DIREKTORAT JENDERAL PERENCANAAN &amp; KEUANGAN PROGRAM MBG
                </h2>
                <p className="text-[10px] text-gray-600">
                  Gedung Graha Pangan Mandiri, Jl. Medan Merdeka Barat No. 12, Jakarta Pusat 10110
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-300 rounded">
                DOKUMEN KEUANGAN LRA
              </span>
              <div className="text-[10px] font-mono mt-1 text-gray-600">APBN TAHUN ANGGARAN {reportData.fiscalYear}</div>
            </div>
          </div>

          {/* Report Title */}
          <div className="text-center my-4">
            <h2 className="text-sm font-black tracking-wide uppercase text-gray-900 underline decoration-2">
              LAPORAN REALISASI ANGGARAN (LRA) PROGRAM MBG
            </h2>
            <p className="text-xs font-semibold text-gray-700 mt-0.5">
              Periode: {reportData.periodName} (Tahun Anggaran {reportData.fiscalYear})
            </p>
          </div>

          {/* Top Summary Table */}
          <div className="grid grid-cols-4 gap-3 p-3 mb-4 text-xs bg-gray-50 border border-gray-200 rounded-lg">
            <div>
              <span className="text-[10px] text-gray-500 block">Total Pagu DPA:</span>
              <span className="font-bold text-gray-900">{formatRupiah(reportData.totalCeiling)}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 block">Realisasi SP2D Kas:</span>
              <span className="font-bold text-emerald-700">{formatRupiah(reportData.totalDisbursed)}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 block">Komitmen PO Terikat:</span>
              <span className="font-bold text-blue-700">{formatRupiah(reportData.totalCommitted)}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 block">Tingkat Penyerapan:</span>
              <span className="font-extrabold text-emerald-800">{reportData.absorptionRate}%</span>
            </div>
          </div>

          {/* Breakdown 4 Pillars BGN */}
          <div className="mb-5">
            <h4 className="text-xs font-bold uppercase text-gray-800 mb-1.5 flex items-center gap-1.5">
              <span>📊</span> I. Realisasi Belanja Menurut 4 Pos Standar BGN (75:15:8:2)
            </h4>
            <table className="w-full text-left border-collapse border border-gray-300 text-[11px]">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="p-1.5 border-r border-gray-300 w-16">Kode Pos</th>
                  <th className="p-1.5 border-r border-gray-300">Uraian Pos Belanja</th>
                  <th className="p-1.5 border-r border-gray-300 text-center w-16">Porsi Standar</th>
                  <th className="p-1.5 border-r border-gray-300 text-right">Alokasi Pagu (Rp)</th>
                  <th className="p-1.5 border-r border-gray-300 text-right">Realisasi SP2D (Rp)</th>
                  <th className="p-1.5 border-r border-gray-300 text-right">Sisa Anggaran (Rp)</th>
                  <th className="p-1.5 text-center w-14">% Serap</th>
                </tr>
              </thead>
              <tbody>
                {reportData.categories.map((c, idx) => (
                  <tr key={idx} className="border-b border-gray-200">
                    <td className="p-1.5 border-r border-gray-300 font-mono font-bold text-gray-700">{c.code}</td>
                    <td className="p-1.5 border-r border-gray-300 font-semibold text-gray-900">{c.name}</td>
                    <td className="p-1.5 border-r border-gray-300 text-center font-bold text-gray-600">
                      {c.percentageStandard}%
                    </td>
                    <td className="p-1.5 border-r border-gray-300 text-right font-mono">{formatRupiah(c.allocated)}</td>
                    <td className="p-1.5 border-r border-gray-300 text-right font-mono font-bold text-emerald-700">
                      {formatRupiah(c.realized)}
                    </td>
                    <td className="p-1.5 border-r border-gray-300 text-right font-mono text-gray-600">
                      {formatRupiah(c.remaining)}
                    </td>
                    <td className="p-1.5 text-center font-bold text-gray-900">{c.rate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Regional Table */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase text-gray-800 mb-1.5 flex items-center gap-1.5">
              <span>🗺️</span> II. Realisasi Penyerapan Anggaran per Satker Regional
            </h4>
            <table className="w-full text-left border-collapse border border-gray-300 text-[11px]">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="p-1.5 border-r border-gray-300 w-8 text-center">No</th>
                  <th className="p-1.5 border-r border-gray-300">Wilayah Satker / Regional</th>
                  <th className="p-1.5 border-r border-gray-300">Nomor DPA MBG</th>
                  <th className="p-1.5 border-r border-gray-300 text-right">Plafon DPA (Rp)</th>
                  <th className="p-1.5 border-r border-gray-300 text-right">Realisasi (Rp)</th>
                  <th className="p-1.5 text-center">Status Serapan</th>
                </tr>
              </thead>
              <tbody>
                {reportData.regionalBreakdown.map((r, idx) => (
                  <tr key={idx} className="border-b border-gray-200">
                    <td className="p-1.5 border-r border-gray-300 text-center font-bold">{idx + 1}</td>
                    <td className="p-1.5 border-r border-gray-300 font-semibold">{r.region}</td>
                    <td className="p-1.5 border-r border-gray-300 font-mono text-gray-600">{r.dpaCode}</td>
                    <td className="p-1.5 border-r border-gray-300 text-right font-mono">{formatRupiah(r.ceiling)}</td>
                    <td className="p-1.5 border-r border-gray-300 text-right font-mono font-bold text-emerald-700">
                      {formatRupiah(r.realized)} ({r.rate}%)
                    </td>
                    <td className="p-1.5 text-center font-bold text-gray-800">{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-300 text-center text-xs">
            <div>
              <p className="text-gray-500 mb-12">Pejabat Pembuat Komitmen (PPK):</p>
              <p className="font-bold text-gray-900 underline">Drs. Heru Prasetyo, M.M</p>
              <p className="text-[10px] text-gray-500">NIP. 19750819 199903 1 003</p>
            </div>
            <div>
              <p className="text-gray-500 mb-12">Bendahara Pengeluaran MBG:</p>
              <p className="font-bold text-gray-900 underline">Ratna Dewi Astuti, S.E., Ak</p>
              <p className="text-[10px] text-gray-500">NIP. 19820415 200604 2 008</p>
            </div>
            <div>
              <p className="text-gray-500 mb-12">Kuasa Pengguna Anggaran (KPA):</p>
              <p className="font-bold text-gray-900 underline">Dr. Ir. Suryadi Pratama, M.Sc</p>
              <p className="text-[10px] text-gray-500">NIP. 19681128 199403 1 002</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
