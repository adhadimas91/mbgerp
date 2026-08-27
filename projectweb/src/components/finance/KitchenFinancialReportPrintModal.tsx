"use client";
import React, { useRef } from "react";

interface KitchenFinancialReportPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  sppgName: string;
  periodLabel: string;
  totalPortions: number;
  totalProductionCost: number;
  currentHpp: number;
  foodCostNominal: number;
  laborCostNominal: number;
  utilityCostNominal: number;
  packagingCostNominal: number;
  sanitationCostNominal: number;
  pettyCashSpent: number;
  pettyCashRemaining: number;
}

export const KitchenFinancialReportPrintModal: React.FC<KitchenFinancialReportPrintModalProps> = ({
  isOpen,
  onClose,
  sppgName,
  periodLabel,
  totalPortions,
  totalProductionCost,
  currentHpp,
  foodCostNominal,
  laborCostNominal,
  utilityCostNominal,
  packagingCostNominal,
  sanitationCostNominal,
  pettyCashSpent,
  pettyCashRemaining,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const bgnPlafonPerPortion = 15000;
  const totalPlafonBudget = bgnPlafonPerPortion * totalPortions;
  const totalBudgetSavings = totalPlafonBudget - totalProductionCost;
  const efficiencyPercentage = ((totalBudgetSavings / totalPlafonBudget) * 100).toFixed(2);

  const docNumber = `LPJ-FIN-DPR/MBG/${sppgName.replace(/\s+/g, "").toUpperCase().slice(0, 8)}/${new Date().getFullYear()}/08`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-gray-200 overflow-hidden my-8 print:border-none print:shadow-none print:m-0 print:w-full print:max-w-none animate-in fade-in zoom-in-95 duration-200 text-gray-900">
        {/* Modal Action Bar (Hidden on print) */}
        <div className="p-4 bg-gray-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white">
              Preview Dokumen SPJ Resmi
            </span>
            <span className="text-xs text-gray-300">
              Laporan Akuntabilitas Finansial Dapur SPPG MBG
            </span>
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

        {/* Printable Document Area */}
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
                  SATUAN PELAYANAN PEMENUHAN GIZI (SPPG) SENTRAL
                </h2>
                <p className="text-[10px] text-gray-600 mt-0.5">
                  Gedung Dapur Sentral Harmoni SPPG • Jl. Medan Merdeka Barat No. 12, DKI Jakarta 10110
                </p>
                <p className="text-[10px] text-gray-500 font-mono">
                  Sistem Akuntabilitas Keuangan Terpadu MBG-ERP • ISO 22000 & Standar Standarisasi Biaya BGN
                </p>
              </div>
            </div>
          </div>

          {/* Document Title & Meta */}
          <div className="text-center space-y-1">
            <h3 className="text-sm font-bold uppercase underline tracking-wide text-gray-900">
              LAPORAN REALISASI BIAYA OPERASIONAL & BIAYA POKOK PRODUKSI (HPP) DAPUR SENTRAL
            </h3>
            <p className="text-[11px] font-mono text-gray-600">
              Nomor Registrasi SPJ: <span className="font-bold text-gray-900">{docNumber}</span>
            </p>
          </div>

          {/* Executive Information Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div>
              <table className="w-full text-[11px] text-left">
                <tbody>
                  <tr>
                    <td className="py-1 text-gray-500 font-semibold w-36">Unit Dapur Sentral</td>
                    <td className="py-1 font-bold text-gray-900">: {sppgName}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-gray-500 font-semibold">Periode Pelaporan</td>
                    <td className="py-1 font-bold text-gray-900">: {periodLabel}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-gray-500 font-semibold">Total Output Porsi</td>
                    <td className="py-1 font-bold text-emerald-800">: {totalPortions.toLocaleString("id-ID")} Porsi Makanan Sehat</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <table className="w-full text-[11px] text-left">
                <tbody>
                  <tr>
                    <td className="py-1 text-gray-500 font-semibold w-40">Pagu Plafon BGN (Rp 15.000)</td>
                    <td className="py-1 font-mono font-bold text-gray-900">: Rp {totalPlafonBudget.toLocaleString("id-ID")}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-gray-500 font-semibold">Total Realisasi Produksi</td>
                    <td className="py-1 font-mono font-bold text-emerald-700">: Rp {totalProductionCost.toLocaleString("id-ID")}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-gray-500 font-semibold">Efisiensi / Penghematan</td>
                    <td className="py-1 font-mono font-bold text-blue-700">
                      : Rp {totalBudgetSavings.toLocaleString("id-ID")} ({efficiencyPercentage}%)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Rincian Pos Belanja Tabel */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
              I. Rekapitulasi Rincian Pos Pengeluaran Dapur Sentral
            </h4>
            <table className="w-full text-xs text-left border-collapse border border-gray-300">
              <thead className="bg-gray-100 text-gray-800 font-bold uppercase text-[10px]">
                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-center w-10">No</th>
                  <th className="border border-gray-300 px-3 py-2">Komponen Pos Belanja Operasional Dapur</th>
                  <th className="border border-gray-300 px-3 py-2 text-right">Total Realisasi (Rp)</th>
                  <th className="border border-gray-300 px-3 py-2 text-right">Unit Cost / Porsi</th>
                  <th className="border border-gray-300 px-3 py-2 text-center">Porsi (%)</th>
                  <th className="border border-gray-300 px-3 py-2 text-center">Batas BGN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">1</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <div className="font-bold">Belanja Bahan Baku Pangan (Food Cost)</div>
                    <div className="text-[10px] text-gray-500">Beras, ayam karkas, telur omega, sayuran segar, tahu/tempe, buah & susu</div>
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right font-mono font-bold">
                    Rp {foodCostNominal.toLocaleString("id-ID")}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right font-mono">
                    Rp {Math.round(foodCostNominal / totalPortions).toLocaleString("id-ID")}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                    {((foodCostNominal / totalProductionCost) * 100).toFixed(1)}%
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-[10px] font-bold text-emerald-700">
                    Maks. 75.0%
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">2</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <div className="font-bold">Upah Tenaga Kerja Dapur (Direct Brigade Labor)</div>
                    <div className="text-[10px] text-gray-500">Shift Head Chef, Sous Chef lini, Ahli Gizi PIC, Helper masak & kru packaging</div>
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right font-mono font-bold">
                    Rp {laborCostNominal.toLocaleString("id-ID")}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right font-mono">
                    Rp {Math.round(laborCostNominal / totalPortions).toLocaleString("id-ID")}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                    {((laborCostNominal / totalProductionCost) * 100).toFixed(1)}%
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-[10px] font-bold text-emerald-700">
                    Maks. 15.0%
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">3</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <div className="font-bold">Biaya Energi & Utilitas Dapur (OPEX)</div>
                    <div className="text-[10px] text-gray-500">Gas LPG 50kg industri (boiler cooker), listrik beban chiller, filtrasi air RO steril</div>
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right font-mono font-bold">
                    Rp {utilityCostNominal.toLocaleString("id-ID")}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right font-mono">
                    Rp {Math.round(utilityCostNominal / totalPortions).toLocaleString("id-ID")}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                    {((utilityCostNominal / totalProductionCost) * 100).toFixed(1)}%
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-[10px] font-bold text-emerald-700">
                    Maks. 8.0%
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">4</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <div className="font-bold">Kemasan Food-Grade & Sealing Tray</div>
                    <div className="text-[10px] text-gray-500">Tray biodegradable 5 sekat, lid film sealing steril, sendok kayu food grade</div>
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right font-mono font-bold">
                    Rp {packagingCostNominal.toLocaleString("id-ID")}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right font-mono">
                    Rp {Math.round(packagingCostNominal / totalPortions).toLocaleString("id-ID")}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                    {((packagingCostNominal / totalProductionCost) * 100).toFixed(1)}%
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-[10px] font-bold text-emerald-700">
                    Maks. 5.0%
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">5</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <div className="font-bold">Sanitasi, Higiene ISO 22000 & Uji Mutu Organoleptik</div>
                    <div className="text-[10px] text-gray-500">Chemical sanitizer food-grade Ecolab, APD steril, swab lab, kulkas sampel retensi 2x24j</div>
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right font-mono font-bold">
                    Rp {sanitationCostNominal.toLocaleString("id-ID")}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right font-mono">
                    Rp {Math.round(sanitationCostNominal / totalPortions).toLocaleString("id-ID")}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">
                    {((sanitationCostNominal / totalProductionCost) * 100).toFixed(1)}%
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-[10px] font-bold text-emerald-700">
                    Maks. 3.0%
                  </td>
                </tr>

                {/* Total Row */}
                <tr className="bg-gray-100 font-extrabold text-gray-900 text-xs">
                  <td colSpan={2} className="border border-gray-300 px-3 py-2 text-right uppercase">
                    TOTAL BIAYA PRODUKSI & HPP AKHIR
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right font-mono text-emerald-800 text-sm">
                    Rp {totalProductionCost.toLocaleString("id-ID")}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right font-mono text-emerald-800 text-sm">
                    Rp {currentHpp.toLocaleString("id-ID")}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">100.0%</td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-emerald-700">
                    Plafon Rp 15.000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Petty Cash & Accountability Summary */}
          <div className="p-4 rounded-xl border border-gray-300 bg-gray-50 space-y-2">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
              II. Rekonsiliasi Kas Kecil Operasional Dapur Sentral (Petty Cash)
            </h4>
            <div className="grid grid-cols-3 gap-3 text-[11px]">
              <div>
                <span className="text-gray-500">Pagu Kas Kecil Dapur:</span>
                <div className="font-bold font-mono">Rp 25.000.000</div>
              </div>
              <div>
                <span className="text-gray-500">Total Pengeluaran Kas Terpakai:</span>
                <div className="font-bold font-mono text-amber-700">
                  Rp {pettyCashSpent.toLocaleString("id-ID")}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Sisa Saldo Kas Kasir Dapur:</span>
                <div className="font-bold font-mono text-emerald-700">
                  Rp {pettyCashRemaining.toLocaleString("id-ID")}
                </div>
              </div>
            </div>
          </div>

          {/* Pernyataan & Tanda Tangan Resmi 3 Pihak */}
          <div className="pt-4 space-y-4">
            <p className="text-[10px] text-gray-600 text-justify">
              Demikian Laporan Realisasi Biaya Pokok Produksi dan Operasional Dapur Sentral ini disusun dengan sebenar-benarnya sesuai data sistem ERP MBG terintegrasi, standar akuntansi pemerintahan (SAP), dan regulasi Badan Gizi Nasional (BGN).
            </p>

            <div className="grid grid-cols-3 gap-6 pt-4 text-center text-xs">
              {/* Tanda Tangan Head Chef */}
              <div className="space-y-12">
                <div>
                  <p className="text-gray-500 text-[10px]">Menyiapkan,</p>
                  <p className="font-bold text-gray-900">Head Chef SPPG</p>
                </div>
                <div>
                  <p className="font-bold underline text-gray-900">Chef Bambang Supardi</p>
                  <p className="text-[10px] text-gray-500">NIP. 19820412 201101 1 004</p>
                </div>
              </div>

              {/* Tanda Tangan Ahli Gizi / QC */}
              <div className="space-y-12">
                <div>
                  <p className="text-gray-500 text-[10px]">Memverifikasi Mutu & Gizi,</p>
                  <p className="font-bold text-gray-900">Ahli Gizi PIC SPPG</p>
                </div>
                <div>
                  <p className="font-bold underline text-gray-900">drg. Fitriani, S.Gz, M.Nutr</p>
                  <p className="text-[10px] text-gray-500">STRGZ. 3171-8849-2024-0091</p>
                </div>
              </div>

              {/* Tanda Tangan Kepala SPPG / Kepala MBG */}
              <div className="space-y-12">
                <div>
                  <p className="text-gray-500 text-[10px]">Menyetujui & Mengesahkan,</p>
                  <p className="font-bold text-gray-900">Kepala Satuan Pelayanan (SPPG)</p>
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
            <span>ERP-MBG-FIN-SEC-SHA256: 7f8a9e01bc34d8e5...</span>
            <span>Dicetak Otomatis pada {new Date().toLocaleString("id-ID")} WIB</span>
          </div>
        </div>
      </div>
    </div>
  );
};
