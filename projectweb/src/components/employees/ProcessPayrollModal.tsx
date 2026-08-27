"use client";
import React, { useState } from "react";
import { PayrollRecord } from "./PayrollManagement";
import { INITIAL_EMPLOYEES } from "./EmployeeRegistryTable";

interface ProcessPayrollModalProps {
  isOpen: boolean;
  period: string;
  onClose: () => void;
  onAdd: (newPayrolls: PayrollRecord[]) => void;
}

export default function ProcessPayrollModal({
  isOpen,
  period,
  onClose,
  onAdd,
}: ProcessPayrollModalProps) {
  const [selectedPeriod, setSelectedPeriod] = useState(period);
  const [ontimePerformanceBonus, setOntimePerformanceBonus] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const generated: PayrollRecord[] = INITIAL_EMPLOYEES.map((emp, idx) => {
        const basic = emp.role === "KEPALA_SPPG" ? 12500000 : emp.role === "AHLI_GIZI" ? 8500000 : emp.role === "CHEF_KEPALA" ? 9000000 : 5200000;
        const hygiene = emp.role === "ADMIN_KEUANGAN" ? 0 : 1000000;
        const portionIncentive = ontimePerformanceBonus ? 1500000 : 800000;
        const earlyShift = 1000000;
        const gross = basic + hygiene + portionIncentive + earlyShift;
        const bpjsTk = Math.round(basic * 0.03);
        const bpjsKes = Math.round(basic * 0.01);
        const pph21 = Math.round(gross * 0.02);
        const deductions = bpjsTk + bpjsKes + pph21;
        const net = gross - deductions;

        return {
          id: `PAY-GEN-${Date.now()}-${idx}`,
          payrollCode: `PAY/SPPG-HMN/2026/08/${String(idx + 1).padStart(3, "0")}`,
          period: selectedPeriod,
          employeeId: emp.id,
          nip: emp.nip,
          name: emp.name,
          role: emp.roleLabel,
          bankName: emp.bankAccount.bankName,
          accountNumber: emp.bankAccount.accountNumber,
          basicSalary: basic,
          hygieneAllowance: hygiene,
          portionIncentive,
          earlyShiftAllowance: earlyShift,
          grossSalary: gross,
          bpjsKetenagakerjaanDeduction: bpjsTk,
          bpjsKesehatanDeduction: bpjsKes,
          pph21Deduction: pph21,
          totalDeductions: deductions,
          netSalary: net,
          status: "APPROVED_PPK",
          sp2dNumber: "SP2D-BGN/DKI/2026/08/9912",
        };
      });

      onAdd(generated);
      setIsProcessing(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800 bg-blue-50/50 dark:bg-blue-950/20">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </span>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Kalkulasi Otomatis Payroll & Insentif MBG
              </h3>
              <p className="text-[11px] text-gray-500">Formulasi Gaji Pokok, Tunjangan Higiene, Insentif Porsi & BPJS</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Pilih Bulan & Periode Penggajian *
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
            >
              <option value="Agustus 2026">Agustus 2026</option>
              <option value="September 2026">September 2026</option>
              <option value="Oktober 2026">Oktober 2026</option>
            </select>
          </div>

          <div className="p-3.5 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700 space-y-2.5 text-xs">
            <div className="font-bold text-gray-800 dark:text-gray-200">
              Parameter Perhitungan SPPG:
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={ontimePerformanceBonus}
                onChange={(e) => setOntimePerformanceBonus(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded"
              />
              <span className="text-gray-700 dark:text-gray-300">
                Sertakan Insentif Capaian Pengantaran Tepat Waktu (&gt;98% On-Time Delivery)
              </span>
            </label>

            <div className="text-[11px] text-gray-500 pl-6 space-y-1">
              <p>• UMP DKI Jakarta 2026 diterapkan sebagai basis batas minimum upah dapur.</p>
              <p>• Potongan BPJS Ketenagakerjaan (3%) & BPJS Kesehatan (1%) terhitung otomatis.</p>
              <p>• Tarif PPh 21 Pasal 17 terhitung sesuai status PTKP tenaga kerja.</p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
            >
              Batal
            </button>
            <button
              type="button"
              disabled={isProcessing}
              onClick={handleProcess}
              className="px-4 py-2 text-xs font-semibold text-white bg-brand-500 rounded-xl hover:bg-brand-600 shadow-theme-xs cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? "Menghitung..." : "Jalankan Proses Payroll"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
