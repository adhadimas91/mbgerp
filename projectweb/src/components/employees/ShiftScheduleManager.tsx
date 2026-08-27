"use client";
import React, { useState } from "react";
import CreateShiftModal from "./CreateShiftModal";
import DailyAttendanceModal from "./DailyAttendanceModal";
import ShiftSchedulePrintModal from "./ShiftSchedulePrintModal";

export interface ShiftRosterItem {
  id: string;
  employeeName: string;
  nip: string;
  role: string;
  station: string;
  shiftType: "SHIFT_1_DINI_HARI" | "SHIFT_2_MASAK_PACKING" | "SHIFT_3_DISTRIBUSI_CLEAN";
  shiftTime: string;
  date: string;
  dayName: string;
  status: "TERJADWAL" | "HADIR_LOLOS_SCREENING" | "TERLAMBAT" | "IZIN_SAKIT" | "TIDAK_LOLOS_SCREENING";
  healthCheck?: {
    temperature: number;
    handWoundFree: boolean;
    fluSymptomsFree: boolean;
    ppeComplete: boolean;
    checkedBy: string;
    checkedAt: string;
  };
}

export const INITIAL_SHIFTS: ShiftRosterItem[] = [
  {
    id: "SFT-001",
    employeeName: "Chef Bambang Sutrisno",
    nip: "MBG-SPPG-2026-003",
    role: "Head Chef",
    station: "Dapur Panas (Main Kitchen Line 1)",
    shiftType: "SHIFT_1_DINI_HARI",
    shiftTime: "02:00 - 07:00 WIB",
    date: "2026-08-27",
    dayName: "Kamis",
    status: "HADIR_LOLOS_SCREENING",
    healthCheck: {
      temperature: 36.4,
      handWoundFree: true,
      fluSymptomsFree: true,
      ppeComplete: true,
      checkedBy: "Ratna Kusuma (QC Auditor)",
      checkedAt: "01:50 WIB",
    },
  },
  {
    id: "SFT-002",
    employeeName: "Siti Rahmawati",
    nip: "MBG-SPPG-2026-004",
    role: "Juru Masak",
    station: "Stasiun Pengukus & Tumis",
    shiftType: "SHIFT_1_DINI_HARI",
    shiftTime: "02:00 - 07:00 WIB",
    date: "2026-08-27",
    dayName: "Kamis",
    status: "HADIR_LOLOS_SCREENING",
    healthCheck: {
      temperature: 36.5,
      handWoundFree: true,
      fluSymptomsFree: true,
      ppeComplete: true,
      checkedBy: "Ratna Kusuma (QC Auditor)",
      checkedAt: "01:52 WIB",
    },
  },
  {
    id: "SFT-003",
    employeeName: "Nurul Aini, S.Gz.",
    nip: "MBG-SPPG-2026-002",
    role: "Ahli Gizi",
    station: "Lab Uji Organoleptik & AKG",
    shiftType: "SHIFT_2_MASAK_PACKING",
    shiftTime: "05:00 - 11:00 WIB",
    date: "2026-08-27",
    dayName: "Kamis",
    status: "HADIR_LOLOS_SCREENING",
    healthCheck: {
      temperature: 36.2,
      handWoundFree: true,
      fluSymptomsFree: true,
      ppeComplete: true,
      checkedBy: "Ratna Kusuma (QC Auditor)",
      checkedAt: "04:50 WIB",
    },
  },
  {
    id: "SFT-004",
    employeeName: "Agus Pratama",
    nip: "MBG-SPPG-2026-005",
    role: "Helper Dapur",
    station: "Lini Packing Termal Sealing",
    shiftType: "SHIFT_2_MASAK_PACKING",
    shiftTime: "05:00 - 11:00 WIB",
    date: "2026-08-27",
    dayName: "Kamis",
    status: "HADIR_LOLOS_SCREENING",
    healthCheck: {
      temperature: 36.6,
      handWoundFree: true,
      fluSymptomsFree: true,
      ppeComplete: true,
      checkedBy: "Ratna Kusuma (QC Auditor)",
      checkedAt: "04:55 WIB",
    },
  },
  {
    id: "SFT-005",
    employeeName: "Rian Hidayat",
    nip: "MBG-SPPG-2026-006",
    role: "Driver Logistik",
    station: "Armada Termal B-9182-MBG",
    shiftType: "SHIFT_2_MASAK_PACKING",
    shiftTime: "05:00 - 11:00 WIB",
    date: "2026-08-27",
    dayName: "Kamis",
    status: "HADIR_LOLOS_SCREENING",
    healthCheck: {
      temperature: 36.3,
      handWoundFree: true,
      fluSymptomsFree: true,
      ppeComplete: true,
      checkedBy: "Ratna Kusuma (QC Auditor)",
      checkedAt: "05:00 WIB",
    },
  },
  {
    id: "SFT-006",
    employeeName: "Dedi Supriyanto, S.E.",
    nip: "MBG-SPPG-2026-008",
    role: "Admin Keuangan",
    station: "Kantor Administrasi SPPG",
    shiftType: "SHIFT_3_DISTRIBUSI_CLEAN",
    shiftTime: "09:00 - 16:00 WIB",
    date: "2026-08-27",
    dayName: "Kamis",
    status: "TERJADWAL",
  },
];

export default function ShiftScheduleManager() {
  const [shifts, setShifts] = useState<ShiftRosterItem[]>(INITIAL_SHIFTS);
  const [selectedDate, setSelectedDate] = useState("2026-08-27");
  const [selectedShiftType, setSelectedShiftType] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [isCreateShiftOpen, setIsCreateShiftOpen] = useState(false);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const filteredShifts = shifts.filter((s) => {
    const matchSearch =
      s.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.station.toLowerCase().includes(searchQuery.toLowerCase());

    const matchShiftType = selectedShiftType === "ALL" || s.shiftType === selectedShiftType;
    return matchSearch && matchShiftType;
  });

  const handleAddShift = (newShift: ShiftRosterItem) => {
    setShifts((prev) => [newShift, ...prev]);
  };

  const handleUpdateAttendance = (updatedShift: ShiftRosterItem) => {
    setShifts((prev) => prev.map((s) => (s.id === updatedShift.id ? updatedShift : s)));
  };

  return (
    <div className="space-y-6">
      {/* 3 Shift Operational Status Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Shift 1 Card */}
        <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-theme-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300">
              SHIFT 1 (DINI HARI)
            </span>
            <span className="text-xs font-bold text-gray-500">02:00 - 07:00 WIB</span>
          </div>
          <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-white">
            Persiapan Subuh & Masak Awal
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Pemotongan bahan, peracikan bumbu, penanakan nasi & olahan protein pagi.
          </p>
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
            <span className="text-gray-500">Kru Bertugas:</span>
            <span className="font-bold text-emerald-600">2 / 2 Personil Hadir</span>
          </div>
        </div>

        {/* Shift 2 Card */}
        <div className="p-5 bg-white border border-emerald-200 rounded-2xl dark:bg-white/[0.03] dark:border-emerald-500/30 shadow-theme-xs relative overflow-hidden ring-2 ring-emerald-500/20">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 animate-pulse">
              ● SEDANG BERLANGSUNG
            </span>
            <span className="text-xs font-bold text-emerald-700">05:00 - 11:00 WIB</span>
          </div>
          <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-white">
            Masak Utama & Packing Termal
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Uji organoleptik Ahli Gizi, pengemasan suhu &gt;60°C & serah terima armada.
          </p>
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
            <span className="text-gray-500">Kru Bertugas:</span>
            <span className="font-bold text-emerald-600">3 / 3 Personil Hadir (100%)</span>
          </div>
        </div>

        {/* Shift 3 Card */}
        <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-theme-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-300">
              SHIFT 3 (DISTRIBUSI & CLEAN)
            </span>
            <span className="text-xs font-bold text-gray-500">09:00 - 16:00 WIB</span>
          </div>
          <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-white">
            Distribusi Siang & Sanitasi Dapur
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Pengantaran porsi sekolah sesi 2, penarikan wadah & sterilisasi kimia dapur.
          </p>
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
            <span className="text-gray-500">Kru Bertugas:</span>
            <span className="font-bold text-blue-600">1 Personil Standby</span>
          </div>
        </div>
      </div>

      {/* Main Roster & Health Gatekeeper Table Card */}
      <div className="p-6 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-theme-xs">
        {/* Header & Controls */}
        <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Daftar Tugas Shift & Skrining Higiene Harian
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Gatekeeper Kepatuhan ISO 22000: Skrining Suhu Tubuh, Luka Tangan, dan Gejala Penyakit
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            />

            <select
              value={selectedShiftType}
              onChange={(e) => setSelectedShiftType(e.target.value)}
              className="px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            >
              <option value="ALL">Semua Shift Kerja</option>
              <option value="SHIFT_1_DINI_HARI">Shift 1 (02:00 - 07:00)</option>
              <option value="SHIFT_2_MASAK_PACKING">Shift 2 (05:00 - 11:00)</option>
              <option value="SHIFT_3_DISTRIBUSI_CLEAN">Shift 3 (09:00 - 16:00)</option>
            </select>

            <button
              onClick={() => setIsAttendanceModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-theme-xs cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Input Presensi & Health Check
            </button>

            <button
              onClick={() => setIsCreateShiftOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-brand-500 rounded-xl hover:bg-brand-600 shadow-theme-xs cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Tambah Jadwal Shift
            </button>

            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="p-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              title="Cetak Jadwal Shift Mingguan"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-800">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500 border-b border-gray-200 dark:bg-gray-900/50 dark:border-gray-800 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3.5">Tenaga Kerja</th>
                <th className="px-4 py-3.5">Shift & Jam Operasional</th>
                <th className="px-4 py-3.5">Stasiun Kerja</th>
                <th className="px-4 py-3.5">Status Presensi</th>
                <th className="px-4 py-3.5">Cek Suhu Tubuh</th>
                <th className="px-4 py-3.5">Higiene & APD</th>
                <th className="px-4 py-3.5 text-right">Auditor QC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
              {filteredShifts.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-900/30 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {item.employeeName}
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      {item.role} • {item.nip}
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <span className="font-bold text-xs text-gray-800 dark:text-gray-200">
                      {item.shiftTime}
                    </span>
                    <div className="text-[11px] text-gray-500">
                      {item.shiftType === "SHIFT_1_DINI_HARI"
                        ? "Shift 1 Subuh"
                        : item.shiftType === "SHIFT_2_MASAK_PACKING"
                        ? "Shift 2 Produksi"
                        : "Shift 3 Distribusi"}
                    </div>
                  </td>

                  <td className="px-4 py-3.5 text-xs font-medium text-gray-800 dark:text-gray-300">
                    {item.station}
                  </td>

                  <td className="px-4 py-3.5">
                    {item.status === "HADIR_LOLOS_SCREENING" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Hadir (Lolos)
                      </span>
                    ) : item.status === "TERJADWAL" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-300">
                        Terjadwal
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                        {item.status}
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3.5">
                    {item.healthCheck ? (
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-xs text-gray-900 dark:text-white">
                          {item.healthCheck.temperature}°C
                        </span>
                        {item.healthCheck.temperature <= 37.3 ? (
                          <span className="text-emerald-600 text-xs">✓ Normal</span>
                        ) : (
                          <span className="text-rose-600 text-xs">⚠ Demam</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">- Belum Screening -</span>
                    )}
                  </td>

                  <td className="px-4 py-3.5">
                    {item.healthCheck ? (
                      <div className="space-y-0.5 text-[11px]">
                        <div className="text-emerald-600 dark:text-emerald-400 font-medium">
                          ✓ Bebas Luka Tangan & Batuk
                        </div>
                        <div className="text-gray-500">
                          ✓ APD Dapur Lengkap
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">-</span>
                    )}
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    {item.healthCheck ? (
                      <div>
                        <div className="text-xs font-medium text-gray-900 dark:text-white">
                          {item.healthCheck.checkedBy.split("(")[0]}
                        </div>
                        <div className="text-[10px] text-gray-400">
                          {item.healthCheck.checkedAt}
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {isCreateShiftOpen && (
        <CreateShiftModal
          isOpen={isCreateShiftOpen}
          onClose={() => setIsCreateShiftOpen(false)}
          onAdd={handleAddShift}
        />
      )}

      {isAttendanceModalOpen && (
        <DailyAttendanceModal
          isOpen={isAttendanceModalOpen}
          shifts={shifts}
          onClose={() => setIsAttendanceModalOpen(false)}
          onUpdate={handleUpdateAttendance}
        />
      )}

      {isPrintModalOpen && (
        <ShiftSchedulePrintModal
          isOpen={isPrintModalOpen}
          shifts={shifts}
          onClose={() => setIsPrintModalOpen(false)}
        />
      )}
    </div>
  );
}
