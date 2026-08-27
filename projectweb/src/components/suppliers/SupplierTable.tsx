"use client";
import React, { useState, useEffect } from "react";
import Badge from "../ui/badge/Badge";
import SupplierRegistrationModal from "./SupplierRegistrationModal";
import supplierService from "@/services/supplier.service";

export interface SupplierData {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  rating: number;
  dailyCapacity: string;
  certifications: string[];
  address: string;
  lastAuditDate?: string;
}

const initialSuppliers: SupplierData[] = [
  {
    id: "SUP-101",
    name: "PT. Sumber Protein Nusantara",
    category: "Protein Hewani",
    contactPerson: "Budi Santoso, S.Pt.",
    phone: "0812-3456-7890",
    email: "budi@protein-nusantara.co.id",
    status: "APPROVED",
    rating: 4.9,
    dailyCapacity: "3.500 kg/hari",
    certifications: ["ISO 22000", "ISO 9001", "Halal MUI", "BPOM"],
    address: "Kawasan Industri Pulo Gadung, Jakarta Timur",
    lastAuditDate: "15 Jan 2026",
  },
  {
    id: "SUP-102",
    name: "CV. Tani Makmur Beras Mandiri",
    category: "Karbohidrat & Beras",
    contactPerson: "H. Joko Widodo, S.P.",
    phone: "0813-8877-6655",
    email: "joko@tanimakmurberas.com",
    status: "APPROVED",
    rating: 4.8,
    dailyCapacity: "8.000 kg/hari",
    certifications: ["ISO 9001", "Halal MUI", "BPOM"],
    address: "Sentra Lumbung Padi Karawang, Jawa Barat",
    lastAuditDate: "02 Feb 2026",
  },
  {
    id: "SUP-103",
    name: "Koperasi Sayur Segar Lembang",
    category: "Sayuran Segar & Buah",
    contactPerson: "Siti Rahmawati",
    phone: "0818-9922-1100",
    email: "siti@koperasisayurlembang.id",
    status: "APPROVED",
    rating: 4.7,
    dailyCapacity: "2.800 kg/hari",
    certifications: ["ISO 22000", "Prima 3 Organik"],
    address: "Jl. Raya Lembang No. 45, Bandung Barat",
    lastAuditDate: "20 Jan 2026",
  },
  {
    id: "SUP-104",
    name: "PT. Agro Unggas Perkasa",
    category: "Protein Hewani",
    contactPerson: "Hendro Wibowo",
    phone: "0811-2233-4455",
    email: "hendro@agrounggas.co.id",
    status: "PENDING",
    rating: 4.5,
    dailyCapacity: "2.000 kg/hari",
    certifications: ["Halal MUI", "NKV Unggas"],
    address: "Cikupa, Tangerang, Banten",
    lastAuditDate: "Menunggu Verifikasi",
  },
  {
    id: "SUP-105",
    name: "PT. Susu Segar Nusantara Dairy",
    category: "Susu & Olahan Nabati",
    contactPerson: "drh. Anita Putri",
    phone: "0812-7788-9900",
    email: "anita@nusantaradairy.id",
    status: "APPROVED",
    rating: 4.9,
    dailyCapacity: "5.000 liter/hari",
    certifications: ["ISO 22000", "Halal MUI", "HACCP"],
    address: "Pangalengan, Kabupaten Bandung",
    lastAuditDate: "28 Jan 2026",
  },
  {
    id: "SUP-106",
    name: "UD. Bumbu Rempah Alami Mandiri",
    category: "Bumbu & Rempah",
    contactPerson: "Mansyur Hidayat",
    phone: "0819-3344-5566",
    email: "mansyur@rempahalami.co.id",
    status: "APPROVED",
    rating: 4.6,
    dailyCapacity: "800 kg/hari",
    certifications: ["P-IRT", "Halal MUI"],
    address: "Pasar Induk Kramat Jati, Jakarta Timur",
    lastAuditDate: "10 Feb 2026",
  },
  {
    id: "SUP-107",
    name: "Koperasi Nelayan Mina Bahari",
    category: "Protein Hewani",
    contactPerson: "Agus Salim",
    phone: "0813-5566-7788",
    email: "agus@minabahari.com",
    status: "REJECTED",
    rating: 3.8,
    dailyCapacity: "1.200 kg/hari",
    certifications: ["Sertifikat Kelayakan Pengolahan (SKP)"],
    address: "Pelabuhan Ratu, Sukabumi",
    lastAuditDate: "12 Jan 2026 (Suhu Cold Chain Tidak Memenuhi ISO 22000)",
  },
];

export const SupplierTable: React.FC = () => {
  const [suppliers, setSuppliers] = useState<SupplierData[]>(initialSuppliers);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedSupplierDetail, setSelectedSupplierDetail] = useState<SupplierData | null>(null);

  const fetchSuppliers = async () => {
    setIsLoading(true);
    try {
      const data = await supplierService.getAll();
      if (Array.isArray(data) && data.length > 0) {
        // Map backend model to frontend schema
        const mapped: SupplierData[] = data.map((item: any) => ({
          id: item.code || item.id,
          name: item.name,
          category: item.category || "Protein Hewani",
          contactPerson: item.contactPerson || item.picName || "PIC Vendor",
          phone: item.phone || "0812-xxxx",
          email: item.email || "vendor@mbg.id",
          status: item.status || "APPROVED",
          rating: item.rating ? Number(item.rating) : 4.8,
          dailyCapacity: item.dailyCapacity || "3.000 kg/hari",
          certifications: item.certificates?.map((c: any) => c.certType || c.name) || ["ISO 22000", "Halal"],
          address: item.address || "Jakarta",
          lastAuditDate: item.updatedAt ? new Date(item.updatedAt).toLocaleDateString("id-ID") : "15 Jan 2026",
        }));
        setSuppliers(mapped);
      }
    } catch {
      // Graceful fallback to initialSuppliers
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter((sup) => {
    const matchSearch =
      sup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sup.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sup.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory =
      selectedCategory === "ALL" || sup.category === selectedCategory;
    const matchStatus =
      selectedStatus === "ALL" || sup.status === selectedStatus;
    return matchSearch && matchCategory && matchStatus;
  });

  const handleAddSupplier = async (newSup: SupplierData) => {
    setSuppliers([newSup, ...suppliers]);
    try {
      await supplierService.create({
        name: newSup.name,
        category: newSup.category,
        contactPerson: newSup.contactPerson,
        phone: newSup.phone,
        email: newSup.email,
        address: newSup.address,
        dailyCapacity: newSup.dailyCapacity,
        certifications: newSup.certifications,
        status: newSup.status,
      });
    } catch (err) {
      console.warn("Backend save skipped in demo mode", err);
    }
  };

  const handleToggleStatus = async (id: string, newStatus: "APPROVED" | "PENDING" | "REJECTED") => {
    setSuppliers(
      suppliers.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    if (selectedSupplierDetail && selectedSupplierDetail.id === id) {
      setSelectedSupplierDetail({ ...selectedSupplierDetail, status: newStatus });
    }
    try {
      await supplierService.verify(id, { status: newStatus });
    } catch {
      // offline fallback
    }
  };

  // Metrics calculation
  const totalApproved = suppliers.filter((s) => s.status === "APPROVED").length;
  const totalPending = suppliers.filter((s) => s.status === "PENDING").length;
  const totalIso = suppliers.filter((s) => s.certifications.includes("ISO 22000")).length;

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-4.5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Vendor Terdaftar</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-white">{suppliers.length}</p>
          <p className="text-[11px] text-gray-400 mt-1">Vendor resmi terintegrasi sistem MBG</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4.5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Terverifikasi (Approved)</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{totalApproved}</p>
          <p className="text-[11px] text-gray-400 mt-1">Lulus audit ISO 22000 & BPOM</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4.5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Antrean Verifikasi</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-amber-500 dark:text-amber-400">{totalPending}</p>
          <p className="text-[11px] text-gray-400 mt-1">Memerlukan validasi audit dokumen</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4.5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Sertifikasi ISO 22000</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">{totalIso} Vendor</p>
          <p className="text-[11px] text-gray-400 mt-1">Standar Keamanan Pangan & HACCP</p>
        </div>
      </div>

      {/* Action Bar & Filter */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search Box */}
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Cari nama vendor, ID, atau penanggung jawab..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-xl border border-gray-300 bg-transparent pl-9 pr-3 text-xs text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white"
              />
            </div>

            {/* Category Select */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-10 rounded-xl border border-gray-300 bg-transparent px-3 text-xs text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white dark:bg-gray-800"
            >
              <option value="ALL">Semua Komoditas</option>
              <option value="Protein Hewani">Protein Hewani</option>
              <option value="Karbohidrat & Beras">Karbohidrat & Beras</option>
              <option value="Sayuran Segar & Buah">Sayuran & Buah</option>
              <option value="Susu & Olahan Nabati">Susu & Olahan</option>
            </select>

            {/* Status Select */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-10 rounded-xl border border-gray-300 bg-transparent px-3 text-xs text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white dark:bg-gray-800"
            >
              <option value="ALL">Semua Status</option>
              <option value="APPROVED">Terverifikasi (Approved)</option>
              <option value="PENDING">Menunggu Verifikasi</option>
              <option value="REJECTED">Ditolak (Rejected)</option>
            </select>
          </div>

          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Daftarkan Vendor Baru
          </button>
        </div>

        {/* Data Table */}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <th className="pb-3 pr-4">ID & Vendor</th>
                <th className="pb-3 px-3">Komoditas & Kapasitas</th>
                <th className="pb-3 px-3">Kontak Person</th>
                <th className="pb-3 px-3">Kepatuhan Regulasi</th>
                <th className="pb-3 px-3">Performa</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 pl-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-gray-50/60 dark:hover:bg-white/[0.01]">
                  {/* Vendor Name */}
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        {supplier.name.charAt(4) || "V"}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white block">
                          {supplier.name}
                        </span>
                        <span className="font-mono text-[11px] text-gray-400">{supplier.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Category & Capacity */}
                  <td className="py-3.5 px-3">
                    <span className="font-medium text-gray-800 dark:text-gray-200 block">
                      {supplier.category}
                    </span>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                      {supplier.dailyCapacity}
                    </span>
                  </td>

                  {/* Contact */}
                  <td className="py-3.5 px-3">
                    <span className="text-gray-800 dark:text-gray-200 font-medium block">
                      {supplier.contactPerson}
                    </span>
                    <span className="text-gray-400 text-[11px] block">{supplier.phone}</span>
                  </td>

                  {/* Certifications */}
                  <td className="py-3.5 px-3">
                    <div className="flex flex-wrap gap-1 max-w-[220px]">
                      {supplier.certifications.map((cert, idx) => (
                        <span
                          key={idx}
                          className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                            cert === "ISO 22000"
                              ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                              : cert === "Halal MUI"
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          }`}
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Rating */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1">
                      <span className="text-amber-400">★</span>
                      <span className="font-bold text-gray-900 dark:text-white">{supplier.rating}</span>
                      <span className="text-[10px] text-gray-400">/ 5.0</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-3">
                    {supplier.status === "APPROVED" ? (
                      <Badge color="success" size="sm">Terverifikasi</Badge>
                    ) : supplier.status === "PENDING" ? (
                      <Badge color="warning" size="sm">Menunggu Audit</Badge>
                    ) : (
                      <Badge color="error" size="sm">Ditolak</Badge>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 pl-3 text-right">
                    <button
                      onClick={() => setSelectedSupplierDetail(supplier)}
                      className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                      title="Lihat Detail & Audit"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supplier Detail Modal */}
      {selectedSupplierDetail && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 dark:bg-gray-900 dark:border dark:border-gray-800 shadow-2xl">
            <button
              onClick={() => setSelectedSupplierDetail(null)}
              className="absolute right-5 top-5 text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-gray-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 font-bold text-lg">
                {selectedSupplierDetail.name.charAt(4) || "V"}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {selectedSupplierDetail.name}
                </h3>
                <span className="font-mono text-xs text-gray-400">ID: {selectedSupplierDetail.id}</span>
              </div>
            </div>

            <div className="mt-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40">
                  <span className="text-gray-400 block text-[11px]">Kategori & Kapasitas</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                    {selectedSupplierDetail.category} ({selectedSupplierDetail.dailyCapacity})
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40">
                  <span className="text-gray-400 block text-[11px]">Penanggung Jawab (PIC)</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                    {selectedSupplierDetail.contactPerson} ({selectedSupplierDetail.phone})
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40">
                <span className="text-gray-400 block text-[11px]">Alamat Gudang / Fasilitas</span>
                <p className="text-gray-700 dark:text-gray-300 font-medium">{selectedSupplierDetail.address}</p>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40">
                <span className="text-gray-400 block text-[11px] mb-1.5">Sertifikasi & Kepatuhan Standar</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSupplierDetail.certifications.map((cert, idx) => (
                    <span key={idx} className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      ✓ {cert}
                    </span>
                  ))}
                </div>
              </div>

              {selectedSupplierDetail.lastAuditDate && (
                <div className="p-3 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                  <span className="text-gray-400 block text-[11px]">Catatan Audit Terakhir:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{selectedSupplierDetail.lastAuditDate}</span>
                </div>
              )}

              {/* Status Update Actions */}
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="text-gray-500">Ubah Status Verifikasi:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleStatus(selectedSupplierDetail.id, "APPROVED")}
                    className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition ${
                      selectedSupplierDetail.status === "APPROVED"
                        ? "bg-emerald-600 text-white"
                        : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300"
                    }`}
                  >
                    Setujui (Approved)
                  </button>
                  <button
                    onClick={() => handleToggleStatus(selectedSupplierDetail.id, "REJECTED")}
                    className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition ${
                      selectedSupplierDetail.status === "REJECTED"
                        ? "bg-rose-600 text-white"
                        : "bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-300"
                    }`}
                  >
                    Tolak (Rejected)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      <SupplierRegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSuccess={handleAddSupplier}
      />
    </div>
  );
};

export default SupplierTable;
