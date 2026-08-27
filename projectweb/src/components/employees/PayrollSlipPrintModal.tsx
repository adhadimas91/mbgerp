"use client";
import React from "react";
import { PayrollRecord } from "./PayrollManagement";

interface PayrollSlipPrintModalProps {
  payroll: PayrollRecord;
  isOpen: boolean;
  onClose: () => void;
}

export default function PayrollSlipPrintModal({
  payroll,
  isOpen,
  onClose,
}: PayrollSlipPrintModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden print:m-0 print:border-none print:shadow-none">
        {/* Controls */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 print:hidden">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </span>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Cetak Slip Gaji Resmi MBG
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand-500 rounded-xl hover:bg-brand-600 shadow-theme-xs cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak Dokumen
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Printable Payslip */}
        <div className="p-8 bg-white text-gray-900 font-sans print:p-0">
          {/* Header Kop BGN */}
          <div className="border-b-2 border-gray-900 pb-4 mb-6 text-center relative">
            <div className="text-xs uppercase tracking-widest font-semibold text-gray-600">
              REPUBLIK INDONESIA • BADAN GIZI NASIONAL (BGN)
            </div>
            <div className="text-base font-black tracking-wide text-gray-900 mt-0.5">
              BUKTI PEMBAYARAN UPAH & TUNJANGAN TENAGA KERJA (SLIP GAJI)
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Satuan Pelayanan Program Gizi (SPPG) Harmoni Gambir • DIPA BGN No: 089.01.1.2026
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 text-xs mb-6 bg-gray-50 p-4 border border-gray-200">
            <div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-gray-500 font-medium">Nama Karyawan</span>
                <span className="col-span-2 font-bold">: {payroll.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 mt-1">
                <span className="text-gray-500 font-medium">NIP / ID MBG</span>
                <span className="col-span-2 font-mono">: {payroll.nip}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 mt-1">
                <span className="text-gray-500 font-medium">Jabatan / Peran</span>
                <span className="col-span-2">: {payroll.role}</span>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-3 gap-1">
                <span className="text-gray-500 font-medium">No. Referensi</span>
                <span className="col-span-2 font-mono font-bold">: {payroll.payrollCode}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 mt-1">
                <span className="text-gray-500 font-medium">Bulan / Periode</span>
                <span className="col-span-2 font-semibold">: {payroll.period}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 mt-1">
                <span className="text-gray-500 font-medium">Bank / Rekening</span>
                <span className="col-span-2 font-mono">: {payroll.bankName} - {payroll.accountNumber}</span>
              </div>
            </div>
          </div>

          {/* Table Breakdown */}
          <div className="grid grid-cols-2 gap-4 text-xs border border-gray-300 mb-6">
            {/* Column A: Penghasilan */}
            <div className="p-3 border-r border-gray-300">
              <div className="font-bold border-b border-gray-200 pb-1.5 mb-2 text-emerald-800 uppercase">
                A. PENGHASILAN & TUNJANGAN
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span>Gaji Pokok:</span>
                  <span className="font-mono">{formatRupiah(payroll.basicSalary)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tunjangan Higiene Dapur:</span>
                  <span className="font-mono">{formatRupiah(payroll.hygieneAllowance)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insentif Porsi Terdistribusi:</span>
                  <span className="font-mono">{formatRupiah(payroll.portionIncentive)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lembur Shift Dini Hari:</span>
                  <span className="font-mono">{formatRupiah(payroll.earlyShiftAllowance)}</span>
                </div>
              </div>
              <div className="border-t border-gray-200 mt-3 pt-2 flex justify-between font-bold text-gray-900">
                <span>Total Penghasilan (Gross):</span>
                <span className="font-mono">{formatRupiah(payroll.grossSalary)}</span>
              </div>
            </div>

            {/* Column B: Potongan */}
            <div className="p-3">
              <div className="font-bold border-b border-gray-200 pb-1.5 mb-2 text-rose-800 uppercase">
                B. POTONGAN RESMI
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span>BPJS Ketenagakerjaan:</span>
                  <span className="font-mono">-{formatRupiah(payroll.bpjsKetenagakerjaanDeduction)}</span>
                </div>
                <div className="flex justify-between">
                  <span>BPJS Kesehatan:</span>
                  <span className="font-mono">-{formatRupiah(payroll.bpjsKesehatanDeduction)}</span>
                </div>
                <div className="flex justify-between">
                  <span>PPh 21 (Pajak):</span>
                  <span className="font-mono">-{formatRupiah(payroll.pph21Deduction)}</span>
                </div>
              </div>
              <div className="border-t border-gray-200 mt-7 pt-2 flex justify-between font-bold text-gray-900">
                <span>Total Potongan:</span>
                <span className="font-mono">-{formatRupiah(payroll.totalDeductions)}</span>
              </div>
            </div>
          </div>

          {/* Take Home Pay Box */}
          <div className="bg-gray-100 p-3.5 border border-gray-400 flex items-center justify-between text-xs mb-6">
            <div>
              <span className="font-bold uppercase tracking-wider block text-gray-800">
                TOTAL UPAH BERSIH DITERIMA (TAKE HOME PAY)
              </span>
              <span className="text-[10px] text-gray-500 italic">
                Telah dibayarkan via SP2D Bank BUMN No. {payroll.sp2dNumber}
              </span>
            </div>
            <span className="text-base font-black font-mono text-gray-900">
              {formatRupiah(payroll.netSalary)}
            </span>
          </div>

          {/* Signature Block */}
          <div className="grid grid-cols-2 gap-8 text-xs pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-600">Penerima Upah:</p>
              <div className="h-14 flex items-center justify-center italic text-gray-400">
                [ Tanda Tangan ]
              </div>
              <p className="font-bold underline">{payroll.name}</p>
              <p className="text-[10px] text-gray-500">NIP. {payroll.nip}</p>
            </div>

            <div className="text-center">
              <p className="text-gray-600">Pejabat Pembuat Komitmen (PPK) BGN:</p>
              <div className="h-14 flex items-center justify-center italic text-gray-400">
                [ Otorisasi SP2D & Cap BGN ]
              </div>
              <p className="font-bold underline">Budi Rahardjo, S.E., Ak., M.M.</p>
              <p className="text-[10px] text-gray-500">NIP. 197805122003121002</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
