import type { Metadata } from "next";
import React from "react";
import ModulePageLayout from "@/components/common/ModulePageLayout";
import CountryMap from "@/components/ecommerce/CountryMap";

export const metadata: Metadata = {
  title: "Monitoring Logistik & Peta Distribusi | ERP MBG",
  description: "Visualisasi peta titik sebaran distribusi makanan dan pergerakan armada secara real-time",
};

export default function LogisticsDashboardPage() {
  return (
    <ModulePageLayout
      moduleName="Modul 6: Dashboard & Analytics"
      badgeText="Live Map & GIS"
      pageTitle="Monitoring Logistik & Peta Sebaran Distribusi"
      description="Visualisasi peta titik distribusi aktif, rute armada kendaraan berpendingin, dan status penerimaan makanan di seluruh wilayah sekolah sasaran."
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-8 p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-800 dark:text-white">Peta Sebaran Armada & Titik Distribusi</h3>
            <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              428 Titik Aktif
            </span>
          </div>
          <CountryMap />
        </div>

        <div className="col-span-12 xl:col-span-4 space-y-4">
          <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800">
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Ringkasan Status Pengiriman</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Telah Diterima (Delivered)</span>
                <span className="font-bold text-emerald-600">312 Titik (72.9%)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Dalam Perjalanan (In Transit)</span>
                <span className="font-bold text-blue-600">98 Titik (22.9%)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Persiapan Dapur (Preparing)</span>
                <span className="font-bold text-amber-600">18 Titik (4.2%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModulePageLayout>
  );
}
