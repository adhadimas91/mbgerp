"use client";

import React, { useRef } from "react";

export interface AssetQrData {
  id: string;
  assetCode: string;
  name: string;
  category: string;
  serialNumber: string;
  location: string;
  acquisitionDate: string;
  pic: string;
  condition: string;
}

interface AssetQrPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: AssetQrData | null;
}

export default function AssetQrPrintModal({
  isOpen,
  onClose,
  asset,
}: AssetQrPrintModalProps) {
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !asset) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Label Stiker QR Code Aset
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Standar Penomoran & Labeling Inventaris ERP MBG
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

        {/* Printable Stiker Preview */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          <div className="mb-4 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-200 dark:border-amber-800 flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Label ini tahan air & panas (*waterproof thermal*), wajib ditempelkan pada rangka utama alat masak/kendaraan.</span>
          </div>

          <div
            ref={printAreaRef}
            className="p-6 bg-white border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl shadow-inner text-gray-900"
          >
            {/* Stiker Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-gray-800 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-emerald-600 rounded flex items-center justify-center text-white font-black text-sm">
                  MBG
                </div>
                <div>
                  <h4 className="font-extrabold text-xs tracking-wider uppercase text-gray-900">
                    ERP MAKANAN BERGIZI GRATIS
                  </h4>
                  <p className="text-[10px] text-gray-600 font-semibold">
                    KEMENTERIAN KOORDINATOR BIDANG PANGAN RI
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-gray-900 text-white rounded uppercase">
                ASSET TAG
              </span>
            </div>

            {/* Content Body with QR Code & Metadata */}
            <div className="flex items-center gap-5">
              {/* QR Code SVG */}
              <div className="p-2 bg-white border-2 border-gray-800 rounded-lg shrink-0 flex flex-col items-center justify-center shadow-xs">
                <svg
                  className="w-28 h-28 text-gray-900"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer corner squares */}
                  <rect x="5" y="5" width="26" height="26" stroke="currentColor" strokeWidth="4" fill="white" />
                  <rect x="12" y="12" width="12" height="12" fill="currentColor" />
                  <rect x="69" y="5" width="26" height="26" stroke="currentColor" strokeWidth="4" fill="white" />
                  <rect x="76" y="12" width="12" height="12" fill="currentColor" />
                  <rect x="5" y="69" width="26" height="26" stroke="currentColor" strokeWidth="4" fill="white" />
                  <rect x="12" y="76" width="12" height="12" fill="currentColor" />

                  {/* QR Pattern Pixels */}
                  <rect x="36" y="8" width="6" height="6" fill="currentColor" />
                  <rect x="46" y="8" width="6" height="6" fill="currentColor" />
                  <rect x="56" y="8" width="6" height="6" fill="currentColor" />
                  <rect x="36" y="18" width="6" height="6" fill="currentColor" />
                  <rect x="56" y="18" width="6" height="6" fill="currentColor" />
                  <rect x="46" y="28" width="6" height="6" fill="currentColor" />

                  <rect x="8" y="36" width="6" height="6" fill="currentColor" />
                  <rect x="18" y="36" width="6" height="6" fill="currentColor" />
                  <rect x="28" y="36" width="6" height="6" fill="currentColor" />
                  <rect x="40" y="40" width="8" height="8" fill="currentColor" />
                  <rect x="52" y="40" width="8" height="8" fill="currentColor" />
                  <rect x="68" y="36" width="6" height="6" fill="currentColor" />
                  <rect x="78" y="36" width="6" height="6" fill="currentColor" />
                  <rect x="88" y="36" width="6" height="6" fill="currentColor" />

                  <rect x="8" y="46" width="6" height="6" fill="currentColor" />
                  <rect x="28" y="46" width="6" height="6" fill="currentColor" />
                  <rect x="40" y="52" width="8" height="8" fill="currentColor" />
                  <rect x="52" y="52" width="8" height="8" fill="currentColor" />
                  <rect x="68" y="46" width="6" height="6" fill="currentColor" />
                  <rect x="88" y="46" width="6" height="6" fill="currentColor" />

                  <rect x="8" y="56" width="6" height="6" fill="currentColor" />
                  <rect x="18" y="56" width="6" height="6" fill="currentColor" />
                  <rect x="28" y="56" width="6" height="6" fill="currentColor" />
                  <rect x="68" y="56" width="6" height="6" fill="currentColor" />
                  <rect x="78" y="56" width="6" height="6" fill="currentColor" />
                  <rect x="88" y="56" width="6" height="6" fill="currentColor" />

                  <rect x="36" y="68" width="6" height="6" fill="currentColor" />
                  <rect x="46" y="68" width="6" height="6" fill="currentColor" />
                  <rect x="56" y="68" width="6" height="6" fill="currentColor" />
                  <rect x="36" y="78" width="6" height="6" fill="currentColor" />
                  <rect x="56" y="78" width="6" height="6" fill="currentColor" />
                  <rect x="46" y="88" width="6" height="6" fill="currentColor" />
                  <rect x="68" y="78" width="6" height="6" fill="currentColor" />
                  <rect x="78" y="88" width="6" height="6" fill="currentColor" />
                  <rect x="88" y="78" width="6" height="6" fill="currentColor" />
                </svg>
                <span className="text-[9px] font-mono font-bold mt-1 text-gray-700">
                  {asset.assetCode}
                </span>
              </div>

              {/* Detail Info Grid */}
              <div className="flex-1 space-y-1.5 text-[11px]">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block">
                    Nama Aset:
                  </span>
                  <span className="font-bold text-gray-900 line-clamp-2">
                    {asset.name}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gray-200">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block">Kategori</span>
                    <span className="font-semibold text-gray-800">{asset.category}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block">No Seri / Plat</span>
                    <span className="font-mono font-semibold text-gray-800">{asset.serialNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block">Lokasi Unit</span>
                    <span className="font-semibold text-gray-800">{asset.location}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block">Tanggal Beli</span>
                    <span className="font-semibold text-gray-800">{asset.acquisitionDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Warning */}
            <div className="mt-4 pt-2 border-t border-gray-300 flex items-center justify-between text-[9px] text-gray-600 font-medium">
              <span>Dilarang merusak atau memindahkan label tanpa izin pengelola.</span>
              <span className="font-mono">ISO 9001 / 22000 MBG</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs hover:shadow transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Cetak Label Stiker
          </button>
        </div>
      </div>
    </div>
  );
}
