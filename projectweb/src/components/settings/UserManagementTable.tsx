"use client";

import React, { useState, useMemo, useEffect } from "react";
import UserDetailModal from "./UserDetailModal";
import UserFormModal from "./UserFormModal";
import RolePermissionMatrixModal from "./RolePermissionMatrixModal";
import UserSecuritySessionsModal from "./UserSecuritySessionsModal";
import UserAccessReportPrintModal from "./UserAccessReportPrintModal";
import userService from "@/services/user.service";

export type UserRole =
  | "ADMIN_PUSAT"
  | "ADMIN_REGIONAL"
  | "KEPALA_SPPG"
  | "AHLI_GIZI"
  | "INSPEKTUR_MUTU_QC"
  | "BENDAHARA_PPK"
  | "TIM_LOGISTIK_DRIVER"
  | "PETUGAS_GUDANG"
  | "SUPPLIER_VENDOR"
  | "AUDITOR_EKSTERNAL";

export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING_ACTIVATION";

export type TwoFactorStatus = "APP_AUTHENTICATOR" | "SMS_OTP" | "DISABLED" | "ENFORCED_REQUIRED";

export interface UserAccount {
  id: string;
  nip: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  unit: string;
  assignedRegion: string;
  status: UserStatus;
  twoFactor: TwoFactorStatus;
  avatarUrl?: string;
  lastLogin: string;
  lastIp: string;
  lastLocation: string;
  failedLoginAttempts: number;
  accountExpiry: string | null;
  createdAt: string;
  permissionsCustomized: boolean;
  notes?: string;
}

const INITIAL_USERS: UserAccount[] = [
  {
    id: "USR-001",
    nip: "197804152002121003",
    name: "Dr. Heru Prasetyo, M.T.",
    email: "heru.prasetyo@mbg.go.id",
    phone: "+62 811-2345-6789",
    role: "ADMIN_PUSAT",
    unit: "Biro IT & Pusat Komando MBG Nasional",
    assignedRegion: "Nasional (Pusat BGN)",
    status: "ACTIVE",
    twoFactor: "APP_AUTHENTICATOR",
    lastLogin: "2026-08-27 16:42:15",
    lastIp: "182.253.120.45",
    lastLocation: "Jakarta Pusat, DKI Jakarta",
    failedLoginAttempts: 0,
    accountExpiry: null,
    createdAt: "2026-01-05",
    permissionsCustomized: false,
    notes: "Super Administrator Sistem ERP MBG. Wewenang penuh lintas 9 modul.",
  },
  {
    id: "USR-042",
    nip: "198209182006042001",
    name: "Hj. Ratna Sari Dewi, S.E., M.Ak.",
    email: "ratna.dewi@mbg.go.id",
    phone: "+62 812-9876-5432",
    role: "BENDAHARA_PPK",
    unit: "Direktorat Keuangan & Anggaran BGN",
    assignedRegion: "Jawa Barat & DKI Jakarta",
    status: "ACTIVE",
    twoFactor: "APP_AUTHENTICATOR",
    lastLogin: "2026-08-27 15:30:22",
    lastIp: "36.78.210.14",
    lastLocation: "Bandung, Jawa Barat",
    failedLoginAttempts: 0,
    accountExpiry: null,
    createdAt: "2026-01-10",
    permissionsCustomized: true,
    notes: "Pejabat Pembuat Komitmen (PPK). Otorisasi pencairan SP2D dan SPJ belanja bahan baku.",
  },
  {
    id: "USR-014",
    nip: "198511202010011008",
    name: "Chef Junaedi Kusuma, S.Par.",
    email: "junaedi.k@sppg-harmoni.id",
    phone: "+62 813-8899-7711",
    role: "KEPALA_SPPG",
    unit: "Dapur Sentral Harmoni 01 (SPPG-JKT-01)",
    assignedRegion: "Jakarta Pusat & Gambir",
    status: "ACTIVE",
    twoFactor: "APP_AUTHENTICATOR",
    lastLogin: "2026-08-27 14:15:08",
    lastIp: "114.122.90.11",
    lastLocation: "Dapur Sentral Harmoni, Jakarta",
    failedLoginAttempts: 0,
    accountExpiry: null,
    createdAt: "2026-02-01",
    permissionsCustomized: false,
    notes: "Kepala Dapur Sentral Harmoni 01. Penanggung jawab 5 lini masak & SPM.",
  },
  {
    id: "USR-025",
    nip: "199105142018032004",
    name: "Nurul Hasanah, S.Gz., RD",
    email: "nurul.hasanah@mbg.go.id",
    phone: "+62 815-4433-2211",
    role: "AHLI_GIZI",
    unit: "Tim Dietisien & Verifikasi AKG Dapur Harmoni",
    assignedRegion: "DKI Jakarta Klaster 1",
    status: "ACTIVE",
    twoFactor: "APP_AUTHENTICATOR",
    lastLogin: "2026-08-27 13:40:50",
    lastIp: "182.253.120.88",
    lastLocation: "Jakarta Pusat",
    failedLoginAttempts: 0,
    accountExpiry: null,
    createdAt: "2026-02-10",
    permissionsCustomized: false,
    notes: "Dietisien bersertifikasi Kemenkes. Pembuat resep AKG & penandatangan Uji Organoleptik.",
  },
  {
    id: "USR-008",
    nip: "198807122014022002",
    name: "Dewi Kartika, S.T., M.Sc.",
    email: "dewi.kartika@inspektorat-mbg.go.id",
    phone: "+62 818-1122-3344",
    role: "INSPEKTUR_MUTU_QC",
    unit: "Biro Pengawasan Mutu & Kepatuhan ISO",
    assignedRegion: "Nasional (Auditor Wilayah Barat)",
    status: "ACTIVE",
    twoFactor: "APP_AUTHENTICATOR",
    lastLogin: "2026-08-27 11:20:44",
    lastIp: "103.21.244.5",
    lastLocation: "Jakarta Selatan",
    failedLoginAttempts: 0,
    accountExpiry: null,
    createdAt: "2026-01-15",
    permissionsCustomized: false,
    notes: "Lead Auditor ISO 22000 & HACCP. Penanggung jawab CAPA & investigasi insiden suhu.",
  },
  {
    id: "USR-063",
    nip: "199403252021021005",
    name: "Budi Santoso (Driver Logistik)",
    email: "budi.santoso@logistik-mbg.id",
    phone: "+62 856-7788-9900",
    role: "TIM_LOGISTIK_DRIVER",
    unit: "Armada Thermoking B-9012-TXR",
    assignedRegion: "Rute Klaster Gambir - Petojo",
    status: "ACTIVE",
    twoFactor: "SMS_OTP",
    lastLogin: "2026-08-27 07:15:30",
    lastIp: "114.124.60.22",
    lastLocation: "Jakarta Pusat",
    failedLoginAttempts: 0,
    accountExpiry: null,
    createdAt: "2026-03-01",
    permissionsCustomized: false,
    notes: "Pengemudi armada rantai dingin. Mengisi Proof of Delivery (PoD) & cek suhu drop-off.",
  },
  {
    id: "USR-077",
    nip: "VEN-MBG-2026-004",
    name: "PT Segar Makmur Abadi (PIC Suplai)",
    email: "kontrak@segarmakmur.co.id",
    phone: "+62 821-5566-7788",
    role: "SUPPLIER_VENDOR",
    unit: "Rekanan Komoditas Unggas & Telur",
    assignedRegion: "Jawa Barat & DKI Jakarta",
    status: "ACTIVE",
    twoFactor: "APP_AUTHENTICATOR",
    lastLogin: "2026-08-26 18:20:10",
    lastIp: "36.80.112.44",
    lastLocation: "Bandung, Jawa Barat",
    failedLoginAttempts: 0,
    accountExpiry: "2026-12-31",
    createdAt: "2026-02-15",
    permissionsCustomized: false,
    notes: "Akun portal vendor eksternal. Akses terbatas katalog harga, PO masuk, dan faktur tagihan.",
  },
  {
    id: "USR-099",
    nip: "AUD-BPK-2026-881",
    name: "Drs. Hendrawan Susanto, Ak., CA",
    email: "hendrawan.s@bpk.go.id",
    phone: "+62 811-9988-7766",
    role: "AUDITOR_EKSTERNAL",
    unit: "Tim Pemeriksa Kepatuhan BPK RI",
    assignedRegion: "Pemeriksaan Keuangan MBG 2026",
    status: "ACTIVE",
    twoFactor: "APP_AUTHENTICATOR",
    lastLogin: "2026-08-25 10:15:20",
    lastIp: "103.10.60.18",
    lastLocation: "Jakarta Pusat",
    failedLoginAttempts: 0,
    accountExpiry: "2026-09-30",
    createdAt: "2026-08-01",
    permissionsCustomized: false,
    notes: "Akses Read-Only & Export ke modul Finansial, Audit Trail forensik, dan Dokumen BAST.",
  },
  {
    id: "USR-102",
    nip: "199708102023011002",
    name: "Rizky Ramadhan (Helper Dapur)",
    email: "rizky.r@sppg-harmoni.id",
    phone: "+62 878-1122-3344",
    role: "PETUGAS_GUDANG",
    unit: "Gudang Bahan Kering SPPG Harmoni",
    assignedRegion: "Jakarta Pusat",
    status: "PENDING_ACTIVATION",
    twoFactor: "ENFORCED_REQUIRED",
    lastLogin: "Belum Pernah Login",
    lastIp: "-",
    lastLocation: "-",
    failedLoginAttempts: 0,
    accountExpiry: null,
    createdAt: "2026-08-26",
    permissionsCustomized: false,
    notes: "Akun baru diterbitkan. Menunggu penyelesaian verifikasi TOTP saat onboarding.",
  },
];

export default function UserManagementTable() {
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [twoFactorFilter, setTwoFactorFilter] = useState<string>("ALL");

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getUsers();
      if (Array.isArray(data) && data.length > 0) {
        const mapped: UserAccount[] = data.map((u: any, idx: number) => ({
          id: u.id || `USR-${idx + 1}`,
          nip: u.nip || `19850101201501${idx}001`,
          name: u.name,
          email: u.email,
          phone: u.phone || "+62 812-xxxx-xxxx",
          role: (u.role || "ADMIN_PUSAT") as UserRole,
          unit: u.kitchen?.name || u.unit || "Sentral Dapur SPPG BGN",
          assignedRegion: u.assignedRegion || "DKI Jakarta",
          status: (u.status || "ACTIVE") as UserStatus,
          twoFactor: (u.isMfaEnabled ? "APP_AUTHENTICATOR" : "DISABLED") as TwoFactorStatus,
          lastLogin: u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString("id-ID") : "2026-08-27 12:00",
          lastIp: "103.10.60.1",
          lastLocation: "Jakarta",
          failedLoginAttempts: 0,
          accountExpiry: null,
          createdAt: u.createdAt ? new Date(u.createdAt).toISOString().split("T")[0] : "2026-01-01",
          permissionsCustomized: false,
        }));
        setUsers(mapped);
      }
    } catch {
      // fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Modals state
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<UserAccount | null>(null);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.unit.toLowerCase().includes(searchTerm.toLowerCase());

      const matchRole = roleFilter === "ALL" || u.role === roleFilter;
      const matchStatus = statusFilter === "ALL" || u.status === statusFilter;
      const match2fa = twoFactorFilter === "ALL" || u.twoFactor === twoFactorFilter;

      return matchSearch && matchRole && matchStatus && match2fa;
    });
  }, [users, searchTerm, roleFilter, statusFilter, twoFactorFilter]);

  // KPI Metrics
  const metrics = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.status === "ACTIVE").length;
    const twoFaActive = users.filter((u) => u.twoFactor === "APP_AUTHENTICATOR" || u.twoFactor === "SMS_OTP").length;
    const pending = users.filter((u) => u.status === "PENDING_ACTIVATION").length;
    const suspended = users.filter((u) => u.status === "SUSPENDED" || u.status === "INACTIVE").length;
    return { total, active, twoFaActive, pending, suspended };
  }, [users]);

  // Handlers
  const handleCreateNewUser = () => {
    setUserToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleEditUser = (user: UserAccount) => {
    setUserToEdit(user);
    setIsFormModalOpen(true);
  };

  const handleSaveUser = (userData: Partial<UserAccount>) => {
    if (userData.id) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userData.id ? ({ ...u, ...userData } as UserAccount) : u))
      );
    } else {
      const newUser: UserAccount = {
        id: `USR-${String(users.length + 1).padStart(3, "0")}`,
        nip: userData.nip || "",
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        role: userData.role || "KEPALA_SPPG",
        unit: userData.unit || "SPPG Harmoni 01",
        assignedRegion: userData.assignedRegion || "DKI Jakarta",
        status: userData.status || "ACTIVE",
        twoFactor: userData.twoFactor || "APP_AUTHENTICATOR",
        lastLogin: "Baru Didaftarkan",
        lastIp: "-",
        lastLocation: "-",
        failedLoginAttempts: 0,
        accountExpiry: userData.accountExpiry || null,
        createdAt: new Date().toISOString().split("T")[0],
        permissionsCustomized: false,
        notes: userData.notes,
      };
      setUsers((prev) => [newUser, ...prev]);
    }
  };

  const handleToggleStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus: UserStatus = u.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const handleUpdateSecurity = (userId: string, updates: Partial<UserAccount>) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...updates } : u))
    );
  };

  const handleSavePermissions = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, permissionsCustomized: true } : u))
    );
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "ADMIN_PUSAT":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
      case "ADMIN_REGIONAL":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
      case "KEPALA_SPPG":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800";
      case "AHLI_GIZI":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800";
      case "INSPEKTUR_MUTU_QC":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800";
      case "BENDAHARA_PPK":
        return "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800";
      case "TIM_LOGISTIK_DRIVER":
        return "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800";
      case "PETUGAS_GUDANG":
        return "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800";
      case "SUPPLIER_VENDOR":
        return "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-800";
      case "AUDITOR_EKSTERNAL":
        return "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
      case "INACTIVE":
        return "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
      case "SUSPENDED":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
      case "PENDING_ACTIVATION":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner KPI Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Total Users */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4.5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Total Akun Terdaftar
              </p>
              <h3 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                {metrics.total} <span className="text-xs font-normal text-gray-500">Pengguna</span>
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-blue-600 dark:text-blue-400">10 Role</span> &middot; Sesuai Struktur BGN
          </div>
        </div>

        {/* Active Accounts */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4.5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Akun Terverifikasi Aktif
              </p>
              <h3 className="mt-1 text-xl font-bold text-green-600 dark:text-green-400">
                {metrics.active}{" "}
                <span className="text-xs font-normal text-gray-500">
                  ({Math.round((metrics.active / metrics.total) * 100)}%)
                </span>
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-green-700 dark:text-green-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span>
            Siap Operasional SPPG
          </div>
        </div>

        {/* 2FA Compliance */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4.5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Kepatuhan 2FA (ISO 27001)
              </p>
              <h3 className="mt-1 text-xl font-bold text-purple-600 dark:text-purple-400">
                {metrics.twoFaActive}{" "}
                <span className="text-xs font-normal text-gray-500">
                  ({Math.round((metrics.twoFaActive / metrics.total) * 100)}%)
                </span>
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-purple-700 dark:text-purple-400">
            <span>MFA TOTP Authenticator</span>
          </div>
        </div>

        {/* Pending Activation */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4.5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Menunggu Aktivasi
              </p>
              <h3 className="mt-1 text-xl font-bold text-amber-600 dark:text-amber-400">
                {metrics.pending} <span className="text-xs font-normal text-gray-500">Akun</span>
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-400">
            <span>Perlu First-Time Setup</span>
          </div>
        </div>

        {/* Suspended / Inactive */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4.5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Nonaktif / Suspended
              </p>
              <h3 className="mt-1 text-xl font-bold text-gray-700 dark:text-gray-300">
                {metrics.suspended} <span className="text-xs font-normal text-gray-500">Akun</span>
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
            <span>Akses Sementara Ditutup</span>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900">
        {/* Filter & Action Toolbar */}
        <div className="flex flex-col gap-4 border-b border-gray-200 p-5 dark:border-gray-800 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <input
                type="text"
                placeholder="Cari nama, NIP, email, unit SPPG..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-9 pr-4 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
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

            {/* Filter Peran */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white py-2 px-3 text-xs text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              <option value="ALL">Semua Peran (RBAC)</option>
              <option value="ADMIN_PUSAT">ADMIN_PUSAT</option>
              <option value="ADMIN_REGIONAL">ADMIN_REGIONAL</option>
              <option value="KEPALA_SPPG">KEPALA_SPPG</option>
              <option value="AHLI_GIZI">AHLI_GIZI</option>
              <option value="INSPEKTUR_MUTU_QC">INSPEKTUR_MUTU_QC</option>
              <option value="BENDAHARA_PPK">BENDAHARA_PPK</option>
              <option value="TIM_LOGISTIK_DRIVER">TIM_LOGISTIK_DRIVER</option>
              <option value="PETUGAS_GUDANG">PETUGAS_GUDANG</option>
              <option value="SUPPLIER_VENDOR">SUPPLIER_VENDOR</option>
              <option value="AUDITOR_EKSTERNAL">AUDITOR_EKSTERNAL</option>
            </select>

            {/* Filter Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white py-2 px-3 text-xs text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              <option value="ALL">Semua Status</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="PENDING_ACTIVATION">PENDING_ACTIVATION</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="SUSPENDED">SUSPENDED</option>
            </select>

            {/* Filter 2FA */}
            <select
              value={twoFactorFilter}
              onChange={(e) => setTwoFactorFilter(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white py-2 px-3 text-xs text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              <option value="ALL">Semua 2FA</option>
              <option value="APP_AUTHENTICATOR">App Authenticator</option>
              <option value="SMS_OTP">SMS OTP</option>
              <option value="ENFORCED_REQUIRED">Wajib Setup</option>
              <option value="DISABLED">Disabled</option>
            </select>
          </div>

          {/* New User Action Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCreateNewUser}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Tambah Pengguna Baru
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/70 dark:border-gray-800 dark:bg-gray-800/40">
                <th className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">Pengguna & NIP</th>
                <th className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">Peran (Role RBAC)</th>
                <th className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">Unit & Wilayah</th>
                <th className="py-3.5 px-3 text-center font-bold text-gray-900 dark:text-white">Status 2FA</th>
                <th className="py-3.5 px-3 text-center font-bold text-gray-900 dark:text-white">Status Akun</th>
                <th className="py-3.5 px-3 font-bold text-gray-900 dark:text-white">Login Terakhir</th>
                <th className="py-3.5 px-4 text-right font-bold text-gray-900 dark:text-white">Aksi & Otorisasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500 dark:text-gray-400">
                    Tidak ditemukan data pengguna sesuai kriteria pencarian.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50/70 transition-colors dark:hover:bg-gray-800/40"
                  >
                    {/* Name + NIP + Avatar */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white text-xs shadow-xs">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                          <div className="font-mono text-[11px] text-gray-500 dark:text-gray-400">
                            NIP: {user.nip} &middot; <span className="text-gray-400">{user.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-3.5 px-3">
                      <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold ${getRoleBadge(user.role)}`}>
                        {user.role}
                      </span>
                      {user.permissionsCustomized && (
                        <span className="block mt-0.5 text-[9px] font-semibold text-indigo-600 dark:text-indigo-400">
                          * Custom Permissions
                        </span>
                      )}
                    </td>

                    {/* Unit & Wilayah */}
                    <td className="py-3.5 px-3">
                      <div className="font-medium text-gray-800 dark:text-gray-200">
                        {user.unit}
                      </div>
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">
                        {user.assignedRegion}
                      </div>
                    </td>

                    {/* 2FA Status */}
                    <td className="py-3.5 px-3 text-center">
                      {user.twoFactor === "APP_AUTHENTICATOR" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                          App OTP (Active)
                        </span>
                      )}
                      {user.twoFactor === "SMS_OTP" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                          SMS OTP
                        </span>
                      )}
                      {user.twoFactor === "ENFORCED_REQUIRED" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800">
                          Wajib Setup
                        </span>
                      )}
                      {user.twoFactor === "DISABLED" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800">
                          Disabled
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3 text-center">
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        title="Klik untuk ubah status cepat"
                        className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold cursor-pointer hover:opacity-80 transition-opacity ${getStatusBadge(user.status)}`}
                      >
                        {user.status}
                      </button>
                    </td>

                    {/* Last Login */}
                    <td className="py-3.5 px-3">
                      <div className="font-mono text-gray-700 dark:text-gray-300 text-[11px]">
                        {user.lastLogin}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {user.lastIp !== "-" ? `IP: ${user.lastIp}` : "Belum ada login"}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* Detail Modal */}
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setIsDetailModalOpen(true);
                          }}
                          title="Lihat Profil & Wewenang"
                          className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>

                        {/* RBAC Matrix */}
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setIsPermissionModalOpen(true);
                          }}
                          title="Atur Matriks Izin (RBAC)"
                          className="rounded-lg p-1.5 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/30"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </button>

                        {/* Security & Sessions */}
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setIsSecurityModalOpen(true);
                          }}
                          title="Sesi Aktif & Audit Keamanan"
                          className="rounded-lg p-1.5 text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/30"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </button>

                        {/* Print SK */}
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setIsPrintModalOpen(true);
                          }}
                          title="Cetak Berita Acara Hak Akses (SK)"
                          className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                          </svg>
                        </button>

                        {/* Edit User */}
                        <button
                          onClick={() => handleEditUser(user)}
                          title="Edit Akun"
                          className="rounded-lg p-1.5 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 px-5 py-3.5 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400 gap-2">
          <span>
            Menampilkan <strong className="text-gray-800 dark:text-gray-200">{filteredUsers.length}</strong> dari{" "}
            <strong className="text-gray-800 dark:text-gray-200">{users.length}</strong> total pengguna sistem
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Standar Keamanan: <strong>ISO/IEC 27001:2022 Certified</strong>
          </span>
        </div>
      </div>

      {/* Modals */}
      <UserDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        user={selectedUser}
        onOpenEdit={(u) => {
          setIsDetailModalOpen(false);
          handleEditUser(u);
        }}
        onOpenPermissions={(u) => {
          setIsDetailModalOpen(false);
          setSelectedUser(u);
          setIsPermissionModalOpen(true);
        }}
        onOpenSecurity={(u) => {
          setIsDetailModalOpen(false);
          setSelectedUser(u);
          setIsSecurityModalOpen(true);
        }}
        onOpenPrint={(u) => {
          setIsDetailModalOpen(false);
          setSelectedUser(u);
          setIsPrintModalOpen(true);
        }}
      />

      <UserFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSaveUser={handleSaveUser}
        userToEdit={userToEdit}
      />

      <RolePermissionMatrixModal
        isOpen={isPermissionModalOpen}
        onClose={() => setIsPermissionModalOpen(false)}
        user={selectedUser}
        onSavePermissions={handleSavePermissions}
      />

      <UserSecuritySessionsModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
        user={selectedUser}
        onUpdateUserSecurity={handleUpdateSecurity}
      />

      <UserAccessReportPrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
}
