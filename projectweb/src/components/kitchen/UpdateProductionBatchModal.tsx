"use client";
import React, { useState } from "react";

export interface ProductionBatchLine {
  id: string;
  name: string;
  category: "KARBOHIDRAT" | "PROTEIN" | "SAYUR" | "PACKAGING";
  menuItem: string;
  targetPortions: number;
  completedPortions: number;
  currentTemp: number;
  targetTempMin: number;
  status: "PREPARATION" | "COOKING" | "HOLDING" | "PACKAGING" | "COMPLETED";
  chefInCharge: string;
  startTime: string;
  estimatedFinish: string;
  equipment: string;
}

interface UpdateProductionBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lines: ProductionBatchLine[];
  onSave: (updatedLines: ProductionBatchLine[]) => void;
}

export const UpdateProductionBatchModal: React.FC<UpdateProductionBatchModalProps> = ({
  isOpen,
  onClose,
  lines,
  onSave,
}) => {
  const [batchLines, setBatchLines] = useState<ProductionBatchLine[]>(lines);
  const [selectedLineId, setSelectedLineId] = useState<string>(lines[0]?.id || "");
  const [note, setNote] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const currentLine = batchLines.find((l) => l.id === selectedLineId) || batchLines[0];

  const handleUpdateCurrentLine = (field: keyof ProductionBatchLine, value: any) => {
    setBatchLines((prev) =>
      prev.map((l) => (l.id === currentLine.id ? { ...l, [field]: value } : l))
    );
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onSave(batchLines);
      setIsSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white/95 backdrop-blur dark:bg-gray-900/95 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Update Status Lini Produksi Dapur
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Kontrol real-time progres masak & kepatuhan suhu CCP HACCP
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

        {/* Content */}
        <form onSubmit={handleSaveAll} className="p-6 space-y-5">
          {/* Select Line */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Pilih Lini Masak / Komponen Menu
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {batchLines.map((line) => {
                const isSelected = line.id === currentLine.id;
                return (
                  <button
                    key={line.id}
                    type="button"
                    onClick={() => setSelectedLineId(line.id)}
                    className={`px-3 py-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "border-orange-500 bg-orange-50/50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 shadow-sm ring-1 ring-orange-500"
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-70 block">
                      {line.name}
                    </span>
                    <span className="text-xs font-bold truncate block">{line.menuItem}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Line Editor */}
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Sedang Mengedit:</span>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  {currentLine.name} - {currentLine.menuItem}
                </h4>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                Alat: {currentLine.equipment}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Status */}
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status Tahapan Masak
                </label>
                <select
                  value={currentLine.status}
                  onChange={(e) => handleUpdateCurrentLine("status", e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="PREPARATION">1. Persiapan & Thawing (Preparation)</option>
                  <option value="COOKING">2. Sedang Dimasak (Cooking / Wok)</option>
                  <option value="HOLDING">3. Hot Holding Box (&gt; 60°C)</option>
                  <option value="PACKAGING">4. Pengemasan & Sealing Ompreng</option>
                  <option value="COMPLETED">5. Selesai Siap Kirim (Completed)</option>
                </select>
              </div>

              {/* Completed Portions */}
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Realisasi Porsi Selesai (Target: {currentLine.targetPortions.toLocaleString()} porsi)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max={currentLine.targetPortions + 500}
                    value={currentLine.completedPortions}
                    onChange={(e) => handleUpdateCurrentLine("completedPortions", Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-xs text-gray-400">Porsi</span>
                </div>
              </div>

              {/* Current Temperature (CCP) */}
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Suhu Masak Inti / Holding (°C) - Min: {currentLine.targetTempMin}°C
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={currentLine.currentTemp}
                    onChange={(e) => handleUpdateCurrentLine("currentTemp", Number(e.target.value))}
                    className={`w-full px-3 py-2 text-sm rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:outline-none ${
                      currentLine.currentTemp >= currentLine.targetTempMin
                        ? "border-emerald-400 focus:ring-emerald-500"
                        : "border-rose-400 focus:ring-rose-500"
                    }`}
                  />
                  <span className="absolute right-3 top-2 text-xs text-gray-400">°C</span>
                </div>
                {currentLine.currentTemp < currentLine.targetTempMin && (
                  <p className="text-[11px] text-rose-500 mt-1 font-medium">
                    ⚠️ Peringatan: Suhu di bawah ambang batas ISO 22000 ({currentLine.targetTempMin}°C)
                  </p>
                )}
              </div>

              {/* Chef In Charge */}
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Koki Penanggung Jawab (Chef PIC)
                </label>
                <input
                  type="text"
                  value={currentLine.chefInCharge}
                  onChange={(e) => handleUpdateCurrentLine("chefInCharge", e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Progress Bar Visual */}
            <div className="pt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Kemajuan Produksi</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">
                  {Math.round((currentLine.completedPortions / currentLine.targetPortions) * 100)}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    currentLine.completedPortions >= currentLine.targetPortions
                      ? "bg-emerald-500"
                      : "bg-orange-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      100,
                      Math.round((currentLine.completedPortions / currentLine.targetPortions) * 100)
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Catatan Operasional / Log Masak Dapur Sentral
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Contoh: Proses pengukusan nasi batch 2 selesai tepat waktu, tekstur pulen dan matang sempurna."
              className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSuccess}
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl shadow-md hover:from-orange-600 hover:to-amber-700 transition"
            >
              {isSuccess ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Menyimpan Perubahan...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Simpan Status Produksi
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
