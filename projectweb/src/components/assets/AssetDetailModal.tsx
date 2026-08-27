"use client";

import React, { useState } from "react";
import { AssetFormData } from "./AssetRegistrationModal";

interface AssetDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: AssetFormData | null;
  onPrintQr: (asset: AssetFormData) => void;
  onEdit: (asset: AssetFormData) => void;
  onScheduleMaintenance: (asset: AssetFormData) => void;
}

export default function AssetDetailModal({
  isOpen,
  onClose,
  asset,
  onPrintQr,
  onEdit,
  onScheduleMaintenance,
}: AssetDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "depreciation" | "maintenance" | "compliance">("overview");

  if (!isOpen || !asset) return null;

  // Depreciation Calculation (Metode Garis Lurus)
  const purchaseDate = new Date(asset.acquisitionDate);
  const currentDate = new Date();
  const yearsPassed = Math.max(0, (currentDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
  const effectiveYears = Math.min(yearsPassed, asset.usefulLifeYears);
  const annualDepreciation = asset.usefulLifeYears > 0 ? (asset.purchasePrice - asset.salvageValue) / asset.usefulLifeYears : 0;
  const accumulatedDepreciation = Math.min(asset.purchasePrice - asset.salvageValue, annualDepreciation * effectiveYears);
  const currentBookValue = Math.max(asset.salvageValue, asset.purchasePrice - accumulatedDepreciation);
  const depreciationPercentage = asset.purchasePrice > 0 ? Math.min(100, (accumulatedDepreciation / (asset.purchasePrice - asset.salvageValue)) * 100) : 0;

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-mono font-bold text-sm">
              AST
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {asset.name}
                </h3>
                <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 rounded-md">
                  {asset.assetCode}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {asset.category} • Lokasi: {asset.location}
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === "overview"
                ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
            }`}
          >
            Ikhtisar & Spesifikasi
          </button>
          <button
            onClick={() => setActiveTab("depreciation")}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === "depreciation"
                ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
            }`}
          >
            Penyusutan Nilai Buku
          </button>
          <button
            onClick={() => setActiveTab("maintenance")}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === "maintenance"
                ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
            }`}
          >
            Riwayat Servis & Kalibrasi
          </button>
          <button
            onClick={() => setActiveTab("compliance")}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === "compliance"
                ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
            }`}
          >
            Kepatuhan ISO 22000 & Audit
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Quick Status Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800">
                  <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Status Operasi</span>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md ${
                      asset.status === "Aktif"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                        : asset.status === "Maintenance"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400"
                    }`}
                  >
                    {asset.status}
                  </span>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800">
                  <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Kondisi Fisik</span>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md ${
                      asset.condition === "Baik"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                        : asset.condition === "Perlu Servis"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400"
                    }`}
                  >
                    {asset.condition}
                  </span>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800">
                  <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Harga Beli Awal</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {formatRupiah(asset.purchasePrice)}
                  </span>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800">
                  <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Nilai Buku Saat Ini</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {formatRupiah(currentBookValue)}
                  </span>
                </div>
              </div>

              {/* Detail Specifications & QR Visual */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 space-y-3">
                    <h4 className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                      Spesifikasi Teknis & Identitas
                    </h4>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                      <div>
                        <span className="text-gray-500 block">Merk / Brand:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{asset.brand || "-"}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">No Seri / No Polisi:</span>
                        <span className="font-mono font-semibold text-gray-900 dark:text-white">{asset.serialNumber}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Daya / Kapasitas:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{asset.powerRating || "-"}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Vendor Pengadaan:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{asset.supplierVendor}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Tanggal Perolehan:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{asset.acquisitionDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Penanggung Jawab (PIC):</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{asset.pic}</span>
                      </div>
                    </div>
                  </div>

                  {asset.notes && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/40 text-xs">
                      <span className="font-bold text-blue-900 dark:text-blue-300 block mb-1">Catatan & Histori:</span>
                      <p className="text-blue-800 dark:text-blue-200">{asset.notes}</p>
                    </div>
                  )}
                </div>

                {/* QR Code Action Box */}
                <div className="p-5 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center">
                  <div className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm mb-3">
                    <svg className="w-24 h-24 text-gray-900" viewBox="0 0 100 100" fill="currentColor">
                      <rect x="5" y="5" width="26" height="26" />
                      <rect x="69" y="5" width="26" height="26" />
                      <rect x="5" y="69" width="26" height="26" />
                      <rect x="36" y="8" width="6" height="6" />
                      <rect x="46" y="8" width="6" height="6" />
                      <rect x="40" y="40" width="16" height="16" />
                      <rect x="68" y="36" width="26" height="12" />
                      <rect x="36" y="68" width="26" height="26" />
                    </svg>
                  </div>
                  <span className="font-mono text-xs font-bold text-gray-800 dark:text-gray-200 mb-1">
                    {asset.assetCode}
                  </span>
                  <p className="text-[11px] text-gray-500 mb-4">
                    QR Code siap scan untuk audit & checklist higienitas
                  </p>
                  <button
                    type="button"
                    onClick={() => onPrintQr(asset)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl hover:bg-emerald-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Cetak Stiker Label
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DEPRECIATION */}
          {activeTab === "depreciation" && (
            <div className="space-y-6">
              <div className="p-5 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-4">
                  Simulasi Depresiasi Garis Lurus (Straight-Line Method)
                </h4>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5 font-semibold">
                      <span className="text-gray-600 dark:text-gray-400">Akumulasi Penyusutan</span>
                      <span className="text-emerald-600 dark:text-emerald-400">{depreciationPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${depreciationPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs">
                    <div>
                      <span className="text-gray-500 block">Harga Perolehan:</span>
                      <span className="font-bold text-gray-900 dark:text-white">{formatRupiah(asset.purchasePrice)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Masa Manfaat:</span>
                      <span className="font-bold text-gray-900 dark:text-white">{asset.usefulLifeYears} Tahun</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Nilai Sisa (Salvage):</span>
                      <span className="font-bold text-gray-900 dark:text-white">{formatRupiah(asset.salvageValue)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Penyusutan/Tahun:</span>
                      <span className="font-bold text-rose-600 dark:text-rose-400">{formatRupiah(annualDepreciation)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table of Depreciation Schedule */}
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 font-semibold">
                    <tr>
                      <th className="px-4 py-2.5">Tahun Ke-</th>
                      <th className="px-4 py-2.5">Tahun Kalender</th>
                      <th className="px-4 py-2.5">Beban Depresiasi</th>
                      <th className="px-4 py-2.5">Akumulasi Depresiasi</th>
                      <th className="px-4 py-2.5">Nilai Buku Akhir Tahun</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {Array.from({ length: asset.usefulLifeYears }).map((_, idx) => {
                      const yearNum = idx + 1;
                      const calYear = purchaseDate.getFullYear() + idx;
                      const accum = annualDepreciation * yearNum;
                      const bookVal = Math.max(asset.salvageValue, asset.purchasePrice - accum);
                      const isCurrent = Math.floor(yearsPassed) === idx;

                      return (
                        <tr
                          key={yearNum}
                          className={`${
                            isCurrent
                              ? "bg-emerald-50/60 dark:bg-emerald-950/30 font-semibold"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800/40"
                          }`}
                        >
                          <td className="px-4 py-2 flex items-center gap-2">
                            <span>Tahun {yearNum}</span>
                            {isCurrent && (
                              <span className="px-1.5 py-0.5 text-[9px] bg-emerald-600 text-white rounded">
                                Berjalan
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-2">{calYear}</td>
                          <td className="px-4 py-2">{formatRupiah(annualDepreciation)}</td>
                          <td className="px-4 py-2 text-rose-600 dark:text-rose-400">{formatRupiah(accum)}</td>
                          <td className="px-4 py-2 font-bold text-gray-900 dark:text-white">{formatRupiah(bookVal)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: MAINTENANCE HISTORY */}
          {activeTab === "maintenance" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                  Log Servis & Pemeliharaan Rutin
                </h4>
                <button
                  type="button"
                  onClick={() => onScheduleMaintenance(asset)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Buat Jadwal Servis
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-white dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 flex items-start justify-between">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 rounded">
                        Preventive Service
                      </span>
                      <span className="text-gray-500">12 Feb 2026</span>
                    </div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">
                      Pembersihan Boiler & Kalibrasi Sensor Termal Suhu Masak
                    </h5>
                    <p className="text-gray-500 dark:text-gray-400">
                      Teknisi: PT Kitchen Multi Sarana • Suku Cadang: Gasket Silicone Food Grade No. 4
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-gray-900 dark:text-white block">Rp 750.000</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">Lolos Uji Kelaikan</span>
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 flex items-start justify-between">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded">
                        Inspeksi Awal Penerimaan
                      </span>
                      <span className="text-gray-500">15 Jan 2026</span>
                    </div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">
                      Uji Tekanan Gas & Sertifikasi Food Contact Stainless 304
                    </h5>
                    <p className="text-gray-500 dark:text-gray-400">
                      Penguji: Tim Mutu MBG Pusat & Vendor
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-gray-900 dark:text-white block">Termasuk Garansi</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">100% Sesuai Spesifikasi</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: COMPLIANCE & AUDIT */}
          {activeTab === "compliance" && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <h5 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm">
                      Kelaikan Higienitas ISO 22000 Terverifikasi
                    </h5>
                    <p className="text-xs text-emerald-800 dark:text-emerald-400">
                      Peralatan ini terdaftar dalam program Food Safety Management System (FSMS) dan bebas dari kontaminasi karsinogenik / residu kimia berbahaya.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 space-y-2">
                  <span className="font-bold text-gray-900 dark:text-white block">Standar Kepatuhan:</span>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    <li>ISO 22000:2018 (Food Safety Management System)</li>
                    <li>HACCP Clause 7.2 (Peralatan Kontak Makanan)</li>
                    <li>Sertifikasi Food Grade SUS 304 Stainless Steel</li>
                  </ul>
                </div>

                <div className="p-4 bg-white dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 space-y-2">
                  <span className="font-bold text-gray-900 dark:text-white block">Audit Trail Terakhir:</span>
                  <p className="text-gray-600 dark:text-gray-300">
                    Inspeksi Sanitasi Harian oleh Auditor Mutu: <strong>26 Feb 2026, 06:15 WIB</strong> (Grade A - 98% Kebersihan).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <button
            type="button"
            onClick={() => onEdit(asset)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Informasi Aset
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={() => onPrintQr(asset)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              Cetak QR Label
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
