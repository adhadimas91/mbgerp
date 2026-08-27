"use client";
import React, { useState } from "react";
import { Employee } from "./EmployeeRegistryTable";

interface EmployeeDetailModalProps {
  employee: Employee;
  isOpen: boolean;
  onClose: () => void;
  onOpenIdCard: () => void;
}

export default function EmployeeDetailModal({
  employee,
  isOpen,
  onClose,
  onOpenIdCard,
}: EmployeeDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "health" | "contract" | "payroll">("overview");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-white rounded-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
        {/* Modal Header with Profile Banner */}
        <div className="relative bg-gradient-to-r from-brand-600 to-indigo-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center font-bold text-2xl shadow-inner shrink-0">
              {employee.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-xl font-bold">{employee.name}</h3>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-white/20 border border-white/30">
                  {employee.status}
                </span>
              </div>
              <p className="text-xs text-white/80 mt-0.5">
                {employee.roleLabel} • <span className="font-mono">{employee.nip}</span>
              </p>
              <p className="text-xs text-white/70">{employee.sppgUnit}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 px-6">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === "overview"
                ? "border-brand-500 text-brand-600 dark:text-brand-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            Ringkasan & Kontak
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("health")}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === "health"
                ? "border-brand-500 text-brand-600 dark:text-brand-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            Kesehatan & Food Safety
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("contract")}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === "contract"
                ? "border-brand-500 text-brand-600 dark:text-brand-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            Penempatan & Legalitas
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("payroll")}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === "payroll"
                ? "border-brand-500 text-brand-600 dark:text-brand-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            Rekening & BPJS
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800">
                <span className="text-xs font-medium text-gray-500 block mb-1">Nomor Induk Kependudukan (NIK)</span>
                <span className="font-mono font-semibold text-gray-900 dark:text-white">{employee.nik}</span>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800">
                <span className="text-xs font-medium text-gray-500 block mb-1">Golongan Darah (K3 Dapur)</span>
                <span className="font-bold text-gray-900 dark:text-white">{employee.bloodType}</span>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800">
                <span className="text-xs font-medium text-gray-500 block mb-1">Nomor WhatsApp / Kontak</span>
                <span className="font-medium text-gray-900 dark:text-white">{employee.phone}</span>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800">
                <span className="text-xs font-medium text-gray-500 block mb-1">Email Kedinasan MBG</span>
                <span className="font-mono text-xs text-brand-600 dark:text-brand-400">{employee.email}</span>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800 md:col-span-2">
                <span className="text-xs font-medium text-gray-500 block mb-1">Stasiun Kerja / Lini Dapur Utama</span>
                <span className="font-semibold text-gray-900 dark:text-white">{employee.station}</span>
              </div>
            </div>
          )}

          {/* TAB 2: HEALTH */}
          {activeTab === "health" && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl dark:bg-emerald-500/10 dark:border-emerald-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                    Sertifikat Penjamah Makanan Kemenkes RI
                  </span>
                  <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                    {employee.foodHandlerCert.status}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500 block">No. Sertifikat:</span>
                    <span className="font-mono font-semibold text-gray-900 dark:text-white">{employee.foodHandlerCert.number}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Instansi Penerbit:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{employee.foodHandlerCert.issuer}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Tanggal Terbit:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{employee.foodHandlerCert.issuedDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Masa Berlaku Hingga:</span>
                    <span className="font-medium text-emerald-700 dark:text-emerald-400 font-bold">{employee.foodHandlerCert.expiryDate}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-cyan-50/60 border border-cyan-200 rounded-xl dark:bg-cyan-500/10 dark:border-cyan-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-cyan-800 dark:text-cyan-300 uppercase tracking-wider">
                    Hasil Uji Laboratorium & Rekam MCU Dapur
                  </span>
                  <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300">
                    {employee.mcuStatus.status}
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg">
                    <span>Swab Rektal (Salmonella typhi & Bakteri Patogen Pangan):</span>
                    <span className="font-bold text-emerald-600">Negatif (Lolos Uji)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg">
                    <span>Rontgen Toraks (Skrining Tuberkulosis / TBC):</span>
                    <span className="font-bold text-emerald-600">Sehat (Paru Bersih)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg">
                    <span>Uji Serologi Hepatitis A (Anti-HAV IgM):</span>
                    <span className="font-bold text-emerald-600">Non-Reaktif</span>
                  </div>
                </div>
                <div className="mt-3 text-[11px] text-gray-500 flex justify-between">
                  <span>MCU Terakhir: {employee.mcuStatus.lastCheckDate}</span>
                  <span>Jadwal MCU Berikutnya: {employee.mcuStatus.nextCheckDate}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTRACT */}
          {activeTab === "contract" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800">
                <span className="text-xs font-medium text-gray-500 block mb-1">Status Ikatan Kerja</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {employee.contractType === "PKWTT_TETAP" ? "Karyawan Tetap (PKWTT BGN)" : "Perjanjian Kerja Waktu Tertentu (PKWT)"}
                </span>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800">
                <span className="text-xs font-medium text-gray-500 block mb-1">Tanggal Mulai Dinas</span>
                <span className="font-medium text-gray-900 dark:text-white">{employee.joinDate}</span>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800 md:col-span-2">
                <span className="text-xs font-medium text-gray-500 block mb-1">Divisi & Penempatan SPPG</span>
                <span className="font-medium text-gray-900 dark:text-white">{employee.department} • {employee.sppgUnit}</span>
              </div>
            </div>
          )}

          {/* TAB 4: PAYROLL */}
          {activeTab === "payroll" && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800 space-y-3">
                <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Rekening Bank Penyaluran Gaji
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500 block">Bank:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{employee.bankAccount.bankName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">No. Rekening:</span>
                    <span className="font-mono font-bold text-gray-900 dark:text-white">{employee.bankAccount.accountNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Atas Nama:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{employee.bankAccount.accountHolder}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800 space-y-3">
                <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Jaminan Sosial Ketenagakerjaan & Kesehatan
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500 block">BPJS Ketenagakerjaan (JKK/JKM/JHT/JP):</span>
                    <span className="font-mono font-bold text-gray-900 dark:text-white">{employee.bpjsKetenagakerjaan}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">BPJS Kesehatan:</span>
                    <span className="font-mono font-bold text-gray-900 dark:text-white">{employee.bpjsKesehatan}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenIdCard}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-theme-xs cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
              Cetak ID Card
            </button>

            <a
              href="/employees/payroll"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 rounded-xl transition-colors dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Kelola Gaji (Payroll)
            </a>
          </div>

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
