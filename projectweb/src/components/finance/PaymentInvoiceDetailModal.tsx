"use client";

import React from "react";
import { SupplierPaymentInvoice } from "./ProcessPaymentModal";

interface PaymentInvoiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: SupplierPaymentInvoice | null;
  onProcessPay?: (invoice: SupplierPaymentInvoice) => void;
  onPrint?: (invoice: SupplierPaymentInvoice) => void;
}

export default function PaymentInvoiceDetailModal({
  isOpen,
  onClose,
  invoice,
  onProcessPay,
  onPrint,
}: PaymentInvoiceDetailModalProps) {
  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl transition-all dark:border-gray-800 dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Rincian Faktur Tagihan Supplier & 3-Way Matching
                </h3>
                <span className="rounded-md bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 font-mono">
                  {invoice.invoiceNumber}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Supplier: {invoice.supplierName} | PO Ref: {invoice.poNumber}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="mt-5 space-y-6">
          {/* Top Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-800/40">
              <span className="text-xs text-gray-500">Nilai Bruto Tagihan</span>
              <p className="mt-0.5 text-base font-bold text-gray-900 dark:text-white font-mono">
                Rp {invoice.grossAmount.toLocaleString("id-ID")}
              </p>
              <span className="text-xs text-gray-500">Tgl: {invoice.invoiceDate}</span>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3 dark:border-amber-900/40 dark:bg-amber-950/20">
              <span className="text-xs text-amber-700 dark:text-amber-300">Potongan Pajak & Denda</span>
              <p className="mt-0.5 text-base font-bold text-amber-700 dark:text-amber-300 font-mono">
                - Rp {(invoice.taxDeduction + invoice.penaltyDeduction).toLocaleString("id-ID")}
              </p>
              <span className="text-xs text-amber-600 dark:text-amber-400">PPh 22 + Penalti</span>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 dark:border-emerald-900/40 dark:bg-emerald-950/20">
              <span className="text-xs text-emerald-700 dark:text-emerald-300">Netto Siap Bayar</span>
              <p className="mt-0.5 text-base font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">
                Rp {invoice.netPayableAmount.toLocaleString("id-ID")}
              </p>
              <span className="text-xs text-emerald-600 dark:text-emerald-400">Jatuh Tempo: {invoice.dueDate}</span>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3 dark:border-blue-900/40 dark:bg-blue-950/20">
              <span className="text-xs text-blue-700 dark:text-blue-300">Status Pembayaran</span>
              <p className="mt-0.5 text-base font-bold text-blue-700 dark:text-blue-300">
                {invoice.paymentStatus === "PAID"
                  ? "LUNAS (PAID)"
                  : invoice.paymentStatus === "APPROVED"
                  ? "SIAP BAYAR"
                  : invoice.paymentStatus === "OVERDUE"
                  ? "JATUH TEMPO"
                  : "MENUNGGU PERSETUJUAN"}
              </p>
              <span className="text-xs text-blue-600 dark:text-blue-400">
                {invoice.paymentExecutionDate ? `Tgl: ${invoice.paymentExecutionDate}` : "Belum dieksekusi"}
              </span>
            </div>
          </div>

          {/* 3-Way Matching Verification Box */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800/30">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Validasi 3-Way Matching Sistem (PO Gudang ↔ BAST Logistik ↔ Invoice Tagihan)
              </h4>
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                invoice.threeWayMatchStatus === "MATCHED"
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
              }`}>
                {invoice.threeWayMatchStatus === "MATCHED" ? "✓ 3-Way Match Terverifikasi Cocok" : "⚠ Ada Diskrepansi Qty / Harga"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gray-800 dark:text-gray-200">1. Dokumen Purchase Order (PO)</span>
                  <span className="text-[10px] text-emerald-600 font-bold font-mono">{invoice.poNumber}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400">Diterbitkan oleh Tim Pengadaan MBG dengan pagu harga resmi BGN.</p>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gray-800 dark:text-gray-200">2. Berita Acara Penerimaan (BAST)</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Lolos QC Suhu & Mutu</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400">Barang diterima di Dapur Sentral, suhu cold chain & organoleptik sesuai standar ISO 22000.</p>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gray-800 dark:text-gray-200">3. Faktur Invoice Tagihan</span>
                  <span className="text-[10px] text-emerald-600 font-bold font-mono">{invoice.invoiceNumber}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400">Kuantitas & nominal harga per unit sesuai kesepakatan kontrak e-Katalog.</p>
              </div>
            </div>
          </div>

          {/* Item Details & Bank Account */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                Rangkuman Komoditas Bahan Baku
              </h4>
              <p className="text-xs text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/40 p-3 rounded-lg">
                {invoice.itemsSummary}
              </p>
              {invoice.notes && (
                <p className="mt-2 text-xs text-gray-500 italic">
                  Catatan Verifikasi: {invoice.notes}
                </p>
              )}
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800/30 space-y-2 text-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                Rekening Penerima & Bank Penyalur
              </h4>
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-500">Nama Supplier Vendor:</span>
                <span className="font-bold text-gray-900 dark:text-white">{invoice.supplierName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-500">Bank Vendor:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{invoice.supplierBankName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-500">Nomor Rekening Vendor:</span>
                <span className="font-mono font-bold text-gray-900 dark:text-white">{invoice.supplierBankAccount}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Bank Sumber Dana MBG:</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">{invoice.fundingBank || "Bank Mandiri MBG Pusat"}</span>
              </div>
              {invoice.paymentReferenceNumber && (
                <div className="flex justify-between py-1 border-t border-gray-100 dark:border-gray-800 font-mono text-emerald-600">
                  <span>No. Ref Transaksi Bank:</span>
                  <span className="font-bold">{invoice.paymentReferenceNumber}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Tutup
          </button>

          <div className="flex items-center gap-2">
            {onPrint && (
              <button
                type="button"
                onClick={() => onPrint(invoice)}
                className="flex items-center gap-1.5 rounded-xl border border-purple-600 px-4 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 dark:border-purple-500 dark:text-purple-400 dark:hover:bg-purple-950/40"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Cetak Voucher Bank (BPV)
              </button>
            )}

            {invoice.paymentStatus !== "PAID" && onProcessPay && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onProcessPay(invoice);
                }}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
              >
                Proses Pembayaran (Bayar Sekarang)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
