"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import Badge from "../ui/badge/Badge";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface SensorUnit {
  id: string;
  name: string;
  location: string;
  type: "CHILLER" | "FREEZER" | "VEHICLE_REFRIGERATOR";
  currentTemp: number;
  targetMin: number;
  targetMax: number;
  humidity: number;
  status: "NORMAL" | "WARNING" | "CRITICAL";
  lastPing: string;
  battery: string;
}

const sensors: SensorUnit[] = [
  {
    id: "IOT-SENS-01",
    name: "Chiller Daging & Protein Utama",
    location: "Gudang Pusat Jakarta - Cold Room A",
    type: "CHILLER",
    currentTemp: 2.2,
    targetMin: 0.0,
    targetMax: 4.0,
    humidity: 85,
    status: "NORMAL",
    lastPing: "10 detik lalu",
    battery: "100% (AC Powered)",
  },
  {
    id: "IOT-SENS-02",
    name: "Deep Freezer Ikan & Seafood",
    location: "Gudang Pusat Jakarta - Freezer 01",
    type: "FREEZER",
    currentTemp: -18.4,
    targetMin: -22.0,
    targetMax: -16.0,
    humidity: 60,
    status: "NORMAL",
    lastPing: "15 detik lalu",
    battery: "100% (AC Powered)",
  },
  {
    id: "IOT-SENS-03",
    name: "Chiller Susu Segar Pasteurisasi",
    location: "Cold Storage Susu MBG - Room B",
    type: "CHILLER",
    currentTemp: 3.1,
    targetMin: 1.0,
    targetMax: 4.0,
    humidity: 82,
    status: "NORMAL",
    lastPing: "30 detik lalu",
    battery: "98%",
  },
  {
    id: "IOT-SENS-04",
    name: "Chiller Truk Armada Distribusi 03",
    location: "Armada Mobil B-9821-MBG (Dalam Rute)",
    type: "VEHICLE_REFRIGERATOR",
    currentTemp: 4.6,
    targetMin: 0.0,
    targetMax: 4.0,
    humidity: 78,
    status: "WARNING",
    lastPing: "1 menit lalu",
    battery: "Alternator OK",
  },
];

export const ColdChainTelemetry: React.FC = () => {
  const [selectedSensor, setSelectedSensor] = useState<string>("IOT-SENS-01");

  // ApexChart Options
  const chartOptions: ApexOptions = {
    chart: {
      type: "area",
      height: 310,
      toolbar: { show: false },
      fontFamily: "inherit",
    },
    stroke: {
      curve: "smooth",
      width: 2.5,
    },
    colors: ["#059669", "#dc2626"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
      labels: {
        style: { colors: "#9ca3af", fontSize: "11px" },
      },
    },
    yaxis: {
      title: { text: "Suhu (°C)", style: { color: "#9ca3af", fontSize: "11px" } },
      labels: {
        style: { colors: "#9ca3af", fontSize: "11px" },
        formatter: (val) => `${val.toFixed(1)}°C`,
      },
    },
    annotations: {
      yaxis: [
        {
          y: 4.0,
          borderColor: "#dc2626",
          label: {
            borderColor: "#dc2626",
            style: { color: "#fff", background: "#dc2626", fontSize: "10px" },
            text: "Batas Kritis Maksimal ISO 22000 (4.0°C)",
          },
        },
      ],
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: "#37415120",
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (val) => `${val}°C` },
    },
  };

  const chartSeries = [
    {
      name: "Suhu Aktual Sensor (°C)",
      data: [2.1, 2.3, 2.0, 2.2, 2.5, 3.1, 2.8, 2.4, 2.6, 2.2, 2.3, 2.2],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Alert HACCP Cold Chain */}
      <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-4 dark:border-sky-900/40 dark:bg-sky-950/20">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-sky-600 p-2 text-white shadow-sm">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-sky-900 dark:text-sky-300">
              Telemetri Sensor Suhu Cold Chain ISO 22000 / HACCP Real-time
            </h4>
            <p className="mt-1 text-xs text-sky-800/80 dark:text-sky-400">
              Sensor IoT memonitor suhu ruang pendingin dan kendaraan pengangkut setiap 30 detik. Notifikasi peringatan otomatis akan dikirim jika suhu chiller melebihi 4.0°C untuk mencegah perkembangbiakan bakteri pada bahan protein.
            </p>
          </div>
        </div>
      </div>

      {/* Sensor Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {sensors.map((sensor) => (
          <div
            key={sensor.id}
            onClick={() => setSelectedSensor(sensor.id)}
            className={`rounded-2xl border p-4.5 cursor-pointer transition ${
              selectedSensor === sensor.id
                ? "border-emerald-500 bg-emerald-50/20 dark:border-emerald-500 dark:bg-emerald-500/5 shadow-sm"
                : "border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-semibold text-gray-400">{sensor.id}</span>
              {sensor.status === "NORMAL" ? (
                <Badge color="success" size="sm">Normal</Badge>
              ) : (
                <Badge color="warning" size="sm">Anomali Suhu</Badge>
              )}
            </div>

            <h4 className="mt-2 text-xs font-bold text-gray-900 dark:text-white leading-snug">
              {sensor.name}
            </h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5">{sensor.location}</p>

            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-black text-gray-900 dark:text-white">
                  {sensor.currentTemp > 0 ? `+${sensor.currentTemp}` : sensor.currentTemp}°C
                </span>
                <span className="text-[10px] text-gray-400 block">Target: {sensor.targetMin}°C s/d {sensor.targetMax}°C</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400">{sensor.humidity}%</span>
                <span className="text-[10px] text-gray-400 block">Kelembapan</span>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[10px] text-gray-400">
              <span>Ping: {sensor.lastPing}</span>
              <span>Daya: {sensor.battery}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Grafik Log Fluktuasi Suhu 24 Jam Terakhir
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Sensor Terpilih: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{selectedSensor}</span> (Perekaman Otomatis Interval 2 Jam)
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full dark:bg-emerald-500/10 dark:text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Sensors Online & Streaming
          </span>
        </div>

        <div className="w-full">
          <ReactApexChart options={chartOptions} series={chartSeries} type="area" height={310} />
        </div>
      </div>
    </div>
  );
};

export default ColdChainTelemetry;
