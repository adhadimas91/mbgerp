"use client";
import React, { useState } from "react";
import { Employee } from "./EmployeeRegistryTable";

interface EmployeeRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (employee: Employee) => void;
}

export default function EmployeeRegistrationModal({
  isOpen,
  onClose,
  onAdd,
}: EmployeeRegistrationModalProps) {
  const [activeTab, setActiveTab] = useState<"biodata" | "placement" | "health" | "payroll">("biodata");

  // Form State
  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [nip, setNip] = useState(`MBG-SPPG-2026-0${Math.floor(10 + Math.random() * 90)}`);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bloodType, setBloodType] = useState("O+");
  const [role, setRole] = useState<Employee["role"]>("JURU_MASAK");
  const [department, setDepartment] = useState("Produksi & Dapur Sentral");
  const [sppgUnit, setSppgUnit] = useState("SPPG Harmoni Gambir - Jakarta Pusat");
  const [station, setStation] = useState("Stasiun Pengukus & Tumis Komersial");
  const [contractType, setContractType] = useState<Employee["contractType"]>("PKWT_KONTRAK");
  const [joinDate, setJoinDate] = useState("2026-08-27");

  // Health & Food Handler
  const [certNumber, setCertNumber] = useState(`KEMENKES/FH/2026/${Math.floor(1000 + Math.random() * 9000)}`);
  const [certStatus, setCertStatus] = useState<Employee["foodHandlerCert"]["status"]>("VALID");
  const [mcuDate, setMcuDate] = useState("2026-08-20");
  const [typhoidFree, setTyphoidFree] = useState(true);
  const [tbcFree, setTbcFree] = useState(true);
  const [hepatitisAFree, setHepatitisAFree] = useState(true);

  // Bank & BPJS
  const [bankName, setBankName] = useState("Bank Mandiri (Persero)");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [bpjsTk, setBpjsTk] = useState(`2601${Math.floor(1000000 + Math.random() * 9000000)}`);
  const [bpjsKes, setBpjsKes] = useState(`000281${Math.floor(1000000 + Math.random() * 9000000)}`);

  if (!isOpen) return null;

  const getRoleLabel = (r: Employee["role"]) => {
    switch (r) {
      case "KEPALA_SPPG": return "Kepala SPPG";
      case "AHLI_GIZI": return "Ahli Gizi & Penjamin AKG";
      case "CHEF_KEPALA": return "Head Chef / Juru Masak Utama";
      case "JURU_MASAK": return "Juru Masak Lini Produksi";
      case "HELPER_DAPUR": return "Helper Persiapan & Packing Termal";
      case "DRIVER_LOGISTIK": return "Driver Pengantaran Sekolah";
      case "QC_AUDITOR": return "Auditor Mutu & CCP ISO 22000";
      case "ADMIN_KEUANGAN": return "Staf Administrasi SPJ & Payroll";
    }
  };

  const handleRoleChange = (newRole: Employee["role"]) => {
    setRole(newRole);
    if (newRole === "AHLI_GIZI") {
      setDepartment("Nutrisi & Mutu Pangan");
      setStation("Laboratorium Uji Organoleptik & AKG");
    } else if (newRole === "DRIVER_LOGISTIK") {
      setDepartment("Logistik & Distribusi");
      setStation("Armada Kendaraan Termal MBG");
    } else if (newRole === "QC_AUDITOR") {
      setDepartment("Quality Assurance & K3");
      setStation("Pos Inspeksi Suhu & Higiene Dapur");
    } else if (newRole === "ADMIN_KEUANGAN") {
      setDepartment("Keuangan & Akuntansi");
      setStation("Kantor Administrasi SPPG");
    } else {
      setDepartment("Produksi & Dapur Sentral");
      setStation("Dapur Panas & Area Masak Utama");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !nik) {
      alert("Nama lengkap dan NIK wajib diisi!");
      return;
    }

    const newEmployee: Employee = {
      id: `EMP-0${Math.floor(10 + Math.random() * 90)}`,
      nip,
      nik,
      name,
      role,
      roleLabel: getRoleLabel(role),
      department,
      sppgUnit,
      phone: phone || "0812-3344-5566",
      email: email || `${name.toLowerCase().replace(/[^a-z]/g, "")}@mbg.go.id`,
      bloodType,
      joinDate,
      contractType,
      foodHandlerCert: {
        number: certNumber,
        issuer: "Kemenkes RI & Dinas Kesehatan DKI",
        issuedDate: "2026-08-01",
        expiryDate: "2029-08-01",
        status: certStatus,
      },
      mcuStatus: {
        lastCheckDate: mcuDate,
        nextCheckDate: "2027-02-20",
        typhoidFree,
        tbcFree,
        hepatitisAFree,
        status: (typhoidFree && tbcFree && hepatitisAFree) ? "FIT_FOR_FOOD" : "UNFIT",
      },
      bankAccount: {
        bankName,
        accountNumber: accountNumber || "137-00-9988771-2",
        accountHolder: accountHolder || name,
      },
      bpjsKetenagakerjaan: bpjsTk,
      bpjsKesehatan: bpjsKes,
      status: "AKTIF",
      station,
    };

    onAdd(newEmployee);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-white rounded-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Registrasi Tenaga Kerja & Kru Dapur MBG
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Pencatatan data SDM, penempatan unit SPPG, dan kelayakan sertifikasi Food Handler Kemenkes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 px-6">
          <button
            type="button"
            onClick={() => setActiveTab("biodata")}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === "biodata"
                ? "border-brand-500 text-brand-600 dark:text-brand-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            1. Biodata & Identitas
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("placement")}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === "placement"
                ? "border-brand-500 text-brand-600 dark:text-brand-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            2. Penempatan & Stasiun Dapur
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("health")}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === "health"
                ? "border-brand-500 text-brand-600 dark:text-brand-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            3. Sertifikasi & MCU Kemenkes
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("payroll")}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === "payroll"
                ? "border-brand-500 text-brand-600 dark:text-brand-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            4. Rekening Bank & BPJS
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
            {/* TAB 1: BIODATA */}
            {activeTab === "biodata" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Nama Lengkap & Gelar *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Chef Rahmat Hidayat, S.Tr.Gz."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Nomor Induk Kependudukan (NIK - 16 Digit) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    placeholder="3171012345670001"
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    NIP / ID Tenaga Kerja MBG (Auto)
                  </label>
                  <input
                    type="text"
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-mono bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Nomor HP / WhatsApp Aktif
                  </label>
                  <input
                    type="tel"
                    placeholder="0812-xxxx-xxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Email Kedinasan MBG
                  </label>
                  <input
                    type="email"
                    placeholder="nama.karyawan@mbg.go.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Golongan Darah (Untuk Data K3 Dapur)
                  </label>
                  <select
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                  >
                    <option value="O+">O Positif (O+)</option>
                    <option value="A+">A Positif (A+)</option>
                    <option value="B+">B Positif (B+)</option>
                    <option value="AB+">AB Positif (AB+)</option>
                    <option value="O-">O Negatif (O-)</option>
                    <option value="A-">A Negatif (A-)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Tanggal Mulai Bergabung
                  </label>
                  <input
                    type="date"
                    value={joinDate}
                    onChange={(e) => setJoinDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: PLACEMENT */}
            {activeTab === "placement" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Posisi / Peran Tugas *
                  </label>
                  <select
                    value={role}
                    onChange={(e) => handleRoleChange(e.target.value as Employee["role"])}
                    className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                  >
                    <option value="KEPALA_SPPG">Kepala SPPG</option>
                    <option value="AHLI_GIZI">Ahli Gizi & Dietisien</option>
                    <option value="CHEF_KEPALA">Head Chef / Juru Masak Utama</option>
                    <option value="JURU_MASAK">Juru Masak Lini Produksi</option>
                    <option value="HELPER_DAPUR">Helper Persiapan & Packing</option>
                    <option value="DRIVER_LOGISTIK">Driver Pengantaran Sekolah</option>
                    <option value="QC_AUDITOR">Auditor Kualitas & CCP ISO 22000</option>
                    <option value="ADMIN_KEUANGAN">Staf Keuangan & SPJ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Unit Dapur SPPG MBG *
                  </label>
                  <select
                    value={sppgUnit}
                    onChange={(e) => setSppgUnit(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                  >
                    <option value="SPPG Harmoni Gambir - Jakarta Pusat">SPPG Harmoni Gambir - Jakarta Pusat</option>
                    <option value="SPPG Senen Raya - Jakarta Pusat">SPPG Senen Raya - Jakarta Pusat</option>
                    <option value="SPPG Kebayoran Baru - Jakarta Selatan">SPPG Kebayoran Baru - Jakarta Selatan</option>
                    <option value="SPPG Matraman Sentral - Jakarta Timur">SPPG Matraman Sentral - Jakarta Timur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Stasiun Kerja Spesifik Dapur
                  </label>
                  <input
                    type="text"
                    value={station}
                    onChange={(e) => setStation(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Jenis Ikatan Kontrak
                  </label>
                  <select
                    value={contractType}
                    onChange={(e) => setContractType(e.target.value as Employee["contractType"])}
                    className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                  >
                    <option value="PKWTT_TETAP">Tetap BGN (PKWTT)</option>
                    <option value="PKWT_KONTRAK">Kontrak SPPG 1 Tahun (PKWT)</option>
                    <option value="MITRA_HARIAN">Mitra Harian Lepas</option>
                  </select>
                </div>
              </div>
            )}

            {/* TAB 3: HEALTH & CERT */}
            {activeTab === "health" && (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl dark:bg-emerald-500/5 dark:border-emerald-500/20">
                  <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-2">
                    Standar Kelaikan Food Handler Permenkes No. 1096/2011
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nomor Sertifikat Penjamah Makanan
                      </label>
                      <input
                        type="text"
                        value={certNumber}
                        onChange={(e) => setCertNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Status Sertifikasi
                      </label>
                      <select
                        value={certStatus}
                        onChange={(e) => setCertStatus(e.target.value as Employee["foodHandlerCert"]["status"])}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <option value="VALID">Tersertifikasi Aktif (Valid)</option>
                        <option value="EXPIRING_SOON">Segera Expired (&lt; 30 Hari)</option>
                        <option value="NOT_CERTIFIED">Belum Tersertifikasi</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-cyan-50/50 border border-cyan-200 rounded-xl dark:bg-cyan-500/5 dark:border-cyan-500/20">
                  <h4 className="text-xs font-bold text-cyan-800 dark:text-cyan-300 uppercase tracking-wider mb-2">
                    Hasil Uji Laboratorium & Rekam MCU Dapur
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tanggal Medical Check-Up Terakhir
                      </label>
                      <input
                        type="date"
                        value={mcuDate}
                        onChange={(e) => setMcuDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={typhoidFree}
                        onChange={(e) => setTyphoidFree(e.target.checked)}
                        className="w-4 h-4 text-brand-600 rounded border-gray-300 focus:ring-brand-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        Hasil Uji Swab Rektal: <strong>Negatif / Bebas Salmonella Typhi</strong>
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tbcFree}
                        onChange={(e) => setTbcFree(e.target.checked)}
                        className="w-4 h-4 text-brand-600 rounded border-gray-300 focus:ring-brand-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        Hasil Rontgen Toraks: <strong>Paru-paru Sehat / Bebas TBC Aktif</strong>
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hepatitisAFree}
                        onChange={(e) => setHepatitisAFree(e.target.checked)}
                        className="w-4 h-4 text-brand-600 rounded border-gray-300 focus:ring-brand-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        Hasil Uji Serologi: <strong>Non-Reaktif / Bebas Virus Hepatitis A</strong>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: PAYROLL & BPJS */}
            {activeTab === "payroll" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Bank BUMN Penyalur Gaji
                  </label>
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                  >
                    <option value="Bank Mandiri (Persero)">Bank Mandiri (Persero)</option>
                    <option value="Bank Rakyat Indonesia (BRI)">Bank Rakyat Indonesia (BRI)</option>
                    <option value="Bank Negara Indonesia (BNI)">Bank Negara Indonesia (BNI)</option>
                    <option value="Bank Syariah Indonesia (BSI)">Bank Syariah Indonesia (BSI)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Nomor Rekening
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 137-00-1234567-8"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Nama Pemilik Rekening (Sesuai Buku Tabungan)
                  </label>
                  <input
                    type="text"
                    placeholder="Nama sesuai KTP"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Nomor Kartu BPJS Ketenagakerjaan
                  </label>
                  <input
                    type="text"
                    value={bpjsTk}
                    onChange={(e) => setBpjsTk(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Nomor Kartu BPJS Kesehatan
                  </label>
                  <input
                    type="text"
                    value={bpjsKes}
                    onChange={(e) => setBpjsKes(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            <div className="text-xs text-gray-500">
              {activeTab === "biodata" && "Langkah 1 dari 4: Identitas Dasar"}
              {activeTab === "placement" && "Langkah 2 dari 4: Penugasan Dapur"}
              {activeTab === "health" && "Langkah 3 dari 4: Kepatuhan ISO & Kemenkes"}
              {activeTab === "payroll" && "Langkah 4 dari 4: Rekening & Jamsos"}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-brand-500 rounded-xl hover:bg-brand-600 shadow-theme-xs cursor-pointer"
              >
                Simpan & Daftarkan Karyawan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
