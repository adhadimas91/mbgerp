"use client";
import React, { useState } from "react";
import { ShiftRosterItem } from "./ShiftScheduleManager";

interface DailyAttendanceModalProps {
  isOpen: boolean;
  shifts: ShiftRosterItem[];
  onClose: () => void;
  onUpdate: (shift: ShiftRosterItem) => void;
}

export default function DailyAttendanceModal({
  isOpen,
  shifts,
  onClose,
  onUpdate,
}: DailyAttendanceModalProps) {
  const [selectedShiftId, setSelectedShiftId] = useState(shifts[0]?.id || "");
  const [temperature, setTemperature] = useState(36.4);
  const [handWoundFree, setHandWoundFree] = useState(true);
  const [fluSymptomsFree, setFluSymptomsFree] = useState(true);
  const [ppeComplete, setPpeComplete] = useState(true);
  const [auditorName, setAuditorName] = useState("Ratna Kusuma, S.Si. (Lead QC Auditor)");

  if (!isOpen) return null;

  const currentShift = shifts.find((s) => s.id === selectedShiftId) || shifts[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentShift) return;

    const isCleared = temperature <= 37.3 && handWoundFree && fluSymptomsFree && ppeComplete;

    const updatedShift: ShiftRosterItem = {
      ...currentShift,
      status: isCleared ? "HADIR_LOLOS_SCREENING" : "TIDAK_LOLOS_SCREENING",
      healthCheck: {
        temperature,
        handWoundFree,
        fluSymptomsFree,
        ppeComplete,
        checkedBy: auditorName,
        checkedAt: "05:15 WIB",
      },
    };

    onUpdate(updatedShift);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800 bg-emerald-50/50 dark:bg-emerald-950/20">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </span>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Skrining Masuk Dapur Steril ISO 22000
              </h3>
              <p className="text-[11px] text-gray-500">Pemeriksaan Suhu Tubuh & Gejala Klinis Sebelum Masuk Dapur</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Pilih Tenaga Kerja Bertugas *
            </label>
            <select
              value={selectedShiftId}
              onChange={(e) => setSelectedShiftId(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
            >
              {shifts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.employeeName} ({s.shiftTime} - {s.station})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Pengukuran Suhu Tubuh (°C) - Maksimal 37.3°C *
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                step="0.1"
                required
                min={35.0}
                max={41.0}
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-32 px-3 py-2 text-sm font-mono font-bold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
              />
              <span className={`text-xs font-bold ${temperature <= 37.3 ? "text-emerald-600" : "text-rose-600"}`}>
                {temperature <= 37.3 ? "✓ Suhu Normal (Layak Masuk)" : "⚠ Suhu Tinggi (Dilarang Masuk Dapur)"}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700 space-y-2 text-xs">
            <div className="font-bold text-gray-800 dark:text-gray-200 mb-1">
              Ceklis Bebas Kontaminasi Biologis:
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={handWoundFree}
                onChange={(e) => setHandWoundFree(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded"
              />
              <span>Bebas luka terbuka, koreng, atau infeksi kulit pada kedua tangan</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={fluSymptomsFree}
                onChange={(e) => setFluSymptomsFree(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded"
              />
              <span>Bebas gejala batuk, pilek, bersin, dan diare 24 jam terakhir</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={ppeComplete}
                onChange={(e) => setPpeComplete(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded"
              />
              <span>Kelengkapan APD: Hairnet/Penutup Kepala, Celemek Bersih, Masker, Sepatu Boot</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Auditor QC Penanggung Jawab Pintu Masuk
            </label>
            <input
              type="text"
              value={auditorName}
              onChange={(e) => setAuditorName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
            />
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
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-theme-xs cursor-pointer"
            >
              Verifikasi & Izinkan Masuk Dapur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
