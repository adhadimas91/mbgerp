"use client";

import React from "react";
import { ExpenditureRecord } from "./CreateExpenditureModal";

interface ExpenditureDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: ExpenditureRecord | null;
  onEdit?: (record: ExpenditureRecord) => void;
  onVerify?: (record: ExpenditureRecord) => void;
  onPrint?: (record: ExpenditureRecord) => void;
}

export default function ExpenditureDetailModal({
  isOpen,
  onClose,
  record,
  onEdit,
  onVerify,
  onPrint,
}: ExpenditureDetailModalProps) {
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl transition-all dark:border-gray-800 dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Rincian Bukti Pengeluaran Kas & SPJ
                </h3>
                <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                  {record.spjNumber}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Kategori: {record.category} | Tanggal: {record.transactionDate}
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
          {/* Metadata Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-800/40">
              <span className="text-xs text-gray-500 dark:text-gray-400">Penerima Dana / Vendor</span>
              <p className="mt-0.5 text-sm font-bold text-gray-900 dark:text-white">{record.payeeName}</p>
              <span className="text-xs text-gray-500 font-mono">{record.payeeAccount || "-"}</span>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-800/40">
              <span className="text-xs text-gray-500 dark:text-gray-400">Satker / Dapur Sentral</span>
              <p className="mt-0.5 text-sm font-bold text-gray-900 dark:text-white">{record.kitchenLocation}</p>
              <span className="text-xs text-gray-500">Ref: {record.referenceDocNumber}</span>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3 dark:border-blue-900/40 dark:bg-blue-950/20">
              <span className="text-xs text-blue-700 dark:text-blue-300">Total Netto Dibayarkan</span>
              <p className="mt-0.5 text-base font-extrabold text-blue-700 dark:text-blue-300 font-mono">
                Rp {record.netAmount.toLocaleString("id-ID")}
              </p>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{record.paymentMethod}</span>
            </div>
          </div>

          {/* Items Table */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800/30">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-3">
              Rincian Komponen Barang / Jasa yang Dibelanjakan
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  <tr>
                    <th className="py-2.5 px-3">No</th>
                    <th className="py-2.5 px-3">Uraian Barang / Pekerjaan</th>
                    <th className="py-2.5 px-3 text-center">Volume</th>
                    <th className="py-2.5 px-3 text-center">Satuan</th>
                    <th className="py-2.5 px-3 text-right">Harga Satuan (Rp)</th>
                    <th className="py-2.5 px-3 text-right">Jumlah Total (Rp)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
                  {record.items.map((item, idx) => (
                    <tr key={item.id || idx}>
                      <td className="py-2.5 px-3 font-sans text-gray-500">{idx + 1}</td>
                      <td className="py-2.5 px-3 font-sans font-medium text-gray-900 dark:text-white">
                        {item.itemName}
                      </td>
                      <td className="py-2.5 px-3 text-center">{item.quantity}</td>
                      <td className="py-2.5 px-3 text-center font-sans">{item.unit}</td>
                      <td className="py-2.5 px-3 text-right">Rp {item.unitPrice.toLocaleString("id-ID")}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-gray-900 dark:text-white">
                        Rp {item.totalPrice.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculations and Tax Breakdown */}
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between gap-4">
              <div className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <p><strong>Dokumen Lampiran:</strong> {record.receiptAttachmentName || "faktur_kuitansi.pdf"}</p>
                {record.notes && <p><strong>Catatan:</strong> {record.notes}</p>}
              </div>

              <div className="w-full md:w-64 space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal Belanja:</span>
                  <span className="font-mono font-semibold">Rp {record.subtotalAmount.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-amber-600 dark:text-amber-400">
                  <span>Potongan Pajak ({record.taxType}):</span>
                  <span className="font-mono font-semibold">- Rp {record.taxAmount.toLocaleString("id-ID")}</span>
                </div>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold text-gray-900 dark:text-white text-sm">
                  <span>Total Netto Cair:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">
                    Rp {record.netAmount.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Audit Trail & Verification Stage */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800/30">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-3">
              Tahapan Verifikasi & Otorisasi SPJ Keuangan Negara
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/40">
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>1. Input Kasir Dapur</span>
                </div>
                <p className="mt-1 text-[11px] text-gray-500">Bukti struk & invoice diunggah lengkap.</p>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/40">
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>2. Verifikasi Pajak</span>
                </div>
                <p className="mt-1 text-[11px] text-gray-500">Tarif PPh/PPN telah diuji sesuai aturan DJP.</p>
              </div>

              <div className={`p-2.5 rounded-lg border ${
                record.status === "VERIFIED_PPK"
                  ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/40"
                  : "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900/40"
              }`}>
                <div className={`flex items-center gap-1.5 font-bold ${
                  record.status === "VERIFIED_PPK" ? "text-emerald-700 dark:text-emerald-400" : "text-blue-700 dark:text-blue-400"
                }`}>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={record.status === "VERIFIED_PPK" ? "M5 13l4 4L19 7" : "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"} />
                  </svg>
                  <span>3. Otorisasi PPK</span>
                </div>
                <p className="mt-1 text-[11px] text-gray-500">
                  {record.status === "VERIFIED_PPK" ? `Disetujui: ${record.verifierName}` : "Menunggu pengesahan PPK"}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 font-bold">
                  <span>4. Pembukuan Kas</span>
                </div>
                <p className="mt-1 text-[11px] text-gray-500">Dicatat pada Buku Kas Umum (BKU).</p>
              </div>
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
                onClick={() => onPrint(record)}
                className="flex items-center gap-1.5 rounded-xl border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-950/40"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Cetak Kuitansi SPJ
              </button>
            )}

            {record.status !== "VERIFIED_PPK" && onVerify && (
              <button
                type="button"
                onClick={() => {
                  onVerify(record);
                  onClose();
                }}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
              >
                Verifikasi & Setujui SPJ
              </button>
            )}

            {onEdit && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEdit(record);
                }}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Ubah Data SPJ
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
