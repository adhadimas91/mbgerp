"use client";

import React from "react";

interface RoleHierarchyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RoleHierarchyModal({
  isOpen,
  onClose,
}: RoleHierarchyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl dark:bg-gray-900 dark:border dark:border-gray-800 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Bagan Hirarki Peran & Eskalasi Otorisasi MBG
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Alur rantai komando wewenang keputusan dan approval transaksi data berstandar ISO 27001
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 p-2 text-gray-500 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Level 1: Pusat BGN Nasional */}
          <div className="rounded-2xl border-2 border-red-200 bg-red-50/40 p-4 dark:border-red-900/50 dark:bg-red-900/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-600 font-bold text-white text-xs">
                  L1
                </span>
                <div>
                  <h4 className="text-sm font-bold text-red-950 dark:text-red-200">
                    Level 1: Pusat Komando BGN Nasional (Super Wewenang)
                  </h4>
                  <p className="text-[11px] text-red-700 dark:text-red-400">
                    Otorisasi master pagu DPA, sertifikasi nasional, dan tata kelola sistem seluruh Indonesia
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-800 dark:bg-red-900/60 dark:text-red-200">
                ADMIN_PUSAT
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-red-100 dark:border-red-900/30">
                <span className="font-bold text-gray-900 dark:text-white block mb-1">
                  Wewenang Otorisasi Utama:
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-gray-600 dark:text-gray-300 text-[11px]">
                  <li>Pengesahan Pagu DPA Kabupaten/Kota Nasional</li>
                  <li>Manajemen Akun Administrator Regional & Kebijakan CISO</li>
                  <li>Akses Audit Trail Forensik SHA-256 Seluruh Transaksi</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-red-100 dark:border-red-900/30">
                <span className="font-bold text-gray-900 dark:text-white block mb-1">
                  Pengawas Eksternal Terkait:
                </span>
                <span className="inline-block rounded-md bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-800 dark:bg-violet-900/40 dark:text-violet-300">
                  AUDITOR_EKSTERNAL (BPK / Inspektorat)
                </span>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                  Akses Read-Only terproteksi untuk pemeriksaan akuntabilitas fiskal & kepatuhan ISO.
                </p>
              </div>
            </div>
          </div>

          {/* Escalation Connector Arrow */}
          <div className="flex justify-center -my-3">
            <div className="flex items-center gap-1.5 rounded-full bg-gray-200 dark:bg-gray-800 px-3 py-1 text-[10px] font-bold text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Eskalasi Otorisasi Regional
            </div>
          </div>

          {/* Level 2: Regional & Keuangan PPK */}
          <div className="rounded-2xl border-2 border-blue-200 bg-blue-50/40 p-4 dark:border-blue-900/50 dark:bg-blue-900/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 font-bold text-white text-xs">
                  L2
                </span>
                <div>
                  <h4 className="text-sm font-bold text-blue-950 dark:text-blue-200">
                    Level 2: Koordinator Regional & Otorisator Finansial (PPK)
                  </h4>
                  <p className="text-[11px] text-blue-700 dark:text-blue-400">
                    Verifikasi tagihan supplier (3-Way Match), penerbitan SP2D, dan verifikasi sertifikasi vendor
                  </p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800 dark:bg-blue-900/60 dark:text-blue-200">
                  ADMIN_REGIONAL
                </span>
                <span className="rounded-full bg-cyan-100 px-2.5 py-0.5 text-xs font-bold text-cyan-800 dark:bg-cyan-900/60 dark:text-cyan-200">
                  BENDAHARA_PPK
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-blue-100 dark:border-blue-900/30">
                <span className="font-bold text-gray-900 dark:text-white block mb-1">
                  Tanggung Jawab Finansial:
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-gray-600 dark:text-gray-300 text-[11px]">
                  <li>Otorisasi Bukti Kas Keluar & SP2D Transfer Bank BUMN</li>
                  <li>Rekonsiliasi Bank & Pemotongan Pajak PPh/PPN</li>
                  <li>Persetujuan Penggajian & Insentif Dapur SPPG</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-blue-100 dark:border-blue-900/30">
                <span className="font-bold text-gray-900 dark:text-white block mb-1">
                  Mitra Portal Eksternal:
                </span>
                <span className="inline-block rounded-md bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-800 dark:bg-teal-900/40 dark:text-teal-300">
                  SUPPLIER_VENDOR
                </span>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                  Pengajuan faktur tagihan, katalog harga komoditas HAP, dan bukti pengiriman PO.
                </p>
              </div>
            </div>
          </div>

          {/* Escalation Connector Arrow */}
          <div className="flex justify-center -my-3">
            <div className="flex items-center gap-1.5 rounded-full bg-gray-200 dark:bg-gray-800 px-3 py-1 text-[10px] font-bold text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Eskalasi Operasional Lapangan
            </div>
          </div>

          {/* Level 3: Dapur Sentral SPPG & Lapangan */}
          <div className="rounded-2xl border-2 border-purple-200 bg-purple-50/40 p-4 dark:border-purple-900/50 dark:bg-purple-900/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600 font-bold text-white text-xs">
                  L3
                </span>
                <div>
                  <h4 className="text-sm font-bold text-purple-950 dark:text-purple-200">
                    Level 3: Dapur Sentral SPPG, Mutu ISO & Distribusi Lapangan
                  </h4>
                  <p className="text-[11px] text-purple-700 dark:text-purple-400">
                    Pelaksana masak 5 lini, validasi nutrisi AKG, kontrol sanitasi CCP HACCP, dan logistik sekolah
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-800 dark:bg-purple-900/60 dark:text-purple-200">
                  KEPALA_SPPG
                </span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200">
                  AHLI_GIZI
                </span>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-900/60 dark:text-amber-200">
                  INSPEKTUR_MUTU_QC
                </span>
                <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200">
                  TIM_LOGISTIK_DRIVER
                </span>
                <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-orange-800 dark:bg-orange-900/60 dark:text-orange-200">
                  PETUGAS_GUDANG
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="bg-white dark:bg-gray-800 p-2.5 rounded-xl border border-purple-100 dark:border-purple-900/30">
                <span className="font-bold text-gray-900 dark:text-white block mb-0.5">
                  Lini Masak & SPM
                </span>
                <p className="text-[10.5pt] text-gray-500 dark:text-gray-400 m-0 leading-tight">
                  Penerbitan SPM, pengawasan 5 lini masak, dan voucher permintaan bahan baku dapur.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-2.5 rounded-xl border border-purple-100 dark:border-purple-900/30">
                <span className="font-bold text-gray-900 dark:text-white block mb-0.5">
                  Nutrisi & Kelaikan Mutu
                </span>
                <p className="text-[10.5pt] text-gray-500 dark:text-gray-400 m-0 leading-tight">
                  Kalkulasi AKG, Uji Organoleptik & pelepasan sampel retensi QC kulkas 2x24 jam.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-2.5 rounded-xl border border-purple-100 dark:border-purple-900/30">
                <span className="font-bold text-gray-900 dark:text-white block mb-0.5">
                  Rantai Dingin & PoD
                </span>
                <p className="text-[10.5pt] text-gray-500 dark:text-gray-400 m-0 leading-tight">
                  Live GPS tracking termal &gt;60°C dan penandatanganan digital BAST di sekolah.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-gray-200 px-6 py-4 dark:border-gray-800">
          <button
            onClick={onClose}
            className="rounded-xl bg-gray-100 px-5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Tutup Bagan Hirarki
          </button>
        </div>
      </div>
    </div>
  );
}
