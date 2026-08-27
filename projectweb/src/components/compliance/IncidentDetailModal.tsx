"use client";

import React, { useState, useRef } from "react";
import { IncidentReport } from "./CreateIncidentReportModal";

interface IncidentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: IncidentReport | null;
  onUpdateStatus: (id: string, newStatus: IncidentReport["status"], updatedData?: Partial<IncidentReport>) => void;
  onOpenPrintModal: (incident: IncidentReport) => void;
}

export default function IncidentDetailModal({
  isOpen,
  onClose,
  incident,
  onUpdateStatus,
  onOpenPrintModal,
}: IncidentDetailModalProps) {
  const [rcaText, setRcaText] = useState(incident?.rootCauseAnalysis || "");
  const [correctiveText, setCorrectiveText] = useState(incident?.correctiveAction || "");
  const [preventiveText, setPreventiveText] = useState(incident?.preventiveAction || "");
  const [isEditingCapa, setIsEditingCapa] = useState(false);

  // Signature canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(Boolean(incident?.auditorSignatureDate));

  if (!isOpen || !incident) return null;

  const getSeverityBadge = (severity: IncidentReport["severity"]) => {
    switch (severity) {
      case "CRITICAL_P1":
        return "bg-rose-500 text-white animate-pulse";
      case "MAJOR_P2":
        return "bg-amber-500 text-white";
      case "MINOR_P3":
        return "bg-blue-500 text-white";
    }
  };

  const getStatusBadge = (status: IncidentReport["status"]) => {
    switch (status) {
      case "REPORTED":
        return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
      case "UNDER_INVESTIGATION":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300";
      case "CAPA_IMPLEMENTED":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";
      case "VERIFIED_CLOSED":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300";
    }
  };

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = "#1e3a8a";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleSaveCAPA = () => {
    onUpdateStatus(incident.id, incident.status, {
      rootCauseAnalysis: rcaText,
      correctiveAction: correctiveText,
      preventiveAction: preventiveText,
    });
    setIsEditingCapa(false);
    alert("Data Analisis Akar Masalah & Tindakan CAPA berhasil disimpan.");
  };

  const handleAdvanceStatus = (targetStatus: IncidentReport["status"]) => {
    if (targetStatus === "VERIFIED_CLOSED" && !hasSignature) {
      alert("Mohon tanda tangani formulir verifikasi CAPA terlebih dahulu pada kanvas tanda tangan.");
      return;
    }

    onUpdateStatus(incident.id, targetStatus, {
      rootCauseAnalysis: rcaText || incident.rootCauseAnalysis,
      correctiveAction: correctiveText || incident.correctiveAction,
      preventiveAction: preventiveText || incident.preventiveAction,
      auditorSignatureDate: targetStatus === "VERIFIED_CLOSED" ? new Date().toISOString() : incident.auditorSignatureDate,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-gray-50 via-white to-gray-50 p-5 dark:border-gray-800 dark:from-gray-900 dark:via-gray-850 dark:to-gray-900">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 shadow-inner">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-gray-500 dark:text-gray-400">{incident.incidentCode}</span>
                <span className={`inline-flex items-center px-2 py-0.5 text-xs font-bold rounded-full ${getSeverityBadge(incident.severity)}`}>
                  {incident.severity}
                </span>
                <span className={`inline-flex items-center px-2 py-0.5 text-xs font-bold rounded-md ${getStatusBadge(incident.status)}`}>
                  {incident.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">
                {incident.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenPrintModal(incident)}
              className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
            >
              <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak Form CAPA (LKTK)
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Metadata Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50 text-xs">
            <div>
              <span className="text-gray-500 dark:text-gray-400 block font-medium">Lokasi Fasilitas</span>
              <span className="font-bold text-gray-900 dark:text-white mt-0.5 block">{incident.facilityLocation}</span>
              <span className="text-[11px] text-gray-500">{incident.region}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400 block font-medium">Batch / Porsi Terdampak</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400 mt-0.5 block">{incident.affectedBatchNumber}</span>
              <span className="text-gray-600 font-semibold">{incident.affectedPortionsCount} Porsi Terisolasi</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400 block font-medium">Pelapor / PIC QC</span>
              <span className="font-semibold text-gray-900 dark:text-white mt-0.5 block">{incident.picName}</span>
              <span className="text-[11px] text-gray-500 font-mono">{incident.reportDate}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400 block font-medium">Lead Auditor Ditugaskan</span>
              <span className="font-semibold text-gray-900 dark:text-white mt-0.5 block">{incident.assignedAuditor}</span>
              <span className="text-emerald-600 font-semibold">ISO 22000 Auditor</span>
            </div>
          </div>

          {/* Description & Immediate Containment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-850">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 block mb-1">
                Uraian Kejadian & Kronologi
              </span>
              <p className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed">
                {incident.description}
              </p>
            </div>

            <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 dark:border-rose-900/40 dark:bg-rose-950/20">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 block mb-1">
                Tindakan Penahanan Langsung (Immediate Containment)
              </span>
              <p className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                {incident.containmentAction}
              </p>
            </div>
          </div>

          {/* CAPA Form Section (Corrective & Preventive Action) */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50/30 p-5 dark:border-blue-900/40 dark:bg-blue-950/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs shadow">
                  RCA
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  Investigasi Akar Masalah & Rencana Tindakan CAPA
                </h4>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (isEditingCapa) {
                    handleSaveCAPA();
                  } else {
                    setIsEditingCapa(true);
                  }
                }}
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700 shadow transition-colors"
              >
                {isEditingCapa ? "Simpan Perubahan CAPA" : "Edit Formulir CAPA"}
              </button>
            </div>

            {/* 1. Root Cause Analysis */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                1. Analisis Akar Masalah (Root Cause Analysis / 5-Whys Method)
              </label>
              {isEditingCapa ? (
                <textarea
                  rows={3}
                  value={rcaText}
                  onChange={(e) => setRcaText(e.target.value)}
                  placeholder="Jelaskan faktor 5M (Man, Machine, Material, Method, Environment) yang menjadi penyebab utama kegagalan..."
                  className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              ) : (
                <div className="rounded-xl border border-gray-200 bg-white p-3 text-xs text-gray-800 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200">
                  {incident.rootCauseAnalysis || (
                    <span className="text-gray-400 italic">Belum diisi. Klik 'Edit Formulir CAPA' untuk menambahkan investigasi 5-Whys.</span>
                  )}
                </div>
              )}
            </div>

            {/* 2. Corrective Action */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                2. Tindakan Perbaikan Langsung (Corrective Action - Hilangkan Efek Ketidaksesuaian)
              </label>
              {isEditingCapa ? (
                <textarea
                  rows={2}
                  value={correctiveText}
                  onChange={(e) => setCorrectiveText(e.target.value)}
                  placeholder="Langkah perbaikan langsung yang diambil terhadap produk atau mesin yang bermasalah..."
                  className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              ) : (
                <div className="rounded-xl border border-gray-200 bg-white p-3 text-xs text-gray-800 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200">
                  {incident.correctiveAction || (
                    <span className="text-gray-400 italic">Belum diisi. Tentukan tindakan korektif perbaikan.</span>
                  )}
                </div>
              )}
            </div>

            {/* 3. Preventive Action */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                3. Tindakan Pencegahan Sistemik (Preventive Action - Cegah Kejadian Berulang)
              </label>
              {isEditingCapa ? (
                <textarea
                  rows={2}
                  value={preventiveText}
                  onChange={(e) => setPreventiveText(e.target.value)}
                  placeholder="Pembaruan SOP, kalibrasi ulang alat, pelatihan ulang staf, atau revisi parameter batas CCP..."
                  className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              ) : (
                <div className="rounded-xl border border-gray-200 bg-white p-3 text-xs text-gray-800 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200">
                  {incident.preventiveAction || (
                    <span className="text-gray-400 italic">Belum diisi. Tentukan tindakan pencegahan sistemik ISO 22000.</span>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* Digital Signature Pad for Verification & Close */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-850 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Verifikasi Penutupan CAPA oleh Lead QA Auditor
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Goreskan tanda tangan digital di bawah untuk mengesahkan bahwa tindakan CAPA efektif dan status ditutup (CLOSED).
                </p>
              </div>
              <button
                type="button"
                onClick={clearSignature}
                className="text-xs font-semibold text-rose-600 hover:underline"
              >
                Hapus Tanda Tangan
              </button>
            </div>

            <div className="flex justify-center">
              <canvas
                ref={canvasRef}
                width={480}
                height={120}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="rounded-xl border-2 border-dashed border-gray-400 bg-white shadow-inner cursor-crosshair touch-none dark:bg-gray-900"
              />
            </div>
            
            <div className="text-center text-[11px] text-gray-500">
              Assessor: <span className="font-bold text-gray-800 dark:text-gray-200">{incident.assignedAuditor}</span> • Terakreditasi KAN
            </div>
          </div>

        </div>

        {/* Footer & Status Progression Buttons */}
        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-850">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
            Status Terkini: <span className="font-bold">{incident.status}</span>
          </span>

          <div className="flex gap-2">
            {incident.status === "REPORTED" && (
              <button
                onClick={() => handleAdvanceStatus("UNDER_INVESTIGATION")}
                className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-amber-700 transition-colors"
              >
                Mulai Investigasi Akar Masalah
              </button>
            )}

            {incident.status === "UNDER_INVESTIGATION" && (
              <button
                onClick={() => handleAdvanceStatus("CAPA_IMPLEMENTED")}
                className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-blue-700 transition-colors"
              >
                Tetapkan & Terapkan Tindakan CAPA
              </button>
            )}

            {incident.status === "CAPA_IMPLEMENTED" && (
              <button
                onClick={() => handleAdvanceStatus("VERIFIED_CLOSED")}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-emerald-700 transition-colors"
              >
                Verifikasi Keberhasilan & Tutup Insiden (CLOSED)
              </button>
            )}

            <button
              onClick={onClose}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
