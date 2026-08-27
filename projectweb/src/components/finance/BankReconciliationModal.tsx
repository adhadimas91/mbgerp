"use client";

import React, { useState } from "react";

interface BankReconciliationEntry {
  id: string;
  trxDate: string;
  bankRef: string;
  description: string;
  type: "DEBIT" | "CREDIT";
  amount: number;
  erpRecordRef?: string;
  matchStatus: "MATCHED" | "UNMATCHED" | "ADJUSTED";
}

const INITIAL_BANK_MUTATIONS: BankReconciliationEntry[] = [
  {
    id: "MUT-001",
    trxDate: "2026-08-25",
    bankRef: "TRX-BNI-20260825-0101",
    description: "RTGS Out - PT Segar Pangan Nusantara (Faktur INV-SPN-0819)",
    type: "DEBIT",
    amount: 19783725,
    erpRecordRef: "SPJ-MBG-2026-0801",
    matchStatus: "MATCHED",
  },
  {
    id: "MUT-002",
    trxDate: "2026-08-25",
    bankRef: "TRX-MDR-20260825-8812",
    description: "VA Out - PT Pertamina Patra Niaga Refill LPG",
    type: "DEBIT",
    amount: 11655000,
    erpRecordRef: "SPJ-MBG-2026-0802",
    matchStatus: "MATCHED",
  },
  {
    id: "MUT-003",
    trxDate: "2026-08-26",
    bankRef: "TRX-KASDA-20260826-004",
    description: "Droping Dana SP2D APBN MBG Tahap II dari KPPN",
    type: "CREDIT",
    amount: 2500000000,
    erpRecordRef: "DPA-MBG-2026-JKTPUSAT",
    matchStatus: "MATCHED",
  },
  {
    id: "MUT-004",
    trxDate: "2026-08-27",
    bankRef: "ADM-BANK-20260827-01",
    description: "Biaya Administrasi Pengelolaan Rekening Giro Giro Mandiri",
    type: "DEBIT",
    amount: 25000,
    erpRecordRef: "ADJUST-ADM-08",
    matchStatus: "MATCHED",
  },
  {
    id: "MUT-005",
    trxDate: "2026-08-27",
    bankRef: "TRX-BRI-20260827-9941",
    description: "Kliring Out - CV Telur Jaya Barokah (INV-TJB-88)",
    type: "DEBIT",
    amount: 34500000,
    erpRecordRef: "-",
    matchStatus: "UNMATCHED",
  },
];

interface BankReconciliationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BankReconciliationModal({
  isOpen,
  onClose,
}: BankReconciliationModalProps) {
  const [mutations, setMutations] = useState<BankReconciliationEntry[]>(INITIAL_BANK_MUTATIONS);

  if (!isOpen) return null;

  const totalBankDebit = mutations.filter((m) => m.type === "DEBIT").reduce((a, b) => a + b.amount, 0);
  const totalBankCredit = mutations.filter((m) => m.type === "CREDIT").reduce((a, b) => a + b.amount, 0);
  const matchedCount = mutations.filter((m) => m.matchStatus === "MATCHED").length;
  const unmatchedCount = mutations.filter((m) => m.matchStatus === "UNMATCHED").length;

  const handleToggleMatch = (id: string) => {
    setMutations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            matchStatus: item.matchStatus === "MATCHED" ? "UNMATCHED" : "MATCHED",
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl transition-all dark:border-gray-800 dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Rekonsiliasi Bank & Rekening Koran Kas MBG
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Pencocokan mutasi kas rekening giro Bank Penyalur dengan Buku Kas Umum (BKU) ERP MBG.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Balance Status Banner */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-800/40">
            <span className="text-xs text-gray-500">Total Mutasi Kredit (Penerimaan)</span>
            <p className="mt-0.5 text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              + Rp {totalBankCredit.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-800/40">
            <span className="text-xs text-gray-500">Total Mutasi Debit (Pengeluaran)</span>
            <p className="mt-0.5 text-base font-bold text-red-600 dark:text-red-400 font-mono">
              - Rp {totalBankDebit.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3 dark:border-blue-900/40 dark:bg-blue-950/20">
            <span className="text-xs text-blue-700 dark:text-blue-300">Status Rekonsiliasi</span>
            <p className="mt-0.5 text-sm font-extrabold text-blue-700 dark:text-blue-300">
              {matchedCount} Cocok / {unmatchedCount} Outstanding
            </p>
          </div>
        </div>

        {/* Bank Mutations Table */}
        <div className="mt-4 rounded-xl border border-gray-200 bg-white overflow-hidden dark:border-gray-800 dark:bg-gray-800/30">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 uppercase">
                <tr>
                  <th className="py-2.5 px-3">Tanggal & Ref Bank</th>
                  <th className="py-2.5 px-3">Deskripsi Mutasi Rekening Koran</th>
                  <th className="py-2.5 px-3 text-right">Nominal (Rp)</th>
                  <th className="py-2.5 px-3">Ref ERP BKU</th>
                  <th className="py-2.5 px-3 text-center">Status Match</th>
                  <th className="py-2.5 px-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {mutations.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-gray-900 dark:text-white">{m.trxDate}</div>
                      <div className="font-mono text-[10px] text-gray-400">{m.bankRef}</div>
                    </td>
                    <td className="py-2.5 px-3 max-w-xs font-medium text-gray-800 dark:text-gray-200">
                      {m.description}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold">
                      <span className={m.type === "CREDIT" ? "text-emerald-600" : "text-gray-900 dark:text-white"}>
                        {m.type === "CREDIT" ? "+" : "-"} Rp {m.amount.toLocaleString("id-ID")}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-gray-500">
                      {m.erpRecordRef || "-"}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold ${
                        m.matchStatus === "MATCHED"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                      }`}>
                        {m.matchStatus === "MATCHED" ? "✓ Matched" : "⚠ Outstanding"}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => handleToggleMatch(m.id)}
                        className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400"
                      >
                        {m.matchStatus === "MATCHED" ? "Batalkan" : "Cocokkan"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
          <span className="text-xs text-gray-500">
            Terakhir disinkronkan dengan API Open Banking Bank Mandiri/BRI: Hari ini 16:30 WIB
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            Selesai Rekonsiliasi
          </button>
        </div>
      </div>
    </div>
  );
}
