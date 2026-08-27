"use client";

import React, { useState } from "react";
import AssetRegistrationModal, { AssetFormData } from "./AssetRegistrationModal";
import AssetDetailModal from "./AssetDetailModal";
import AssetQrPrintModal, { AssetQrData } from "./AssetQrPrintModal";
import CreateMaintenanceModal, { MaintenanceTaskData } from "./CreateMaintenanceModal";

const INITIAL_ASSETS: AssetFormData[] = [
  {
    id: "1",
    assetCode: "AST-MBG-1001",
    name: "Combi Steamer Industri 10 Tray (Steam & Convection)",
    category: "Peralatan Masak Komersial",
    brand: "Rational iCombi Pro",
    modelNumber: "ICP-10-1/1-G",
    serialNumber: "SN-RT2025-9921",
    location: "Dapur Sentral Harmoni - Jakarta Pusat",
    pic: "Chef Budi Prakoso",
    acquisitionDate: "2025-11-10",
    purchasePrice: 165000000,
    usefulLifeYears: 8,
    salvageValue: 16500000,
    condition: "Baik",
    status: "Aktif",
    supplierVendor: "PT Kitchen Multi Sarana",
    powerRating: "18.5 kW / Gas LPG Industri",
    notes: "Telah tersertifikasi food contact SUS 316. Kalibrasi temperatur oven berkala tiap 3 bulan.",
  },
  {
    id: "2",
    assetCode: "AST-MBG-1002",
    name: "Truk Box Pendingin Isuzu Elf Cold Chain (Suhu -5°C s/d 4°C)",
    category: "Armada Kendaraan Distribusi",
    brand: "Isuzu Giga / Thermo King Box",
    modelNumber: "NLR 55 T - Chiller Box",
    serialNumber: "B 9482 PQA",
    location: "Armada Distribusi Wilayah 1",
    pic: "Agus Santoso (Koordinator Driver)",
    acquisitionDate: "2025-12-01",
    purchasePrice: 420000000,
    usefulLifeYears: 10,
    salvageValue: 50000000,
    condition: "Baik",
    status: "Aktif",
    supplierVendor: "PT Astra International Tbk",
    powerRating: "2.800 cc / Unit Pendingin Sub-Engine 12V",
    notes: "Dilengkapi IoT GPS Telemetri Suhu real-time ISO 22000 ke dashboard logistik MBG.",
  },
  {
    id: "3",
    assetCode: "AST-MBG-1003",
    name: "Walk-in Chiller Sentral 20m³ (Bahan Sayur & Unggas Segar)",
    category: "Cold Storage & Freezer",
    brand: "Hoshizaki Custom Walk-in",
    modelNumber: "WIC-20M3-R404A",
    serialNumber: "SN-HSZ-2025-441",
    location: "Gudang Induk Buffer Pangan Cakung",
    pic: "Rudi Haryanto (Kepala Gudang)",
    acquisitionDate: "2025-10-15",
    purchasePrice: 185000000,
    usefulLifeYears: 10,
    salvageValue: 20000000,
    condition: "Baik",
    status: "Aktif",
    supplierVendor: "PT Cold Chain Mandiri",
    powerRating: "5.5 HP Bitzer Compressor",
    notes: "Pengaturan suhu standby 2°C s/d 4°C. Defrost otomatis setiap 6 jam.",
  },
  {
    id: "4",
    assetCode: "AST-MBG-1004",
    name: "Ketel Masak Tilting Bratt Pan Otomatis 150 Liter",
    category: "Peralatan Masak Komersial",
    brand: "Electrolux Professional",
    modelNumber: "TBP-150-LPG",
    serialNumber: "SN-ELX-88401",
    location: "Dapur Sentral Harmoni - Jakarta Pusat",
    pic: "Chef Budi Prakoso",
    acquisitionDate: "2025-11-20",
    purchasePrice: 95000000,
    usefulLifeYears: 7,
    salvageValue: 9500000,
    condition: "Perlu Servis",
    status: "Maintenance",
    supplierVendor: "PT Kitchen Multi Sarana",
    powerRating: "Gas Burner High Pressure",
    notes: "Engsel hidrolik miring agak berat, telah dijadwalkan pelumasan & servis gasket seal.",
  },
  {
    id: "5",
    assetCode: "AST-MBG-1005",
    name: "Insulated Food Pan Carrier 5-Tier (Thermal Hot Box)",
    category: "Wadah & Tray Stainless Steel",
    brand: "Cambro Camcarrier",
    modelNumber: "UPC400-HotBox",
    serialNumber: "LOT-CB-2026-A1",
    location: "SPPG Klender - Jakarta Timur",
    pic: "Siti Aminah (Pengawas Dapur)",
    acquisitionDate: "2026-01-05",
    purchasePrice: 8500000,
    usefulLifeYears: 5,
    salvageValue: 500000,
    condition: "Baik",
    status: "Aktif",
    supplierVendor: "PT Boga Sarana Mandiri",
    powerRating: "Passive Foam Insulation (> 60°C for 4 Hours)",
    notes: "Standar HACCP untuk menjaga suhu hidangan panas di atas 60°C saat pengantaran.",
  },
  {
    id: "6",
    assetCode: "AST-MBG-1006",
    name: "Refraktometer & Thermometer Probe Lab Pangan Digital",
    category: "Instrumen Kalibrasi & Lab",
    brand: "Testo 104-IR Food Thermometer",
    modelNumber: "T104-IR-HACCP",
    serialNumber: "SN-TST-90119",
    location: "Dapur Sentral Harmoni - Jakarta Pusat",
    pic: "Ratna Sari, S.Gz (Ahli Gizi)",
    acquisitionDate: "2026-01-10",
    purchasePrice: 6200000,
    usefulLifeYears: 4,
    salvageValue: 500000,
    condition: "Baik",
    status: "Aktif",
    supplierVendor: "PT Alat Presisi Prima",
    powerRating: "Baterai AAA / Laser IR + Penetration Probe",
    notes: "Kalibrasi sertifikat terakreditasi KAN berlaku hingga Januari 2027.",
  },
  {
    id: "7",
    assetCode: "AST-MBG-1007",
    name: "Mesin Cuci Piring & Sanitasi Sterilisasi Commercial Dishwasher",
    category: "Peralatan Masak Komersial",
    brand: "Hobart Conveyor Dishwasher",
    modelNumber: "HBT-PRO-CL44E",
    serialNumber: "SN-HBT-55320",
    location: "Dapur Sentral Harmoni - Jakarta Pusat",
    pic: "Doni Prasetyo (Sanitasi Leader)",
    acquisitionDate: "2025-10-28",
    purchasePrice: 145000000,
    usefulLifeYears: 8,
    salvageValue: 15000000,
    condition: "Baik",
    status: "Aktif",
    supplierVendor: "PT Kitchen Multi Sarana",
    powerRating: "12 kW / 85°C Sanitizing Rinse",
    notes: "Sanitasi termal 85°C membunuh 99.999% patogen sesuai ISO 22000.",
  },
  {
    id: "8",
    assetCode: "AST-MBG-1008",
    name: "Timbangan Digital Industri Kapasitas 150 Kg (Akurasi 10g)",
    category: "Instrumen Kalibrasi & Lab",
    brand: "Mettler Toledo Bench Scale",
    modelNumber: "BBA231-150KG",
    serialNumber: "SN-MT-77180",
    location: "SPPG Cilandak - Jakarta Selatan",
    pic: "Hendro Wijaya (Penerima Bahan)",
    acquisitionDate: "2025-12-15",
    purchasePrice: 14500000,
    usefulLifeYears: 6,
    salvageValue: 1500000,
    condition: "Rusak Ringan",
    status: "Maintenance",
    supplierVendor: "PT Alat Presisi Prima",
    powerRating: "220V AC / Rechargeable Battery",
    notes: "Display LED berkedip saat beban berat, butuh penggantian load cell kabel konektor.",
  },
];

export default function AssetRegistryTable() {
  const [assets, setAssets] = useState<AssetFormData[]>(INITIAL_ASSETS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedCondition, setSelectedCondition] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // Modals state
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isMaintenanceOpen, setIsMaintenanceOpen] = useState(false);

  const [selectedAsset, setSelectedAsset] = useState<AssetFormData | null>(null);
  const [editingAsset, setEditingAsset] = useState<AssetFormData | null>(null);

  // Helper for straight-line depreciation calculation
  const calculateBookValue = (asset: AssetFormData) => {
    const purchaseDate = new Date(asset.acquisitionDate);
    const currentDate = new Date();
    const yearsPassed = Math.max(0, (currentDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
    const effectiveYears = Math.min(yearsPassed, asset.usefulLifeYears);
    const annualDeprec = asset.usefulLifeYears > 0 ? (asset.purchasePrice - asset.salvageValue) / asset.usefulLifeYears : 0;
    const accumulated = Math.min(asset.purchasePrice - asset.salvageValue, annualDeprec * effectiveYears);
    return Math.max(asset.salvageValue, asset.purchasePrice - accumulated);
  };

  const totalAssetsCount = assets.length;
  const totalPurchaseValue = assets.reduce((sum, a) => sum + a.purchasePrice, 0);
  const totalBookValue = assets.reduce((sum, a) => sum + calculateBookValue(a), 0);
  const activeAssetsCount = assets.filter((a) => a.status === "Aktif").length;
  const maintenanceAssetsCount = assets.filter((a) => a.status === "Maintenance" || a.condition === "Perlu Servis" || a.condition === "Rusak Ringan").length;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Filtered Assets
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.assetCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.pic.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "ALL" || asset.category === selectedCategory;
    const matchesCondition = selectedCondition === "ALL" || asset.condition === selectedCondition;
    const matchesStatus = selectedStatus === "ALL" || asset.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesCondition && matchesStatus;
  });

  const handleSaveAsset = (formData: AssetFormData) => {
    if (formData.id) {
      setAssets((prev) => prev.map((a) => (a.id === formData.id ? formData : a)));
    } else {
      const newAsset: AssetFormData = {
        ...formData,
        id: Date.now().toString(),
      };
      setAssets((prev) => [newAsset, ...prev]);
    }
  };

  const handleDeleteAsset = (id?: string) => {
    if (!id) return;
    if (confirm("Apakah Anda yakin ingin menghapus data aset tetap ini dari inventaris?")) {
      setAssets((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleExportCsv = () => {
    const headers = ["Kode Aset,Nama Aset,Kategori,Merk,No Seri,Lokasi,PIC,Tanggal Beli,Harga Beli,Nilai Buku,Kondisi,Status"];
    const rows = filteredAssets.map((a) =>
      `"${a.assetCode}","${a.name}","${a.category}","${a.brand}","${a.serialNumber}","${a.location}","${a.pic}","${a.acquisitionDate}",${a.purchasePrice},${calculateBookValue(a)},"${a.condition}","${a.status}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Master_Aset_Tetap_MBG_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* 4 Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Aset Tetap</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {totalAssetsCount} <span className="text-xs font-normal text-gray-500">Unit</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <span>● {activeAssetsCount} Unit Beroperasi Aktif</span>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Nilai Buku Investasi</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                {formatRupiah(totalBookValue)}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <span>Harga Perolehan Awal: {formatRupiah(totalPurchaseValue)}</span>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Performa Siap Pakai</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {totalAssetsCount > 0 ? ((activeAssetsCount / totalAssetsCount) * 100).toFixed(0) : 0}%
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400 font-medium">
            <span>Kesiapan Dapur & Armada MBG</span>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Perlu Servis / Perbaikan</p>
              <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                {maintenanceAssetsCount} <span className="text-xs font-normal text-gray-500">Unit</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium">
            <span>Perlu Tindakan Maintenance Segera</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Filters, & Action Buttons */}
      <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari aset, nomor seri, kode QR, lokasi, PIC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Ekspor CSV
            </button>

            <button
              onClick={() => {
                setEditingAsset(null);
                setIsRegisterOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs hover:shadow transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Registrasi Aset Baru
            </button>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-100 dark:border-gray-800 text-xs">
          <div>
            <label className="block font-medium text-gray-500 dark:text-gray-400 mb-1">Kategori Aset:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
            >
              <option value="ALL">Semua Kategori</option>
              <option value="Peralatan Masak Komersial">Peralatan Masak Komersial</option>
              <option value="Armada Kendaraan Distribusi">Armada Kendaraan Distribusi</option>
              <option value="Cold Storage & Freezer">Cold Storage & Freezer</option>
              <option value="Wadah & Tray Stainless Steel">Wadah & Tray Stainless Steel</option>
              <option value="Instrumen Kalibrasi & Lab">Instrumen Kalibrasi & Lab</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-500 dark:text-gray-400 mb-1">Kondisi Fisik:</label>
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="w-full px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
            >
              <option value="ALL">Semua Kondisi</option>
              <option value="Baik">Baik (Prima)</option>
              <option value="Perlu Servis">Perlu Servis / Kalibrasi</option>
              <option value="Rusak Ringan">Rusak Ringan</option>
              <option value="Rusak Berat">Rusak Berat</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-500 dark:text-gray-400 mb-1">Status Operasional:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
            >
              <option value="ALL">Semua Status</option>
              <option value="Aktif">Aktif Beroperasi</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Cadangan">Unit Cadangan</option>
              <option value="Disposal">Disposal</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Asset Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 font-semibold border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-4 py-3.5">Kode & QR</th>
                <th className="px-4 py-3.5">Nama Aset & Spesifikasi</th>
                <th className="px-4 py-3.5">Kategori</th>
                <th className="px-4 py-3.5">Lokasi & PIC</th>
                <th className="px-4 py-3.5">Harga Beli / Nilai Buku</th>
                <th className="px-4 py-3.5">Kondisi</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    Tidak ada data aset tetap yang sesuai dengan filter pencarian.
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => {
                  const bookVal = calculateBookValue(asset);
                  return (
                    <tr key={asset.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors">
                      {/* Kode & QR */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedAsset(asset);
                              setIsQrOpen(true);
                            }}
                            title="Klik untuk cetak label QR Code"
                            className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                          </button>
                          <div>
                            <span className="font-mono font-bold text-gray-900 dark:text-white block">
                              {asset.assetCode}
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono">
                              SN: {asset.serialNumber}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Nama & Spesifikasi */}
                      <td className="px-4 py-3 min-w-[220px]">
                        <div
                          onClick={() => {
                            setSelectedAsset(asset);
                            setIsDetailOpen(true);
                          }}
                          className="cursor-pointer group"
                        >
                          <span className="font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors block">
                            {asset.name}
                          </span>
                          <span className="text-[11px] text-gray-500 dark:text-gray-400">
                            {asset.brand} {asset.modelNumber ? `• ${asset.modelNumber}` : ""}
                          </span>
                        </div>
                      </td>

                      {/* Kategori */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2.5 py-1 text-[11px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md">
                          {asset.category}
                        </span>
                      </td>

                      {/* Lokasi & PIC */}
                      <td className="px-4 py-3">
                        <span className="font-medium text-gray-800 dark:text-gray-200 block">
                          {asset.location}
                        </span>
                        <span className="text-[10px] text-gray-500">PIC: {asset.pic}</span>
                      </td>

                      {/* Nilai Finansial */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
                          {formatRupiah(bookVal)}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          Beli: {formatRupiah(asset.purchasePrice)}
                        </span>
                      </td>

                      {/* Kondisi */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-md ${
                            asset.condition === "Baik"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                              : asset.condition === "Perlu Servis"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
                              : "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400"
                          }`}
                        >
                          {asset.condition}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-md ${
                            asset.status === "Aktif"
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-400"
                              : asset.status === "Maintenance"
                              ? "bg-amber-50 text-amber-600 border border-amber-200 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400"
                              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                          }`}
                        >
                          {asset.status}
                        </span>
                      </td>

                      {/* Aksi */}
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedAsset(asset);
                              setIsDetailOpen(true);
                            }}
                            title="Lihat Detail & Depresiasi"
                            className="p-1 text-gray-500 hover:text-emerald-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>

                          <button
                            onClick={() => {
                              setSelectedAsset(asset);
                              setIsQrOpen(true);
                            }}
                            title="Cetak Label QR Code"
                            className="p-1 text-gray-500 hover:text-emerald-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                          </button>

                          <button
                            onClick={() => {
                              setEditingAsset(asset);
                              setIsRegisterOpen(true);
                            }}
                            title="Edit Data Aset"
                            className="p-1 text-gray-500 hover:text-blue-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>

                          <button
                            onClick={() => handleDeleteAsset(asset.id)}
                            title="Hapus Aset"
                            className="p-1 text-gray-500 hover:text-rose-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AssetRegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => {
          setIsRegisterOpen(false);
          setEditingAsset(null);
        }}
        onSave={handleSaveAsset}
        initialData={editingAsset}
      />

      <AssetDetailModal
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedAsset(null);
        }}
        asset={selectedAsset}
        onPrintQr={(ast) => {
          setSelectedAsset(ast);
          setIsDetailOpen(false);
          setIsQrOpen(true);
        }}
        onEdit={(ast) => {
          setEditingAsset(ast);
          setIsDetailOpen(false);
          setIsRegisterOpen(true);
        }}
        onScheduleMaintenance={(ast) => {
          setSelectedAsset(ast);
          setIsDetailOpen(false);
          setIsMaintenanceOpen(true);
        }}
      />

      {selectedAsset && (
        <AssetQrPrintModal
          isOpen={isQrOpen}
          onClose={() => {
            setIsQrOpen(false);
            setSelectedAsset(null);
          }}
          asset={{
            id: selectedAsset.id || "",
            assetCode: selectedAsset.assetCode,
            name: selectedAsset.name,
            category: selectedAsset.category,
            serialNumber: selectedAsset.serialNumber,
            location: selectedAsset.location,
            acquisitionDate: selectedAsset.acquisitionDate,
            pic: selectedAsset.pic,
            condition: selectedAsset.condition,
          }}
        />
      )}

      {selectedAsset && (
        <CreateMaintenanceModal
          isOpen={isMaintenanceOpen}
          onClose={() => {
            setIsMaintenanceOpen(false);
            setSelectedAsset(null);
          }}
          onSave={(task) => {
            alert(`Jadwal servis untuk ${selectedAsset.name} berhasil dibuat!`);
            setIsMaintenanceOpen(false);
            setSelectedAsset(null);
          }}
          preselectedAsset={{
            assetCode: selectedAsset.assetCode,
            name: selectedAsset.name,
            location: selectedAsset.location,
          }}
        />
      )}
    </div>
  );
}
