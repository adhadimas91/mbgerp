"use client";

import React, { useState, useEffect } from "react";

export interface BudgetAllocation {
  id: string;
  dpaCode: string; // Dokumen Pelaksanaan Anggaran
  fiscalYear: number;
  region: string;
  province: string;
  sourceOfFund: "APBN Pusat (Badan Gizi)" | "APBD Provinsi" | "APBD Kabupaten/Kota" | "DAK Non-Fisik MBG";
  totalCeiling: number; // Total Pagu Anggaran (Rp)
  rawMaterialAllocation: number; // Bahan Baku Pangan (70-75%)
  operationalAllocation: number; // Operasional Dapur & Energi (15%)
  logisticsAllocation: number; // Armada & Distribusi (8%)
  qaInspectionAllocation: number; // Mutu & Uji Lab (2%)
  disbursedAmount: number; // Realisasi Terserap (Rp)
  committedAmount: number; // Komitmen Belanja (PO Berjalan)
  targetDailyPortions: number; // Target Porsi per Hari
  targetBeneficiaries: number; // Jumlah Siswa/Penerima
  picName: string;
  picContact: string;
  approvalStatus: "APPROVED" | "PENDING_REVIEW" | "REVISION_REQUIRED" | "DRAFT";
  notes?: string;
  lastUpdated: string;
}

interface CreateBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: BudgetAllocation) => void;
  initialData?: BudgetAllocation | null;
}

export default function CreateBudgetModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: CreateBudgetModalProps) {
  const [formData, setFormData] = useState<Partial<BudgetAllocation>>({
    dpaCode: "DPA-MBG-2026-001",
    fiscalYear: 2026,
    region: "Jakarta Pusat",
    province: "DKI Jakarta",
    sourceOfFund: "APBN Pusat (Badan Gizi)",
    totalCeiling: 12500000000, // Rp 12.5 Miliar
    rawMaterialAllocation: 9375000000, // 75%
    operationalAllocation: 1875000000, // 15%
    logisticsAllocation: 1000000000, // 8%
    qaInspectionAllocation: 250000000, // 2%
    disbursedAmount: 0,
    committedAmount: 0,
    targetDailyPortions: 4200,
    targetBeneficiaries: 4200,
    picName: "Drs. Heru Prasetyo, M.M (PPK Wilayah)",
    picContact: "0812-8899-7766",
    approvalStatus: "APPROVED",
    notes: "Alokasi pagu DPA murni program MBG semester I TA 2026.",
  });

  const [rawPercent, setRawPercent] = useState<number>(75);
  const [opsPercent, setOpsPercent] = useState<number>(15);
  const [logisticsPercent, setLogisticsPercent] = useState<number>(8);
  const [qaPercent, setQaPercent] = useState<number>(2);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.totalCeiling > 0) {
        setRawPercent(Math.round((initialData.rawMaterialAllocation / initialData.totalCeiling) * 100));
        setOpsPercent(Math.round((initialData.operationalAllocation / initialData.totalCeiling) * 100));
        setLogisticsPercent(Math.round((initialData.logisticsAllocation / initialData.totalCeiling) * 100));
        setQaPercent(Math.round((initialData.qaInspectionAllocation / initialData.totalCeiling) * 100));
      }
    } else {
      const randomCode = `DPA-MBG-2026-${Math.floor(100 + Math.random() * 900)}`;
      setFormData((prev) => ({
        ...prev,
        dpaCode: randomCode,
        totalCeiling: 12500000000,
        rawMaterialAllocation: 9375000000,
        operationalAllocation: 1875000000,
        logisticsAllocation: 1000000000,
        qaInspectionAllocation: 250000000,
        disbursedAmount: 0,
        committedAmount: 0,
      }));
    }
  }, [initialData, isOpen]);

  const handleCeilingChange = (total: number) => {
    setFormData((prev) => ({
      ...prev,
      totalCeiling: total,
      rawMaterialAllocation: Math.round((total * rawPercent) / 100),
      operationalAllocation: Math.round((total * opsPercent) / 100),
      logisticsAllocation: Math.round((total * logisticsPercent) / 100),
      qaInspectionAllocation: Math.round((total * qaPercent) / 100),
    }));
  };

  const handlePercentageRebalance = (field: "raw" | "ops" | "log" | "qa", val: number) => {
    const total = formData.totalCeiling || 0;
    if (field === "raw") {
      setRawPercent(val);
      setFormData((p) => ({ ...p, rawMaterialAllocation: Math.round((total * val) / 100) }));
    } else if (field === "ops") {
      setOpsPercent(val);
      setFormData((p) => ({ ...p, operationalAllocation: Math.round((total * val) / 100) }));
    } else if (field === "log") {
      setLogisticsPercent(val);
      setFormData((p) => ({ ...p, logisticsAllocation: Math.round((total * val) / 100) }));
    } else if (field === "qa") {
      setQaPercent(val);
      setFormData((p) => ({ ...p, qaInspectionAllocation: Math.round((total * val) / 100) }));
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData: BudgetAllocation = {
      id: initialData?.id || `BDG-${Date.now()}`,
      dpaCode: formData.dpaCode || `DPA-MBG-2026-${Math.floor(100 + Math.random() * 900)}`,
      fiscalYear: formData.fiscalYear || 2026,
      region: formData.region || "Wilayah Baru",
      province: formData.province || "DKI Jakarta",
      sourceOfFund: formData.sourceOfFund || "APBN Pusat (Badan Gizi)",
      totalCeiling: Number(formData.totalCeiling) || 0,
      rawMaterialAllocation: Number(formData.rawMaterialAllocation) || 0,
      operationalAllocation: Number(formData.operationalAllocation) || 0,
      logisticsAllocation: Number(formData.logisticsAllocation) || 0,
      qaInspectionAllocation: Number(formData.qaInspectionAllocation) || 0,
      disbursedAmount: Number(formData.disbursedAmount) || 0,
      committedAmount: Number(formData.committedAmount) || 0,
      targetDailyPortions: Number(formData.targetDailyPortions) || 0,
      targetBeneficiaries: Number(formData.targetBeneficiaries) || 0,
      picName: formData.picName || "-",
      picContact: formData.picContact || "-",
      approvalStatus: formData.approvalStatus || "APPROVED",
      notes: formData.notes || "",
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    onSave(finalData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl transition-all dark:border-gray-800 dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {initialData ? "Ubah Alokasi Anggaran DPA" : "Form Alokasi Pagu Anggaran MBG"}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Penyusunan plafon pagu anggaran per wilayah sesuai pedoman Badan Gizi Nasional (BGN).
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

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Nomor Register DPA / SK Pagu *
              </label>
              <input
                type="text"
                required
                value={formData.dpaCode}
                onChange={(e) => setFormData({ ...formData, dpaCode: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Tahun Anggaran (TA) *
              </label>
              <select
                value={formData.fiscalYear}
                onChange={(e) => setFormData({ ...formData, fiscalYear: Number(e.target.value) })}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                <option value={2026}>TA 2026 (Fase Ekspansi)</option>
                <option value={2027}>TA 2027</option>
                <option value={2025}>TA 2025 (Fase Pilot)</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Sumber Pendanaan *
              </label>
              <select
                value={formData.sourceOfFund}
                onChange={(e) => setFormData({ ...formData, sourceOfFund: e.target.value as any })}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                <option value="APBN Pusat (Badan Gizi)">APBN Pusat (Badan Gizi)</option>
                <option value="APBD Provinsi">APBD Provinsi (Dana Pendamping)</option>
                <option value="APBD Kabupaten/Kota">APBD Kabupaten/Kota</option>
                <option value="DAK Non-Fisik MBG">DAK Non-Fisik MBG</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Provinsi *
              </label>
              <select
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                <option value="DKI Jakarta">DKI Jakarta</option>
                <option value="Jawa Barat">Jawa Barat</option>
                <option value="Jawa Tengah">Jawa Tengah</option>
                <option value="Jawa Timur">Jawa Timur</option>
                <option value="Banten">Banten</option>
                <option value="DI Yogyakarta">DI Yogyakarta</option>
                <option value="Sumatera Utara">Sumatera Utara</option>
                <option value="Sulawesi Selatan">Sulawesi Selatan</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Kabupaten / Kota / Wilayah Satker *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Jakarta Pusat / Kab. Bogor"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
              <div>
                <label className="block text-sm font-bold text-emerald-900 dark:text-emerald-300">
                  Total Plafon Pagu Anggaran (Rp) *
                </label>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Total dana yang disahkan untuk alokasi penyediaan porsi MBG di wilayah ini.
                </span>
              </div>
              <div className="text-right">
                <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                  Rp {(formData.totalCeiling || 0).toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <input
              type="number"
              required
              min={1000000}
              step={1000000}
              value={formData.totalCeiling || ""}
              onChange={(e) => handleCeilingChange(Number(e.target.value))}
              className="w-full rounded-xl border border-emerald-300 bg-white px-4 py-2.5 text-base font-bold text-gray-900 focus:border-emerald-600 focus:outline-none dark:border-emerald-700 dark:bg-gray-900 dark:text-white"
            />

            {/* Sub-alokasi Pos Belanja */}
            <div className="mt-4 pt-3 border-t border-emerald-200/60 dark:border-emerald-900/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-900 dark:text-emerald-400">
                  Rincian Proporsi Pos Belanja (Standar Standarisasi BGN)
                </span>
                <span className={`text-xs font-bold ${rawPercent + opsPercent + logisticsPercent + qaPercent === 100 ? "text-emerald-600" : "text-amber-500"}`}>
                  Total: {rawPercent + opsPercent + logisticsPercent + qaPercent}%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div className="rounded-lg bg-white p-2.5 border border-gray-200 dark:bg-gray-900 dark:border-gray-800">
                  <div className="flex items-center justify-between text-xs font-medium text-gray-700 dark:text-gray-300">
                    <span>1. Bahan Baku</span>
                    <input
                      type="number"
                      className="w-12 text-right font-bold text-emerald-600 dark:text-emerald-400 bg-transparent border-b border-gray-300 dark:border-gray-700"
                      value={rawPercent}
                      onChange={(e) => handlePercentageRebalance("raw", Number(e.target.value))}
                    />
                    <span className="text-xs text-gray-400">%</span>
                  </div>
                  <div className="mt-1 text-xs font-bold text-gray-900 dark:text-white">
                    Rp {((formData.rawMaterialAllocation || 0)).toLocaleString("id-ID")}
                  </div>
                </div>

                <div className="rounded-lg bg-white p-2.5 border border-gray-200 dark:bg-gray-900 dark:border-gray-800">
                  <div className="flex items-center justify-between text-xs font-medium text-gray-700 dark:text-gray-300">
                    <span>2. Operasional</span>
                    <input
                      type="number"
                      className="w-12 text-right font-bold text-blue-600 dark:text-blue-400 bg-transparent border-b border-gray-300 dark:border-gray-700"
                      value={opsPercent}
                      onChange={(e) => handlePercentageRebalance("ops", Number(e.target.value))}
                    />
                    <span className="text-xs text-gray-400">%</span>
                  </div>
                  <div className="mt-1 text-xs font-bold text-gray-900 dark:text-white">
                    Rp {((formData.operationalAllocation || 0)).toLocaleString("id-ID")}
                  </div>
                </div>

                <div className="rounded-lg bg-white p-2.5 border border-gray-200 dark:bg-gray-900 dark:border-gray-800">
                  <div className="flex items-center justify-between text-xs font-medium text-gray-700 dark:text-gray-300">
                    <span>3. Logistik</span>
                    <input
                      type="number"
                      className="w-12 text-right font-bold text-amber-600 dark:text-amber-400 bg-transparent border-b border-gray-300 dark:border-gray-700"
                      value={logisticsPercent}
                      onChange={(e) => handlePercentageRebalance("log", Number(e.target.value))}
                    />
                    <span className="text-xs text-gray-400">%</span>
                  </div>
                  <div className="mt-1 text-xs font-bold text-gray-900 dark:text-white">
                    Rp {((formData.logisticsAllocation || 0)).toLocaleString("id-ID")}
                  </div>
                </div>

                <div className="rounded-lg bg-white p-2.5 border border-gray-200 dark:bg-gray-900 dark:border-gray-800">
                  <div className="flex items-center justify-between text-xs font-medium text-gray-700 dark:text-gray-300">
                    <span>4. Mutu & Lab</span>
                    <input
                      type="number"
                      className="w-12 text-right font-bold text-purple-600 dark:text-purple-400 bg-transparent border-b border-gray-300 dark:border-gray-700"
                      value={qaPercent}
                      onChange={(e) => handlePercentageRebalance("qa", Number(e.target.value))}
                    />
                    <span className="text-xs text-gray-400">%</span>
                  </div>
                  <div className="mt-1 text-xs font-bold text-gray-900 dark:text-white">
                    Rp {((formData.qaInspectionAllocation || 0)).toLocaleString("id-ID")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Target Porsi Harian (Porsi/Hari) *
              </label>
              <input
                type="number"
                required
                min={1}
                value={formData.targetDailyPortions || ""}
                onChange={(e) => setFormData({ ...formData, targetDailyPortions: Number(e.target.value) })}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Target Jumlah Penerima Manfaat (Siswa/Panti) *
              </label>
              <input
                type="number"
                required
                min={1}
                value={formData.targetBeneficiaries || ""}
                onChange={(e) => setFormData({ ...formData, targetBeneficiaries: Number(e.target.value) })}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Nama Pejabat Pembuat Komitmen (PPK) / PIC Anggaran *
              </label>
              <input
                type="text"
                required
                value={formData.picName}
                onChange={(e) => setFormData({ ...formData, picName: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Kontak PIC / No Telepon *
              </label>
              <input
                type="text"
                required
                value={formData.picContact}
                onChange={(e) => setFormData({ ...formData, picContact: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Catatan / Dasar Hukum / No. SK Penetapan
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              placeholder="Tambahkan nomor keputusan penetapan pagu atau catatan alokasi..."
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
              className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              {initialData ? "Simpan Perubahan" : "Tetapkan Alokasi Anggaran"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
