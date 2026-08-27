"use client";
import React, { useState } from "react";

interface CostBreakdownItem {
  category: string;
  nominalPerPortion: number;
  percentage: number;
  targetBgnMax: number;
  status: "OPTIMAL" | "ATTENTION" | "OVER";
  details: string;
}

interface KitchenCostAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSppg: string;
  dailyPortions: number;
  currentHpp: number;
}

export const KitchenCostAnalysisModal: React.FC<KitchenCostAnalysisModalProps> = ({
  isOpen,
  onClose,
  currentSppg,
  dailyPortions = 3500,
  currentHpp = 13850,
}) => {
  // What-if simulator states
  const [simPortions, setSimPortions] = useState<number>(dailyPortions);
  const [simInflationFood, setSimInflationFood] = useState<number>(0); // in percent (-10% to +30%)
  const [simEnergyEfficiency, setSimEnergyEfficiency] = useState<number>(0); // in percent (-20% to +20%)

  if (!isOpen) return null;

  const baseFoodCost = 9950;
  const baseLaborCost = 1850;
  const baseUtilityCost = 850;
  const basePackagingCost = 750;
  const baseSanitationCost = 450;

  // Calculate simulated HPP
  const adjustedFoodCost = baseFoodCost * (1 + simInflationFood / 100);
  const adjustedUtilityCost = baseUtilityCost * (1 - simEnergyEfficiency / 100);
  // Labor has economies of scale for extra portions
  const laborScaleFactor = simPortions > 3500 ? (3500 / simPortions) * 0.3 + 0.7 : 1;
  const adjustedLaborCost = baseLaborCost * laborScaleFactor;
  const adjustedPackagingCost = basePackagingCost;
  const adjustedSanitationCost = baseSanitationCost;

  const simulatedHpp = Math.round(
    adjustedFoodCost + adjustedLaborCost + adjustedUtilityCost + adjustedPackagingCost + adjustedSanitationCost
  );
  const bgnStandardPlafon = 15000;
  const hppSavings = bgnStandardPlafon - simulatedHpp;
  const totalDailyExpenditure = simulatedHpp * simPortions;
  const totalMonthlyExpenditure = totalDailyExpenditure * 25; // 25 hari kerja efektif

  const breakdownData: CostBreakdownItem[] = [
    {
      category: "Bahan Baku Pangan (Food Cost)",
      nominalPerPortion: Math.round(adjustedFoodCost),
      percentage: Math.round((adjustedFoodCost / simulatedHpp) * 100),
      targetBgnMax: 75,
      status: (adjustedFoodCost / simulatedHpp) <= 0.75 ? "OPTIMAL" : "ATTENTION",
      details: "Beras pulen pandan wangi, ayam broiler karkas, telur omega-3, sayur mayur, tahu/tempe & buah.",
    },
    {
      category: "Upah & Tenaga Kerja Dapur (Direct Labor)",
      nominalPerPortion: Math.round(adjustedLaborCost),
      percentage: Math.round((adjustedLaborCost / simulatedHpp) * 100),
      targetBgnMax: 15,
      status: (adjustedLaborCost / simulatedHpp) <= 0.15 ? "OPTIMAL" : "OPTIMAL",
      details: "Gaji & insentif shift Head Chef, Sous Chef lini masak, Ahli Gizi PIC, helper & kru tray sealer.",
    },
    {
      category: "Energi & Utilitas Dapur (Gas, Listrik, RO Air)",
      nominalPerPortion: Math.round(adjustedUtilityCost),
      percentage: Math.round((adjustedUtilityCost / simulatedHpp) * 100),
      targetBgnMax: 8,
      status: (adjustedUtilityCost / simulatedHpp) <= 0.08 ? "OPTIMAL" : "ATTENTION",
      details: "Gas LPG 50kg industri (boiler cooker), daya listrik chiller & combi oven, air RO steril.",
    },
    {
      category: "Kemasan Food-Grade (Tray Sealing & Cutlery)",
      nominalPerPortion: adjustedPackagingCost,
      percentage: Math.round((adjustedPackagingCost / simulatedHpp) * 100),
      targetBgnMax: 5,
      status: "OPTIMAL",
      details: "Food tray biodegradable 5-kompartemen, sealing film anti-fog, sendok kayu food grade steril.",
    },
    {
      category: "Higienitas, Kimia Sanitasi & Uji Lab QC",
      nominalPerPortion: adjustedSanitationCost,
      percentage: Math.round((adjustedSanitationCost / simulatedHpp) * 100),
      targetBgnMax: 3,
      status: "OPTIMAL",
      details: "Chemical food-grade Ecolab, swab test mikrobiologi berkala, APD steril & sampel retensi.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-700 via-indigo-700 to-emerald-700 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-white/20 text-white uppercase tracking-wider">
                Unit Cost & HPP Deep-Dive
              </span>
              <span className="text-xs text-blue-100 font-medium">
                {currentSppg}
              </span>
            </div>
            <h2 className="text-lg font-bold mt-1">
              Analisis Struktur Biaya Pokok Produksi (HPP) & Skenario Efisiensi
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

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[82vh] overflow-y-auto">
          {/* Top Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/50">
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                HPP Aktual per Porsi
              </span>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                Rp {simulatedHpp.toLocaleString("id-ID")}
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-xs">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {hppSavings >= 0 ? `Hemat Rp ${hppSavings.toLocaleString("id-ID")}` : `Over Rp ${Math.abs(hppSavings).toLocaleString("id-ID")}`}
                </span>
                <span className="text-gray-500">vs Pagu BGN (Rp 15.000)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50">
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Total Biaya Harian ({simPortions.toLocaleString("id-ID")} Porsi)
              </span>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                Rp {totalDailyExpenditure.toLocaleString("id-ID")}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Proyeksi Bulanan: <span className="font-bold text-gray-900 dark:text-white">Rp {(totalMonthlyExpenditure / 1000000000).toFixed(2)} M</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/50">
              <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                Food Cost Ratio
              </span>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                {((adjustedFoodCost / simulatedHpp) * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Batas Standar BGN: <span className="font-bold text-emerald-600">Maks. 75.0%</span> (SEHAT)
              </div>
            </div>
          </div>

          {/* Breakdown Table */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span>📊</span> Rincian Komponen Biaya per Porsi (Unit Cost Breakdown)
            </h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Komponen Biaya</th>
                    <th className="px-4 py-3 text-right">Nominal / Porsi</th>
                    <th className="px-4 py-3 text-center">Porsi (%)</th>
                    <th className="px-4 py-3 text-center">Benchmark BGN</th>
                    <th className="px-4 py-3">Rincian Alokasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {breakdownData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                        {item.category}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        Rp {item.nominalPerPortion.toLocaleString("id-ID")}
                      </td>
                      <td className="px-4 py-3 text-center font-bold">
                        {item.percentage}%
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === "OPTIMAL"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                        }`}>
                          ≤ {item.targetBgnMax}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                        {item.details}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 dark:bg-gray-800/70 font-bold text-gray-900 dark:text-white">
                    <td className="px-4 py-3">TOTAL HPP PRODUKSI</td>
                    <td className="px-4 py-3 text-right font-mono text-sm text-emerald-700 dark:text-emerald-300">
                      Rp {simulatedHpp.toLocaleString("id-ID")}
                    </td>
                    <td className="px-4 py-3 text-center">100%</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                        Plafon Rp 15k
                      </span>
                    </td>
                    <td className="px-4 py-3 text-emerald-600 font-semibold">
                      Efisiensi Margin: {((hppSavings / bgnStandardPlafon) * 100).toFixed(1)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive What-If Scenario Simulator */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white border border-indigo-800/50 shadow-xl space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎛️</span>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Simulator Skenario & What-If Forecaster Finansial Dapur
                  </h4>
                  <p className="text-xs text-indigo-200">
                    Uji sensitivitas kenaikan porsi, fluktuasi harga komoditas pangan pasar lokal, dan efisiensi energi dapur.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSimPortions(dailyPortions);
                  setSimInflationFood(0);
                  setSimEnergyEfficiency(0);
                }}
                className="text-xs text-indigo-300 hover:text-white underline"
              >
                Reset Default
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* Slider 1: Target Porsi */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-indigo-200">Kapasitas Output Porsi:</span>
                  <span className="text-emerald-400 font-bold font-mono">
                    {simPortions.toLocaleString("id-ID")} porsi/hari
                  </span>
                </div>
                <input
                  type="range"
                  min={1500}
                  max={7500}
                  step={250}
                  value={simPortions}
                  onChange={(e) => setSimPortions(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>1.500</span>
                  <span>3.500 (Std)</span>
                  <span>7.500</span>
                </div>
              </div>

              {/* Slider 2: Inflasi Bahan Baku */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-indigo-200">Fluktuasi Harga Bahan:</span>
                  <span className={`font-bold font-mono ${simInflationFood > 0 ? "text-amber-400" : "text-emerald-400"}`}>
                    {simInflationFood > 0 ? `+${simInflationFood}%` : `${simInflationFood}%`}
                  </span>
                </div>
                <input
                  type="range"
                  min={-10}
                  max={25}
                  step={5}
                  value={simInflationFood}
                  onChange={(e) => setSimInflationFood(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>-10% (Hemat)</span>
                  <span>0% (Stabil)</span>
                  <span>+25% (Lonjakan)</span>
                </div>
              </div>

              {/* Slider 3: Efisiensi Energi/Gas */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-indigo-200">Optimasi Utilitas & Gas:</span>
                  <span className="text-cyan-400 font-bold font-mono">
                    {simEnergyEfficiency > 0 ? `+${simEnergyEfficiency}% Hemat` : "Standar"}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={20}
                  step={5}
                  value={simEnergyEfficiency}
                  onChange={(e) => setSimEnergyEfficiency(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>0%</span>
                  <span>10%</span>
                  <span>20% (Eco Mode)</span>
                </div>
              </div>
            </div>

            {/* Simulation Result Callout */}
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-between flex-wrap gap-3">
              <div className="text-xs">
                <span className="text-indigo-200">Hasil Simulasi: </span>
                <span className="font-bold text-white">
                  Kebutuhan Anggaran Dapur SPPG = Rp {totalDailyExpenditure.toLocaleString("id-ID")} / hari
                </span>
                <span className="text-emerald-300 ml-2">
                  (HPP: Rp {simulatedHpp.toLocaleString("id-ID")} / porsi)
                </span>
              </div>
              <div className="text-xs font-bold px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                {hppSavings >= 0 ? "✓ Sesuai Pagu Plafon BGN" : "⚠️ Melebihi Plafon BGN!"}
              </div>
            </div>
          </div>

          {/* Key Strategic Insights for Kepala MBG */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
              <span>💡</span>
              <span>Rekomendasi Strategis Kepala SPPG / Kepala MBG:</span>
            </div>
            <ul className="text-xs text-amber-900 dark:text-amber-200 space-y-1.5 list-disc list-inside">
              <li>
                <strong>Pengadaan Bahan Segar Terjadwal (JIT):</strong> Mengurangi penyimpanan chiller berlebih dapat menekan biaya listrik cold room hingga 8.5% dan mengurangi risiko susut sayuran (trimming loss).
              </li>
              <li>
                <strong>Optimalisasi Batch Boiling:</strong> Memasak karbohidrat & kaldu dalam kapasitas penuh steam boiler 200L pada pukul 03:00 WIB menghemat konsumsi gas industri 50kg sebesar 12% dibandingkan sistem batch kecil berulang.
              </li>
              <li>
                <strong>Substitusi Protein Musiman:</strong> Apabila harga ayam broiler melonjak di atas Rp 38.000/kg, kombinasikan menu dengan telur omega-3 lokal dan fillet ikan lele/patin bersertifikat Halal tanpa mengurangi standar AKG 25-30g protein.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-800 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all"
          >
            Tutup Analisis
          </button>
        </div>
      </div>
    </div>
  );
};
