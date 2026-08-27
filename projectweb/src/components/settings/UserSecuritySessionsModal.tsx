"use client";

import React, { useState } from "react";
import { UserAccount } from "./UserManagementTable";

interface SessionEntry {
  id: string;
  ip: string;
  location: string;
  device: string;
  browser: string;
  os: string;
  loginTime: string;
  lastActive: string;
  isCurrentSession: boolean;
  status: "ACTIVE" | "REVOKED";
}

interface AuthSecurityLog {
  id: string;
  timestamp: string;
  eventType: "LOGIN_SUCCESS" | "LOGIN_FAILED" | "PASSWORD_RESET" | "2FA_VERIFIED" | "SESSION_REVOKED" | "SUSPICIOUS_GEO";
  ipAddress: string;
  location: string;
  userAgent: string;
  details: string;
}

interface UserSecuritySessionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount | null;
  onUpdateUserSecurity: (userId: string, updates: Partial<UserAccount>) => void;
}

const MOCK_SESSIONS: SessionEntry[] = [
  {
    id: "SES-2026-9901",
    ip: "182.253.120.45",
    location: "Jakarta Pusat, DKI Jakarta",
    device: "Desktop Workstation",
    browser: "Chrome 128.0 (Windows)",
    os: "Windows 11 Pro",
    loginTime: "2026-08-27 08:14:22",
    lastActive: "Baru saja (Aktif)",
    isCurrentSession: true,
    status: "ACTIVE",
  },
  {
    id: "SES-2026-9844",
    ip: "114.122.90.11",
    location: "Dapur Sentral Harmoni, Jakarta",
    device: "iPad Pro 11-inch",
    browser: "Mobile Safari 17.4",
    os: "iPadOS 17.4",
    loginTime: "2026-08-26 14:20:10",
    lastActive: "18 jam yang lalu",
    isCurrentSession: false,
    status: "ACTIVE",
  },
  {
    id: "SES-2026-9712",
    ip: "36.78.210.14",
    location: "Bandung, Jawa Barat",
    device: "MacBook Air M2",
    browser: "Safari 17.2",
    os: "macOS Sonoma",
    loginTime: "2026-08-24 09:11:05",
    lastActive: "3 hari yang lalu",
    isCurrentSession: false,
    status: "REVOKED",
  },
];

const MOCK_AUTH_LOGS: AuthSecurityLog[] = [
  {
    id: "SEC-LOG-01",
    timestamp: "2026-08-27 08:14:22",
    eventType: "LOGIN_SUCCESS",
    ipAddress: "182.253.120.45",
    location: "Jakarta Pusat",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0",
    details: "Login berhasil menggunakan password & OTP Authenticator (2FA Passed)",
  },
  {
    id: "SEC-LOG-02",
    timestamp: "2026-08-27 08:13:40",
    eventType: "2FA_VERIFIED",
    ipAddress: "182.253.120.45",
    location: "Jakarta Pusat",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0",
    details: "Validasi kode TOTP 6-digit Google Authenticator berhasil",
  },
  {
    id: "SEC-LOG-03",
    timestamp: "2026-08-26 19:40:11",
    eventType: "LOGIN_FAILED",
    ipAddress: "103.21.244.8",
    location: "Surabaya, Jawa Timur",
    userAgent: "Python-requests/2.31.0",
    details: "Percobaan login gagal: Kredensial password tidak cocok (Blocked by WAF)",
  },
  {
    id: "SEC-LOG-04",
    timestamp: "2026-08-25 10:15:30",
    eventType: "PASSWORD_RESET",
    ipAddress: "182.253.120.45",
    location: "Jakarta Pusat",
    userAgent: "Chrome/128.0 (Windows 11)",
    details: "Pengguna melakukan rotasi berkala password sesuai kebijakan 90 hari ISO 27001",
  },
];

export default function UserSecuritySessionsModal({
  isOpen,
  onClose,
  user,
  onUpdateUserSecurity,
}: UserSecuritySessionsModalProps) {
  const [activeTab, setActiveTab] = useState<"sessions" | "authLogs" | "securityControls">("sessions");
  const [sessions, setSessions] = useState<SessionEntry[]>(MOCK_SESSIONS);
  const [is2faEnforced, setIs2faEnforced] = useState(user?.twoFactor !== "DISABLED");
  const [forcePasswordReset, setForcePasswordReset] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  if (!isOpen || !user) return null;

  const handleRevokeSession = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, status: "REVOKED" } : s))
    );
    setShowNotification(`Sesi token ${sessionId} berhasil dicabut dan di-logout.`);
    setTimeout(() => setShowNotification(null), 3000);
  };

  const handleRevokeAllOtherSessions = () => {
    setSessions((prev) =>
      prev.map((s) => (s.isCurrentSession ? s : { ...s, status: "REVOKED" }))
    );
    setShowNotification("Semua sesi perangkat lain berhasil diputuskan.");
    setTimeout(() => setShowNotification(null), 3000);
  };

  const handleApplySecurityPolicies = () => {
    onUpdateUserSecurity(user.id, {
      twoFactor: is2faEnforced ? "APP_AUTHENTICATOR" : "DISABLED",
      failedLoginAttempts: 0,
      notes: forcePasswordReset
        ? `${user.notes || ""} [Wajib ganti password saat login berikutnya]`
        : user.notes,
    });
    setShowNotification("Kebijakan keamanan akun berhasil diperbarui.");
    setTimeout(() => {
      setShowNotification(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl dark:bg-gray-900 dark:border dark:border-gray-800 my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Sesi Aktif & Audit Keamanan Akun (ISO 27001)
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Pengguna: <span className="font-semibold text-gray-800 dark:text-gray-200">{user.name}</span> ({user.nip})
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

        {/* Notification Banner */}
        {showNotification && (
          <div className="mx-6 mt-4 flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 p-3 text-xs font-medium text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300">
            <svg className="h-4 w-4 shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{showNotification}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 px-6 pt-3 dark:border-gray-800">
          <button
            onClick={() => setActiveTab("sessions")}
            className={`pb-3 px-3 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === "sessions"
                ? "border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Sesi Login Aktif ({sessions.filter(s => s.status === "ACTIVE").length})
          </button>

          <button
            onClick={() => setActiveTab("authLogs")}
            className={`pb-3 px-3 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === "authLogs"
                ? "border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Log Otentikasi & Brute-Force Alert
          </button>

          <button
            onClick={() => setActiveTab("securityControls")}
            className={`pb-3 px-3 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === "securityControls"
                ? "border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Kontrol Kebijakan Keamanan
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* TAB 1: SESSIONS */}
          {activeTab === "sessions" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Daftar token sesi aktif yang terotentikasi untuk akun ini. Anda dapat mencabut sesi secara instan jika terindikasi anomali.
                </p>
                <button
                  onClick={handleRevokeAllOtherSessions}
                  className="shrink-0 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 dark:border-red-800/40 dark:bg-red-900/20 dark:text-red-300"
                >
                  Logout Sesi Perangkat Lain
                </button>
              </div>

              <div className="space-y-3">
                {sessions.map((ses) => (
                  <div
                    key={ses.id}
                    className={`rounded-xl border p-4 transition-all ${
                      ses.isCurrentSession
                        ? "border-purple-300 bg-purple-50/40 dark:border-purple-800/60 dark:bg-purple-900/10"
                        : ses.status === "REVOKED"
                        ? "border-gray-200 bg-gray-50/50 opacity-60 dark:border-gray-800 dark:bg-gray-800/30"
                        : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-lg bg-gray-100 p-2 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                          {ses.device.includes("iPad") || ses.device.includes("Mobile") ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              {ses.device} &middot; {ses.browser}
                            </span>
                            {ses.isCurrentSession && (
                              <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
                                Sesi Ini (Aktif)
                              </span>
                            )}
                            {ses.status === "REVOKED" && (
                              <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-900/50 dark:text-red-300">
                                Dicabut / Logged Out
                              </span>
                            )}
                          </div>

                          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                            <span>IP: <strong className="font-mono text-gray-700 dark:text-gray-300">{ses.ip}</strong></span>
                            <span>Lokasi: <strong className="text-gray-700 dark:text-gray-300">{ses.location}</strong></span>
                            <span>Login: <strong className="text-gray-700 dark:text-gray-300">{ses.loginTime}</strong></span>
                            <span>Aktivitas: <strong className="text-gray-700 dark:text-gray-300">{ses.lastActive}</strong></span>
                          </div>
                        </div>
                      </div>

                      {!ses.isCurrentSession && ses.status === "ACTIVE" && (
                        <button
                          onClick={() => handleRevokeSession(ses.id)}
                          className="rounded-lg border border-red-300 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                        >
                          Putuskan Sesi
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: AUTH LOGS */}
          {activeTab === "authLogs" && (
            <div className="space-y-4">
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3 text-xs text-amber-900 dark:border-amber-900/40 dark:bg-amber-900/10 dark:text-amber-300">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Proteksi Brute-Force & Anomali Geografis Aktif
                </div>
                <p className="m-0 text-[11px] leading-relaxed">
                  Sistem otomatis mengunci akun sementara selama 15 menit jika terdeteksi 5x percobaan password salah secara berurutan. Semua event tercatat dalam Immutable Forensic Log.
                </p>
              </div>

              <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 dark:divide-gray-800 dark:border-gray-800">
                {MOCK_AUTH_LOGS.map((log) => (
                  <div key={log.id} className="p-3.5 hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                              log.eventType === "LOGIN_SUCCESS"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                                : log.eventType === "LOGIN_FAILED"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
                                : log.eventType === "2FA_VERIFIED"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
                                : "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300"
                            }`}
                          >
                            {log.eventType}
                          </span>
                          <span className="font-mono text-xs font-medium text-gray-500 dark:text-gray-400">
                            {log.timestamp}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 m-0">
                          {log.details}
                        </p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 m-0">
                          IP: <span className="font-mono font-medium">{log.ipAddress}</span> &middot; Lokasi: {log.location} &middot; UA: {log.userAgent}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY CONTROLS */}
          {activeTab === "securityControls" && (
            <div className="space-y-4">
              <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Konfigurasi Autentikasi Dua Faktor (2FA / MFA)
                </h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-gray-900 dark:text-white">
                      Wajibkan 2FA Time-Based OTP (Google / Microsoft Authenticator)
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      Standar ISO 27001 mewajibkan seluruh staf dengan wewenang APPROVE mengaktifkan 2FA.
                    </div>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={is2faEnforced}
                      onChange={(e) => setIs2faEnforced(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-gray-700"></div>
                  </label>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Tindakan Reset Kredensial Darurat
                </h4>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-gray-900 dark:text-white">
                      Paksa Ganti Password Saat Login Berikutnya
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      Pengguna akan langsung diarahkan ke layar pembuatan password baru saat login.
                    </div>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={forcePasswordReset}
                      onChange={(e) => setForcePasswordReset(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-amber-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-gray-700"></div>
                  </label>
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-gray-900 dark:text-white">
                      Reset Counter Percobaan Login Gagal
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">
                      Status saat ini: <strong className="text-gray-800 dark:text-gray-200">{user.failedLoginAttempts}x percobaan gagal</strong>.
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onUpdateUserSecurity(user.id, { failedLoginAttempts: 0 });
                      setShowNotification("Counter kegagalan login di-reset menjadi 0.");
                    }}
                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Reset Counter
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-800">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Enkripsi Sesi: TLS 1.3 &middot; JWT HS512 Signed
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Tutup
            </button>
            <button
              onClick={handleApplySecurityPolicies}
              className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-purple-700 transition-colors"
            >
              Simpan Kebijakan Keamanan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
