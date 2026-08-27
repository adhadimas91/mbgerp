"use client";

import React, { useState, useEffect } from "react";

export interface SupplierPaymentInvoice {
  id: string;
  invoiceNumber: string;
  poNumber: string;
  supplierName: string;
  supplierBankName: string;
  supplierBankAccount: string;
  invoiceDate: string;
  dueDate: string;
  grossAmount: number; // Tagihan Bruto
  taxDeduction: number; // Potongan PPh 22 (1.5%)
  penaltyDeduction: number; // Potongan Denda Keterlambatan / Reject
  netPayableAmount: number; // Nilai Bersih Siap Bayar
  paymentStatus: "PAID" | "APPROVED" | "PENDING_APPROVAL" | "OVERDUE";
  paymentReferenceNumber?: string;
  paymentExecutionDate?: string;
  fundingBank?: "Bank Mandiri MBG Pusat" | "Bank BRI MBG Operasional" | "Bank BNI Satker Kasda";
  threeWayMatchStatus: "MATCHED" | "DISCREPANCY" | "PENDING_CHECK";
  itemsSummary: string;
  notes?: string;
  transferReceiptUrl?: string;
}

interface ProcessPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmPayment: (data: SupplierPaymentInvoice) => void;
  invoice: SupplierPaymentInvoice | null;
}

export default function ProcessPaymentModal({
  isOpen,
  onClose,
  onConfirmPayment,
  invoice,
}: ProcessPaymentModalProps) {
  const [formData, setFormData] = useState<{
    paymentReferenceNumber: string;
    paymentExecutionDate: string;
    fundingBank: "Bank Mandiri MBG Pusat" | "Bank BRI MBG Operasional" | "Bank BNI Satker Kasda";
    transferReceiptUrl: string;
    notes: string;
  }>({
    paymentReferenceNumber: "TRX-BNI-20260827-0091",
    paymentExecutionDate: new Date().toISOString().split("T")[0],
    fundingBank: "Bank Mandiri MBG Pusat",
    transferReceiptUrl: "slip_transfer_bank_bgn.pdf",
    notes: "Pembayaran lunas via RTGS / Kliring SP2D Kasda.",
  });

  useEffect(() => {
    if (invoice) {
      const randomTrx = `TRX-BGN-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;
      setFormData({
        paymentReferenceNumber: invoice.paymentReferenceNumber || randomTrx,
        paymentExecutionDate: invoice.paymentExecutionDate || new Date().toISOString().split("T")[0],
        fundingBank: invoice.fundingBank || "Bank Mandiri MBG Pusat",
        transferReceiptUrl: invoice.transferReceiptUrl || "slip_transfer_bank.pdf",
        notes: invoice.notes || "Pembayaran lunas tagihan bahan baku.",
      });
    }
  }, [invoice, isOpen]);

  if (!isOpen || !invoice) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedInvoice: SupplierPaymentInvoice = {
      ...invoice,
      paymentStatus: "PAID",
      paymentReferenceNumber: formData.paymentReferenceNumber,
      paymentExecutionDate: formData.paymentExecutionDate,
      fundingBank: formData.fundingBank,
      transferReceiptUrl: formData.transferReceiptUrl,
      notes: formData.notes,
    };

    onConfirmPayment(updatedInvoice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl transition-all dark:border-gray-800 dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Proses Pembayaran Faktur Supplier
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Eksekusi pencairan dana SP2D transfer bank ke rekening vendor supplier MBG.
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

        {/* Invoice Summary Box */}
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/60 pb-2 dark:border-emerald-900/60">
            <div>
              <span className="font-mono text-xs font-bold text-emerald-800 dark:text-emerald-300">
                {invoice.invoiceNumber}
              </span>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                PO: {invoice.poNumber} | Vendor: <strong className="text-gray-900 dark:text-white">{invoice.supplierName}</strong>
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500">Jumlah Netto Dibayarkan:</span>
              <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                Rp {invoice.netPayableAmount.toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
            <div>
              <span>Bank Tujuan: </span>
              <strong className="text-gray-800 dark:text-gray-200">{invoice.supplierBankName}</strong>
            </div>
            <div>
              <span>No. Rekening: </span>
              <strong className="text-gray-800 dark:text-gray-200 font-mono">{invoice.supplierBankAccount}</strong>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Bank Sumber Kas MBG *
              </label>
              <select
                value={formData.fundingBank}
                onChange={(e) => setFormData({ ...formData, fundingBank: e.target.value as any })}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                <option value="Bank Mandiri MBG Pusat">Bank Mandiri MBG Pusat (Giro 122-00-1122334)</option>
                <option value="Bank BRI MBG Operasional">Bank BRI MBG Operasional (Giro 0019-01-998877)</option>
                <option value="Bank BNI Satker Kasda">Bank BNI Satker Kasda (Giro 009-1234-5678)</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Tanggal Eksekusi Transfer *
              </label>
              <input
                type="date"
                required
                value={formData.paymentExecutionDate}
                onChange={(e) => setFormData({ ...formData, paymentExecutionDate: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Nomor Referensi Transaksi Bank / SP2D *
              </label>
              <input
                type="text"
                required
                placeholder="TRX-BGN-202608-8812"
                value={formData.paymentReferenceNumber}
                onChange={(e) => setFormData({ ...formData, paymentReferenceNumber: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 font-mono"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Nama File Bukti Transfer Slip Bank
              </label>
              <input
                type="text"
                placeholder="slip_transfer_bank_bgn.pdf"
                value={formData.transferReceiptUrl}
                onChange={(e) => setFormData({ ...formData, transferReceiptUrl: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Catatan Bendahara Pengeluaran
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              placeholder="Tambahkan catatan transfer atau konfirmasi bendahara..."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 flex items-center gap-2"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Konfirmasi & Eksekusi Bayar (Lunas)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
