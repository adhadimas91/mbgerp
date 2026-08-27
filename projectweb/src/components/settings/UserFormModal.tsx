"use client";

import React, { useState, useEffect } from "react";
import { UserAccount, UserRole, UserStatus, TwoFactorStatus } from "./UserManagementTable";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveUser: (userData: Partial<UserAccount>) => void;
  userToEdit: UserAccount | null;
}

export default function UserFormModal({
  isOpen,
  onClose,
  onSaveUser,
  userToEdit,
}: UserFormModalProps) {
  const [name, setName] = useState("");
  const [nip, setNip] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<UserRole>("KEPALA_SPPG");
  const [unit, setUnit] = useState("SPPG Sentral Harmoni 01");
  const [assignedRegion, setAssignedRegion] = useState("DKI Jakarta & Sekitarnya");
  const [status, setStatus] = useState<UserStatus>("ACTIVE");
  const [twoFactor, setTwoFactor] = useState<TwoFactorStatus>("APP_AUTHENTICATOR");
  const [temporaryPassword, setTemporaryPassword] = useState("");
  const [accountExpiry, setAccountExpiry] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setNip(userToEdit.nip);
      setEmail(userToEdit.email);
      setPhone(userToEdit.phone);
      setRole(userToEdit.role);
      setUnit(userToEdit.unit);
      setAssignedRegion(userToEdit.assignedRegion);
      setStatus(userToEdit.status);
      setTwoFactor(userToEdit.twoFactor);
      setTemporaryPassword("");
      setAccountExpiry(userToEdit.accountExpiry || "");
      setNotes(userToEdit.notes || "");
    } else {
      setName("");
      setNip(`199${Math.floor(10000000 + Math.random() * 90000000)}`);
      setEmail("");
      setPhone("+62 8");
      setRole("KEPALA_SPPG");
      setUnit("SPPG Sentral Harmoni 01");
      setAssignedRegion("DKI Jakarta & Sekitarnya");
      setStatus("ACTIVE");
      setTwoFactor("APP_AUTHENTICATOR");
      setTemporaryPassword(generateRandomPassword());
      setAccountExpiry("");
      setNotes("");
    }
    setErrors({});
  }, [userToEdit, isOpen]);

  function generateRandomPassword() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%";
    let pass = "";
    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
  }

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Nama lengkap wajib diisi.";
    if (!nip.trim()) newErrors.nip = "NIP / Nomor Pegawai wajib diisi.";
    if (!email.trim() || !email.includes("@")) newErrors.email = "Email resmi tidak valid.";
    if (!phone.trim()) newErrors.phone = "Nomor kontak wajib diisi.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSaveUser({
      ...(userToEdit ? { id: userToEdit.id } : {}),
      name,
      nip,
      email,
      phone,
      role,
      unit,
      assignedRegion,
      status,
      twoFactor,
      accountExpiry: accountExpiry || null,
      notes,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl dark:bg-gray-900 dark:border dark:border-gray-800 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {userToEdit ? "Ubah Data Akun Pengguna" : "Registrasi Pengguna & Hak Akses Baru"}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Pemberian wewenang peran sistem ERP MBG berstandar ISO 27001
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
            {/* Nama & NIP */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Nama Lengkap & Gelar *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Dr. Ir. Rahmat Hidayat, M.Si."
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  NIP / ID Pegawai Sistem *
                </label>
                <input
                  type="text"
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  placeholder="199001012022031001"
                  className="w-full font-mono rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                {errors.nip && <p className="text-[11px] text-red-600 mt-1">{errors.nip}</p>}
              </div>
            </div>

            {/* Email & Telepon */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Email Resmi Kedinasan / Instansi *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama.pegawai@mbg.go.id"
                  className="w-full font-mono rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Nomor WhatsApp / Kontak *
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+62 812-3456-7890"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Peran Sistem & Status Akun */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Peran Utama Sistem (Role RBAC) *
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="ADMIN_PUSAT">ADMIN_PUSAT (Administrator BGN)</option>
                  <option value="ADMIN_REGIONAL">ADMIN_REGIONAL (Koordinator Wilayah)</option>
                  <option value="KEPALA_SPPG">KEPALA_SPPG (Kepala Dapur Sentral)</option>
                  <option value="AHLI_GIZI">AHLI_GIZI (Nutrisionis & Resep AKG)</option>
                  <option value="INSPEKTUR_MUTU_QC">INSPEKTUR_MUTU_QC (Food Safety & ISO)</option>
                  <option value="BENDAHARA_PPK">BENDAHARA_PPK (Keuangan & SP2D)</option>
                  <option value="TIM_LOGISTIK_DRIVER">TIM_LOGISTIK_DRIVER (Armada & PoD)</option>
                  <option value="PETUGAS_GUDANG">PETUGAS_GUDANG (Inventory & Cold Storage)</option>
                  <option value="SUPPLIER_VENDOR">SUPPLIER_VENDOR (Rekanan Pangan)</option>
                  <option value="AUDITOR_EKSTERNAL">AUDITOR_EKSTERNAL (BPK / Inspektorat)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Status Akun
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as UserStatus)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="ACTIVE">ACTIVE (Aktif & Terotorisasi)</option>
                  <option value="PENDING_ACTIVATION">PENDING_ACTIVATION (Menunggu Verifikasi 2FA)</option>
                  <option value="INACTIVE">INACTIVE (Nonaktif Sementara)</option>
                  <option value="SUSPENDED">SUSPENDED (Dibekukan oleh CISO)</option>
                </select>
              </div>
            </div>

            {/* Unit & Wilayah */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Unit Kerja / Lokasi Dapur SPPG
                </label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="Contoh: Dapur Sentral Harmoni 01"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Wilayah Koordinasi
                </label>
                <input
                  type="text"
                  value={assignedRegion}
                  onChange={(e) => setAssignedRegion(e.target.value)}
                  placeholder="Contoh: DKI Jakarta & Sekitarnya"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>

            {/* Keamanan: 2FA & Expiry Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Kebijakan Autentikasi 2FA (ISO 27001)
                </label>
                <select
                  value={twoFactor}
                  onChange={(e) => setTwoFactor(e.target.value as TwoFactorStatus)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="APP_AUTHENTICATOR">APP_AUTHENTICATOR (Google / MS Authenticator - Disarankan)</option>
                  <option value="SMS_OTP">SMS_OTP (One-Time Password SMS)</option>
                  <option value="ENFORCED_REQUIRED">ENFORCED_REQUIRED (Wajib Setup Saat Pertama Login)</option>
                  <option value="DISABLED">DISABLED (Tidak Direkomendasikan)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Masa Berlaku Akun (Opsional)
                </label>
                <input
                  type="date"
                  value={accountExpiry}
                  onChange={(e) => setAccountExpiry(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                  Kosongkan jika akun permanen (selama status aktif).
                </p>
              </div>
            </div>

            {/* Password Generator for New User */}
            {!userToEdit && (
              <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3.5 dark:border-blue-900/30 dark:bg-blue-900/10">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-blue-950 dark:text-blue-300">
                      Password Sementara (Secure Generated)
                    </label>
                    <span className="text-[11px] text-blue-700 dark:text-blue-400">
                      Pengguna wajib mengganti password saat login pertama kali.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTemporaryPassword(generateRandomPassword())}
                    className="rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700"
                  >
                    Generate Ulang
                  </button>
                </div>
                <div className="mt-2 font-mono text-sm font-bold bg-white dark:bg-gray-900 px-3 py-1.5 rounded-lg border border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200">
                  {temporaryPassword}
                </div>
              </div>
            )}

            {/* Catatan Wewenang */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Catatan Otorisasi / Pengawasan
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Tambahkan catatan khusus mengenai delegasi wewenang atau nomor surat tugas..."
                className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
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
              className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              {userToEdit ? "Simpan Perubahan Akun" : "Registrasi & Terbitkan Kredensial"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
