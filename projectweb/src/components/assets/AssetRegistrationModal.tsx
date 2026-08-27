"use client";

import React, { useState, useEffect } from "react";

export interface AssetFormData {
  id?: string;
  assetCode: string;
  name: string;
  category: string;
  brand: string;
  modelNumber: string;
  serialNumber: string;
  location: string;
  pic: string;
  acquisitionDate: string;
  purchasePrice: number;
  usefulLifeYears: number;
  salvageValue: number;
  condition: "Baik" | "Perlu Servis" | "Rusak Ringan" | "Rusak Berat";
  status: "Aktif" | "Maintenance" | "Cadangan" | "Disposal";
  supplierVendor: string;
  powerRating?: string;
  notes?: string;
}

interface AssetRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AssetFormData) => void;
  initialData?: AssetFormData | null;
}

export default function AssetRegistrationModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: AssetRegistrationModalProps) {
  const [formData, setFormData] = useState<AssetFormData>({
    assetCode: "AST-MBG-2026-000",
    name: "",
    category: "Peralatan Masak Komersial",
    brand: "",
    modelNumber: "",
    serialNumber: "",
    location: "Dapur Sentral Harmoni - Jakarta Pusat",
    pic: "Chef Budi Prakoso",
    acquisitionDate: new Date().toISOString().split("T")[0],
    purchasePrice: 15000000,
    usefulLifeYears: 5,
    salvageValue: 1500000,
    condition: "Baik",
    status: "Aktif",
    supplierVendor: "PT Kitchen Multi Sarana",
    powerRating: "3500 W / Gas LPG Industri",
    notes: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      const randomCode = `AST-MBG-${Math.floor(1000 + Math.random() * 9000)}`;
      setFormData({
        assetCode: randomCode,
        name: "",
        category: "Peralatan Masak Komersial",
        brand: "",
        modelNumber: "",
        serialNumber: "",
        location: "Dapur Sentral Harmoni - Jakarta Pusat",
        pic: "Chef Budi Prakoso",
        acquisitionDate: new Date().toISOString().split("T")[0],
        purchasePrice: 15000000,
        usefulLifeYears: 5,
        salvageValue: 1500000,
        condition: "Baik",
        status: "Aktif",
        supplierVendor: "PT Kitchen Multi Sarana",
        powerRating: "3500 W / Gas LPG",
        notes: "",
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const annualDepreciation =
    formData.usefulLifeYears > 0
      ? (formData.purchasePrice - formData.salvageValue) / formData.usefulLifeYears
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {initialData ? "Edit Data Aset Tetap" : "Registrasi Aset Tetap Baru"}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Pencatatan inventaris aset MBG, nomor seri, dan perhitungan depresiasi
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Bagian 1: Identifikasi & Kategori */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              1. Identifikasi & Kategori Aset
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  ID / Kode Aset (Auto)
                </label>
                <input
                  type="text"
                  required
                  value={formData.assetCode}
                  onChange={(e) => setFormData({ ...formData, assetCode: e.target.value })}
                  className="w-full px-3 py-2 text-sm font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Nama Aset Tetap
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Combi Steamer Oven Industri 10 Tray"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Kategori Aset
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Peralatan Masak Komersial">Peralatan Masak Komersial</option>
                  <option value="Armada Kendaraan Distribusi">Armada Kendaraan Distribusi</option>
                  <option value="Cold Storage & Freezer">Cold Storage & Freezer</option>
                  <option value="Wadah & Tray Stainless Steel">Wadah & Tray Stainless Steel</option>
                  <option value="Instrumen Kalibrasi & Lab">Instrumen Kalibrasi & Lab</option>
                  <option value="Elektronik & IT Gateway">Elektronik & IT Gateway</option>
                  <option value="Fasilitas Gedung Dapur">Fasilitas Gedung Dapur</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Merk / Brand
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Rational / Hoshizaki / Isuzu"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Nomor Seri / No Polisi
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: SN-8829103 / B 9812 PQA"
                  value={formData.serialNumber}
                  onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                  className="w-full px-3 py-2 text-sm font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Bagian 2: Penempatan & Operasional */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              2. Penempatan, Kondisi & Status
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Lokasi Unit Penempatan
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Dapur Sentral Harmoni - Jakarta Pusat">Dapur Sentral Harmoni - Jakarta Pusat</option>
                  <option value="SPPG Klender - Jakarta Timur">SPPG Klender - Jakarta Timur</option>
                  <option value="SPPG Cilandak - Jakarta Selatan">SPPG Cilandak - Jakarta Selatan</option>
                  <option value="Gudang Induk Buffer Pangan Cakung">Gudang Induk Buffer Pangan Cakung</option>
                  <option value="Armada Distribusi Wilayah 1">Armada Distribusi Wilayah 1</option>
                  <option value="Armada Distribusi Wilayah 2">Armada Distribusi Wilayah 2</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Penanggung Jawab (PIC)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Chef Budi / Driver Agus"
                  value={formData.pic}
                  onChange={(e) => setFormData({ ...formData, pic: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Spesifikasi Daya / Kapasitas
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 3500 Watt / 2.5 Ton Pendingin"
                  value={formData.powerRating || ""}
                  onChange={(e) => setFormData({ ...formData, powerRating: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Kondisi Fisik Alat
                </label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value as AssetFormData["condition"] })}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Baik">Baik (Prima / Siap Pakai)</option>
                  <option value="Perlu Servis">Perlu Servis / Kalibrasi</option>
                  <option value="Rusak Ringan">Rusak Ringan</option>
                  <option value="Rusak Berat">Rusak Berat (Tidak Layak)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Status Operasional
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as AssetFormData["status"] })}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Aktif">Aktif Beroperasi</option>
                  <option value="Maintenance">Sedang Maintenance / Perbaikan</option>
                  <option value="Cadangan">Unit Cadangan / Standby</option>
                  <option value="Disposal">Penghapusan / Disposal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Vendor Pengadaan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: PT Boga Sarana Mandiri"
                  value={formData.supplierVendor}
                  onChange={(e) => setFormData({ ...formData, supplierVendor: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Bagian 3: Finansial & Depresiasi */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              3. Nilai Perolehan & Depresiasi (Straight-Line)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Tanggal Perolehan
                </label>
                <input
                  type="date"
                  required
                  value={formData.acquisitionDate}
                  onChange={(e) => setFormData({ ...formData, acquisitionDate: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Harga Beli (Rp)
                </label>
                <input
                  type="number"
                  min="0"
                  step="100000"
                  required
                  value={formData.purchasePrice}
                  onChange={(e) => setFormData({ ...formData, purchasePrice: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-sm font-semibold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Masa Manfaat (Tahun)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  required
                  value={formData.usefulLifeYears}
                  onChange={(e) => setFormData({ ...formData, usefulLifeYears: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Nilai Sisa / Residu (Rp)
                </label>
                <input
                  type="number"
                  min="0"
                  step="50000"
                  value={formData.salvageValue}
                  onChange={(e) => setFormData({ ...formData, salvageValue: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="md:col-span-4 pt-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">
                  Estimasi Penyusutan per Tahun (Metode Garis Lurus):
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(annualDepreciation)} / tahun
                </span>
              </div>
            </div>
          </div>

          {/* Catatan Tambahan */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Catatan Khusus / Riwayat Sertifikat Kelaikan
            </label>
            <textarea
              rows={2}
              placeholder="Contoh: Telah lulus uji sanitasi food contact ISO 22000 pada saat penerimaan..."
              value={formData.notes || ""}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm hover:shadow transition-all"
            >
              {initialData ? "Simpan Perubahan Aset" : "Daftarkan Aset Baru"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
