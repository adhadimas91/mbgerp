"use client";
import React, { useState } from "react";
import { ShiftRosterItem } from "./ShiftScheduleManager";
import { INITIAL_EMPLOYEES } from "./EmployeeRegistryTable";

interface CreateShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (shift: ShiftRosterItem) => void;
}

export default function CreateShiftModal({
  isOpen,
  onClose,
  onAdd,
}: CreateShiftModalProps) {
  const [selectedEmpNip, setSelectedEmpNip] = useState(INITIAL_EMPLOYEES[0].nip);
  const [shiftType, setShiftType] = useState<ShiftRosterItem["shiftType"]>("SHIFT_1_DINI_HARI");
  const [shiftDate, setShiftDate] = useState("2026-08-28");
  const [station, setStation] = useState("Dapur Panas (Main Kitchen Line 1)");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = INITIAL_EMPLOYEES.find((e) => e.nip === selectedEmpNip) || INITIAL_EMPLOYEES[0];

    const getShiftTime = (type: ShiftRosterItem["shiftType"]) => {
      switch (type) {
        case "SHIFT_1_DINI_HARI": return "02:00 - 07:00 WIB";
        case "SHIFT_2_MASAK_PACKING": return "05:00 - 11:00 WIB";
        case "SHIFT_3_DISTRIBUSI_CLEAN": return "09:00 - 16:00 WIB";
      }
    };

    const newShift: ShiftRosterItem = {
      id: `SFT-0${Math.floor(10 + Math.random() * 90)}`,
      employeeName: emp.name,
      nip: emp.nip,
      role: emp.roleLabel,
      station: station || emp.station,
      shiftType,
      shiftTime: getShiftTime(shiftType),
      date: shiftDate,
      dayName: "Jumat",
      status: "TERJADWAL",
    };

    onAdd(newShift);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Penugasan Shift Dapur & Distribusi MBG
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Pilih Tenaga Kerja *
            </label>
            <select
              value={selectedEmpNip}
              onChange={(e) => setSelectedEmpNip(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
            >
              {INITIAL_EMPLOYEES.map((emp) => (
                <option key={emp.id} value={emp.nip}>
                  {emp.name} ({emp.roleLabel} - {emp.nip})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Tanggal Penugasan *
            </label>
            <input
              type="date"
              required
              value={shiftDate}
              onChange={(e) => setShiftDate(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Pilihan Shift Operasional *
            </label>
            <select
              value={shiftType}
              onChange={(e) => setShiftType(e.target.value as ShiftRosterItem["shiftType"])}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
            >
              <option value="SHIFT_1_DINI_HARI">Shift 1 (02:00 - 07:00 WIB) - Masak Subuh</option>
              <option value="SHIFT_2_MASAK_PACKING">Shift 2 (05:00 - 11:00 WIB) - Packing & Distribusi Pagi</option>
              <option value="SHIFT_3_DISTRIBUSI_CLEAN">Shift 3 (09:00 - 16:00 WIB) - Distribusi Siang & Sanitasi</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Stasiun Kerja Spesifik Dapur
            </label>
            <input
              type="text"
              value={station}
              onChange={(e) => setStation(e.target.value)}
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
              className="px-4 py-2 text-xs font-semibold text-white bg-brand-500 rounded-xl hover:bg-brand-600 shadow-theme-xs cursor-pointer"
            >
              Jadwalkan Shift
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
