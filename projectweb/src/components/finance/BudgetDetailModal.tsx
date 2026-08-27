"use client";

import React from "react";
import { BudgetAllocation } from "./CreateBudgetModal";

interface BudgetDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  budget: BudgetAllocation | null;
  onEdit?: (budget: BudgetAllocation) => void;
  onPrint?: (budget: BudgetAllocation) => void;
}

export default function BudgetDetailModal({
  isOpen,
  onClose,
  budget,
  onEdit,
  onPrint,
}: BudgetDetailModalProps) {
  if (!isOpen || !budget) return null;

  const absorptionPercent = budget.totalCeiling > 0
    ? Math.round((budget.disbursedAmount / budget.totalCeiling) * 100)
    : 0;

  const committedPercent = budget.totalCeiling > 0
    ? Math.round((budget.committedAmount / budget.totalCeiling) * 100)
    : 0;

  const remainingBalance = budget.totalCeiling - budget.disbursedAmount - budget.committedAmount;
  const remainingPercent = Math.max(0, 100 - absorptionPercent - committedPercent);

  // Estimasi biaya per porsi
  const totalDaysPerYear = 220; // Hari aktif sekolah efektif per tahun
  const totalAnnualPortions = budget.targetDailyPortions * totalDaysPerYear;
  const costPerPortion = totalAnnualPortions > 0
    ? Math.round(budget.totalCeiling / totalAnnualPortions)
    : 15000;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl transition-all dark:border-gray-800 dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Rincian Plafon Anggaran & Realisasi
                </h3>
                <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
                  {budget.dpaCode}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Wilayah: {budget.region}, {budget.province} | Tahun Anggaran {budget.fiscalYear}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-5 space-y-6">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-3.5 dark:border-gray-800 dark:bg-gray-800/40">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Plafon Pagu</span>
              <p className="mt-1 text-base font-bold text-gray-900 dark:text-white">
                Rp {budget.totalCeiling.toLocaleString("id-ID")}
              </p>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                {budget.sourceOfFund}
              </span>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3.5 dark:border-blue-900/40 dark:bg-blue-950/20">
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Realisasi Terserap (SP2D)</span>
              <p className="mt-1 text-base font-bold text-blue-700 dark:text-blue-300">
                Rp {budget.disbursedAmount.toLocaleString("id-ID")}
              </p>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                {absorptionPercent}% dari total pagu
              </span>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3.5 dark:border-amber-900/40 dark:bg-amber-950/20">
              <span className="text-xs font-medium text-amber-700 dark:text-amber-300">Komitmen Belanja (PO Berjalan)</span>
              <p className="mt-1 text-base font-bold text-amber-700 dark:text-amber-300">
                Rp {budget.committedAmount.toLocaleString("id-ID")}
              </p>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                {committedPercent}% terikat kontrak
              </span>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3.5 dark:border-emerald-900/40 dark:bg-emerald-950/20">
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Sisa Saldo Kas Bersih</span>
              <p className="mt-1 text-base font-bold text-emerald-700 dark:text-emerald-300">
                Rp {remainingBalance.toLocaleString("id-ID")}
              </p>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {remainingPercent}% saldo kas aman
              </span>
            </div>
          </div>

          {/* Progress Absorption Bar */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Status Penyerapan Anggaran Terpadu
              </span>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Total Realisasi + Komitmen: {absorptionPercent + committedPercent}%
              </span>
            </div>

            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 flex">
              <div
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${absorptionPercent}%` }}
                title={`Realisasi: ${absorptionPercent}%`}
              />
              <div
                className="h-full bg-amber-400 transition-all duration-500"
                style={{ width: `${committedPercent}%` }}
                title={`Komitmen PO: ${committedPercent}%`}
              />
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${remainingPercent}%` }}
                title={`Sisa Saldo: ${remainingPercent}%`}
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-xs bg-blue-500" />
                <span>Realisasi SP2D ({absorptionPercent}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-xs bg-amber-400" />
                <span>Komitmen PO ({committedPercent}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-xs bg-emerald-500" />
                <span>Sisa Pagu Kas ({remainingPercent}%)</span>
              </div>
            </div>
          </div>

          {/* Breakdown Pos Belanja & Target Beneficiaries */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Breakdown Pos Belanja */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800/30">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
                Rincian Pos Alokasi Belanja
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-xs">
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">1. Bahan Baku Pangan (75%)</span>
                    <p className="text-gray-500 dark:text-gray-400">Beras, Daging/Unggas, Ikan, Telur, Sayur, Susu</p>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">
                    Rp {budget.rawMaterialAllocation.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-xs">
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">2. Operasional Dapur & Energi (15%)</span>
                    <p className="text-gray-500 dark:text-gray-400">Gas LPG Industri, Listrik, Air Bersih, Insentif Juru Masak</p>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">
                    Rp {budget.operationalAllocation.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-xs">
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">3. Logistik & Armada Distribusi (8%)</span>
                    <p className="text-gray-500 dark:text-gray-400">BBM Armada Chiller, Pemeliharaan Kendaraan, Insentif Driver</p>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">
                    Rp {budget.logisticsAllocation.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-xs">
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">4. Mutu, Higienitas & Lab Uji (2%)</span>
                    <p className="text-gray-500 dark:text-gray-400">Sampling Uji Mikrobiologi, Sertifikasi ISO 22000, Sanitasi</p>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">
                    Rp {budget.qaInspectionAllocation.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>

            {/* Target Output & PIC Satker */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800/30 space-y-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                Informasi Sasaran Program & Satker
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/40">
                  <span className="text-gray-500 dark:text-gray-400">Target Porsi Harian</span>
                  <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                    {budget.targetDailyPortions.toLocaleString("id-ID")} porsi / hari
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/40">
                  <span className="text-gray-500 dark:text-gray-400">Penerima Manfaat</span>
                  <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                    {budget.targetBeneficiaries.toLocaleString("id-ID")} siswa
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/40">
                  <span className="text-gray-500 dark:text-gray-400">Biaya Satuan Efektif</span>
                  <p className="mt-1 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    Rp {costPerPortion.toLocaleString("id-ID")} / porsi
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/40">
                  <span className="text-gray-500 dark:text-gray-400">Pagu Nasional Acuan</span>
                  <p className="mt-1 text-sm font-bold text-gray-700 dark:text-gray-300">
                    Rp 15.000 / porsi
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Pejabat Pembuat Komitmen:</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{budget.picName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Kontak PPK:</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{budget.picContact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status Otorisasi:</span>
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
                      Disetujui KPA ({budget.approvalStatus})
                    </span>
                  </div>
                </div>
              </div>

              {budget.notes && (
                <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-xs text-amber-800 dark:text-amber-300">
                  <span className="font-semibold">Catatan Penetapan: </span>
                  {budget.notes}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Tutup
          </button>

          <div className="flex items-center gap-2">
            {onPrint && (
              <button
                type="button"
                onClick={() => onPrint(budget)}
                className="flex items-center gap-1.5 rounded-xl border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-950/40"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Cetak DPA & LRA
              </button>
            )}

            {onEdit && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEdit(budget);
                }}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none"
              >
                Ubah Alokasi
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
