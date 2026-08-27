"use client";
import React, { useRef, useState } from "react";

export type ReportType = "LRA" | "LO" | "NERACA" | "LAK" | "UNIT_COST" | "PAJAK";

interface OfficialFinancialReportPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialReportType?: ReportType;
  periodLabel: string;
  selectedEntity: string;
}

export const OfficialFinancialReportPrintModal: React.FC<OfficialFinancialReportPrintModalProps> = ({
  isOpen,
  onClose,
  initialReportType = "LRA",
  periodLabel,
  selectedEntity,
}) => {
  const [activeReport, setActiveReport] = useState<ReportType>(initialReportType);
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const getReportTitle = () => {
    switch (activeReport) {
      case "LRA":
        return "LAPORAN REALISASI ANGGARAN (LRA) PROGRAM MBG";
      case "LO":
        return "LAPORAN OPERASIONAL & KINERJA PENDAPATAN-BEBAN (LO)";
      case "NERACA":
        return "NERACA / LAPORAN POSISI KEUANGAN ENTITAS MBG";
      case "LAK":
        return "LAPORAN ARUS KAS (LAK) - METODE LANGSUNG";
      case "UNIT_COST":
        return "LAPORAN ANALISIS BIAYA POKOK PRODUKSI (HPP) PER PORSI";
      case "PAJAK":
        return "LAPORAN REKAPITULASI PEMOTONGAN & SETORAN PAJAK NEGARA";
      default:
        return "LAPORAN KEUANGAN RESMI MBG";
    }
  };

  const docNumber = `LK-BGN/MBG/${activeReport}/${new Date().getFullYear()}/08/${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-gray-200 overflow-hidden my-8 print:border-none print:shadow-none print:m-0 print:w-full print:max-w-none animate-in fade-in zoom-in-95 duration-200 text-gray-900">
        {/* Modal Action Bar (Hidden in Print) */}
        <div className="p-4 bg-gray-900 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white">
              Preview Dokumen Resmi BGN
            </span>
            <div className="flex gap-1 bg-gray-800 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveReport("LRA")}
                className={`px-2.5 py-1 text-xs rounded font-medium transition ${activeReport === "LRA" ? "bg-emerald-600 text-white font-bold" : "text-gray-300 hover:text-white"}`}
              >
                LRA
              </button>
              <button
                type="button"
                onClick={() => setActiveReport("LO")}
                className={`px-2.5 py-1 text-xs rounded font-medium transition ${activeReport === "LO" ? "bg-emerald-600 text-white font-bold" : "text-gray-300 hover:text-white"}`}
              >
                LO (Laba Rugi)
              </button>
              <button
                type="button"
                onClick={() => setActiveReport("NERACA")}
                className={`px-2.5 py-1 text-xs rounded font-medium transition ${activeReport === "NERACA" ? "bg-emerald-600 text-white font-bold" : "text-gray-300 hover:text-white"}`}
              >
                Neraca
              </button>
              <button
                type="button"
                onClick={() => setActiveReport("LAK")}
                className={`px-2.5 py-1 text-xs rounded font-medium transition ${activeReport === "LAK" ? "bg-emerald-600 text-white font-bold" : "text-gray-300 hover:text-white"}`}
              >
                Arus Kas
              </button>
              <button
                type="button"
                onClick={() => setActiveReport("PAJAK")}
                className={`px-2.5 py-1 text-xs rounded font-medium transition ${activeReport === "PAJAK" ? "bg-emerald-600 text-white font-bold" : "text-gray-300 hover:text-white"}`}
              >
                Pajak
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow flex items-center gap-1.5 transition-colors"
            >
              <span>🖨️</span>
              <span>Cetak / Cetak PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div ref={printRef} className="p-8 md:p-12 space-y-6 bg-white text-gray-900 font-sans text-xs">
          {/* Official BGN Kop Surat Header */}
          <div className="border-b-2 border-gray-900 pb-4 text-center relative">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="w-16 h-16 rounded-full bg-emerald-800 text-white font-black text-2xl flex items-center justify-center border-2 border-amber-500 shadow-md">
                MBG
              </div>
              <div className="text-center">
                <h1 className="text-base md:text-lg font-black tracking-wider uppercase text-gray-900">
                  BADAN GIZI NASIONAL REPUBLIK INDONESIA
                </h1>
                <h2 className="text-xs md:text-sm font-extrabold uppercase text-emerald-800">
                  SATUAN KERJA PENGELOLA PROGRAM MAKAN BERGIZI GRATIS (MBG)
                </h2>
                <p className="text-[10px] text-gray-600 mt-0.5">
                  Gedung Djuanda I Lt. 4, Jl. Wahidin Raya No. 1 / Medan Merdeka Barat No. 12, DKI Jakarta 10110
                </p>
                <p className="text-[10px] text-gray-500 font-mono">
                  Sistem Akuntansi Pemerintah Terintegrasi MBG-ERP • Berdasarkan Standar Akuntansi Pemerintahan (SAP)
                </p>
              </div>
            </div>
          </div>

          {/* Document Title & Meta */}
          <div className="text-center space-y-1">
            <h3 className="text-sm font-bold uppercase underline tracking-wide text-gray-900">
              {getReportTitle()}
            </h3>
            <p className="text-[11px] font-mono text-gray-600">
              Nomor Registrasi Laporan: <span className="font-bold text-gray-900">{docNumber}</span>
            </p>
          </div>

          {/* Report Information Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200 text-[11px]">
            <div>
              <table className="w-full text-left">
                <tbody>
                  <tr>
                    <td className="py-1 text-gray-500 font-semibold w-36">Entitas Pelaporan</td>
                    <td className="py-1 font-bold text-gray-900">: {selectedEntity}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-gray-500 font-semibold">Periode Laporan</td>
                    <td className="py-1 font-bold text-gray-900">: {periodLabel}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-gray-500 font-semibold">Mata Uang & Standar</td>
                    <td className="py-1 font-bold text-emerald-800">: Rupiah (IDR) / SAP Akrual</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <table className="w-full text-left">
                <tbody>
                  <tr>
                    <td className="py-1 text-gray-500 font-semibold w-40">Status Rekonsiliasi</td>
                    <td className="py-1 font-mono font-bold text-emerald-700">: 100% RECONCILED (SP2D ↔ Bank)</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-gray-500 font-semibold">Tingkat Serapan Anggaran</td>
                    <td className="py-1 font-mono font-bold text-gray-900">: 62.45% (Optimal On-Track)</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-gray-500 font-semibold">Kepatuhan Pajak NTPN</td>
                    <td className="py-1 font-mono font-bold text-blue-700">: 100% Valid Terverifikasi DJP</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Dynamic Content Based on Report Type */}
          {activeReport === "LRA" && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-gray-900">
                I. Ringkasan Realisasi Anggaran Pendapatan & Belanja MBG
              </h4>
              <table className="w-full text-xs text-left border-collapse border border-gray-300">
                <thead className="bg-gray-100 text-gray-800 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2">Kode Akun</th>
                    <th className="border border-gray-300 px-3 py-2">Uraian Akun Belanja BGN</th>
                    <th className="border border-gray-300 px-3 py-2 text-right">Plafon DPA (Rp)</th>
                    <th className="border border-gray-300 px-3 py-2 text-right">Realisasi SP2D (Rp)</th>
                    <th className="border border-gray-300 px-3 py-2 text-right">Sisa Pagu (Rp)</th>
                    <th className="border border-gray-300 px-3 py-2 text-center">% Serap</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 font-mono text-[11px]">
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 text-gray-600">5.1.01.01</td>
                    <td className="border border-gray-300 px-3 py-2 font-sans font-semibold">
                      Belanja Bahan Baku Pangan (Beras, Daging, Sayur, Susu - 75%)
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right">63.375.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-emerald-700 font-bold">39.870.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">23.505.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-center font-bold">62.9%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 text-gray-600">5.1.01.02</td>
                    <td className="border border-gray-300 px-3 py-2 font-sans font-semibold">
                      Belanja Operasional Dapur & Tenaga Kerja Brigade (15%)
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right">12.675.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-emerald-700 font-bold">7.840.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">4.835.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-center font-bold">61.8%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 text-gray-600">5.1.01.03</td>
                    <td className="border border-gray-300 px-3 py-2 font-sans font-semibold">
                      Belanja Distribusi & Logistik Armada Berpendingin (8%)
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right">6.760.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-emerald-700 font-bold">4.120.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">2.640.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-center font-bold">60.9%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 text-gray-600">5.1.01.04</td>
                    <td className="border border-gray-300 px-3 py-2 font-sans font-semibold">
                      Belanja Pengendalian Mutu, Lab & Sertifikasi ISO (2%)
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right">1.690.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-emerald-700 font-bold">930.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">760.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-center font-bold">55.0%</td>
                  </tr>
                  <tr className="bg-gray-100 font-extrabold text-gray-900 text-xs">
                    <td colSpan={2} className="border border-gray-300 px-3 py-2 text-right uppercase font-sans">
                      JUMLAH TOTAL BELANJA MBG
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right">84.500.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-emerald-800 text-sm">
                      52.760.000.000
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right">31.740.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-emerald-700">62.45%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeReport === "LO" && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-gray-900">
                I. Laporan Operasional (LO) - Pendapatan & Beban Operasional
              </h4>
              <table className="w-full text-xs text-left border-collapse border border-gray-300">
                <thead className="bg-gray-100 text-gray-800 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2">Uraian Akun Operasional</th>
                    <th className="border border-gray-300 px-3 py-2 text-right">Tahun Berjalan 2026 (Rp)</th>
                    <th className="border border-gray-300 px-3 py-2 text-right">Tahun Lalu 2025 (Rp)</th>
                    <th className="border border-gray-300 px-3 py-2 text-center">Kenaikan (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 font-mono text-[11px]">
                  <tr className="bg-gray-50 font-bold text-gray-900 font-sans">
                    <td colSpan={4} className="border border-gray-300 px-3 py-1.5">PENDAPATAN TRANSFER OPERASIONAL</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 pl-6 font-sans">Pendapatan Transfer DIPA APBN MBG</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-emerald-700">55.000.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">40.000.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-emerald-600">+37.5%</td>
                  </tr>
                  <tr className="bg-gray-50 font-bold text-gray-900 font-sans">
                    <td colSpan={4} className="border border-gray-300 px-3 py-1.5">BEBAN OPERASIONAL PROGRAM</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 pl-6 font-sans">Beban Bahan Baku Pangan (Food Cost)</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">39.870.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">28.900.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">+38.0%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 pl-6 font-sans">Beban Pegawai & Brigade Dapur</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">7.840.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">5.600.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">+40.0%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 pl-6 font-sans">Beban Logistik, Pengantaran & BBM</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">4.120.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">3.100.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">+32.9%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 pl-6 font-sans">Beban Penyusutan & Amortisasi Aset</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">930.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">720.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">+29.2%</td>
                  </tr>
                  <tr className="bg-gray-100 font-extrabold text-gray-900 text-xs font-sans">
                    <td className="border border-gray-300 px-3 py-2 uppercase">SURPLUS / (DEFISIT) DARI OPERASI</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-mono text-emerald-800 text-sm">
                      +2.240.000.000
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-mono">+1.680.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-center font-mono text-emerald-700">+33.3%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeReport === "NERACA" && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-gray-900">
                I. Neraca Keuangan - Posisi Aset, Kewajiban & Ekuitas MBG
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {/* Sisi Kiri: ASET */}
                <table className="w-full text-xs text-left border-collapse border border-gray-300">
                  <thead className="bg-gray-100 text-gray-800 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2">Aset (Aktiva)</th>
                      <th className="border border-gray-300 px-3 py-2 text-right">Nominal (Rp)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 font-mono text-[11px]">
                    <tr className="bg-gray-50 font-bold font-sans">
                      <td colSpan={2} className="border border-gray-300 px-3 py-1">ASET LANCAR</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-1.5 pl-4 font-sans">Kas di Bank Giro SP2D</td>
                      <td className="border border-gray-300 px-3 py-1.5 text-right">18.450.000.000</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-1.5 pl-4 font-sans">Kas Kecil Bendahara SPPG</td>
                      <td className="border border-gray-300 px-3 py-1.5 text-right">42.550.000</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-1.5 pl-4 font-sans">Persediaan Bahan Baku Gudang</td>
                      <td className="border border-gray-300 px-3 py-1.5 text-right">4.820.000.000</td>
                    </tr>
                    <tr className="bg-gray-50 font-bold font-sans">
                      <td colSpan={2} className="border border-gray-300 px-3 py-1">ASET TETAP (NETTO)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-1.5 pl-4 font-sans">Mesin Masak & Steamer SPPG</td>
                      <td className="border border-gray-300 px-3 py-1.5 text-right">8.750.000.000</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-1.5 pl-4 font-sans">Armada Truk Berpendingin</td>
                      <td className="border border-gray-300 px-3 py-1.5 text-right">6.200.000.000</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-1.5 pl-4 font-sans text-red-600">Akumulasi Penyusutan</td>
                      <td className="border border-gray-300 px-3 py-1.5 text-right text-red-600">(1.450.000.000)</td>
                    </tr>
                    <tr className="bg-gray-100 font-bold font-sans text-gray-900">
                      <td className="border border-gray-300 px-3 py-2">TOTAL ASET</td>
                      <td className="border border-gray-300 px-3 py-2 text-right font-mono text-emerald-800">
                        36.812.550.000
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Sisi Kanan: KEWAJIBAN & EKUITAS */}
                <table className="w-full text-xs text-left border-collapse border border-gray-300">
                  <thead className="bg-gray-100 text-gray-800 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2">Kewajiban & Ekuitas</th>
                      <th className="border border-gray-300 px-3 py-2 text-right">Nominal (Rp)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 font-mono text-[11px]">
                    <tr className="bg-gray-50 font-bold font-sans">
                      <td colSpan={2} className="border border-gray-300 px-3 py-1">KEWAJIBAN JANGKA PENDEK</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-1.5 pl-4 font-sans">Utang Belanja Vendor (PO Matching)</td>
                      <td className="border border-gray-300 px-3 py-1.5 text-right">3.450.000.000</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-1.5 pl-4 font-sans">Utang Pajak PPh/PPN Terutang</td>
                      <td className="border border-gray-300 px-3 py-1.5 text-right">485.000.000</td>
                    </tr>
                    <tr className="bg-gray-50 font-bold font-sans">
                      <td colSpan={2} className="border border-gray-300 px-3 py-1">EKUITAS DANA</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-1.5 pl-4 font-sans">Ekuitas Awal DIPA APBN</td>
                      <td className="border border-gray-300 px-3 py-1.5 text-right">30.637.550.000</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-1.5 pl-4 font-sans">Surplus Operasional Berjalan</td>
                      <td className="border border-gray-300 px-3 py-1.5 text-right font-bold text-emerald-700">2.240.000.000</td>
                    </tr>
                    <tr className="bg-gray-100 font-bold font-sans text-gray-900">
                      <td className="border border-gray-300 px-3 py-2">TOTAL KEWAJIBAN & EKUITAS</td>
                      <td className="border border-gray-300 px-3 py-2 text-right font-mono text-emerald-800">
                        36.812.550.000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeReport === "PAJAK" && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-gray-900">
                I. Rekapitulasi Pemotongan & Penyetoran Pajak ke Kas Negara
              </h4>
              <table className="w-full text-xs text-left border-collapse border border-gray-300">
                <thead className="bg-gray-100 text-gray-800 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2">Jenis Pajak</th>
                    <th className="border border-gray-300 px-3 py-2">Objek Pajak Belanja</th>
                    <th className="border border-gray-300 px-3 py-2 text-center">Tarif</th>
                    <th className="border border-gray-300 px-3 py-2 text-right">DPP (Rp)</th>
                    <th className="border border-gray-300 px-3 py-2 text-right">Pajak Disetor (Rp)</th>
                    <th className="border border-gray-300 px-3 py-2 text-center">Status NTPN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 font-mono text-[11px]">
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-bold font-sans">PPh Pasal 22</td>
                    <td className="border border-gray-300 px-3 py-2 font-sans">Pengadaan Bahan Pokok Pangan Supplier</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">1.5%</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">39.870.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-emerald-700 font-bold">598.050.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-center font-sans font-bold text-emerald-700">SETOR (NTPN ✓)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-bold font-sans">PPh Pasal 23</td>
                    <td className="border border-gray-300 px-3 py-2 font-sans">Jasa Ekspedisi Armada & Servis Mesin</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">2.0%</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">4.120.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-emerald-700 font-bold">82.400.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-center font-sans font-bold text-emerald-700">SETOR (NTPN ✓)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-bold font-sans">PPN Dalam Negeri</td>
                    <td className="border border-gray-300 px-3 py-2 font-sans">Barang Kena Pajak Kemasan & Mesin</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">11.0%</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">10.450.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-emerald-700 font-bold">1.149.500.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-center font-sans font-bold text-emerald-700">SETOR (NTPN ✓)</td>
                  </tr>
                  <tr className="bg-gray-100 font-extrabold text-gray-900 text-xs font-sans">
                    <td colSpan={4} className="border border-gray-300 px-3 py-2 text-right uppercase">
                      TOTAL SETORAN PAJAK KAS NEGARA
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-mono text-emerald-800 text-sm">
                      1.829.950.000
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center font-bold text-emerald-700">100% LUNAS</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeReport === "LAK" && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-gray-900">
                I. Laporan Arus Kas (LAK) - Aktivitas Operasi, Investasi & Pendanaan
              </h4>
              <table className="w-full text-xs text-left border-collapse border border-gray-300">
                <thead className="bg-gray-100 text-gray-800 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2">Aktivitas Arus Kas</th>
                    <th className="border border-gray-300 px-3 py-2 text-right">Penerimaan (Rp)</th>
                    <th className="border border-gray-300 px-3 py-2 text-right">Pengeluaran (Rp)</th>
                    <th className="border border-gray-300 px-3 py-2 text-right">Arus Kas Bersih (Rp)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 font-mono text-[11px]">
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-bold font-sans">1. Arus Kas Operasi</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">55.000.000.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-red-600">(51.830.000.000)</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-emerald-700 font-bold">+3.170.000.000</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-bold font-sans">2. Arus Kas Investasi (Mesin/Truk)</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">-</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-red-600">(2.450.000.000)</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-red-600 font-bold">(2.450.000.000)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-bold font-sans">3. Arus Kas Pendanaan APBN</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">17.772.550.000</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">-</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-emerald-700 font-bold">+17.772.550.000</td>
                  </tr>
                  <tr className="bg-gray-100 font-extrabold text-gray-900 text-xs font-sans">
                    <td colSpan={3} className="border border-gray-300 px-3 py-2 uppercase">
                      SALDO AKHIR KAS (BANK + BENDAHARA)
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-mono text-emerald-800 text-sm">
                      18.492.550.000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Catatan Atas Laporan Keuangan (CaLK) Brief */}
          <div className="p-4 rounded-xl border border-gray-300 bg-gray-50 space-y-1.5 text-[10px] text-gray-700">
            <h5 className="font-bold text-gray-900 uppercase">
              Catatan Atas Laporan Keuangan (CaLK) - Kebijakan Akuntansi:
            </h5>
            <p>
              1. Laporan disusun menggunakan basis akrual sesuai Peraturan Pemerintah Standar Akuntansi Pemerintahan (SAP).
            </p>
            <p>
              2. Seluruh transaksi pembayaran supplier bahan pangan telah melalui validasi 3-Way Matching (PO ↔ BAST QC ↔ Faktur Pajak).
            </p>
            <p>
              3. Saldo kas telah direkonsiliasi 100% terhadap rekening koran Bank Penampung BUMN (BRI/BNI/Mandiri).
            </p>
          </div>

          {/* Tanda Tangan Resmi 3 Pejabat KPA, PPK & Bendahara */}
          <div className="pt-4 space-y-4">
            <div className="grid grid-cols-3 gap-6 pt-4 text-center text-xs">
              {/* Pejabat 1: Bendahara Pengeluaran */}
              <div className="space-y-12">
                <div>
                  <p className="text-gray-500 text-[10px]">Menyiapkan & Membukukan,</p>
                  <p className="font-bold text-gray-900">Bendahara Pengeluaran MBG</p>
                </div>
                <div>
                  <p className="font-bold underline text-gray-900">Ratna Dewi, S.E., Ak., CA</p>
                  <p className="text-[10px] text-gray-500">NIP. 19850720 200812 2 001</p>
                </div>
              </div>

              {/* Pejabat 2: PPK */}
              <div className="space-y-12">
                <div>
                  <p className="text-gray-500 text-[10px]">Memverifikasi SPJ Belanja,</p>
                  <p className="font-bold text-gray-900">Pejabat Pembuat Komitmen (PPK)</p>
                </div>
                <div>
                  <p className="font-bold underline text-gray-900">Ahmad Fauzi, S.E., M.Si</p>
                  <p className="text-[10px] text-gray-500">NIP. 19790315 200312 1 003</p>
                </div>
              </div>

              {/* Pejabat 3: KPA / Kepala Satker */}
              <div className="space-y-12">
                <div>
                  <p className="text-gray-500 text-[10px]">Menyetujui & Mengesahkan,</p>
                  <p className="font-bold text-gray-900">Kuasa Pengguna Anggaran (KPA)</p>
                </div>
                <div>
                  <div className="inline-block border border-emerald-500 px-2 py-0.5 rounded text-[9px] font-bold text-emerald-800 bg-emerald-50 mb-1">
                    DIGITALLY SIGNED & VERIFIED
                  </div>
                  <p className="font-bold underline text-gray-900">Dr. Ir. Hendra Wijaya, M.Sc.</p>
                  <p className="text-[10px] text-gray-500">NIP. 19780516 200502 1 002</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Security Watermark */}
          <div className="border-t border-gray-300 pt-3 flex items-center justify-between text-[9px] text-gray-400 font-mono">
            <span>ERP-MBG-FIN-SEC-SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
            <span>Dicetak Otomatis pada {new Date().toLocaleString("id-ID")} WIB</span>
          </div>
        </div>
      </div>
    </div>
  );
};
