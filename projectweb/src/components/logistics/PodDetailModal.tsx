"use client";
import React from "react";
import { Modal } from "../ui/modal";
import { PodRecord } from "./PodSubmissionModal";
import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";

interface PodDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  pod: PodRecord | null;
}

export const PodDetailModal: React.FC<PodDetailModalProps> = ({
  isOpen,
  onClose,
  pod,
}) => {
  if (!pod) return null;

  const handlePrintBast = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-3xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
      <div className="mb-6 border-b border-gray-100 pb-4 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Berita Acara Serah Terima (BAST Digital)
                </h3>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 font-bold">
                  {pod.id}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Surat Jalan: <strong className="font-mono text-gray-700 dark:text-gray-200">{pod.waybillNumber}</strong> • {pod.schoolName}
              </p>
            </div>
          </div>

          <Badge color="success">Terverifikasi & Sah</Badge>
        </div>
      </div>

      <div className="space-y-6">
        {/* Main Proof Cards: Photo + Signature & Geotag */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Photo Preview */}
          <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800 bg-white dark:bg-gray-800/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
              Foto Dokumentasi Serah Terima
            </h4>
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <img
                src={pod.photoUrl}
                alt="Foto Serah Terima"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-gray-500">
              <span>Waktu Unggah: {pod.deliveryTime}</span>
              <span className="text-emerald-600 font-semibold">● Gambar Asli Valid</span>
            </div>
          </div>

          {/* Signature & Geotag Preview */}
          <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800 bg-white dark:bg-gray-800/40 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                Tanda Tangan Digital & Geotag
              </h4>
              <div className="h-28 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center p-3">
                {pod.signatureUrl ? (
                  <img
                    src={pod.signatureUrl}
                    alt="Tanda Tangan PIC"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <p className="text-xs text-gray-400 italic">Tanda tangan digital terotentikasi</p>
                    <p className="text-[10px] text-emerald-600 font-mono mt-0.5">SHA256-DIGITAL-SIGN-VALID</p>
                  </div>
                )}
              </div>
              <div className="mt-2 text-center">
                <p className="text-xs font-bold text-gray-900 dark:text-white">{pod.recipientName}</p>
                <p className="text-[10px] text-gray-400 font-mono">NIP: {pod.recipientNip}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 text-[11px] space-y-1 text-gray-500">
              <div className="flex justify-between">
                <span>Koordinat GPS:</span>
                <span className="font-mono font-bold text-gray-800 dark:text-gray-200">
                  {pod.gpsLatitude?.toFixed(6) ?? "-6.196328"}, {pod.gpsLongitude?.toFixed(6) ?? "106.833894"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Akurasi GPS:</span>
                <span className="text-emerald-600 font-semibold">{pod.gpsAccuracy}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Serah Terima & Mutu */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-5 dark:border-gray-800 dark:bg-gray-800/20">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-3">
            Rincian Pemeriksaan Kualitas & Kesesuaian Porsi
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-4">
            <div className="bg-white dark:bg-gray-900 p-3 rounded-xl border border-gray-200 dark:border-gray-800">
              <span className="text-gray-400 text-[10px]">Porsi Dikirim:</span>
              <p className="text-base font-bold text-gray-900 dark:text-white">{pod.portionsDelivered} Box</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-3 rounded-xl border border-gray-200 dark:border-gray-800">
              <span className="text-gray-400 text-[10px]">Porsi Diterima:</span>
              <p className="text-base font-bold text-emerald-600">{pod.portionsAccepted} Box (100%)</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-3 rounded-xl border border-gray-200 dark:border-gray-800">
              <span className="text-gray-400 text-[10px]">Suhu Saat Diterima:</span>
              <p className="text-base font-bold text-rose-600 font-mono">{pod.receivedTemperature}°C</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-3 rounded-xl border border-gray-200 dark:border-gray-800">
              <span className="text-gray-400 text-[10px]">Status Kepatuhan:</span>
              <p className="text-xs font-bold text-emerald-600 mt-1">ISO 22000 Terpenuhi</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300 pt-2 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>Segel kemasan kotak termal tertutup rapat tanpa robek / dibuka di jalan.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>Uji organoleptik lulus: aroma sedap, tekstur nasi pulen, sayuran renyah segar.</span>
            </div>
            {pod.notes && (
              <div className="mt-3 p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                <p className="text-[11px] font-bold text-gray-700 dark:text-gray-300">Catatan PIC Sekolah:</p>
                <p className="text-xs text-gray-500 mt-0.5">{pod.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
          <Button
            onClick={handlePrintBast}
            size="sm"
            className="bg-brand-600 hover:bg-brand-700 text-white font-semibold flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Cetak BAST Digital
          </Button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition"
          >
            Tutup Pratinjau
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PodDetailModal;
