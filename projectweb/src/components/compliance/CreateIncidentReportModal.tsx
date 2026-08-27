"use client";

import React, { useState } from "react";

export interface IncidentReport {
  id: string;
  incidentCode: string;
  reportDate: string;
  incidentDate: string;
  facilityLocation: string;
  region: string;
  category: "FOOD_SAFETY_CCP" | "COLD_CHAIN_LOGISTICS" | "PACKAGING_DEFECT" | "SUPPLIER_RAW_MATERIAL" | "HYGIENE_SANATION";
  severity: "CRITICAL_P1" | "MAJOR_P2" | "MINOR_P3";
  title: string;
  description: string;
  affectedBatchNumber: string;
  affectedPortionsCount: number;
  containmentAction: string;
  rootCauseAnalysis?: string;
  correctiveAction?: string;
  preventiveAction?: string;
  picName: string;
  assignedAuditor: string;
  status: "REPORTED" | "UNDER_INVESTIGATION" | "CAPA_IMPLEMENTED" | "VERIFIED_CLOSED";
  evidencePhotoName?: string;
  auditorSignatureDate?: string;
}

interface CreateIncidentReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (incident: IncidentReport) => void;
}

export default function CreateIncidentReportModal({
  isOpen,
  onClose,
  onSave,
}: CreateIncidentReportModalProps) {
  const [formData, setFormData] = useState<Partial<IncidentReport>>({
    title: "",
    category: "FOOD_SAFETY_CCP",
    severity: "MAJOR_P2",
    facilityLocation: "Dapur Sentral Harmoni - Jakarta Pusat",
    region: "Jakarta Pusat",
    incidentDate: new Date().toISOString().slice(0, 16),
    affectedBatchNumber: "",
    affectedPortionsCount: 0,
    description: "",
    containmentAction: "",
    picName: "Siti Rahmawati, S.Tr.Gz (QC Kitchen)",
    assignedAuditor: "Dewi Kartika, S.T. (Lead Auditor)",
    status: "REPORTED",
  });

  const [simulatedPhoto, setSimulatedPhoto] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.containmentAction) {
      alert("Mohon lengkapi Judul Insiden, Deskripsi Kejadian, dan Tindakan Pencegahan Cepat (Containment).");
      return;
    }

    const newIncident: IncidentReport = {
      id: `INC-${Date.now().toString().slice(-4)}`,
      incidentCode: `INC-MBG-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`,
      reportDate: new Date().toISOString().slice(0, 10),
      incidentDate: formData.incidentDate || new Date().toISOString().slice(0, 10),
      facilityLocation: formData.facilityLocation || "Dapur Sentral Harmoni",
      region: formData.region || "Jakarta Pusat",
      category: formData.category || "FOOD_SAFETY_CCP",
      severity: formData.severity || "MAJOR_P2",
      title: formData.title || "",
      description: formData.description || "",
      affectedBatchNumber: formData.affectedBatchNumber || "LOT-BATCH-N/A",
      affectedPortionsCount: Number(formData.affectedPortionsCount) || 0,
      containmentAction: formData.containmentAction || "",
      picName: formData.picName || "QC Officer",
      assignedAuditor: formData.assignedAuditor || "Dewi Kartika, S.T.",
      status: "REPORTED",
      evidencePhotoName: simulatedPhoto || "Foto_Bukti_Temuan_QC.jpg",
    };

    onSave(newIncident);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-850">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 text-white shadow">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Formulir Pelaporan Insiden Mutu & Keamanan Pangan
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Pencatatan temuan ketidaksesuaian kritis (HACCP / ISO 22000) di lapangan
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
          
          {/* Title */}
          <div>
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
              Judul Ringkas Insiden / Temuan Mutu *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Contoh: Suhu Termal Box Pengiriman Drop di Bawah 60°C pada Rute Kemayoran"
              className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Category */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Kategori Insiden *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="FOOD_SAFETY_CCP">Keamanan Pangan & CCP (Suhu / Lab)</option>
                <option value="COLD_CHAIN_LOGISTICS">Rantai Dingin / Logistik Armada</option>
                <option value="PACKAGING_DEFECT">Cacat Kemasan & Porsi Makanan</option>
                <option value="SUPPLIER_RAW_MATERIAL">Ketidaksesuaian Bahan Baku Supplier</option>
                <option value="HYGIENE_SANATION">Sanitasi & Kontaminasi Lingkungan</option>
              </select>
            </div>

            {/* Severity */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Tingkat Keparahan (Severity Level) *
              </label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value as any })}
                className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white font-bold"
              >
                <option value="CRITICAL_P1">🔴 Critical (P1) - Berisiko Keracunan / Recall</option>
                <option value="MAJOR_P2">🟠 Major (P2) - Anomali Suhu / Mutu Penurunan</option>
                <option value="MINOR_P3">🟡 Minor (P3) - Cacat Kemasan Luar / Label</option>
              </select>
            </div>

            {/* Facility */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Fasilitas / Lokasi Kejadian *
              </label>
              <select
                value={formData.facilityLocation}
                onChange={(e) => setFormData({ ...formData, facilityLocation: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="Dapur Sentral Harmoni - Jakarta Pusat">Dapur Sentral Harmoni - Jakarta Pusat</option>
                <option value="Dapur Sentral Klender - Jakarta Timur">Dapur Sentral Klender - Jakarta Timur</option>
                <option value="Dapur Sentral Sentul - Kab. Bogor">Dapur Sentral Sentul - Kab. Bogor</option>
                <option value="Dapur Sentral Coblong - Kota Bandung">Dapur Sentral Coblong - Kota Bandung</option>
                <option value="Armada Mobil Termal MBG-04 (B-9021-TX)">Armada Mobil Termal MBG-04 (B-9021-TX)</option>
              </select>
            </div>

            {/* Incident DateTime */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Waktu Kejadian (WIB) *
              </label>
              <input
                type="datetime-local"
                value={formData.incidentDate}
                onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Batch / Lot */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Nomor Batch / Lot Makanan Terindikasi
              </label>
              <input
                type="text"
                value={formData.affectedBatchNumber}
                onChange={(e) => setFormData({ ...formData, affectedBatchNumber: e.target.value })}
                placeholder="Contoh: LOT-AYM-20260827-01 atau BATCH-0827"
                className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white font-mono"
              />
            </div>

            {/* Portions count */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Estimasi Jumlah Porsi Terdampak
              </label>
              <input
                type="number"
                min="0"
                value={formData.affectedPortionsCount}
                onChange={(e) => setFormData({ ...formData, affectedPortionsCount: Number(e.target.value) })}
                className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white font-mono"
              />
            </div>

          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
              Kronologi & Uraian Kejadian Ketidaksesuaian *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Jelaskan detail apa yang terjadi, batas kritis yang terlampaui, dan kondisi produk saat ditemukan..."
              className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Containment Immediate Action */}
          <div>
            <label className="text-xs font-bold text-rose-700 dark:text-rose-400 block mb-1">
              Tindakan Penahanan & Pengamanan Langsung (Immediate Containment) *
            </label>
            <textarea
              required
              rows={2}
              value={formData.containmentAction}
              onChange={(e) => setFormData({ ...formData, containmentAction: e.target.value })}
              placeholder="Contoh: Karantina seluruh 120 box di ruang isolasi QC, batch tidak didistribusikan ke sekolah, langsung diganti dengan batch cadangan Dapur B..."
              className="w-full rounded-xl border border-rose-300 bg-rose-50/50 p-2.5 text-xs text-gray-900 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-rose-800 dark:bg-rose-950/20 dark:text-white"
            />
          </div>

          {/* Evidence photo upload */}
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-center dark:border-gray-700 dark:bg-gray-850">
            <div className="flex flex-col items-center justify-center">
              <svg className="h-7 w-7 text-rose-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <label className="cursor-pointer text-xs font-semibold text-rose-600 hover:underline dark:text-rose-400">
                <span>Upload Foto Dokumentasi Temuan Mutu (JPG/PNG)</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSimulatedPhoto(e.target.files[0].name);
                    }
                  }}
                />
              </label>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {simulatedPhoto ? (
                  <span className="font-semibold text-emerald-600">Foto terlampir: {simulatedPhoto}</span>
                ) : (
                  "Dokumentasi kondisi wadah, display suhu sensor IoT, atau kondisi fisik makanan"
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
              className="rounded-xl bg-rose-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-rose-700 transition-colors"
            >
              Laporkan Insiden & Buka Form CAPA
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
