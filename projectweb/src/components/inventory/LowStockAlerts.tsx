"use client";
import React, { useState } from "react";
import Badge from "../ui/badge/Badge";

interface StockAlert {
  id: string;
  name: string;
  category: string;
  warehouse: string;
  currentStock: number;
  minThreshold: number;
  unit: string;
  severity: "CRITICAL" | "WARNING";
  daysLeftExpiry?: number;
  batchNumber: string;
  recommendedAction: string;
}

const initialAlerts: StockAlert[] = [
  {
    id: "ALT-001",
    name: "Bayam Hidroponik Segar MBG",
    category: "Sayuran & Buah",
    warehouse: "Chiller Sayuran Segar (6°C)",
    currentStock: 320,
    minThreshold: 800,
    unit: "kg",
    severity: "CRITICAL",
    daysLeftExpiry: 2,
    batchNumber: "LOT-20260226-BYM",
    recommendedAction: "Prioritas olah menu hari ini (FIFO) & terbitkan PO Darurat 1.000 kg",
  },
  {
    id: "ALT-002",
    name: "Telur Ayam Ras Segar",
    category: "Protein Hewani",
    warehouse: "Gudang Kering Terkontrol B",
    currentStock: 850,
    minThreshold: 1000,
    unit: "kg",
    severity: "WARNING",
    daysLeftExpiry: 13,
    batchNumber: "LOT-20260224-TLR",
    recommendedAction: "Penerbitan PO reguler ke supplier PT. Agro Unggas Perkasa",
  },
  {
    id: "ALT-003",
    name: "Susu Sapi Murni Pasteurisasi MBG (Batch 26 Feb)",
    category: "Susu & Olahan",
    warehouse: "Cold Storage Susu (Chiller 02)",
    currentStock: 1200,
    minThreshold: 2000,
    unit: "Liter",
    severity: "WARNING",
    daysLeftExpiry: 5,
    batchNumber: "LOT-20260226-SSU",
    recommendedAction: "Distribusikan untuk jadwal sarapan sekolah besok pagi",
  },
];

export const LowStockAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<StockAlert[]>(initialAlerts);
  const [poGenerated, setPoGenerated] = useState<string | null>(null);

  const handleGeneratePO = (alertItem: StockAlert) => {
    setPoGenerated(alertItem.id);
    setTimeout(() => {
      setPoGenerated(null);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Alert Header Banner */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-amber-500 p-2 text-white shadow-sm">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-900 dark:text-amber-300">
              Sistem Peringatan Dini Stok Rendah & Manajemen Kadaluarsa (FIFO)
            </h4>
            <p className="mt-1 text-xs text-amber-800/80 dark:text-amber-400">
              Algoritma memantau stok bahan baku terhadap target porsi menu 7 hari ke depan. Bahan makanan yang mendekati masa kadaluarsa (&lt; 7 hari) wajib diutamakan dalam alur masak dapur MBG.
            </p>
          </div>
        </div>
      </div>

      {poGenerated && (
        <div className="rounded-xl bg-emerald-100 p-3 text-xs font-semibold text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 flex items-center justify-between">
          <span>✓ Purchase Order otomatis (PO Darurat) berhasil dibuat dan diteruskan ke modul Finansial & Supplier!</span>
        </div>
      )}

      {/* Alerts Table */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Daftar Komoditas Kritis & Peringatan Kadaluarsa
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {alerts.length} item memerlukan tindakan pemesanan ulang (Reorder Point) atau prioritas masak
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-[11px] font-semibold uppercase text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <th className="pb-3 pr-4">Bahan Baku & Batch</th>
                <th className="pb-3 px-3">Gudang</th>
                <th className="pb-3 px-3">Stok Saat Ini / Min</th>
                <th className="pb-3 px-3">Sisa Kadaluarsa</th>
                <th className="pb-3 px-3">Rekomendasi Tindakan</th>
                <th className="pb-3 pl-3 text-right">Aksi Cepat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
              {alerts.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01]">
                  <td className="py-4 pr-4">
                    <span className="font-semibold text-gray-900 dark:text-white block text-sm">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-gray-500">{item.category}</span>
                      <span className="text-gray-300">•</span>
                      <span className="font-mono text-[10px] text-gray-400">{item.batchNumber}</span>
                    </div>
                  </td>

                  <td className="py-4 px-3 text-gray-700 dark:text-gray-300 font-medium">
                    {item.warehouse}
                  </td>

                  <td className="py-4 px-3">
                    <div className="space-y-0.5">
                      <span className="font-bold text-rose-600 dark:text-rose-400 text-sm">
                        {item.currentStock} {item.unit}
                      </span>
                      <span className="text-[11px] text-gray-400 block">
                        Min: {item.minThreshold} {item.unit}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-3">
                    {item.daysLeftExpiry && item.daysLeftExpiry <= 3 ? (
                      <span className="rounded-md bg-rose-100 px-2 py-0.5 text-[11px] font-bold text-rose-700 dark:bg-rose-500/20 dark:text-rose-300">
                        🚨 {item.daysLeftExpiry} Hari Lagi
                      </span>
                    ) : item.daysLeftExpiry && item.daysLeftExpiry <= 7 ? (
                      <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
                        ⚠️ {item.daysLeftExpiry} Hari Lagi
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">{item.daysLeftExpiry} Hari</span>
                    )}
                  </td>

                  <td className="py-4 px-3 max-w-[280px]">
                    <span className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
                      {item.recommendedAction}
                    </span>
                  </td>

                  <td className="py-4 pl-3 text-right">
                    <button
                      onClick={() => handleGeneratePO(item)}
                      className="rounded-xl bg-emerald-600 px-3 py-1.5 font-semibold text-white hover:bg-emerald-700 shadow-sm transition whitespace-nowrap"
                    >
                      Terbitkan PO
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LowStockAlerts;
