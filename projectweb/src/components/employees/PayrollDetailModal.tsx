"use client";
import React from "react";
import { PayrollRecord } from "./PayrollManagement";

interface PayrollDetailModalProps {
  payroll: PayrollRecord;
  isOpen: boolean;
  onClose: () => void;
  onOpenSlip: () => void;
}

export default function PayrollDetailModal({
  payroll,
  isOpen,
  onClose,
  onOpenSlip,
}: PayrollDetailModalProps) {
  if (!isOpen) return null;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-bold">
                {payroll.payrollCode}
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full dark:bg-emerald-900/40 dark:text-emerald-300">
                {payroll.status}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Rincian Komponen Gaji: {payroll.name}
            </h3>
            <p className="text-xs text-gray-500 font-mono">
              NIP: {payroll.nip} • {payroll.role} • Periode: {payroll.period}
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Breakdown Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto text-xs">
          {/* Penghasilan / Pendapatan */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              A. Komponen Penghasilan & Tunjangan Dapur
            </h4>
            <div className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-xl dark:bg-emerald-950/20 dark:border-emerald-900/40 space-y-2">
              <div className="flex justify-between py-1 border-b border-emerald-100/60 dark:border-emerald-900/40">
                <span className="text-gray-600 dark:text-gray-400">Gaji Pokok / Upah Dasar SPPG</span>
                <span className="font-mono font-bold text-gray-900 dark:text-white">{formatRupiah(payroll.basicSalary)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-100/60 dark:border-emerald-900/40">
                <span className="text-gray-600 dark:text-gray-400">Tunjangan Higiene Dapur & Kehadiran Penuh</span>
                <span className="font-mono font-bold text-gray-900 dark:text-white">{formatRupiah(payroll.hygieneAllowance)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-100/60 dark:border-emerald-900/40">
                <span className="text-gray-600 dark:text-gray-400">Insentif Output Porsi Terdistribusi Sukses</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{formatRupiah(payroll.portionIncentive)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-100/60 dark:border-emerald-900/40">
                <span className="text-gray-600 dark:text-gray-400">Uang Lembur Shift Dini Hari (02:00 - 07:00)</span>
                <span className="font-mono font-bold text-gray-900 dark:text-white">{formatRupiah(payroll.earlyShiftAllowance)}</span>
              </div>
              <div className="flex justify-between pt-2 text-sm font-bold text-emerald-800 dark:text-emerald-300">
                <span>Total Penghasilan Kotor (Gross):</span>
                <span className="font-mono">{formatRupiah(payroll.grossSalary)}</span>
              </div>
            </div>
          </div>

          {/* Potongan */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
              </svg>
              B. Potongan Jaminan Sosial & Pajak
            </h4>
            <div className="p-4 bg-rose-50/40 border border-rose-100 rounded-xl dark:bg-rose-950/20 dark:border-rose-900/40 space-y-2">
              <div className="flex justify-between py-1 border-b border-rose-100/60 dark:border-rose-900/40">
                <span className="text-gray-600 dark:text-gray-400">Iuran BPJS Ketenagakerjaan (JKK, JKM, JHT, JP)</span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-{formatRupiah(payroll.bpjsKetenagakerjaanDeduction)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-rose-100/60 dark:border-rose-900/40">
                <span className="text-gray-600 dark:text-gray-400">Iuran BPJS Kesehatan (1% Karyawan)</span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-{formatRupiah(payroll.bpjsKesehatanDeduction)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-rose-100/60 dark:border-rose-900/40">
                <span className="text-gray-600 dark:text-gray-400">Potongan Pajak Penghasilan (PPh 21)</span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-{formatRupiah(payroll.pph21Deduction)}</span>
              </div>
              <div className="flex justify-between pt-2 text-sm font-bold text-rose-800 dark:text-rose-300">
                <span>Total Potongan:</span>
                <span className="font-mono">-{formatRupiah(payroll.totalDeductions)}</span>
              </div>
            </div>
          </div>

          {/* Take Home Pay */}
          <div className="p-4 bg-gray-900 text-white rounded-xl flex items-center justify-between shadow-lg">
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-400">
                Penghasilan Bersih Diterima (Take-Home Pay)
              </div>
              <div className="text-xs text-gray-300 mt-0.5">
                Ditransfer ke {payroll.bankName} - No: {payroll.accountNumber}
              </div>
            </div>
            <div className="text-xl font-mono font-black text-emerald-400">
              {formatRupiah(payroll.netSalary)}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <button
            onClick={onOpenSlip}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-theme-xs cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Cetak Slip Gaji Resmi
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
