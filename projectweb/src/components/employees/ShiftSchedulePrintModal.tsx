"use client";
import React from "react";
import { ShiftRosterItem } from "./ShiftScheduleManager";

interface ShiftSchedulePrintModalProps {
  shifts: ShiftRosterItem[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ShiftSchedulePrintModal({
  shifts,
  isOpen,
  onClose,
}: ShiftSchedulePrintModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden print:m-0 print:border-none print:shadow-none">
        {/* Controls */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 print:hidden">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </span>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Cetak Jadwal Shift & Roster Kerja Dapur MBG
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
              Cetak Dokumen Resmi
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

        {/* Official Printable Document */}
        <div className="p-8 bg-white text-gray-900 font-sans print:p-0">
          {/* Header Kop Surat BGN */}
          <div className="border-b-2 border-gray-900 pb-4 mb-6 text-center relative">
            <div className="text-xs uppercase tracking-widest font-semibold text-gray-600">
              REPUBLIK INDONESIA • BADAN GIZI NASIONAL (BGN)
            </div>
            <div className="text-lg font-black tracking-wide text-gray-900 mt-0.5">
              SATUAN PELAYANAN PROGRAM GIZI (SPPG) HARMONI GAMBIR
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Jl. Kebon Sirih No. 45, Gambir, Jakarta Pusat 10110 • Telp: (021) 384-9921 • Email: sppg.harmoni@mbg.go.id
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-base font-black uppercase underline decoration-1 underline-offset-4">
              JADWAL TUGAS SHIFT OPERASIONAL & ROSTER TENAGA KERJA
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Nomor: MBG/SPPG-HMN/ROSTER/VIII/2026/041 • Periode: 27 Agustus 2026 s/d 02 September 2026
            </p>
          </div>

          {/* Table */}
          <table className="w-full text-left text-xs border border-gray-300 mb-6">
            <thead className="bg-gray-100 font-bold border-b border-gray-300">
              <tr>
                <th className="p-2 border-r border-gray-300">No</th>
                <th className="p-2 border-r border-gray-300">NIP & Nama Karyawan</th>
                <th className="p-2 border-r border-gray-300">Jabatan / Peran</th>
                <th className="p-2 border-r border-gray-300">Shift & Jam Dinas</th>
                <th className="p-2 border-r border-gray-300">Stasiun Kerja Dapur</th>
                <th className="p-2 border-r border-gray-300">Suhu & Higiene</th>
                <th className="p-2">Paraf Petugas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {shifts.map((s, idx) => (
                <tr key={s.id}>
                  <td className="p-2 border-r border-gray-300 text-center font-mono">{idx + 1}</td>
                  <td className="p-2 border-r border-gray-300">
                    <div className="font-bold">{s.employeeName}</div>
                    <div className="text-[10px] text-gray-500 font-mono">{s.nip}</div>
                  </td>
                  <td className="p-2 border-r border-gray-300">{s.role}</td>
                  <td className="p-2 border-r border-gray-300 font-mono font-semibold">{s.shiftTime}</td>
                  <td className="p-2 border-r border-gray-300">{s.station}</td>
                  <td className="p-2 border-r border-gray-300">
                    {s.healthCheck ? `${s.healthCheck.temperature}°C (Lolos)` : "Terjadwal"}
                  </td>
                  <td className="p-2 text-center text-gray-400 font-serif italic">[ Paraf ]</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Signature Block */}
          <div className="grid grid-cols-2 gap-8 text-xs pt-6 mt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-600">Diverifikasi oleh QC Lead Auditor:</p>
              <div className="h-16 flex items-center justify-center italic text-gray-400">
                [ Tanda Tangan Digital ]
              </div>
              <p className="font-bold underline">Ratna Kusuma, S.Si.</p>
              <p className="text-[10px] text-gray-500">NIP. MBG-SPPG-2026-007</p>
            </div>

            <div className="text-center">
              <p className="text-gray-600">Mengetahui & Menyetujui, Kepala SPPG:</p>
              <div className="h-16 flex items-center justify-center italic text-gray-400">
                [ Tanda Tangan Digital & Stempel ]
              </div>
              <p className="font-bold underline">Dr. Hendra Gunawan, S.TP., M.Si.</p>
              <p className="text-[10px] text-gray-500">NIP. MBG-SPPG-2026-001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
