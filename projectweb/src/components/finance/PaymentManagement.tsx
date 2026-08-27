"use client";

import React, { useState } from "react";
import ProcessPaymentModal, { SupplierPaymentInvoice } from "./ProcessPaymentModal";
import PaymentInvoiceDetailModal from "./PaymentInvoiceDetailModal";
import BankReconciliationModal from "./BankReconciliationModal";
import PaymentProofPrintModal from "./PaymentProofPrintModal";

const INITIAL_INVOICES: SupplierPaymentInvoice[] = [
  {
    id: "PAY-101",
    invoiceNumber: "INV-SPN-2026-0819",
    poNumber: "PO-MBG-20260815-001",
    supplierName: "PT Segar Pangan Nusantara",
    supplierBankName: "Bank Mandiri (Cabang Thamrin)",
    supplierBankAccount: "122-00-9988776-5",
    invoiceDate: "2026-08-20",
    dueDate: "2026-09-03",
    grossAmount: 20085000,
    taxDeduction: 301275,
    penaltyDeduction: 0,
    netPayableAmount: 19783725,
    paymentStatus: "PAID",
    paymentReferenceNumber: "TRX-MDR-20260825-0101",
    paymentExecutionDate: "2026-08-25",
    fundingBank: "Bank Mandiri MBG Pusat",
    threeWayMatchStatus: "MATCHED",
    itemsSummary: "Daging Ayam Broiler Fillet (420 Kg) & Telur Ayam NKV (150 Kg)",
    notes: "Telah lolos uji organoleptik dan pencocokan kuantitas timbang BAST.",
  },
  {
    id: "PAY-102",
    invoiceNumber: "INV-KTMM-2026-092",
    poNumber: "PO-MBG-20260818-004",
    supplierName: "Koperasi Tani Makmur Mandiri",
    supplierBankName: "Bank BNI (Cabang Jatinegara)",
    supplierBankAccount: "045-8899-123",
    invoiceDate: "2026-08-22",
    dueDate: "2026-08-29",
    grossAmount: 26230000,
    taxDeduction: 393450,
    penaltyDeduction: 0,
    netPayableAmount: 25836550,
    paymentStatus: "APPROVED",
    fundingBank: "Bank BRI MBG Operasional",
    threeWayMatchStatus: "MATCHED",
    itemsSummary: "Beras Putih Premium (1.500 Kg) & Sayur Buncis Jagung (280 Kg)",
    notes: "Siap bayar termin Net 7 hari.",
  },
  {
    id: "PAY-103",
    invoiceNumber: "INV-SBM-2026-118",
    poNumber: "PO-MBG-20260820-007",
    supplierName: "PT Sumber Berkah Mina Bahari",
    supplierBankName: "Bank BRI (Cabang Tanjung Priok)",
    supplierBankAccount: "0019-01-884422-50-1",
    invoiceDate: "2026-08-23",
    dueDate: "2026-08-30",
    grossAmount: 18500000,
    taxDeduction: 277500,
    penaltyDeduction: 0,
    netPayableAmount: 18222500,
    paymentStatus: "PENDING_APPROVAL",
    fundingBank: "Bank Mandiri MBG Pusat",
    threeWayMatchStatus: "MATCHED",
    itemsSummary: "Ikan Fillet Gurame & Kembung Segar Cold Chain (350 Kg)",
    notes: "Menunggu tanda tangan digital verifikasi PPK.",
  },
  {
    id: "PAY-104",
    invoiceNumber: "INV-HBL-2026-044",
    poNumber: "PO-MBG-20260810-002",
    supplierName: "CV Hijau Berkah Lembang",
    supplierBankName: "Bank BJB (Cabang Lembang)",
    supplierBankAccount: "0022-11-993344",
    invoiceDate: "2026-08-12",
    dueDate: "2026-08-26",
    grossAmount: 12400000,
    taxDeduction: 186000,
    penaltyDeduction: 124000, // Denda keterlambatan 1%
    netPayableAmount: 12090000,
    paymentStatus: "OVERDUE",
    fundingBank: "Bank BNI Satker Kasda",
    threeWayMatchStatus: "MATCHED",
    itemsSummary: "Sayur Wortel, Bayam Hidroponik & Tomat Segar (600 Kg)",
    notes: "Jatuh tempo terlewati 1 hari, dikenakan denda keterlambatan pengiriman bahan.",
  },
  {
    id: "PAY-105",
    invoiceNumber: "INV-KMS-2026-077",
    poNumber: "PO-MBG-20260822-011",
    supplierName: "PT Kitchen Multi Sarana",
    supplierBankName: "Bank BCA (Cabang Kelapa Gading)",
    supplierBankAccount: "882-019-2811",
    invoiceDate: "2026-08-24",
    dueDate: "2026-09-07",
    grossAmount: 8900000,
    taxDeduction: 178000,
    penaltyDeduction: 0,
    netPayableAmount: 8722000,
    paymentStatus: "APPROVED",
    fundingBank: "Bank Mandiri MBG Pusat",
    threeWayMatchStatus: "MATCHED",
    itemsSummary: "Food Pan Stainless SUS 304 (50 Pcs) & Gasket Seal Pengganti",
    notes: "Peralatan masak food grade telah diinspeksi lolos SNI SUS 304.",
  },
];

export default function PaymentManagement() {
  const [invoices, setInvoices] = useState<SupplierPaymentInvoice[]>(INITIAL_INVOICES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedSupplier, setSelectedSupplier] = useState("ALL");

  // Modals
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isReconModalOpen, setIsReconModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<SupplierPaymentInvoice | null>(null);

  // Statistics
  const totalInvoiced = invoices.reduce((acc, i) => acc + i.netPayableAmount, 0);
  const totalPaid = invoices.filter((i) => i.paymentStatus === "PAID").reduce((acc, i) => acc + i.netPayableAmount, 0);
  const totalReadyToPay = invoices.filter((i) => i.paymentStatus === "APPROVED").reduce((acc, i) => acc + i.netPayableAmount, 0);
  const overdueCount = invoices.filter((i) => i.paymentStatus === "OVERDUE").length;
  const overdueTotal = invoices.filter((i) => i.paymentStatus === "OVERDUE").reduce((acc, i) => acc + i.netPayableAmount, 0);

  // Handlers
  const handleConfirmPayment = (updatedInvoice: SupplierPaymentInvoice) => {
    setInvoices((prev) =>
      prev.map((item) => (item.id === updatedInvoice.id ? updatedInvoice : item))
    );
  };

  const handleOpenProcessPay = (invoice: SupplierPaymentInvoice) => {
    setSelectedInvoice(invoice);
    setIsProcessModalOpen(true);
  };

  const handleOpenDetail = (invoice: SupplierPaymentInvoice) => {
    setSelectedInvoice(invoice);
    setIsDetailModalOpen(true);
  };

  const handleOpenPrint = (invoice: SupplierPaymentInvoice) => {
    setSelectedInvoice(invoice);
    setIsPrintModalOpen(true);
  };

  // Filter
  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.itemsSummary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === "ALL" || inv.paymentStatus === selectedStatus;
    const matchesSupplier = selectedSupplier === "ALL" || inv.supplierName === selectedSupplier;

    return matchesSearch && matchesStatus && matchesSupplier;
  });

  return (
    <div className="space-y-6">
      {/* 1. KPI Metric Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Tagihan Faktur */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Total Tagihan Faktur
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white font-mono">
              Rp {(totalInvoiced / 1000000).toFixed(2)} Jt
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {invoices.length} Faktur Supplier Aktif
            </p>
          </div>
        </div>

        {/* Lunas Terbayar */}
        <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-xs dark:border-emerald-900/30 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Sudah Lunas Terbayar
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              Rp {(totalPaid / 1000000).toFixed(2)} Jt
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Transfer SP2D Bank BUMN Sukses
            </p>
          </div>
        </div>

        {/* Siap Bayar / Disetujui */}
        <div className="rounded-2xl border border-blue-200 bg-white p-5 shadow-xs dark:border-blue-900/30 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Siap Bayar (Approved)
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
              Rp {(totalReadyToPay / 1000000).toFixed(2)} Jt
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              3-Way Match Terverifikasi
            </p>
          </div>
        </div>

        {/* Tagihan Jatuh Tempo (Overdue) */}
        <div className="rounded-2xl border border-red-200 bg-white p-5 shadow-xs dark:border-red-900/30 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
              Jatuh Tempo (Overdue)
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-red-600 dark:text-red-400 font-mono">
              {overdueCount} Faktur
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Rp {(overdueTotal / 1000000).toFixed(2)} Jt perlu prioritas bayar
            </p>
          </div>
        </div>
      </div>

      {/* 2. Action Toolbar & Filters */}
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
            placeholder="Cari No. Faktur, No. PO, nama supplier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-gray-50/50 py-2.5 pl-10 pr-4 text-sm text-gray-900 focus:border-purple-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 focus:border-purple-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="ALL">Semua Status Bayar</option>
            <option value="APPROVED">Siap Bayar (Approved)</option>
            <option value="PENDING_APPROVAL">Menunggu Persetujuan</option>
            <option value="PAID">Lunas (Paid)</option>
            <option value="OVERDUE">Jatuh Tempo (Overdue)</option>
          </select>

          <select
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 focus:border-purple-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="ALL">Semua Rekanan Vendor</option>
            <option value="PT Segar Pangan Nusantara">PT Segar Pangan Nusantara</option>
            <option value="Koperasi Tani Makmur Mandiri">Koperasi Tani Makmur Mandiri</option>
            <option value="PT Sumber Berkah Mina Bahari">PT Sumber Berkah Mina Bahari</option>
            <option value="CV Hijau Berkah Lembang">CV Hijau Berkah Lembang</option>
          </select>

          {/* Bank Reconciliation Button */}
          <button
            onClick={() => setIsReconModalOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-950/40 transition-all"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span>Rekonsiliasi Bank</span>
          </button>
        </div>
      </div>

      {/* 3. Invoices Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50/75 text-xs uppercase font-semibold text-gray-500 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-400">
              <tr>
                <th className="px-5 py-3.5">Faktur & No. PO</th>
                <th className="px-4 py-3.5">Supplier Rekanan</th>
                <th className="px-4 py-3.5 text-right">Nilai Bruto</th>
                <th className="px-4 py-3.5 text-right">Potongan PPh 22</th>
                <th className="px-4 py-3.5 text-right">Netto Siap Bayar</th>
                <th className="px-4 py-3.5">Jatuh Tempo</th>
                <th className="px-4 py-3.5 text-center">Status Pembayaran</th>
                <th className="px-5 py-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((inv) => {
                  return (
                    <tr key={inv.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
                      {/* Invoice & PO */}
                      <td className="px-5 py-4">
                        <div className="font-mono font-bold text-gray-900 dark:text-white">{inv.invoiceNumber}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-0.5">PO: {inv.poNumber}</div>
                      </td>

                      {/* Supplier */}
                      <td className="px-4 py-4 max-w-xs">
                        <div className="font-semibold text-gray-900 dark:text-white truncate">{inv.supplierName}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                          {inv.itemsSummary}
                        </div>
                      </td>

                      {/* Gross */}
                      <td className="px-4 py-4 text-right font-medium text-gray-700 dark:text-gray-300 font-mono">
                        Rp {inv.grossAmount.toLocaleString("id-ID")}
                      </td>

                      {/* Tax deduction */}
                      <td className="px-4 py-4 text-right text-xs text-amber-600 dark:text-amber-400 font-mono">
                        - Rp {(inv.taxDeduction + inv.penaltyDeduction).toLocaleString("id-ID")}
                      </td>

                      {/* Net Payable */}
                      <td className="px-4 py-4 text-right font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                        Rp {inv.netPayableAmount.toLocaleString("id-ID")}
                      </td>

                      {/* Due Date */}
                      <td className="px-4 py-4 text-xs font-medium">
                        <div className={inv.paymentStatus === "OVERDUE" ? "text-red-600 font-bold" : "text-gray-700 dark:text-gray-300"}>
                          {inv.dueDate}
                        </div>
                        <div className="text-[11px] text-gray-400">
                          {inv.paymentStatus === "PAID" ? "Telah Lunas" : "Term Net 7/14"}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4 text-center">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          inv.paymentStatus === "PAID"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
                            : inv.paymentStatus === "APPROVED"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                            : inv.paymentStatus === "OVERDUE"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                        }`}>
                          {inv.paymentStatus === "PAID" && (
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          {inv.paymentStatus === "PAID"
                            ? "Lunas"
                            : inv.paymentStatus === "APPROVED"
                            ? "Siap Bayar"
                            : inv.paymentStatus === "OVERDUE"
                            ? "Jatuh Tempo"
                            : "Pending Approval"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleOpenDetail(inv)}
                            title="Lihat Rincian Faktur"
                            className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 hover:text-purple-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-purple-400"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>

                          <button
                            onClick={() => handleOpenPrint(inv)}
                            title="Cetak Voucher Bank (BPV)"
                            className="rounded-lg p-1.5 text-gray-600 hover:bg-purple-50 hover:text-purple-600 dark:text-gray-400 dark:hover:bg-purple-950/40 dark:hover:text-purple-400"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                          </button>

                          {inv.paymentStatus !== "PAID" && (
                            <button
                              onClick={() => handleOpenProcessPay(inv)}
                              title="Proses Bayar Sekarang"
                              className="rounded-lg p-1.5 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/40"
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            </button>
                          )}
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
                      <p className="mt-2 text-sm font-medium">Tidak ada data tagihan supplier yang sesuai filter.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <ProcessPaymentModal
        isOpen={isProcessModalOpen}
        onClose={() => setIsProcessModalOpen(false)}
        onConfirmPayment={handleConfirmPayment}
        invoice={selectedInvoice}
      />

      <PaymentInvoiceDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        invoice={selectedInvoice}
        onProcessPay={handleOpenProcessPay}
        onPrint={handleOpenPrint}
      />

      <BankReconciliationModal
        isOpen={isReconModalOpen}
        onClose={() => setIsReconModalOpen(false)}
      />

      <PaymentProofPrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        invoice={selectedInvoice}
      />
    </div>
  );
}
