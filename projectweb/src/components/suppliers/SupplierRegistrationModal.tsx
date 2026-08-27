"use client";
import React, { useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";

interface SupplierRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newSupplier: any) => void;
}

export const SupplierRegistrationModal: React.FC<SupplierRegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    legalType: "PT",
    nib: "",
    npwp: "",
    contactPerson: "",
    phone: "",
    email: "",
    category: "Protein Hewani",
    address: "",
    dailyCapacity: "",
    hasIso22000: true,
    hasIso9001: true,
    hasHalal: true,
    hasBpom: true,
  });

  const [files, setFiles] = useState<{ [key: string]: string }>({
    nibDoc: "nib_perusahaan.pdf",
    halalDoc: "sertifikat_halal_2026.pdf",
    isoDoc: "iso22000_haccp.pdf",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        onSuccess({
          id: `SUP-${Math.floor(1000 + Math.random() * 9000)}`,
          name: `${formData.legalType}. ${formData.name}`,
          category: formData.category,
          contactPerson: formData.contactPerson,
          phone: formData.phone,
          email: formData.email,
          rating: 4.8,
          status: "PENDING",
          dailyCapacity: `${formData.dailyCapacity} kg/hari`,
          certifications: [
            formData.hasIso22000 ? "ISO 22000" : "",
            formData.hasIso9001 ? "ISO 9001" : "",
            formData.hasHalal ? "Halal MUI" : "",
            formData.hasBpom ? "BPOM" : "",
          ].filter(Boolean),
          address: formData.address,
        });
        setSubmitted(false);
        onClose();
      }, 1000);
    }, 800);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
      <div className="border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Pendaftaran & Registrasi Vendor MBG Baru
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Formulir verifikasi legalitas, sertifikasi keamanan pangan ISO 22000, dan kapasitas suplai harian
            </p>
          </div>
        </div>
      </div>

      {submitted ? (
        <div className="py-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 className="text-xl font-bold text-gray-800 dark:text-white">Pendaftaran Berhasil Dikirim!</h4>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Berkas vendor telah masuk ke antrean verifikasi kepatuhan ISO & Tim Legalitas MBG.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bagian Legalitas Perusahaan */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              1. Identitas & Legalitas Usaha
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
                  Bentuk Usaha <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.legalType}
                  onChange={(e) => setFormData({ ...formData, legalType: e.target.value })}
                  className="h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white dark:bg-gray-800"
                >
                  <option value="PT">PT (Perseroan Terbatas)</option>
                  <option value="CV">CV (Persekutuan Komanditer)</option>
                  <option value="Koperasi">Koperasi Petani / Peternak</option>
                  <option value="UD">UD / Perorangan Terdaftar</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
                  Nama Perusahaan / Vendor <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Sumber Protein Nusantara"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
                  Nomor Induk Berusaha (NIB) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="13 digit NIB OSS"
                  value={formData.nib}
                  onChange={(e) => setFormData({ ...formData, nib: e.target.value })}
                  className="h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
                  NPWP Perusahaan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="00.000.000.0-000.000"
                  value={formData.npwp}
                  onChange={(e) => setFormData({ ...formData, npwp: e.target.value })}
                  className="h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
                Alamat Kantor & Gudang / Fasilitas Produksi <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={2}
                required
                placeholder="Alamat lengkap lokasi pengadaan dan pergudangan"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-transparent p-3 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Bagian PIC & Kontak */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              2. Penanggung Jawab & Komoditas Suplai
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
                  Nama PIC / Manajer Operasional <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
                  No. WhatsApp / HP Aktif <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0812-xxxx-xxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
                  Email Resmi <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="sales@vendor.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
                  Kategori Utama Komoditas Bahan Baku <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white dark:bg-gray-800"
                >
                  <option value="Protein Hewani">Protein Hewani (Daging Sapi, Ayam Segar, Ikan)</option>
                  <option value="Karbohidrat & Beras">Karbohidrat (Beras Premium, Kentang, Ubi)</option>
                  <option value="Sayuran Segar & Buah">Sayuran Segar & Buah-buahan</option>
                  <option value="Susu & Olahan Nabati">Susu Segar, Telur, Tahu & Tempe</option>
                  <option value="Bumbu & Minyak">Bumbu Dapur, Rempah & Minyak Masak</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
                  Kapasitas Pasok Harian (kg / porsi) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  placeholder="Contoh: 2500"
                  value={formData.dailyCapacity}
                  onChange={(e) => setFormData({ ...formData, dailyCapacity: e.target.value })}
                  className="h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Bagian Sertifikasi ISO & Kepatuhan */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              3. Sertifikasi Mutu & Keamanan Pangan
            </h4>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <label className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasIso22000}
                  onChange={(e) => setFormData({ ...formData, hasIso22000: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">ISO 22000 / HACCP</span>
              </label>
              <label className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasIso9001}
                  onChange={(e) => setFormData({ ...formData, hasIso9001: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">ISO 9001 (Mutu)</span>
              </label>
              <label className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasHalal}
                  onChange={(e) => setFormData({ ...formData, hasHalal: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Halal MUI / BPJPH</span>
              </label>
              <label className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasBpom}
                  onChange={(e) => setFormData({ ...formData, hasBpom: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Izin Edar BPOM</span>
              </label>
            </div>

            {/* Unggah Berkas */}
            <div className="rounded-xl border border-dashed border-gray-300 p-4 text-center dark:border-gray-700 bg-gray-50/50 dark:bg-white/[0.01]">
              <svg className="mx-auto h-8 w-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Upload Dokumen Legalitas</span> (NIB, NPWP, Sertifikat Halal & ISO)
              </p>
              <p className="text-[11px] text-gray-400">Format PDF, PNG, JPG (Maks. 10MB per file)</p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              Batal
            </button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-5 py-2"
            >
              {isSubmitting ? "Mengirim Berkas..." : "Daftarkan Vendor MBG"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default SupplierRegistrationModal;
