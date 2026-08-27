"use client";

import React from "react";
import { UserAccount } from "./UserManagementTable";

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount | null;
  onOpenEdit: (user: UserAccount) => void;
  onOpenPermissions: (user: UserAccount) => void;
  onOpenSecurity: (user: UserAccount) => void;
  onOpenPrint: (user: UserAccount) => void;
}

export default function UserDetailModal({
  isOpen,
  onClose,
  user,
  onOpenEdit,
  onOpenPermissions,
  onOpenSecurity,
  onOpenPrint,
}: UserDetailModalProps) {
  if (!isOpen || !user) return null;

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN_PUSAT":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
      case "ADMIN_REGIONAL":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
      case "KEPALA_SPPG":
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800";
      case "AHLI_GIZI":
        return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800";
      case "INSPEKTUR_MUTU_QC":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800";
      case "BENDAHARA_PPK":
        return "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
      case "INACTIVE":
        return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
      case "SUSPENDED":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
      case "PENDING_ACTIVATION":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl dark:bg-gray-900 dark:border dark:border-gray-800 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Rincian Akun & Hak Akses Pengguna
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Profil resmi, unit penugasan, dan status kepatuhan keamanan ISO 27001
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

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* User Profile Summary Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-gray-50/70 p-5 dark:border-gray-800 dark:bg-gray-800/40">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-xl font-black text-white shadow-md">
                {user.name.charAt(0)}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {user.name}
                  </h4>
                  <span className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-bold ${getRoleBadge(user.role)}`}>
                    {user.role}
                  </span>
                  <span className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-bold ${getStatusBadge(user.status)}`}>
                    {user.status}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs text-gray-500 dark:text-gray-400">
                  NIP: <span className="font-semibold text-gray-800 dark:text-gray-200">{user.nip}</span> &middot; ID Sistem: <span className="font-semibold text-gray-800 dark:text-gray-200">{user.id}</span>
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                  Unit: <span className="font-medium text-gray-900 dark:text-white">{user.unit}</span> &middot; Wilayah: <span className="font-medium">{user.assignedRegion}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <button
                onClick={() => onOpenPrint(user)}
                className="flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Cetak SK Akses
              </button>
              <button
                onClick={() => onOpenEdit(user)}
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 shadow-sm"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit Akun
              </button>
            </div>
          </div>

          {/* Quick Access Action Shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => onOpenPermissions(user)}
              className="flex items-center justify-between rounded-xl border border-indigo-200 bg-indigo-50/40 p-3.5 hover:bg-indigo-50 transition-colors text-left dark:border-indigo-900/40 dark:bg-indigo-900/10 dark:hover:bg-indigo-900/20"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-indigo-100 p-2 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-indigo-950 dark:text-indigo-200">
                    Konfigurasi Matriks Hak Akses (RBAC)
                  </div>
                  <div className="text-[11px] text-indigo-700 dark:text-indigo-400">
                    Atur izin Create, Read, Update, Delete, Approve, Export 9 modul
                  </div>
                </div>
              </div>
              <svg className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={() => onOpenSecurity(user)}
              className="flex items-center justify-between rounded-xl border border-purple-200 bg-purple-50/40 p-3.5 hover:bg-purple-50 transition-colors text-left dark:border-purple-900/40 dark:bg-purple-900/10 dark:hover:bg-purple-900/20"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 p-2 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-purple-950 dark:text-purple-200">
                    Sesi Aktif & Audit Keamanan Akun
                  </div>
                  <div className="text-[11px] text-purple-700 dark:text-purple-400">
                    Audit log login, revoke token, dan proteksi brute force
                  </div>
                </div>
              </div>
              <svg className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Informasi Kontak & Unit
              </h5>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500 dark:text-gray-400">Email Resmi</span>
                  <span className="font-mono font-semibold text-gray-900 dark:text-white">{user.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500 dark:text-gray-400">Telepon / WhatsApp</span>
                  <span className="font-medium text-gray-900 dark:text-white">{user.phone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500 dark:text-gray-400">Unit / SPPG</span>
                  <span className="font-medium text-gray-900 dark:text-white">{user.unit}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 dark:text-gray-400">Wilayah Penugasan</span>
                  <span className="font-medium text-gray-900 dark:text-white">{user.assignedRegion}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Keamanan & Riwayat Akses (ISO 27001)
              </h5>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500 dark:text-gray-400">Autentikasi 2FA</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{user.twoFactor}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500 dark:text-gray-400">Login Terakhir</span>
                  <span className="font-medium text-gray-900 dark:text-white">{user.lastLogin}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500 dark:text-gray-400">IP & Lokasi Terakhir</span>
                  <span className="font-mono text-gray-900 dark:text-white">{user.lastIp} ({user.lastLocation})</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 dark:text-gray-400">Masa Berlaku Akun</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {user.accountExpiry ? user.accountExpiry : "Permanen"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes / Special Authorities */}
          {user.notes && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/40">
              <h5 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                Catatan Wewenang Khusus & Pengawasan
              </h5>
              <p className="text-xs text-gray-600 dark:text-gray-300 m-0">
                {user.notes}
              </p>
            </div>
          )}
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
