"use client";
import React, { useState, useRef } from "react";

export interface OrganolepticRecord {
  id: string;
  batchCode: string;
  menuTitle: string;
  testedAt: string;
  nutritionistName: string;
  nutritionistNip: string;
  tasteScore: number; // 1-5
  aromaScore: number; // 1-5
  textureScore: number; // 1-5
  appearanceScore: number; // 1-5
  measuredTemp: number; // °C
  retentionSampleCode: string;
  retentionStorageLocation: string; // e.g. Chiller QC CH-RET-01
  halalCheck: boolean;
  hygieneCheck: boolean;
  status: "APPROVED" | "REVISION_REQUIRED" | "REJECTED";
  notes: string;
  signatureSvg?: string;
}

interface OrganolepticQualityModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: OrganolepticRecord;
  onSave: (updatedRecord: OrganolepticRecord) => void;
}

export const OrganolepticQualityModal: React.FC<OrganolepticQualityModalProps> = ({
  isOpen,
  onClose,
  record,
  onSave,
}) => {
  const [formData, setFormData] = useState<OrganolepticRecord>(record);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  if (!isOpen) return null;

  const handleStartDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#047857";
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const handleStopDraw = () => {
    setIsDrawing(false);
  };

  const handleClearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const calculateOverallScore = () => {
    const total = formData.tasteScore + formData.aromaScore + formData.textureScore + formData.appearanceScore;
    return (total / 4).toFixed(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    let signature = formData.signatureSvg;
    if (canvasRef.current && hasDrawn) {
      signature = canvasRef.current.toDataURL("image/png");
    }

    setTimeout(() => {
      onSave({
        ...formData,
        signatureSvg: signature,
      });
      setIsSaving(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white/95 backdrop-blur dark:bg-gray-900/95 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Formulir Uji Organoleptik & Quality Release Dapur MBG
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Standar ISO 22000:2018 & Badan Gizi Nasional (BGN) RI
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 rounded-lg hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Top Info Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-800 dark:text-emerald-300 font-semibold block">
                Kode Batch Masak
              </span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{formData.batchCode}</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-800 dark:text-emerald-300 font-semibold block">
                Menu Paket Hari Ini
              </span>
              <span className="text-sm font-bold text-gray-900 dark:text-white truncate block">{formData.menuTitle}</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-800 dark:text-emerald-300 font-semibold block">
                Skor Rata-Rata Mutu
              </span>
              <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                ⭐ {calculateOverallScore()} / 5.0 (Sangat Layak)
              </span>
            </div>
          </div>

          {/* Organoleptic 4 Pillars Rating */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              1. Penilaian Sensorik Uji Organoleptik (Skala 1 - 5)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Rasa */}
              <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/40">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-gray-800 dark:text-gray-200">
                    🍜 Uji Cita Rasa (Taste Profile)
                  </label>
                  <span className="text-xs font-extrabold text-emerald-600">{formData.tasteScore} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={formData.tasteScore}
                  onChange={(e) => setFormData({ ...formData, tasteScore: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <p className="text-[10px] text-gray-500 mt-1">Gurih pas, kadar garam &lt; 2g/porsi, tidak hambar</p>
              </div>

              {/* Aroma */}
              <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/40">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-gray-800 dark:text-gray-200">
                    ♨️ Uji Aroma & Bau (Odor/Smell)
                  </label>
                  <span className="text-xs font-extrabold text-emerald-600">{formData.aromaScore} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={formData.aromaScore}
                  onChange={(e) => setFormData({ ...formData, aromaScore: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <p className="text-[10px] text-gray-500 mt-1">Aroma sedap segar, bebas bau tengik / asam / asing</p>
              </div>

              {/* Tekstur */}
              <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/40">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-gray-800 dark:text-gray-200">
                    🍗 Uji Tekstur & Kematangan (Texture)
                  </label>
                  <span className="text-xs font-extrabold text-emerald-600">{formData.textureScore} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={formData.textureScore}
                  onChange={(e) => setFormData({ ...formData, textureScore: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <p className="text-[10px] text-gray-500 mt-1">Daging empuk matang sempurna, sayuran renyah tidak layu</p>
              </div>

              {/* Tampilan Visual */}
              <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/40">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-gray-800 dark:text-gray-200">
                    🍱 Penampilan & Warna (Visual/Color)
                  </label>
                  <span className="text-xs font-extrabold text-emerald-600">{formData.appearanceScore} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={formData.appearanceScore}
                  onChange={(e) => setFormData({ ...formData, appearanceScore: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <p className="text-[10px] text-gray-500 mt-1">Penyajian warna kontras menarik & higienis</p>
              </div>
            </div>
          </div>

          {/* Retention Sample & CCP Control */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              2. Kepatuhan Retensi Sampel & Titik Kendali Kritis (CCP)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Suhu Makanan Saat Uji Release (°C) - Min 65°C
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={formData.measuredTemp}
                    onChange={(e) => setFormData({ ...formData, measuredTemp: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-xs text-gray-400">°C</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ID Barcode Sampel Retensi (Simpan 2x24 Jam)
                </label>
                <input
                  type="text"
                  value={formData.retentionSampleCode}
                  onChange={(e) => setFormData({ ...formData, retentionSampleCode: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/60">
                <input
                  type="checkbox"
                  checked={formData.halalCheck}
                  onChange={(e) => setFormData({ ...formData, halalCheck: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                  ✅ Kepatuhan Halal Terjamin (HAS 23000)
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/60">
                <input
                  type="checkbox"
                  checked={formData.hygieneCheck}
                  onChange={(e) => setFormData({ ...formData, hygieneCheck: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                  ✅ Kelaikan Higiene Sanitasi ISO 22000
                </span>
              </label>
            </div>
          </div>

          {/* Decision & Nutritionist Signature */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              3. Keputusan Pelepasan (Quality Release) & Tanda Tangan Ahli Gizi
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: "APPROVED" })}
                className={`p-3 rounded-xl border text-center font-bold text-xs transition ${
                  formData.status === "APPROVED"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 ring-2 ring-emerald-500"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                🟢 DISETUJUI DISTRIBUSI
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: "REVISION_REQUIRED" })}
                className={`p-3 rounded-xl border text-center font-bold text-xs transition ${
                  formData.status === "REVISION_REQUIRED"
                    ? "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 ring-2 ring-amber-500"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                🟡 PERLU PENYESUAIAN
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: "REJECTED" })}
                className={`p-3 rounded-xl border text-center font-bold text-xs transition ${
                  formData.status === "REJECTED"
                    ? "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 ring-2 ring-rose-500"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                🔴 DITOLAK / TAHAN
              </button>
            </div>

            {/* Nutritionist PIC details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nama Ahli Gizi Penguji (Nutritionist PIC)
                </label>
                <input
                  type="text"
                  value={formData.nutritionistName}
                  onChange={(e) => setFormData({ ...formData, nutritionistName: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  NIP / STR Ahli Gizi
                </label>
                <input
                  type="text"
                  value={formData.nutritionistNip}
                  onChange={(e) => setFormData({ ...formData, nutritionistNip: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Digital Signature Pad */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Goreskan Tanda Tangan Digital Ahli Gizi di Bawah:
                </label>
                <button
                  type="button"
                  onClick={handleClearSignature}
                  className="text-xs text-rose-500 hover:text-rose-600 font-semibold"
                >
                  Hapus Tanda Tangan
                </button>
              </div>
              <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 overflow-hidden relative">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={130}
                  onMouseDown={handleStartDraw}
                  onMouseMove={handleDraw}
                  onMouseUp={handleStopDraw}
                  onMouseLeave={handleStopDraw}
                  onTouchStart={handleStartDraw}
                  onTouchMove={handleDraw}
                  onTouchEnd={handleStopDraw}
                  className="w-full h-[130px] cursor-crosshair"
                />
                {!hasDrawn && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs text-gray-400">
                    ✍️ Klik dan tarik kursor/sentuh layar untuk tanda tangan digital
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
            >
              Tutup
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-md hover:from-emerald-700 hover:to-teal-700 transition"
            >
              {isSaving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Menyimpan Sertifikasi...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Simpan & Rilis Makanan ke Logistik
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
