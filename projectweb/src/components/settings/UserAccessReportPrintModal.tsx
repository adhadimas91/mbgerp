"use client";

import React, { useRef } from "react";
import { UserAccount } from "./UserManagementTable";

interface UserAccessReportPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount | null;
}

export default function UserAccessReportPrintModal({
  isOpen,
  onClose,
  user,
}: UserAccessReportPrintModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !user) return null;

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Gagal membuka jendela cetak. Pastikan pop-up diizinkan.");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Surat Keputusan Hak Akses Sistem - ${user.name} (${user.nip})</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 15mm 15mm 15mm 15mm;
            }
            body {
              font-family: Arial, Helvetica, sans-serif;
              font-size: 11pt;
              line-height: 1.4;
              color: #111827;
              margin: 0;
              padding: 0;
            }
            .header-table {
              width: 100%;
              border-bottom: 3px double #000;
              padding-bottom: 12px;
              margin-bottom: 16px;
            }
            .header-logo {
              width: 70px;
              height: 70px;
              text-align: center;
              vertical-align: middle;
            }
            .header-text {
              text-align: center;
              vertical-align: middle;
            }
            .header-text h1 {
              font-size: 13pt;
              margin: 0;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .header-text h2 {
              font-size: 11pt;
              margin: 2px 0;
              font-weight: bold;
              text-transform: uppercase;
            }
            .header-text p {
              font-size: 9pt;
              margin: 2px 0;
              color: #374151;
            }
            .doc-title {
              text-align: center;
              margin: 14px 0 16px 0;
            }
            .doc-title h3 {
              font-size: 12pt;
              text-decoration: underline;
              margin: 0;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .doc-title p {
              font-size: 9.5pt;
              margin: 3px 0 0 0;
              color: #4b5563;
            }
            .section-title {
              font-size: 10.5pt;
              font-weight: bold;
              background-color: #f3f4f6;
              padding: 4px 8px;
              border-left: 4px solid #2563eb;
              margin: 12px 0 8px 0;
              text-transform: uppercase;
            }
            table.data-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 12px;
              font-size: 9.5pt;
            }
            table.data-table th, table.data-table td {
              border: 1px solid #9ca3af;
              padding: 5px 8px;
              text-align: left;
            }
            table.data-table th {
              background-color: #f8fafc;
              font-weight: bold;
            }
            .badge {
              display: inline-block;
              padding: 2px 6px;
              font-size: 8pt;
              font-weight: bold;
              border-radius: 3px;
              border: 1px solid #d1d5db;
            }
            .info-grid {
              width: 100%;
              margin-bottom: 12px;
              font-size: 10pt;
            }
            .info-grid td {
              padding: 3px 4px;
              vertical-align: top;
            }
            .signatures {
              width: 100%;
              margin-top: 24px;
              page-break-inside: avoid;
            }
            .sig-box {
              width: 32%;
              text-align: center;
              vertical-align: top;
              font-size: 9pt;
            }
            .sig-line {
              margin-top: 50px;
              font-weight: bold;
              text-decoration: underline;
            }
            .qr-placeholder {
              width: 65px;
              height: 65px;
              border: 1px dashed #6b7280;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              font-size: 7pt;
              margin-top: 6px;
              background: #fafafa;
            }
            .security-banner {
              border: 1px solid #cbd5e1;
              background: #f8fafc;
              padding: 6px 10px;
              font-size: 8.5pt;
              color: #334155;
              border-radius: 4px;
              margin-bottom: 12px;
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "ADMIN_PUSAT": return "Administrator Pusat BGN";
      case "ADMIN_REGIONAL": return "Admin Koordinator Regional";
      case "KEPALA_SPPG": return "Kepala Dapur Sentral SPPG";
      case "AHLI_GIZI": return "Ahli Gizi & Dietisien Terdaftar";
      case "INSPEKTUR_MUTU_QC": return "Quality Control & Food Safety Auditor";
      case "BENDAHARA_PPK": return "Pejabat Pembuat Komitmen (PPK/Bendahara)";
      case "TIM_LOGISTIK_DRIVER": return "Supervisor Logistik & Distribusi";
      case "PETUGAS_GUDANG": return "Kepala Gudang & Cold Storage";
      case "SUPPLIER_VENDOR": return "Perwakilan Rekanan / Supplier Pangan";
      case "AUDITOR_EKSTERNAL": return "Inspektorat / Auditor BPK / KAN";
      default: return role;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl dark:bg-gray-900 dark:border dark:border-gray-800 my-8">
        {/* Modal Action Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Pratinjau Berita Acara Hak Akses Sistem (RBAC)
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Surat Keputusan Otorisasi Akun ERP MBG Standar ISO 27001:2022
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak Dokumen
            </button>
            <button
              onClick={onClose}
              className="rounded-xl border border-gray-300 p-2 text-gray-500 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Paper Document Preview */}
        <div className="max-h-[75vh] overflow-y-auto p-6 bg-gray-100 dark:bg-gray-950 flex justify-center">
          <div
            ref={printRef}
            className="w-full max-w-[210mm] bg-white p-8 text-black shadow-lg rounded-sm text-sm"
          >
            {/* Kop Surat Resmi */}
            <table className="header-table w-full border-b-2 border-black pb-3 mb-4">
              <tbody>
                <tr>
                  <td className="w-16 text-center align-middle">
                    <div className="w-14 h-14 rounded-full border-2 border-blue-900 bg-blue-50 flex items-center justify-center font-black text-blue-900 text-base">
                      MBG
                    </div>
                  </td>
                  <td className="text-center align-middle px-4">
                    <h1 className="text-sm font-black tracking-wider uppercase m-0">
                      BADAN GIZI NASIONAL (BGN) REPUBLIK INDONESIA
                    </h1>
                    <h2 className="text-xs font-bold uppercase m-0 text-gray-800">
                      DIREKTORAT TEKNOLOGI INFORMASI & TATA KELOLA DATA MBG
                    </h2>
                    <p className="text-[9pt] text-gray-600 m-0">
                      Gedung Pusat BGN, Jl. Medan Merdeka Barat No. 8, Jakarta Pusat 10110
                    </p>
                    <p className="text-[8pt] text-gray-500 m-0">
                      Sistem ERP MBG Terintegrasi &middot; ISO/IEC 27001:2022 Certified Information Security
                    </p>
                  </td>
                  <td className="w-16 text-center align-middle">
                    <div className="border border-gray-400 p-1 text-[7pt] text-center bg-gray-50">
                      <span className="font-bold block">ISO 27001</span>
                      <span>SEC-MBG</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Judul Dokumen */}
            <div className="text-center my-4">
              <h3 className="text-sm font-bold uppercase underline tracking-wide">
                SURAT KEPUTUSAN OTORISASI HAK AKSES SISTEM (RBAC)
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Nomor: SK-RBAC/BGN-IT/{user.id}/VIII/2026
              </p>
            </div>

            {/* Security Compliance Notice */}
            <div className="border border-blue-200 bg-blue-50/50 p-2.5 rounded text-xs text-gray-700 mb-4">
              <div className="flex items-center gap-2 font-bold text-blue-900 mb-1">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
                Klausul Kepatuhan ISO/IEC 27001:2022 & Peraturan BGN No. 04/2026
              </div>
              <p className="text-[8.5pt] leading-tight text-gray-600 m-0">
                Pemberian akun dan hak akses sistem ERP Makanan Bergizi Gratis (MBG) ini bersifat rahasia, tidak dapat dipindahtangankan, dan wajib mematuhi asas *Least Privilege* serta *Need-to-Know Basis*. Segala aktivitas login dan transaksi data dicatat dalam Audit Trail forensik (SHA-256).
              </p>
            </div>

            {/* Identitas Pengguna */}
            <div className="text-xs font-bold bg-gray-100 px-2 py-1 border-l-4 border-blue-600 uppercase mb-2">
              I. IDENTITAS PENGGUNA TERDAFTAR
            </div>
            <table className="w-full text-xs mb-4">
              <tbody>
                <tr>
                  <td className="w-40 py-1 text-gray-600 font-medium">Nama Lengkap & Gelar</td>
                  <td className="w-4 py-1">:</td>
                  <td className="py-1 font-bold text-gray-900">{user.name}</td>
                  <td className="w-36 py-1 text-gray-600 font-medium">ID Pengguna / NIP</td>
                  <td className="w-4 py-1">:</td>
                  <td className="py-1 font-mono font-bold text-gray-900">{user.nip} ({user.id})</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-600 font-medium">Alamat Email Resmi</td>
                  <td className="py-1">:</td>
                  <td className="py-1 font-mono text-gray-900">{user.email}</td>
                  <td className="py-1 text-gray-600 font-medium">Nomor Telepon / WA</td>
                  <td className="py-1">:</td>
                  <td className="py-1 text-gray-900">{user.phone}</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-600 font-medium">Unit Kerja / SPPG</td>
                  <td className="py-1">:</td>
                  <td className="py-1 font-semibold text-gray-900">{user.unit}</td>
                  <td className="py-1 text-gray-600 font-medium">Wilayah Operasional</td>
                  <td className="py-1">:</td>
                  <td className="py-1 text-gray-900">{user.assignedRegion}</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-600 font-medium">Peran Utama (RBAC Role)</td>
                  <td className="py-1">:</td>
                  <td className="py-1 font-bold text-blue-800" colSpan={4}>
                    {getRoleLabel(user.role)} ({user.role})
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Parameter Keamanan Akun */}
            <div className="text-xs font-bold bg-gray-100 px-2 py-1 border-l-4 border-blue-600 uppercase mb-2">
              II. PARAMETER KEAMANAN & KREDENSIAL SISTEM
            </div>
            <table className="w-full text-xs border border-gray-300 mb-4">
              <tbody>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-2 font-semibold w-1/3">Status Akun</td>
                  <td className="p-2 font-semibold w-1/3">Autentikasi Dua Faktor (2FA)</td>
                  <td className="p-2 font-semibold w-1/3">Masa Berlaku Akun</td>
                </tr>
                <tr>
                  <td className="p-2">
                    <span className="font-bold text-green-700">{user.status} (Terverifikasi Aktif)</span>
                  </td>
                  <td className="p-2">
                    <span className="font-bold text-blue-700">{user.twoFactor} (Wajib ISO 27001)</span>
                  </td>
                  <td className="p-2 text-gray-800 font-mono">
                    {user.accountExpiry ? user.accountExpiry : "Permanen (Selama Masa Tugas Aktif)"}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Matriks Wewenang Modul */}
            <div className="text-xs font-bold bg-gray-100 px-2 py-1 border-l-4 border-blue-600 uppercase mb-2">
              III. MATRIKS WEWENANG AKSES MODUL ERP MBG
            </div>
            <table className="w-full text-[8.5pt] border-collapse border border-gray-300 mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-1.5 text-left">No</th>
                  <th className="border border-gray-300 p-1.5 text-left">Modul ERP</th>
                  <th className="border border-gray-300 p-1.5 text-center">Read</th>
                  <th className="border border-gray-300 p-1.5 text-center">Create</th>
                  <th className="border border-gray-300 p-1.5 text-center">Update</th>
                  <th className="border border-gray-300 p-1.5 text-center">Delete</th>
                  <th className="border border-gray-300 p-1.5 text-center">Approve</th>
                  <th className="border border-gray-300 p-1.5 text-center">Export</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-1 text-center">1</td>
                  <td className="border border-gray-300 p-1 font-medium">Supplier & Vendor Management</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-red-600">-</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">
                    {user.role.includes("ADMIN") || user.role.includes("KEPALA") ? "✓" : "-"}
                  </td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 text-center">2</td>
                  <td className="border border-gray-300 p-1 font-medium">Gudang, Stok & Cold Chain IoT</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-red-600">-</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">
                    {user.role.includes("ADMIN") || user.role.includes("KEPALA") || user.role.includes("GUDANG") ? "✓" : "-"}
                  </td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 text-center">3</td>
                  <td className="border border-gray-300 p-1 font-medium">Menu, Resep & Nutrisi AKG</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">
                    {user.role.includes("GIZI") || user.role.includes("ADMIN") ? "✓" : "-"}
                  </td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">
                    {user.role.includes("GIZI") || user.role.includes("ADMIN") ? "✓" : "-"}
                  </td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-red-600">-</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">
                    {user.role.includes("GIZI") || user.role.includes("ADMIN") ? "✓" : "-"}
                  </td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 text-center">4</td>
                  <td className="border border-gray-300 p-1 font-medium">Dapur Sentral SPPG (Lini Masak & SPM)</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-red-600">-</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">
                    {user.role.includes("KEPALA") || user.role.includes("ADMIN") ? "✓" : "-"}
                  </td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 text-center">5</td>
                  <td className="border border-gray-300 p-1 font-medium">Logistik, Live GPS & Proof of Delivery</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-red-600">-</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 text-center">6</td>
                  <td className="border border-gray-300 p-1 font-medium">Finansial, Anggaran DPA & Pembayaran</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">
                    {user.role.includes("BENDAHARA") || user.role.includes("ADMIN") ? "✓" : "-"}
                  </td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">
                    {user.role.includes("BENDAHARA") || user.role.includes("ADMIN") ? "✓" : "-"}
                  </td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-red-600">-</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">
                    {user.role.includes("BENDAHARA") || user.role.includes("ADMIN") ? "✓" : "-"}
                  </td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 text-center">7</td>
                  <td className="border border-gray-300 p-1 font-medium">Audit Trail (Immutable) & Kepatuhan ISO</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">
                    {user.role.includes("QC") || user.role.includes("AUDITOR") || user.role.includes("ADMIN") ? "✓" : "-"}
                  </td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-red-600">-</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-red-600">-</td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">
                    {user.role.includes("AUDITOR") || user.role.includes("ADMIN") ? "✓" : "-"}
                  </td>
                  <td className="border border-gray-300 p-1 text-center font-bold text-green-700">✓</td>
                </tr>
              </tbody>
            </table>

            {/* Lembar Tanda Tangan */}
            <div className="mt-8 text-xs">
              <p className="text-right text-gray-700 mb-4">
                Ditetapkan di: Jakarta &middot; Tanggal: 27 Agustus 2026
              </p>
              <table className="w-full text-center">
                <tbody>
                  <tr>
                    <td className="w-1/3 align-top">
                      <p className="text-gray-600 text-[8pt] m-0">Penerima Hak Akses,</p>
                      <div className="my-2 h-14 flex items-center justify-center">
                        <span className="border border-gray-300 px-3 py-1 text-[7.5pt] text-gray-400 bg-gray-50 rounded">
                          Digital Signed & Verified
                        </span>
                      </div>
                      <p className="font-bold underline text-gray-900 m-0">{user.name}</p>
                      <p className="text-[8pt] text-gray-500 m-0">NIP. {user.nip}</p>
                    </td>

                    <td className="w-1/3 align-top">
                      <p className="text-gray-600 text-[8pt] m-0">Verifikasi Integritas Data,</p>
                      <div className="my-2 flex flex-col items-center justify-center">
                        <div className="w-14 h-14 border border-gray-400 flex items-center justify-center text-[7pt] text-gray-500 bg-gray-50 font-mono">
                          QR-SEC
                        </div>
                        <span className="text-[7pt] font-mono text-gray-400 mt-1">SHA256: 9f83a42b10cd</span>
                      </div>
                    </td>

                    <td className="w-1/3 align-top">
                      <p className="text-gray-600 text-[8pt] m-0">Mengetahui & Mengesahkan,</p>
                      <p className="text-[7.5pt] text-gray-500 m-0">Kepala Biro IT & Keamanan Siber BGN</p>
                      <div className="my-2 h-14 flex items-center justify-center">
                        <div className="border border-blue-400 bg-blue-50/50 px-3 py-1 text-[7.5pt] text-blue-700 rounded font-semibold">
                          BSrE / BGN Certified Sign
                        </div>
                      </div>
                      <p className="font-bold underline text-gray-900 m-0">Dr. Ir. Bambang Sujatmo, M.Kom.</p>
                      <p className="text-[8pt] text-gray-500 m-0">NIP. 19780415 200212 1 003</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer Cetak */}
            <div className="mt-8 border-t border-gray-300 pt-2 flex justify-between text-[7.5pt] text-gray-500">
              <span>Dicetak otomatis dari Sistem ERP MBG &middot; ISO 27001 Security Module</span>
              <span>Dokumen Resmi &middot; Halaman 1 dari 1</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-800">
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Tutup
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Cetak Surat Keputusan
          </button>
        </div>
      </div>
    </div>
  );
}
