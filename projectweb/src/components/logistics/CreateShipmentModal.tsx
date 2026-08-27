"use client";
import React, { useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";

export interface Shipment {
  id: string;
  waybillNumber: string;
  schoolName: string;
  schoolNpsn: string;
  district: string;
  menuName: string;
  portions: number;
  centralKitchen: string;
  fleetVehicle: string;
  driverName: string;
  driverPhone: string;
  departureTime: string;
  estimatedArrival: string;
  actualArrival?: string;
  loadingTemperature: number;
  sealNumber: string;
  status: "PREPARING" | "IN_TRANSIT" | "ARRIVED" | "DELIVERED" | "DELAYED";
  podStatus: "VERIFIED" | "PENDING";
  currentLocationLat?: number;
  currentLocationLng?: number;
}

interface CreateShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newShipment: Shipment) => void;
}

export const CreateShipmentModal: React.FC<CreateShipmentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    schoolName: "SDN Menteng 01 Pagi (Sekolah Percontohan)",
    schoolNpsn: "20100101",
    district: "Kec. Menteng, Jakarta Pusat",
    menuName: "Nasi Ayam Bakar Madu + Tumis Buncis Jagung + Buah Pisang Cavendish + Susu UHT MBG",
    portions: 650,
    centralKitchen: "SPPG Harmoni (Central Kitchen 01)",
    fleetVehicle: "Blindvan Box Chiller (B 9482 MBG)",
    driverName: "Budi Santoso",
    driverPhone: "0812-9876-5432",
    departureTime: "09:00 WIB",
    estimatedArrival: "09:35 WIB",
    loadingTemperature: 64.5,
    sealNumber: `SEAL-${Math.floor(10000 + Math.random() * 90000)}`,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
    const randomCode = Math.floor(100 + Math.random() * 900);

    setTimeout(() => {
      const newShipment: Shipment = {
        id: `SHP-${Math.floor(1000 + Math.random() * 9000)}`,
        waybillNumber: `SJ-MBG-${dateStr}-${randomCode}`,
        schoolName: formData.schoolName,
        schoolNpsn: formData.schoolNpsn,
        district: formData.district,
        menuName: formData.menuName,
        portions: Number(formData.portions),
        centralKitchen: formData.centralKitchen,
        fleetVehicle: formData.fleetVehicle,
        driverName: formData.driverName,
        driverPhone: formData.driverPhone,
        departureTime: formData.departureTime,
        estimatedArrival: formData.estimatedArrival,
        loadingTemperature: Number(formData.loadingTemperature),
        sealNumber: formData.sealNumber,
        status: "IN_TRANSIT",
        podStatus: "PENDING",
        currentLocationLat: -6.1912,
        currentLocationLng: 106.8315,
      };

      onSuccess(newShipment);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  const handleSchoolSelect = (schoolName: string) => {
    if (schoolName === "SDN Menteng 01 Pagi (Sekolah Percontohan)") {
      setFormData((prev) => ({
        ...prev,
        schoolName,
        schoolNpsn: "20100101",
        district: "Kec. Menteng, Jakarta Pusat",
        portions: 650,
        estimatedArrival: "09:35 WIB",
      }));
    } else if (schoolName === "SMPN 1 Jakarta Pusat") {
      setFormData((prev) => ({
        ...prev,
        schoolName,
        schoolNpsn: "20100204",
        district: "Kec. Gambir, Jakarta Pusat",
        portions: 820,
        estimatedArrival: "09:45 WIB",
      }));
    } else if (schoolName === "SMAN 68 Jakarta Pusat") {
      setFormData((prev) => ({
        ...prev,
        schoolName,
        schoolNpsn: "20100488",
        district: "Kec. Senen, Jakarta Pusat",
        portions: 1100,
        estimatedArrival: "10:00 WIB",
      }));
    } else if (schoolName === "Panti Asuhan Kasih Mandiri") {
      setFormData((prev) => ({
        ...prev,
        schoolName,
        schoolNpsn: "LKS-9901",
        district: "Kec. Tanah Abang, Jakarta Pusat",
        portions: 220,
        estimatedArrival: "10:15 WIB",
      }));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-3xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
      <div className="mb-6 border-b border-gray-100 pb-4 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Buat Surat Jalan & Resi Pengiriman MBG Baru
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Penetapan jadwal keberangkatan armada, nomor segel kemasan termal, dan telemetri suhu muat ISO 22000.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Titik Sasaran & Paket Menu */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-3">
            1. Tujuan Pengiriman & Rincian Menu MBG
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Pilih Sekolah / Titik Distribusi Sasaran <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.schoolName}
                onChange={(e) => handleSchoolSelect(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="SDN Menteng 01 Pagi (Sekolah Percontohan)">SDN Menteng 01 Pagi (650 Porsi)</option>
                <option value="SMPN 1 Jakarta Pusat">SMPN 1 Jakarta Pusat (820 Porsi)</option>
                <option value="SMAN 68 Jakarta Pusat">SMAN 68 Jakarta Pusat (1.100 Porsi)</option>
                <option value="Panti Asuhan Kasih Mandiri">Panti Asuhan Kasih Mandiri (220 Porsi)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Jumlah Porsi Dikirim <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.portions}
                onChange={(e) => setFormData({ ...formData, portions: parseInt(e.target.value) || 0 })}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm font-bold text-brand-600 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-brand-400"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Paket Menu Siap Antar Hari Ini
              </label>
              <input
                type="text"
                required
                value={formData.menuName}
                onChange={(e) => setFormData({ ...formData, menuName: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Dapur Pengirim & Armada */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-3">
            2. Dapur Pengirim & Penugasan Armada Kurir
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Dapur Sentral (SPPG Hub)
              </label>
              <select
                value={formData.centralKitchen}
                onChange={(e) => setFormData({ ...formData, centralKitchen: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="SPPG Harmoni (Central Kitchen 01)">SPPG Harmoni (Central Kitchen 01)</option>
                <option value="SPPG Cempaka (Central Kitchen 02)">SPPG Cempaka (Central Kitchen 02)</option>
                <option value="SPPG Tanah Abang (Central Kitchen 03)">SPPG Tanah Abang (Central Kitchen 03)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Armada Kendaraan Pengantar
              </label>
              <select
                value={formData.fleetVehicle}
                onChange={(e) => setFormData({ ...formData, fleetVehicle: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="Blindvan Box Chiller (B 9482 MBG)">Blindvan Box Chiller (B 9482 MBG)</option>
                <option value="Truk Chiller Box 2T (B 9812 MBG)">Truk Chiller Box 2T (B 9812 MBG)</option>
                <option value="Truk Engkel Termal (B 9021 MBG)">Truk Engkel Termal (B 9021 MBG)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Driver & Kurir Bertugas
              </label>
              <input
                type="text"
                required
                value={formData.driverName}
                onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Keamanan Pangan & Jadwal */}
        <div className="rounded-2xl bg-amber-50/60 p-4.5 dark:bg-amber-500/5 border border-amber-200/80 dark:border-amber-500/20">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-1.5">
            <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            3. Standar Kemanan Pangan ISO 22000 & Waktu Pengantaran
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Suhu Wadah Saat Muat (°C) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  required
                  value={formData.loadingTemperature}
                  onChange={(e) => setFormData({ ...formData, loadingTemperature: parseFloat(e.target.value) || 0 })}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm font-bold text-rose-600 dark:border-gray-700 dark:bg-gray-800"
                />
                <span className="absolute right-3 top-2 text-gray-400 font-medium">°C</span>
              </div>
              <p className="text-[10px] text-gray-500 mt-1">Standar Hangat: &gt; 60.0°C</p>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Nomor Segel Wadah (Seal No.)
              </label>
              <input
                type="text"
                required
                value={formData.sealNumber}
                onChange={(e) => setFormData({ ...formData, sealNumber: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs font-mono font-bold dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Jam Berangkat Dapur
              </label>
              <input
                type="text"
                value={formData.departureTime}
                onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs font-medium dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Estimasi Tiba (ETA Sekolah)
              </label>
              <input
                type="text"
                value={formData.estimatedArrival}
                onChange={(e) => setFormData({ ...formData, estimatedArrival: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs font-medium dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition"
          >
            Batal
          </button>
          <Button
            type="submit"
            disabled={isSubmitting}
            size="sm"
            className="bg-brand-600 hover:bg-brand-700 text-white font-semibold flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Menerbitkan Surat Jalan...
              </>
            ) : (
              "Terbitkan Surat Jalan & Mulai Pengiriman"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateShipmentModal;
