"use client";
import React from "react";
import Badge from "../ui/badge/Badge";

interface ShipmentItem {
  id: string;
  schoolName: string;
  district: string;
  menuName: string;
  portions: number;
  time: string;
  status: "DELIVERED" | "IN_TRANSIT" | "PREPARING";
  podStatus: "VERIFIED" | "PENDING";
}

const mockShipments: ShipmentItem[] = [
  {
    id: "MBG-2026-0827-01",
    schoolName: "SDN Menteng 01 Pagi",
    district: "Jakarta Pusat",
    menuName: "Nasi Ayam Bakar Madu + Tumis Buncis Jagung + Pisang",
    portions: 650,
    time: "09:45 WIB",
    status: "DELIVERED",
    podStatus: "VERIFIED",
  },
  {
    id: "MBG-2026-0827-02",
    schoolName: "SMPN 1 Jakarta",
    district: "Jakarta Pusat",
    menuName: "Nasi Ikan Gurame Asam Manis + Sayur Lodeh + Jeruk",
    portions: 820,
    time: "10:15 WIB",
    status: "DELIVERED",
    podStatus: "VERIFIED",
  },
  {
    id: "MBG-2026-0827-03",
    schoolName: "SDN Kebon Sirih 03",
    district: "Jakarta Pusat",
    menuName: "Nasi Daging Semur + Sup Sayur Wortel + Telur Puyuh",
    portions: 480,
    time: "10:40 WIB (ETA)",
    status: "IN_TRANSIT",
    podStatus: "PENDING",
  },
  {
    id: "MBG-2026-0827-04",
    schoolName: "SDN Pegangsaan 01",
    district: "Jakarta Pusat",
    menuName: "Nasi Ayam Kremes + Tempe Orek + Sayur Bayam",
    portions: 540,
    time: "11:00 WIB (ETA)",
    status: "IN_TRANSIT",
    podStatus: "PENDING",
  },
  {
    id: "MBG-2026-0827-05",
    schoolName: "Panti Asuhan Kasih Mandiri",
    district: "Jakarta Pusat",
    menuName: "Nasi Rolade Sapi Saus Tomat + Sayur Brokoli Wortel",
    portions: 220,
    time: "11:30 WIB",
    status: "PREPARING",
    podStatus: "PENDING",
  },
];

export const MbgRecentShipments: React.FC = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-800 dark:text-white">
            Pengiriman & Distribusi MBG Terkini
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Status pengiriman harian real-time dan konfirmasi Proof of Delivery (PoD)
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          Live Delivery Stream
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-xs font-semibold uppercase text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <th className="pb-3">No. Resi</th>
              <th className="pb-3">Lokasi / Titik Distribusi</th>
              <th className="pb-3">Menu MBG</th>
              <th className="pb-3">Porsi</th>
              <th className="pb-3">Waktu Tiba</th>
              <th className="pb-3">Status Pengiriman</th>
              <th className="pb-3">Bukti Terima</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
            {mockShipments.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01]">
                <td className="py-3 font-mono text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {item.id}
                </td>
                <td className="py-3">
                  <p className="font-medium text-gray-800 dark:text-white">{item.schoolName}</p>
                  <p className="text-xs text-gray-400">{item.district}</p>
                </td>
                <td className="py-3 max-w-[260px] truncate text-xs text-gray-600 dark:text-gray-300">
                  {item.menuName}
                </td>
                <td className="py-3 font-semibold text-gray-800 dark:text-white">
                  {item.portions.toLocaleString()}
                </td>
                <td className="py-3 text-xs text-gray-500 dark:text-gray-400">
                  {item.time}
                </td>
                <td className="py-3">
                  {item.status === "DELIVERED" ? (
                    <Badge color="success">Diterima</Badge>
                  ) : item.status === "IN_TRANSIT" ? (
                    <Badge color="warning">Dalam Rute</Badge>
                  ) : (
                    <Badge color="info">Persiapan</Badge>
                  )}
                </td>
                <td className="py-3">
                  {item.podStatus === "VERIFIED" ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Foto & TTD
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">Menunggu</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MbgRecentShipments;
