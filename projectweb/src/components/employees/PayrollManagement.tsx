"use client";
import React, { useState } from "react";
import ProcessPayrollModal from "./ProcessPayrollModal";
import PayrollDetailModal from "./PayrollDetailModal";
import PayrollSlipPrintModal from "./PayrollSlipPrintModal";
import SalaryStructureSetupModal from "./SalaryStructureSetupModal";
import { INITIAL_EMPLOYEES, Employee } from "./EmployeeRegistryTable";

export interface PayrollRecord {
  id: string;
  payrollCode: string;
  period: string; // e.g. "Agustus 2026"
  employeeId: string;
  nip: string;
  name: string;
  role: string;
  bankName: string;
  accountNumber: string;
  basicSalary: number;
  hygieneAllowance: number;
  portionIncentive: number; // Insentif porsi terdistribusi
  earlyShiftAllowance: number; // Lembur shift dini hari
  grossSalary: number;
  bpjsKetenagakerjaanDeduction: number;
  bpjsKesehatanDeduction: number;
  pph21Deduction: number;
  totalDeductions: number;
  netSalary: number;
  status: "DRAFT" | "VERIFIKASI_SPPG" | "APPROVED_PPK" | "PAID_TRANSFER";
  paidDate?: string;
  sp2dNumber?: string;
}

export const INITIAL_PAYROLL: PayrollRecord[] = [
  {
    id: "PAY-2026-08-01",
    payrollCode: "PAY/SPPG-HMN/2026/08/001",
    period: "Agustus 2026",
    employeeId: "EMP-001",
    nip: "MBG-SPPG-2026-001",
    name: "Dr. Hendra Gunawan, S.TP., M.Si.",
    role: "Kepala SPPG",
    bankName: "Bank Mandiri (Persero)",
    accountNumber: "137-00-1928374-1",
    basicSalary: 12500000,
    hygieneAllowance: 1500000,
    portionIncentive: 2500000,
    earlyShiftAllowance: 1000000,
    grossSalary: 17500000,
    bpjsKetenagakerjaanDeduction: 350000,
    bpjsKesehatanDeduction: 175000,
    pph21Deduction: 425000,
    totalDeductions: 950000,
    netSalary: 16550000,
    status: "APPROVED_PPK",
    sp2dNumber: "SP2D-BGN/DKI/2026/08/9912",
  },
  {
    id: "PAY-2026-08-02",
    payrollCode: "PAY/SPPG-HMN/2026/08/002",
    period: "Agustus 2026",
    employeeId: "EMP-002",
    nip: "MBG-SPPG-2026-002",
    name: "Nurul Aini, S.Gz., Dietisien",
    role: "Ahli Gizi",
    bankName: "Bank Rakyat Indonesia (BRI)",
    accountNumber: "0341-01-002918-50-3",
    basicSalary: 8500000,
    hygieneAllowance: 1200000,
    portionIncentive: 1800000,
    earlyShiftAllowance: 800000,
    grossSalary: 12300000,
    bpjsKetenagakerjaanDeduction: 246000,
    bpjsKesehatanDeduction: 123000,
    pph21Deduction: 185000,
    totalDeductions: 554000,
    netSalary: 11746000,
    status: "APPROVED_PPK",
    sp2dNumber: "SP2D-BGN/DKI/2026/08/9912",
  },
  {
    id: "PAY-2026-08-03",
    payrollCode: "PAY/SPPG-HMN/2026/08/003",
    period: "Agustus 2026",
    employeeId: "EMP-003",
    nip: "MBG-SPPG-2026-003",
    name: "Chef Bambang Sutrisno",
    role: "Head Chef",
    bankName: "Bank Negara Indonesia (BNI)",
    accountNumber: "0892-8172-34",
    basicSalary: 9000000,
    hygieneAllowance: 1200000,
    portionIncentive: 2000000,
    earlyShiftAllowance: 1500000,
    grossSalary: 13700000,
    bpjsKetenagakerjaanDeduction: 274000,
    bpjsKesehatanDeduction: 137000,
    pph21Deduction: 215000,
    totalDeductions: 626000,
    netSalary: 13074000,
    status: "APPROVED_PPK",
    sp2dNumber: "SP2D-BGN/DKI/2026/08/9912",
  },
  {
    id: "PAY-2026-08-04",
    payrollCode: "PAY/SPPG-HMN/2026/08/004",
    period: "Agustus 2026",
    employeeId: "EMP-004",
    nip: "MBG-SPPG-2026-004",
    name: "Siti Rahmawati",
    role: "Juru Masak",
    bankName: "Bank Syariah Indonesia (BSI)",
    accountNumber: "7192-8374-01",
    basicSalary: 5500000,
    hygieneAllowance: 900000,
    portionIncentive: 1200000,
    earlyShiftAllowance: 1200000,
    grossSalary: 8800000,
    bpjsKetenagakerjaanDeduction: 176000,
    bpjsKesehatanDeduction: 88000,
    pph21Deduction: 80000,
    totalDeductions: 344000,
    netSalary: 8456000,
    status: "APPROVED_PPK",
    sp2dNumber: "SP2D-BGN/DKI/2026/08/9912",
  },
  {
    id: "PAY-2026-08-05",
    payrollCode: "PAY/SPPG-HMN/2026/08/005",
    period: "Agustus 2026",
    employeeId: "EMP-005",
    nip: "MBG-SPPG-2026-005",
    name: "Agus Pratama",
    role: "Helper Dapur",
    bankName: "Bank Rakyat Indonesia (BRI)",
    accountNumber: "0219-01-098234-50-9",
    basicSalary: 5067381, // UMP DKI 2026
    hygieneAllowance: 750000,
    portionIncentive: 1000000,
    earlyShiftAllowance: 800000,
    grossSalary: 7617381,
    bpjsKetenagakerjaanDeduction: 152347,
    bpjsKesehatanDeduction: 76173,
    pph21Deduction: 45000,
    totalDeductions: 273520,
    netSalary: 7343861,
    status: "APPROVED_PPK",
    sp2dNumber: "SP2D-BGN/DKI/2026/08/9912",
  },
  {
    id: "PAY-2026-08-06",
    payrollCode: "PAY/SPPG-HMN/2026/08/006",
    period: "Agustus 2026",
    employeeId: "EMP-006",
    nip: "MBG-SPPG-2026-006",
    name: "Rian Hidayat",
    role: "Driver Logistik",
    bankName: "Bank Mandiri (Persero)",
    accountNumber: "137-00-8817263-4",
    basicSalary: 5200000,
    hygieneAllowance: 600000,
    portionIncentive: 1100000,
    earlyShiftAllowance: 900000,
    grossSalary: 7800000,
    bpjsKetenagakerjaanDeduction: 156000,
    bpjsKesehatanDeduction: 78000,
    pph21Deduction: 55000,
    totalDeductions: 289000,
    netSalary: 7511000,
    status: "APPROVED_PPK",
    sp2dNumber: "SP2D-BGN/DKI/2026/08/9912",
  },
];

export default function PayrollManagement() {
  const [payrolls, setPayrolls] = useState<PayrollRecord[]>(INITIAL_PAYROLL);
  const [selectedPeriod, setSelectedPeriod] = useState("Agustus 2026");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [selectedPayrollDetail, setSelectedPayrollDetail] = useState<PayrollRecord | null>(null);
  const [selectedPayrollSlip, setSelectedPayrollSlip] = useState<PayrollRecord | null>(null);
  const [selectedSalarySetup, setSelectedSalarySetup] = useState<Employee | null>(null);

  const filteredPayrolls = payrolls.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.payrollCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchPeriod = p.period === selectedPeriod;
    return matchSearch && matchPeriod;
  });

  const totalGross = payrolls.reduce((acc, curr) => acc + curr.grossSalary, 0);
  const totalNet = payrolls.reduce((acc, curr) => acc + curr.netSalary, 0);
  const totalIncentives = payrolls.reduce((acc, curr) => acc + curr.portionIncentive, 0);
  const totalDeductions = payrolls.reduce((acc, curr) => acc + curr.totalDeductions, 0);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleAddPayrolls = (newRecords: PayrollRecord[]) => {
    setPayrolls((prev) => [...newRecords, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-theme-xs">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Total Take-Home Pay (Net)
          </span>
          <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
            {formatRupiah(totalNet)}
          </h3>
          <p className="mt-1 text-xs text-gray-500">Periode: {selectedPeriod}</p>
        </div>

        <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-theme-xs">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Insentif Porsi MBG
          </span>
          <h3 className="mt-2 text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {formatRupiah(totalIncentives)}
          </h3>
          <p className="mt-1 text-xs text-gray-500">Kinerja Pengantaran Tepat Waktu</p>
        </div>

        <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-theme-xs">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Potongan BPJS & PPh 21
          </span>
          <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
            {formatRupiah(totalDeductions)}
          </h3>
          <p className="mt-1 text-xs text-gray-500">Jamsostek, JKN & Pajak Kas Negara</p>
        </div>

        <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-theme-xs">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Status Otorisasi Anggaran
          </span>
          <h3 className="mt-2 text-xl font-bold text-blue-600 dark:text-blue-400">
            APPROVED PPK
          </h3>
          <p className="mt-1 text-xs font-mono text-gray-500">SP2D-BGN/DKI/2026/08/9912</p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="p-6 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-theme-xs">
        {/* Table Controls */}
        <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Cari Nama Karyawan, NIP, Kode Slip..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:bg-gray-900/50 dark:border-gray-700 dark:text-white"
              />
              <svg
                className="w-4 h-4 text-gray-400 absolute left-3.5 top-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:bg-gray-900/50 dark:border-gray-700 dark:text-white"
            >
              <option value="Agustus 2026">Periode: Agustus 2026</option>
              <option value="Juli 2026">Periode: Juli 2026</option>
              <option value="Juni 2026">Periode: Juni 2026</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedSalarySetup(INITIAL_EMPLOYEES[0])}
              className="flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 rounded-xl transition-colors dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Setup Standar Gaji & Tarif
            </button>

            <button
              onClick={() => setIsProcessModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white transition-colors rounded-xl bg-brand-500 hover:bg-brand-600 shadow-theme-xs cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Hitung & Generate Payroll
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-800">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500 border-b border-gray-200 dark:bg-gray-900/50 dark:border-gray-800 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3.5">Kode & Karyawan</th>
                <th className="px-4 py-3.5">Gaji Pokok</th>
                <th className="px-4 py-3.5">Tunjangan & Insentif</th>
                <th className="px-4 py-3.5">Potongan (BPJS/Pajak)</th>
                <th className="px-4 py-3.5">Gaji Bersih (THP)</th>
                <th className="px-4 py-3.5">Rekening Bank</th>
                <th className="px-4 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
              {filteredPayrolls.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-900/30 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {p.name}
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      {p.role} • {p.nip}
                    </div>
                    <div className="text-[10px] font-mono text-brand-600 dark:text-brand-400 mt-0.5">
                      {p.payrollCode}
                    </div>
                  </td>

                  <td className="px-4 py-3.5 font-mono text-xs font-medium text-gray-900 dark:text-gray-200">
                    {formatRupiah(p.basicSalary)}
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      +{formatRupiah(p.hygieneAllowance + p.portionIncentive + p.earlyShiftAllowance)}
                    </div>
                    <div className="text-[10px] text-gray-500">
                      Insentif Porsi: {formatRupiah(p.portionIncentive)}
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="font-mono text-xs text-rose-600 dark:text-rose-400">
                      -{formatRupiah(p.totalDeductions)}
                    </div>
                    <div className="text-[10px] text-gray-500">
                      BPJS: {formatRupiah(p.bpjsKetenagakerjaanDeduction + p.bpjsKesehatanDeduction)}
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="font-mono text-sm font-bold text-gray-900 dark:text-white">
                      {formatRupiah(p.netSalary)}
                    </div>
                    <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300">
                      {p.status}
                    </span>
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="text-xs font-medium text-gray-900 dark:text-white">
                      {p.bankName}
                    </div>
                    <div className="text-xs font-mono text-gray-500">
                      {p.accountNumber}
                    </div>
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          const matchedEmp = INITIAL_EMPLOYEES.find((e) => e.nip === p.nip) || INITIAL_EMPLOYEES[0];
                          setSelectedSalarySetup(matchedEmp);
                        }}
                        title="Atur Struktur Gaji Karyawan"
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg dark:hover:bg-emerald-500/10 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setSelectedPayrollSlip(p)}
                        title="Cetak Slip Gaji Resmi"
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg dark:hover:bg-blue-500/10 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setSelectedPayrollDetail(p)}
                        title="Rincian Komponen Gaji"
                        className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {isProcessModalOpen && (
        <ProcessPayrollModal
          isOpen={isProcessModalOpen}
          period={selectedPeriod}
          onClose={() => setIsProcessModalOpen(false)}
          onAdd={handleAddPayrolls}
        />
      )}

      {selectedPayrollDetail && (
        <PayrollDetailModal
          payroll={selectedPayrollDetail}
          isOpen={!!selectedPayrollDetail}
          onClose={() => setSelectedPayrollDetail(null)}
          onOpenSlip={() => {
            const pay = selectedPayrollDetail;
            setSelectedPayrollDetail(null);
            setSelectedPayrollSlip(pay);
          }}
        />
      )}

      {selectedPayrollSlip && (
        <PayrollSlipPrintModal
          payroll={selectedPayrollSlip}
          isOpen={!!selectedPayrollSlip}
          onClose={() => setSelectedPayrollSlip(null)}
        />
      )}

      {/* Salary Structure Setup Modal */}
      {selectedSalarySetup && (
        <SalaryStructureSetupModal
          employee={selectedSalarySetup}
          isOpen={!!selectedSalarySetup}
          onClose={() => setSelectedSalarySetup(null)}
          onSave={() => {
            // Update payroll records when structure changes
          }}
        />
      )}
    </div>
  );
}
