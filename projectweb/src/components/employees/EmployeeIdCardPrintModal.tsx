"use client";
import React from "react";
import { Employee } from "./EmployeeRegistryTable";

interface EmployeeIdCardPrintModalProps {
  employee: Employee;
  isOpen: boolean;
  onClose: () => void;
}

export default function EmployeeIdCardPrintModal({
  employee,
  isOpen,
  onClose,
}: EmployeeIdCardPrintModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden print:m-0 print:border-none print:shadow-none">
        {/* Modal Controls (Hidden during print) */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 print:hidden">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
            </span>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Cetak ID Badge Tenaga Kerja Resmi MBG
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
              Cetak ID Badge
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

        {/* ID Badge Container (Front & Back cards) */}
        <div className="p-8 bg-gray-100 dark:bg-gray-950 flex flex-col sm:flex-row items-center justify-center gap-8 print:p-0 print:bg-white">
          {/* FRONT CARD */}
          <div className="w-72 h-[450px] bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col justify-between relative print:shadow-none print:border-gray-400">
            {/* Top Header */}
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-3 text-center text-white relative">
              <div className="text-[9px] uppercase tracking-wider font-semibold text-emerald-100">
                Republik Indonesia
              </div>
              <div className="text-xs font-black tracking-wide">
                BADAN GIZI NASIONAL (BGN)
              </div>
              <div className="text-[8px] text-emerald-100">
                SATUAN PELAYANAN PROGRAM GIZI (SPPG)
              </div>
            </div>

            {/* Badge Body */}
            <div className="p-4 flex flex-col items-center text-center flex-1 justify-center space-y-2">
              {/* Photo Frame */}
              <div className="relative">
                <div className="w-24 h-28 rounded-xl bg-gradient-to-tr from-gray-200 to-gray-300 border-2 border-emerald-500 shadow-md flex items-center justify-center text-gray-600 font-bold text-3xl overflow-hidden">
                  {employee.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1 rounded-full border border-white shadow text-[10px]">
                  ✓
                </div>
              </div>

              {/* Name & Role */}
              <div className="pt-2">
                <h4 className="text-sm font-black text-gray-900 leading-tight">
                  {employee.name}
                </h4>
                <div className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
                  {employee.roleLabel}
                </div>
                <p className="text-[9px] text-gray-500 font-medium mt-0.5">
                  {employee.sppgUnit.split("-")[0]}
                </p>
              </div>

              {/* Badges / Micro Info */}
              <div className="flex items-center gap-2 pt-1">
                <span className="px-2 py-0.5 bg-gray-100 rounded text-[9px] font-mono font-bold text-gray-700">
                  GOL: {employee.bloodType}
                </span>
                {employee.foodHandlerCert.status === "VALID" && (
                  <span className="px-2 py-0.5 bg-blue-50 border border-blue-200 rounded text-[9px] font-bold text-blue-700">
                    FOOD HANDLER
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Barcode & NIP */}
            <div className="bg-gray-50 p-3 border-t border-gray-200 text-center flex flex-col items-center">
              <div className="font-mono text-[9px] font-bold text-gray-800">
                NIP: {employee.nip}
              </div>
              {/* Barcode Simulator */}
              <div className="flex items-center gap-0.5 h-6 mt-1">
                {[2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 1, 4, 2, 1, 3, 2, 1, 4, 2, 1, 2, 3, 1, 2].map((w, i) => (
                  <div
                    key={i}
                    className="bg-black h-full"
                    style={{ width: `${w * 1.5}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* BACK CARD */}
          <div className="w-72 h-[450px] bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col justify-between relative p-4 text-[9px] text-gray-600 print:shadow-none print:border-gray-400">
            <div>
              <div className="text-center font-bold text-gray-900 border-b border-gray-200 pb-2 text-[10px]">
                KETENTUAN PEMEGANG KARTU
              </div>
              <ul className="list-disc pl-4 space-y-1.5 mt-3 text-justify">
                <li>Kartu ini adalah tanda pengenal resmi staf operasional Program MBG BGN.</li>
                <li>Wajib dikenakan selama berada di lingkungan Dapur Sentral SPPG dan saat pengantaran logistik.</li>
                <li>Pemegang kartu telah tersertifikasi Higiene Sanitasi Makanan Kemenkes RI No: {employee.foodHandlerCert.number}.</li>
                <li>Skrining suhu tubuh dan higienitas wajib dilakukan setiap hari sebelum masuk dapur.</li>
                <li>Apabila menemukan kartu ini, harap kembalikan ke Kantor Satuan Pelayanan MBG terdekat.</li>
              </ul>
            </div>

            {/* QR Code Simulator */}
            <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-20 h-20 bg-white border border-gray-300 p-1 flex items-center justify-center">
                <svg className="w-full h-full text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 3h7v7H3V3zm2 2v3h3V5H5zm8-2h7v7h-7V3zm2 2v3h3V5h-3zM3 13h7v7H3v-7zm2 2v3h3v-3H5zm13-2h3v2h-3v-2zm-5 0h2v3h-2v-3zm2 3h3v2h-3v-2zm3 2h3v3h-3v-3zm-5 1h2v2h-2v-2zm-3-3h3v2h-3v-2z" />
                </svg>
              </div>
              <span className="text-[8px] font-mono text-gray-500 mt-1">
                VERIFIED FOOD SAFETY MBG
              </span>
            </div>

            {/* Stempel Digital */}
            <div className="text-center text-[8px] text-gray-500 border-t border-gray-200 pt-2">
              Diterbitkan oleh BGN - SPPG DKI Jakarta • Masa Berlaku: 2026-2029
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
