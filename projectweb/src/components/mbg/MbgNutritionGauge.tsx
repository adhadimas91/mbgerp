"use client";
import React from "react";

export const MbgNutritionGauge: React.FC = () => {
  const nutritionItems = [
    { name: "Kalori (Energi)", target: "650 - 750 kkal", current: "695 kkal", pct: 93, color: "bg-emerald-500" },
    { name: "Protein (Hewani/Nabati)", target: "25 - 30 gram", current: "28.4 g", pct: 95, color: "bg-blue-500" },
    { name: "Karbohidrat Kompleks", target: "80 - 95 gram", current: "88.2 g", pct: 92, color: "bg-amber-500" },
    { name: "Serat & Mikronutrisi", target: "10 - 15 gram", current: "12.5 g", pct: 85, color: "bg-purple-500" },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-800 dark:text-white">
            Standar Nutrisi & Gizi Harian
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Kepatuhan Angka Kecukupan Gizi (AKG) Kemenkes
          </p>
        </div>
        <span className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300">
          AKG 100% Sesuai
        </span>
      </div>

      <div className="space-y-4">
        {nutritionItems.map((item) => (
          <div key={item.name} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                {item.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 dark:text-white">
                  {item.current}
                </span>
                <span className="text-[11px] text-gray-400">
                  (Target: {item.target})
                </span>
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <div
                className={`h-full rounded-full ${item.color} transition-all duration-500`}
                style={{ width: `${item.pct}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-500 dark:text-gray-400">Rata-rata Biaya per Porsi</span>
          <p className="text-lg font-bold text-gray-800 dark:text-white">Rp 14.850 <span className="text-xs font-normal text-emerald-600">/ porsi</span></p>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-500 dark:text-gray-400">Batas Anggaran Maksimal</span>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Rp 15.000 / porsi</p>
        </div>
      </div>
    </div>
  );
};

export default MbgNutritionGauge;
