"use client";
import React, { useState } from "react";

interface FinancialSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCeiling: number;
}

export const FinancialSimulationModal: React.FC<FinancialSimulationModalProps> = ({
  isOpen,
  onClose,
  currentCeiling,
}) => {
  const [dailyPortions, setDailyPortions] = useState(15000);
  const [costPerPortion, setCostPerPortion] = useState(14250);
  const [activeDaysPerMonth, setActiveDaysPerMonth] = useState(22);
  const [monthsRemaining, setMonthsRemaining] = useState(6);
  const [paguStandard] = useState(15000);

  if (!isOpen) return null;

  const monthlyPortions = dailyPortions * activeDaysPerMonth;
  const monthlyCost = monthlyPortions * costPerPortion;
  const projectedTotalCost = monthlyCost * monthsRemaining;
  const standardCost = monthlyPortions * paguStandard * monthsRemaining;
  const potentialSavings = standardCost - projectedTotalCost;
  const savingsPercent = ((potentialSavings / standardCost) * 100).toFixed(1);

  const formatRupiah = (val: number) => {
    return "Rp " + Math.round(val).toLocaleString("id-ID");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white/95 backdrop-blur dark:bg-gray-900/95 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Simulator Proyeksi Anggaran &amp; Efisiensi Biaya MBG
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Hitung proyeksi serapan belanja vs pagu pagu nasional Rp 15.000/porsi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 rounded-lg hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Controls */}
          <div className="space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
            {/* Slider 1: Daily Portions */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  Target Porsi Harian:
                </label>
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                  {dailyPortions.toLocaleString("id-ID")} Porsi / Hari
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={dailyPortions}
                onChange={(e) => setDailyPortions(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>1.000 Porsi</span>
                <span>25.000 Porsi</span>
                <span>50.000 Porsi</span>
              </div>
            </div>

            {/* Slider 2: Cost Per Portion */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  Biaya Riil per Porsi (Bahan + Operasional + Logistik):
                </label>
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                  {formatRupiah(costPerPortion)} / Porsi (Pagu Max: Rp 15.000)
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="16000"
                step="50"
                value={costPerPortion}
                onChange={(e) => setCostPerPortion(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>Rp 10.000</span>
                <span>Rp 13.000</span>
                <span>Rp 16.000</span>
              </div>
            </div>

            {/* Grid Days & Months */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Hari Masak Efektif per Bulan
                </label>
                <select
                  value={activeDaysPerMonth}
                  onChange={(e) => setActiveDaysPerMonth(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value={20}>20 Hari (Senin - Jumat 4 Pekan)</option>
                  <option value={22}>22 Hari (Standar Bulanan Sekolah)</option>
                  <option value={26}>26 Hari (Senin - Sabtu)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Durasi Proyeksi Waktu
                </label>
                <select
                  value={monthsRemaining}
                  onChange={(e) => setMonthsRemaining(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value={1}>1 Bulan Mendatang</option>
                  <option value={3}>3 Bulan (1 Kuartal / Triwulan)</option>
                  <option value={6}>6 Bulan (1 Semester)</option>
                  <option value={12}>12 Bulan (1 Tahun Anggaran Penuh)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-200 dark:border-emerald-800/40 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Hasil Kalkulasi Proyeksi Realisasi Anggaran
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                <span className="text-[10px] text-gray-500 block">Total Porsi Diproduksi</span>
                <span className="text-base font-black text-gray-900 dark:text-white">
                  {(monthlyPortions * monthsRemaining).toLocaleString("id-ID")} Porsi
                </span>
                <span className="text-[10px] text-gray-400 block mt-0.5">
                  ({monthlyPortions.toLocaleString("id-ID")} porsi / bulan)
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                <span className="text-[10px] text-gray-500 block">Kebutuhan Anggaran Riil</span>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                  {formatRupiah(projectedTotalCost)}
                </span>
                <span className="text-[10px] text-gray-400 block mt-0.5">
                  ({formatRupiah(monthlyCost)} / bulan)
                </span>
              </div>
            </div>

            {/* Savings Analysis */}
            <div className="p-3 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 block">
                  Potensi Efisiensi Anggaran (Savings):
                </span>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-300">
                  Dibandingkan Pagu Maksimal BGN (Rp 15.000 / Porsi)
                </span>
              </div>
              <div className="text-right">
                <span className="text-base font-black text-emerald-700 dark:text-emerald-300">
                  {formatRupiah(potentialSavings)}
                </span>
                <span className="text-xs font-bold text-emerald-600 block">
                  +{savingsPercent}% Hemat
                </span>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition shadow-sm"
            >
              Terapkan Sebagai Target KPI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
