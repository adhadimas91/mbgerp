"use client";
import React, { useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";

interface StockMovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (movement: any) => void;
}

export const StockMovementModal: React.FC<StockMovementModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    type: "IN" as "IN" | "OUT" | "ADJUST",
    productName: "Daging Ayam Broiler Karkas (Dingin)",
    quantity: "",
    unit: "kg",
    warehouse: "Cold Storage Utama (Gudang Pusat)",
    batchLotNumber: `LOT-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}-01`,
    referenceDoc: "PO-MBG-2026-0881",
    expiryDate: "2026-03-15",
    temperatureLog: "2.4",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess({
        id: `MOV-${Math.floor(1000 + Math.random() * 9000)}`,
        ...formData,
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
      });
      onClose();
    }, 600);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
      <div className="border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Pencatatan Mutasi Stok Bahan Baku
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Formulir barang masuk (Supplier), pengeluaran dapur masak MBG, atau penyesuaian stok
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Tipe Mutasi Tabs */}
        <div>
          <label className="mb-2 block font-semibold text-gray-700 dark:text-gray-300">
            Jenis Pergerakan Stok <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "IN", referenceDoc: "PO-MBG-2026-0881" })}
              className={`flex items-center justify-center gap-2 rounded-xl p-2.5 font-bold transition ${
                formData.type === "IN"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              <span>⬇️</span> Penerimaan (IN)
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "OUT", referenceDoc: "WO-KITCHEN-2026-042" })}
              className={`flex items-center justify-center gap-2 rounded-xl p-2.5 font-bold transition ${
                formData.type === "OUT"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              <span>⬆️</span> Keluar Dapur (OUT)
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: "ADJUST", referenceDoc: "ADJ-REPORT-011" })}
              className={`flex items-center justify-center gap-2 rounded-xl p-2.5 font-bold transition ${
                formData.type === "ADJUST"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              <span>⚖️</span> Penyesuaian (ADJUST)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block font-medium text-gray-700 dark:text-gray-300">
              Komoditas Bahan Baku <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              className="h-10 w-full rounded-xl border border-gray-300 bg-transparent px-3 text-xs text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white dark:bg-gray-800"
            >
              <option value="Daging Ayam Broiler Karkas (Dingin)">Daging Ayam Broiler Karkas (Dingin)</option>
              <option value="Beras Premium IR-64 Kepala">Beras Premium IR-64 Kepala</option>
              <option value="Telur Ayam Ras Segar">Telur Ayam Ras Segar</option>
              <option value="Susu Sapi Segar Pasteurisasi">Susu Sapi Segar Pasteurisasi</option>
              <option value="Bayam Hidroponik Segar">Bayam Hidroponik Segar</option>
              <option value="Wortel Manis Berastagi">Wortel Manis Berastagi</option>
              <option value="Minyak Goreng Sawit Kelapa">Minyak Goreng Sawit Kelapa</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block font-medium text-gray-700 dark:text-gray-300">
              Jumlah Kuantitas ({formData.unit}) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              placeholder="Contoh: 500"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="h-10 w-full rounded-xl border border-gray-300 bg-transparent px-3 text-xs text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block font-medium text-gray-700 dark:text-gray-300">
              Gudang & Lokasi Penyimpanan <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.warehouse}
              onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
              className="h-10 w-full rounded-xl border border-gray-300 bg-transparent px-3 text-xs text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white dark:bg-gray-800"
            >
              <option value="Cold Storage Utama (Gudang Pusat)">Cold Storage Utama (Chiller 0-4°C)</option>
              <option value="Freezer Daging/Ikan (-18°C)">Freezer Daging/Ikan (-18°C)</option>
              <option value="Gudang Kering Bahan Pokok (Dry Storage A)">Gudang Kering Bahan Pokok (Dry Storage A)</option>
              <option value="Chiller Sayur & Buah Segar (6°C)">Chiller Sayur & Buah Segar (6°C)</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block font-medium text-gray-700 dark:text-gray-300">
              Nomor Batch / Lot Number (Traceability) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.batchLotNumber}
              onChange={(e) => setFormData({ ...formData, batchLotNumber: e.target.value })}
              className="h-10 w-full rounded-xl border border-gray-300 bg-transparent px-3 text-xs text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block font-medium text-gray-700 dark:text-gray-300">
              No. Dokumen Acuan (PO/SPK) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.referenceDoc}
              onChange={(e) => setFormData({ ...formData, referenceDoc: e.target.value })}
              className="h-10 w-full rounded-xl border border-gray-300 bg-transparent px-3 text-xs text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-medium text-gray-700 dark:text-gray-300">
              Tanggal Kadaluarsa (Expiry) <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              className="h-10 w-full rounded-xl border border-gray-300 bg-transparent px-3 text-xs text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-medium text-gray-700 dark:text-gray-300">
              Log Suhu Saat Diterima (°C)
            </label>
            <input
              type="text"
              placeholder="Contoh: 2.8°C"
              value={formData.temperatureLog}
              onChange={(e) => setFormData({ ...formData, temperatureLog: e.target.value })}
              className="h-10 w-full rounded-xl border border-gray-300 bg-transparent px-3 text-xs text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block font-medium text-gray-700 dark:text-gray-300">
            Catatan / Keterangan Mutasi
          </label>
          <textarea
            rows={2}
            placeholder="Keterangan tambahan mutasi barang atau nomor resep menu..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full rounded-xl border border-gray-300 bg-transparent p-2.5 text-xs text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            Batal
          </button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-5 py-2"
          >
            {isSubmitting ? "Menyimpan Mutasi..." : "Simpan Mutasi Stok"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default StockMovementModal;
