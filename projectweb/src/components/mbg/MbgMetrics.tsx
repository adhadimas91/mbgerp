"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowUpIcon, BoxIcon, GroupIcon, DollarLineIcon, CheckCircleIcon } from "@/icons";

export const MbgMetrics = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
      {/* Metric 1: Distribusi Porsi */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            <BoxIcon className="size-6" />
          </div>
          <Badge color="success">
            <ArrowUpIcon className="w-3.5 h-3.5 mr-1" />
            +14.2%
          </Badge>
        </div>
        <div className="mt-4">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Distribusi Porsi Hari Ini
          </span>
          <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">
            128,450 <span className="text-xs font-normal text-gray-400">porsi</span>
          </h4>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Target harian: 135,000 porsi (95.1%)
          </p>
        </div>
      </div>

      {/* Metric 2: Stok Bahan Baku */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <GroupIcon className="size-6" />
          </div>
          <Badge color="success">
            Aman
          </Badge>
        </div>
        <div className="mt-4">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Ketersediaan Stok Gudang
          </span>
          <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">
            96.8% <span className="text-xs font-normal text-emerald-500">Optimum</span>
          </h4>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Cold chain stabil: -18°C ~ 4°C
          </p>
        </div>
      </div>

      {/* Metric 3: Penyerapan Anggaran */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
            <DollarLineIcon className="size-6" />
          </div>
          <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
            Bulan Ini
          </span>
        </div>
        <div className="mt-4">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Realisasi Anggaran Wilayah
          </span>
          <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">
            Rp 8.42 M
          </h4>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Dari alokasi Rp 12.0 M (70.1%)
          </p>
        </div>
      </div>

      {/* Metric 4: Kepatuhan ISO & Uji Gizi */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
            <CheckCircleIcon className="size-6" />
          </div>
          <Badge color="success">
            ISO 22000
          </Badge>
        </div>
        <div className="mt-4">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Kepatuhan Mutu & Nutrisi
          </span>
          <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">
            99.4% <span className="text-xs font-normal text-gray-400">Passed</span>
          </h4>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            0 insiden keamanan pangan
          </p>
        </div>
      </div>
    </div>
  );
};

export default MbgMetrics;
