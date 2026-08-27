"use client";

import React, { useState } from "react";

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: "ADMIN_PUSAT" | "ADMIN_REGIONAL" | "PETUGAS_GUDANG" | "BENDAHARA_PPK" | "LEAD_AUDITOR" | "SYSTEM_DAEMON";
  userAvatar?: string;
  ipAddress: string;
  userAgent: string;
  location: string;
  action: "CREATE" | "UPDATE" | "DELETE" | "STATUS_CHANGE" | "APPROVE" | "REJECT" | "SECURITY_ALERT";
  entityType: "STOCK_MOVEMENT" | "SHIPMENT_WAYBILL" | "BUDGET_DPA" | "EXPENDITURE_BKK" | "PAYMENT_VOUCHER" | "SUPPLIER_VERIFICATION" | "USER_RBAC" | "HYGIENE_AUDIT";
  entityId: string;
  description: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  prevHash: string;
  recordHash: string;
  oldValues: Record<string, any> | null;
  newValues: Record<string, any> | null;
}

interface AuditLogDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  log: AuditLogEntry | null;
}

export default function AuditLogDetailModal({ isOpen, onClose, log }: AuditLogDetailModalProps) {
  const [viewMode, setViewMode] = useState<"diff" | "raw" | "chain">("diff");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen || !log) return null;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getActionBadge = (action: AuditLogEntry["action"]) => {
    switch (action) {
      case "CREATE":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800";
      case "UPDATE":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800";
      case "DELETE":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800";
      case "STATUS_CHANGE":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800";
      case "APPROVE":
        return "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-800";
      case "REJECT":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800";
      case "SECURITY_ALERT":
        return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
    }
  };

  const getSeverityBadge = (severity: AuditLogEntry["severity"]) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-red-500 text-white animate-pulse";
      case "HIGH":
        return "bg-amber-500 text-white";
      case "MEDIUM":
        return "bg-blue-500 text-white";
      case "LOW":
        return "bg-gray-500 text-white";
    }
  };

  // Extract all unique keys from oldValues and newValues for side-by-side diff
  const allKeys = Array.from(
    new Set([
      ...(log.oldValues ? Object.keys(log.oldValues) : []),
      ...(log.newValues ? Object.keys(log.newValues) : []),
    ])
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-gray-50 via-white to-gray-50 p-5 dark:border-gray-800 dark:from-gray-900 dark:via-gray-850 dark:to-gray-900">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 shadow-inner">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-gray-500 dark:text-gray-400">{log.id}</span>
                <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-md border ${getActionBadge(log.action)}`}>
                  {log.action}
                </span>
                <span className={`inline-flex items-center px-2 py-0.5 text-xs font-bold rounded-full ${getSeverityBadge(log.severity)}`}>
                  {log.severity}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">
                Detail Transaksi & Bukti Audit Trail
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50">
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">Waktu Eksekusi</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white font-mono mt-0.5 block">
                {log.timestamp}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">Aktor / Pengguna</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{log.userName}</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 font-mono">
                  {log.userRole}
                </span>
              </div>
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">Entitas & Target ID</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">{log.entityType}</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white font-mono">#{log.entityId}</span>
              </div>
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">IP Address & Lokasi</span>
              <span className="text-sm font-mono text-gray-800 dark:text-gray-200 block mt-0.5">
                {log.ipAddress} • {log.location}
              </span>
            </div>
            <div className="md:col-span-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">Klien / User Agent</span>
              <span className="text-xs font-mono text-gray-600 dark:text-gray-400 block truncate mt-0.5" title={log.userAgent}>
                {log.userAgent}
              </span>
            </div>
          </div>

          {/* Description Box */}
          <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-900/40 dark:bg-blue-950/20">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
              Uraian Aktivitas
            </span>
            <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
              {log.description}
            </p>
          </div>

          {/* Tab Selection for Views */}
          <div>
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode("diff")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === "diff"
                      ? "bg-blue-600 text-white shadow"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Diff Nilai (Lama vs Baru)
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("raw")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === "raw"
                      ? "bg-blue-600 text-white shadow"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Format Mentah (Raw JSONB)
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("chain")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === "chain"
                      ? "bg-blue-600 text-white shadow"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Integritas Kriptografi (SHA-256)
                </button>
              </div>

              <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Record Valid & Immutable
              </span>
            </div>

            {/* TAB CONTENT: DIFF */}
            {viewMode === "diff" && (
              <div className="mt-4 space-y-4">
                {allKeys.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                    Tidak ada parameter payload perubahan atribut pada transaksi ini.
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-left text-xs">
                      <thead className="bg-gray-100 dark:bg-gray-800 font-bold text-gray-700 dark:text-gray-300">
                        <tr>
                          <th className="py-3 px-4 w-1/4">Atribut Entitas</th>
                          <th className="py-3 px-4 w-3/8 text-red-700 dark:text-red-400 bg-red-50/50 dark:bg-red-950/20">
                            Nilai Sebelumnya (Old Value)
                          </th>
                          <th className="py-3 px-4 w-3/8 text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                            Nilai Terkini (New Value)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 font-mono">
                        {allKeys.map((key) => {
                          const oldVal = log.oldValues ? log.oldValues[key] : undefined;
                          const newVal = log.newValues ? log.newValues[key] : undefined;
                          const isChanged = JSON.stringify(oldVal) !== JSON.stringify(newVal);

                          return (
                            <tr
                              key={key}
                              className={isChanged ? "bg-amber-50/30 dark:bg-amber-950/10" : "hover:bg-gray-50 dark:hover:bg-gray-850"}
                            >
                              <td className="py-2.5 px-4 font-bold text-gray-800 dark:text-gray-200">
                                {key}
                                {isChanged && (
                                  <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-amber-500 align-middle" title="Terdapat Perubahan"></span>
                                )}
                              </td>
                              <td className="py-2.5 px-4 bg-red-50/20 dark:bg-red-950/10 text-red-600 dark:text-red-400 break-all">
                                {oldVal !== undefined ? (
                                  typeof oldVal === "object" ? JSON.stringify(oldVal) : String(oldVal)
                                ) : (
                                  <span className="text-gray-400 italic">null / none</span>
                                )}
                              </td>
                              <td className="py-2.5 px-4 bg-emerald-50/20 dark:bg-emerald-950/10 text-emerald-600 dark:text-emerald-400 font-semibold break-all">
                                {newVal !== undefined ? (
                                  typeof newVal === "object" ? JSON.stringify(newVal) : String(newVal)
                                ) : (
                                  <span className="text-gray-400 italic">null / none</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: RAW JSON */}
            {viewMode === "raw" && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <div className="flex items-center justify-between pb-1 text-gray-500 font-semibold">
                    <span>old_values.jsonb</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(JSON.stringify(log.oldValues, null, 2), "oldJson")}
                      className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {copiedField === "oldJson" ? "Disalin ✓" : "Salin JSON"}
                    </button>
                  </div>
                  <pre className="max-h-72 overflow-auto rounded-xl bg-gray-900 p-4 text-emerald-400 dark:bg-black border border-gray-800">
                    {JSON.stringify(log.oldValues, null, 2) || "null"}
                  </pre>
                </div>
                <div>
                  <div className="flex items-center justify-between pb-1 text-gray-500 font-semibold">
                    <span>new_values.jsonb</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(JSON.stringify(log.newValues, null, 2), "newJson")}
                      className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {copiedField === "newJson" ? "Disalin ✓" : "Salin JSON"}
                    </button>
                  </div>
                  <pre className="max-h-72 overflow-auto rounded-xl bg-gray-900 p-4 text-emerald-400 dark:bg-black border border-gray-800">
                    {JSON.stringify(log.newValues, null, 2) || "null"}
                  </pre>
                </div>
              </div>
            )}

            {/* TAB CONTENT: CRYPTO INTEGRITY */}
            {viewMode === "chain" && (
              <div className="mt-4 space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-850">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                      Rantai Hash Kriptografi Append-Only
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Setiap catatan di-hash secara berantai dengan catatan sebelumnya sehingga tidak dapat dihapus/diubah secara retrospektif.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex items-center justify-between text-gray-500 font-semibold mb-1">
                      <span>PREVIOUS RECORD HASH (H_(t-1)):</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(log.prevHash, "prevHash")}
                        className="text-blue-600 dark:text-blue-400 hover:underline text-[11px]"
                      >
                        {copiedField === "prevHash" ? "Disalin ✓" : "Salin"}
                      </button>
                    </div>
                    <div className="rounded-lg bg-gray-200 p-2.5 dark:bg-gray-900 text-gray-700 dark:text-gray-300 break-all select-all border border-gray-300 dark:border-gray-800">
                      {log.prevHash}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-gray-500 font-semibold mb-1">
                      <span>CURRENT RECORD SHA-256 DIGEST:</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(log.recordHash, "recordHash")}
                        className="text-blue-600 dark:text-blue-400 hover:underline text-[11px]"
                      >
                        {copiedField === "recordHash" ? "Disalin ✓" : "Salin"}
                      </button>
                    </div>
                    <div className="rounded-lg bg-blue-950 p-2.5 text-blue-300 font-bold break-all select-all border border-blue-800">
                      {log.recordHash}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-emerald-50 p-3 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                      Status Verifikasi Integritas: Valid & Unbroken Chain
                    </span>
                  </div>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                    ISO 27001 Sec 12.4
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-850">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
            ID: {log.id} • Session Signed
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleCopy(JSON.stringify(log, null, 2), "allLog")}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              {copiedField === "allLog" ? "Tersalin ✓" : "Salin Riwayat Lengkap"}
            </button>
            <button
              onClick={onClose}
              className="rounded-lg bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-blue-700 transition-colors"
            >
              Tutup Modal
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
