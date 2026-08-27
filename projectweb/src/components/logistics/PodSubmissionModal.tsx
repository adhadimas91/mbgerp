"use client";
import React, { useState, useRef, useEffect } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";

export interface PodRecord {
  id: string;
  waybillNumber: string;
  schoolName: string;
  schoolNpsn: string;
  district: string;
  recipientName: string;
  recipientNip: string;
  recipientRole: string;
  portionsDelivered: number;
  portionsAccepted: number;
  receivedTemperature: number;
  deliveryTime: string;
  photoUrl: string;
  signatureUrl: string;
  sealIntact: boolean;
  organolepticCheckPassed: boolean;
  temperatureCheckPassed: boolean;
  gpsLatitude: number;
  gpsLongitude: number;
  gpsAccuracy: string;
  notes?: string;
  status: "VERIFIED" | "PENDING_AUDIT" | "DEVIATION";
}

interface PodSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newPod: PodRecord) => void;
}

const waybillOptions = [
  {
    waybillNumber: "SJ-MBG-20260827-0103",
    schoolName: "SDN Kebon Sirih 03",
    schoolNpsn: "20100350",
    district: "Kec. Menteng, Jakarta Pusat",
    recipientName: "Siti Rahmawati, S.Pd",
    recipientNip: "19880415 201402 2 003",
    recipientRole: "Guru Pembina UKS & Tim Satgas MBG",
    portions: 480,
    lat: -6.184311,
    lng: 106.828452,
  },
  {
    waybillNumber: "SJ-MBG-20260827-0104",
    schoolName: "SMAN 68 Jakarta Pusat",
    schoolNpsn: "20100488",
    district: "Kec. Senen, Jakarta Pusat",
    recipientName: "Dr. Budi Santoso, M.Si",
    recipientNip: "19750218 200212 1 004",
    recipientRole: "Kepala Sekolah",
    portions: 1100,
    lat: -6.195612,
    lng: 106.851221,
  },
  {
    waybillNumber: "SJ-MBG-20260827-0105",
    schoolName: "Panti Asuhan Kasih Mandiri",
    schoolNpsn: "LKS-9901",
    district: "Kec. Tanah Abang, Jakarta Pusat",
    recipientName: "Ustadz H. Ahmad Fauzi",
    recipientNip: "LKS-NIK-31710129",
    recipientRole: "Ketua Pengurus Lembaga",
    portions: 220,
    lat: -6.191244,
    lng: 106.818933,
  },
];

export const PodSubmissionModal: React.FC<PodSubmissionModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const [formData, setFormData] = useState({
    waybillNumber: waybillOptions[0].waybillNumber,
    schoolName: waybillOptions[0].schoolName,
    schoolNpsn: waybillOptions[0].schoolNpsn,
    district: waybillOptions[0].district,
    recipientName: waybillOptions[0].recipientName,
    recipientNip: waybillOptions[0].recipientNip,
    recipientRole: waybillOptions[0].recipientRole,
    portionsDelivered: waybillOptions[0].portions,
    portionsAccepted: waybillOptions[0].portions,
    receivedTemperature: 59.4,
    sealIntact: true,
    organolepticCheckPassed: true,
    temperatureCheckPassed: true,
    gpsLatitude: waybillOptions[0].lat,
    gpsLongitude: waybillOptions[0].lng,
    notes: "Makanan diterima dalam kondisi hangat, wadah bersegel utuh, aroma segar dan porsi lengkap.",
  });

  const [photoPreview, setPhotoPreview] = useState<string>(
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize Canvas when opened
  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = "#1e293b";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }
    }
  }, [isOpen]);

  const handleWaybillSelect = (waybillNumber: string) => {
    const selected = waybillOptions.find((w) => w.waybillNumber === waybillNumber) || waybillOptions[0];
    setFormData((prev) => ({
      ...prev,
      waybillNumber: selected.waybillNumber,
      schoolName: selected.schoolName,
      schoolNpsn: selected.schoolNpsn,
      district: selected.district,
      recipientName: selected.recipientName,
      recipientNip: selected.recipientNip,
      recipientRole: selected.recipientRole,
      portionsDelivered: selected.portions,
      portionsAccepted: selected.portions,
      gpsLatitude: selected.lat,
      gpsLongitude: selected.lng,
    }));
  };

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if ("touches" in e) {
      e.preventDefault();
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasSignature(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    if ("touches" in e) {
      e.preventDefault();
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleSamplePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setPhotoPreview(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let signatureDataUrl = "";
    if (canvasRef.current && hasSignature) {
      signatureDataUrl = canvasRef.current.toDataURL("image/png");
    } else {
      // Default generated signature data URL
      signatureDataUrl = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='100' viewBox='0 0 300 100'><path d='M20,65 Q70,10 110,45 T190,35 T270,55' stroke='%230f172a' stroke-width='4' fill='none' stroke-linecap='round'/><path d='M80,75 L180,65' stroke='%230f172a' stroke-width='2.5' fill='none'/></svg>";
    }

    const now = new Date();
    const timeString = `${now.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}, ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")} WIB`;

    setTimeout(() => {
      const newPod: PodRecord = {
        id: `POD-${Math.floor(1000 + Math.random() * 9000)}`,
        waybillNumber: formData.waybillNumber,
        schoolName: formData.schoolName,
        schoolNpsn: formData.schoolNpsn,
        district: formData.district,
        recipientName: formData.recipientName,
        recipientNip: formData.recipientNip,
        recipientRole: formData.recipientRole,
        portionsDelivered: Number(formData.portionsDelivered),
        portionsAccepted: Number(formData.portionsAccepted),
        receivedTemperature: Number(formData.receivedTemperature),
        deliveryTime: timeString,
        photoUrl: photoPreview,
        signatureUrl: signatureDataUrl,
        sealIntact: formData.sealIntact,
        organolepticCheckPassed: formData.organolepticCheckPassed,
        temperatureCheckPassed: formData.temperatureCheckPassed,
        gpsLatitude: formData.gpsLatitude,
        gpsLongitude: formData.gpsLongitude,
        gpsAccuracy: "± 2.5 meter (GPS Real-Time Verified)",
        notes: formData.notes,
        status: "VERIFIED",
      };

      onSuccess(newPod);
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-3xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
      <div className="mb-6 border-b border-gray-100 pb-4 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Formulir Verifikasi Proof of Delivery (PoD)
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Dokumentasi serah terima porsi makanan higienis, uji organoleptik di sekolah, upload foto, dan tanda tangan digital.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identitas Surat Jalan & Sekolah */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-3">
            1. Rujukan Surat Jalan & Pihak Penerima Sekolah
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Pilih Resi Surat Jalan <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.waybillNumber}
                onChange={(e) => handleWaybillSelect(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm font-mono focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                {waybillOptions.map((w) => (
                  <option key={w.waybillNumber} value={w.waybillNumber}>
                    {w.waybillNumber} ({w.schoolName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Nama PIC / Guru Penerima <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                NIP / NIK Penerima
              </label>
              <input
                type="text"
                value={formData.recipientNip}
                onChange={(e) => setFormData({ ...formData, recipientNip: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm font-mono dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Verifikasi Kualitas & Ceklis Kepatuhan */}
        <div className="rounded-2xl bg-emerald-50/50 p-4.5 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            2. Cek Fisik, Suhu Penerimaan & Jumlah Porsi Aktual
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mb-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Porsi Diterima Aktual (Box)
              </label>
              <input
                type="number"
                value={formData.portionsAccepted}
                onChange={(e) => setFormData({ ...formData, portionsAccepted: parseInt(e.target.value) || 0 })}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm font-bold text-emerald-700 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Suhu Saat Tiba (°C)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={formData.receivedTemperature}
                  onChange={(e) => setFormData({ ...formData, receivedTemperature: parseFloat(e.target.value) || 0 })}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm font-bold text-rose-600 dark:border-gray-700 dark:bg-gray-800"
                />
                <span className="absolute right-3 top-2 text-gray-400 font-semibold">°C</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Geotag GPS Lokasi Terima
              </label>
              <div className="rounded-xl bg-white dark:bg-gray-800 px-3 py-2 text-[11px] font-mono text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <span>{formData.gpsLatitude.toFixed(4)}, {formData.gpsLongitude.toFixed(4)}</span>
                <span className="text-emerald-600 font-bold">● Valid</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-emerald-200/60 dark:border-emerald-500/20">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sealIntact"
                checked={formData.sealIntact}
                onChange={(e) => setFormData({ ...formData, sealIntact: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="sealIntact" className="text-xs text-gray-700 dark:text-gray-300">
                Segel Box Utuh & Tidak Rusak / Terbuka Selama Perjalanan
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="organolepticCheckPassed"
                checked={formData.organolepticCheckPassed}
                onChange={(e) => setFormData({ ...formData, organolepticCheckPassed: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="organolepticCheckPassed" className="text-xs text-gray-700 dark:text-gray-300">
                Uji Organoleptik Lolos: Aroma masakan harum segar, tidak basi / berlendir, wadah bersih
              </label>
            </div>
          </div>
        </div>

        {/* Upload Foto & Interactive Signature Pad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Upload Foto Bukti */}
          <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
              3. Foto Dokumentasi Serah Terima
            </h4>
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Bukti Serah Terima"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-4">
                  <svg className="mx-auto h-8 w-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-1 text-xs text-gray-500">Ambil foto serah terima porsi</p>
                </div>
              )}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <label className="cursor-pointer text-xs font-semibold text-brand-600 hover:underline">
                <span>Ganti / Upload Foto Baru</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSamplePhotoChange}
                  className="hidden"
                />
              </label>
              <span className="text-[10px] text-gray-400">JPG/PNG max 5MB</span>
            </div>
          </div>

          {/* Canvas Tanda Tangan Digital */}
          <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                4. Tanda Tangan Digital PIC Sekolah
              </h4>
              <button
                type="button"
                onClick={handleClearSignature}
                className="text-[11px] font-semibold text-rose-600 hover:underline"
              >
                Hapus (Clear)
              </button>
            </div>

            <div className="relative rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
              <canvas
                ref={canvasRef}
                width={500}
                height={200}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-[150px] cursor-crosshair touch-none bg-white dark:bg-gray-900"
              />
              {!hasSignature && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-xs text-gray-400 italic">
                  Goreskan tanda tangan di sini (Mouse / Touch)
                </div>
              )}
            </div>
            <p className="text-[10px] text-gray-400 mt-1.5">
              Tanda tangan digital ini sah dan tersimpan pada BAST MBG RI.
            </p>
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
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Menyimpan Berita Acara...
              </>
            ) : (
              "Verifikasi & Terbitkan BAST Digital"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PodSubmissionModal;
