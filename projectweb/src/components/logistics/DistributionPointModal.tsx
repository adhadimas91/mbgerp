"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";

export interface DistributionPoint {
  id: string;
  npsn: string;
  name: string;
  category: "SD/MI" | "SMP/MTs" | "SMA/SMK" | "Panti Asuhan" | "SLB/Khusus";
  district: string;
  address: string;
  latitude: number;
  longitude: number;
  picName: string;
  picRole: string;
  picPhone: string;
  picEmail?: string;
  targetPortions: number;
  morningPortions: number;
  noonPortions: number;
  dropOffWindow: string;
  clusterRoute: "Rute A (Menteng - Gambir)" | "Rute B (Senen - Cempaka)" | "Rute C (Tanah Abang - Johar)";
  hasDedicatedRoom: boolean;
  notes: string;
  status: "ACTIVE" | "INACTIVE" | "VERIFYING";
}

interface DistributionPointModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (point: DistributionPoint) => void;
  initialData?: DistributionPoint | null;
}

export const DistributionPointModal: React.FC<DistributionPointModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<Partial<DistributionPoint>>({
    npsn: "",
    name: "",
    category: "SD/MI",
    district: "Kec. Menteng, Jakarta Pusat",
    address: "",
    latitude: -6.1963,
    longitude: 106.8338,
    picName: "",
    picRole: "Kepala Sekolah / Tim Satgas MBG",
    picPhone: "",
    picEmail: "",
    targetPortions: 500,
    morningPortions: 300,
    noonPortions: 200,
    dropOffWindow: "09:30 - 10:00 WIB",
    clusterRoute: "Rute A (Menteng - Gambir)",
    hasDedicatedRoom: true,
    notes: "",
    status: "ACTIVE",
  });

  const [isSimulatingGps, setIsSimulatingGps] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        npsn: "",
        name: "",
        category: "SD/MI",
        district: "Kec. Menteng, Jakarta Pusat",
        address: "",
        latitude: -6.1963 + (Math.random() * 0.04 - 0.02),
        longitude: 106.8338 + (Math.random() * 0.04 - 0.02),
        picName: "",
        picRole: "Kepala Sekolah / Tim Satgas MBG",
        picPhone: "",
        picEmail: "",
        targetPortions: 500,
        morningPortions: 300,
        noonPortions: 200,
        dropOffWindow: "09:30 - 10:00 WIB",
        clusterRoute: "Rute A (Menteng - Gambir)",
        hasDedicatedRoom: true,
        notes: "",
        status: "ACTIVE",
      });
    }
  }, [initialData, isOpen]);

  const handleSimulateGps = () => {
    setIsSimulatingGps(true);
    setTimeout(() => {
      // Simulate geolocation around Jakarta Pusat
      const lat = Number((-6.185 + Math.random() * 0.035).toFixed(6));
      const lng = Number((106.825 + Math.random() * 0.035).toFixed(6));
      setFormData((prev) => ({
        ...prev,
        latitude: lat,
        longitude: lng,
      }));
      setIsSimulatingGps(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = (Number(formData.morningPortions) || 0) + (Number(formData.noonPortions) || 0);
    const newPoint: DistributionPoint = {
      id: initialData?.id || `DP-${Math.floor(1000 + Math.random() * 9000)}`,
      npsn: formData.npsn || "NPSN-MBG",
      name: formData.name || "Titik Baru",
      category: formData.category || "SD/MI",
      district: formData.district || "Jakarta Pusat",
      address: formData.address || "Alamat Lokasi Sasaran MBG",
      latitude: Number(formData.latitude) || -6.1963,
      longitude: Number(formData.longitude) || 106.8338,
      picName: formData.picName || "Penanggung Jawab",
      picRole: formData.picRole || "Koordinator MBG",
      picPhone: formData.picPhone || "0812-0000-0000",
      picEmail: formData.picEmail || "sekolah@mbg.sch.id",
      targetPortions: total > 0 ? total : Number(formData.targetPortions) || 500,
      morningPortions: Number(formData.morningPortions) || 300,
      noonPortions: Number(formData.noonPortions) || 200,
      dropOffWindow: formData.dropOffWindow || "09:30 - 10:00 WIB",
      clusterRoute: formData.clusterRoute || "Rute A (Menteng - Gambir)",
      hasDedicatedRoom: Boolean(formData.hasDedicatedRoom),
      notes: formData.notes || "",
      status: formData.status || "ACTIVE",
    };

    onSave(newPoint);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-3xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
      <div className="mb-6 border-b border-gray-100 pb-4 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {initialData ? "Edit Data Titik Distribusi Sekolah" : "Tambah Titik Distribusi Sasaran Baru"}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Registrasi sekolah/lembaga penerima porsi MBG, koordinat GPS geolokasi, dan kuota porsi harian.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identitas Sekolah */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-3">
            1. Identitas Lembaga & Lokasi Sekolah
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Nama Sekolah / Titik Distribusi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: SDN Menteng 01 Pagi"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                NPSN / Nomor Izin <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="20100123"
                value={formData.npsn || ""}
                onChange={(e) => setFormData({ ...formData, npsn: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm font-mono focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Kategori Sasaran
              </label>
              <select
                value={formData.category || "SD/MI"}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="SD/MI">SD / Madrasah Ibtidaiyah (MI)</option>
                <option value="SMP/MTs">SMP / Madrasah Tsanawiyah (MTs)</option>
                <option value="SMA/SMK">SMA / SMK / MA</option>
                <option value="Panti Asuhan">Panti Asuhan / Lembaga Kesejahteraan</option>
                <option value="SLB/Khusus">Sekolah Luar Biasa (SLB)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Kecamatan / Wilayah
              </label>
              <select
                value={formData.district || "Kec. Menteng, Jakarta Pusat"}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="Kec. Menteng, Jakarta Pusat">Kec. Menteng, Jakarta Pusat</option>
                <option value="Kec. Gambir, Jakarta Pusat">Kec. Gambir, Jakarta Pusat</option>
                <option value="Kec. Senen, Jakarta Pusat">Kec. Senen, Jakarta Pusat</option>
                <option value="Kec. Cempaka Putih, Jakarta Pusat">Kec. Cempaka Putih, Jakarta Pusat</option>
                <option value="Kec. Tanah Abang, Jakarta Pusat">Kec. Tanah Abang, Jakarta Pusat</option>
                <option value="Kec. Johar Baru, Jakarta Pusat">Kec. Johar Baru, Jakarta Pusat</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Status Titik
              </label>
              <select
                value={formData.status || "ACTIVE"}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="ACTIVE">Aktif Menerima Pasokan</option>
                <option value="VERIFYING">Sedang Verifikasi Lapangan</option>
                <option value="INACTIVE">Nonaktif / Libur Semester</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Alamat Lengkap & Titik Gerbang Masuk
              </label>
              <input
                type="text"
                placeholder="Jl. Besuki No. 4, RT.3/RW.5, Menteng, Kec. Menteng, Kota Jakarta Pusat"
                value={formData.address || ""}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Koordinat GPS & Klaster Logistik */}
        <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/40 border border-gray-200/80 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              2. Koordinat Geolokasi GPS & Klaster Armada
            </h4>
            <button
              type="button"
              onClick={handleSimulateGps}
              disabled={isSimulatingGps}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400 px-3 py-1.5 rounded-lg transition"
            >
              {isSimulatingGps ? (
                <>
                  <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Menghitung GPS...
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Deteksi Koordinat Presisi
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-1">
                Latitude (Garis Lintang)
              </label>
              <input
                type="number"
                step="any"
                value={formData.latitude || ""}
                onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs font-mono dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-1">
                Longitude (Garis Bujur)
              </label>
              <input
                type="number"
                step="any"
                value={formData.longitude || ""}
                onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs font-mono dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-1">
                Rute Klaster Pengantaran
              </label>
              <select
                value={formData.clusterRoute || "Rute A (Menteng - Gambir)"}
                onChange={(e) => setFormData({ ...formData, clusterRoute: e.target.value as any })}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="Rute A (Menteng - Gambir)">Rute A (Menteng - Gambir)</option>
                <option value="Rute B (Senen - Cempaka)">Rute B (Senen - Cempaka)</option>
                <option value="Rute C (Tanah Abang - Johar)">Rute C (Tanah Abang - Johar)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Kuota Porsi & Jadwal Drop-off */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-3">
            3. Kuota Porsi MBG & Jendela Waktu Drop-Off
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Porsi Pagi (Kelas Rendah)
              </label>
              <input
                type="number"
                min="0"
                value={formData.morningPortions || ""}
                onChange={(e) => setFormData({ ...formData, morningPortions: parseInt(e.target.value) || 0 })}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Porsi Siang (Kelas Tinggi)
              </label>
              <input
                type="number"
                min="0"
                value={formData.noonPortions || ""}
                onChange={(e) => setFormData({ ...formData, noonPortions: parseInt(e.target.value) || 0 })}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Total Porsi Harian
              </label>
              <div className="w-full rounded-xl bg-gray-100 px-3.5 py-2.5 text-sm font-bold text-gray-800 dark:bg-gray-800 dark:text-white">
                {((Number(formData.morningPortions) || 0) + (Number(formData.noonPortions) || 0)).toLocaleString()} Porsi
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Jadwal Drop-off Ideal
              </label>
              <input
                type="text"
                placeholder="09:30 - 10:00 WIB"
                value={formData.dropOffWindow || ""}
                onChange={(e) => setFormData({ ...formData, dropOffWindow: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* PIC & Kontak Serah Terima */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-3">
            4. Penanggung Jawab (PIC) Serah Terima
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Nama PIC / Guru MBG <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Dra. Hj. Sri Wahyuni, M.Pd"
                value={formData.picName || ""}
                onChange={(e) => setFormData({ ...formData, picName: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Jabatan
              </label>
              <input
                type="text"
                placeholder="Kepala Sekolah / Guru Pembina"
                value={formData.picRole || ""}
                onChange={(e) => setFormData({ ...formData, picRole: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                No. WhatsApp Aktif <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="0812-3456-7890"
                value={formData.picPhone || ""}
                onChange={(e) => setFormData({ ...formData, picPhone: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Catatan Distribusi & Fasilitas */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="hasDedicatedRoom"
              checked={formData.hasDedicatedRoom || false}
              onChange={(e) => setFormData({ ...formData, hasDedicatedRoom: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500 dark:border-gray-700"
            />
            <label htmlFor="hasDedicatedRoom" className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Sekolah memiliki meja penerimaan makanan bersih & higienis sesuai SOP MBG
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Catatan Akses Armada & Alergi Khusus Siswa
            </label>
            <textarea
              rows={2}
              placeholder="Contoh: Akses truk muat lewat pintu timur. Ada 4 siswa intoleransi seafood / alergi kacang."
              value={formData.notes || ""}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition"
          >
            Batal
          </button>
          <Button type="submit" size="sm" className="bg-brand-600 hover:bg-brand-700 text-white font-semibold">
            {initialData ? "Simpan Perubahan Titik" : "Daftarkan Titik Distribusi"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DistributionPointModal;
