"use client";

import React, { useState, useEffect } from "react";

export interface ExpenditureItem {
  id: string;
  itemName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}

export interface ExpenditureRecord {
  id: string;
  spjNumber: string; // Nomor Surat Pertanggungjawaban / Bukti Kas
  transactionDate: string;
  category:
    | "Belanja Bahan Baku (PO Supplier)"
    | "Biaya Operasional Dapur (Gas/Listrik/Air)"
    | "Biaya BBM & Tol Armada Distribusi"
    | "Biaya Servis & Pemeliharaan Aset"
    | "Biaya Kemasan & Tray SUS 304"
    | "Biaya Uji Mutu Lab & Mikrobiologi"
    | "Biaya Honor & Insentif Satker"
    | "Biaya Tak Terduga / Darurat";
  kitchenLocation: string;
  payeeName: string; // Penerima Dana / Vendor
  payeeAccount?: string;
  referenceDocNumber: string; // No Invoice / BAST / Nota Dinas
  items: ExpenditureItem[];
  subtotalAmount: number;
  taxType: "PPN_11" | "PPH_22" | "PPH_23" | "NONE";
  taxAmount: number;
  netAmount: number; // Nilai Bersih yang Dibayarkan
  paymentMethod: "SP2D Kas Negara" | "Virtual Account BUMN" | "Transfer Bank BRI/Mandiri" | "Uang Persediaan Kas Kecil";
  status: "VERIFIED_PPK" | "PENDING_VERIFICATION" | "REJECTED" | "DRAFT";
  verifierName?: string;
  verifiedAt?: string;
  notes?: string;
  receiptAttachmentName?: string;
}

interface CreateExpenditureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ExpenditureRecord) => void;
  initialData?: ExpenditureRecord | null;
}

export default function CreateExpenditureModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: CreateExpenditureModalProps) {
  const [formData, setFormData] = useState<Partial<ExpenditureRecord>>({
    spjNumber: "SPJ-MBG-2026-0801",
    transactionDate: new Date().toISOString().split("T")[0],
    category: "Belanja Bahan Baku (PO Supplier)",
    kitchenLocation: "Dapur Sentral Harmoni - Jakarta Pusat",
    payeeName: "PT Segar Pangan Nusantara",
    payeeAccount: "Bank Mandiri 122-00-9988776-5",
    referenceDocNumber: "INV-SPN-2026-0819",
    taxType: "PPH_22",
    paymentMethod: "SP2D Kas Negara",
    status: "PENDING_VERIFICATION",
    notes: "Pengadaan daging ayam broiler segar & telur untuk menu hari Kamis.",
    receiptAttachmentName: "faktur_pembelian_ayam_telur.pdf",
  });

  const [items, setItems] = useState<ExpenditureItem[]>([
    {
      id: "1",
      itemName: "Daging Ayam Broiler Fillet Karkas (Grade A)",
      quantity: 350,
      unit: "Kg",
      unitPrice: 38000,
      totalPrice: 13300000,
    },
    {
      id: "2",
      itemName: "Telur Ayam Negeri Segar Bersertifikasi NKV",
      quantity: 120,
      unit: "Kg",
      unitPrice: 27500,
      totalPrice: 3300000,
    },
  ]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setItems(initialData.items || []);
    } else {
      const randomCode = `SPJ-MBG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setFormData({
        spjNumber: randomCode,
        transactionDate: new Date().toISOString().split("T")[0],
        category: "Belanja Bahan Baku (PO Supplier)",
        kitchenLocation: "Dapur Sentral Harmoni - Jakarta Pusat",
        payeeName: "PT Segar Pangan Nusantara",
        payeeAccount: "Bank Mandiri 122-00-9988776-5",
        referenceDocNumber: `INV-SPN-2026-${Math.floor(100 + Math.random() * 900)}`,
        taxType: "PPH_22",
        paymentMethod: "SP2D Kas Negara",
        status: "PENDING_VERIFICATION",
        notes: "Pengadaan bahan pangan segar sesuai PO dapur sentral.",
        receiptAttachmentName: "faktur_kuitansi_belanja.pdf",
      });
      setItems([
        {
          id: "1",
          itemName: "Daging Ayam Broiler Fillet Karkas (Grade A)",
          quantity: 350,
          unit: "Kg",
          unitPrice: 38000,
          totalPrice: 13300000,
        },
        {
          id: "2",
          itemName: "Telur Ayam Negeri Segar Bersertifikasi NKV",
          quantity: 120,
          unit: "Kg",
          unitPrice: 27500,
          totalPrice: 3300000,
        },
      ]);
    }
  }, [initialData, isOpen]);

  // Calculations
  const subtotal = items.reduce((acc, it) => acc + it.totalPrice, 0);
  let taxRate = 0;
  if (formData.taxType === "PPN_11") taxRate = 0.11;
  else if (formData.taxType === "PPH_22") taxRate = 0.015; // 1.5% PPh 22 belanja pemerintah
  else if (formData.taxType === "PPH_23") taxRate = 0.02; // 2% Jasa / Sewa

  const taxAmount = Math.round(subtotal * taxRate);
  // If PPN, it adds to subtotal; if PPh, it is a withholding tax (potongan)
  const netAmount = formData.taxType === "PPN_11" ? subtotal + taxAmount : subtotal - taxAmount;

  // Item handlers
  const handleItemChange = (index: number, field: keyof ExpenditureItem, val: any) => {
    setItems((prev) => {
      const updated = [...prev];
      const item = { ...updated[index], [field]: val };
      if (field === "quantity" || field === "unitPrice") {
        item.totalPrice = (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);
      }
      updated[index] = item;
      return updated;
    });
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        itemName: "",
        quantity: 1,
        unit: "Pcs",
        unitPrice: 0,
        totalPrice: 0,
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalRecord: ExpenditureRecord = {
      id: initialData?.id || `EXP-${Date.now()}`,
      spjNumber: formData.spjNumber || `SPJ-MBG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      transactionDate: formData.transactionDate || new Date().toISOString().split("T")[0],
      category: formData.category || "Belanja Bahan Baku (PO Supplier)",
      kitchenLocation: formData.kitchenLocation || "Dapur Sentral Harmoni - Jakarta Pusat",
      payeeName: formData.payeeName || "Penerima",
      payeeAccount: formData.payeeAccount || "-",
      referenceDocNumber: formData.referenceDocNumber || "-",
      items: items,
      subtotalAmount: subtotal,
      taxType: formData.taxType || "NONE",
      taxAmount: taxAmount,
      netAmount: netAmount,
      paymentMethod: formData.paymentMethod || "SP2D Kas Negara",
      status: formData.status || "PENDING_VERIFICATION",
      verifierName: formData.status === "VERIFIED_PPK" ? "Drs. Heru Prasetyo, M.M (PPK)" : undefined,
      verifiedAt: formData.status === "VERIFIED_PPK" ? new Date().toISOString().split("T")[0] : undefined,
      notes: formData.notes || "",
      receiptAttachmentName: formData.receiptAttachmentName || "kuitansi_spj.pdf",
    };

    onSave(finalRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl transition-all dark:border-gray-800 dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {initialData ? "Ubah Data Bukti Pengeluaran Kas (SPJ)" : "Form Pencatatan Pengeluaran & SPJ Belanja"}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Pencatatan bukti transaksi kas, perhitungan pajak PPh/PPN, dan kelengkapan kuitansi SPJ MBG.
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                No. Bukti Kas / SPJ *
              </label>
              <input
                type="text"
                required
                value={formData.spjNumber}
                onChange={(e) => setFormData({ ...formData, spjNumber: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Tanggal Transaksi *
              </label>
              <input
                type="date"
                required
                value={formData.transactionDate}
                onChange={(e) => setFormData({ ...formData, transactionDate: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Kategori Pos Biaya *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                <option value="Belanja Bahan Baku (PO Supplier)">Belanja Bahan Baku (PO Supplier)</option>
                <option value="Biaya Operasional Dapur (Gas/Listrik/Air)">Biaya Operasional Dapur (Gas/Listrik/Air)</option>
                <option value="Biaya BBM & Tol Armada Distribusi">Biaya BBM & Tol Armada Distribusi</option>
                <option value="Biaya Servis & Pemeliharaan Aset">Biaya Servis & Pemeliharaan Aset</option>
                <option value="Biaya Kemasan & Tray SUS 304">Biaya Kemasan & Tray SUS 304</option>
                <option value="Biaya Uji Mutu Lab & Mikrobiologi">Biaya Uji Mutu Lab & Mikrobiologi</option>
                <option value="Biaya Honor & Insentif Satker">Biaya Honor & Insentif Satker</option>
                <option value="Biaya Tak Terduga / Darurat">Biaya Tak Terduga / Darurat</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Satker / Lokasi Dapur Sentral *
              </label>
              <select
                value={formData.kitchenLocation}
                onChange={(e) => setFormData({ ...formData, kitchenLocation: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                <option value="Dapur Sentral Harmoni - Jakarta Pusat">Dapur Sentral Harmoni - Jakarta Pusat</option>
                <option value="SPPG Klender - Jakarta Timur">SPPG Klender - Jakarta Timur</option>
                <option value="Dapur Sentral Cibinong - Bogor">Dapur Sentral Cibinong - Bogor</option>
                <option value="SPPG Pajajaran - Kota Bandung">SPPG Pajajaran - Kota Bandung</option>
                <option value="Gudang Buffer Pangan Cakung">Gudang Buffer Pangan Cakung</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Penerima Dana / Nama Vendor *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: PT Segar Pangan Nusantara / SPBU Pertamina"
                value={formData.payeeName}
                onChange={(e) => setFormData({ ...formData, payeeName: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                No. Rekening / Bank Penerima
              </label>
              <input
                type="text"
                placeholder="Contoh: Bank Mandiri 122-00-9988776-5"
                value={formData.payeeAccount}
                onChange={(e) => setFormData({ ...formData, payeeAccount: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                No. Dokumen Referensi (Invoice/Nota/BAST) *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: INV-SPN-2026-0819 / BAST-8812"
                value={formData.referenceDocNumber}
                onChange={(e) => setFormData({ ...formData, referenceDocNumber: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
          </div>

          {/* Dynamic Item Table */}
          <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-800/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200">
                Rincian Item / Uraian Belanja
              </span>
              <button
                type="button"
                onClick={handleAddItem}
                className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Tambah Baris
              </button>
            </div>

            <div className="space-y-2.5">
              {items.map((item, idx) => (
                <div key={item.id || idx} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-5">
                    <input
                      type="text"
                      required
                      placeholder="Nama Barang / Uraian Pekerjaan"
                      value={item.itemName}
                      onChange={(e) => handleItemChange(idx, "itemName", e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      required
                      min={0.1}
                      step={0.1}
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(idx, "quantity", Number(e.target.value))}
                      className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs text-center text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                    />
                  </div>
                  <div className="col-span-1">
                    <input
                      type="text"
                      placeholder="Satuan"
                      value={item.unit}
                      onChange={(e) => handleItemChange(idx, "unit", e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-1.5 py-1.5 text-xs text-center text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      required
                      min={0}
                      placeholder="Harga Satuan"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(idx, "unitPrice", Number(e.target.value))}
                      className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs text-right text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                    />
                  </div>
                  <div className="col-span-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 dark:text-white font-mono">
                      Rp {item.totalPrice.toLocaleString("id-ID")}
                    </span>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Hapus baris"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations and Tax Panel */}
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Ketentuan Pajak Belanja
                  </label>
                  <select
                    value={formData.taxType}
                    onChange={(e) => setFormData({ ...formData, taxType: e.target.value as any })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                  >
                    <option value="PPH_22">PPh Pasal 22 (1.5% - Pengadaan Bahan Pangan MBG)</option>
                    <option value="PPH_23">PPh Pasal 23 (2.0% - Jasa Logistik / Servis)</option>
                    <option value="PPN_11">PPN (11% - Pertambahan Nilai)</option>
                    <option value="NONE">Bebas Pajak / Non-PKP</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Metode Pembayaran Kas
                  </label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                  >
                    <option value="SP2D Kas Negara">SP2D Kas Negara (Langsung ke Rekening Vendor)</option>
                    <option value="Virtual Account BUMN">Virtual Account Bank Mandiri/BRI</option>
                    <option value="Transfer Bank BRI/Mandiri">Transfer Giro Bank BUMN</option>
                    <option value="Uang Persediaan Kas Kecil">Uang Persediaan (Kasbon Dapur / Tunai)</option>
                  </select>
                </div>
              </div>

              <div className="rounded-lg bg-white p-3 border border-gray-200 dark:bg-gray-900 dark:border-gray-700 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal Kotor:</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200 font-mono">
                    Rp {subtotal.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    {formData.taxType === "PPN_11" ? "PPN (+11%):" : `Potongan Pajak (${(taxRate * 100).toFixed(1)}%):`}
                  </span>
                  <span className={`font-semibold font-mono ${formData.taxType === "PPN_11" ? "text-blue-600" : "text-amber-600"}`}>
                    {formData.taxType === "PPN_11" ? "+" : "-"} Rp {taxAmount.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <span className="font-bold text-gray-900 dark:text-white">Total Netto Dibayarkan:</span>
                  <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                    Rp {netAmount.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Nama File Lampiran / Bukti Kuitansi
              </label>
              <input
                type="text"
                placeholder="faktur_kuitansi_belanja.pdf"
                value={formData.receiptAttachmentName}
                onChange={(e) => setFormData({ ...formData, receiptAttachmentName: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Status Verifikasi SPJ *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                <option value="PENDING_VERIFICATION">Menunggu Verifikasi PPK (Pending)</option>
                <option value="VERIFIED_PPK">Telah Disetujui & Diverifikasi PPK (Verified)</option>
                <option value="DRAFT">Draft Pengajuan</option>
                <option value="REJECTED">Ditolak / Perlu Revisi SPJ</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Catatan Belanja & Keterangan Pengesahan
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              placeholder="Tambahkan catatan kelengkapan dokumen atau spesifikasi belanja..."
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
              className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {initialData ? "Simpan Perubahan SPJ" : "Simpan Bukti Pengeluaran"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
