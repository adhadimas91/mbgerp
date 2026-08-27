"use client";

import React from "react";
import { RoleDefinition } from "./RoleManagementDashboard";

interface RoleDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: RoleDefinition | null;
  onOpenEdit: (role: RoleDefinition) => void;
}

export default function RoleDetailModal({
  isOpen,
  onClose,
  role,
  onOpenEdit,
}: RoleDetailModalProps) {
  if (!isOpen || !role) return null;

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "CRITICAL":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
      case "HIGH":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800";
      case "MEDIUM":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl dark:bg-gray-900 dark:border dark:border-gray-800 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Rincian Konfigurasi Peran & Hak Akses
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Spesifikasi izin, kontrol kepatuhan ISO 27001, dan daftar pemegang peran
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 p-2 text-gray-500 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Header Card */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-5 dark:border-gray-800 dark:bg-gray-800/40">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {role.name}
                  </h4>
                  <span className="font-mono text-xs rounded-md bg-indigo-100 px-2 py-0.5 font-bold text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
                    {role.code}
                  </span>
                  <span className={`rounded-md border px-2 py-0.5 text-xs font-bold ${getRiskBadge(role.riskLevel)}`}>
                    Risiko: {role.riskLevel}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                  {role.description}
                </p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenEdit(role);
                }}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors shrink-0"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit Matriks Peran
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-gray-200/80 pt-4 dark:border-gray-700/60 text-xs">
              <div>
                <span className="text-gray-500 dark:text-gray-400 block text-[11px]">Kategori</span>
                <span className="font-bold text-gray-900 dark:text-white">{role.category}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400 block text-[11px]">Pengguna Aktif</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{role.assignedUsersCount} Pengguna</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400 block text-[11px]">Wajib 2FA (MFA)</span>
                <span className="font-bold text-green-600 dark:text-green-400">
                  {role.enforce2fa ? "Wajib Aktif (Enforced)" : "Opsional"}
                </span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400 block text-[11px]">Session Timeout</span>
                <span className="font-bold text-gray-900 dark:text-white">{role.sessionTimeoutMinutes} Menit</span>
              </div>
            </div>
          </div>

          {/* Module Permissions Overview */}
          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800 space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Matriks Hak Akses Modul ({role.moduleAccessCount} dari 9 Modul Terbuka)
              </h5>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                Prinsip Least Privilege ISO 27001
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {role.accessibleModules.map((mod, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 p-2.5 dark:border-gray-800 dark:bg-gray-800/30"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{mod.name}</span>
                  </div>
                  <div className="flex gap-1 text-[10px] font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                    {mod.permissions.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Members List */}
          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Daftar Staf Pemegang Peran Ini ({role.assignedUsers.length} Terdaftar)
            </h5>

            <div className="divide-y divide-gray-100 rounded-lg border border-gray-100 dark:divide-gray-800 dark:border-gray-800">
              {role.assignedUsers.map((user, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-200 font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-[10px]">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{user.name}</div>
                      <div className="font-mono text-[10px] text-gray-500">{user.nip} &middot; {user.unit}</div>
                    </div>
                  </div>
                  <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    Aktif
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-gray-200 px-6 py-4 dark:border-gray-800">
          <button
            onClick={onClose}
            className="rounded-xl bg-gray-100 px-5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
