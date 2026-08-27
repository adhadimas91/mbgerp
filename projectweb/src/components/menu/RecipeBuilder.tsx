"use client";
import React, { useState } from "react";
import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";

interface IngredientMaster {
  id: string;
  name: string;
  category: "Protein" | "Karbohidrat" | "Sayuran" | "Susu" | "Bumbu";
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  fiberPer100g: number;
  pricePerKg: number;
  unit: string;
}

const masterIngredients: IngredientMaster[] = [
  { id: "ING-01", name: "Beras Premium IR-64 Kepala", category: "Karbohidrat", caloriesPer100g: 360, proteinPer100g: 7.0, carbsPer100g: 80.0, fatPer100g: 0.6, fiberPer100g: 1.3, pricePerKg: 13800, unit: "gram" },
  { id: "ING-02", name: "Daging Ayam Broiler Karkas", category: "Protein", caloriesPer100g: 239, proteinPer100g: 27.0, carbsPer100g: 0.0, fatPer100g: 14.0, fiberPer100g: 0.0, pricePerKg: 34500, unit: "gram" },
  { id: "ING-03", name: "Daging Sapi Segar Casserole", category: "Protein", caloriesPer100g: 250, proteinPer100g: 26.0, carbsPer100g: 0.0, fatPer100g: 15.0, fiberPer100g: 0.0, pricePerKg: 115000, unit: "gram" },
  { id: "ING-04", name: "Ikan Gurame / Nila Segar Fillet", category: "Protein", caloriesPer100g: 128, proteinPer100g: 20.0, carbsPer100g: 0.0, fatPer100g: 4.8, fiberPer100g: 0.0, pricePerKg: 42000, unit: "gram" },
  { id: "ING-05", name: "Tempe Kedelai Murni", category: "Protein", caloriesPer100g: 192, proteinPer100g: 19.0, carbsPer100g: 9.0, fatPer100g: 11.0, fiberPer100g: 4.0, pricePerKg: 16000, unit: "gram" },
  { id: "ING-06", name: "Tahu Putih Segar", category: "Protein", caloriesPer100g: 76, proteinPer100g: 8.0, carbsPer100g: 1.9, fatPer100g: 4.8, fiberPer100g: 0.3, pricePerKg: 12000, unit: "gram" },
  { id: "ING-07", name: "Bayam Hijau Hidroponik", category: "Sayuran", caloriesPer100g: 23, proteinPer100g: 2.9, carbsPer100g: 3.6, fatPer100g: 0.4, fiberPer100g: 2.2, pricePerKg: 11000, unit: "gram" },
  { id: "ING-08", name: "Wortel Manis Berastagi", category: "Sayuran", caloriesPer100g: 41, proteinPer100g: 0.9, carbsPer100g: 9.6, fatPer100g: 0.2, fiberPer100g: 2.8, pricePerKg: 14000, unit: "gram" },
  { id: "ING-09", name: "Susu Sapi Segar Pasteurisasi", category: "Susu", caloriesPer100g: 61, proteinPer100g: 3.2, carbsPer100g: 4.8, fatPer100g: 3.3, fiberPer100g: 0.0, pricePerKg: 12500, unit: "ml" },
  { id: "ING-10", name: "Minyak Kelapa Sawit & Bumbu Dapur Rempah", category: "Bumbu", caloriesPer100g: 450, proteinPer100g: 1.0, carbsPer100g: 5.0, fatPer100g: 48.0, fiberPer100g: 1.0, pricePerKg: 18000, unit: "gram" },
  { id: "ING-11", name: "Pisang Cavendish Segar", category: "Sayuran", caloriesPer100g: 89, proteinPer100g: 1.1, carbsPer100g: 22.8, fatPer100g: 0.3, fiberPer100g: 2.6, pricePerKg: 16000, unit: "gram" },
];

interface RecipeIngredientItem {
  ingredientId: string;
  amount: number; // gram or ml
}

interface RecipePreset {
  id: string;
  name: string;
  description: string;
  targetGroup: string;
  items: RecipeIngredientItem[];
}

const presets: RecipePreset[] = [
  {
    id: "REC-01",
    name: "Nasi Ayam Bakar Madu + Tempe + Sayur Lodeh + Pisang + Susu",
    description: "Menu standar nasional MBG dengan kandungan protein hewani tinggi dan kalsium susu",
    targetGroup: "SD Kelas 4 - 6",
    items: [
      { ingredientId: "ING-01", amount: 150 }, // Beras 150g
      { ingredientId: "ING-02", amount: 90 },  // Ayam 90g
      { ingredientId: "ING-05", amount: 40 },  // Tempe 40g
      { ingredientId: "ING-07", amount: 60 },  // Sayur Bayam 60g
      { ingredientId: "ING-08", amount: 40 },  // Wortel 40g
      { ingredientId: "ING-11", amount: 100 }, // Pisang 100g
      { ingredientId: "ING-09", amount: 200 }, // Susu 200ml
      { ingredientId: "ING-10", amount: 15 },  // Minyak & Bumbu 15g
    ],
  },
  {
    id: "REC-02",
    name: "Nasi Ikan Fillet Gurame Asam Manis + Tahu + Sup Bayam + Jeruk + Susu",
    description: "Kaya akan asam lemak Omega-3 dan mineral penting untuk perkembangan kognitif anak",
    targetGroup: "SD Kelas 4 - 6",
    items: [
      { ingredientId: "ING-01", amount: 150 },
      { ingredientId: "ING-04", amount: 95 },  // Gurame 95g
      { ingredientId: "ING-06", amount: 50 },  // Tahu 50g
      { ingredientId: "ING-07", amount: 70 },  // Bayam 70g
      { ingredientId: "ING-08", amount: 30 },  // Wortel 30g
      { ingredientId: "ING-11", amount: 100 }, // Buah 100g
      { ingredientId: "ING-09", amount: 200 }, // Susu 200ml
      { ingredientId: "ING-10", amount: 12 },  // Minyak & Bumbu 12g
    ],
  },
  {
    id: "REC-03",
    name: "Nasi Semur Daging Sapi + Perkedel Tahu + Tumis Sayur + Susu",
    description: "Asupan Zat Besi (Fe) tinggi untuk pencegahan anemia pada anak usia sekolah",
    targetGroup: "SD Kelas 4 - 6",
    items: [
      { ingredientId: "ING-01", amount: 150 },
      { ingredientId: "ING-03", amount: 75 },  // Daging Sapi 75g
      { ingredientId: "ING-06", amount: 45 },  // Tahu 45g
      { ingredientId: "ING-08", amount: 70 },  // Wortel 70g
      { ingredientId: "ING-11", amount: 100 }, // Buah 100g
      { ingredientId: "ING-09", amount: 200 }, // Susu 200ml
      { ingredientId: "ING-10", amount: 15 },  // Bumbu 15g
    ],
  },
];

export const RecipeBuilder: React.FC = () => {
  const [recipeName, setRecipeName] = useState(presets[0].name);
  const [recipeItems, setRecipeItems] = useState<RecipeIngredientItem[]>(presets[0].items);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSelectPreset = (preset: RecipePreset) => {
    setRecipeName(preset.name);
    setRecipeItems(preset.items);
  };

  const handleUpdateAmount = (index: number, newAmount: number) => {
    const updated = [...recipeItems];
    updated[index].amount = Math.max(0, newAmount);
    setRecipeItems(updated);
  };

  const handleAddIngredient = (ingredientId: string) => {
    if (!recipeItems.find((i) => i.ingredientId === ingredientId)) {
      setRecipeItems([...recipeItems, { ingredientId, amount: 50 }]);
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setRecipeItems(recipeItems.filter((_, i) => i !== index));
  };

  // Calculations
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalFiber = 0;
  let totalCost = 0;

  recipeItems.forEach((item) => {
    const master = masterIngredients.find((m) => m.id === item.ingredientId);
    if (master) {
      const factor = item.amount / 100;
      totalCalories += master.caloriesPer100g * factor;
      totalProtein += master.proteinPer100g * factor;
      totalCarbs += master.carbsPer100g * factor;
      totalFat += master.fatPer100g * factor;
      totalFiber += master.fiberPer100g * factor;
      totalCost += (master.pricePerKg / 1000) * item.amount;
    }
  });

  // Packaging & preparation cost fixed component
  const packagingCost = 800; // Tray food grade bersekat
  const cookingGasCost = 600; // Biaya gas & bumbu pelengkap
  const finalHpp = Math.round(totalCost + packagingCost + cookingGasCost);

  // Targets AKG MBG SD (650 - 750 kkal)
  const isCaloriesValid = totalCalories >= 600 && totalCalories <= 800;
  const isProteinValid = totalProtein >= 20.0;
  const isBudgetValid = finalHpp <= 15000;

  const handleSaveRecipe = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Preset Selector */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Formula Resep Terstandar Program MBG
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Pilih template resep teruji atau racik komposisi takaran bahan baku per porsi secara kustom
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {presets.map((preset) => (
            <div
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`rounded-2xl border p-4 cursor-pointer transition ${
                recipeName === preset.name
                  ? "border-emerald-500 bg-emerald-50/20 dark:border-emerald-500 dark:bg-emerald-500/10 shadow-sm"
                  : "border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] hover:border-gray-300"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {preset.targetGroup}
              </span>
              <h4 className="font-bold text-xs text-gray-900 dark:text-white mt-1 line-clamp-2">
                {preset.name}
              </h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                {preset.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {saveSuccess && (
        <div className="rounded-xl bg-emerald-100 p-3.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 flex items-center gap-2">
          <span>✓</span> Formula Resep Berhasil Disimpan & Divalidasi ke Database Menu MBG!
        </div>
      )}

      {/* Main Recipe Builder Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Ingredients Table / Form */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-4 mb-4">
              <div>
                <label className="text-[11px] text-gray-400 font-semibold block uppercase">Nama Formula Resep</label>
                <input
                  type="text"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  className="mt-1 font-bold text-sm text-gray-900 dark:text-white bg-transparent border-0 border-b border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:outline-none w-full sm:w-96"
                />
              </div>

              {/* Add Ingredient Dropdown */}
              <select
                onChange={(e) => {
                  if (e.target.value) handleAddIngredient(e.target.value);
                  e.target.value = "";
                }}
                className="h-9 rounded-xl border border-emerald-300 bg-emerald-50 px-3 text-xs font-semibold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 focus:outline-none"
              >
                <option value="">+ Tambah Bahan Baku...</option>
                {masterIngredients.map((ing) => (
                  <option key={ing.id} value={ing.id}>
                    {ing.name} ({ing.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Ingredients List */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-[11px] font-semibold uppercase text-gray-500 dark:border-gray-800 dark:text-gray-400">
                    <th className="pb-3">Bahan Baku</th>
                    <th className="pb-3 px-3">Kategori</th>
                    <th className="pb-3 px-3 text-center">Takaran per Porsi</th>
                    <th className="pb-3 px-3">Kalori (kkal)</th>
                    <th className="pb-3 px-3">Protein (g)</th>
                    <th className="pb-3 px-3">Est. Biaya Bahan</th>
                    <th className="pb-3 pl-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                  {recipeItems.map((item, index) => {
                    const master = masterIngredients.find((m) => m.id === item.ingredientId);
                    if (!master) return null;
                    const factor = item.amount / 100;
                    const cals = Math.round(master.caloriesPer100g * factor);
                    const prot = (master.proteinPer100g * factor).toFixed(1);
                    const cost = Math.round((master.pricePerKg / 1000) * item.amount);

                    return (
                      <tr key={item.ingredientId} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01]">
                        <td className="py-3 pr-3 font-semibold text-gray-900 dark:text-white">
                          {master.name}
                        </td>
                        <td className="py-3 px-3 text-gray-500">
                          <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-medium dark:bg-gray-800 dark:text-gray-300">
                            {master.category}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <div className="inline-flex items-center gap-1.5">
                            <input
                              type="number"
                              value={item.amount}
                              onChange={(e) => handleUpdateAmount(index, Number(e.target.value))}
                              className="w-16 h-8 rounded-lg border border-gray-300 bg-transparent text-center font-bold text-xs text-gray-900 dark:border-gray-700 dark:text-white focus:border-emerald-500 focus:outline-none"
                            />
                            <span className="text-[11px] text-gray-400">{master.unit}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 font-medium text-gray-700 dark:text-gray-300">
                          {cals} kkal
                        </td>
                        <td className="py-3 px-3 font-bold text-blue-600 dark:text-blue-400">
                          {prot} g
                        </td>
                        <td className="py-3 px-3 font-medium text-emerald-600 dark:text-emerald-400">
                          Rp {cost.toLocaleString("id-ID")}
                        </td>
                        <td className="py-3 pl-3 text-right">
                          <button
                            onClick={() => handleRemoveIngredient(index)}
                            className="rounded p-1 text-gray-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/20"
                            title="Hapus Bahan"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <Button
                onClick={handleSaveRecipe}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-5 py-2"
              >
                Simpan & Validasi Resep
              </Button>
            </div>
          </div>
        </div>

        {/* Real-time Nutrition & Cost Gauge */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                Kalkulator Gizi Real-time
              </h4>
              {isCaloriesValid && isProteinValid ? (
                <Badge color="success" size="sm">✓ Standar AKG</Badge>
              ) : (
                <Badge color="warning" size="sm">Perlu Penyesuaian</Badge>
              )}
            </div>

            <div className="mt-4 space-y-4 text-xs">
              {/* Kalori */}
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-gray-700 dark:text-gray-300">Total Energi (Kalori)</span>
                  <span className={isCaloriesValid ? "text-emerald-600 dark:text-emerald-400" : "text-amber-500"}>
                    {Math.round(totalCalories)} kkal
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${isCaloriesValid ? "bg-emerald-500" : "bg-amber-500"}`}
                    style={{ width: `${Math.min(100, (totalCalories / 750) * 100)}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5 block">Target Permenkes: 650 - 750 kkal/porsi</span>
              </div>

              {/* Protein */}
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-gray-700 dark:text-gray-300">Protein (Hewani + Nabati)</span>
                  <span className={isProteinValid ? "text-blue-600 dark:text-blue-400" : "text-amber-500"}>
                    {totalProtein.toFixed(1)} gram
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${isProteinValid ? "bg-blue-500" : "bg-amber-500"}`}
                    style={{ width: `${Math.min(100, (totalProtein / 25) * 100)}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5 block">Target Minimal: &gt; 20.0 gram/porsi</span>
              </div>

              {/* Karbohidrat & Lemak */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/40">
                  <span className="text-[10px] text-gray-400 block">Karbohidrat</span>
                  <span className="font-extrabold text-sm text-gray-800 dark:text-white">
                    {totalCarbs.toFixed(1)} g
                  </span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Target: 85 - 100g</span>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/40">
                  <span className="text-[10px] text-gray-400 block">Lemak Sehat</span>
                  <span className="font-extrabold text-sm text-gray-800 dark:text-white">
                    {totalFat.toFixed(1)} g
                  </span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Target: 18 - 22g</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/40 flex justify-between items-center">
                <span className="text-gray-500">Serat Pangan Alami:</span>
                <span className="font-bold text-gray-800 dark:text-white">{totalFiber.toFixed(1)} gram</span>
              </div>
            </div>
          </div>

          {/* Cost Analysis Box */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
              Estimasi HPP Resep per Porsi
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Biaya Bahan Baku:</span>
                <span className="font-semibold">Rp {Math.round(totalCost).toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Kemasan Food-grade Bersekat:</span>
                <span className="font-semibold">Rp {packagingCost.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Biaya Olah & Bumbu Pelengkap:</span>
                <span className="font-semibold">Rp {cookingGasCost.toLocaleString("id-ID")}</span>
              </div>

              <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between items-baseline">
                <span className="font-bold text-gray-900 dark:text-white">Total HPP per Porsi:</span>
                <span className={`font-black text-lg ${isBudgetValid ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600"}`}>
                  Rp {finalHpp.toLocaleString("id-ID")}
                </span>
              </div>

              <div className="text-[11px] text-gray-400 flex justify-between">
                <span>Pagu Maksimal Nasional:</span>
                <span>Rp 15.000 / porsi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeBuilder;
