"use client";
import React from "react";
import { Modal } from "../ui/modal";
import { Shipment } from "./CreateShipmentModal";
import Button from "../ui/button/Button";

interface ShipmentWaybillPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipment: Shipment | null;
}

export const ShipmentWaybillPrintModal: React.FC<ShipmentWaybillPrintModalProps> = ({
  isOpen,
  onClose,
  shipment,
}) => {
  if (!shipment) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-4xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800 mb-6 print:hidden">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Pratinjau Dokumen Cetak Surat Jalan Resmi (Waybill)
          </h3>
          <p className="text-xs text-gray-500">
            Dokumen sah serah terima logistik MBG sesuai standar Badan Gizi Nasional (BGN) RI & ISO 22000.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handlePrint}
            size="sm"
            className="bg-brand-600 hover:bg-brand-700 text-white font-semibold flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Cetak Dokumen (Print)
          </Button>
        </div>
      </div>

      {/* Printable Sheet Area */}
      <div className="bg-white text-gray-900 p-8 rounded-xl border border-gray-300 shadow-sm print:border-0 print:p-0 print:shadow-none font-sans text-xs">
        {/* Kop Surat Resmi */}
        <div className="flex items-center justify-between border-b-2 border-gray-900 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-full bg-emerald-700 text-white flex items-center justify-center font-black text-xl tracking-tighter">
              MBG
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-wider text-gray-900">
                BADAN GIZI NASIONAL (BGN) REPUBLIK INDONESIA
              </h1>
              <h2 className="text-xs font-bold text-gray-800">
                PROGRAM MAKANAN BERGIZI GRATIS (MBG) — SATUAN PELAYANAN PANGAN GIZI (SPPG)
              </h2>
              <p className="text-[10px] text-gray-600">
                Dapur Sentral Harmoni • Jl. Majapahit No. 12, Jakarta Pusat • Telp: (021) 3456789 • ISO 22000:2018 Certified
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="border-2 border-gray-900 px-3 py-1 font-mono font-bold text-xs inline-block">
              SURAT JALAN / WAYBILL
            </div>
            <p className="font-mono text-[11px] font-bold mt-1 text-gray-900">{shipment.waybillNumber}</p>
          </div>
        </div>

        {/* Informasi Pengiriman */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="rounded-lg border border-gray-300 p-3.5 space-y-1.5">
            <p className="font-bold uppercase text-[11px] text-gray-700 border-b border-gray-200 pb-1">
              Dapur Pengirim (Origin)
            </p>
            <p className="font-bold text-gray-900">{shipment.centralKitchen}</p>
            <p className="text-gray-600">Alamat: Jl. Majapahit No. 12, Harmoni, Gambir, Jakarta Pusat</p>
            <p className="text-gray-600">Jam Muat & Berangkat: <strong>{shipment.departureTime}</strong></p>
            <p className="text-gray-600 font-mono">No. Segel Box: <strong>{shipment.sealNumber}</strong></p>
          </div>

          <div className="rounded-lg border border-gray-300 p-3.5 space-y-1.5">
            <p className="font-bold uppercase text-[11px] text-gray-700 border-b border-gray-200 pb-1">
              Titik Tujuan (Destination)
            </p>
            <p className="font-bold text-gray-900">{shipment.schoolName}</p>
            <p className="text-gray-600">NPSN: <strong>{shipment.schoolNpsn}</strong> • {shipment.district}</p>
            <p className="text-gray-600">Estimasi Tiba (ETA): <strong>{shipment.estimatedArrival}</strong></p>
            <p className="text-gray-600">Armada / Driver: <strong>{shipment.driverName} ({shipment.fleetVehicle})</strong></p>
          </div>
        </div>

        {/* Tabel Rincian Menu & Porsi */}
        <div className="mb-6">
          <table className="w-full border-collapse border border-gray-300 text-left">
            <thead>
              <tr className="bg-gray-100 text-[11px] uppercase font-bold text-gray-800">
                <th className="border border-gray-300 p-2 text-center w-10">No</th>
                <th className="border border-gray-300 p-2">Rincian Paket Menu Makanan Bergizi</th>
                <th className="border border-gray-300 p-2 text-center w-24">Jumlah Porsi</th>
                <th className="border border-gray-300 p-2 text-center w-24">Suhu Muat</th>
                <th className="border border-gray-300 p-2 text-center w-28">Kondisi Kemasan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2.5 text-center font-bold">1</td>
                <td className="border border-gray-300 p-2.5">
                  <p className="font-bold text-gray-900">{shipment.menuName}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    Komposisi: Karbohidrat (Beras IR64 Super), Protein Hewani (Ayam Panggang), Serat (Sayuran Kukus), Buah Segar, Susu Pasteur.
                  </p>
                </td>
                <td className="border border-gray-300 p-2.5 text-center font-bold text-sm">
                  {shipment.portions.toLocaleString()} Box
                </td>
                <td className="border border-gray-300 p-2.5 text-center font-bold font-mono text-emerald-700">
                  {shipment.loadingTemperature}°C
                </td>
                <td className="border border-gray-300 p-2.5 text-center text-[11px]">
                  Bersegel Utuh (ISO 22000)
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-bold">
                <td colSpan={2} className="border border-gray-300 p-2 text-right">
                  TOTAL PORSI DISERAHKAN:
                </td>
                <td className="border border-gray-300 p-2 text-center text-sm font-black">
                  {shipment.portions.toLocaleString()} Porsi
                </td>
                <td colSpan={2} className="border border-gray-300 p-2 text-center text-[10px] text-gray-500">
                  Suhu min 60°C saat pengiriman
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Catatan Kepatuhan Mutu ISO 22000 */}
        <div className="rounded-lg bg-gray-50 p-3 border border-gray-200 text-[10px] text-gray-600 mb-8 space-y-1">
          <p className="font-bold text-gray-800 uppercase">Catatan & Ketentuan Serah Terima MBG:</p>
          <p>1. Petugas sekolah penerima wajib memeriksa keutuhan segel box dan suhu makanan dengan termometer tusuk higienis (&gt;50°C).</p>
          <p>2. Lakukan uji organoleptik sederhana (aroma, tekstur, rasa) oleh Tim Satgas MBG Sekolah sebelum makanan dibagikan ke siswa.</p>
          <p>3. Unggah bukti foto serah terima dan tanda tangan digital Berita Acara melalui aplikasi ERP MBG.</p>
        </div>

        {/* Kolom 3 Tanda Tangan */}
        <div className="grid grid-cols-3 gap-6 text-center text-[11px]">
          <div>
            <p className="font-bold text-gray-700">Diserahkan Oleh (SPPG):</p>
            <p className="text-[10px] text-gray-500">Petugas Dispatcher Dapur</p>
            <div className="h-16 flex items-center justify-center font-serif text-gray-400 italic">
              [ Tanda Tangan & Cap ]
            </div>
            <p className="font-bold border-t border-gray-400 pt-1 mt-2">Hendra Gunawan, S.TP</p>
            <p className="text-[9px] text-gray-500">NIP: 19850314 201001 1 008</p>
          </div>

          <div>
            <p className="font-bold text-gray-700">Dibawa Oleh (Logistik):</p>
            <p className="text-[10px] text-gray-500">Pengemudi / Kurir Armada</p>
            <div className="h-16 flex items-center justify-center font-serif text-gray-400 italic">
              [ Tanda Tangan Pengemudi ]
            </div>
            <p className="font-bold border-t border-gray-400 pt-1 mt-2">{shipment.driverName}</p>
            <p className="text-[9px] text-gray-500">No. Plat: {shipment.fleetVehicle.split("(")[1]?.replace(")", "") || "B 9482 MBG"}</p>
          </div>

          <div>
            <p className="font-bold text-gray-700">Diterima Oleh (Sekolah):</p>
            <p className="text-[10px] text-gray-500">Kepala Sekolah / Satgas MBG</p>
            <div className="h-16 flex items-center justify-center font-serif text-gray-400 italic">
              [ Tanda Tangan & Cap Sekolah ]
            </div>
            <p className="font-bold border-t border-gray-400 pt-1 mt-2">............................................</p>
            <p className="text-[9px] text-gray-500">NIP/NIK Penerima di Lokasi</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShipmentWaybillPrintModal;
