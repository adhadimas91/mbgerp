"use client";

import React, { useState, useMemo } from "react";
import AddCertificateModal, { IsoCertificate } from "./AddCertificateModal";
import CertificateDetailModal from "./CertificateDetailModal";
import IsoAuditReportPrintModal from "./IsoAuditReportPrintModal";

const INITIAL_CERTIFICATES: IsoCertificate[] = [
  {
    id: "CERT-001",
    certificateNumber: "ID-FSMS-2026-8801",
    standardType: "ISO_22000",
    standardName: "ISO 22000:2018 (Food Safety Management System & HACCP)",
    facilityType: "DAPUR_SENTRAL",
    facilityName: "Dapur Sentral Harmoni - Jakarta Pusat",
    region: "Jakarta Pusat",
    certificationBody: "PT Sucofindo International (KAN)",
    scope: "Penyediaan, Pemasakan Steril, dan Distribusi 4.500 Porsi Harian Makanan Bergizi Siap Saji",
    issuedDate: "2025-09-15",
    expiryDate: "2028-09-14",
    surveillanceDueDate: "2026-09-14",
    status: "ACTIVE",
    leadAuditor: "Dewi Kartika, S.T., Lead Assessor",
    complianceScore: 98,
    attachedDocName: "Sertifikat_ISO22000_Harmoni_Sucofindo.pdf",
  },
  {
    id: "CERT-002",
    certificateNumber: "ID-QMS-2025-4102",
    standardType: "ISO_9001",
    standardName: "ISO 9001:2015 (Quality Management System & SOP)",
    facilityType: "DAPUR_SENTRAL",
    facilityName: "Dapur Sentral Klender - Jakarta Timur",
    region: "Jakarta Timur",
    certificationBody: "PT Mutu Certification International",
    scope: "Manajemen Kualitas Operasional Pengolahan Porsi Gizi & Pengendalian Bahan Pangan",
    issuedDate: "2025-06-10",
    expiryDate: "2028-06-09",
    surveillanceDueDate: "2026-06-09",
    status: "SURVEILLANCE_DUE",
    leadAuditor: "Ir. Hendra Gunawan, MM",
    complianceScore: 95,
    attachedDocName: "Sertifikat_ISO9001_Klender_MutuCert.pdf",
  },
  {
    id: "CERT-003",
    certificateNumber: "ID-ISMS-2026-7734",
    standardType: "ISO_27001",
    standardName: "ISO/IEC 27001:2022 (Information Security Management System)",
    facilityType: "DATA_CENTER",
    facilityName: "Pusat Data ERP MBG Nasional (Cloud Infra BGN)",
    region: "Nasional (Cloud DC)",
    certificationBody: "TÜV Rheinland Indonesia",
    scope: "Pengelolaan Infrastruktur Cloud ERP MBG, Keamanan Log Audit Trail Append-Only & Proteksi Data Penerima Manfaat",
    issuedDate: "2026-01-10",
    expiryDate: "2029-01-09",
    surveillanceDueDate: "2027-01-09",
    status: "ACTIVE",
    leadAuditor: "Fajar Ramadhan, M.T., CISSP",
    complianceScore: 100,
    attachedDocName: "Sertifikat_ISO27001_Cloud_TUV.pdf",
  },
  {
    id: "CERT-004",
    certificateNumber: "ID31110008892010825",
    standardType: "HALAL_BPJPH",
    standardName: "Sertifikasi Halal Resmi BPJPH (HAS 23000)",
    facilityType: "SUPPLIER_UTAMA",
    facilityName: "PT Segar Makmur Abadi (Supplier Daging & Ayam Karkas)",
    region: "Jakarta Pusat",
    certificationBody: "BPJPH - Badan Penyelenggara Jaminan Produk Halal",
    scope: "Rumah Potong Hewan Unggas (RPHU), Daging Ayam Broiler Karkas Beku & Daging Sapi Segar",
    issuedDate: "2024-11-20",
    expiryDate: "2028-11-19",
    surveillanceDueDate: "2026-11-19",
    status: "ACTIVE",
    leadAuditor: "Ust. K.H. Mahfudz Siddiq, M.Ag",
    complianceScore: 99,
    attachedDocName: "Sertifikat_Halal_PT_SegarMakmur_BPJPH.pdf",
  },
  {
    id: "CERT-005",
    certificateNumber: "ID-FSMS-2024-3319",
    standardType: "ISO_22000",
    standardName: "ISO 22000:2018 (Cold Chain Fleet Food Safety)",
    facilityType: "ARMADA_LOGISTIK",
    facilityName: "Armada Distribusi Termal Box MBG Koridor Bogor",
    region: "Kab. Bogor",
    certificationBody: "PT Sucofindo International (KAN)",
    scope: "Transportasi Pengantaran Porsi Panas Terinsulasi (>60°C) & Armada Pendingin Sayur (2-4°C)",
    issuedDate: "2024-03-01",
    expiryDate: "2026-09-30",
    surveillanceDueDate: "2026-03-01",
    status: "EXPIRING_SOON",
    leadAuditor: "Budi Purnomo, S.Si",
    complianceScore: 92,
    attachedDocName: "Sertifikat_ColdChain_Bogor_2024.pdf",
  },
  {
    id: "CERT-006",
    certificateNumber: "ID-CPPOB-2025-091",
    standardType: "GMP_CPPOB",
    standardName: "Cara Produksi Pangan Olahan yang Baik (CPPOB BPOM)",
    facilityType: "DAPUR_SENTRAL",
    facilityName: "Dapur Sentral Coblong - Kota Bandung",
    region: "Kota Bandung",
    certificationBody: "BBPOM & KAN",
    scope: "Sanitasi Fasilitas Pengolahan Bahan Makanan, Sistem Air Bersih RO, & Pest Control Higienis",
    issuedDate: "2025-05-18",
    expiryDate: "2028-05-17",
    surveillanceDueDate: "2026-05-17",
    status: "ACTIVE",
    leadAuditor: "Dra. Nur Indah, Apt., M.Epid",
    complianceScore: 96,
    attachedDocName: "Sertifikat_CPPOB_Coblong_Bandung.pdf",
  },
];

export default function IsoComplianceMatrix() {
  const [certificates, setCertificates] = useState<IsoCertificate[]>(INITIAL_CERTIFICATES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStandard, setSelectedStandard] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedRegion, setSelectedRegion] = useState<string>("ALL");

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCertForDetail, setSelectedCertForDetail] = useState<IsoCertificate | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const filteredCertificates = useMemo(() => {
    return certificates.filter((c) => {
      const matchSearch =
        searchQuery.trim() === "" ||
        c.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.facilityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.standardName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.leadAuditor.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStandard = selectedStandard === "ALL" || c.standardType === selectedStandard;
      const matchStatus = selectedStatus === "ALL" || c.status === selectedStatus;
      const matchRegion = selectedRegion === "ALL" || c.region === selectedRegion;

      return matchSearch && matchStandard && matchStatus && matchRegion;
    });
  }, [certificates, searchQuery, selectedStandard, selectedStatus, selectedRegion]);

  const handleSaveCertificate = (newCert: IsoCertificate) => {
    setCertificates([newCert, ...certificates]);
  };

  // KPIs
  const totalCount = certificates.length;
  const activeCount = certificates.filter((c) => c.status === "ACTIVE").length;
  const expiringCount = certificates.filter((c) => c.status === "EXPIRING_SOON").length;
  const surveillanceCount = certificates.filter((c) => c.status === "SURVEILLANCE_DUE").length;
  const avgScore = Math.round(certificates.reduce((acc, curr) => acc + curr.complianceScore, 0) / (totalCount || 1));

  const getStatusBadge = (status: IsoCertificate["status"]) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800";
      case "EXPIRING_SOON":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800";
      case "SURVEILLANCE_DUE":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800";
      case "EXPIRED":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800";
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* KPI 1 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Fasilitas Tersertifikasi</p>
              <h3 className="mt-1 text-2xl font-black text-gray-900 dark:text-white font-mono">{totalCount}</h3>
              <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                ● Dapur Sentral, Armada & Vendor
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Indeks Kepatuhan Rata-Rata</p>
              <h3 className="mt-1 text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{avgScore}%</h3>
              <p className="mt-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                Sangat Baik (Grade A)
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Jadwal Surveillance Audit</p>
              <h3 className="mt-1 text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">{surveillanceCount}</h3>
              <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                Audit Rutin Tahunan KAN
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Peringatan Kedaluwarsa</p>
              <h3 className="mt-1 text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">{expiringCount}</h3>
              <p className="mt-1 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                Perlu Perpanjangan Segera
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* Toolbar & Filters */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 space-y-4">
        
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Nomor Sertifikat, Nama Fasilitas, Lead Auditor, atau Standar..."
              className="w-full rounded-xl border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 text-xs text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak Matriks Kepatuhan
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Registrasi Sertifikasi Baru
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 pt-2 border-t border-gray-100 dark:border-gray-800">
          
          <div>
            <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">
              Standar Kepatuhan
            </label>
            <select
              value={selectedStandard}
              onChange={(e) => setSelectedStandard(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1.5 text-xs text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="ALL">Semua Standar</option>
              <option value="ISO_22000">ISO 22000:2018 (Food Safety / HACCP)</option>
              <option value="ISO_9001">ISO 9001:2015 (Mutu Operasional)</option>
              <option value="ISO_27001">ISO 27001:2022 (Keamanan Informasi)</option>
              <option value="HALAL_BPJPH">Sertifikasi Halal BPJPH</option>
              <option value="GMP_CPPOB">GMP / CPPOB BPOM</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">
              Status Validitas Sertifikat
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1.5 text-xs text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="ALL">Semua Status</option>
              <option value="ACTIVE">ACTIVE (Berlaku)</option>
              <option value="SURVEILLANCE_DUE">SURVEILLANCE_DUE (Jadwal Audit)</option>
              <option value="EXPIRING_SOON">EXPIRING_SOON (Segera Berakhir)</option>
              <option value="EXPIRED">EXPIRED (Kedaluwarsa)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">
              Wilayah Regional
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1.5 text-xs text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="ALL">Semua Wilayah</option>
              <option value="Jakarta Pusat">Jakarta Pusat</option>
              <option value="Jakarta Timur">Jakarta Timur</option>
              <option value="Kab. Bogor">Kab. Bogor</option>
              <option value="Kota Bandung">Kota Bandung</option>
              <option value="Nasional (Cloud DC)">Nasional (Cloud DC)</option>
            </select>
          </div>

        </div>

      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="border-b border-gray-100 bg-gray-50/70 p-4 dark:border-gray-800 dark:bg-gray-850 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              Matriks Sertifikasi & Standarisasi Aktif
            </h4>
            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
              {filteredCertificates.length} Sertifikat
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
            Akreditasi KAN & BPJPH Kemenag
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-left text-xs">
            <thead className="bg-gray-50 dark:bg-gray-800/60 font-bold text-gray-600 dark:text-gray-300">
              <tr>
                <th className="py-3.5 px-4">No. Sertifikat & Standar</th>
                <th className="py-3.5 px-4">Fasilitas / Supplier</th>
                <th className="py-3.5 px-4">Lembaga Sertifikasi</th>
                <th className="py-3.5 px-4">Masa Berlaku & Surveillance</th>
                <th className="py-3.5 px-4 text-center">Skor Kepatuhan</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredCertificates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    Tidak ditemukan data sertifikasi kepatuhan yang sesuai dengan kriteria filter.
                  </td>
                </tr>
              ) : (
                filteredCertificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-850/60 transition-colors">
                    
                    {/* Certificate Number & Standard */}
                    <td className="py-3.5 px-4 font-mono">
                      <div className="font-bold text-gray-900 dark:text-white">{cert.certificateNumber}</div>
                      <span className="inline-block mt-0.5 rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                        {cert.standardType}
                      </span>
                    </td>

                    {/* Facility */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-900 dark:text-white">{cert.facilityName}</div>
                      <div className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                        <span>{cert.region}</span> • <span className="font-mono">{cert.facilityType}</span>
                      </div>
                    </td>

                    {/* Certification Body */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-gray-800 dark:text-gray-200">{cert.certificationBody}</div>
                      <div className="text-[10px] text-gray-400">Lead: {cert.leadAuditor}</div>
                    </td>

                    {/* Validity & Surveillance */}
                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      <div>Exp: <span className="font-semibold text-gray-800 dark:text-gray-200">{cert.expiryDate}</span></div>
                      <div className="text-[10px] text-purple-600 dark:text-purple-400 mt-0.5">
                        Surveillance: {cert.surveillanceDueDate}
                      </div>
                    </td>

                    {/* Score */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center justify-center rounded-lg bg-emerald-50 px-2.5 py-1 font-mono font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                        {cert.complianceScore}%
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(cert.status)}`}>
                        {cert.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => {
                          setSelectedCertForDetail(cert);
                          setIsDetailModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-2.5 py-1 text-xs font-semibold text-blue-600 shadow-sm hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700 transition-colors"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Detail Audit
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Add Certificate Modal */}
      <AddCertificateModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveCertificate}
      />

      {/* Certificate Detail Modal */}
      <CertificateDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedCertForDetail(null);
        }}
        cert={selectedCertForDetail}
      />

      {/* Print Modal */}
      <IsoAuditReportPrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        certificates={filteredCertificates}
      />

    </div>
  );
}
