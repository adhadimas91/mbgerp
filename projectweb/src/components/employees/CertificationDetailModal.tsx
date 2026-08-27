"use client";
import React from "react";
import { EmployeeCertRecord } from "./CertificationMcuMatrix";

interface CertificationDetailModalProps {
  record: EmployeeCertRecord;
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificationDetailModal({
  record,
  isOpen,
  onClose,
}: CertificationDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                {record.overallStatus}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Berkas Higiene & Rekam MCU: {record.employeeName}
            </h3>
            <p className="text-xs text-gray-500 font-mono">
              NIP: {record.nip} • {record.role} • {record.sppgUnit}
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs">
          {/* Box 1: Sertifikat Kemenkes */}
          <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl dark:bg-emerald-950/20 dark:border-emerald-900/40 space-y-2">
            <div className="font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider text-xs">
              1. Sertifikat Higiene Sanitasi Makanan (Food Handler)
            </div>
            <div className="grid grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
              <div>
                <span className="text-gray-500 block">Nomor Sertifikat:</span>
                <span className="font-mono font-bold">{record.foodHandlerCert.number}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Lembaga Penerbit:</span>
                <span>{record.foodHandlerCert.issuer}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Tanggal Terbit:</span>
                <span>{record.foodHandlerCert.issuedDate}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Masa Berlaku:</span>
                <span className="font-bold text-emerald-600">{record.foodHandlerCert.expiryDate}</span>
              </div>
            </div>
          </div>

          {/* Box 2: Laboratorium MCU */}
          <div className="p-4 bg-cyan-50/50 border border-cyan-200 rounded-xl dark:bg-cyan-950/20 dark:border-cyan-900/40 space-y-2">
            <div className="font-bold text-cyan-800 dark:text-cyan-300 uppercase tracking-wider text-xs">
              2. Hasil Pengujian Laboratorium Medis (Permenkes 1096/2011)
            </div>
            <div className="space-y-2 pt-1">
              <div className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded-lg">
                <span>Laboratorium Penguji:</span>
                <span className="font-bold">{record.rectalSwabMcu.labName}</span>
              </div>
              <div className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded-lg">
                <span>Swab Rektal Salmonella Typhi:</span>
                <span className="font-bold text-emerald-600">Negatif (Tidak Ditemukan Kuman)</span>
              </div>
              <div className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded-lg">
                <span>Rontgen Toraks Skrining TBC:</span>
                <span className="font-bold text-emerald-600">Jantung & Paru dalam Batas Normal</span>
              </div>
              <div className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded-lg">
                <span>Uji Serologi Hepatitis A (Anti-HAV):</span>
                <span className="font-bold text-emerald-600">Non-Reaktif</span>
              </div>
            </div>
          </div>

          {/* Box 3: HACCP Info if available */}
          {record.haccpCert && (
            <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-xl dark:bg-blue-950/20 dark:border-blue-900/40 space-y-2">
              <div className="font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider text-xs">
                3. Sertifikasi Penjaminan Mutu & ISO 22000
              </div>
              <div className="grid grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                <div>
                  <span className="text-gray-500 block">Tingkat Kompetensi:</span>
                  <span className="font-bold">{record.haccpCert.level}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">No. Registrasi:</span>
                  <span className="font-mono font-semibold">{record.haccpCert.certNumber}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
