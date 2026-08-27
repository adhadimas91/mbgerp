"use client";
import React, { useState } from "react";
import Badge from "../ui/badge/Badge";

interface CatalogItem {
  id: string;
  name: string;
  category: string;
  vendorName: string;
  vendorId: string;
  unit: string;
  contractPrice: number;
  governmentBenchmarkPrice: number; // HAP Badan Pangan
  minOrder: number;
  weeklyCapacity: number;
  grade: string;
  storageType: "COLD_STORAGE" | "DRY_STORAGE";
}

const initialCatalog: CatalogItem[] = [
  {
    id: "CAT-001",
    name: "Daging Ayam Broiler Karkas Segar (Dingin 0-4°C)",
    category: "Protein Hewani",
    vendorName: "PT. Sumber Protein Nusantara",
    vendorId: "SUP-101",
    unit: "kg",
    contractPrice: 34500,
    governmentBenchmarkPrice: 36000,
    minOrder: 100,
    weeklyCapacity: 24500,
    grade: "Grade A (Halal & NKV)",
    storageType: "COLD_STORAGE",
  },
  {
    id: "CAT-002",
    name: "Beras Premium IR-64 Kepala (Pulen, Kadar Air < 14%)",
    category: "Karbohidrat",
    vendorName: "CV. Tani Makmur Beras Mandiri",
    vendorId: "SUP-102",
    unit: "kg",
    contractPrice: 13800,
    governmentBenchmarkPrice: 14200,
    minOrder: 500,
    weeklyCapacity: 56000,
    grade: "Premium Super",
    storageType: "DRY_STORAGE",
  },
  {
    id: "CAT-003",
    name: "Telur Ayam Ras Segar (Grade A, Bebas Salmonella)",
    category: "Protein Hewani",
    vendorName: "PT. Agro Unggas Perkasa",
    vendorId: "SUP-104",
    unit: "kg",
    contractPrice: 27500,
    governmentBenchmarkPrice: 28500,
    minOrder: 150,
    weeklyCapacity: 14000,
    grade: "Grade A Segar",
    storageType: "DRY_STORAGE",
  },
  {
    id: "CAT-004",
    name: "Susu Sapi Segar Pasteurisasi MBG (Tanpa Pengawet)",
    category: "Susu & Olahan",
    vendorName: "PT. Susu Segar Nusantara Dairy",
    vendorId: "SUP-105",
    unit: "Liter",
    contractPrice: 12500,
    governmentBenchmarkPrice: 13000,
    minOrder: 200,
    weeklyCapacity: 31500,
    grade: "UHT / Segar ISO 22000",
    storageType: "COLD_STORAGE",
  },
  {
    id: "CAT-005",
    name: "Bayam & Kangkung Segar Hidroponik",
    category: "Sayuran & Buah",
    vendorName: "Koperasi Sayur Segar Lembang",
    vendorId: "SUP-103",
    unit: "kg",
    contractPrice: 11000,
    governmentBenchmarkPrice: 12000,
    minOrder: 50,
    weeklyCapacity: 19600,
    grade: "Organik Prima 3",
    storageType: "COLD_STORAGE",
  },
  {
    id: "CAT-006",
    name: "Wortel Manis Berastagi Segar",
    category: "Sayuran & Buah",
    vendorName: "Koperasi Sayur Segar Lembang",
    vendorId: "SUP-103",
    unit: "kg",
    contractPrice: 14000,
    governmentBenchmarkPrice: 15000,
    minOrder: 80,
    weeklyCapacity: 12000,
    grade: "Grade A",
    storageType: "COLD_STORAGE",
  },
];

export const SupplierCatalogGrid: React.FC = () => {
  const [catalog] = useState<CatalogItem[]>(initialCatalog);
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const filteredItems = catalog.filter((item) => {
    const matchCategory = categoryFilter === "ALL" || item.category === categoryFilter;
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.vendorName.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Cari nama komoditas atau supplier..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-xl border border-gray-300 bg-transparent pl-9 pr-3 text-xs text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {["ALL", "Protein Hewani", "Karbohidrat", "Sayuran & Buah", "Susu & Olahan"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
                  categoryFilter === cat
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {cat === "ALL" ? "Semua Bahan" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Catalog Cards Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((item) => {
          const priceDiff = item.governmentBenchmarkPrice - item.contractPrice;
          const isBelowBenchmark = priceDiff >= 0;

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    {item.category}
                  </span>
                  {item.storageType === "COLD_STORAGE" ? (
                    <span className="rounded-lg bg-sky-50 px-2 py-0.5 text-[10px] font-medium text-sky-700 border border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/20">
                      ❄️ Cold Chain Required
                    </span>
                  ) : (
                    <span className="rounded-lg bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20">
                      📦 Dry Storage
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
                  {item.name}
                </h4>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Vendor: <span className="font-medium text-gray-700 dark:text-gray-300">{item.vendorName}</span>
                </p>
                <span className="text-[11px] text-gray-400 block mt-0.5">Kualitas: {item.grade}</span>

                {/* Price Display */}
                <div className="mt-4 rounded-xl bg-gray-50 p-3 dark:bg-gray-800/40">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] text-gray-400">Harga Kontrak MBG:</span>
                    <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                      Rp {item.contractPrice.toLocaleString("id-ID")}{" "}
                      <span className="text-[11px] font-normal text-gray-500">/ {item.unit}</span>
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-gray-500">
                    <span>HAP Badan Pangan:</span>
                    <span>Rp {item.governmentBenchmarkPrice.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="mt-2 text-[10px] flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                    <span>✓</span>
                    <span>Hemat Rp {Math.abs(priceDiff).toLocaleString("id-ID")} vs Acuan Pemerintah</span>
                  </div>
                </div>
              </div>

              {/* Bottom stats */}
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                <span className="text-gray-400">Kapasitas: <b className="text-gray-800 dark:text-gray-200">{item.weeklyCapacity.toLocaleString()} {item.unit}/minggu</b></span>
                <span className="text-gray-400">Min. Order: <b className="text-gray-800 dark:text-gray-200">{item.minOrder} {item.unit}</b></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SupplierCatalogGrid;
