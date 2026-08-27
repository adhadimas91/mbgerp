"use client";
import React, { useState } from "react";
import { Employee } from "./EmployeeRegistryTable";

interface SalaryStructureSetupModalProps {
  employee: Employee;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedEmployee: Employee) => void;
}

export default function SalaryStructureSetupModal({
  employee,
  isOpen,
  onClose,
  onSave,
}: SalaryStructureSetupModalProps) {
  // Gaji Pokok
  const defaultBasic =
    employee.role === "KEPALA_SPPG"
      ? 12500000
      : employee.role === "AHLI_GIZI"
      ? 8500000
      : employee.role === "CHEF_KEPALA"
      ? 9000000
      : employee.role === "JURU_MASAK"
      ? 5500000
      : employee.role === "HELPER_DAPUR"
      ? 5067381
      : employee.role === "DRIVER_LOGISTIK"
      ? 5200000
      : 5500000;

  const [basicSalary, setBasicSalary] = useState(defaultBasic);
  const [hygieneAllowance, setHygieneAllowance] = useState(
    employee.role === "ADMIN_KEUANGAN" ? 0 : 1000000
  );
  const [presenceAllowance, setPresenceAllowance] = useState(500000);
  const [portionIncentiveRate, setPortionIncentiveRate] = useState(150); // Rp 150 per porsi
  const [monthlyPortionTarget, setMonthlyPortionTarget] = useState(10000); // 10.000 porsi per bulan
  const [earlyShiftRate, setEarlyShiftRate] = useState(50000); // Rp 50.000 per shift dini hari
  const [earlyShiftCount, setEarlyShiftCount] = useState(20); // 20 shift

  // Pajak & BPJS
  const [ptkpStatus, setPtkpStatus] = useState("TK/0");
  const [includeBpjsTk, setIncludeBpjsTk] = useState(true);
  const [includeBpjsKes, setIncludeBpjsKes] = useState(true);

  // Bank
  const [bankName, setBankName] = useState(employee.bankAccount.bankName);
  const [accountNumber, setAccountNumber] = useState(employee.bankAccount.accountNumber);
  const [accountHolder, setAccountHolder] = useState(employee.bankAccount.accountHolder);

  if (!isOpen) return null;

  // Real-time calculations
  const totalPortionIncentive = (portionIncentiveRate * monthlyPortionTarget) / 1;
  const totalEarlyShift = earlyShiftRate * earlyShiftCount;
  const grossSalary =
    basicSalary +
    hygieneAllowance +
    presenceAllowance +
    totalPortionIncentive +
    totalEarlyShift;

  const bpjsTkDeduction = includeBpjsTk ? Math.round(basicSalary * 0.03) : 0;
  const bpjsKesDeduction = includeBpjsKes ? Math.round(basicSalary * 0.01) : 0;
  const pph21Deduction = Math.round(grossSalary * 0.02);
  const totalDeductions = bpjsTkDeduction + bpjsKesDeduction + pph21Deduction;
  const netTakeHomePay = grossSalary - totalDeductions;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedEmployee: Employee = {
      ...employee,
      bankAccount: {
        bankName,
        accountNumber,
        accountHolder,
      },
    };

    onSave(updatedEmployee);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-white rounded-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Setup Struktur Gaji & Tunjangan Karyawan
              </h3>
              <p className="text-xs text-gray-500 font-mono">
                {employee.name} • {employee.roleLabel} • NIP: {employee.nip}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave}>
          <div className="p-6 max-h-[62vh] overflow-y-auto space-y-6 text-xs">
            {/* 1. UPAY POKOK & TUNJANGAN TETAP */}
            <div className="space-y-3">
              <h4 className="font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center text-[10px]">
                  1
                </span>
                Gaji Pokok & Tunjangan Higiene Dapur
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Gaji Pokok / Upah Dasar (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    value={basicSalary}
                    onChange={(e) => setBasicSalary(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs font-mono font-bold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-500"
                  />
                  <span className="text-[10px] text-gray-500 mt-0.5 block">
                    Basis: UMP DKI 2026 Rp 5.067.381
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Tunjangan Higiene Dapur Steril (Rp)
                  </label>
                  <input
                    type="number"
                    value={hygieneAllowance}
                    onChange={(e) => setHygieneAllowance(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs font-mono font-bold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-500"
                  />
                  <span className="text-[10px] text-gray-500 mt-0.5 block">
                    Insentif Kepatuhan APD & Food Safety
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Tunjangan Kehadiran & Transport (Rp)
                  </label>
                  <input
                    type="number"
                    value={presenceAllowance}
                    onChange={(e) => setPresenceAllowance(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs font-mono font-bold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-500"
                  />
                  <span className="text-[10px] text-gray-500 mt-0.5 block">
                    Absensi 100% tepat waktu
                  </span>
                </div>
              </div>
            </div>

            {/* 2. INSENTIF PORSI & LEMBUR SHIFT */}
            <div className="space-y-3">
              <h4 className="font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center text-[10px]">
                  2
                </span>
                Skema Insentif Output Porsi & Lembur Shift Dini Hari
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/40">
                <div className="space-y-2">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
                    A. Insentif Porsi MBG Terdistribusi Tepat Waktu
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-gray-600 dark:text-gray-400">
                        Tarif per Porsi (Rp)
                      </label>
                      <input
                        type="number"
                        value={portionIncentiveRate}
                        onChange={(e) => setPortionIncentiveRate(parseFloat(e.target.value) || 0)}
                        className="w-full px-2.5 py-1.5 text-xs font-mono font-bold bg-white dark:bg-gray-800 border border-gray-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-600 dark:text-gray-400">
                        Target Porsi/Bulan
                      </label>
                      <input
                        type="number"
                        value={monthlyPortionTarget}
                        onChange={(e) => setMonthlyPortionTarget(parseFloat(e.target.value) || 0)}
                        className="w-full px-2.5 py-1.5 text-xs font-mono font-bold bg-white dark:bg-gray-800 border border-gray-200 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-emerald-700">
                    Subtotal Insentif: {formatRupiah(totalPortionIncentive)}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-amber-800 dark:text-amber-300 block">
                    B. Uang Lembur Shift 1 Dini Hari (02:00 - 07:00 WIB)
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-gray-600 dark:text-gray-400">
                        Tarif per Shift (Rp)
                      </label>
                      <input
                        type="number"
                        value={earlyShiftRate}
                        onChange={(e) => setEarlyShiftRate(parseFloat(e.target.value) || 0)}
                        className="w-full px-2.5 py-1.5 text-xs font-mono font-bold bg-white dark:bg-gray-800 border border-gray-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-600 dark:text-gray-400">
                        Jumlah Shift/Bulan
                      </label>
                      <input
                        type="number"
                        value={earlyShiftCount}
                        onChange={(e) => setEarlyShiftCount(parseFloat(e.target.value) || 0)}
                        className="w-full px-2.5 py-1.5 text-xs font-mono font-bold bg-white dark:bg-gray-800 border border-gray-200 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-amber-700">
                    Subtotal Lembur: {formatRupiah(totalEarlyShift)}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. POTONGAN RESMI BPJS & PAJAK */}
            <div className="space-y-3">
              <h4 className="font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center text-[10px]">
                  3
                </span>
                Parameter Potongan BPJS & Pajak PPh 21
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Status PTKP (Pajak PPh 21)
                  </label>
                  <select
                    value={ptkpStatus}
                    onChange={(e) => setPtkpStatus(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <option value="TK/0">TK/0 - Tidak Kawin (Rp 54 Jt/thn)</option>
                    <option value="K/0">K/0 - Kawin 0 Tanggungan (Rp 58.5 Jt)</option>
                    <option value="K/1">K/1 - Kawin 1 Tanggungan (Rp 63 Jt)</option>
                    <option value="K/2">K/2 - Kawin 2 Tanggungan (Rp 67.5 Jt)</option>
                    <option value="K/3">K/3 - Kawin 3 Tanggungan (Rp 72 Jt)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <span className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                    Kepesertaan BPJS
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeBpjsTk}
                      onChange={(e) => setIncludeBpjsTk(e.target.checked)}
                      className="w-4 h-4 text-brand-600 rounded"
                    />
                    <span>BPJS Ketenagakerjaan (3% Karyawan)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeBpjsKes}
                      onChange={(e) => setIncludeBpjsKes(e.target.checked)}
                      className="w-4 h-4 text-brand-600 rounded"
                    />
                    <span>BPJS Kesehatan (1% Karyawan)</span>
                  </label>
                </div>

                <div>
                  <span className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Estimasi Potongan Bulanan:
                  </span>
                  <div className="space-y-0.5 text-[11px] font-mono">
                    <div className="text-gray-600">BPJS TK: -{formatRupiah(bpjsTkDeduction)}</div>
                    <div className="text-gray-600">BPJS Kes: -{formatRupiah(bpjsKesDeduction)}</div>
                    <div className="text-gray-600">PPh 21: -{formatRupiah(pph21Deduction)}</div>
                    <div className="font-bold text-rose-600 border-t border-gray-200 pt-0.5">
                      Total: -{formatRupiah(totalDeductions)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. REKENING BANK */}
            <div className="space-y-3">
              <h4 className="font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center text-[10px]">
                  4
                </span>
                Rekening Penyaluran Gaji SP2D BUMN
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Bank BUMN Penyalur
                  </label>
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <option value="Bank Mandiri (Persero)">Bank Mandiri (Persero)</option>
                    <option value="Bank Rakyat Indonesia (BRI)">Bank Rakyat Indonesia (BRI)</option>
                    <option value="Bank Negara Indonesia (BNI)">Bank Negara Indonesia (BNI)</option>
                    <option value="Bank Syariah Indonesia (BSI)">Bank Syariah Indonesia (BSI)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Nomor Rekening
                  </label>
                  <input
                    type="text"
                    required
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Nama Pemilik Rekening
                  </label>
                  <input
                    type="text"
                    required
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* SUMMARY TAKE HOME PAY SIMULATION */}
            <div className="p-4 bg-gray-900 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold block">
                  Simulasi Gaji Bersih (Take-Home Pay)
                </span>
                <span className="text-xs text-gray-300">
                  Gross {formatRupiah(grossSalary)} - Potongan {formatRupiah(totalDeductions)}
                </span>
              </div>
              <div className="text-xl font-mono font-black text-emerald-400">
                {formatRupiah(netTakeHomePay)}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            <div className="text-[11px] text-gray-500">
              * Perubahan struktur gaji akan otomatis tersinkronisasi ke siklus payroll SPPG.
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-theme-xs cursor-pointer"
              >
                Simpan Setup Gaji Karyawan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
