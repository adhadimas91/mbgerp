"use client";
import React, { useState } from "react";
import { Modal } from "../ui/modal";
import { Shipment } from "./CreateShipmentModal";
import Badge from "../ui/badge/Badge";

interface LiveTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipment: Shipment | null;
  onUpdateStatus?: (shipmentId: string, newStatus: Shipment["status"]) => void;
}

export const LiveTrackingModal: React.FC<LiveTrackingModalProps> = ({
  isOpen,
  onClose,
  shipment,
  onUpdateStatus,
}) => {
  const [activeStep, setActiveStep] = useState(3); // 1 to 5
  const [tempTelemetry] = useState([
    { time: "09:00", temp: 64.5 },
    { time: "09:10", temp: 63.8 },
    { time: "09:20", temp: 63.2 },
    { time: "09:30", temp: 62.7 },
  ]);

  if (!shipment) return null;

  const steps = [
    {
      step: 1,
      title: "QC Dapur & Segel Kemasan",
      desc: "Uji organoleptik lolos, kemasan tertutup rapat bersegel.",
      time: "08:45 WIB",
      completed: true,
    },
    {
      step: 2,
      title: "Muat ke Blindvan & Berangkat",
      desc: "Suhu muat tercatat 64.5°C di SPPG Central Kitchen Harmoni.",
      time: shipment.departureTime || "09:00 WIB",
      completed: true,
    },
    {
      step: 3,
      title: "Dalam Perjalanan (In Transit)",
      desc: "Armada melaju via Jl. Medan Merdeka Timur • Sisa 1.8 km",
      time: "09:20 WIB (Aktif)",
      completed: shipment.status === "IN_TRANSIT" || shipment.status === "ARRIVED" || shipment.status === "DELIVERED",
    },
    {
      step: 4,
      title: "Tiba di Gerbang Sekolah",
      desc: "Armada parkir di area drop-off khusus MBG.",
      time: shipment.estimatedArrival || "09:35 WIB",
      completed: shipment.status === "ARRIVED" || shipment.status === "DELIVERED",
    },
    {
      step: 5,
      title: "Serah Terima & Bukti PoD",
      desc: "Cek fisik oleh Guru Satgas MBG & tanda tangan digital BAST.",
      time: "Menunggu",
      completed: shipment.status === "DELIVERED",
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-3xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
      <div className="mb-6 border-b border-gray-100 pb-4 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
              <svg className="w-6 h-6 animate-pulse text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Live Fleet Tracking MBG
                </h3>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold">
                  {shipment.waybillNumber}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Pengantaran ke <strong className="text-gray-700 dark:text-gray-200">{shipment.schoolName}</strong> ({shipment.portions.toLocaleString()} Porsi)
              </p>
            </div>
          </div>

          <div>
            {shipment.status === "DELIVERED" ? (
              <Badge color="success">Tiba & Terverifikasi</Badge>
            ) : shipment.status === "IN_TRANSIT" ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                Dalam Rute (In Transit)
              </span>
            ) : (
              <Badge color="warning">{shipment.status}</Badge>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* GPS Live Telemetry & Driver Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-5 text-white border border-slate-700 relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                  GPS Telemetri Aktif
                </span>
                <p className="text-sm font-bold text-white mt-0.5">{shipment.fleetVehicle}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400">Estimasi Tiba (ETA)</span>
                <p className="text-base font-bold text-amber-300">{shipment.estimatedArrival}</p>
              </div>
            </div>

            {/* GPS Speed & Distance */}
            <div className="grid grid-cols-3 gap-2 my-4 pt-3 border-t border-white/10 text-center">
              <div className="bg-white/5 rounded-xl p-2">
                <p className="text-[10px] text-gray-400">Kecepatan</p>
                <p className="text-sm font-bold text-emerald-400">26 km/j</p>
              </div>
              <div className="bg-white/5 rounded-xl p-2">
                <p className="text-[10px] text-gray-400">Sisa Jarak</p>
                <p className="text-sm font-bold text-white">1.8 km</p>
              </div>
              <div className="bg-white/5 rounded-xl p-2">
                <p className="text-[10px] text-gray-400">Waktu Tempuh</p>
                <p className="text-sm font-bold text-white">~6 Menit</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-300 pt-2 border-t border-white/10">
              <span>Posisi Terakhir: Jl. Medan Merdeka Barat No. 10</span>
              <span className="font-mono text-emerald-400">● Signal 4G Online</span>
            </div>
          </div>

          {/* Driver & Cold Chain Box Sensor */}
          <div className="space-y-4">
            {/* Driver Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800/40">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600 font-bold text-sm dark:bg-brand-500/10 dark:text-brand-400">
                  {shipment.driverName.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">{shipment.driverName}</p>
                  <p className="text-[11px] text-gray-400">Kurir Pengantar Utama</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="text-xs font-mono text-gray-600 dark:text-gray-300">{shipment.driverPhone}</span>
                <a
                  href={`https://wa.me/${shipment.driverPhone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg dark:bg-emerald-500/10 dark:text-emerald-400 hover:underline"
                >
                  Chat WA
                </a>
              </div>
            </div>

            {/* Thermal Sensor Card */}
            <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 dark:border-rose-900/40 dark:bg-rose-500/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-xs font-bold text-rose-800 dark:text-rose-300">Suhu Boks Makanan</span>
                </div>
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 font-mono">
                  {tempTelemetry[tempTelemetry.length - 1].temp}°C
                </span>
              </div>
              <p className="text-[10px] text-rose-700/80 dark:text-rose-400 mt-1">
                Kondisi Panas Sempurna (&gt; 60°C ISO 22000). Segel No: <strong className="font-mono">{shipment.sealNumber}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* 5-Step Timeline */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-800/20">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-4">
            Tahapan Perjalanan & Verifikasi Distribusi
          </h4>

          <div className="space-y-4">
            {steps.map((item, index) => (
              <div key={item.step} className="flex items-start gap-3.5">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                      item.completed
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                        : "bg-gray-100 text-gray-400 dark:bg-gray-800"
                    }`}
                  >
                    {item.completed ? "✓" : item.step}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-0.5 h-10 ${
                        item.completed ? "bg-emerald-500" : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    ></div>
                  )}
                </div>

                <div className="flex-1 pb-2">
                  <div className="flex items-center justify-between">
                    <p className={`text-xs font-bold ${item.completed ? "text-gray-900 dark:text-white" : "text-gray-400"}`}>
                      {item.title}
                    </p>
                    <span className="text-[11px] font-mono text-gray-400">{item.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action to Change Status if Needed */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Update Status Armada:</span>
            {onUpdateStatus && (
              <>
                <button
                  onClick={() => onUpdateStatus(shipment.id, "ARRIVED")}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-300"
                >
                  Tandai Tiba di Sekolah
                </button>
                <button
                  onClick={() => onUpdateStatus(shipment.id, "DELIVERED")}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300"
                >
                  Selesai Serah Terima
                </button>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="rounded-xl px-5 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition"
          >
            Tutup Pelacakan
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LiveTrackingModal;
