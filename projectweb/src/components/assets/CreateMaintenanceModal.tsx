"use client";

import React, { useState, useEffect } from "react";

export interface MaintenanceTaskData {
  id?: string;
  workOrderNumber: string;
  assetCode: string;
  assetName: string;
  location: string;
  type: "Preventive Service" | "Corrective Repair" | "Kalibrasi Presisi" | "Deep Cleaning Sanitasi";
  priority: "Rendah" | "Sedang" | "Tinggi" | "Kritis / Darurat";
  scheduledDate: string;
  technicianName: string;
  vendorCompany: string;
  estimatedCost: number;
  spareParts: string;
  status: "Terjadwal" | "Sedang Dikerjakan" | "Selesai" | "Terlambat";
  checklist: string[];
  description: string;
}

interface CreateMaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: MaintenanceTaskData) => void;
  initialData?: MaintenanceTaskData | null;
  preselectedAsset?: {
    assetCode: string;
    name: string;
    location: string;
  };
}

export default function CreateMaintenanceModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  preselectedAsset,
}: CreateMaintenanceModalProps) {
  const [formData, setFormData] = useState<MaintenanceTaskData>({
    workOrderNumber: "WO-MBG-2026-000",
    assetCode: "AST-MBG-1001",
    assetName: "Combi Steamer Industri 10 Tray",
    location: "Dapur Sentral Harmoni - Jakarta Pusat",
    type: "Preventive Service",
    priority: "Sedang",
    scheduledDate: new Date().toISOString().split("T")[0],
    technicianName: "Hendra Setiawan",
    vendorCompany: "PT Kitchen Multi Sarana",
    estimatedCost: 750000,
    spareParts: "Gasket Seal Pintu Oven & Descaler Cairan Asam Sitrat Food Grade",
    status: "Terjadwal",
    checklist: [
      "Pembersihan kerak boiler / Descaling pipa uap",
      "Kalibrasi sensor termostat suhu memasak",
      "Pemeriksaan kebocoran jalur gas LPG",
      "Uji fungsi safety valve & emergency cutoff",
    ],
    description: "Servis berkala 3 bulanan sesuai anjuran manual pabrikan dan standar ISO 22000.",
  });

  const [newChecklistItem, setNewChecklistItem] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      const randomWo = `WO-MBG-${Math.floor(1000 + Math.random() * 9000)}`;
      setFormData({
        workOrderNumber: randomWo,
        assetCode: preselectedAsset ? preselectedAsset.assetCode : "AST-MBG-1001",
        assetName: preselectedAsset ? preselectedAsset.name : "Combi Steamer Industri 10 Tray",
        location: preselectedAsset ? preselectedAsset.location : "Dapur Sentral Harmoni - Jakarta Pusat",
        type: "Preventive Service",
        priority: "Sedang",
        scheduledDate: new Date().toISOString().split("T")[0],
        technicianName: "Hendra Setiawan",
        vendorCompany: "PT Kitchen Multi Sarana",
        estimatedCost: 750000,
        spareParts: "Gasket Seal Pintu Oven",
        status: "Terjadwal",
        checklist: [
          "Pembersihan kerak boiler / Descaling pipa uap",
          "Kalibrasi sensor termostat suhu memasak",
          "Pemeriksaan kebocoran sambungan gas",
        ],
        description: "Servis berkala preventif untuk menjaga keandalan dapur sentral.",
      });
    }
  }, [initialData, preselectedAsset, isOpen]);

  if (!isOpen) return null;

  const handleAddChecklist = () => {
    if (!newChecklistItem.trim()) return;
    setFormData((prev) => ({
      ...prev,
      checklist: [...prev.checklist, newChecklistItem.trim()],
    }));
    setNewChecklistItem("");
  };

  const handleRemoveChecklist = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      checklist: prev.checklist.filter((_, idx) => idx !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {initialData ? "Edit Perintah Kerja Servis (WO)" : "Buat Jadwal Servis / Lapor Kerusakan"}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Penerbitan Work Order Maintenance mesin masak, cold chain, & armada
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

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Work Order Header & Asset Info */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  No. Work Order (Auto)
                </label>
                <input
                  type="text"
                  required
                  value={formData.workOrderNumber}
                  onChange={(e) => setFormData({ ...formData, workOrderNumber: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Pilih Kode Aset
                </label>
                <input
                  type="text"
                  required
                  placeholder="AST-MBG-1001"
                  value={formData.assetCode}
                  onChange={(e) => setFormData({ ...formData, assetCode: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Nama Aset
                </label>
                <input
                  type="text"
                  required
                  value={formData.assetName}
                  onChange={(e) => setFormData({ ...formData, assetName: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Maintenance Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Jenis Pemeliharaan
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as MaintenanceTaskData["type"] })}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500"
              >
                <option value="Preventive Service">Preventive Service (Rutin)</option>
                <option value="Corrective Repair">Corrective Repair (Perbaikan)</option>
                <option value="Kalibrasi Presisi">Kalibrasi Presisi (Suhu/Timbang)</option>
                <option value="Deep Cleaning Sanitasi">Deep Cleaning Sanitasi</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Tingkat Prioritas
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as MaintenanceTaskData["priority"] })}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500"
              >
                <option value="Rendah">Rendah (Jadwal Normal)</option>
                <option value="Sedang">Sedang (Dalam 3 Hari)</option>
                <option value="Tinggi">Tinggi (Maks 24 Jam)</option>
                <option value="Kritis / Darurat">Kritis / Darurat (Operasional Dapur Stop)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Tanggal Rencana Servis
              </label>
              <input
                type="date"
                required
                value={formData.scheduledDate}
                onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500"
              >
              </input>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Vendor / Bengkel Rekanan
              </label>
              <input
                type="text"
                required
                placeholder="PT Kitchen Multi Sarana"
                value={formData.vendorCompany}
                onChange={(e) => setFormData({ ...formData, vendorCompany: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Nama Teknisi Pelaksana
              </label>
              <input
                type="text"
                required
                placeholder="Nama teknisi / PIC"
                value={formData.technicianName}
                onChange={(e) => setFormData({ ...formData, technicianName: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Estimasi Biaya Servis (Rp)
              </label>
              <input
                type="number"
                min="0"
                step="50000"
                value={formData.estimatedCost}
                onChange={(e) => setFormData({ ...formData, estimatedCost: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs font-semibold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Kebutuhan Suku Cadang / Material Pengganti
              </label>
              <input
                type="text"
                placeholder="Contoh: Freon R404A 2kg, Filter Oli Mesin, Sensor Suhu NTC"
                value={formData.spareParts}
                onChange={(e) => setFormData({ ...formData, spareParts: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Checklist Pengerjaan Servis */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Daftar Checklist Tugas / Item Pengecekan
            </label>
            <div className="space-y-2 mb-3">
              {formData.checklist.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">{item}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveChecklist(idx)}
                    className="p-1 text-gray-400 hover:text-rose-600 rounded transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Tambahkan poin checklist servis baru..."
                value={newChecklistItem}
                onChange={(e) => setNewChecklistItem(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddChecklist();
                  }
                }}
                className="flex-1 px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
              />
              <button
                type="button"
                onClick={handleAddChecklist}
                className="px-4 py-2 text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl hover:bg-amber-100 transition-colors"
              >
                Tambah
              </button>
            </div>
          </div>

          {/* Deskripsi Tambahan */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Catatan / Instruksi Khusus
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs hover:shadow transition-all"
            >
              {initialData ? "Simpan Perubahan WO" : "Terbitkan Work Order Servis"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
