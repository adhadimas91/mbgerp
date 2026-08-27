import React from "react";
import Link from "next/link";

export default function SidebarWidget() {
  return (
    <div className="mx-auto mb-8 w-full max-w-60 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-blue-500/10 border border-emerald-500/20 p-4 text-center dark:bg-white/[0.03]">
      <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
        <svg
          className="w-4 h-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
        Standar Kepatuhan ISO
      </h3>
      <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
        ISO 22000 • ISO 9001 • ISO 27001 Terintegrasi
      </p>
      <Link
        href="/compliance/iso-standards"
        className="flex items-center justify-center px-3 py-2 text-xs font-medium text-emerald-700 transition-colors rounded-lg bg-emerald-100/80 hover:bg-emerald-200/80 dark:bg-emerald-500/20 dark:text-emerald-300 dark:hover:bg-emerald-500/30"
      >
        Status Audit & Sistem
      </Link>
    </div>
  );
}
