"use client";

import React, { useState, useRef } from "react";

export interface HygieneInspectionItem {
  id: string;
  category: string;
  name: string;
  criteria: string;
  status: "Lolos" | "Perbaikan" | "Kritis";
  notes?: string;
}

export interface HygieneAuditData {
  id?: string;
  auditNumber: string;
  facilityLocation: string;
  auditDate: string;
  auditorName: string;
  auditorTitle: string;
  score: number;
  grade: "Grade A (Sangat Baik)" | "Grade B (Perlu Perbaikan)" | "Grade C (Tidak Lolos)";
  items: HygieneInspectionItem[];
  capaNotes: string;
  signatureDataUrl?: string;
}

const DEFAULT_ITEMS: HygieneInspectionItem[] = [
  {
    id: "item-1",
    category: "Peralatan Masak Utama",
    name: "Sterilisasi Oven & Steamer Uap (>100°C)",
    criteria: "Suhu boiler uap mencapai minimal 100°C dan bebas kerak residu organik makanan.",
    status: "Lolos",
  },
  {
    id: "item-2",
    category: "Wadah Kontak Makanan",
    name: "Sanitasi Food Pan SUS 304 MBG",
    criteria: "Seluruh wadah bersekat bebas dari goresan dalam, karat, dan residu sabun cuci.",
    status: "Lolos",
  },
  {
    id: "item-3",
    category: "Penyimpanan Dingin",
    name: "Sanitasi Cold Storage & Chiller",
    criteria: "Suhu ruangan 2°C - 4°C, rak penyimpanan teratur, pemisahan sayur & daging mentah sempurna.",
    status: "Lolos",
  },
  {
    id: "item-4",
    category: "Pengukuran & Lab",
    name: "Kalibrasi Termometer Probe Suhu",
    criteria: "Termometer digital terkalibrasi dengan batas toleransi akurasi maksimal ±0.5°C.",
    status: "Lolos",
  },
  {
    id: "item-5",
    category: "Pencegahan Kontaminasi Silang",
    name: "Talenan Berwarna (Color-Coded)",
    criteria: "Tersedia & terpisah: Merah (Daging), Kuning (Unggas), Hijau (Sayur), Putih (Siap Santap).",
    status: "Lolos",
  },
  {
    id: "item-6",
    category: "Ventilasi & Kebersihan Udara",
    name: "Exhaust Hood & Grease Trap",
    criteria: "Penyaring minyak exhaust bersih dari tumpukan jelaga dan tidak ada tetesan minyak.",
    status: "Lolos",
  },
  {
    id: "item-7",
    category: "Sanitasi Pencucian",
    name: "Suhu Air Bilas Dishwasher (>80°C)",
    criteria: "Mesin pencuci otomatis mencapai siklus sanitasi panas minimal 80°C.",
    status: "Lolos",
  },
  {
    id: "item-8",
    category: "Manajemen Limbah",
    name: "Tempat Sampah Tertutup & Terpilah",
    criteria: "Tempat sampah berpenutup pedal kaki, kantong terpisah organik/anorganik dan dikosongkan berkala.",
    status: "Lolos",
  },
];

interface NewHygieneInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (audit: HygieneAuditData) => void;
}

export default function NewHygieneInspectionModal({
  isOpen,
  onClose,
  onSave,
}: NewHygieneInspectionModalProps) {
  const [auditNumber, setAuditNumber] = useState(`AUD-ISO22K-${Math.floor(1000 + Math.random() * 9000)}`);
  const [facilityLocation, setFacilityLocation] = useState("Dapur Sentral Harmoni - Jakarta Pusat");
  const [auditDate, setAuditDate] = useState(new Date().toISOString().split("T")[0]);
  const [auditorName, setAuditorName] = useState("Dewi Kartika, S.T. (Lead Auditor ISO 22000)");
  const [auditorTitle, setAuditorTitle] = useState("Quality Assurance Lead");
  const [items, setItems] = useState<HygieneInspectionItem[]>(DEFAULT_ITEMS);
  const [capaNotes, setCapaNotes] = useState("");
  const [isSigned, setIsSigned] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  if (!isOpen) return null;

  // Real-time Score calculation
  const calculateScore = () => {
    let totalScore = 0;
    const itemWeight = 100 / items.length;

    items.forEach((it) => {
      if (it.status === "Lolos") totalScore += itemWeight;
      else if (it.status === "Perbaikan") totalScore += itemWeight * 0.5;
      else if (it.status === "Kritis") totalScore += 0;
    });

    return Math.round(totalScore);
  };

  const score = calculateScore();
  const grade: HygieneAuditData["grade"] =
    score >= 90
      ? "Grade A (Sangat Baik)"
      : score >= 75
      ? "Grade B (Perlu Perbaikan)"
      : "Grade C (Tidak Lolos)";

  const handleStatusChange = (itemId: string, newStatus: HygieneInspectionItem["status"]) => {
    setItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, status: newStatus } : it))
    );
  };

  const handleNotesChange = (itemId: string, notes: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, notes } : it))
    );
  };

  // Signature canvas handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#059669";
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
    setIsSigned(true);
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsSigned(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const auditData: HygieneAuditData = {
      id: Date.now().toString(),
      auditNumber,
      facilityLocation,
      auditDate,
      auditorName,
      auditorTitle,
      score,
      grade,
      items,
      capaNotes,
      signatureDataUrl: canvasRef.current ? canvasRef.current.toDataURL() : undefined,
    };
    onSave(auditData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Formulir Audit Higienitas Alat Masak ISO 22000
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Checklist Kelaikan Sanitasi, HACCP, dan Keamanan Kontak Makanan MBG
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Audit Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Audit Metadata & Real-time Score Scoreboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Nomor Dokumen Audit (Auto)
                </label>
                <input
                  type="text"
                  required
                  value={auditNumber}
                  onChange={(e) => setAuditNumber(e.target.value)}
                  className="w-full px-3 py-1.5 font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Lokasi Fasilitas Dapur / SPPG
                </label>
                <select
                  value={facilityLocation}
                  onChange={(e) => setFacilityLocation(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                >
                  <option value="Dapur Sentral Harmoni - Jakarta Pusat">Dapur Sentral Harmoni - Jakarta Pusat</option>
                  <option value="SPPG Klender - Jakarta Timur">SPPG Klender - Jakarta Timur</option>
                  <option value="SPPG Cilandak - Jakarta Selatan">SPPG Cilandak - Jakarta Selatan</option>
                  <option value="Gudang Buffer Pangan Cakung">Gudang Buffer Pangan Cakung</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Tanggal Pelaksanaan Audit
                </label>
                <input
                  type="date"
                  required
                  value={auditDate}
                  onChange={(e) => setAuditDate(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Auditor Mutu / Ahli Higienitas
                </label>
                <input
                  type="text"
                  required
                  value={auditorName}
                  onChange={(e) => setAuditorName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Score Live Gauge Banner */}
            <div className="flex flex-col items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-center shadow-xs">
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                Skor Higienitas
              </span>
              <div className="text-3xl font-black my-1 text-emerald-600 dark:text-emerald-400">
                {score}%
              </div>
              <span
                className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md ${
                  score >= 90
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                    : score >= 75
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                    : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                }`}
              >
                {grade}
              </span>
            </div>
          </div>

          {/* 8 Critical Hygiene Inspection Parameters */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                8 Parameter Kunci Sanitasi Peralatan ISO 22000 & HACCP
              </h4>
              <span className="text-[11px] text-gray-500">Pilih status kelaikan per item</span>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700 space-y-3 shadow-2xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-[10px]">
                          {idx + 1}
                        </span>
                        <h5 className="text-xs font-bold text-gray-900 dark:text-white">
                          {item.name}
                        </h5>
                        <span className="px-2 py-0.5 text-[9px] bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded font-medium">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 pl-7">
                        {item.criteria}
                      </p>
                    </div>

                    {/* Status Toggle Buttons */}
                    <div className="flex items-center gap-1.5 pl-7 sm:pl-0 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleStatusChange(item.id, "Lolos")}
                        className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
                          item.status === "Lolos"
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                            : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-emerald-50"
                        }`}
                      >
                        ✓ Sesuai (Lolos)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(item.id, "Perbaikan")}
                        className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
                          item.status === "Perbaikan"
                            ? "bg-amber-500 text-white border-amber-500 shadow-xs"
                            : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-amber-50"
                        }`}
                      >
                        ⚠ Perbaikan
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(item.id, "Kritis")}
                        className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
                          item.status === "Kritis"
                            ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                            : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-rose-50"
                        }`}
                      >
                        ✗ Kritis
                      </button>
                    </div>
                  </div>

                  {item.status !== "Lolos" && (
                    <div className="pl-7">
                      <input
                        type="text"
                        placeholder="Rincian temuan ketidaksesuaian & instruksi pembersihan ulang..."
                        value={item.notes || ""}
                        onChange={(e) => handleNotesChange(item.id, e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg text-gray-900 dark:text-white placeholder-amber-800/40"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CAPA & Auditor Digital Signature */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Tindakan Perbaikan & Koreksi (CAPA - Corrective and Preventive Action)
              </label>
              <textarea
                rows={4}
                placeholder="Instruksi perbaikan bagi tim kitchen / pengelola fasilitas..."
                value={capaNotes}
                onChange={(e) => setCapaNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
              />
            </div>

            {/* Signature Canvas */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                  Tanda Tangan Digital Lead Auditor
                </label>
                <button
                  type="button"
                  onClick={clearSignature}
                  className="text-[11px] font-medium text-rose-600 hover:text-rose-700"
                >
                  Hapus Tanda Tangan
                </button>
              </div>
              <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-white overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={380}
                  height={100}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-[100px] cursor-crosshair"
                />
                {!isSigned && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-400 text-xs">
                    Goreskan tanda tangan auditor di sini
                  </div>
                )}
              </div>
              <p className="text-[10px] text-gray-500 mt-1">
                Auditor: {auditorName} • Memiliki sertifikasi Lead Auditor ISO 22000
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs hover:shadow transition-all"
            >
              Simpan & Terbitkan Hasil Audit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
