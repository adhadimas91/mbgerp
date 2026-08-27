"use client";

import React, { useRef } from "react";
import { SupplierPaymentInvoice } from "./ProcessPaymentModal";

interface PaymentProofPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: SupplierPaymentInvoice | null;
}

export default function PaymentProofPrintModal({
  isOpen,
  onClose,
  invoice,
}: PaymentProofPrintModalProps) {
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl transition-all dark:border-gray-800 dark:bg-gray-900 max-h-[95vh] overflow-y-auto">
        {/* Header toolbar */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </span>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Cetak Bank Payment Voucher (BPV) MBG
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 shadow-sm"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak Voucher Bank
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Printable Paper */}
        <div ref={printAreaRef} className="mt-4 rounded-xl border border-gray-300 bg-white p-7 text-black shadow-inner font-sans">
          {/* Letterhead */}
          <div className="border-b-2 border-black pb-2 text-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-700">
              BADAN GIZI NASIONAL - KEUANGAN SATKER MBG
            </h2>
            <h1 className="text-base font-extrabold uppercase text-black">
              BANK PAYMENT VOUCHER (BPV) / BUKTI PEMBAYARAN REKENING
            </h1>
            <p className="text-[11px] text-gray-600">
              Ref Bank: <strong>{invoice.paymentReferenceNumber || "TRX-BGN-PENDING"}</strong> | Status: <span className="font-bold text-emerald-700">{invoice.paymentStatus}</span>
            </p>
          </div>

          {/* Details Table */}
          <div className="mt-4 text-xs space-y-2">
            <div className="grid grid-cols-2 gap-4 border border-gray-300 p-3 rounded-md bg-gray-50/40">
              <div>
                <p><strong className="text-gray-700">Nomor Faktur:</strong> {invoice.invoiceNumber}</p>
                <p><strong className="text-gray-700">Nomor PO:</strong> {invoice.poNumber}</p>
                <p><strong className="text-gray-700">Tanggal Faktur:</strong> {invoice.invoiceDate}</p>
                <p><strong className="text-gray-700">Tanggal Jatuh Tempo:</strong> {invoice.dueDate}</p>
              </div>
              <div>
                <p><strong className="text-gray-700">Nama Rekanan / Vendor:</strong> {invoice.supplierName}</p>
                <p><strong className="text-gray-700">Bank Vendor:</strong> {invoice.supplierBankName}</p>
                <p><strong className="text-gray-700">No. Rekening:</strong> {invoice.supplierBankAccount}</p>
                <p><strong className="text-gray-700">Sumber Rekening MBG:</strong> {invoice.fundingBank || "Bank Mandiri MBG Pusat"}</p>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="mt-3">
              <h4 className="text-[11px] font-bold uppercase text-gray-800 mb-1">
                Kalkulasi Tagihan & Potongan:
              </h4>
              <table className="w-full text-xs border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 text-gray-800">
                    <th className="border border-gray-300 p-2 text-left">Komponen Tagihan</th>
                    <th className="border border-gray-300 p-2 text-right">Nilai (Rp)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">Nilai Tagihan Kotor (Gross) - {invoice.itemsSummary}</td>
                    <td className="border border-gray-300 p-2 text-right font-mono">Rp {invoice.grossAmount.toLocaleString("id-ID")}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-amber-700">Potongan Pajak PPh Pasal 22 (1.5%)</td>
                    <td className="border border-gray-300 p-2 text-right font-mono text-amber-700">- Rp {invoice.taxDeduction.toLocaleString("id-ID")}</td>
                  </tr>
                  {invoice.penaltyDeduction > 0 && (
                    <tr>
                      <td className="border border-gray-300 p-2 text-red-700">Potongan Penalti Keterlambatan / Reject Mutu</td>
                      <td className="border border-gray-300 p-2 text-right font-mono text-red-700">- Rp {invoice.penaltyDeduction.toLocaleString("id-ID")}</td>
                    </tr>
                  )}
                  <tr className="bg-emerald-50 font-bold">
                    <td className="border border-gray-300 p-2 text-emerald-900">JUMLAH DIBAYARKAN (NET PAYABLE):</td>
                    <td className="border border-gray-300 p-2 text-right font-mono text-emerald-900">Rp {invoice.netPayableAmount.toLocaleString("id-ID")}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Signature Block */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center text-xs">
              <div>
                <p className="text-gray-600">Disiapkan oleh:</p>
                <p className="font-semibold text-gray-800">Staff Keuangan / Kasir</p>
                <div className="my-6 text-gray-300 text-xs italic">[ Ttd Elektronik ]</div>
                <p className="font-bold underline text-gray-900">Ahmad Fauzi, S.E.</p>
              </div>

              <div>
                <p className="text-gray-600">Diverifikasi oleh:</p>
                <p className="font-semibold text-gray-800">Bendahara Pengeluaran</p>
                <div className="my-6 text-gray-300 text-xs italic">[ Ttd Elektronik ]</div>
                <p className="font-bold underline text-gray-900">Siti Rahmawati, S.E., Ak.</p>
              </div>

              <div>
                <p className="text-gray-600">Disetujui oleh:</p>
                <p className="font-semibold text-gray-800">Kuasa Pengguna Anggaran (KPA)</p>
                <div className="my-6 text-gray-300 text-xs italic">[ Ttd Elektronik ]</div>
                <p className="font-bold underline text-gray-900">Drs. Heru Prasetyo, M.M</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
