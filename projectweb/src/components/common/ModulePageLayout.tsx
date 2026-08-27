import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

interface ModulePageLayoutProps {
  pageTitle: string;
  moduleName: string;
  description: string;
  badgeText?: string;
  children?: React.ReactNode;
}

export const ModulePageLayout: React.FC<ModulePageLayoutProps> = ({
  pageTitle,
  moduleName,
  description,
  badgeText,
  children,
}) => {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle={pageTitle} />

      {/* Header Banner */}
      <div className="p-6 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-theme-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20">
                {moduleName}
              </span>
              {badgeText && (
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20">
                  {badgeText}
                </span>
              )}
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              {pageTitle}
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2.5 text-sm font-medium text-white transition-colors rounded-xl bg-brand-500 hover:bg-brand-600 shadow-theme-xs">
              + Tambah Data Baru
            </button>
            <button className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 transition-colors rounded-xl hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
              Ekspor Laporan
            </button>
          </div>
        </div>
      </div>

      {children ? (
        children
      ) : (
        <div className="p-10 text-center bg-white border border-dashed border-gray-300 rounded-2xl dark:bg-white/[0.02] dark:border-gray-800">
          <div className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
            Modul {pageTitle} Siap Dikonfigurasi
          </h3>
          <p className="max-w-md mx-auto mt-1 text-xs text-gray-500 dark:text-gray-400">
            Halaman ini terhubung langsung dengan alur navigasi ERP MBG dan spesifikasi teknis di <code className="text-brand-500 font-mono text-[11px]">task_md</code>.
          </p>
        </div>
      )}
    </div>
  );
};

export default ModulePageLayout;
