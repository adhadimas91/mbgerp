"use client";
import React, { useState } from "react";
import Badge from "../ui/badge/Badge";

interface VerificationItem {
  id: string;
  vendorName: string;
  category: string;
  submissionDate: string;
  docs: {
    nib: { name: string; status: "VALID" | "INVALID" | "PENDING" };
    halal: { name: string; expiry: string; status: "VALID" | "EXPIRING_SOON" | "EXPIRED" };
    iso22000: { name: string; expiry: string; status: "VALID" | "EXPIRING_SOON" | "EXPIRED" };
    bpom: { name: string; expiry: string; status: "VALID" | "EXPIRING_SOON" | "EXPIRED" };
  };
  auditScore: number;
  overallStatus: "PENDING_AUDIT" | "APPROVED" | "REVISION_REQUIRED";
}

const initialQueue: VerificationItem[] = [
  {
    id: "VER-2026-001",
    vendorName: "PT. Agro Unggas Perkasa",
    category: "Protein Hewani (Daging Ayam & Telur)",
    submissionDate: "24 Feb 2026",
    docs: {
      nib: { name: "NIB_0288192837.pdf", status: "VALID" },
      halal: { name: "Halal_MUI_00192837.pdf", expiry: "18 Des 2027", status: "VALID" },
      iso22000: { name: "ISO_22000_SGS_2025.pdf", expiry: "15 Apr 2026", status: "EXPIRING_SOON" },
      bpom: { name: "IzinEdar_BPOM_RI.pdf", expiry: "10 Nov 2028", status: "VALID" },
    },
    auditScore: 92,
    overallStatus: "PENDING_AUDIT",
  },
  {
    id: "VER-2026-002",
    vendorName: "CV. Berkah Tani Organik",
    category: "Sayuran Segar & Buah",
    submissionDate: "25 Feb 2026",
    docs: {
      nib: { name: "NIB_9918273645.pdf", status: "VALID" },
      halal: { name: "Halal_BPJPH_2026.pdf", expiry: "05 Mei 2028", status: "VALID" },
      iso22000: { name: "HACCP_Audit_Report.pdf", expiry: "22 Agu 2027", status: "VALID" },
      bpom: { name: "Prima_3_Kementan.pdf", expiry: "14 Jun 2027", status: "VALID" },
    },
    auditScore: 96,
    overallStatus: "PENDING_AUDIT",
  },
  {
    id: "VER-2026-003",
    vendorName: "UD. Mina Samudra Cemerlang",
    category: "Protein Hewani (Ikan Segar & Fillet)",
    submissionDate: "20 Feb 2026",
    docs: {
      nib: { name: "NIB_7726354182.pdf", status: "VALID" },
      halal: { name: "Sertifikat_Halal_Mina.pdf", expiry: "10 Jan 2026", status: "EXPIRED" },
      iso22000: { name: "Cold_Chain_Cert.pdf", expiry: "30 Mar 2026", status: "EXPIRING_SOON" },
      bpom: { name: "SKP_KKP_Laut.pdf", expiry: "12 Okt 2026", status: "VALID" },
    },
    auditScore: 68,
    overallStatus: "REVISION_REQUIRED",
  },
];

export const SupplierVerificationQueue: React.FC = () => {
  const [queue, setQueue] = useState<VerificationItem[]>(initialQueue);
  const [selectedItem, setSelectedItem] = useState<VerificationItem | null>(null);
  const [feedbackNote, setFeedbackNote] = useState("");

  const handleApprove = (id: string) => {
    setQueue(queue.map((item) => (item.id === id ? { ...item, overallStatus: "APPROVED" } : item)));
    setSelectedItem(null);
  };

  const handleReject = (id: string) => {
    setQueue(queue.map((item) => (item.id === id ? { ...item, overallStatus: "REVISION_REQUIRED" } : item)));
    setSelectedItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Alert banner ISO Compliance */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-emerald-500 p-2 text-white shadow-sm">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
              Protokol Verifikasi Standar Kepatuhan ISO 22000 / HACCP & BPOM
            </h4>
            <p className="mt-1 text-xs text-emerald-800/80 dark:text-emerald-400">
              Seluruh vendor pengadaan wajib memiliki sertifikasi keamanan pangan yang aktif. Masa berlaku sertifikat di bawah 30 hari akan memicu notifikasi pembaruan otomatis ke sistem vendor.
            </p>
          </div>
        </div>
      </div>

      {/* Queue Table */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-gray-800 dark:text-white">
              Antrean Verifikasi Legalitas & Sertifikasi Vendor
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Review keabsahan dokumen NIB, Sertifikat Halal, ISO 22000, dan izin edar
            </p>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20">
            {queue.filter((q) => q.overallStatus === "PENDING_AUDIT").length} Menunggu Audit
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-[11px] font-semibold uppercase text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <th className="pb-3">No. Antrean & Vendor</th>
                <th className="pb-3 px-3">Komoditas Bahan</th>
                <th className="pb-3 px-3">Status Dokumen & Masa Berlaku</th>
                <th className="pb-3 px-3">Skor Audit Mutu</th>
                <th className="pb-3 px-3">Status Verifikasi</th>
                <th className="pb-3 pl-3 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
              {queue.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01]">
                  <td className="py-4 pr-4">
                    <span className="font-semibold text-gray-900 dark:text-white block text-sm">
                      {item.vendorName}
                    </span>
                    <span className="font-mono text-[11px] text-gray-400">
                      {item.id} • Diajukan: {item.submissionDate}
                    </span>
                  </td>

                  <td className="py-4 px-3 text-gray-700 dark:text-gray-300 font-medium">
                    {item.category}
                  </td>

                  <td className="py-4 px-3">
                    <div className="space-y-1 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span className="text-gray-500 w-16">Halal:</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          Exp. {item.docs.halal.expiry}
                        </span>
                        {item.docs.halal.status === "EXPIRED" ? (
                          <span className="px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 text-[10px] font-bold dark:bg-rose-500/20 dark:text-rose-400">
                            Kadaluarsa
                          </span>
                        ) : (
                          <span className="text-emerald-600 dark:text-emerald-400 text-xs">✓</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-gray-500 w-16">ISO 22000:</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          Exp. {item.docs.iso22000.expiry}
                        </span>
                        {item.docs.iso22000.status === "EXPIRING_SOON" && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-700 text-[10px] font-bold dark:bg-amber-500/20 dark:text-amber-400">
                            &lt; 60 Hari
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.auditScore >= 90
                              ? "bg-emerald-500"
                              : item.auditScore >= 75
                              ? "bg-amber-500"
                              : "bg-rose-500"
                          }`}
                          style={{ width: `${item.auditScore}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {item.auditScore}%
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-3">
                    {item.overallStatus === "APPROVED" ? (
                      <Badge color="success" size="sm">Disetujui</Badge>
                    ) : item.overallStatus === "PENDING_AUDIT" ? (
                      <Badge color="warning" size="sm">Menunggu Audit</Badge>
                    ) : (
                      <Badge color="error" size="sm">Perlu Revisi Dokumen</Badge>
                    )}
                  </td>

                  <td className="py-4 pl-3 text-right">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="rounded-lg bg-gray-100 px-3 py-1.5 font-semibold text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition"
                    >
                      Audit Berkas
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 dark:bg-gray-900 dark:border dark:border-gray-800 shadow-2xl">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute right-5 top-5 text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="border-b border-gray-100 pb-3 dark:border-gray-800">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Review Audit Dokumen & Kepatuhan ISO Vendor
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {selectedItem.vendorName} ({selectedItem.id})
              </p>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800 dark:text-white">1. NIB & Legalitas OSS</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ Valid Terverifikasi</span>
                </div>
                <p className="text-gray-500 text-[11px]">File: {selectedItem.docs.nib.name}</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800 dark:text-white">2. Sertifikat Halal MUI / BPJPH</span>
                  <span className="text-gray-600 dark:text-gray-300">Exp. {selectedItem.docs.halal.expiry}</span>
                </div>
                <p className="text-gray-500 text-[11px]">File: {selectedItem.docs.halal.name}</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800 dark:text-white">3. Standar Keamanan Pangan ISO 22000 / HACCP</span>
                  <span className="text-gray-600 dark:text-gray-300">Exp. {selectedItem.docs.iso22000.expiry}</span>
                </div>
                <p className="text-gray-500 text-[11px]">File: {selectedItem.docs.iso22000.name}</p>
              </div>

              <div>
                <label className="mb-1 block font-medium text-gray-700 dark:text-gray-300">
                  Catatan Auditor / Rekomendasi CAPA:
                </label>
                <textarea
                  rows={2}
                  placeholder="Tuliskan catatan verifikasi atau alasan bila memerlukan revisi..."
                  value={feedbackNote}
                  onChange={(e) => setFeedbackNote(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-transparent p-2.5 text-xs text-gray-800 focus:border-emerald-500 focus:outline-none dark:border-gray-700 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => handleReject(selectedItem.id)}
                  className="rounded-xl bg-rose-50 px-4 py-2 font-semibold text-rose-700 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-300 transition"
                >
                  Minta Revisi Berkas
                </button>
                <button
                  onClick={() => handleApprove(selectedItem.id)}
                  className="rounded-xl bg-emerald-600 px-5 py-2 font-semibold text-white hover:bg-emerald-700 shadow-sm transition"
                >
                  Setujui & Terbitkan Izin Suplai
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierVerificationQueue;
