"use client";

import React, { useState } from "react";
import CreateExpenditureModal, { ExpenditureRecord } from "./CreateExpenditureModal";
import ExpenditureDetailModal from "./ExpenditureDetailModal";
import ExpenditureReceiptPrintModal from "./ExpenditureReceiptPrintModal";

const INITIAL_EXPENDITURES: ExpenditureRecord[] = [
  {
    id: "EXP-101",
    spjNumber: "SPJ-MBG-2026-0801",
    transactionDate: "2026-08-25",
    category: "Belanja Bahan Baku (PO Supplier)",
    kitchenLocation: "Dapur Sentral Harmoni - Jakarta Pusat",
    payeeName: "PT Segar Pangan Nusantara",
    payeeAccount: "Bank Mandiri 122-00-9988776-5",
    referenceDocNumber: "INV-SPN-2026-0819",
    items: [
      {
        id: "1",
        itemName: "Daging Ayam Broiler Fillet Karkas (Grade A)",
        quantity: 420,
        unit: "Kg",
        unitPrice: 38000,
        totalPrice: 15960000,
      },
      {
        id: "2",
        itemName: "Telur Ayam Negeri Segar NKV",
        quantity: 150,
        unit: "Kg",
        unitPrice: 27500,
        totalPrice: 4125000,
      },
    ],
    subtotalAmount: 20085000,
    taxType: "PPH_22",
    taxAmount: 301275,
    netAmount: 19783725,
    paymentMethod: "SP2D Kas Negara",
    status: "VERIFIED_PPK",
    verifierName: "Drs. Heru Prasetyo, M.M (PPK)",
    verifiedAt: "2026-08-25",
    notes: "Bahan pangan segar telah lulus uji organoleptik suhu penerimaan 2.8°C.",
    receiptAttachmentName: "faktur_spn_0819.pdf",
  },
  {
    id: "EXP-102",
    spjNumber: "SPJ-MBG-2026-0802",
    transactionDate: "2026-08-25",
    category: "Biaya Operasional Dapur (Gas/Listrik/Air)",
    kitchenLocation: "Dapur Sentral Harmoni - Jakarta Pusat",
    payeeName: "PT Pertamina Patra Niaga",
    payeeAccount: "Bank BRI 0019-01-000456-30-2",
    referenceDocNumber: "INV-LPG-2026-441",
    items: [
      {
        id: "1",
        itemName: "Refill Gas LPG Industri 50 Kg",
        quantity: 12,
        unit: "Tabung",
        unitPrice: 875000,
        totalPrice: 10500000,
      },
    ],
    subtotalAmount: 10500000,
    taxType: "PPN_11",
    taxAmount: 1155000,
    netAmount: 11655000,
    paymentMethod: "Virtual Account BUMN",
    status: "VERIFIED_PPK",
    verifierName: "Drs. Heru Prasetyo, M.M (PPK)",
    verifiedAt: "2026-08-26",
    notes: "Pengisian tangki cadangan bahan bakar kompor ketel masak Dapur Harmoni.",
    receiptAttachmentName: "nota_pertamina_lpg.pdf",
  },
  {
    id: "EXP-103",
    spjNumber: "SPJ-MBG-2026-0803",
    transactionDate: "2026-08-26",
    category: "Biaya BBM & Tol Armada Distribusi",
    kitchenLocation: "Dapur Sentral Harmoni - Jakarta Pusat",
    payeeName: "SPBU Pertamina 31.102.02 Thamrin",
    payeeAccount: "Kasbon Operasional Kasir",
    referenceDocNumber: "STRUK-BBM-20260826-01",
    items: [
      {
        id: "1",
        itemName: "BBM Biosolar B35 Armada Box Chiller (B 9482 MBG & B 9812 MBG)",
        quantity: 160,
        unit: "Liter",
        unitPrice: 6800,
        totalPrice: 1088000,
      },
      {
        id: "2",
        itemName: "E-Toll Distribusi Klaster Gambir & Senen",
        quantity: 4,
        unit: "Trip",
        unitPrice: 35000,
        totalPrice: 140000,
      },
    ],
    subtotalAmount: 1228000,
    taxType: "NONE",
    taxAmount: 0,
    netAmount: 1228000,
    paymentMethod: "Uang Persediaan Kas Kecil",
    status: "VERIFIED_PPK",
    verifierName: "Drs. Heru Prasetyo, M.M (PPK)",
    verifiedAt: "2026-08-26",
    notes: "Struk BBM asli & rekapan logsheet GPS armada telah dilampirkan lengkap.",
    receiptAttachmentName: "struk_bbm_toll_26aug.pdf",
  },
  {
    id: "EXP-104",
    spjNumber: "SPJ-MBG-2026-0804",
    transactionDate: "2026-08-26",
    category: "Belanja Bahan Baku (PO Supplier)",
    kitchenLocation: "SPPG Klender - Jakarta Timur",
    payeeName: "Koperasi Tani Makmur Mandiri",
    payeeAccount: "Bank BNI 045-8899-123",
    referenceDocNumber: "INV-KTMM-2026-092",
    items: [
      {
        id: "1",
        itemName: "Beras Putih Premium Pulen (Kemasan Karung 50kg)",
        quantity: 1500,
        unit: "Kg",
        unitPrice: 14500,
        totalPrice: 21750000,
      },
      {
        id: "2",
        itemName: "Sayur Buncis & Jagung Manis Segar Petik Pagi",
        quantity: 280,
        unit: "Kg",
        unitPrice: 16000,
        totalPrice: 4480000,
      },
    ],
    subtotalAmount: 26230000,
    taxType: "PPH_22",
    taxAmount: 393450,
    netAmount: 25836550,
    paymentMethod: "SP2D Kas Negara",
    status: "PENDING_VERIFICATION",
    notes: "Menunggu verifikasi bukti timbang dan BAST penerimaan beras dari SPPG Klender.",
    receiptAttachmentName: "faktur_koperasi_tani.pdf",
  },
  {
    id: "EXP-105",
    spjNumber: "SPJ-MBG-2026-0805",
    transactionDate: "2026-08-27",
    category: "Biaya Uji Mutu Lab & Mikrobiologi",
    kitchenLocation: "Dapur Sentral Harmoni - Jakarta Pusat",
    payeeName: "Balai Besar Laboratorium Kesehatan (BBLK)",
    payeeAccount: "Bank BNI 009-8877-665",
    referenceDocNumber: "INV-LAB-2026-880",
    items: [
      {
        id: "1",
        itemName: "Uji Mikrobiologi Swab Alat Masak (E. coli, Salmonella, S. aureus)",
        quantity: 8,
        unit: "Sampel",
        unitPrice: 350000,
        totalPrice: 2800000,
      },
      {
        id: "2",
        itemName: "Uji Angka Lempeng Total (ALT) Sampel Makanan Jadi",
        quantity: 4,
        unit: "Sampel",
        unitPrice: 250000,
        totalPrice: 1000000,
      },
    ],
    subtotalAmount: 3800000,
    taxType: "PPH_23",
    taxAmount: 76000,
    netAmount: 3724000,
    paymentMethod: "Transfer Bank BRI/Mandiri",
    status: "PENDING_VERIFICATION",
    notes: "Pengujian kepatuhan ISO 22000 & HACCP rutin dua mingguan.",
    receiptAttachmentName: "invoice_lab_mutu.pdf",
  },
  {
    id: "EXP-106",
    spjNumber: "SPJ-MBG-2026-0806",
    transactionDate: "2026-08-27",
    category: "Biaya Servis & Pemeliharaan Aset",
    kitchenLocation: "Dapur Sentral Harmoni - Jakarta Pusat",
    payeeName: "PT Kitchen Multi Sarana",
    payeeAccount: "Bank BCA 882-019-2811",
    referenceDocNumber: "WO-SERV-2026-104",
    items: [
      {
        id: "1",
        itemName: "Penggantian Gasket Seal & Kalibrasi Suhu Combi Steamer",
        quantity: 1,
        unit: "Paket",
        unitPrice: 2450000,
        totalPrice: 2450000,
      },
    ],
    subtotalAmount: 2450000,
    taxType: "PPH_23",
    taxAmount: 49000,
    netAmount: 2401000,
    paymentMethod: "Transfer Bank BRI/Mandiri",
    status: "DRAFT",
    notes: "Teknisi telah menyelesaikan penggantian suku cadang asli Rational.",
    receiptAttachmentName: "service_report_steamer.pdf",
  },
];

export default function ExpenditureManagement() {
  const [expenditures, setExpenditures] = useState<ExpenditureRecord[]>(INITIAL_EXPENDITURES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedLocation, setSelectedLocation] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ExpenditureRecord | null>(null);

  // Statistics
  const totalExpenditureAll = expenditures.reduce((acc, r) => acc + r.netAmount, 0);
  const rawFoodExpenses = expenditures
    .filter((r) => r.category.includes("Bahan Baku"))
    .reduce((acc, r) => acc + r.netAmount, 0);
  const operationalKitchenExpenses = expenditures
    .filter((r) => r.category.includes("Operasional Dapur"))
    .reduce((acc, r) => acc + r.netAmount, 0);
  const logisticsArmadaExpenses = expenditures
    .filter((r) => r.category.includes("BBM") || r.category.includes("Servis"))
    .reduce((acc, r) => acc + r.netAmount, 0);
  const pendingVerificationCount = expenditures.filter((r) => r.status === "PENDING_VERIFICATION").length;
  const verifiedCount = expenditures.filter((r) => r.status === "VERIFIED_PPK").length;

  // Handlers
  const handleSaveExpenditure = (data: ExpenditureRecord) => {
    setExpenditures((prev) => {
      const exists = prev.some((item) => item.id === data.id);
      if (exists) {
        return prev.map((item) => (item.id === data.id ? data : item));
      }
      return [data, ...prev];
    });
  };

  const handleVerify = (record: ExpenditureRecord) => {
    const updated: ExpenditureRecord = {
      ...record,
      status: "VERIFIED_PPK",
      verifierName: "Drs. Heru Prasetyo, M.M (PPK)",
      verifiedAt: new Date().toISOString().split("T")[0],
    };
    handleSaveExpenditure(updated);
  };

  const handleOpenDetail = (record: ExpenditureRecord) => {
    setSelectedRecord(record);
    setIsDetailModalOpen(true);
  };

  const handleOpenEdit = (record: ExpenditureRecord) => {
    setSelectedRecord(record);
    setIsCreateModalOpen(true);
  };

  const handleOpenPrint = (record: ExpenditureRecord) => {
    setSelectedRecord(record);
    setIsPrintModalOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedRecord(null);
    setIsCreateModalOpen(true);
  };

  // Filter logic
  const filteredRecords = expenditures.filter((r) => {
    const matchesSearch =
      r.spjNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.payeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.referenceDocNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.kitchenLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "ALL" || r.category === selectedCategory;
    const matchesLocation = selectedLocation === "ALL" || r.kitchenLocation === selectedLocation;
    const matchesStatus = selectedStatus === "ALL" || r.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesLocation && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* 1. KPI Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Pengeluaran Kas Terverifikasi */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Total Realisasi Belanja
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white font-mono">
              Rp {(totalExpenditureAll / 1000000).toFixed(2)} Jt
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {verifiedCount} Bukti SPJ Disahkan PPK
            </p>
          </div>
        </div>

        {/* Belanja Bahan Baku PO */}
        <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-xs dark:border-emerald-900/30 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Bahan Pangan Segar (PO)
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              Rp {(rawFoodExpenses / 1000000).toFixed(2)} Jt
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {(totalExpenditureAll > 0 ? (rawFoodExpenses / totalExpenditureAll) * 100 : 0).toFixed(1)}% dari total belanja
            </p>
          </div>
        </div>

        {/* Operasional Dapur & Energi */}
        <div className="rounded-2xl border border-purple-200 bg-white p-5 shadow-xs dark:border-purple-900/30 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Energi & Dapur Sentral
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">
              Rp {(operationalKitchenExpenses / 1000000).toFixed(2)} Jt
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              LPG Industri, Listrik & Air Bersih
            </p>
          </div>
        </div>

        {/* Antrean Verifikasi PPK */}
        <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-xs dark:border-amber-900/30 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Menunggu Otorisasi PPK
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
              {pendingVerificationCount} Berkas SPJ
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Siap diverifikasi tim keuangan
            </p>
          </div>
        </div>
      </div>

      {/* 2. Filters and Action Toolbar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-gray-900 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Cari No. SPJ, nama vendor/penerima, atau no faktur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-gray-50/50 py-2.5 pl-10 pr-4 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="ALL">Semua Kategori Belanja</option>
            <option value="Belanja Bahan Baku (PO Supplier)">Bahan Baku (PO)</option>
            <option value="Biaya Operasional Dapur (Gas/Listrik/Air)">Operasional Dapur</option>
            <option value="Biaya BBM & Tol Armada Distribusi">BBM & Tol Distribusi</option>
            <option value="Biaya Uji Mutu Lab & Mikrobiologi">Uji Mutu Lab</option>
            <option value="Biaya Servis & Pemeliharaan Aset">Servis & Pemeliharaan</option>
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="ALL">Semua Dapur Sentral</option>
            <option value="Dapur Sentral Harmoni - Jakarta Pusat">Dapur Sentral Harmoni</option>
            <option value="SPPG Klender - Jakarta Timur">SPPG Klender</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="ALL">Semua Status SPJ</option>
            <option value="VERIFIED_PPK">Disetujui (Verified PPK)</option>
            <option value="PENDING_VERIFICATION">Menunggu Verifikasi</option>
            <option value="DRAFT">Draft</option>
          </select>

          {/* Create Button */}
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Catat Pengeluaran Baru</span>
          </button>
        </div>
      </div>

      {/* 3. Expenditures Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50/75 text-xs uppercase font-semibold text-gray-500 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-400">
              <tr>
                <th className="px-5 py-3.5">No. SPJ & Tanggal</th>
                <th className="px-4 py-3.5">Penerima & Uraian Belanja</th>
                <th className="px-4 py-3.5">Dapur Sentral</th>
                <th className="px-4 py-3.5 text-right">Nilai Bruto</th>
                <th className="px-4 py-3.5 text-right">Pajak</th>
                <th className="px-4 py-3.5 text-right">Netto Cair</th>
                <th className="px-4 py-3.5 text-center">Status SPJ</th>
                <th className="px-5 py-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((r) => {
                  return (
                    <tr key={r.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
                      {/* SPJ & Date */}
                      <td className="px-5 py-4">
                        <div className="font-mono font-bold text-gray-900 dark:text-white">{r.spjNumber}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{r.transactionDate}</div>
                      </td>

                      {/* Payee & Description */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="font-semibold text-gray-900 dark:text-white truncate">{r.payeeName}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                          {r.category} ({r.items.length} item)
                        </div>
                      </td>

                      {/* Kitchen Location */}
                      <td className="px-4 py-4">
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {r.kitchenLocation.split(" - ")[0]}
                        </span>
                        <div className="text-[11px] text-gray-400 font-mono">Ref: {r.referenceDocNumber}</div>
                      </td>

                      {/* Bruto */}
                      <td className="px-4 py-4 text-right font-medium text-gray-700 dark:text-gray-300 font-mono">
                        Rp {r.subtotalAmount.toLocaleString("id-ID")}
                      </td>

                      {/* Tax */}
                      <td className="px-4 py-4 text-right text-xs text-amber-600 dark:text-amber-400 font-mono">
                        {r.taxType !== "NONE" ? `- Rp ${r.taxAmount.toLocaleString("id-ID")}` : "-"}
                      </td>

                      {/* Netto */}
                      <td className="px-4 py-4 text-right font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                        Rp {r.netAmount.toLocaleString("id-ID")}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4 text-center">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          r.status === "VERIFIED_PPK"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
                            : r.status === "PENDING_VERIFICATION"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                            : r.status === "REJECTED"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                        }`}>
                          {r.status === "VERIFIED_PPK" && (
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          {r.status === "VERIFIED_PPK"
                            ? "Verified PPK"
                            : r.status === "PENDING_VERIFICATION"
                            ? "Pending PPK"
                            : r.status === "REJECTED"
                            ? "Ditolak"
                            : "Draft"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleOpenDetail(r)}
                            title="Lihat Rincian SPJ"
                            className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>

                          <button
                            onClick={() => handleOpenPrint(r)}
                            title="Cetak Kuitansi Resmi"
                            className="rounded-lg p-1.5 text-gray-600 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                          </button>

                          {r.status !== "VERIFIED_PPK" && (
                            <button
                              onClick={() => handleVerify(r)}
                              title="Verifikasi & Setujui SPJ"
                              className="rounded-lg p-1.5 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/40"
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                          )}

                          <button
                            onClick={() => handleOpenEdit(r)}
                            title="Ubah Data SPJ"
                            className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="mt-2 text-sm font-medium">Tidak ada data pengeluaran kas yang sesuai filter.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <CreateExpenditureModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveExpenditure}
        initialData={selectedRecord}
      />

      <ExpenditureDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        record={selectedRecord}
        onEdit={handleOpenEdit}
        onVerify={handleVerify}
        onPrint={handleOpenPrint}
      />

      <ExpenditureReceiptPrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        record={selectedRecord}
      />
    </div>
  );
}
