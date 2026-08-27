"use client";

import React, { useState, useEffect } from "react";
import { RoleDefinition } from "./RoleManagementDashboard";

interface CreateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveRole: (roleData: Partial<RoleDefinition>) => void;
  roleToEdit: RoleDefinition | null;
}

const ALL_MODULES = [
  "Supplier & Vendor Management",
  "Gudang, Stok & Cold Chain IoT",
  "Menu, Resep & Nutrisi AKG",
  "Dapur Sentral SPPG (Lini Masak & SPM)",
  "Logistik, Rute & Proof of Delivery",
  "Manajemen Aset Tetap & Servis",
  "SDM, Tenaga Kerja & Payroll Dapur",
  "Finansial, Anggaran DPA & Pembayaran",
  "Audit Trail Forensik & Kepatuhan ISO",
  "Pengguna, Peran & Keamanan Sistem",
];

export default function CreateRoleModal({
  isOpen,
  onClose,
  onSaveRole,
  roleToEdit,
}: CreateRoleModalProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState<RoleDefinition["category"]>("OPERASIONAL_DAPUR");
  const [description, setDescription] = useState("");
  const [riskLevel, setRiskLevel] = useState<RoleDefinition["riskLevel"]>("MEDIUM");
  const [enforce2fa, setEnforce2fa] = useState(true);
  const [sessionTimeoutMinutes, setSessionTimeoutMinutes] = useState(60);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (roleToEdit) {
      setName(roleToEdit.name);
      setCode(roleToEdit.code);
      setCategory(roleToEdit.category);
      setDescription(roleToEdit.description);
      setRiskLevel(roleToEdit.riskLevel);
      setEnforce2fa(roleToEdit.enforce2fa);
      setSessionTimeoutMinutes(roleToEdit.sessionTimeoutMinutes);
      setSelectedModules(roleToEdit.accessibleModules.map((m) => m.name));
    } else {
      setName("");
      setCode("ROLE_CUSTOM_");
      setCategory("OPERASIONAL_DAPUR");
      setDescription("");
      setRiskLevel("MEDIUM");
      setEnforce2fa(true);
      setSessionTimeoutMinutes(60);
      setSelectedModules([
        "Gudang, Stok & Cold Chain IoT",
        "Dapur Sentral SPPG (Lini Masak & SPM)",
      ]);
    }
    setErrors({});
  }, [roleToEdit, isOpen]);

  if (!isOpen) return null;

  const toggleModule = (modName: string) => {
    setSelectedModules((prev) =>
      prev.includes(modName) ? prev.filter((m) => m !== modName) : [...prev, modName]
    );
  };

  const handleSelectAll = () => {
    setSelectedModules(ALL_MODULES);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Nama peran wajib diisi.";
    if (!code.trim()) newErrors.code = "Kode peran (Slug) wajib diisi.";
    if (!description.trim()) newErrors.description = "Deskripsi tugas & tanggung jawab wajib diisi.";
    if (selectedModules.length === 0) newErrors.modules = "Pilih minimal 1 modul hak akses.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSaveRole({
      ...(roleToEdit ? { id: roleToEdit.id } : {}),
      name,
      code: code.toUpperCase().replace(/\s+/g, "_"),
      category,
      description,
      riskLevel,
      enforce2fa,
      sessionTimeoutMinutes: Number(sessionTimeoutMinutes),
      moduleAccessCount: selectedModules.length,
      accessibleModules: selectedModules.map((m) => ({
        name: m,
        permissions: ["READ", "CREATE", "UPDATE"],
      })),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl dark:bg-gray-900 dark:border dark:border-gray-800 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {roleToEdit ? "Ubah Definisi & Wewenang Peran" : "Buat Definisi Peran Sistem Baru"}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Pemberian wewenang akses modul & tingkat risiko kepatuhan ISO 27001
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 p-2 text-gray-500 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Nama & Kode Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Nama Peran (Role Name) *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Koordinator Logistik Kecamatan"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Kode Peran (Role Slug / Enum) *
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="KOORDINATOR_LOGISTIK"
                  className="w-full font-mono uppercase rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                {errors.code && <p className="text-[11px] text-red-600 mt-1">{errors.code}</p>}
              </div>
            </div>

            {/* Kategori & Tingkat Risiko */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Kategori Wewenang
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as RoleDefinition["category"])}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="PUSAT_EKSEKUTIF">Pusat & Eksekutif BGN</option>
                  <option value="REGIONAL_WILAYAH">Regional & Wilayah</option>
                  <option value="OPERASIONAL_DAPUR">Operasional Dapur Sentral</option>
                  <option value="MUTU_GIZI_QC">Mutu, Gizi & Kepatuhan ISO</option>
                  <option value="KEUANGAN_PPK">Keuangan & Otorisasi SP2D</option>
                  <option value="LOGISTIK_ARMADA">Logistik & Armada Distribusi</option>
                  <option value="EKSTERNAL_VENDOR">Eksternal & Rekanan Vendor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Tingkat Risiko Keamanan (ISO 27001)
                </label>
                <select
                  value={riskLevel}
                  onChange={(e) => setRiskLevel(e.target.value as RoleDefinition["riskLevel"])}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="LOW">LOW (Akses Terbatas / Read-Only)</option>
                  <option value="MEDIUM">MEDIUM (Operasional Standar)</option>
                  <option value="HIGH">HIGH (Otorisasi Transaksi / Keuangan)</option>
                  <option value="CRITICAL">CRITICAL (Superadmin / Master Data)</option>
                </select>
              </div>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Deskripsi Tugas & Tanggung Jawab *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                placeholder="Jelaskan ruang lingkup wewenang, batasan aksi, dan tanggung jawab operasional..."
                className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              {errors.description && <p className="text-[11px] text-red-600 mt-1">{errors.description}</p>}
            </div>

            {/* Security Parameters: 2FA & Timeout */}
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Parameter Keamanan Sesi (ISO 27001)
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-gray-900 dark:text-white">
                      Wajibkan 2FA (MFA)
                    </div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400">
                      Wajib untuk peran berisiko Medium-Critical.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={enforce2fa}
                    onChange={(e) => setEnforce2fa(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
                    Batas Waktu Sesi (Timeout)
                  </label>
                  <select
                    value={sessionTimeoutMinutes}
                    onChange={(e) => setSessionTimeoutMinutes(Number(e.target.value))}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <option value={15}>15 Menit (Super Sensitif)</option>
                    <option value={30}>30 Menit (Finansial / PPK)</option>
                    <option value={60}>60 Menit (Standar)</option>
                    <option value={120}>120 Menit (Operasional Dapur)</option>
                    <option value={480}>480 Menit / 8 Jam (Shift Driver)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modul Access Checkboxes */}
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Cakupan Modul yang Dapat Diakses *
                  </h5>
                  <span className="text-[11px] text-gray-500">
                    {selectedModules.length} dari {ALL_MODULES.length} modul terpilih
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300"
                >
                  Pilih Semua
                </button>
              </div>

              {errors.modules && <p className="text-[11px] text-red-600">{errors.modules}</p>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {ALL_MODULES.map((mod) => (
                  <label
                    key={mod}
                    className={`flex items-center gap-2.5 rounded-lg border p-2.5 cursor-pointer transition-colors ${
                      selectedModules.includes(mod)
                        ? "border-indigo-300 bg-indigo-50/40 dark:border-indigo-800/60 dark:bg-indigo-900/10"
                        : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-800/40"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedModules.includes(mod)}
                      onChange={() => toggleModule(mod)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="font-medium text-gray-800 dark:text-gray-200">{mod}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
            >
              {roleToEdit ? "Simpan Perubahan Peran" : "Buat Definisi Peran"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
