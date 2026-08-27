"use client";
import React, { useState } from "react";
import EmployeeRegistrationModal from "./EmployeeRegistrationModal";
import EmployeeDetailModal from "./EmployeeDetailModal";
import EmployeeIdCardPrintModal from "./EmployeeIdCardPrintModal";
import SalaryStructureSetupModal from "./SalaryStructureSetupModal";

export interface Employee {
  id: string;
  nip: string;
  nik: string;
  name: string;
  role: "KEPALA_SPPG" | "AHLI_GIZI" | "CHEF_KEPALA" | "JURU_MASAK" | "HELPER_DAPUR" | "DRIVER_LOGISTIK" | "QC_AUDITOR" | "ADMIN_KEUANGAN";
  roleLabel: string;
  department: string;
  sppgUnit: string;
  phone: string;
  email: string;
  bloodType: string;
  joinDate: string;
  contractType: "PKWTT_TETAP" | "PKWT_KONTRAK" | "MITRA_HARIAN";
  contractEnd?: string;
  foodHandlerCert: {
    number: string;
    issuer: string;
    issuedDate: string;
    expiryDate: string;
    status: "VALID" | "EXPIRING_SOON" | "EXPIRED" | "NOT_CERTIFIED";
  };
  mcuStatus: {
    lastCheckDate: string;
    nextCheckDate: string;
    typhoidFree: boolean;
    tbcFree: boolean;
    hepatitisAFree: boolean;
    status: "FIT_FOR_FOOD" | "TEMPORARY_RESTRICTED" | "UNFIT";
  };
  bankAccount: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  bpjsKetenagakerjaan: string;
  bpjsKesehatan: string;
  status: "AKTIF" | "CUTI" | "NON_AKTIF";
  station: string;
  avatarUrl?: string;
}

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: "EMP-001",
    nip: "MBG-SPPG-2026-001",
    nik: "3171021405880003",
    name: "Dr. Hendra Gunawan, S.TP., M.Si.",
    role: "KEPALA_SPPG",
    roleLabel: "Kepala SPPG Harmoni",
    department: "Manajemen & Operasional",
    sppgUnit: "SPPG Harmoni Gambir - Jakarta Pusat",
    phone: "0812-3456-7890",
    email: "hendra.gunawan@mbg.go.id",
    bloodType: "O+",
    joinDate: "2026-01-05",
    contractType: "PKWTT_TETAP",
    foodHandlerCert: {
      number: "KEMENKES/FH/2026/0891",
      issuer: "Kemenkes RI & Dinas Kesehatan DKI",
      issuedDate: "2026-01-10",
      expiryDate: "2029-01-10",
      status: "VALID",
    },
    mcuStatus: {
      lastCheckDate: "2026-07-15",
      nextCheckDate: "2027-01-15",
      typhoidFree: true,
      tbcFree: true,
      hepatitisAFree: true,
      status: "FIT_FOR_FOOD",
    },
    bankAccount: {
      bankName: "Bank Mandiri (Persero)",
      accountNumber: "137-00-1928374-1",
      accountHolder: "Hendra Gunawan",
    },
    bpjsKetenagakerjaan: "26019283741",
    bpjsKesehatan: "0002819283719",
    status: "AKTIF",
    station: "Pusat Komando SPPG",
  },
  {
    id: "EMP-002",
    nip: "MBG-SPPG-2026-002",
    nik: "3275034809920005",
    name: "Nurul Aini, S.Gz., Dietisien",
    role: "AHLI_GIZI",
    roleLabel: "Ahli Gizi & Penjamin AKG",
    department: "Nutrisi & Mutu Pangan",
    sppgUnit: "SPPG Harmoni Gambir - Jakarta Pusat",
    phone: "0813-8899-7711",
    email: "nurul.aini@mbg.go.id",
    bloodType: "A+",
    joinDate: "2026-01-08",
    contractType: "PKWTT_TETAP",
    foodHandlerCert: {
      number: "KEMENKES/NUT/2026/0122",
      issuer: "Persagi & Kemenkes RI",
      issuedDate: "2026-01-15",
      expiryDate: "2029-01-15",
      status: "VALID",
    },
    mcuStatus: {
      lastCheckDate: "2026-07-20",
      nextCheckDate: "2027-01-20",
      typhoidFree: true,
      tbcFree: true,
      hepatitisAFree: true,
      status: "FIT_FOR_FOOD",
    },
    bankAccount: {
      bankName: "Bank Rakyat Indonesia (BRI)",
      accountNumber: "0341-01-002918-50-3",
      accountHolder: "Nurul Aini",
    },
    bpjsKetenagakerjaan: "26019283742",
    bpjsKesehatan: "0002819283720",
    status: "AKTIF",
    station: "Laboratorium Uji Organoleptik & AKG",
  },
  {
    id: "EMP-003",
    nip: "MBG-SPPG-2026-003",
    nik: "3174092203870001",
    name: "Chef Bambang Sutrisno",
    role: "CHEF_KEPALA",
    roleLabel: "Head Chef / Juru Masak Utama",
    department: "Produksi & Dapur Sentral",
    sppgUnit: "SPPG Harmoni Gambir - Jakarta Pusat",
    phone: "0811-9283-4712",
    email: "bambang.sutrisno@mbg.go.id",
    bloodType: "B+",
    joinDate: "2026-01-10",
    contractType: "PKWTT_TETAP",
    foodHandlerCert: {
      number: "BNSP/CHEF/2025/9912",
      issuer: "BNSP & LSP Kuliner Indonesia",
      issuedDate: "2025-11-20",
      expiryDate: "2028-11-20",
      status: "VALID",
    },
    mcuStatus: {
      lastCheckDate: "2026-08-01",
      nextCheckDate: "2027-02-01",
      typhoidFree: true,
      tbcFree: true,
      hepatitisAFree: true,
      status: "FIT_FOR_FOOD",
    },
    bankAccount: {
      bankName: "Bank Negara Indonesia (BNI)",
      accountNumber: "0892-8172-34",
      accountHolder: "Bambang Sutrisno",
    },
    bpjsKetenagakerjaan: "26019283743",
    bpjsKesehatan: "0002819283721",
    status: "AKTIF",
    station: "Dapur Panas (Main Kitchen Line 1)",
  },
  {
    id: "EMP-004",
    nip: "MBG-SPPG-2026-004",
    nik: "3173051108940008",
    name: "Siti Rahmawati",
    role: "JURU_MASAK",
    roleLabel: "Juru Masak Lini Sayur & Protein",
    department: "Produksi & Dapur Sentral",
    sppgUnit: "SPPG Harmoni Gambir - Jakarta Pusat",
    phone: "0857-1928-3746",
    email: "siti.rahmawati@mbg.go.id",
    bloodType: "AB+",
    joinDate: "2026-02-01",
    contractType: "PKWT_KONTRAK",
    contractEnd: "2027-01-31",
    foodHandlerCert: {
      number: "KEMENKES/FH/2026/1042",
      issuer: "Dinas Kesehatan DKI Jakarta",
      issuedDate: "2026-02-10",
      expiryDate: "2029-02-10",
      status: "VALID",
    },
    mcuStatus: {
      lastCheckDate: "2026-08-05",
      nextCheckDate: "2027-02-05",
      typhoidFree: true,
      tbcFree: true,
      hepatitisAFree: true,
      status: "FIT_FOR_FOOD",
    },
    bankAccount: {
      bankName: "Bank Syariah Indonesia (BSI)",
      accountNumber: "7192-8374-01",
      accountHolder: "Siti Rahmawati",
    },
    bpjsKetenagakerjaan: "26019283744",
    bpjsKesehatan: "0002819283722",
    status: "AKTIF",
    station: "Stasiun Pengukus & Tumis Komersial",
  },
  {
    id: "EMP-005",
    nip: "MBG-SPPG-2026-005",
    nik: "3276081907960002",
    name: "Agus Pratama",
    role: "HELPER_DAPUR",
    roleLabel: "Helper Persiapan & Packing Termal",
    department: "Produksi & Dapur Sentral",
    sppgUnit: "SPPG Harmoni Gambir - Jakarta Pusat",
    phone: "0878-9921-3847",
    email: "agus.pratama@mbg.go.id",
    bloodType: "O-",
    joinDate: "2026-02-15",
    contractType: "PKWT_KONTRAK",
    contractEnd: "2027-02-14",
    foodHandlerCert: {
      number: "KEMENKES/FH/2026/1209",
      issuer: "Dinas Kesehatan DKI Jakarta",
      issuedDate: "2026-02-18",
      expiryDate: "2026-09-15",
      status: "EXPIRING_SOON",
    },
    mcuStatus: {
      lastCheckDate: "2026-02-15",
      nextCheckDate: "2026-08-30",
      typhoidFree: true,
      tbcFree: true,
      hepatitisAFree: true,
      status: "FIT_FOR_FOOD",
    },
    bankAccount: {
      bankName: "Bank Rakyat Indonesia (BRI)",
      accountNumber: "0219-01-098234-50-9",
      accountHolder: "Agus Pratama",
    },
    bpjsKetenagakerjaan: "26019283745",
    bpjsKesehatan: "0002819283723",
    status: "AKTIF",
    station: "Lini Pengemasan & Sealing Ompreng Termal",
  },
  {
    id: "EMP-006",
    nip: "MBG-SPPG-2026-006",
    nik: "3175041011910004",
    name: "Rian Hidayat",
    role: "DRIVER_LOGISTIK",
    roleLabel: "Driver Pengantaran Sekolah Klaster A",
    department: "Logistik & Distribusi",
    sppgUnit: "SPPG Harmoni Gambir - Jakarta Pusat",
    phone: "0896-7788-9900",
    email: "rian.hidayat@mbg.go.id",
    bloodType: "A+",
    joinDate: "2026-01-12",
    contractType: "PKWT_KONTRAK",
    contractEnd: "2027-01-11",
    foodHandlerCert: {
      number: "KEMENKES/LOG/2026/0488",
      issuer: "Dinas Perhubungan & Dinkes DKI",
      issuedDate: "2026-01-20",
      expiryDate: "2029-01-20",
      status: "VALID",
    },
    mcuStatus: {
      lastCheckDate: "2026-07-25",
      nextCheckDate: "2027-01-25",
      typhoidFree: true,
      tbcFree: true,
      hepatitisAFree: true,
      status: "FIT_FOR_FOOD",
    },
    bankAccount: {
      bankName: "Bank Mandiri (Persero)",
      accountNumber: "137-00-8817263-4",
      accountHolder: "Rian Hidayat",
    },
    bpjsKetenagakerjaan: "26019283746",
    bpjsKesehatan: "0002819283724",
    status: "AKTIF",
    station: "Armada Mobil Boks Termal B-9182-MBG",
  },
  {
    id: "EMP-007",
    nip: "MBG-SPPG-2026-007",
    nik: "3171091502930007",
    name: "Ratna Kusuma, S.Si.",
    role: "QC_AUDITOR",
    roleLabel: "Auditor Mutu & CCP ISO 22000",
    department: "Quality Assurance & K3",
    sppgUnit: "SPPG Harmoni Gambir - Jakarta Pusat",
    phone: "0812-7711-2233",
    email: "ratna.kusuma@mbg.go.id",
    bloodType: "O+",
    joinDate: "2026-01-05",
    contractType: "PKWTT_TETAP",
    foodHandlerCert: {
      number: "ISO22K/AUD/2025/1190",
      issuer: "IRCA & Mutu Certification",
      issuedDate: "2025-10-15",
      expiryDate: "2028-10-15",
      status: "VALID",
    },
    mcuStatus: {
      lastCheckDate: "2026-07-10",
      nextCheckDate: "2027-01-10",
      typhoidFree: true,
      tbcFree: true,
      hepatitisAFree: true,
      status: "FIT_FOR_FOOD",
    },
    bankAccount: {
      bankName: "Bank Negara Indonesia (BNI)",
      accountNumber: "0912-7361-90",
      accountHolder: "Ratna Kusuma",
    },
    bpjsKetenagakerjaan: "26019283747",
    bpjsKesehatan: "0002819283725",
    status: "AKTIF",
    station: "Pos Pengawasan Suhu Masak & Higiene Dapur",
  },
  {
    id: "EMP-008",
    nip: "MBG-SPPG-2026-008",
    nik: "3172081206950002",
    name: "Dedi Supriyanto, S.E.",
    role: "ADMIN_KEUANGAN",
    roleLabel: "Staf Administrasi SPJ & Payroll",
    department: "Keuangan & Akuntansi",
    sppgUnit: "SPPG Harmoni Gambir - Jakarta Pusat",
    phone: "0813-1122-3344",
    email: "dedi.supriyanto@mbg.go.id",
    bloodType: "B+",
    joinDate: "2026-01-15",
    contractType: "PKWTT_TETAP",
    foodHandlerCert: {
      number: "-",
      issuer: "-",
      issuedDate: "-",
      expiryDate: "-",
      status: "NOT_CERTIFIED",
    },
    mcuStatus: {
      lastCheckDate: "2026-06-15",
      nextCheckDate: "2027-06-15",
      typhoidFree: true,
      tbcFree: true,
      hepatitisAFree: true,
      status: "FIT_FOR_FOOD",
    },
    bankAccount: {
      bankName: "Bank Mandiri (Persero)",
      accountNumber: "137-00-6627182-9",
      accountHolder: "Dedi Supriyanto",
    },
    bpjsKetenagakerjaan: "26019283748",
    bpjsKesehatan: "0002819283726",
    status: "AKTIF",
    station: "Kantor Administrasi SPPG",
  },
];

export default function EmployeeRegistryTable() {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [certFilter, setCertFilter] = useState("ALL");

  // Modals state
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedEmployeeDetail, setSelectedEmployeeDetail] = useState<Employee | null>(null);
  const [selectedEmployeeIdCard, setSelectedEmployeeIdCard] = useState<Employee | null>(null);
  const [selectedSalarySetup, setSelectedSalarySetup] = useState<Employee | null>(null);

  // Filter logic
  const filteredEmployees = employees.filter((emp) => {
    const matchSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.nip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.nik.includes(searchQuery) ||
      emp.roleLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.station.toLowerCase().includes(searchQuery.toLowerCase());

    const matchRole = roleFilter === "ALL" || emp.role === roleFilter;
    const matchStatus = statusFilter === "ALL" || emp.status === statusFilter;
    const matchCert =
      certFilter === "ALL" ||
      (certFilter === "VALID" && emp.foodHandlerCert.status === "VALID") ||
      (certFilter === "EXPIRING_SOON" && emp.foodHandlerCert.status === "EXPIRING_SOON") ||
      (certFilter === "NOT_CERTIFIED" && (emp.foodHandlerCert.status === "NOT_CERTIFIED" || emp.foodHandlerCert.status === "EXPIRED"));

    return matchSearch && matchRole && matchStatus && matchCert;
  });

  const totalEmployees = employees.length;
  const totalCertified = employees.filter((e) => e.foodHandlerCert.status === "VALID").length;
  const totalFitMcu = employees.filter((e) => e.mcuStatus.status === "FIT_FOR_FOOD").length;
  const totalKitchenCrew = employees.filter((e) => ["CHEF_KEPALA", "JURU_MASAK", "HELPER_DAPUR"].includes(e.role)).length;

  const handleAddEmployee = (newEmp: Employee) => {
    setEmployees((prev) => [newEmp, ...prev]);
  };

  const getRoleBadge = (role: Employee["role"]) => {
    switch (role) {
      case "KEPALA_SPPG":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/20";
      case "AHLI_GIZI":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20";
      case "CHEF_KEPALA":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20";
      case "JURU_MASAK":
        return "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-300 dark:border-orange-500/20";
      case "HELPER_DAPUR":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20";
      case "DRIVER_LOGISTIK":
        return "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-300 dark:border-cyan-500/20";
      case "QC_AUDITOR":
        return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/20";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
    }
  };

  const getCertBadge = (status: Employee["foodHandlerCert"]["status"]) => {
    switch (status) {
      case "VALID":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Kemenkes Valid
          </span>
        );
      case "EXPIRING_SOON":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Segera Expired
          </span>
        );
      case "EXPIRED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            Kadaluarsa
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">
            Non-Food Contact
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-theme-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
              Total SDM SPPG
            </span>
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{totalEmployees} Personil</h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Dapur Sentral, Ahli Gizi & Armada</p>
          </div>
        </div>

        <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-theme-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
              Food Handler Bersertifikat
            </span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalCertified} <span className="text-xs font-medium text-emerald-600">({Math.round((totalCertified / (totalEmployees - 1)) * 100)}%)</span>
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Standar Permenkes No. 1096/2011</p>
          </div>
        </div>

        <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-theme-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
              Lolos MCU Laboratorium
            </span>
            <span className="p-2 rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{totalFitMcu} / {totalEmployees}</h3>
            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">Bebas TBC, Typhoid & Hep A</p>
          </div>
        </div>

        <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-theme-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
              Kru Produksi & Dapur
            </span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{totalKitchenCrew} Kru</h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Siap Operasional Shift Dini Hari</p>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="p-6 bg-white border border-gray-200 rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 shadow-theme-xs">
        {/* Table Controls */}
        <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Cari Nama, NIP, NIK, Posisi, Stasiun Kerja..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:bg-gray-900/50 dark:border-gray-700 dark:text-white"
              />
              <svg
                className="w-4 h-4 text-gray-400 absolute left-3.5 top-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filter by Role */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:bg-gray-900/50 dark:border-gray-700 dark:text-white"
            >
              <option value="ALL">Semua Peran / Divisi</option>
              <option value="KEPALA_SPPG">Kepala SPPG</option>
              <option value="AHLI_GIZI">Ahli Gizi</option>
              <option value="CHEF_KEPALA">Head Chef</option>
              <option value="JURU_MASAK">Juru Masak</option>
              <option value="HELPER_DAPUR">Helper Dapur & Packing</option>
              <option value="DRIVER_LOGISTIK">Driver Logistik</option>
              <option value="QC_AUDITOR">QC & Auditor ISO</option>
              <option value="ADMIN_KEUANGAN">Admin & Keuangan</option>
            </select>

            {/* Filter by Cert */}
            <select
              value={certFilter}
              onChange={(e) => setCertFilter(e.target.value)}
              className="px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:bg-gray-900/50 dark:border-gray-700 dark:text-white"
            >
              <option value="ALL">Semua Status Sertifikasi</option>
              <option value="VALID">Kemenkes Valid</option>
              <option value="EXPIRING_SOON">Segera Expired</option>
              <option value="NOT_CERTIFIED">Non-Sertifikasi / Lainnya</option>
            </select>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <a
              href="/employees/payroll"
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 rounded-xl transition-colors dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Kelola Gaji (Payroll)
            </a>

            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white transition-colors rounded-xl bg-brand-500 hover:bg-brand-600 shadow-theme-xs cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Tambah Karyawan Baru
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-800">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500 border-b border-gray-200 dark:bg-gray-900/50 dark:border-gray-800 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3.5">Tenaga Kerja & NIP</th>
                <th className="px-4 py-3.5">Peran / Jabatan</th>
                <th className="px-4 py-3.5">Stasiun Kerja / Unit</th>
                <th className="px-4 py-3.5">Sertifikat Food Handler</th>
                <th className="px-4 py-3.5">Status MCU</th>
                <th className="px-4 py-3.5">Status Kontrak</th>
                <th className="px-4 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    Tidak ditemukan data tenaga kerja yang sesuai dengan filter.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="hover:bg-gray-50/80 dark:hover:bg-gray-900/30 transition-colors"
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                          {emp.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            {emp.name}
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-normal">
                              Gol: {emp.bloodType}
                            </span>
                          </div>
                          <div className="text-xs font-mono text-gray-500 dark:text-gray-400">
                            NIP: {emp.nip}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadge(emp.role)}`}>
                        {emp.roleLabel}
                      </span>
                      <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                        {emp.department}
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="text-xs font-medium text-gray-800 dark:text-gray-200">
                        {emp.station}
                      </div>
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">
                        {emp.sppgUnit.split("-")[0]}
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      {getCertBadge(emp.foodHandlerCert.status)}
                      {emp.foodHandlerCert.number !== "-" && (
                        <div className="text-[10px] font-mono text-gray-500 dark:text-gray-400 mt-0.5">
                          Exp: {emp.foodHandlerCert.expiryDate}
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-3.5">
                      {emp.mcuStatus.status === "FIT_FOR_FOOD" ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Layak Dapur
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          Perlu MCU Ulang
                        </span>
                      )}
                      <div className="text-[10px] text-gray-500 dark:text-gray-400">
                        Uji: {emp.mcuStatus.lastCheckDate}
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        {emp.contractType === "PKWTT_TETAP" ? "Tetap BGN" : emp.contractType === "PKWT_KONTRAK" ? "Kontrak SPPG" : "Mitra Harian"}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedSalarySetup(emp)}
                          title="Atur Struktur Gaji & Tunjangan"
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg dark:hover:bg-emerald-500/10 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setSelectedEmployeeIdCard(emp)}
                          title="Cetak ID Badge MBG"
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg dark:hover:bg-blue-500/10 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setSelectedEmployeeDetail(emp)}
                          title="Lihat Profil Detail"
                          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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
      </div>

      {/* Registration Modal */}
      {isRegisterModalOpen && (
        <EmployeeRegistrationModal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
          onAdd={handleAddEmployee}
        />
      )}

      {/* Detail Modal */}
      {selectedEmployeeDetail && (
        <EmployeeDetailModal
          employee={selectedEmployeeDetail}
          isOpen={!!selectedEmployeeDetail}
          onClose={() => setSelectedEmployeeDetail(null)}
          onOpenIdCard={() => {
            const emp = selectedEmployeeDetail;
            setSelectedEmployeeDetail(null);
            setSelectedEmployeeIdCard(emp);
          }}
        />
      )}

      {/* ID Card Print Modal */}
      {selectedEmployeeIdCard && (
        <EmployeeIdCardPrintModal
          employee={selectedEmployeeIdCard}
          isOpen={!!selectedEmployeeIdCard}
          onClose={() => setSelectedEmployeeIdCard(null)}
        />
      )}

      {/* Salary Structure Setup Modal */}
      {selectedSalarySetup && (
        <SalaryStructureSetupModal
          employee={selectedSalarySetup}
          isOpen={!!selectedSalarySetup}
          onClose={() => setSelectedSalarySetup(null)}
          onSave={(updated) => {
            setEmployees((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
          }}
        />
      )}
    </div>
  );
}
