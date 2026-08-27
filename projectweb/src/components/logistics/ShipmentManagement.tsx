"use client";
import React, { useState, useEffect } from "react";
import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";
import { Shipment, CreateShipmentModal } from "./CreateShipmentModal";
import { LiveTrackingModal } from "./LiveTrackingModal";
import { ShipmentWaybillPrintModal } from "./ShipmentWaybillPrintModal";
import logisticsService from "@/services/logistics.service";

const initialShipments: Shipment[] = [
  {
    id: "SHP-101",
    waybillNumber: "SJ-MBG-20260827-0101",
    schoolName: "SDN Menteng 01 Pagi (Sekolah Percontohan)",
    schoolNpsn: "20100101",
    district: "Kec. Menteng, Jakarta Pusat",
    menuName: "Nasi Ayam Bakar Madu + Tumis Buncis Jagung + Pisang Cavendish + Susu UHT MBG",
    portions: 650,
    centralKitchen: "SPPG Harmoni (Central Kitchen 01)",
    fleetVehicle: "Blindvan Box Chiller (B 9482 MBG)",
    driverName: "Budi Santoso",
    driverPhone: "0812-9876-5432",
    departureTime: "09:00 WIB",
    estimatedArrival: "09:35 WIB",
    actualArrival: "09:32 WIB",
    loadingTemperature: 64.8,
    sealNumber: "SEAL-MBG-88101",
    status: "DELIVERED",
    podStatus: "VERIFIED",
    currentLocationLat: -6.1963,
    currentLocationLng: 106.8338,
  },
  {
    id: "SHP-102",
    waybillNumber: "SJ-MBG-20260827-0102",
    schoolName: "SMPN 1 Jakarta Pusat",
    schoolNpsn: "20100204",
    district: "Kec. Gambir, Jakarta Pusat",
    menuName: "Nasi Ikan Gurame Asam Manis + Sayur Lodeh Labu Siam + Buah Jeruk Pontianak",
    portions: 820,
    centralKitchen: "SPPG Harmoni (Central Kitchen 01)",
    fleetVehicle: "Truk Chiller Box 2T (B 9812 MBG)",
    driverName: "Ahmad Rizky",
    driverPhone: "0813-1122-3344",
    departureTime: "09:15 WIB",
    estimatedArrival: "09:45 WIB",
    actualArrival: "09:40 WIB",
    loadingTemperature: 65.2,
    sealNumber: "SEAL-MBG-88102",
    status: "DELIVERED",
    podStatus: "VERIFIED",
    currentLocationLat: -6.1894,
    currentLocationLng: 106.8389,
  },
  {
    id: "SHP-103",
    waybillNumber: "SJ-MBG-20260827-0103",
    schoolName: "SDN Kebon Sirih 03",
    schoolNpsn: "20100350",
    district: "Kec. Menteng, Jakarta Pusat",
    menuName: "Nasi Daging Semur Daging Sapi + Sup Sayur Wortel + Telur Puyuh Rebus",
    portions: 450,
    centralKitchen: "SPPG Harmoni (Central Kitchen 01)",
    fleetVehicle: "Blindvan Box Chiller (B 9482 MBG)",
    driverName: "Budi Santoso",
    driverPhone: "0812-9876-5432",
    departureTime: "10:00 WIB",
    estimatedArrival: "10:25 WIB",
    loadingTemperature: 65.0,
    sealNumber: "SEAL-MBG-88103",
    status: "IN_TRANSIT",
    podStatus: "PENDING",
    currentLocationLat: -6.1834,
    currentLocationLng: 106.8291,
  },
  {
    id: "SHP-104",
    waybillNumber: "SJ-MBG-20260827-0104",
    schoolName: "SMPN 2 Jakarta Pusat",
    schoolNpsn: "20100412",
    district: "Kec. Senen, Jakarta Pusat",
    menuName: "Nasi Ayam Kremes + Tempe Orek Manis + Sayur Bening Bayam Jagung",
    portions: 1100,
    centralKitchen: "SPPG Cempaka (Central Kitchen 02)",
    fleetVehicle: "Truk Engkel Termal (B 9021 MBG)",
    driverName: "Dedi Supriyadi",
    driverPhone: "0811-7788-9900",
    departureTime: "09:30 WIB",
    estimatedArrival: "10:05 WIB",
    loadingTemperature: 66.0,
    sealNumber: "SEAL-MBG-88104",
    status: "IN_TRANSIT",
    podStatus: "PENDING",
    currentLocationLat: -6.1956,
    currentLocationLng: 106.8512,
  },
  {
    id: "SHP-105",
    waybillNumber: "SJ-MBG-20260827-0105",
    schoolName: "Panti Asuhan Kasih Mandiri",
    schoolNpsn: "LKS-9901",
    district: "Kec. Tanah Abang, Jakarta Pusat",
    menuName: "Nasi Rolade Daging Sapi Saus Tomat + Sayur Brokoli Wortel + Pisang",
    portions: 220,
    centralKitchen: "SPPG Tanah Abang (Central Kitchen 03)",
    fleetVehicle: "Blindvan Box Chiller (B 9110 MBG)",
    driverName: "Hendra Wijaya",
    driverPhone: "0856-1122-3344",
    departureTime: "10:15 WIB",
    estimatedArrival: "10:45 WIB",
    loadingTemperature: 64.0,
    sealNumber: "SEAL-MBG-88105",
    status: "PREPARING",
    podStatus: "PENDING",
  },
];

export const ShipmentManagement: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchShipments = async () => {
    setIsLoading(true);
    try {
      const data = await logisticsService.getShipments();
      if (Array.isArray(data) && data.length > 0) {
        const mapped: Shipment[] = data.map((s: any) => ({
          id: s.id || `SHP-${s.waybillNumber || "00"}`,
          waybillNumber: s.waybillNumber || "SJ-MBG-2026",
          schoolName: s.targetSchool || s.distributionPoint?.name || "Sekolah Sasaran MBG",
          schoolNpsn: s.distributionPoint?.npsn || "20100000",
          district: s.distributionPoint?.district || "DKI Jakarta",
          menuName: s.menuName || "Paket Makanan Bergizi Seimbang BGN",
          portions: Number(s.portionCount || 500),
          centralKitchen: s.centralKitchen || "SPPG Harmoni 01",
          fleetVehicle: s.vehiclePlate || "Blindvan Box MBG",
          driverName: s.driverName || "Driver MBG",
          driverPhone: s.driverPhone || "0812-xxxx",
          departureTime: s.departureTime ? new Date(s.departureTime).toLocaleTimeString("id-ID") : "09:00 WIB",
          estimatedArrival: s.estimatedArrival ? new Date(s.estimatedArrival).toLocaleTimeString("id-ID") : "09:45 WIB",
          loadingTemperature: Number(s.initialTempC || 65.0),
          sealNumber: s.sealNumber || "SEAL-MBG-001",
          status: s.status || "IN_TRANSIT",
          podStatus: s.status === "DELIVERED" ? "VERIFIED" : "PENDING",
        }));
        setShipments(mapped);
      }
    } catch {
      // demo fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [trackingShipment, setTrackingShipment] = useState<Shipment | null>(null);
  const [printShipment, setPrintShipment] = useState<Shipment | null>(null);

  // Statistics
  const totalShipments = shipments.length;
  const totalPortions = shipments.reduce((acc, curr) => acc + curr.portions, 0);
  const inTransitCount = shipments.filter((s) => s.status === "IN_TRANSIT").length;
  const deliveredCount = shipments.filter((s) => s.status === "DELIVERED").length;

  const filteredShipments = shipments.filter((item) => {
    const matchesSearch =
      item.waybillNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fleetVehicle.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === "ALL") return matchesSearch;
    if (activeFilter === "IN_TRANSIT") return matchesSearch && item.status === "IN_TRANSIT";
    if (activeFilter === "DELIVERED") return matchesSearch && item.status === "DELIVERED";
    if (activeFilter === "PREPARING") return matchesSearch && item.status === "PREPARING";
    return matchesSearch;
  });

  const handleNewShipment = async (newShipment: Shipment) => {
    setShipments((prev) => [newShipment, ...prev]);
    try {
      await logisticsService.createShipment({
        waybillNumber: newShipment.waybillNumber,
        driverName: newShipment.driverName,
        driverPhone: newShipment.driverPhone,
        vehiclePlate: newShipment.fleetVehicle,
        targetSchool: newShipment.schoolName,
        portionCount: newShipment.portions,
        departureTime: new Date().toISOString(),
        estimatedArrival: new Date(Date.now() + 45 * 60000).toISOString(),
        initialTempC: newShipment.loadingTemperature,
      });
    } catch {
      // demo mode
    }
  };

  const handleUpdateStatus = (shipmentId: string, newStatus: Shipment["status"]) => {
    setShipments((prev) =>
      prev.map((s) =>
        s.id === shipmentId
          ? {
              ...s,
              status: newStatus,
              podStatus: newStatus === "DELIVERED" ? "VERIFIED" : s.podStatus,
            }
          : s
      )
    );
    if (trackingShipment && trackingShipment.id === shipmentId) {
      setTrackingShipment((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Stat Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Pengiriman Hari Ini
              </p>
              <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white">
                {totalShipments} <span className="text-xs font-normal text-gray-400">Surat Jalan</span>
              </h4>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
            <span className="font-semibold text-emerald-600">{deliveredCount} Selesai</span>
            <span>• {inTransitCount} Dalam Rute</span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Total Porsi Terkirim
              </p>
              <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white">
                {totalPortions.toLocaleString()} <span className="text-xs font-normal text-gray-400">Porsi</span>
              </h4>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600">
            <span>100% Porsi Tepat Sasaran</span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                On-Time Arrival Rate (OTA)
              </p>
              <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white">
                98.6%
              </h4>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
            <span className="text-emerald-600 font-semibold">Tiba Tepat Waktu</span>
            <span>sebelum pk 10:15 WIB</span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Kepatuhan Suhu Termal ISO
              </p>
              <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white">
                64.5°C <span className="text-xs font-normal text-rose-500 font-bold">Rata-rata</span>
              </h4>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-600">
            <span className="font-semibold">Bebas Bahaya Bakteri</span>
            <span className="text-gray-400">• &gt; 60°C Utuh</span>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari no. resi, sekolah, driver..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 sm:w-80 rounded-xl border border-gray-300 pl-9 pr-4 py-2 text-xs focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
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

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
              <button
                onClick={() => setActiveFilter("ALL")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeFilter === "ALL"
                    ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400"
                }`}
              >
                Semua ({totalShipments})
              </button>
              <button
                onClick={() => setActiveFilter("IN_TRANSIT")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeFilter === "IN_TRANSIT"
                    ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400"
                }`}
              >
                Dalam Rute ({inTransitCount})
              </button>
              <button
                onClick={() => setActiveFilter("DELIVERED")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeFilter === "DELIVERED"
                    ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400"
                }`}
              >
                Tiba / Selesai ({deliveredCount})
              </button>
            </div>
          </div>

          <div>
            <Button
              onClick={() => setIsCreateOpen(true)}
              size="sm"
              className="bg-brand-600 hover:bg-brand-700 text-white font-semibold flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Buat Surat Jalan Baru
            </Button>
          </div>
        </div>

        {/* Shipment Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-[11px] font-semibold uppercase text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <th className="pb-3 pl-2">No. Surat Jalan & Resi</th>
                <th className="pb-3">Sekolah / Titik Tujuan</th>
                <th className="pb-3">Rincian Menu MBG</th>
                <th className="pb-3 text-center">Porsi</th>
                <th className="pb-3">Armada & Driver</th>
                <th className="pb-3">Waktu Berangkat / ETA</th>
                <th className="pb-3 text-center">Suhu Muat</th>
                <th className="pb-3">Status Pengiriman</th>
                <th className="pb-3 text-right pr-2">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
              {filteredShipments.map((shipment) => (
                <tr key={shipment.id} className="hover:bg-gray-50/60 dark:hover:bg-white/[0.01]">
                  <td className="py-3.5 pl-2 font-mono">
                    <p className="font-bold text-gray-900 dark:text-white">{shipment.waybillNumber}</p>
                    <span className="text-[10px] text-gray-400">Segel: {shipment.sealNumber}</span>
                  </td>

                  <td className="py-3.5 max-w-[200px]">
                    <p className="font-bold text-gray-900 dark:text-white truncate">{shipment.schoolName}</p>
                    <p className="text-[11px] text-gray-400">{shipment.district}</p>
                  </td>

                  <td className="py-3.5 max-w-[220px]">
                    <p className="text-gray-700 dark:text-gray-300 line-clamp-2">{shipment.menuName}</p>
                  </td>

                  <td className="py-3.5 text-center">
                    <span className="font-bold text-sm text-brand-600 dark:text-brand-400">
                      {shipment.portions.toLocaleString()}
                    </span>
                    <p className="text-[10px] text-gray-400">Porsi</p>
                  </td>

                  <td className="py-3.5">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{shipment.driverName}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{shipment.fleetVehicle.split("(")[0]}</p>
                  </td>

                  <td className="py-3.5">
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      Berangkat: <span className="font-mono">{shipment.departureTime}</span>
                    </p>
                    <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                      ETA: {shipment.actualArrival || shipment.estimatedArrival}
                    </p>
                  </td>

                  <td className="py-3.5 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300 border border-rose-200 dark:border-rose-500/20">
                      {shipment.loadingTemperature}°C
                    </span>
                  </td>

                  <td className="py-3.5">
                    {shipment.status === "DELIVERED" ? (
                      <Badge color="success">Diterima (Selesai)</Badge>
                    ) : shipment.status === "IN_TRANSIT" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                        Dalam Rute
                      </span>
                    ) : (
                      <Badge color="info">Persiapan Muat</Badge>
                    )}
                  </td>

                  <td className="py-3.5 text-right pr-2">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setTrackingShipment(shipment)}
                        title="Live GPS Tracking"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-300"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        Lacak
                      </button>

                      <button
                        onClick={() => setPrintShipment(shipment)}
                        title="Cetak Surat Jalan Resmi"
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <CreateShipmentModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={handleNewShipment}
      />

      <LiveTrackingModal
        isOpen={!!trackingShipment}
        onClose={() => setTrackingShipment(null)}
        shipment={trackingShipment}
        onUpdateStatus={handleUpdateStatus}
      />

      <ShipmentWaybillPrintModal
        isOpen={!!printShipment}
        onClose={() => setPrintShipment(null)}
        shipment={printShipment}
      />
    </div>
  );
};

export default ShipmentManagement;
