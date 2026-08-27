"use client";

import React, { useState } from "react";
import CreateMaintenanceModal, { MaintenanceTaskData } from "./CreateMaintenanceModal";
import MaintenanceDetailModal from "./MaintenanceDetailModal";

const INITIAL_TASKS: MaintenanceTaskData[] = [
  {
    id: "1",
    workOrderNumber: "WO-MBG-1021",
    assetCode: "AST-MBG-1001",
    assetName: "Combi Steamer Industri 10 Tray (Rational)",
    location: "Dapur Sentral Harmoni - Jakarta Pusat",
    type: "Preventive Service",
    priority: "Sedang",
    scheduledDate: "2026-03-02",
    technicianName: "Hendra Setiawan",
    vendorCompany: "PT Kitchen Multi Sarana",
    estimatedCost: 750000,
    spareParts: "Gasket Door Seal & Descaling Cairan Food Grade",
    status: "Terjadwal",
    checklist: [
      "Pembersihan kerak boiler / Descaling pipa uap",
      "Kalibrasi sensor termostat suhu memasak (>100°C)",
      "Pemeriksaan kebocoran sambungan pipa gas LPG",
      "Uji fungsi safety pressure valve",
    ],
    description: "Servis rutin triwulanan pemeliharaan oven uap sentral untuk mencegah pembentukan kerak kapur.",
  },
  {
    id: "2",
    workOrderNumber: "WO-MBG-1022",
    assetCode: "AST-MBG-1002",
    assetName: "Truk Box Pendingin Isuzu Elf (B 9482 PQA)",
    location: "Armada Distribusi Wilayah 1",
    type: "Preventive Service",
    priority: "Tinggi",
    scheduledDate: "2026-02-28",
    technicianName: "Bambang Pamungkas",
    vendorCompany: "Astra Isuzu Cold Service",
    estimatedCost: 2850000,
    spareParts: "Oli Mesin Diesel, Filter Udara, Freon R404A Top-up, Belt Kompresor",
    status: "Sedang Dikerjakan",
    checklist: [
      "Ganti oli mesin & filter armada berpendingin",
      "Pengecekan suhu evaporator cold box (-5°C s/d 4°C)",
      "Kalibrasi sensor IoT telemetri GPS MBG",
      "Uji kerapatan pintu karet insulasi thermo",
    ],
    description: "Servis berkala armada 10.000 KM untuk memastikan stabilitas suhu rantai dingin selama pengiriman makanan.",
  },
  {
    id: "3",
    workOrderNumber: "WO-MBG-1023",
    assetCode: "AST-MBG-1004",
    assetName: "Ketel Masak Tilting Bratt Pan 150L",
    location: "Dapur Sentral Harmoni - Jakarta Pusat",
    type: "Corrective Repair",
    priority: "Kritis / Darurat",
    scheduledDate: "2026-02-27",
    technicianName: "Ahmad Zaki",
    vendorCompany: "PT Kitchen Multi Sarana",
    estimatedCost: 1650000,
    spareParts: "Hydraulic Seal Jack & Microswitch Burner",
    status: "Sedang Dikerjakan",
    checklist: [
      "Perbaikan silinder hidrolik pemiring wadah",
      "Penggantian microswitch burner pemantik otomatis",
      "Uji coba pemanasan volume penuh 150 Liter",
    ],
    description: "Wadah masak tidak dapat dimiringkan dengan lancar saat menuang sup/lauk MBG.",
  },
  {
    id: "4",
    workOrderNumber: "WO-MBG-1024",
    assetCode: "AST-MBG-1006",
    assetName: "Refraktometer & Thermometer Probe HACCP",
    location: "Dapur Sentral Harmoni - Jakarta Pusat",
    type: "Kalibrasi Presisi",
    priority: "Rendah",
    scheduledDate: "2026-02-20",
    technicianName: "Laboratorium Kalibrasi Mutu",
    vendorCompany: "PT Alat Presisi Prima",
    estimatedCost: 450000,
    spareParts: "Sertifikat Kalibrasi KAN ISO 17025",
    status: "Selesai",
    checklist: [
      "Uji akurasi titik beku 0.0°C (Ice Point)",
      "Uji akurasi titik didih 100.0°C (Boiling Point)",
      "Penerbitan label kalibrasi berkala ISO 22000",
    ],
    description: "Kalibrasi alat ukur suhu inti makanan matang dan bahan baku cold storage.",
  },
  {
    id: "5",
    workOrderNumber: "WO-MBG-1025",
    assetCode: "AST-MBG-1008",
    assetName: "Timbangan Digital Industri 150 Kg",
    location: "SPPG Cilandak - Jakarta Selatan",
    type: "Corrective Repair",
    priority: "Sedang",
    scheduledDate: "2026-02-25",
    technicianName: "Joko Susilo",
    vendorCompany: "PT Alat Presisi Prima",
    estimatedCost: 850000,
    spareParts: "Load Cell Cable Harness & Power Adapter",
    status: "Terlambat",
    checklist: [
      "Penggantian kabel sinyal sensor beban",
      "Tera ulang anak timbang standar 50 Kg",
    ],
    description: "Display LED berkedip saat menimbang karung beras penerimaan.",
  },
];

export default function AssetMaintenanceSchedule() {
  const [tasks, setTasks] = useState<MaintenanceTaskData[]>(INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedPriority, setSelectedPriority] = useState("ALL");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<MaintenanceTaskData | null>(null);
  const [editingTask, setEditingTask] = useState<MaintenanceTaskData | null>(null);

  // Metrics
  const totalTasks = tasks.length;
  const scheduledCount = tasks.filter((t) => t.status === "Terjadwal").length;
  const inProgressCount = tasks.filter((t) => t.status === "Sedang Dikerjakan").length;
  const emergencyCount = tasks.filter((t) => t.priority === "Kritis / Darurat" && t.status !== "Selesai").length;
  const totalCost = tasks.reduce((sum, t) => sum + t.estimatedCost, 0);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.workOrderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assetCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.technicianName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.vendorCompany.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === "ALL" || task.type === selectedType;
    const matchesStatus = selectedStatus === "ALL" || task.status === selectedStatus;
    const matchesPriority = selectedPriority === "ALL" || task.priority === selectedPriority;

    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const handleSaveTask = (newTask: MaintenanceTaskData) => {
    if (newTask.id) {
      setTasks((prev) => prev.map((t) => (t.id === newTask.id ? newTask : t)));
    } else {
      const taskToAdd: MaintenanceTaskData = {
        ...newTask,
        id: Date.now().toString(),
      };
      setTasks((prev) => [taskToAdd, ...prev]);
    }
    setIsCreateOpen(false);
    setEditingTask(null);
  };

  const handleUpdateStatus = (task: MaintenanceTaskData, newStatus: MaintenanceTaskData["status"]) => {
    const updated = { ...task, status: newStatus };
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    setSelectedTask(updated);
  };

  return (
    <div className="space-y-6">
      {/* 4 Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Servis Terjadwal</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {scheduledCount} <span className="text-xs font-normal text-gray-500">WO</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-medium">
            <span>Preventive Maintenance Rutin</span>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Sedang Dikerjakan</p>
              <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                {inProgressCount} <span className="text-xs font-normal text-gray-500">Unit</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium">
            <span>Dalam Penanganan Teknisi</span>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Kerusakan Darurat</p>
              <h3 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">
                {emergencyCount} <span className="text-xs font-normal text-gray-500">Kasus</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium">
            <span>Prioritas Tinggi & Kritis</span>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Biaya Pemeliharaan</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                {formatRupiah(totalCost)}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <span>Termasuk Suku Cadang & Kalibrasi</span>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari nomor WO, aset, teknisi, atau bengkel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <button
            onClick={() => {
              setEditingTask(null);
              setIsCreateOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs hover:shadow transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Buat Jadwal Servis Baru
          </button>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-100 dark:border-gray-800 text-xs">
          <div>
            <label className="block font-medium text-gray-500 dark:text-gray-400 mb-1">Jenis Servis:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
            >
              <option value="ALL">Semua Jenis Servis</option>
              <option value="Preventive Service">Preventive Service (Rutin)</option>
              <option value="Corrective Repair">Corrective Repair (Perbaikan)</option>
              <option value="Kalibrasi Presisi">Kalibrasi Presisi</option>
              <option value="Deep Cleaning Sanitasi">Deep Cleaning Sanitasi</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-500 dark:text-gray-400 mb-1">Status Pengerjaan:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
            >
              <option value="ALL">Semua Status</option>
              <option value="Terjadwal">Terjadwal</option>
              <option value="Sedang Dikerjakan">Sedang Dikerjakan</option>
              <option value="Selesai">Selesai</option>
              <option value="Terlambat">Terlambat</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-500 dark:text-gray-400 mb-1">Prioritas:</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
            >
              <option value="ALL">Semua Prioritas</option>
              <option value="Rendah">Rendah</option>
              <option value="Sedang">Sedang</option>
              <option value="Tinggi">Tinggi</option>
              <option value="Kritis / Darurat">Kritis / Darurat</option>
            </select>
          </div>
        </div>
      </div>

      {/* Maintenance Tasks Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 font-semibold border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-4 py-3.5">No. Work Order</th>
                <th className="px-4 py-3.5">Aset & Lokasi</th>
                <th className="px-4 py-3.5">Jenis Servis</th>
                <th className="px-4 py-3.5">Vendor & Teknisi</th>
                <th className="px-4 py-3.5">Tanggal Servis</th>
                <th className="px-4 py-3.5">Estimasi Biaya</th>
                <th className="px-4 py-3.5">Prioritas</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                    Tidak ada jadwal pemeliharaan yang cocok dengan kriteria pencarian.
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors">
                    {/* WO & Icon */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-mono text-[11px] font-bold border border-amber-200 dark:border-amber-800">
                          WO
                        </div>
                        <span className="font-mono font-bold text-gray-900 dark:text-white">
                          {task.workOrderNumber}
                        </span>
                      </div>
                    </td>

                    {/* Aset & Lokasi */}
                    <td className="px-4 py-3 min-w-[200px]">
                      <div
                        onClick={() => {
                          setSelectedTask(task);
                          setIsDetailOpen(true);
                        }}
                        className="cursor-pointer group"
                      >
                        <span className="font-semibold text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors block">
                          {task.assetName}
                        </span>
                        <span className="text-[11px] text-gray-500 font-mono">
                          {task.assetCode} • {task.location}
                        </span>
                      </div>
                    </td>

                    {/* Jenis Servis */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                          task.type === "Preventive Service"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                            : task.type === "Corrective Repair"
                            ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                            : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                        }`}
                      >
                        {task.type}
                      </span>
                    </td>

                    {/* Vendor & Teknisi */}
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-900 dark:text-white block">
                        {task.vendorCompany}
                      </span>
                      <span className="text-[10px] text-gray-500">Teknisi: {task.technicianName}</span>
                    </td>

                    {/* Tanggal */}
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300 font-medium">
                      {task.scheduledDate}
                    </td>

                    {/* Biaya */}
                    <td className="px-4 py-3 whitespace-nowrap font-bold text-gray-900 dark:text-white">
                      {formatRupiah(task.estimatedCost)}
                    </td>

                    {/* Prioritas */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-md ${
                          task.priority === "Kritis / Darurat"
                            ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400"
                            : task.priority === "Tinggi"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold rounded-md ${
                          task.status === "Selesai"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                            : task.status === "Sedang Dikerjakan"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                            : task.status === "Terlambat"
                            ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400"
                            : "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>

                    {/* Aksi */}
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedTask(task);
                            setIsDetailOpen(true);
                          }}
                          title="Lihat Detail Work Order"
                          className="p-1 text-gray-500 hover:text-amber-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>

                        <button
                          onClick={() => {
                            setEditingTask(task);
                            setIsCreateOpen(true);
                          }}
                          title="Edit Jadwal Servis"
                          className="p-1 text-gray-500 hover:text-blue-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <CreateMaintenanceModal
        isOpen={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        initialData={editingTask}
      />

      <MaintenanceDetailModal
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
