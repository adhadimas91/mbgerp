"use client";
import React, { useState } from "react";

export interface KitchenRequisitionItem {
  ingredientName: string;
  qty: number;
  unit: string;
  reason: string;
}

interface KitchenRequisitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (requisition: {
    code: string;
    requestTime: string;
    requestedBy: string;
    targetLine: string;
    items: KitchenRequisitionItem[];
    urgency: "NORMAL" | "URGENT" | "CRITICAL";
  }) => void;
}

export const KitchenRequisitionModal: React.FC<KitchenRequisitionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [requestedBy, setRequestedBy] = useState("Chef Rahmat Hidayat (Head Chef)");
  const [targetLine, setTargetLine] = useState("Line 2 - Protein Hewani (Ayam Panggang)");
  const [urgency, setUrgency] = useState<"NORMAL" | "URGENT" | "CRITICAL">("URGENT");
  const [items, setItems] = useState<KitchenRequisitionItem[]>([
    {
      ingredientName: "Daging Ayam Fillet Dada Segar",
      qty: 25,
      unit: "Kg",
      reason: "Penambahan porsi darurat untuk SDN Menteng 01 (+100 siswa)",
    },
    {
      ingredientName: "Kecap Manis Fermentasi Kedelai",
      qty: 4,
      unit: "Botol (1L)",
      reason: "Pelengkap bumbu karamelisasi porsi tambahan",
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        ingredientName: "",
        qty: 1,
        unit: "Kg",
        reason: "",
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof KitchenRequisitionItem, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const now = new Date();
    const code = `REQ-DPR-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
      now.getDate()
    ).padStart(2, "0")}-${Math.floor(100 + Math.random() * 900)}`;

    setTimeout(() => {
      onSubmit({
        code,
        requestTime: `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")} WIB`,
        requestedBy,
        targetLine,
        items,
        urgency,
      });
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white/95 backdrop-blur dark:bg-gray-900/95 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Voucher Permintaan Bahan Masak ke Gudang
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Kitchen Ingredient Requisition Slip (SPPG Dapur Sentral)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 rounded-lg hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Petugas Pemohon (Chef In Charge)
              </label>
              <input
                type="text"
                value={requestedBy}
                onChange={(e) => setRequestedBy(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Lini Produksi Tujuan
              </label>
              <select
                value={targetLine}
                onChange={(e) => setTargetLine(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option>Line 1 - Karbohidrat (Nasi/Beras)</option>
                <option>Line 2 - Protein Hewani (Ayam Panggang)</option>
                <option>Line 3 - Sayur & Sup (Tumis Pelangi)</option>
                <option>Line 4 - Packaging & Sealing Food Tray</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tingkat Urgensi Permintaan
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["NORMAL", "URGENT", "CRITICAL"] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setUrgency(lvl)}
                  className={`py-2 px-3 text-xs font-bold rounded-lg border transition ${
                    urgency === lvl
                      ? lvl === "CRITICAL"
                        ? "bg-rose-500 text-white border-rose-600 shadow-sm"
                        : lvl === "URGENT"
                        ? "bg-amber-500 text-white border-amber-600 shadow-sm"
                        : "bg-emerald-600 text-white border-emerald-700 shadow-sm"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {lvl === "NORMAL" && "🟢 Normal (30 Menit)"}
                  {lvl === "URGENT" && "🟡 Urgent (10 Menit)"}
                  {lvl === "CRITICAL" && "🔴 Kritis (Langsung Kirim)"}
                </button>
              ))}
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Daftar Bahan Baku Tambahan
              </label>
              <button
                type="button"
                onClick={handleAddItem}
                className="text-xs text-amber-600 hover:text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1"
              >
                + Tambah Item Bahan
              </button>
            </div>

            {items.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/40 space-y-2.5"
              >
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-6">
                    <input
                      type="text"
                      placeholder="Nama Bahan Baku (mis: Beras, Ayam, dsb)"
                      value={item.ingredientName}
                      onChange={(e) => handleItemChange(idx, "ingredientName", e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      placeholder="Jumlah"
                      value={item.qty}
                      onChange={(e) => handleItemChange(idx, "qty", Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <select
                      value={item.unit}
                      onChange={(e) => handleItemChange(idx, "unit", e.target.value)}
                      className="w-full px-2 py-1.5 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option>Kg</option>
                      <option>Gram</option>
                      <option>Liter</option>
                      <option>Botol</option>
                      <option>Pack</option>
                      <option>Butir</option>
                    </select>
                  </div>
                  <div className="col-span-1 flex justify-center items-center">
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="text-rose-500 hover:text-rose-700 p-1"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Alasan permintaan bahan (mis: Porsi tambahan, deviasi masak, dsb)"
                  value={item.reason}
                  onChange={(e) => handleItemChange(idx, "reason", e.target.value)}
                  className="w-full px-2.5 py-1.5 text-[11px] rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-amber-600 rounded-xl shadow-md hover:bg-amber-700 transition"
            >
              {isSubmitting ? "Mengirim ke Gudang..." : "Kirim Permintaan ke Petugas Gudang"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
