"use client";
import React, { useState } from "react";
import Badge from "../ui/badge/Badge";
import StockMovementModal from "./StockMovementModal";

export interface StockItem {
  id: string;
  name: string;
  category: "Protein Hewani" | "Karbohidrat" | "Sayuran & Buah" | "Susu & Olahan" | "Bumbu & Minyak";
  warehouse: string;
  storageType: "COLD_STORAGE" | "DRY_STORAGE";
  currentQuantity: number;
  minThreshold: number;
  unit: string;
  batchNumber: string;
  expiryDate: string;
  storageTemp?: string;
  status: "SAFE" | "LOW_STOCK" | "CRITICAL";
}

const initialStocks: StockItem[] = [
  {
    id: "STK-1001",
    name: "Daging Ayam Broiler Karkas (Dingin 2°C)",
    category: "Protein Hewani",
    warehouse: "Cold Storage Utama (Chiller 01)",
    storageType: "COLD_STORAGE",
    currentQuantity: 4200,
    minThreshold: 1500,
    unit: "kg",
    batchNumber: "LOT-20260226-AYM",
    expiryDate: "2026-03-05",
    storageTemp: "2.1°C",
    status: "SAFE",
  },
  {
    id: "STK-1002",
    name: "Beras Premium IR-64 Kepala Super",
    category: "Karbohidrat",
    warehouse: "Gudang Kering Karawang A",
    storageType: "DRY_STORAGE",
    currentQuantity: 18500,
    minThreshold: 5000,
    unit: "kg",
    batchNumber: "LOT-20260215-BRS",
    expiryDate: "2026-08-30",
    status: "SAFE",
  },
  {
    id: "STK-1003",
    name: "Telur Ayam Ras Segar",
    category: "Protein Hewani",
    warehouse: "Gudang Kering Terkontrol B",
    storageType: "DRY_STORAGE",
    currentQuantity: 850,
    minThreshold: 1000,
    unit: "kg",
    batchNumber: "LOT-20260224-TLR",
    expiryDate: "2026-03-12",
    status: "LOW_STOCK",
  },
  {
    id: "STK-1004",
    name: "Susu Sapi Murni Pasteurisasi MBG",
    category: "Susu & Olahan",
    warehouse: "Cold Storage Susu (Chiller 02)",
    storageType: "COLD_STORAGE",
    currentQuantity: 6200,
    minThreshold: 2000,
    unit: "Liter",
    batchNumber: "LOT-20260227-SSU",
    expiryDate: "2026-03-04",
    storageTemp: "3.2°C",
    status: "SAFE",
  },
  {
    id: "STK-1005",
    name: "Bayam Hidroponik Segar MBG",
    category: "Sayuran & Buah",
    warehouse: "Chiller Sayuran Segar (6°C)",
    storageType: "COLD_STORAGE",
    currentQuantity: 320,
    minThreshold: 800,
    unit: "kg",
    batchNumber: "LOT-20260226-BYM",
    expiryDate: "2026-03-01",
    storageTemp: "5.8°C",
    status: "CRITICAL",
  },
  {
    id: "STK-1006",
    name: "Ikan Kembung Segar Beku (-18°C)",
    category: "Protein Hewani",
    warehouse: "Deep Freezer MBG 01",
    storageType: "COLD_STORAGE",
    currentQuantity: 3100,
    minThreshold: 1200,
    unit: "kg",
    batchNumber: "LOT-20260220-IKN",
    expiryDate: "2026-05-20",
    storageTemp: "-18.5°C",
    status: "SAFE",
  },
  {
    id: "STK-1007",
    name: "Wortel Manis Berastagi Segar",
    category: "Sayuran & Buah",
    warehouse: "Chiller Sayuran Segar (6°C)",
    storageType: "COLD_STORAGE",
    currentQuantity: 1450,
    minThreshold: 600,
    unit: "kg",
    batchNumber: "LOT-20260225-WRT",
    expiryDate: "2026-03-08",
    storageTemp: "5.5°C",
    status: "SAFE",
  },
];

export const InventoryTable: React.FC = () => {
  const [stocks, setStocks] = useState<StockItem[]>(initialStocks);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedStorage, setSelectedStorage] = useState("ALL");
  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);

  const filteredStocks = stocks.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.batchNumber.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "ALL" || item.category === selectedCategory;
    const matchStorage = selectedStorage === "ALL" || item.storageType === selectedStorage;
    return matchSearch && matchCat && matchStorage;
  });

  const handleAddMovement = (movement: any) => {
    // In demo mode, reflect stock adjustments
    if (movement.type === "IN") {
      setStocks((prev) =>
        prev.map((s) =>
          s.name.includes(movement.productName.split(" ")[0])
            ? { ...s, currentQuantity: s.currentQuantity + Number(movement.quantity) }
            : s
        )
      );
    } else if (movement.type === "OUT") {
      setStocks((prev) =>
        prev.map((s) =>
          s.name.includes(movement.productName.split(" ")[0])
            ? { ...s, currentQuantity: Math.max(0, s.currentQuantity - Number(movement.quantity)) }
            : s
        )
      );
    }
  };

  // Metrics
  const totalItems = stocks.length;
  const criticalCount = stocks.filter((s) => s.status === "CRITICAL").length;
  const lowStockCount = stocks.filter((s) => s.status === "LOW_STOCK").length;
  const coldCount = stocks.filter((s) => s.storageType === "COLD_STORAGE").length;

  return (
    <div className="space-y-6">
      {/* Top Stat Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-4.5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Komoditas Terkelola</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              📦
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-white">{totalItems} Komoditas</p>
          <p className="text-[11px] text-gray-400 mt-1">Stok bahan pangan di gudang MBG</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4.5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Penyimpanan Cold Chain</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
              ❄️
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-sky-600 dark:text-sky-400">{coldCount} Komoditas</p>
          <p className="text-[11px] text-gray-400 mt-1">Suhu terpantau sensor IoT (-18°C ~ 4°C)</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4.5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Stok Menipis (Warning)</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
              ⚠️
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-amber-500 dark:text-amber-400">{lowStockCount} Item</p>
          <p className="text-[11px] text-gray-400 mt-1">Mendekati ambang batas minimum</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4.5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Stok Kritis (Segera PO)</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
              🚨
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-rose-600 dark:text-rose-400">{criticalCount} Item</p>
          <p className="text-[11px] text-gray-400 mt-1">Di bawah ambang batas pemenuhan menu</p>
        </div>
      </div>

      {/* Filter and Table Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Cari komoditas, Lot Number, atau kode stok..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-full rounded-xl border border-gray-300 bg-transparent pl-9 pr-3 text-xs text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-10 rounded-xl border border-gray-300 bg-transparent px-3 text-xs text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white dark:bg-gray-800"
            >
              <option value="ALL">Semua Kategori</option>
              <option value="Protein Hewani">Protein Hewani</option>
              <option value="Karbohidrat">Karbohidrat</option>
              <option value="Sayuran & Buah">Sayuran & Buah</option>
              <option value="Susu & Olahan">Susu & Olahan</option>
            </select>

            {/* Storage Type */}
            <select
              value={selectedStorage}
              onChange={(e) => setSelectedStorage(e.target.value)}
              className="h-10 rounded-xl border border-gray-300 bg-transparent px-3 text-xs text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white dark:bg-gray-800"
            >
              <option value="ALL">Semua Tipe Gudang</option>
              <option value="COLD_STORAGE">Cold Storage (Pendingin)</option>
              <option value="DRY_STORAGE">Dry Storage (Gudang Kering)</option>
            </select>
          </div>

          <button
            onClick={() => setIsMovementModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Catat Mutasi Stok (IN / OUT)
          </button>
        </div>

        {/* Stock Table */}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-[11px] font-semibold uppercase text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <th className="pb-3 pr-4">Bahan Baku & Kategori</th>
                <th className="pb-3 px-3">Gudang Penyimpanan</th>
                <th className="pb-3 px-3">Jumlah Stok Saat Ini</th>
                <th className="pb-3 px-3">Ambang Min. (Buffer)</th>
                <th className="pb-3 px-3">Batch / Lot & Expiry</th>
                <th className="pb-3 px-3">Status Stok</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
              {filteredStocks.map((item) => {
                const stockPercentage = Math.min(100, Math.round((item.currentQuantity / (item.minThreshold * 2)) * 100));

                return (
                  <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01]">
                    {/* Commodity name */}
                    <td className="py-3.5 pr-4">
                      <span className="font-semibold text-gray-900 dark:text-white block text-sm">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-gray-500">{item.category}</span>
                        <span className="text-gray-300">•</span>
                        <span className="font-mono text-[10px] text-gray-400">{item.id}</span>
                      </div>
                    </td>

                    {/* Warehouse */}
                    <td className="py-3.5 px-3">
                      <span className="text-gray-800 dark:text-gray-200 font-medium block">
                        {item.warehouse}
                      </span>
                      {item.storageTemp ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                          ❄️ Sensor: {item.storageTemp}
                        </span>
                      ) : (
                        <span className="text-[11px] text-amber-700 dark:text-amber-400">
                          📦 Suhu Ruang Terkendali
                        </span>
                      )}
                    </td>

                    {/* Current Quantity */}
                    <td className="py-3.5 px-3">
                      <div className="space-y-1">
                        <span className="font-extrabold text-sm text-gray-900 dark:text-white">
                          {item.currentQuantity.toLocaleString()}{" "}
                          <span className="text-xs font-normal text-gray-500">{item.unit}</span>
                        </span>
                        <div className="h-1.5 w-24 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.status === "SAFE"
                                ? "bg-emerald-500"
                                : item.status === "LOW_STOCK"
                                ? "bg-amber-500"
                                : "bg-rose-500"
                            }`}
                            style={{ width: `${stockPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* Min Threshold */}
                    <td className="py-3.5 px-3">
                      <span className="text-gray-600 dark:text-gray-300 font-medium">
                        {item.minThreshold.toLocaleString()} {item.unit}
                      </span>
                    </td>

                    {/* Batch / Lot */}
                    <td className="py-3.5 px-3">
                      <span className="font-mono text-[11px] font-semibold text-gray-700 dark:text-gray-300 block">
                        {item.batchNumber}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        Exp: {item.expiryDate}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3">
                      {item.status === "SAFE" ? (
                        <Badge color="success" size="sm">Aman (Cukup)</Badge>
                      ) : item.status === "LOW_STOCK" ? (
                        <Badge color="warning" size="sm">Menipis</Badge>
                      ) : (
                        <Badge color="error" size="sm">Kritis (Segera PO)</Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Movement Modal */}
      <StockMovementModal
        isOpen={isMovementModalOpen}
        onClose={() => setIsMovementModalOpen(false)}
        onSuccess={handleAddMovement}
      />
    </div>
  );
};

export default InventoryTable;
