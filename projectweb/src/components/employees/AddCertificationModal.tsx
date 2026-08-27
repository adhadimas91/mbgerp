"use client";
import React, { useState } from "react";
import { EmployeeCertRecord } from "./CertificationMcuMatrix";
import { INITIAL_EMPLOYEES } from "./EmployeeRegistryTable";

interface AddCertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (record: EmployeeCertRecord) => void;
}

export default function AddCertificationModal({
  isOpen,
  onClose,
  onAdd,
}: AddCertificationModalProps) {
  const [selectedNip, setSelectedNip] = useState(INITIAL_EMPLOYEES[0].nip);
  const [certNumber, setCertNumber] = useState(`KEMENKES/FH/2026/${Math.floor(1000 + Math.random() * 9000)}`);
  const [issuer, setIssuer] = useState("Dinas Kesehatan DKI Jakarta");
  const [issuedDate, setIssuedDate] = useState("2026-08-20");
  const [expiryDate, setExpiryDate] = useState("2029-08-20");
  const [labName, setLabName] = useState("Labkesda DKI Jakarta");
  const [salmonellaResult, setSalmonellaResult] = useState<"NEGATIVE" | "POSITIVE">("NEGATIVE");
  const [xrayResult, setXrayResult] = useState<"CLEAR_FIT" | "SUSPECT">("CLEAR_FIT");
  const [hepAResult, setHepAResult] = useState<"NON_REACTIVE" | "REACTIVE">("NON_REACTIVE");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = INITIAL_EMPLOYEES.find((e) => e.nip === selectedNip) || INITIAL_EMPLOYEES[0];

    const newRecord: EmployeeCertRecord = {
      id: `CERT-REC-${Date.now()}`,
      employeeName: emp.name,
      nip: emp.nip,
      role: emp.roleLabel,
      sppgUnit: emp.sppgUnit.split("-")[0],
      foodHandlerCert: {
        number: certNumber,
        issuer,
        issuedDate,
        expiryDate,
        status: "VALID",
      },
      rectalSwabMcu: {
        labName,
        testDate: issuedDate,
        expiryDate: "2027-02-20",
        salmonellaResult,
        typhoidResult: "NEGATIVE",
        status: "VALID",
      },
      thoraxXray: {
        testDate: issuedDate,
        expiryDate: "2027-08-20",
        result: xrayResult,
        status: "VALID",
      },
      hepatitisATest: {
        testDate: issuedDate,
        result: hepAResult,
        status: "VALID",
      },
      overallStatus: (salmonellaResult === "NEGATIVE" && xrayResult === "CLEAR_FIT" && hepAResult === "NON_REACTIVE") ? "COMPLIANT_FIT" : "RESTRICTED",
    };

    onAdd(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Unggah Sertifikat & Hasil Uji Laboratorium
          </h3>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Pilih Tenaga Kerja *
            </label>
            <select
              value={selectedNip}
              onChange={(e) => setSelectedNip(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
            >
              {INITIAL_EMPLOYEES.map((emp) => (
                <option key={emp.id} value={emp.nip}>
                  {emp.name} ({emp.nip})
                </option>
              ))}
            </select>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-800/40 rounded-xl space-y-3">
            <div className="text-xs font-bold text-gray-800 dark:text-gray-200">
              Data Sertifikat Penjamah Makanan Kemenkes RI
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Nomor Registrasi Sertifikat
              </label>
              <input
                type="text"
                value={certNumber}
                onChange={(e) => setCertNumber(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] text-gray-600 dark:text-gray-400 mb-1">Tanggal Terbit</label>
                <input
                  type="date"
                  value={issuedDate}
                  onChange={(e) => setIssuedDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-600 dark:text-gray-400 mb-1">Berlaku Hingga</label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-800/40 rounded-xl space-y-3">
            <div className="text-xs font-bold text-gray-800 dark:text-gray-200">
              Hasil Pengujian Laboratorium Patologi & Mikrobiologi
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Nama Laboratorium Penguji
              </label>
              <input
                type="text"
                value={labName}
                onChange={(e) => setLabName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <label className="block text-[10px] text-gray-500 mb-1">Swab Salmonella</label>
                <select
                  value={salmonellaResult}
                  onChange={(e) => setSalmonellaResult(e.target.value as "NEGATIVE" | "POSITIVE")}
                  className="w-full px-2 py-1.5 text-xs bg-white dark:bg-gray-800 border border-gray-200 rounded-lg"
                >
                  <option value="NEGATIVE">Negatif (Fit)</option>
                  <option value="POSITIVE">Positif (Unfit)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 mb-1">Rontgen Toraks</label>
                <select
                  value={xrayResult}
                  onChange={(e) => setXrayResult(e.target.value as "CLEAR_FIT" | "SUSPECT")}
                  className="w-full px-2 py-1.5 text-xs bg-white dark:bg-gray-800 border border-gray-200 rounded-lg"
                >
                  <option value="CLEAR_FIT">Bebas TBC</option>
                  <option value="SUSPECT">Suspek</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 mb-1">Hepatitis A</label>
                <select
                  value={hepAResult}
                  onChange={(e) => setHepAResult(e.target.value as "NON_REACTIVE" | "REACTIVE")}
                  className="w-full px-2 py-1.5 text-xs bg-white dark:bg-gray-800 border border-gray-200 rounded-lg"
                >
                  <option value="NON_REACTIVE">Non-Reaktif</option>
                  <option value="REACTIVE">Reaktif</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-brand-500 rounded-xl hover:bg-brand-600 shadow-theme-xs cursor-pointer"
            >
              Simpan & Rekam Data Mutu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
