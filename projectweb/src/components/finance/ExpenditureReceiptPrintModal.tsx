"use client";

import React, { useRef } from "react";
import { ExpenditureRecord } from "./CreateExpenditureModal";

interface ExpenditureReceiptPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: ExpenditureRecord | null;
}

// Helper: Rupiah to words
function angkaKeTerbilang(angka: number): string {
  const bilangan = [
    "",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan",
    "Sepuluh",
    "Sebelas",
  ];

  if (angka < 12) return bilangan[angka];
  if (angka < 20) return angkaKeTerbilang(angka - 10) + " Belas";
  if (angka < 100)
    return (
      angkaKeTerbilang(Math.floor(angka / 10)) +
      " Puluh " +
      angkaKeTerbilang(angka % 10)
    );
  if (angka < 200) return "Seratus " + angkaKeTerbilang(angka - 100);
  if (angka < 1000)
    return (
      angkaKeTerbilang(Math.floor(angka / 100)) +
      " Ratus " +
      angkaKeTerbilang(angka % 100)
    );
  if (angka < 2000) return "Seribu " + angkaKeTerbilang(angka - 1000);
  if (angka < 1000000)
    return (
      angkaKeTerbilang(Math.floor(angka / 1000)) +
      " Ribu " +
      angkaKeTerbilang(angka % 1000)
    );
  if (angka < 1000000000)
    return (
      angkaKeTerbilang(Math.floor(angka / 1000000)) +
      " Juta " +
      angkaKeTerbilang(angka % 1000000)
    );
  if (angka < 1000000000000)
    return (
      angkaKeTerbilang(Math.floor(angka / 1000000000)) +
      " Miliar " +
      angkaKeTerbilang(angka % 1000000000)
    );
  return "";
}

export default function ExpenditureReceiptPrintModal({
  isOpen,
  onClose,
  record,
}: ExpenditureReceiptPrintModalProps) {
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !record) return null;

  const handlePrint = () => {
    window.print();
  };

  const terbilangText = angkaKeTerbilang(record.netAmount).trim() + " Rupiah";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl transition-all dark:border-gray-800 dark:bg-gray-900 max-h-[95vh] overflow-y-auto">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </span>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Cetak Kuitansi & Bukti Kas Keluar (BKK) MBG
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 shadow-sm"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak Kuitansi
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

        {/* Printable Area */}
        <div ref={printAreaRef} className="mt-4 rounded-xl border border-gray-300 bg-white p-7 text-black shadow-inner font-sans">
          {/* Header */}
          <div className="border-b-2 border-black pb-2 text-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-700">
              PROGRAM MAKANAN BERGIZI GRATIS (MBG)
            </h2>
            <h1 className="text-base font-extrabold uppercase text-black">
              KUITANSI PEMBAYARAN & BUKTI PENGELUARAN KAS
            </h1>
            <p className="text-[11px] text-gray-600">
              Nomor Register SPJ: <strong>{record.spjNumber}</strong> | Ref Doc: {record.referenceDocNumber}
            </p>
          </div>

          {/* Receipt Body */}
          <div className="mt-4 space-y-2.5 text-xs">
            <div className="grid grid-cols-12 py-1 border-b border-gray-200">
              <span className="col-span-3 text-gray-600 font-semibold">Telah Diterima Dari:</span>
              <span className="col-span-9 font-bold text-gray-900">
                Bendahara Pengeluaran Program MBG ({record.kitchenLocation})
              </span>
            </div>

            <div className="grid grid-cols-12 py-1 border-b border-gray-200">
              <span className="col-span-3 text-gray-600 font-semibold">Uang Sebesar:</span>
              <div className="col-span-9 rounded-sm bg-gray-100 p-2 font-mono font-extrabold text-sm text-gray-900 border border-gray-300">
                Rp {record.netAmount.toLocaleString("id-ID")},-
              </div>
            </div>

            <div className="grid grid-cols-12 py-1 border-b border-gray-200">
              <span className="col-span-3 text-gray-600 font-semibold">Terbilang:</span>
              <span className="col-span-9 font-semibold italic text-gray-800">
                &ldquo; {terbilangText} &rdquo;
              </span>
            </div>

            <div className="grid grid-cols-12 py-1 border-b border-gray-200">
              <span className="col-span-3 text-gray-600 font-semibold">Untuk Pembayaran:</span>
              <span className="col-span-9 text-gray-800">
                {record.category} - {record.notes || "Pengadaan bahan & operasional pendukung MBG."}
              </span>
            </div>

            <div className="grid grid-cols-12 py-1 border-b border-gray-200">
              <span className="col-span-3 text-gray-600 font-semibold">Kepada Vendor / Rekening:</span>
              <span className="col-span-9 font-bold text-gray-900">
                {record.payeeName} ({record.payeeAccount || "Kasir Operasional"})
              </span>
            </div>
          </div>

          {/* Items Summary Table */}
          <div className="mt-4">
            <h4 className="text-[11px] font-bold uppercase text-gray-700 mb-1.5">
              Rincian Pembebanan Belanja:
            </h4>
            <table className="w-full text-xs border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-gray-800">
                  <th className="border border-gray-300 p-1.5 text-left">Uraian</th>
                  <th className="border border-gray-300 p-1.5 text-center">Vol</th>
                  <th className="border border-gray-300 p-1.5 text-right">Harga Satuan</th>
                  <th className="border border-gray-300 p-1.5 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {record.items.map((it, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-300 p-1.5 font-medium">{it.itemName}</td>
                    <td className="border border-gray-300 p-1.5 text-center">{it.quantity} {it.unit}</td>
                    <td className="border border-gray-300 p-1.5 text-right font-mono">Rp {it.unitPrice.toLocaleString("id-ID")}</td>
                    <td className="border border-gray-300 p-1.5 text-right font-mono">Rp {it.totalPrice.toLocaleString("id-ID")}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} className="border border-gray-300 p-1.5 text-right font-semibold">Jumlah Kotor:</td>
                  <td className="border border-gray-300 p-1.5 text-right font-mono font-semibold">Rp {record.subtotalAmount.toLocaleString("id-ID")}</td>
                </tr>
                <tr>
                  <td colSpan={3} className="border border-gray-300 p-1.5 text-right font-semibold text-gray-600">
                    Potongan Pajak ({record.taxType}):
                  </td>
                  <td className="border border-gray-300 p-1.5 text-right font-mono text-gray-600">- Rp {record.taxAmount.toLocaleString("id-ID")}</td>
                </tr>
                <tr className="bg-blue-50 font-bold">
                  <td colSpan={3} className="border border-gray-300 p-1.5 text-right">JUMLAH DIBAYARKAN (NETTO):</td>
                  <td className="border border-gray-300 p-1.5 text-right font-mono text-blue-900">Rp {record.netAmount.toLocaleString("id-ID")}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Signature Grid */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center text-xs">
            <div>
              <p className="text-gray-600">Mengetahui / Menyetujui:</p>
              <p className="font-semibold text-gray-800">Pejabat Pembuat Komitmen (PPK)</p>
              <div className="my-6 text-gray-300 text-xs italic">
                [ Tanda Tangan Digital ]
              </div>
              <p className="font-bold underline text-gray-900">{record.verifierName || "Drs. Heru Prasetyo, M.M"}</p>
              <p className="text-gray-500">NIP. 19780815 200501 1 008</p>
            </div>

            <div>
              <p className="text-gray-600">Lunas Dibayar:</p>
              <p className="font-semibold text-gray-800">Bendahara Pengeluaran</p>
              <div className="my-6 text-gray-300 text-xs italic">
                [ Tanda Tangan Digital ]
              </div>
              <p className="font-bold underline text-gray-900">Siti Rahmawati, S.E., Ak.</p>
              <p className="text-gray-500">NIP. 19850412 201001 2 003</p>
            </div>

            <div>
              <p className="text-gray-600">Diterima oleh:</p>
              <p className="font-semibold text-gray-800">Penerima Uang / Vendor</p>
              <div className="my-6 text-gray-300 text-xs italic">
                ( Tanda Tangan & Cap )
              </div>
              <p className="font-bold underline text-gray-900">{record.payeeName}</p>
              <p className="text-gray-500">Tgl: {record.transactionDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
