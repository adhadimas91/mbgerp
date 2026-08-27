"use client";

import React, { useState, useMemo } from "react";
import CreateRoleModal from "./CreateRoleModal";
import RoleDetailModal from "./RoleDetailModal";
import RoleHierarchyModal from "./RoleHierarchyModal";
import RoleMatrixPrintModal from "./RoleMatrixPrintModal";

export interface RoleModuleAccess {
  name: string;
  permissions: ("READ" | "CREATE" | "UPDATE" | "DELETE" | "APPROVE" | "EXPORT" | "PRINT")[];
}

export interface RoleUserMember {
  name: string;
  nip: string;
  unit: string;
}

export interface RoleDefinition {
  id: string;
  code: string;
  name: string;
  category:
    | "PUSAT_EKSEKUTIF"
    | "REGIONAL_WILAYAH"
    | "OPERASIONAL_DAPUR"
    | "MUTU_GIZI_QC"
    | "KEUANGAN_PPK"
    | "LOGISTIK_ARMADA"
    | "EKSTERNAL_VENDOR";
  description: string;
  riskLevel: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  isSystemRole: boolean;
  enforce2fa: boolean;
  sessionTimeoutMinutes: number;
  assignedUsersCount: number;
  moduleAccessCount: number;
  accessibleModules: RoleModuleAccess[];
  assignedUsers: RoleUserMember[];
}

const INITIAL_ROLES: RoleDefinition[] = [
  {
    id: "ROLE-01",
    code: "ADMIN_PUSAT",
    name: "Administrator Pusat BGN",
    category: "PUSAT_EKSEKUTIF",
    description: "Super Administrator Sistem ERP MBG Nasional. Memiliki wewenang penuh konfigurasi sistem, pagu DPA, dan audit forensik.",
    riskLevel: "CRITICAL",
    isSystemRole: true,
    enforce2fa: true,
    sessionTimeoutMinutes: 30,
    assignedUsersCount: 3,
    moduleAccessCount: 10,
    accessibleModules: [
      { name: "Supplier & Vendor Management", permissions: ["READ", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "PRINT"] },
      { name: "Gudang, Stok & Cold Chain IoT", permissions: ["READ", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "PRINT"] },
      { name: "Menu, Resep & Nutrisi AKG", permissions: ["READ", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "PRINT"] },
      { name: "Dapur Sentral SPPG (Lini Masak & SPM)", permissions: ["READ", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "PRINT"] },
      { name: "Logistik, Rute & Proof of Delivery", permissions: ["READ", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "PRINT"] },
      { name: "Manajemen Aset Tetap & Servis", permissions: ["READ", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "PRINT"] },
      { name: "SDM, Tenaga Kerja & Payroll Dapur", permissions: ["READ", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "PRINT"] },
      { name: "Finansial, Anggaran DPA & Pembayaran", permissions: ["READ", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "PRINT"] },
      { name: "Audit Trail Forensik & Kepatuhan ISO", permissions: ["READ", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "PRINT"] },
      { name: "Pengguna, Peran & Keamanan Sistem", permissions: ["READ", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "PRINT"] },
    ],
    assignedUsers: [
      { name: "Dr. Heru Prasetyo, M.T.", nip: "197804152002121003", unit: "Biro IT Pusat BGN" },
      { name: "Dr. Ir. Bambang Sujatmo", nip: "197804152002121003", unit: "CISO BGN" },
    ],
  },
  {
    id: "ROLE-02",
    code: "ADMIN_REGIONAL",
    name: "Administrator Regional / Provinsi",
    category: "REGIONAL_WILAYAH",
    description: "Koordinator tata kelola SPPG dan distribusi di tingkat wilayah provinsi/kabupaten.",
    riskLevel: "HIGH",
    isSystemRole: true,
    enforce2fa: true,
    sessionTimeoutMinutes: 60,
    assignedUsersCount: 8,
    moduleAccessCount: 8,
    accessibleModules: [
      { name: "Supplier & Vendor Management", permissions: ["READ", "CREATE", "UPDATE", "APPROVE", "EXPORT"] },
      { name: "Gudang, Stok & Cold Chain IoT", permissions: ["READ", "CREATE", "UPDATE", "APPROVE", "EXPORT"] },
      { name: "Menu, Resep & Nutrisi AKG", permissions: ["READ", "CREATE", "UPDATE", "EXPORT"] },
      { name: "Dapur Sentral SPPG (Lini Masak & SPM)", permissions: ["READ", "CREATE", "UPDATE", "APPROVE", "EXPORT"] },
      { name: "Logistik, Rute & Proof of Delivery", permissions: ["READ", "CREATE", "UPDATE", "APPROVE", "EXPORT"] },
      { name: "Finansial, Anggaran DPA & Pembayaran", permissions: ["READ", "CREATE", "UPDATE", "APPROVE", "EXPORT"] },
      { name: "Audit Trail Forensik & Kepatuhan ISO", permissions: ["READ", "EXPORT"] },
      { name: "SDM, Tenaga Kerja & Payroll Dapur", permissions: ["READ", "CREATE", "UPDATE", "EXPORT"] },
    ],
    assignedUsers: [
      { name: "Ir. Gunawan Santoso", nip: "198302142008011002", unit: "Koordinator BGN Jabar" },
    ],
  },
  {
    id: "ROLE-03",
    code: "KEPALA_SPPG",
    name: "Kepala Dapur Sentral SPPG",
    category: "OPERASIONAL_DAPUR",
    description: "Penanggung jawab operasional harian Dapur Sentral, penerbitan SPM, dan koordinasi 5 lini produksi makanan.",
    riskLevel: "HIGH",
    isSystemRole: true,
    enforce2fa: true,
    sessionTimeoutMinutes: 120,
    assignedUsersCount: 24,
    moduleAccessCount: 7,
    accessibleModules: [
      { name: "Gudang, Stok & Cold Chain IoT", permissions: ["READ", "CREATE", "UPDATE", "APPROVE", "PRINT"] },
      { name: "Menu, Resep & Nutrisi AKG", permissions: ["READ", "CREATE", "UPDATE", "PRINT"] },
      { name: "Dapur Sentral SPPG (Lini Masak & SPM)", permissions: ["READ", "CREATE", "UPDATE", "DELETE", "APPROVE", "PRINT"] },
      { name: "Logistik, Rute & Proof of Delivery", permissions: ["READ", "CREATE", "UPDATE", "APPROVE", "PRINT"] },
      { name: "Manajemen Aset Tetap & Servis", permissions: ["READ", "CREATE", "UPDATE", "PRINT"] },
      { name: "SDM, Tenaga Kerja & Payroll Dapur", permissions: ["READ", "CREATE", "UPDATE", "APPROVE", "PRINT"] },
      { name: "Finansial, Anggaran DPA & Pembayaran", permissions: ["READ", "CREATE", "UPDATE", "PRINT"] },
    ],
    assignedUsers: [
      { name: "Chef Junaedi Kusuma, S.Par.", nip: "198511202010011008", unit: "Dapur Sentral Harmoni 01" },
    ],
  },
  {
    id: "ROLE-04",
    code: "AHLI_GIZI",
    name: "Ahli Gizi & Nutrisionis Terdaftar",
    category: "MUTU_GIZI_QC",
    description: "Perancang formula resep AKG Kemenkes RI, validasi nutrisi makro/mikro, dan pelaksana Uji Organoleptik.",
    riskLevel: "MEDIUM",
    isSystemRole: true,
    enforce2fa: true,
    sessionTimeoutMinutes: 60,
    assignedUsersCount: 16,
    moduleAccessCount: 4,
    accessibleModules: [
      { name: "Menu, Resep & Nutrisi AKG", permissions: ["READ", "CREATE", "UPDATE", "DELETE", "APPROVE", "PRINT"] },
      { name: "Dapur Sentral SPPG (Lini Masak & SPM)", permissions: ["READ", "APPROVE", "PRINT"] },
      { name: "Audit Trail Forensik & Kepatuhan ISO", permissions: ["READ", "CREATE", "UPDATE"] },
      { name: "Gudang, Stok & Cold Chain IoT", permissions: ["READ"] },
    ],
    assignedUsers: [
      { name: "Nurul Hasanah, S.Gz., RD", nip: "199105142018032004", unit: "Tim Dietisien SPPG Harmoni" },
    ],
  },
  {
    id: "ROLE-05",
    code: "INSPEKTUR_MUTU_QC",
    name: "Inspektur Mutu & Auditor ISO 22000",
    category: "MUTU_GIZI_QC",
    description: "Pengawas titik kritis CCP HACCP, sanitasi alat ISO 22000, investigasi insiden suhu, dan audit CAPA.",
    riskLevel: "HIGH",
    isSystemRole: true,
    enforce2fa: true,
    sessionTimeoutMinutes: 60,
    assignedUsersCount: 12,
    moduleAccessCount: 6,
    accessibleModules: [
      { name: "Audit Trail Forensik & Kepatuhan ISO", permissions: ["READ", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "PRINT"] },
      { name: "Dapur Sentral SPPG (Lini Masak & SPM)", permissions: ["READ", "APPROVE"] },
      { name: "Gudang, Stok & Cold Chain IoT", permissions: ["READ", "APPROVE"] },
      { name: "Manajemen Aset Tetap & Servis", permissions: ["READ", "CREATE", "UPDATE", "APPROVE"] },
      { name: "SDM, Tenaga Kerja & Payroll Dapur", permissions: ["READ", "APPROVE"] },
      { name: "Logistik, Rute & Proof of Delivery", permissions: ["READ", "APPROVE"] },
    ],
    assignedUsers: [
      { name: "Dewi Kartika, S.T., M.Sc.", nip: "198807122014022002", unit: "Inspektorat Mutu Wilayah Barat" },
    ],
  },
  {
    id: "ROLE-06",
    code: "BENDAHARA_PPK",
    name: "Pejabat Pembuat Komitmen (PPK/Bendahara)",
    category: "KEUANGAN_PPK",
    description: "Otorisator pengeluaran anggaran, penerbitan SP2D, rekonsiliasi bank, dan laporan keuangan SAP Akrual BPK.",
    riskLevel: "CRITICAL",
    isSystemRole: true,
    enforce2fa: true,
    sessionTimeoutMinutes: 30,
    assignedUsersCount: 6,
    moduleAccessCount: 5,
    accessibleModules: [
      { name: "Finansial, Anggaran DPA & Pembayaran", permissions: ["READ", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "PRINT"] },
      { name: "Supplier & Vendor Management", permissions: ["READ", "APPROVE"] },
      { name: "SDM, Tenaga Kerja & Payroll Dapur", permissions: ["READ", "CREATE", "UPDATE", "APPROVE", "PRINT"] },
      { name: "Logistik, Rute & Proof of Delivery", permissions: ["READ", "EXPORT"] },
      { name: "Audit Trail Forensik & Kepatuhan ISO", permissions: ["READ", "EXPORT"] },
    ],
    assignedUsers: [
      { name: "Hj. Ratna Sari Dewi, S.E.", nip: "198209182006042001", unit: "Direktorat Keuangan BGN" },
    ],
  },
  {
    id: "ROLE-07",
    code: "TIM_LOGISTIK_DRIVER",
    name: "Petugas Logistik & Driver Armada",
    category: "LOGISTIK_ARMADA",
    description: "Pengemudi armada rantai dingin termal (>60°C), pelaksana live GPS tracking, dan penerima BAST PoD di sekolah.",
    riskLevel: "LOW",
    isSystemRole: true,
    enforce2fa: false,
    sessionTimeoutMinutes: 480,
    assignedUsersCount: 45,
    moduleAccessCount: 3,
    accessibleModules: [
      { name: "Logistik, Rute & Proof of Delivery", permissions: ["READ", "CREATE", "UPDATE", "PRINT"] },
      { name: "Manajemen Aset Tetap & Servis", permissions: ["READ", "CREATE", "UPDATE"] },
      { name: "SDM, Tenaga Kerja & Payroll Dapur", permissions: ["READ"] },
    ],
    assignedUsers: [
      { name: "Budi Santoso", nip: "199403252021021005", unit: "Armada B-9012-TXR" },
    ],
  },
  {
    id: "ROLE-08",
    code: "PETUGAS_GUDANG",
    name: "Petugas Gudang & Cold Storage",
    category: "OPERASIONAL_DAPUR",
    description: "Pencatat mutasi bahan baku masuk/keluar, pemantau suhu freezer sensor IoT, dan manajemen reorder stok.",
    riskLevel: "MEDIUM",
    isSystemRole: true,
    enforce2fa: true,
    sessionTimeoutMinutes: 120,
    assignedUsersCount: 18,
    moduleAccessCount: 3,
    accessibleModules: [
      { name: "Gudang, Stok & Cold Chain IoT", permissions: ["READ", "CREATE", "UPDATE", "DELETE", "APPROVE", "PRINT"] },
      { name: "Supplier & Vendor Management", permissions: ["READ", "UPDATE"] },
      { name: "Dapur Sentral SPPG (Lini Masak & SPM)", permissions: ["READ", "UPDATE"] },
    ],
    assignedUsers: [
      { name: "Rizky Ramadhan", nip: "199708102023011002", unit: "Gudang SPPG Harmoni" },
    ],
  },
  {
    id: "ROLE-09",
    code: "SUPPLIER_VENDOR",
    name: "Rekanan Supplier & Vendor Bahan Baku",
    category: "EKSTERNAL_VENDOR",
    description: "Portal mitra rekanan untuk pembaruan harga pangan HAP, konfirmasi PO darurat, dan unggah faktur tagihan.",
    riskLevel: "LOW",
    isSystemRole: true,
    enforce2fa: true,
    sessionTimeoutMinutes: 60,
    assignedUsersCount: 52,
    moduleAccessCount: 3,
    accessibleModules: [
      { name: "Supplier & Vendor Management", permissions: ["READ", "CREATE", "UPDATE"] },
      { name: "Gudang, Stok & Cold Chain IoT", permissions: ["READ"] },
      { name: "Finansial, Anggaran DPA & Pembayaran", permissions: ["READ", "CREATE", "UPDATE"] },
    ],
    assignedUsers: [
      { name: "PT Segar Makmur Abadi", nip: "VEN-MBG-2026-004", unit: "Rekanan Komoditas Unggas" },
    ],
  },
  {
    id: "ROLE-10",
    code: "AUDITOR_EKSTERNAL",
    name: "Auditor Eksternal (BPK / KAN / BSSN)",
    category: "PUSAT_EKSEKUTIF",
    description: "Akses Read-Only dan Ekspor data terproteksi untuk pemeriksaan akuntabilitas fiskal, ISO 22000, dan ISO 27001.",
    riskLevel: "LOW",
    isSystemRole: true,
    enforce2fa: true,
    sessionTimeoutMinutes: 60,
    assignedUsersCount: 4,
    moduleAccessCount: 9,
    accessibleModules: [
      { name: "Supplier & Vendor Management", permissions: ["READ", "EXPORT"] },
      { name: "Gudang, Stok & Cold Chain IoT", permissions: ["READ", "EXPORT"] },
      { name: "Menu, Resep & Nutrisi AKG", permissions: ["READ", "EXPORT"] },
      { name: "Dapur Sentral SPPG (Lini Masak & SPM)", permissions: ["READ", "EXPORT"] },
      { name: "Logistik, Rute & Proof of Delivery", permissions: ["READ", "EXPORT"] },
      { name: "Manajemen Aset Tetap & Servis", permissions: ["READ", "EXPORT"] },
      { name: "SDM, Tenaga Kerja & Payroll Dapur", permissions: ["READ", "EXPORT"] },
      { name: "Finansial, Anggaran DPA & Pembayaran", permissions: ["READ", "EXPORT"] },
      { name: "Audit Trail Forensik & Kepatuhan ISO", permissions: ["READ", "EXPORT"] },
    ],
    assignedUsers: [
      { name: "Drs. Hendrawan Susanto, Ak.", nip: "AUD-BPK-2026-881", unit: "Tim Pemeriksa BPK RI" },
    ],
  },
];

export default function RoleManagementDashboard() {
  const [roles, setRoles] = useState<RoleDefinition[]>(INITIAL_ROLES);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [riskFilter, setRiskFilter] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Modals state
  const [selectedRole, setSelectedRole] = useState<RoleDefinition | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState<RoleDefinition | null>(null);
  const [isHierarchyModalOpen, setIsHierarchyModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Filtered Roles
  const filteredRoles = useMemo(() => {
    return roles.filter((r) => {
      const matchSearch =
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory = categoryFilter === "ALL" || r.category === categoryFilter;
      const matchRisk = riskFilter === "ALL" || r.riskLevel === riskFilter;

      return matchSearch && matchCategory && matchRisk;
    });
  }, [roles, searchTerm, categoryFilter, riskFilter]);

  // KPI Metrics
  const metrics = useMemo(() => {
    const totalRoles = roles.length;
    const totalAssignedUsers = roles.reduce((acc, r) => acc + r.assignedUsersCount, 0);
    const criticalRoles = roles.filter((r) => r.riskLevel === "CRITICAL").length;
    const mfaEnforcedRoles = roles.filter((r) => r.enforce2fa).length;
    return { totalRoles, totalAssignedUsers, criticalRoles, mfaEnforcedRoles };
  }, [roles]);

  const handleCreateRole = () => {
    setRoleToEdit(null);
    setIsCreateModalOpen(true);
  };

  const handleEditRole = (role: RoleDefinition) => {
    setRoleToEdit(role);
    setIsCreateModalOpen(true);
  };

  const handleDuplicateRole = (role: RoleDefinition) => {
    const clonedRole: RoleDefinition = {
      ...role,
      id: `ROLE-${String(roles.length + 1).padStart(2, "0")}`,
      code: `${role.code}_COPY`,
      name: `${role.name} (Salinan)`,
      isSystemRole: false,
      assignedUsersCount: 0,
      assignedUsers: [],
    };
    setRoles((prev) => [clonedRole, ...prev]);
  };

  const handleSaveRole = (roleData: Partial<RoleDefinition>) => {
    if (roleData.id) {
      setRoles((prev) =>
        prev.map((r) => (r.id === roleData.id ? ({ ...r, ...roleData } as RoleDefinition) : r))
      );
    } else {
      const newRole: RoleDefinition = {
        id: `ROLE-${String(roles.length + 1).padStart(2, "0")}`,
        code: roleData.code || "ROLE_NEW",
        name: roleData.name || "Peran Kustom Baru",
        category: roleData.category || "OPERASIONAL_DAPUR",
        description: roleData.description || "",
        riskLevel: roleData.riskLevel || "MEDIUM",
        isSystemRole: false,
        enforce2fa: roleData.enforce2fa ?? true,
        sessionTimeoutMinutes: roleData.sessionTimeoutMinutes || 60,
        assignedUsersCount: 0,
        moduleAccessCount: roleData.moduleAccessCount || 2,
        accessibleModules: roleData.accessibleModules || [],
        assignedUsers: [],
      };
      setRoles((prev) => [newRole, ...prev]);
    }
  };

  const handleDeleteRole = (roleId: string) => {
    const target = roles.find((r) => r.id === roleId);
    if (target?.isSystemRole) {
      alert("Peran bawaan sistem (System Role) dilindungi dan tidak dapat dihapus.");
      return;
    }
    if (confirm("Apakah Anda yakin ingin menghapus peran kustom ini?")) {
      setRoles((prev) => prev.filter((r) => r.id !== roleId));
    }
  };

  const getRiskBadge = (risk: RoleDefinition["riskLevel"]) => {
    switch (risk) {
      case "CRITICAL":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
      case "HIGH":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800";
      case "MEDIUM":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
    }
  };

  const getCategoryBadge = (cat: RoleDefinition["category"]) => {
    switch (cat) {
      case "PUSAT_EKSEKUTIF":
        return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
      case "REGIONAL_WILAYAH":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";
      case "OPERASIONAL_DAPUR":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300";
      case "MUTU_GIZI_QC":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300";
      case "KEUANGAN_PPK":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300";
      case "LOGISTIK_ARMADA":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner KPI Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Roles */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4.5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Total Peran Sistem (RBAC)
              </p>
              <h3 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                {metrics.totalRoles} <span className="text-xs font-normal text-gray-500">Peran</span>
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">10 Default</span> &middot; Terstandar BGN
          </div>
        </div>

        {/* Assigned Users */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4.5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Total Anggota Ter-assign
              </p>
              <h3 className="mt-1 text-xl font-bold text-blue-600 dark:text-blue-400">
                {metrics.totalAssignedUsers} <span className="text-xs font-normal text-gray-500">Pengguna</span>
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-blue-700 dark:text-blue-400">
            <span>Lintas SPPG & Pusat</span>
          </div>
        </div>

        {/* 2FA Enforced */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4.5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Peran Wajib 2FA TOTP
              </p>
              <h3 className="mt-1 text-xl font-bold text-purple-600 dark:text-purple-400">
                {metrics.mfaEnforcedRoles} <span className="text-xs font-normal text-gray-500">Peran</span>
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-purple-700 dark:text-purple-400">
            <span>Kepatuhan ISO 27001 (90%)</span>
          </div>
        </div>

        {/* Principle of Least Privilege */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4.5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Kepatuhan Least Privilege
              </p>
              <h3 className="mt-1 text-xl font-bold text-green-600 dark:text-green-400">
                98.4% <span className="text-xs font-normal text-gray-500">Grade A</span>
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-green-700 dark:text-green-400">
            <span>Zero Privilege Escalation</span>
          </div>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900">
        {/* Toolbar Bar */}
        <div className="flex flex-col gap-4 border-b border-gray-200 p-5 dark:border-gray-800 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative min-w-[240px]">
              <input
                type="text"
                placeholder="Cari peran, kode slug, deskripsi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-9 pr-4 text-xs text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <svg
                className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filter Kategori */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white py-2 px-3 text-xs text-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              <option value="ALL">Semua Kategori</option>
              <option value="PUSAT_EKSEKUTIF">Pusat & Eksekutif</option>
              <option value="REGIONAL_WILAYAH">Regional & Wilayah</option>
              <option value="OPERASIONAL_DAPUR">Operasional Dapur</option>
              <option value="MUTU_GIZI_QC">Mutu & Gizi</option>
              <option value="KEUANGAN_PPK">Keuangan & PPK</option>
              <option value="LOGISTIK_ARMADA">Logistik & Armada</option>
              <option value="EKSTERNAL_VENDOR">Eksternal Vendor</option>
            </select>

            {/* Filter Risiko */}
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white py-2 px-3 text-xs text-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              <option value="ALL">Semua Tingkat Risiko</option>
              <option value="CRITICAL">Risiko Kritis</option>
              <option value="HIGH">Risiko Tinggi</option>
              <option value="MEDIUM">Risiko Sedang</option>
              <option value="LOW">Risiko Rendah</option>
            </select>

            {/* View Mode Switcher */}
            <div className="flex items-center rounded-xl border border-gray-300 p-0.5 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <button
                onClick={() => setViewMode("grid")}
                title="Tampilan Kartu"
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-white text-indigo-600 shadow-xs dark:bg-gray-700 dark:text-indigo-400"
                    : "text-gray-500 hover:text-gray-800 dark:text-gray-400"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("table")}
                title="Tampilan Tabel"
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "table"
                    ? "bg-white text-indigo-600 shadow-xs dark:bg-gray-700 dark:text-indigo-400"
                    : "text-gray-500 hover:text-gray-800 dark:text-gray-400"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsHierarchyModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Bagan Hirarki
            </button>

            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak Master Matriks
            </button>

            <button
              onClick={handleCreateRole}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Tambah Peran Baru
            </button>
          </div>
        </div>

        {/* Content View */}
        <div className="p-6">
          {filteredRoles.length === 0 ? (
            <div className="py-12 text-center text-gray-500 dark:text-gray-400">
              Tidak ditemukan data peran sesuai filter pencarian.
            </div>
          ) : viewMode === "grid" ? (
            /* GRID VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRoles.map((role) => (
                <div
                  key={role.id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all dark:border-gray-800 dark:bg-gray-800/60 dark:hover:border-indigo-700 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Category + Risk */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${getCategoryBadge(role.category)}`}>
                        {role.category}
                      </span>
                      <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${getRiskBadge(role.riskLevel)}`}>
                        {role.riskLevel}
                      </span>
                    </div>

                    {/* Role Title & Code */}
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">
                      {role.name}
                    </h4>
                    <span className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400 block mt-0.5">
                      {role.code}
                    </span>

                    {/* Description */}
                    <p className="mt-2 text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                      {role.description}
                    </p>

                    {/* Modul Access Pills */}
                    <div className="mt-4 border-t border-gray-100 pt-3 dark:border-gray-700/60">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          Cakupan Modul:
                        </span>
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">
                          {role.moduleAccessCount} / 10 Modul
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {role.accessibleModules.slice(0, 3).map((mod, i) => (
                          <span
                            key={i}
                            className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                          >
                            {mod.name.split(":")[0]}
                          </span>
                        ))}
                        {role.accessibleModules.length > 3 && (
                          <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300">
                            +{role.accessibleModules.length - 3} lainnya
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Meta & Actions */}
                  <div className="mt-5 border-t border-gray-100 pt-3 dark:border-gray-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                      <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span><strong>{role.assignedUsersCount}</strong> Pengguna</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* View Detail */}
                      <button
                        onClick={() => {
                          setSelectedRole(role);
                          setIsDetailModalOpen(true);
                        }}
                        title="Lihat Rincian Izin"
                        className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>

                      {/* Edit Role */}
                      <button
                        onClick={() => handleEditRole(role)}
                        title="Edit Peran"
                        className="rounded-lg p-1.5 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/30"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>

                      {/* Duplicate */}
                      <button
                        onClick={() => handleDuplicateRole(role)}
                        title="Duplikasi / Salin Peran"
                        className="rounded-lg p-1.5 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>

                      {/* Delete Custom Role */}
                      {!role.isSystemRole && (
                        <button
                          onClick={() => handleDeleteRole(role.id)}
                          title="Hapus Peran Kustom"
                          className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* TABLE VIEW */
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/70 dark:border-gray-800 dark:bg-gray-800/40">
                    <th className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">Nama Peran & Slug</th>
                    <th className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">Kategori</th>
                    <th className="py-3.5 px-3 text-center font-bold text-gray-900 dark:text-white">Tingkat Risiko</th>
                    <th className="py-3.5 px-3 text-center font-bold text-gray-900 dark:text-white">Wajib 2FA</th>
                    <th className="py-3.5 px-3 text-center font-bold text-gray-900 dark:text-white">Modul Akses</th>
                    <th className="py-3.5 px-3 text-center font-bold text-gray-900 dark:text-white">Pengguna</th>
                    <th className="py-3.5 px-4 text-right font-bold text-gray-900 dark:text-white">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {filteredRoles.map((role) => (
                    <tr
                      key={role.id}
                      className="hover:bg-gray-50/70 transition-colors dark:hover:bg-gray-800/40"
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-gray-900 dark:text-white">{role.name}</div>
                        <div className="font-mono text-[11px] text-indigo-600 dark:text-indigo-400">{role.code}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold ${getCategoryBadge(role.category)}`}>
                          {role.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-flex rounded-md border px-2 py-0.5 text-[10px] font-bold ${getRiskBadge(role.riskLevel)}`}>
                          {role.riskLevel}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        {role.enforce2fa ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-700 border border-green-200">
                            Enforced
                          </span>
                        ) : (
                          <span className="text-gray-400 text-[10px]">Opsional</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center font-semibold text-gray-800 dark:text-gray-200">
                        {role.moduleAccessCount} Modul
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-blue-600 dark:text-blue-400">
                        {role.assignedUsersCount}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => {
                              setSelectedRole(role);
                              setIsDetailModalOpen(true);
                            }}
                            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleEditRole(role)}
                            className="rounded-lg p-1.5 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/30"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 px-5 py-3.5 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400 gap-2">
          <span>
            Menampilkan <strong className="text-gray-800 dark:text-gray-200">{filteredRoles.length}</strong> dari{" "}
            <strong className="text-gray-800 dark:text-gray-200">{roles.length}</strong> total peran terkonfigurasi
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Role-Based Access Control: <strong>ISO/IEC 27001:2022 Compliant</strong>
          </span>
        </div>
      </div>

      {/* Modals */}
      <RoleDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        role={selectedRole}
        onOpenEdit={(r) => handleEditRole(r)}
      />

      <CreateRoleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSaveRole={handleSaveRole}
        roleToEdit={roleToEdit}
      />

      <RoleHierarchyModal
        isOpen={isHierarchyModalOpen}
        onClose={() => setIsHierarchyModalOpen(false)}
      />

      <RoleMatrixPrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
      />
    </div>
  );
}
