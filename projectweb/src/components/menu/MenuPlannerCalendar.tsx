"use client";
import React, { useState } from "react";
import Badge from "../ui/badge/Badge";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";

interface DailyMenuPlan {
  id: string;
  day: string;
  date: string;
  name: string;
  targetGroup: "SD_LOWER" | "SD_UPPER" | "SMP_SMA" | "BUMIL_BALITA";
  targetGroupLabel: string;
  totalPortions: number;
  components: {
    carbs: string;
    mainProtein: string;
    sideProtein: string;
    vegetable: string;
    fruit: string;
    beverage: string;
  };
  nutrition: {
    calories: number; // kkal
    protein: number; // gram
    carbs: number; // gram
    fat: number; // gram
    fiber: number; // gram
  };
  costPerPortion: number;
  maxBudget: number;
  approvalStatus: "APPROVED" | "PENDING_REVIEW";
  nutritionist: string;
}

const mockMenuPlans: DailyMenuPlan[] = [
  {
    id: "MNU-MON-01",
    day: "Senin",
    date: "02 Maret 2026",
    name: "Paket Nusantara 1: Nasi Ayam Bakar Madu & Sayur Lodeh",
    targetGroup: "SD_UPPER",
    targetGroupLabel: "SD Kelas 4 - 6",
    totalPortions: 14500,
    components: {
      carbs: "Nasi Putih Pulen Organik (150g)",
      mainProtein: "Ayam Bakar Madu Bumbu Rempah (85g)",
      sideProtein: "Tempe Bacem Panggang (40g)",
      vegetable: "Sayur Lodeh Labu Siam & Jagung Manis (100g)",
      fruit: "Pisang Cavendish Segar (1 buah)",
      beverage: "Susu Sapi Pasteurisasi MBG (200ml)",
    },
    nutrition: {
      calories: 685,
      protein: 26.5,
      carbs: 92.0,
      fat: 18.2,
      fiber: 6.8,
    },
    costPerPortion: 14200,
    maxBudget: 15000,
    approvalStatus: "APPROVED",
    nutritionist: "dr. Nurul Hidayati, Sp.GK",
  },
  {
    id: "MNU-TUE-02",
    day: "Selasa",
    date: "03 Maret 2026",
    name: "Paket Bahari: Nasi Ikan Gurame Asam Manis & Sup Bayam Jagung",
    targetGroup: "SD_UPPER",
    targetGroupLabel: "SD Kelas 4 - 6",
    totalPortions: 14500,
    components: {
      carbs: "Nasi Putih Beras Merah Mix (150g)",
      mainProtein: "Fillet Gurame Asam Manis (90g)",
      sideProtein: "Tahu Kukus Telur Puyuh (45g)",
      vegetable: "Sup Bening Bayam & Jagung Pipil (100g)",
      fruit: "Jeruk Manis Pontianak (1 buah)",
      beverage: "Susu Kedelai Fortifikasi Kalsium (200ml)",
    },
    nutrition: {
      calories: 660,
      protein: 24.8,
      carbs: 88.5,
      fat: 16.5,
      fiber: 7.2,
    },
    costPerPortion: 13950,
    maxBudget: 15000,
    approvalStatus: "APPROVED",
    nutritionist: "dr. Nurul Hidayati, Sp.GK",
  },
  {
    id: "MNU-WED-03",
    day: "Rabu",
    date: "04 Maret 2026",
    name: "Paket Daging Semur Gurih & Tumis Buncis Wortel",
    targetGroup: "SD_UPPER",
    targetGroupLabel: "SD Kelas 4 - 6",
    totalPortions: 14500,
    components: {
      carbs: "Nasi Putih Pulen (150g)",
      mainProtein: "Daging Sapi Semur Kentang (75g)",
      sideProtein: "Perkedel Tahu Sayur (40g)",
      vegetable: "Tumis Buncis & Wortel Manis (90g)",
      fruit: "Semangka Potong Segar (120g)",
      beverage: "Susu Sapi Murni UHT MBG (200ml)",
    },
    nutrition: {
      calories: 710,
      protein: 28.0,
      carbs: 94.0,
      fat: 19.5,
      fiber: 6.2,
    },
    costPerPortion: 14850,
    maxBudget: 15000,
    approvalStatus: "APPROVED",
    nutritionist: "dr. Nurul Hidayati, Sp.GK",
  },
  {
    id: "MNU-THU-04",
    day: "Kamis",
    date: "05 Maret 2026",
    name: "Paket Seimbang: Rolade Daging Sapi & Capcay Sayuran Segar",
    targetGroup: "SD_UPPER",
    targetGroupLabel: "SD Kelas 4 - 6",
    totalPortions: 14500,
    components: {
      carbs: "Nasi Kuning Gurih Alami (Kunyit) (150g)",
      mainProtein: "Rolade Daging Sapi Saus Tomat (85g)",
      sideProtein: "Telur Rebus Balado Manis (50g)",
      vegetable: "Capcay Kuah Brokoli & Kembang Kol (110g)",
      fruit: "Pepaya Manis Potong (120g)",
      beverage: "Susu Sapi Pasteurisasi MBG (200ml)",
    },
    nutrition: {
      calories: 690,
      protein: 27.2,
      carbs: 89.0,
      fat: 18.8,
      fiber: 7.5,
    },
    costPerPortion: 14400,
    maxBudget: 15000,
    approvalStatus: "APPROVED",
    nutritionist: "dr. Nurul Hidayati, Sp.GK",
  },
  {
    id: "MNU-FRI-05",
    day: "Jumat",
    date: "06 Maret 2026",
    name: "Paket Ceria: Nasi Ayam Suwir Opor & Sayur Asem Segar",
    targetGroup: "SD_UPPER",
    targetGroupLabel: "SD Kelas 4 - 6",
    totalPortions: 14500,
    components: {
      carbs: "Nasi Putih Pulen (150g)",
      mainProtein: "Ayam Suwir Bumbu Opor Kuning (80g)",
      sideProtein: "Tahu Tempe Bacem Kukus (50g)",
      vegetable: "Sayur Asem Segar Labu & Kacang Panjang (100g)",
      fruit: "Melon Segar Potong (120g)",
      beverage: "Susu Sapi Pasteurisasi MBG (200ml)",
    },
    nutrition: {
      calories: 675,
      protein: 25.4,
      carbs: 91.0,
      fat: 17.5,
      fiber: 6.9,
    },
    costPerPortion: 13800,
    maxBudget: 15000,
    approvalStatus: "APPROVED",
    nutritionist: "dr. Nurul Hidayati, Sp.GK",
  },
];

export const MenuPlannerCalendar: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>("Senin");
  const [selectedTargetGroup, setSelectedTargetGroup] = useState<string>("ALL");
  const [isAddMenuModalOpen, setIsAddMenuModalOpen] = useState(false);
  const [menuList, setMenuList] = useState<DailyMenuPlan[]>(mockMenuPlans);

  const activeMenu = menuList.find((m) => m.day === selectedDay) || menuList[0];

  return (
    <div className="space-y-6">
      {/* Top Banner AKG Kemenkes */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4.5 dark:border-emerald-900/50 dark:bg-emerald-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-emerald-600 p-2.5 text-white shadow-sm">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
                Standar Kecukupan Gizi MBG (Permenkes RI No. 28/2019)
              </h4>
              <p className="mt-0.5 text-xs text-emerald-800/80 dark:text-emerald-400">
                Target Gizi per Porsi Makan Siang Anak Sekolah: Energi <b>650 - 750 kkal</b>, Protein <b>20 - 25g</b>, Karbohidrat <b>85 - 100g</b>, Lemak <b>18 - 22g</b>.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddMenuModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Atur Jadwal Menu Baru
          </button>
        </div>
      </div>

      {/* Weekday Selector Bar */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].map((day) => {
              const menuForDay = menuList.find((m) => m.day === day);
              const isSelected = selectedDay === day;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`flex flex-col items-center justify-center rounded-2xl px-5 py-3 text-xs font-bold transition min-w-[105px] ${
                    isSelected
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="text-[11px] opacity-80 uppercase tracking-wider">{day}</span>
                  <span className="text-sm font-extrabold mt-0.5">{menuForDay ? `${menuForDay.nutrition.calories} kkal` : "Kosong"}</span>
                  <span className={`text-[10px] mt-1 px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"}`}>
                    Rp {menuForDay ? (menuForDay.costPerPortion / 1000).toFixed(1) : 0}k/porsi
                  </span>
                </button>
              );
            })}
          </div>

          {/* Target Group Filter */}
          <select
            value={selectedTargetGroup}
            onChange={(e) => setSelectedTargetGroup(e.target.value)}
            className="h-10 rounded-xl border border-gray-300 bg-transparent px-3 text-xs text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white dark:bg-gray-800"
          >
            <option value="ALL">Semua Kelompok Usia</option>
            <option value="SD_LOWER">SD Kelas 1 - 3 (500 - 600 kkal)</option>
            <option value="SD_UPPER">SD Kelas 4 - 6 (650 - 750 kkal)</option>
            <option value="SMP_SMA">SMP / SMA (750 - 850 kkal)</option>
            <option value="BUMIL_BALITA">Ibu Hamil & Balita</option>
          </select>
        </div>
      </div>

      {/* Active Daily Menu Details */}
      {activeMenu && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main Menu Box */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300">
                      {activeMenu.day}, {activeMenu.date}
                    </span>
                    <span className="rounded-lg bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-500/20 dark:text-blue-300">
                      {activeMenu.targetGroupLabel}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                    {activeMenu.name}
                  </h3>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[11px] text-gray-400 block">Target Distribusi Harian</span>
                  <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                    {activeMenu.totalPortions.toLocaleString()} Porsi
                  </span>
                </div>
              </div>

              {/* 6 Components Grid */}
              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Komposisi Hidangan 4 Sehat 5 Sempurna MBG
                </h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 dark:border-gray-800 dark:bg-gray-800/40">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">🍚</span>
                      <div>
                        <span className="text-[11px] text-gray-400 block">Karbohidrat Pokok</span>
                        <span className="font-semibold text-xs text-gray-900 dark:text-white">
                          {activeMenu.components.carbs}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 dark:border-gray-800 dark:bg-gray-800/40">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">🍗</span>
                      <div>
                        <span className="text-[11px] text-gray-400 block">Lauk Utama (Protein Hewani)</span>
                        <span className="font-semibold text-xs text-gray-900 dark:text-white">
                          {activeMenu.components.mainProtein}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 dark:border-gray-800 dark:bg-gray-800/40">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">🧈</span>
                      <div>
                        <span className="text-[11px] text-gray-400 block">Lauk Pendamping (Protein Nabati)</span>
                        <span className="font-semibold text-xs text-gray-900 dark:text-white">
                          {activeMenu.components.sideProtein}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 dark:border-gray-800 dark:bg-gray-800/40">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">🥗</span>
                      <div>
                        <span className="text-[11px] text-gray-400 block">Sayuran Segar & Serat</span>
                        <span className="font-semibold text-xs text-gray-900 dark:text-white">
                          {activeMenu.components.vegetable}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 dark:border-gray-800 dark:bg-gray-800/40">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">🍌</span>
                      <div>
                        <span className="text-[11px] text-gray-400 block">Buah Segar Pilihan</span>
                        <span className="font-semibold text-xs text-gray-900 dark:text-white">
                          {activeMenu.components.fruit}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 dark:border-gray-800 dark:bg-gray-800/40">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">🥛</span>
                      <div>
                        <span className="text-[11px] text-gray-400 block">Minuman / Susu Segar</span>
                        <span className="font-semibold text-xs text-gray-900 dark:text-white">
                          {activeMenu.components.beverage}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nutrition & Cost Card */}
          <div className="lg:col-span-4 space-y-6">
            {/* Nutrition Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  Profil Makronutrisi per Porsi
                </h4>
                <Badge color="success" size="sm">Lolos AKG</Badge>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-gray-600 dark:text-gray-300">Energi / Kalori</span>
                    <span className="text-emerald-600 dark:text-emerald-400">{activeMenu.nutrition.calories} kkal / 700 kkal (98%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: "98%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-gray-600 dark:text-gray-300">Protein Hewani & Nabati</span>
                    <span className="text-blue-600 dark:text-blue-400">{activeMenu.nutrition.protein}g / 25g (106%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: "100%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-gray-600 dark:text-gray-300">Karbohidrat</span>
                    <span className="text-amber-600 dark:text-amber-400">{activeMenu.nutrition.carbs}g / 90g (102%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div className="h-full rounded-full bg-amber-500" style={{ width: "100%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-gray-600 dark:text-gray-300">Lemak Sehat</span>
                    <span className="text-purple-600 dark:text-purple-400">{activeMenu.nutrition.fat}g / 20g (91%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div className="h-full rounded-full bg-purple-500" style={{ width: "91%" }}></div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 flex justify-between">
                  <span>Serat Pangan Alami:</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{activeMenu.nutrition.fiber} gram</span>
                </div>
              </div>
            </div>

            {/* Cost & Nutritionist Validation Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Biaya Produksi & Validasi Ahli Gizi
              </h4>
              <div className="rounded-xl bg-gray-50 p-3.5 dark:bg-gray-800/40 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">HPP Aktual:</span>
                  <span className="font-extrabold text-base text-emerald-600 dark:text-emerald-400">
                    Rp {activeMenu.costPerPortion.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-gray-400">
                  <span>Pagu Maksimal MBG:</span>
                  <span>Rp {activeMenu.maxBudget.toLocaleString("id-ID")}</span>
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <span>✓</span> Efisiensi Rp {(activeMenu.maxBudget - activeMenu.costPerPortion).toLocaleString("id-ID")} / porsi
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs">
                <span className="text-gray-400 block text-[11px]">Diverifikasi & Disetujui Oleh:</span>
                <span className="font-semibold text-gray-800 dark:text-white block mt-0.5">
                  {activeMenu.nutritionist}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  ✓ Sertifikasi Konsultan Gizi Klinis MBG
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add Menu Plan */}
      <Modal
        isOpen={isAddMenuModalOpen}
        onClose={() => setIsAddMenuModalOpen(false)}
        className="max-w-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            Perencanaan Jadwal Siklus Menu MBG
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Pilih variasi menu dan alokasikan ke hari dan kelompok target siswa
          </p>
        </div>

        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block font-medium text-gray-700 dark:text-gray-300">Hari Jadwal</label>
              <select className="h-10 w-full rounded-xl border border-gray-300 bg-transparent px-3 text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                <option value="Senin">Senin</option>
                <option value="Selasa">Selasa</option>
                <option value="Rabu">Rabu</option>
                <option value="Kamis">Kamis</option>
                <option value="Jumat">Jumat</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block font-medium text-gray-700 dark:text-gray-300">Kelompok Sasaran</label>
              <select className="h-10 w-full rounded-xl border border-gray-300 bg-transparent px-3 text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                <option value="SD_LOWER">SD Kelas 1 - 3</option>
                <option value="SD_UPPER">SD Kelas 4 - 6</option>
                <option value="SMP_SMA">SMP / SMA</option>
                <option value="BUMIL_BALITA">Ibu Hamil & Balita</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-700 dark:text-gray-300">Pilih Resep Terstandar</label>
            <select className="h-10 w-full rounded-xl border border-gray-300 bg-transparent px-3 text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-white">
              <option value="1">Paket Nusantara 1: Nasi Ayam Bakar Madu & Sayur Lodeh (685 kkal)</option>
              <option value="2">Paket Bahari: Nasi Ikan Gurame Asam Manis & Sup Bayam (660 kkal)</option>
              <option value="3">Paket Daging Semur Gurih & Tumis Buncis Wortel (710 kkal)</option>
              <option value="4">Paket Seimbang: Rolade Sapi & Capcay Sayuran Segar (690 kkal)</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-700 dark:text-gray-300">Target Jumlah Porsi</label>
            <input
              type="number"
              defaultValue={14500}
              className="h-10 w-full rounded-xl border border-gray-300 bg-transparent px-3 text-xs dark:border-gray-700 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={() => setIsAddMenuModalOpen(false)}
              className="rounded-xl px-4 py-2 font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              Batal
            </button>
            <Button
              type="button"
              onClick={() => setIsAddMenuModalOpen(false)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-5 py-2"
            >
              Simpan ke Kalender Menu
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MenuPlannerCalendar;
