"use client";

import React, { useRef } from "react";

interface RoleMatrixPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RoleMatrixPrintModal({
  isOpen,
  onClose,
}: RoleMatrixPrintModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

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
          <title>Master Matriks Hak Akses & Peran Sistem MBG (ISO 27001)</title>
          <style>
            @page {
              size: A4 landscape;
              margin: 10mm 12mm 10mm 12mm;
            }
            body {
              font-family: Arial, Helvetica, sans-serif;
              font-size: 9pt;
              line-height: 1.3;
              color: #111827;
              margin: 0;
              padding: 0;
            }
            .header-table {
              width: 100%;
              border-bottom: 2.5px double #000;
              padding-bottom: 8px;
              margin-bottom: 12px;
            }
            .header-logo {
              width: 55px;
              height: 55px;
              text-align: center;
              vertical-align: middle;
            }
            .header-text {
              text-align: center;
              vertical-align: middle;
            }
            .header-text h1 {
              font-size: 11pt;
              margin: 0;
              font-weight: bold;
              text-transform: uppercase;
            }
            .header-text h2 {
              font-size: 9.5pt;
              margin: 1px 0;
              font-weight: bold;
            }
            .header-text p {
              font-size: 8pt;
              margin: 1px 0;
              color: #4b5563;
            }
            .doc-title {
              text-align: center;
              margin: 8px 0 10px 0;
            }
            .doc-title h3 {
              font-size: 11pt;
              text-decoration: underline;
              margin: 0;
              text-transform: uppercase;
            }
            table.matrix-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 12px;
              font-size: 8pt;
            }
            table.matrix-table th, table.matrix-table td {
              border: 1px solid #9ca3af;
              padding: 4px 5px;
              text-align: center;
            }
            table.matrix-table th {
              background-color: #f1f5f9;
              font-weight: bold;
            }
            .text-left { text-align: left !important; }
            .allowed { color: #16a34a; font-weight: bold; }
            .denied { color: #dc2626; font-weight: bold; }
            .signatures {
              width: 100%;
              margin-top: 16px;
              page-break-inside: avoid;
              font-size: 8pt;
            }
            .signatures td {
              text-align: center;
              vertical-align: top;
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-2xl bg-white shadow-2xl dark:bg-gray-900 dark:border dark:border-gray-800 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Cetak Master Matriks Hak Akses & Peran (RBAC)
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Dokumen Audit Matriks Wewenang 10 Peran Utama &middot; ISO/IEC 27001:2022
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
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

        {/* Paper Document Preview (Landscape Format) */}
        <div className="max-h-[75vh] overflow-y-auto p-6 bg-gray-100 dark:bg-gray-950 flex justify-center">
          <div
            ref={printRef}
            className="w-full max-w-[280mm] bg-white p-6 text-black shadow-lg rounded-sm text-xs"
          >
            {/* Kop Resmi */}
            <table className="header-table w-full border-b-2 border-black pb-2 mb-3">
              <tbody>
                <tr>
                  <td className="w-14 text-center align-middle">
                    <div className="w-12 h-12 rounded-full border-2 border-blue-900 bg-blue-50 flex items-center justify-center font-black text-blue-900 text-sm">
                      MBG
                    </div>
                  </td>
                  <td className="text-center align-middle px-3">
                    <h1 className="text-xs font-black uppercase m-0">
                      BADAN GIZI NASIONAL (BGN) REPUBLIK INDONESIA
                    </h1>
                    <h2 className="text-[10pt] font-bold uppercase m-0 text-gray-800">
                      DIREKTORAT TEKNOLOGI INFORMASI & KEAMANAN SIBER MBG
                    </h2>
                    <p className="text-[7.5pt] text-gray-600 m-0">
                      Sistem ERP Makanan Bergizi Gratis (MBG) &middot; Standar Keamanan ISO/IEC 27001:2022 & Perpres MBG 2026
                    </p>
                  </td>
                  <td className="w-20 text-center align-middle">
                    <div className="border border-gray-400 p-1 text-[6.5pt] text-center bg-gray-50">
                      <span className="font-bold block">MATRIKS-RBAC</span>
                      <span>SEC-MBG-2026</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Judul Dokumen */}
            <div className="text-center my-2">
              <h3 className="text-xs font-bold uppercase underline">
                MASTER MATRIKS HAK AKSES PERAN SISTEM (ROLE-BASED ACCESS CONTROL)
              </h3>
              <p className="text-[8pt] text-gray-600 mt-0.5">
                Nomor Register: DOC-SEC/RBAC-MBG/VIII/2026 &middot; Status: Disahkan & Aktif
              </p>
            </div>

            {/* Matriks Peran & Modul Table */}
            <table className="w-full border-collapse border border-gray-400 text-[7.5pt] mb-3">
              <thead>
                <tr className="bg-gray-100 text-center">
                  <th className="border border-gray-400 p-1 text-left w-28">Peran (Role)</th>
                  <th className="border border-gray-400 p-1">Supplier</th>
                  <th className="border border-gray-400 p-1">Gudang & Cold Chain</th>
                  <th className="border border-gray-400 p-1">Menu & Gizi</th>
                  <th className="border border-gray-400 p-1">Dapur Sentral SPPG</th>
                  <th className="border border-gray-400 p-1">Logistik & PoD</th>
                  <th className="border border-gray-400 p-1">Aset & Servis</th>
                  <th className="border border-gray-400 p-1">SDM & Payroll</th>
                  <th className="border border-gray-400 p-1">Finansial & Budget</th>
                  <th className="border border-gray-400 p-1">Audit & ISO</th>
                  <th className="border border-gray-400 p-1">RBAC & Sistem</th>
                  <th className="border border-gray-400 p-1">Otorisasi Level</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 p-1 text-left font-bold text-red-800">ADMIN_PUSAT</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRUD+A</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRUD+A</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRUD+A</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRUD+A</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRUD+A</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRUD+A</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRUD+A</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRUD+A</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRUD+A</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRUD+A</td>
                  <td className="border border-gray-400 p-1 font-semibold text-red-700">Nasional (Super)</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-1 text-left font-bold text-blue-800">ADMIN_REGIONAL</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRU+A</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRU+A</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRU</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRU+A</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRU+A</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRU</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRU</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRU+A</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">R+EXP</td>
                  <td className="border border-gray-400 p-1 text-red-600 font-bold">-</td>
                  <td className="border border-gray-400 p-1 font-semibold text-blue-700">Provinsi / Wilayah</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-1 text-left font-bold text-purple-800">KEPALA_SPPG</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">R+PO</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRU+A</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRU</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRUD+A (SPM)</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRU+A</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRU</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRU+A (Shift)</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRU (Kas Kecil)</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">R+LKTK</td>
                  <td className="border border-gray-400 p-1 text-red-600 font-bold">-</td>
                  <td className="border border-gray-400 p-1 font-semibold text-purple-700">Dapur Sentral</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-1 text-left font-bold text-emerald-800">AHLI_GIZI</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRUD+A (AKG)</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">R+A (Organoleptik)</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R</td>
                  <td className="border border-gray-400 p-1 text-red-600 font-bold">-</td>
                  <td className="border border-gray-400 p-1 text-red-600 font-bold">-</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R (HPP Porsi)</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRU (Mutu)</td>
                  <td className="border border-gray-400 p-1 text-red-600 font-bold">-</td>
                  <td className="border border-gray-400 p-1 font-semibold text-emerald-700">Validasi Nutrisi</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-1 text-left font-bold text-amber-800">INSPEKTUR_MUTU_QC</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">R+A (Audit)</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">R+A (Suhu IoT)</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">R+A (CCP HACCP)</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">R+A (PoD QC)</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRU+A (Sanitasi)</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">R+A (MCU)</td>
                  <td className="border border-gray-400 p-1 text-red-600 font-bold">-</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRUD+A (CAPA)</td>
                  <td className="border border-gray-400 p-1 text-red-600 font-bold">-</td>
                  <td className="border border-gray-400 p-1 font-semibold text-amber-700">Kepatuhan ISO</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-1 text-left font-bold text-cyan-800">BENDAHARA_PPK</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">R+PO</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R+BAST</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">R+Depresiasi</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRUD+A (Payroll)</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRUD+A (SP2D/LRA)</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">R+EXP</td>
                  <td className="border border-gray-400 p-1 text-red-600 font-bold">-</td>
                  <td className="border border-gray-400 p-1 font-semibold text-cyan-700">Otorisasi Kas/SP2D</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-1 text-left font-bold text-indigo-800">TIM_LOGISTIK_DRIVER</td>
                  <td className="border border-gray-400 p-1 text-red-600 font-bold">-</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R</td>
                  <td className="border border-gray-400 p-1 text-red-600 font-bold">-</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R (Jadwal)</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRU+A (Live/PoD)</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRU (Kendaraan)</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R (Presensi)</td>
                  <td className="border border-gray-400 p-1 text-red-600 font-bold">-</td>
                  <td className="border border-gray-400 p-1 text-red-600 font-bold">-</td>
                  <td className="border border-gray-400 p-1 text-red-600 font-bold">-</td>
                  <td className="border border-gray-400 p-1 font-semibold text-indigo-700">Armada Lapangan</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-1 text-left font-bold text-orange-800">PETUGAS_GUDANG</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">R+Verifikasi</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRUD+A (Mutasi)</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">R+Requisition</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRU (Chiller)</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R</td>
                  <td className="border border-gray-400 p-1 text-red-600 font-bold">-</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R</td>
                  <td className="border border-gray-400 p-1 text-red-600 font-bold">-</td>
                  <td className="border border-gray-400 p-1 font-semibold text-orange-700">Stok & Cold Storage</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-1 text-left font-bold text-teal-800">SUPPLIER_VENDOR</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRU (Katalog/PO)</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R (Jadwal Kirim)</td>
                  <td className="border border-gray-400 p-1 text-red-600 font-bold">-</td>
                  <td className="border border-gray-400 p-1 text-red-600 font-bold">-</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R (Status Resi)</td>
                  <td className="border border-gray-400 p-1 text-red-600 font-bold">-</td>
                  <td className="border border-gray-400 p-1 text-red-600 font-bold">-</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">CRU (Tagihan)</td>
                  <td className="border border-gray-400 p-1 text-red-600 font-bold">-</td>
                  <td className="border border-gray-400 p-1 text-red-600 font-bold">-</td>
                  <td className="border border-gray-400 p-1 font-semibold text-teal-700">Portal Rekanan</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-1 text-left font-bold text-violet-800">AUDITOR_EKSTERNAL</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R+EXP</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R+EXP</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R+EXP</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R+EXP</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R+EXP</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R+EXP</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R+EXP</td>
                  <td className="border border-gray-400 p-1 text-gray-500 font-bold">R+EXP</td>
                  <td className="border border-gray-400 p-1 text-green-700 font-bold">R+EXP (Immutable)</td>
                  <td className="border border-gray-400 p-1 text-red-600 font-bold">-</td>
                  <td className="border border-gray-400 p-1 font-semibold text-violet-700">Audit & Pengawasan BPK</td>
                </tr>
              </tbody>
            </table>

            {/* Keterangan & Legenda */}
            <div className="border border-gray-300 bg-gray-50 p-2 rounded text-[7pt] mb-3">
              <span className="font-bold block mb-0.5">Legenda Wewenang Aksi:</span>
              <div className="grid grid-cols-4 gap-1">
                <span><strong>R</strong>: Read (Lihat Data)</span>
                <span><strong>CRU</strong>: Create, Read, Update</span>
                <span><strong>CRUD</strong>: Hak Penuh Entitas Data</span>
                <span><strong>+A</strong>: Otorisasi / Digital Approval</span>
                <span><strong>+EXP</strong>: Hak Ekspor CSV / Excel</span>
                <span><strong>+PO</strong>: Penerbitan Purchase Order</span>
                <span><strong>+BAST</strong>: Tanda Tangan Berita Acara</span>
                <span><strong>-</strong>: Akses Diblokir (Deny by Default)</span>
              </div>
            </div>

            {/* Lembar Tanda Tangan */}
            <div className="mt-4 text-[7.5pt]">
              <table className="w-full text-center">
                <tbody>
                  <tr>
                    <td className="w-1/3 align-top">
                      <p className="text-gray-600 m-0">Disusun oleh Lead Security Officer,</p>
                      <div className="my-1 h-10 flex items-center justify-center">
                        <span className="border border-gray-300 px-2 py-0.5 text-[6.5pt] text-gray-500 bg-gray-50 rounded">
                          SecOps Verified &middot; ISO 27001
                        </span>
                      </div>
                      <p className="font-bold underline m-0">Dewi Kartika, S.T., M.Sc.</p>
                      <p className="text-gray-500 m-0">NIP. 19880712 201402 2 002</p>
                    </td>

                    <td className="w-1/3 align-top">
                      <p className="text-gray-600 m-0">Integritas Matriks Digital,</p>
                      <div className="my-1 flex flex-col items-center justify-center">
                        <div className="w-10 h-10 border border-gray-400 flex items-center justify-center text-[6pt] text-gray-500 bg-gray-50 font-mono">
                          QR-RBAC
                        </div>
                        <span className="text-[6pt] font-mono text-gray-400 mt-0.5">SHA256: 4b18c09e72aa</span>
                      </div>
                    </td>

                    <td className="w-1/3 align-top">
                      <p className="text-gray-600 m-0">Disahkan oleh CISO / Kepala Biro IT,</p>
                      <div className="my-1 h-10 flex items-center justify-center">
                        <div className="border border-blue-400 bg-blue-50/50 px-2 py-0.5 text-[6.5pt] text-blue-700 rounded font-semibold">
                          BSrE / BGN Certified
                        </div>
                      </div>
                      <p className="font-bold underline m-0">Dr. Ir. Bambang Sujatmo, M.Kom.</p>
                      <p className="text-gray-500 m-0">NIP. 19780415 200212 1 003</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="mt-4 border-t border-gray-300 pt-1 flex justify-between text-[6.5pt] text-gray-500">
              <span>Sistem ERP MBG &middot; Dokumen Master RBAC Matrix Terpadu</span>
              <span>Halaman 1 dari 1 &middot; Rahasia Negara Terbatas</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-800">
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Tutup
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Cetak Master Matriks
          </button>
        </div>
      </div>
    </div>
  );
}
