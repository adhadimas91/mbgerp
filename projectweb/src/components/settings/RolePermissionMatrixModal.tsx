"use client";

import React, { useState } from "react";
import { UserAccount, UserRole } from "./UserManagementTable";

interface ModulePermission {
  moduleKey: string;
  moduleName: string;
  category: "OPERASIONAL" | "TATA_KELOLA" | "SISTEM";
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canApprove: boolean;
  canExport: boolean;
  canPrint: boolean;
}

interface RolePermissionMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount | null;
  onSavePermissions: (userId: string, permissions: ModulePermission[]) => void;
}

const DEFAULT_MODULES: { key: string; name: string; category: "OPERASIONAL" | "TATA_KELOLA" | "SISTEM" }[] = [
  { key: "SUPPLIERS", name: "Modul 1: Supplier & Vendor Management", category: "OPERASIONAL" },
  { key: "INVENTORY", name: "Modul 2: Gudang, Stok & Cold Chain IoT", category: "OPERASIONAL" },
  { key: "MENU_NUTRITION", name: "Modul 3: Menu, Resep & Nutrisi AKG", category: "OPERASIONAL" },
  { key: "KITCHEN_SPPG", name: "Modul Dapur: Dashboard Dapur Sentral SPPG", category: "OPERASIONAL" },
  { key: "LOGISTICS", name: "Modul 4: Logistik, Live GPS & Proof of Delivery", category: "OPERASIONAL" },
  { key: "ASSETS", name: "Modul 5: Manajemen Aset Tetap & Higienitas", category: "OPERASIONAL" },
  { key: "EMPLOYEES", name: "Modul 8: SDM, Tenaga Kerja Dapur & Payroll", category: "OPERASIONAL" },
  { key: "FINANCE", name: "Modul 6: Finansial, Anggaran DPA & Pembayaran", category: "TATA_KELOLA" },
  { key: "COMPLIANCE", name: "Modul 7: Kualitas, ISO & Immutable Audit Trail", category: "TATA_KELOLA" },
  { key: "SETTINGS_RBAC", name: "Modul 9: Pengguna & Keamanan Sistem (RBAC)", category: "SISTEM" },
];

export function getInitialRolePermissions(role: UserRole): ModulePermission[] {
  return DEFAULT_MODULES.map((m) => {
    let canRead = true;
    let canCreate = false;
    let canUpdate = false;
    let canDelete = false;
    let canApprove = false;
    let canExport = true;
    let canPrint = true;

    if (role === "ADMIN_PUSAT") {
      canRead = true;
      canCreate = true;
      canUpdate = true;
      canDelete = true;
      canApprove = true;
      canExport = true;
      canPrint = true;
    } else if (role === "ADMIN_REGIONAL") {
      canRead = true;
      canCreate = true;
      canUpdate = true;
      canDelete = false;
      canApprove = true;
      canExport = true;
      canPrint = true;
    } else if (role === "KEPALA_SPPG") {
      if (["KITCHEN_SPPG", "INVENTORY", "MENU_NUTRITION", "LOGISTICS", "ASSETS", "EMPLOYEES"].includes(m.key)) {
        canCreate = true;
        canUpdate = true;
        canApprove = true;
      }
      if (m.key === "FINANCE") {
        canCreate = true;
        canUpdate = true;
        canApprove = false;
      }
    } else if (role === "AHLI_GIZI") {
      if (["MENU_NUTRITION", "KITCHEN_SPPG", "COMPLIANCE"].includes(m.key)) {
        canCreate = true;
        canUpdate = true;
        canApprove = true;
      }
    } else if (role === "INSPEKTUR_MUTU_QC") {
      if (["COMPLIANCE", "KITCHEN_SPPG", "INVENTORY", "ASSETS"].includes(m.key)) {
        canCreate = true;
        canUpdate = true;
        canApprove = true;
      }
    } else if (role === "BENDAHARA_PPK") {
      if (["FINANCE", "SUPPLIERS", "EMPLOYEES"].includes(m.key)) {
        canCreate = true;
        canUpdate = true;
        canApprove = true;
      }
    } else if (role === "TIM_LOGISTIK_DRIVER") {
      if (["LOGISTICS", "ASSETS"].includes(m.key)) {
        canCreate = true;
        canUpdate = true;
      }
    } else if (role === "PETUGAS_GUDANG") {
      if (["INVENTORY", "SUPPLIERS"].includes(m.key)) {
        canCreate = true;
        canUpdate = true;
      }
    } else if (role === "SUPPLIER_VENDOR") {
      if (m.key === "SUPPLIERS") {
        canCreate = true;
        canUpdate = true;
      } else {
        canRead = ["INVENTORY", "LOGISTICS"].includes(m.key);
      }
    } else if (role === "AUDITOR_EKSTERNAL") {
      canRead = true;
      canExport = true;
      canPrint = true;
      canCreate = false;
      canUpdate = false;
      canDelete = false;
      canApprove = false;
    }

    return {
      moduleKey: m.key,
      moduleName: m.name,
      category: m.category,
      canRead,
      canCreate,
      canUpdate,
      canDelete,
      canApprove,
      canExport,
      canPrint,
    };
  });
}

export default function RolePermissionMatrixModal({
  isOpen,
  onClose,
  user,
  onSavePermissions,
}: RolePermissionMatrixModalProps) {
  const [permissions, setPermissions] = useState<ModulePermission[]>(() =>
    user ? getInitialRolePermissions(user.role) : []
  );
  const [isSavedAlert, setIsSavedAlert] = useState(false);

  // Update permissions when user changes
  React.useEffect(() => {
    if (user) {
      setPermissions(getInitialRolePermissions(user.role));
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const togglePermission = (moduleKey: string, field: keyof ModulePermission) => {
    setPermissions((prev) =>
      prev.map((perm) => {
        if (perm.moduleKey === moduleKey) {
          return {
            ...perm,
            [field]: !perm[field],
          };
        }
        return perm;
      })
    );
  };

  const handleGrantAll = () => {
    setPermissions((prev) =>
      prev.map((p) => ({
        ...p,
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: false,
        canApprove: true,
        canExport: true,
        canPrint: true,
      }))
    );
  };

  const handleResetToRoleDefault = () => {
    setPermissions(getInitialRolePermissions(user.role));
  };

  const handleSave = () => {
    onSavePermissions(user.id, permissions);
    setIsSavedAlert(true);
    setTimeout(() => {
      setIsSavedAlert(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-2xl bg-white shadow-2xl dark:bg-gray-900 dark:border dark:border-gray-800 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Konfigurasi Hak Akses Granular (RBAC Matrix)
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Pengguna: <strong className="text-gray-800 dark:text-gray-200">{user.name}</strong> &middot; Peran: <span className="font-mono text-indigo-600 dark:text-indigo-400">{user.role}</span>
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

        {/* Alert Notification */}
        {isSavedAlert && (
          <div className="mx-6 mt-4 flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 p-3 text-xs font-medium text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300">
            <svg className="h-4 w-4 shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Matriks izin hak akses berhasil disimpan dan disinkronisasi ke sesi pengguna.</span>
          </div>
        )}

        {/* Action Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gray-50/70 px-6 py-3 dark:border-gray-800/60 dark:bg-gray-800/40">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <span className="inline-block h-2 w-2 rounded-full bg-indigo-600"></span>
            <span>Prinsip Keamanan: <strong>Least Privilege (ISO/IEC 27001:2022)</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetToRoleDefault}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Reset ke Default Peran
            </button>
            <button
              onClick={handleGrantAll}
              className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300"
            >
              Set Standar Full Operator
            </button>
          </div>
        </div>

        {/* Matrix Table Body */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
                <th className="py-3 px-4 font-bold text-gray-900 dark:text-white">Modul ERP MBG</th>
                <th className="py-3 px-2 text-center font-bold text-gray-700 dark:text-gray-300">Read</th>
                <th className="py-3 px-2 text-center font-bold text-gray-700 dark:text-gray-300">Create</th>
                <th className="py-3 px-2 text-center font-bold text-gray-700 dark:text-gray-300">Update</th>
                <th className="py-3 px-2 text-center font-bold text-gray-700 dark:text-gray-300">Delete</th>
                <th className="py-3 px-2 text-center font-bold text-gray-700 dark:text-gray-300">Approve</th>
                <th className="py-3 px-2 text-center font-bold text-gray-700 dark:text-gray-300">Export</th>
                <th className="py-3 px-2 text-center font-bold text-gray-700 dark:text-gray-300">Print</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {permissions.map((perm) => (
                <tr
                  key={perm.moduleKey}
                  className="hover:bg-gray-50/70 transition-colors dark:hover:bg-gray-800/40"
                >
                  <td className="py-3 px-4">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {perm.moduleName}
                    </div>
                    <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase">
                      Kategori: {perm.category}
                    </span>
                  </td>

                  {/* Read */}
                  <td className="py-3 px-2 text-center">
                    <input
                      type="checkbox"
                      checked={perm.canRead}
                      onChange={() => togglePermission(perm.moduleKey, "canRead")}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800"
                    />
                  </td>

                  {/* Create */}
                  <td className="py-3 px-2 text-center">
                    <input
                      type="checkbox"
                      checked={perm.canCreate}
                      onChange={() => togglePermission(perm.moduleKey, "canCreate")}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800"
                    />
                  </td>

                  {/* Update */}
                  <td className="py-3 px-2 text-center">
                    <input
                      type="checkbox"
                      checked={perm.canUpdate}
                      onChange={() => togglePermission(perm.moduleKey, "canUpdate")}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800"
                    />
                  </td>

                  {/* Delete */}
                  <td className="py-3 px-2 text-center">
                    <input
                      type="checkbox"
                      checked={perm.canDelete}
                      onChange={() => togglePermission(perm.moduleKey, "canDelete")}
                      className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 dark:border-gray-700 dark:bg-gray-800"
                    />
                  </td>

                  {/* Approve */}
                  <td className="py-3 px-2 text-center">
                    <input
                      type="checkbox"
                      checked={perm.canApprove}
                      onChange={() => togglePermission(perm.moduleKey, "canApprove")}
                      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-800"
                    />
                  </td>

                  {/* Export */}
                  <td className="py-3 px-2 text-center">
                    <input
                      type="checkbox"
                      checked={perm.canExport}
                      onChange={() => togglePermission(perm.moduleKey, "canExport")}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800"
                    />
                  </td>

                  {/* Print */}
                  <td className="py-3 px-2 text-center">
                    <input
                      type="checkbox"
                      checked={perm.canPrint}
                      onChange={() => togglePermission(perm.moduleKey, "canPrint")}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-800">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Perubahan permission akan langsung efektif pada token JWT sesi aktif berikutnya.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
            >
              Simpan Matriks Hak Akses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
