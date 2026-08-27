"use client";
import React, { useState } from "react";

export interface KitchenExpenseItem {
  id: string;
  date: string;
  sppgUnit: string;
  category: "BAHAN_TAMBAHAN" | "GAS_ENERGI" | "COLD_CHAIN" | "SERVIS_ALAT" | "SANITASI" | "LAINNYA";
  categoryLabel: string;
  title: string;
  amount: number;
  vendor: string;
  picName: string;
  picRole: string;
  receiptNumber: string;
  paymentMethod: "KAS_KECIL" | "REIMBURSEMENT" | "TRANSFER_QRIS";
  status: "APPROVED" | "PENDING_APPROVAL" | "REJECTED";
  notes: string;
}

interface KitchenExpenseRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveExpense: (expense: KitchenExpenseItem) => void;
  currentSppg: string;
}

export const KitchenExpenseRecordModal: React.FC<KitchenExpenseRecordModalProps> = ({
  isOpen,
  onClose,
  onSaveExpense,
  currentSppg,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "BAHAN_TAMBAHAN" as KitchenExpenseItem["category"],
    amount: "",
    vendor: "",
    picName: "Chef Bambang Supardi",
    picRole: "Head Chef SPPG",
    paymentMethod: "KAS_KECIL" as KitchenExpenseItem["paymentMethod"],
    receiptNumber: `RCP-DPR-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(100 + Math.random() * 900)}`,
    notes: "",
    receiptFile: null as File | null,
    autoApprove: true,
  });

  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const categoryOptions = [
    { value: "BAHAN_TAMBAHAN", label: "Bahan Baku & Bumbu Darurat (Pasar Lokal)", desc: "Bumbu dapur habis, cabai tambahan, daun aromatik" },
    { value: "GAS_ENERGI", label: "Gas LPG 50kg / Bahan Bakar Cadangan", desc: "Isi ulang tabung darurat di luar kontrak bulanan" },
    { value: "COLD_CHAIN", label: "Es Batu Kristal Food Grade & Cold Gel", desc: "Penanganan darurat holding dingin sayur & buah" },
    { value: "SERVIS_ALAT", label: "Servis Darurat / Penggantian Seal Mesin", desc: "Seal silicone tray sealer, seal gasket steamer" },
    { value: "SANITASI", label: "Chemical Sanitizer & APD Steril Tambahan", desc: "Hand rub food-grade, celemek disposable, hairnet" },
    { value: "LAINNYA", label: "Biaya Operasional Dapur Mendesak Lainnya", desc: "Transport darurat pengadaan bahan, retribusi pasar" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, receiptFile: file });
      setReceiptPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) {
      alert("Mohon lengkapi judul pengeluaran dan nominal biaya.");
      return;
    }

    const numAmount = parseInt(formData.amount.replace(/[^0-9]/g, ""), 10) || 0;
    const catObj = categoryOptions.find((c) => c.value === formData.category);

    const newExpense: KitchenExpenseItem = {
      id: `EXP-DPR-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }) + " WIB",
      sppgUnit: currentSppg,
      category: formData.category,
      categoryLabel: catObj ? catObj.label.split(" (")[0] : "Operasional Dapur",
      title: formData.title,
      amount: numAmount,
      vendor: formData.vendor || "Pedagang Pasar Lokal / Toko Perlengkapan",
      picName: formData.picName,
      picRole: formData.picRole,
      receiptNumber: formData.receiptNumber,
      paymentMethod: formData.paymentMethod,
      status: formData.autoApprove ? "APPROVED" : "PENDING_APPROVAL",
      notes: formData.notes || "Pengeluaran operasional kas kecil dapur sentral SPPG.",
    };

    onSaveExpense(newExpense);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-white/20 text-white uppercase tracking-wider">
                Petty Cash & Operasional Dapur
              </span>
              <span className="text-xs text-emerald-100 font-medium">
                {currentSppg}
              </span>
            </div>
            <h2 className="text-lg font-bold mt-1">
              Catat Pengeluaran Kas Kecil Dapur Sentral
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Unit Dapur & Nomor Bukti */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Unit SPPG Dapur Terkelola
              </label>
              <input
                type="text"
                disabled
                value={currentSppg}
                className="w-full text-xs font-semibold px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Nomor Bukti Transaksi / Kuitansi
              </label>
              <input
                type="text"
                value={formData.receiptNumber}
                onChange={(e) => setFormData({ ...formData, receiptNumber: e.target.value })}
                className="w-full text-xs font-mono px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Kategori Pengeluaran */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Kategori Pos Pengeluaran Dapur <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full text-xs px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Judul Pengeluaran & Nominal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Nama Pengeluaran / Keperluan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Beli 5kg Bawang Putih & 3kg Jahe Segar"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Nominal Biaya (Rp) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs font-bold text-gray-500">Rp</span>
                <input
                  type="number"
                  placeholder="0"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full text-xs font-bold pl-10 pr-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Toko/Vendor & Metode Pembayaran */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Toko / Supplier / Penjual
              </label>
              <input
                type="text"
                placeholder="Contoh: Pasar Induk Kramat Jati / TB Sumber Rejeki"
                value={formData.vendor}
                onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Metode Pembayaran
              </label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                className="w-full text-xs px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="KAS_KECIL">Kas Kecil Tunai (Petty Cash Dapur)</option>
                <option value="TRANSFER_QRIS">Transfer Bank / QRIS Dinamis</option>
                <option value="REIMBURSEMENT">Reimbursement Staf Dapur</option>
              </select>
            </div>
          </div>

          {/* PIC Pengaju & Peran */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Nama Staf Dapur Pengaju (PIC)
              </label>
              <input
                type="text"
                value={formData.picName}
                onChange={(e) => setFormData({ ...formData, picName: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Jabatan / Peran Dapur
              </label>
              <select
                value={formData.picRole}
                onChange={(e) => setFormData({ ...formData, picRole: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Head Chef SPPG">Head Chef SPPG</option>
                <option value="Sous Chef / Chef Lini">Sous Chef / Chef Lini</option>
                <option value="Ahli Gizi SPPG">Ahli Gizi SPPG</option>
                <option value="Teknisi Maintenance Dapur">Teknisi Maintenance Dapur</option>
                <option value="Koordinator Sanitasi & Kebersihan">Koordinator Sanitasi & Kebersihan</option>
              </select>
            </div>
          </div>

          {/* Keterangan & Alasan Pengeluaran */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Catatan / Justifikasi Urgensi
            </label>
            <textarea
              rows={2}
              placeholder="Contoh: Pengadaan rempah tambahan karena penyesuaian bumbu batch 2 atas rekomendasi QC Ahli Gizi..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
            />
          </div>

          {/* Upload Nota / Struk Bukti Kasir */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Foto Bukti Struk / Nota Kuitansi Fisik
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <input
                type="file"
                id="receipt-file-input"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="receipt-file-input"
                className="cursor-pointer flex flex-col items-center justify-center gap-1.5"
              >
                <span className="text-2xl">🧾</span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {formData.receiptFile ? formData.receiptFile.name : "Klik untuk upload foto nota atau struk"}
                </span>
                <span className="text-[10px] text-gray-400">
                  Format JPG, PNG, atau PDF (Maks. 5MB)
                </span>
              </label>
            </div>
            {receiptPreview && (
              <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
                <span className="text-xs text-emerald-600 font-medium">✓ File nota terlampir</span>
                <button
                  type="button"
                  onClick={() => {
                    setReceiptPreview(null);
                    setFormData({ ...formData, receiptFile: null });
                  }}
                  className="text-xs text-red-500 hover:underline"
                >
                  Hapus
                </button>
              </div>
            )}
          </div>

          {/* Approval Otoritas Kepala SPPG */}
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="auto-approve"
                checked={formData.autoApprove}
                onChange={(e) => setFormData({ ...formData, autoApprove: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <label htmlFor="auto-approve" className="text-xs font-semibold text-emerald-900 dark:text-emerald-200 cursor-pointer">
                Otorisasi langsung sebagai Kepala SPPG (Status: APPROVED)
              </label>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase">
              BGN Verified
            </span>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <span>💾</span>
              <span>Simpan & Bukukan Kas Dapur</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
