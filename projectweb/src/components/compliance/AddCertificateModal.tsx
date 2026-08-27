"use client";

import React, { useState } from "react";

export interface IsoCertificate {
  id: string;
  certificateNumber: string;
  standardType: "ISO_22000" | "ISO_9001" | "ISO_27001" | "HALAL_BPJPH" | "GMP_CPPOB";
  standardName: string;
  facilityType: "DAPUR_SENTRAL" | "SUPPLIER_UTAMA" | "ARMADA_LOGISTIK" | "DATA_CENTER";
  facilityName: string;
  region: string;
  certificationBody: string; // KAN, Sucofindo, BPJPH, Mutu Certification
  scope: string;
  issuedDate: string;
  expiryDate: string;
  surveillanceDueDate: string;
  status: "ACTIVE" | "EXPIRING_SOON" | "EXPIRED" | "SURVEILLANCE_DUE";
  leadAuditor: string;
  complianceScore: number; // 0-100
  notes?: string;
  attachedDocName?: string;
}

interface AddCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cert: IsoCertificate) => void;
}

export default function AddCertificateModal({ isOpen, onClose, onSave }: AddCertificateModalProps) {
  const [formData, setFormData] = useState<Partial<IsoCertificate>>({
    certificateNumber: "",
    standardType: "ISO_22000",
    standardName: "ISO 22000:2018 (Sistem Manajemen Keamanan Pangan / HACCP)",
    facilityType: "DAPUR_SENTRAL",
    facilityName: "",
    region: "Jakarta Pusat",
    certificationBody: "Sucofindo International (Terakreditasi KAN)",
    scope: "Penyediaan, Pengolahan, dan Distribusi Makanan Bergizi Siap Saji",
    issuedDate: new Date().toISOString().slice(0, 10),
    expiryDate: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    surveillanceDueDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    status: "ACTIVE",
    leadAuditor: "",
    complianceScore: 95,
    notes: "",
  });

  const [simulatedFileName, setSimulatedFileName] = useState<string>("");

  if (!isOpen) return null;

  const handleStandardChange = (standardType: IsoCertificate["standardType"]) => {
    let standardName = "";
    let scope = "";
    switch (standardType) {
      case "ISO_22000":
        standardName = "ISO 22000:2018 (Sistem Manajemen Keamanan Pangan / HACCP)";
        scope = "Pengolahan, Porsi Higienis, dan Distribusi Makanan Siap Saji MBG";
        break;
      case "ISO_9001":
        standardName = "ISO 9001:2015 (Sistem Manajemen Mutu Operasional)";
        scope = "Manajemen Pengadaan Bahan Baku, SOP Dapur Sentral, & Layanan MBG";
        break;
      case "ISO_27001":
        standardName = "ISO/IEC 27001:2022 (Sistem Manajemen Keamanan Informasi)";
        scope = "Infrastruktur Cloud ERP MBG, Keamanan Data Porsi & Transaksi Keuangan";
        break;
      case "HALAL_BPJPH":
        standardName = "Sertifikasi Halal Resmi BPJPH (HAS 23000)";
        scope = "Penyembelihan Hewan, Daging Halal, dan Fasilitas Dapur Sentral Bebas Najis";
        break;
      case "GMP_CPPOB":
        standardName = "Cara Produksi Pangan Olahan yang Baik (CPPOB / GMP)";
        scope = "Sanitasi Fasilitas Pengolahan & Pengendalian Hama Dapur Sentral";
        break;
    }
    setFormData((prev) => ({ ...prev, standardType, standardName, scope }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.certificateNumber || !formData.facilityName || !formData.leadAuditor) {
      alert("Mohon lengkapi Nomor Sertifikat, Nama Fasilitas/Supplier, dan Nama Lead Auditor.");
      return;
    }

    const newCert: IsoCertificate = {
      id: `CERT-${Date.now().toString().slice(-4)}`,
      certificateNumber: formData.certificateNumber || "CERT-UNKNOWN",
      standardType: formData.standardType || "ISO_22000",
      standardName: formData.standardName || "ISO 22000:2018",
      facilityType: formData.facilityType || "DAPUR_SENTRAL",
      facilityName: formData.facilityName || "",
      region: formData.region || "DKI Jakarta",
      certificationBody: formData.certificationBody || "Sucofindo International",
      scope: formData.scope || "",
      issuedDate: formData.issuedDate || new Date().toISOString().slice(0, 10),
      expiryDate: formData.expiryDate || new Date().toISOString().slice(0, 10),
      surveillanceDueDate: formData.surveillanceDueDate || new Date().toISOString().slice(0, 10),
      status: formData.status || "ACTIVE",
      leadAuditor: formData.leadAuditor || "",
      complianceScore: Number(formData.complianceScore) || 95,
      notes: formData.notes,
      attachedDocName: simulatedFileName || "Sertifikat_Akreditasi_Resmi.pdf",
    };

    onSave(newCert);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-850">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Registrasi Sertifikasi Kepatuhan Standar MBG
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Pencatatan sertifikat ISO 22000, 9001, 27001, atau Halal BPJPH
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Standard Type */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Standar Kepatuhan *
              </label>
              <select
                value={formData.standardType}
                onChange={(e) => handleStandardChange(e.target.value as any)}
                className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="ISO_22000">ISO 22000 / HACCP (Food Safety)</option>
                <option value="ISO_9001">ISO 9001:2015 (Mutu & SOP)</option>
                <option value="ISO_27001">ISO 27001:2022 (Keamanan Data)</option>
                <option value="HALAL_BPJPH">Sertifikasi Halal (BPJPH / MUI)</option>
                <option value="GMP_CPPOB">GMP / CPPOB (Sanitasi Higienis)</option>
              </select>
            </div>

            {/* Certificate Number */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Nomor Sertifikat Resmi *
              </label>
              <input
                type="text"
                required
                value={formData.certificateNumber}
                onChange={(e) => setFormData({ ...formData, certificateNumber: e.target.value })}
                placeholder="Contoh: ID-FSMS-2026-9901 atau ID3111000..."
                className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white font-mono"
              />
            </div>

            {/* Facility Type */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Tipe Fasilitas Terdaftar *
              </label>
              <select
                value={formData.facilityType}
                onChange={(e) => setFormData({ ...formData, facilityType: e.target.value as any })}
                className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="DAPUR_SENTRAL">Dapur Sentral MBG (Central Kitchen)</option>
                <option value="SUPPLIER_UTAMA">Supplier Utama Bahan Pangan</option>
                <option value="ARMADA_LOGISTIK">Armada Logistik Cold Chain</option>
                <option value="DATA_CENTER">Data Center & Server ERP</option>
              </select>
            </div>

            {/* Facility Name */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Nama Entitas / Fasilitas *
              </label>
              <input
                type="text"
                required
                value={formData.facilityName}
                onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
                placeholder="Contoh: Dapur Sentral Harmoni - Jkt Pusat"
                className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Certification Body */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Lembaga Sertifikasi (LSSM / KAN) *
              </label>
              <select
                value={formData.certificationBody}
                onChange={(e) => setFormData({ ...formData, certificationBody: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="PT Sucofindo International (KAN)">PT Sucofindo International (KAN)</option>
                <option value="PT Mutu Certification International">PT Mutu Certification International</option>
                <option value="BPJPH - Badan Penyelenggara Jaminan Produk Halal">BPJPH Kemenag RI</option>
                <option value="TÜV Rheinland Indonesia">TÜV Rheinland Indonesia</option>
                <option value="LPPOM MUI">LPPOM MUI</option>
              </select>
            </div>

            {/* Region */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Wilayah Regional *
              </label>
              <select
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="Jakarta Pusat">Jakarta Pusat</option>
                <option value="Jakarta Timur">Jakarta Timur</option>
                <option value="Kab. Bogor">Kab. Bogor</option>
                <option value="Kota Bandung">Kota Bandung</option>
                <option value="Kota Surabaya">Kota Surabaya</option>
                <option value="Nasional (Cloud DC)">Nasional (Cloud DC)</option>
              </select>
            </div>

            {/* Issued Date */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Tanggal Diterbitkan
              </label>
              <input
                type="date"
                value={formData.issuedDate}
                onChange={(e) => setFormData({ ...formData, issuedDate: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Tanggal Kedaluwarsa
              </label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Surveillance Due Date */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Jadwal Audit Surveillance Berkala
              </label>
              <input
                type="date"
                value={formData.surveillanceDueDate}
                onChange={(e) => setFormData({ ...formData, surveillanceDueDate: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Lead Auditor */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Lead Auditor / Assessor *
              </label>
              <input
                type="text"
                required
                value={formData.leadAuditor}
                onChange={(e) => setFormData({ ...formData, leadAuditor: e.target.value })}
                placeholder="Contoh: Dewi Kartika, S.T., Lead Assessor"
                className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

          </div>

          {/* Scope of Certification */}
          <div>
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
              Ruang Lingkup Sertifikasi (Scope)
            </label>
            <input
              type="text"
              value={formData.scope}
              onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
              className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* File Upload Simulation */}
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-center dark:border-gray-700 dark:bg-gray-850">
            <div className="flex flex-col items-center justify-center">
              <svg className="h-8 w-8 text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <label className="cursor-pointer text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400">
                <span>Upload Dokumen Sertifikat (PDF / JPG)</span>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSimulatedFileName(e.target.files[0].name);
                    }
                  }}
                />
              </label>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {simulatedFileName ? (
                  <span className="font-semibold text-emerald-600">Dokumen terlampir: {simulatedFileName}</span>
                ) : (
                  "Maksimal 10MB • Dilengkapi Digital Watermark KAN"
                )}
              </p>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition-colors"
            >
              Simpan Sertifikat
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
