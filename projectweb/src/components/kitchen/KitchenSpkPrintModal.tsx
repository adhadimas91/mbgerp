"use client";
import React, { useRef } from "react";
import { BrandLogo } from "@/components/common/BrandLogo";

interface KitchenSpkPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  spkData: {
    spkNumber: string;
    spkDate: string;
    sppgName: string;
    targetBatch: string;
    targetPortions: number;
    headChef: string;
    nutritionist: string;
    menuPackageName: string;
    items: {
      category: string;
      name: string;
      rawRequirement: string;
      standardTemp: string;
      line: string;
    }[];
    timeTable: {
      step: string;
      time: string;
      pic: string;
      status: string;
    }[];
  };
}

export const KitchenSpkPrintModal: React.FC<KitchenSpkPrintModalProps> = ({
  isOpen,
  onClose,
  spkData,
}) => {
  const printAreaRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
        {/* Header - Not printed */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 print:hidden">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Cetak Surat Perintah Masak (SPM) Dapur MBG
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Dokumen resmi operasional produksi Satuan Pelayanan Pemenuhan Gizi (SPPG)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition shadow-sm"
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

        {/* Printable Document Area */}
        <div ref={printAreaRef} className="flex-1 p-8 overflow-y-auto bg-white text-gray-900">
          {/* Official Letterhead */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-gray-900">
            <div className="flex items-center gap-3">
              <BrandLogo className="h-12 w-auto" />
              <div>
                <h1 className="text-base font-extrabold tracking-tight text-gray-900 uppercase">
                  BADAN GIZI NASIONAL (BGN) REPUBLIK INDONESIA
                </h1>
                <h2 className="text-xs font-bold text-emerald-800 uppercase">
                  SATUAN PELAYANAN PEMENUHAN GIZI (SPPG) HARMONI SENTRAL 01
                </h2>
                <p className="text-[10px] text-gray-600">
                  Jl. Merdeka Gizi No. 45, Kawasan Sentral Produksi MBG Jakarta Pusat | Telp: (021) 384-9900
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-orange-100 text-orange-800 border border-orange-300 rounded">
                DOKUMEN PRODUKSI SPPG
              </span>
              <div className="text-[10px] font-mono mt-1 text-gray-600">ISO 22000:2018 HACCP CERTIFIED</div>
            </div>
          </div>

          {/* Document Title */}
          <div className="text-center my-4">
            <h2 className="text-sm font-black tracking-wide uppercase text-gray-900 underline decoration-2">
              SURAT PERINTAH MASAK (SPM) / WORK ORDER DAPUR
            </h2>
            <p className="text-xs font-mono font-bold text-gray-700 mt-0.5">NOMOR: {spkData.spkNumber}</p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 p-3 mb-4 text-xs bg-gray-50 border border-gray-200 rounded-lg">
            <div>
              <table className="w-full text-left">
                <tbody>
                  <tr>
                    <td className="py-0.5 text-gray-500 w-36">Tanggal Produksi:</td>
                    <td className="font-bold text-gray-800">{spkData.spkDate}</td>
                  </tr>
                  <tr>
                    <td className="py-0.5 text-gray-500">Unit SPPG:</td>
                    <td className="font-bold text-gray-800">{spkData.sppgName}</td>
                  </tr>
                  <tr>
                    <td className="py-0.5 text-gray-500">Shift / Batch:</td>
                    <td className="font-bold text-orange-700">{spkData.targetBatch}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <table className="w-full text-left">
                <tbody>
                  <tr>
                    <td className="py-0.5 text-gray-500 w-36">Target Porsi:</td>
                    <td className="font-extrabold text-emerald-700">{spkData.targetPortions.toLocaleString()} Porsi</td>
                  </tr>
                  <tr>
                    <td className="py-0.5 text-gray-500">Head Chef PIC:</td>
                    <td className="font-bold text-gray-800">{spkData.headChef}</td>
                  </tr>
                  <tr>
                    <td className="py-0.5 text-gray-500">Lead Ahli Gizi PIC:</td>
                    <td className="font-bold text-gray-800">{spkData.nutritionist}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Menu Name Banner */}
          <div className="p-2.5 mb-4 bg-emerald-50 border border-emerald-200 rounded text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">
              Paket Menu Standar BGN Hari Ini
            </span>
            <span className="text-xs font-black text-gray-900">{spkData.menuPackageName}</span>
          </div>

          {/* Recipe Breakdown Table */}
          <div className="mb-4">
            <h4 className="text-xs font-bold uppercase text-gray-800 mb-1.5 flex items-center gap-1.5">
              <span>🍲</span> Komposisi Takaran & Standar Kendali Kritis (CCP) Lini Masak
            </h4>
            <table className="w-full text-left border-collapse border border-gray-300 text-[11px]">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="p-1.5 border-r border-gray-300 w-8 text-center">No</th>
                  <th className="p-1.5 border-r border-gray-300">Komponen Menu</th>
                  <th className="p-1.5 border-r border-gray-300">Lini & Peralatan</th>
                  <th className="p-1.5 border-r border-gray-300">Kebutuhan Bahan Baku</th>
                  <th className="p-1.5 text-center">Batas Suhu CCP</th>
                </tr>
              </thead>
              <tbody>
                {spkData.items.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-200">
                    <td className="p-1.5 border-r border-gray-300 text-center font-bold">{idx + 1}</td>
                    <td className="p-1.5 border-r border-gray-300 font-semibold">{item.name}</td>
                    <td className="p-1.5 border-r border-gray-300 text-gray-600">{item.line}</td>
                    <td className="p-1.5 border-r border-gray-300 font-mono font-bold text-gray-800">
                      {item.rawRequirement}
                    </td>
                    <td className="p-1.5 text-center font-bold text-emerald-700">{item.standardTemp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Schedule Timeline Table */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase text-gray-800 mb-1.5 flex items-center gap-1.5">
              <span>⏱️</span> Jadwal Tahapan Waktu Masak & Dispatch Muat
            </h4>
            <table className="w-full text-left border-collapse border border-gray-300 text-[11px]">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="p-1.5 border-r border-gray-300">Tahapan Kerja Dapur</th>
                  <th className="p-1.5 border-r border-gray-300 text-center">Jadwal Waktu</th>
                  <th className="p-1.5 border-r border-gray-300">Petugas Bertanggung Jawab</th>
                  <th className="p-1.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {spkData.timeTable.map((t, idx) => (
                  <tr key={idx} className="border-b border-gray-200">
                    <td className="p-1.5 border-r border-gray-300 font-medium">{t.step}</td>
                    <td className="p-1.5 border-r border-gray-300 text-center font-mono font-bold text-gray-800">
                      {t.time}
                    </td>
                    <td className="p-1.5 border-r border-gray-300">{t.pic}</td>
                    <td className="p-1.5 text-center font-bold text-emerald-700">{t.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-300 text-center text-xs">
            <div>
              <p className="text-gray-500 mb-12">Disiapkan Oleh (Head Chef):</p>
              <p className="font-bold text-gray-900 underline">{spkData.headChef}</p>
              <p className="text-[10px] text-gray-500">Koki Kepala Dapur SPPG</p>
            </div>
            <div>
              <p className="text-gray-500 mb-12">Diverifikasi Oleh (Ahli Gizi):</p>
              <p className="font-bold text-gray-900 underline">{spkData.nutritionist}</p>
              <p className="text-[10px] text-gray-500">Nutritionist & QC Officer</p>
            </div>
            <div>
              <p className="text-gray-500 mb-12">Mengetahui (Kepala SPPG):</p>
              <p className="font-bold text-gray-900 underline">Ir. H. Hendra Saputra, M.T</p>
              <p className="text-[10px] text-gray-500">Kepala Unit Layanan Gizi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
