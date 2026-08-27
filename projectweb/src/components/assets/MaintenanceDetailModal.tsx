"use client";

import React from "react";
import { MaintenanceTaskData } from "./CreateMaintenanceModal";

interface MaintenanceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: MaintenanceTaskData | null;
  onUpdateStatus: (task: MaintenanceTaskData, newStatus: MaintenanceTaskData["status"]) => void;
}

export default function MaintenanceDetailModal({
  isOpen,
  onClose,
  task,
  onUpdateStatus,
}: MaintenanceDetailModalProps) {
  if (!isOpen || !task) return null;

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {task.workOrderNumber}
                </h3>
                <span
                  className={`px-2 py-0.5 text-[11px] font-bold rounded-md ${
                    task.status === "Selesai"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                      : task.status === "Sedang Dikerjakan"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                      : task.status === "Terlambat"
                      ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {task.type} • {task.assetName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800 text-xs">
            <div>
              <span className="text-gray-500 block mb-0.5">Kode Aset:</span>
              <span className="font-mono font-bold text-gray-900 dark:text-white">{task.assetCode}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-0.5">Prioritas:</span>
              <span
                className={`font-semibold ${
                  task.priority === "Kritis / Darurat" ? "text-rose-600 font-bold" : "text-gray-800 dark:text-gray-200"
                }`}
              >
                {task.priority}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block mb-0.5">Tanggal Jadwal:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{task.scheduledDate}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-0.5">Vendor Pelaksana:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{task.vendorCompany}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-0.5">Teknisi / PIC:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{task.technicianName}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-0.5">Estimasi Biaya:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {formatRupiah(task.estimatedCost)}
              </span>
            </div>
          </div>

          {/* Suku Cadang & Deskripsi */}
          <div className="space-y-3 text-xs">
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Kebutuhan Suku Cadang & Material:
              </span>
              <p className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                {task.spareParts || "Tidak memerlukan pergantian komponen besar (hanya pembersihan & kalibrasi)."}
              </p>
            </div>

            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Catatan & Deskripsi Perintah Kerja:
              </span>
              <p className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                {task.description}
              </p>
            </div>
          </div>

          {/* Checklist Pengerjaan */}
          <div>
            <span className="font-bold text-gray-700 dark:text-gray-300 text-xs block mb-2">
              Item Verifikasi & Checklist Servis:
            </span>
            <div className="space-y-2">
              {task.checklist.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2.5 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 text-xs"
                >
                  <div className="w-5 h-5 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[11px] shrink-0">
                    ✓
                  </div>
                  <span className="text-gray-800 dark:text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions & Status Updater */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-500">Ubah Status:</span>
            <select
              value={task.status}
              onChange={(e) => onUpdateStatus(task, e.target.value as MaintenanceTaskData["status"])}
              className="px-3 py-1.5 font-semibold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
            >
              <option value="Terjadwal">Terjadwal</option>
              <option value="Sedang Dikerjakan">Sedang Dikerjakan</option>
              <option value="Selesai">Selesai (Lolos Verifikasi)</option>
              <option value="Terlambat">Terlambat</option>
            </select>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 rounded-xl transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
