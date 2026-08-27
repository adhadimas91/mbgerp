"use client";
import React, { useState } from "react";
import { DistributionPoint } from "./DistributionPointModal";

interface DistributionRouteMapProps {
  points: DistributionPoint[];
  selectedCluster: string;
  onSelectCluster: (cluster: string) => void;
}

export const DistributionRouteMap: React.FC<DistributionRouteMapProps> = ({
  points,
  selectedCluster,
  onSelectCluster,
}) => {
  const [activePin, setActivePin] = useState<DistributionPoint | null>(null);

  const clusters = [
    {
      id: "ALL",
      name: "Semua Rute Klaster",
      driver: "4 Armada Aktif",
      totalPortions: points.reduce((acc, p) => acc + p.targetPortions, 0),
      schoolsCount: points.length,
      color: "#465FFF",
    },
    {
      id: "Rute A (Menteng - Gambir)",
      name: "Klaster A (Menteng - Gambir)",
      driver: "Budi Santoso (Blindvan Box B 9482 MBG)",
      totalPortions: points
        .filter((p) => p.clusterRoute === "Rute A (Menteng - Gambir)")
        .reduce((acc, p) => acc + p.targetPortions, 0),
      schoolsCount: points.filter((p) => p.clusterRoute === "Rute A (Menteng - Gambir)").length,
      color: "#10B981",
    },
    {
      id: "Rute B (Senen - Cempaka)",
      name: "Klaster B (Senen - Cempaka)",
      driver: "Ahmad Rizky (Chiller Box B 9812 MBG)",
      totalPortions: points
        .filter((p) => p.clusterRoute === "Rute B (Senen - Cempaka)")
        .reduce((acc, p) => acc + p.targetPortions, 0),
      schoolsCount: points.filter((p) => p.clusterRoute === "Rute B (Senen - Cempaka)").length,
      color: "#F59E0B",
    },
    {
      id: "Rute C (Tanah Abang - Johar)",
      name: "Klaster C (Tanah Abang - Johar)",
      driver: "Dedi Supriyadi (Truk Engkel B 9021 MBG)",
      totalPortions: points
        .filter((p) => p.clusterRoute === "Rute C (Tanah Abang - Johar)")
        .reduce((acc, p) => acc + p.targetPortions, 0),
      schoolsCount: points.filter((p) => p.clusterRoute === "Rute C (Tanah Abang - Johar)").length,
      color: "#8B5CF6",
    },
  ];

  const filteredPoints =
    selectedCluster === "ALL"
      ? points
      : points.filter((p) => p.clusterRoute === selectedCluster);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping"></span>
              Optimasi Rute Multi-Drop
            </span>
            <span className="text-xs text-gray-500">SPPG Central Kitchen Harmoni Pusat</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Peta Visual Klaster Distribusi & Matriks Jarak Titik Sekolah
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Perencanaan rute klaster armada pengantaran untuk menjamin makanan tiba hangat (&gt;60°C) dalam batas waktu maksimal 45 menit.
          </p>
        </div>

        {/* Cluster Switcher Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {clusters.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelectCluster(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
                selectedCluster === c.id
                  ? "bg-brand-600 text-white shadow-md shadow-brand-500/20"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: c.id === "ALL" ? "#fff" : c.color }}
              ></span>
              {c.name} ({c.schoolsCount} Titik)
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive SVG / Canvas Map View */}
        <div className="lg:col-span-2 relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 overflow-hidden min-h-[380px] flex flex-col justify-between border border-slate-700 shadow-inner">
          {/* Map Grid Background pattern */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px), linear-gradient(to right, #444 1px, transparent 1px), linear-gradient(to bottom, #444 1px, transparent 1px)",
              backgroundSize: "24px 24px, 48px 48px, 48px 48px",
            }}
          ></div>

          {/* Central Kitchen Radar Pulse */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-white text-xs">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </div>
              <div>
                <p className="font-bold text-rose-300">SPPG Harmoni (Dapur Sentral MBG)</p>
                <p className="text-[10px] text-gray-300">Kapasitas: 25.000 Porsi/Hari • Radius Aktif: 8.5 km</p>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white text-[11px]">
              Trafik: <span className="text-emerald-400 font-bold">Lancar (Rata-rata 18 km/j)</span>
            </div>
          </div>

          {/* Graphical Nodes Visualization */}
          <div className="relative z-10 my-8">
            <svg viewBox="0 0 600 240" className="w-full h-auto overflow-visible">
              <defs>
                <linearGradient id="routeLineA" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="routeLineB" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="routeLineC" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Central Hub Node */}
              <circle cx="300" cy="120" r="28" fill="#E11D48" fillOpacity="0.2" className="animate-pulse" />
              <circle cx="300" cy="120" r="14" fill="#E11D48" stroke="#fff" strokeWidth="2" />
              <text x="300" y="152" fill="#FDA4AF" fontSize="10" textAnchor="middle" fontWeight="bold">
                SPPG PUSAT
              </text>

              {/* Connecting Lines to clusters */}
              {/* Cluster A */}
              <path
                d="M 300 120 Q 220 70 120 60 T 60 110"
                fill="none"
                stroke="url(#routeLineA)"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
              {/* Cluster B */}
              <path
                d="M 300 120 Q 420 60 500 80 T 540 160"
                fill="none"
                stroke="url(#routeLineB)"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
              {/* Cluster C */}
              <path
                d="M 300 120 Q 280 180 180 200 T 100 170"
                fill="none"
                stroke="url(#routeLineC)"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />

              {/* Render dynamic pin nodes for schools */}
              {filteredPoints.slice(0, 8).map((point, idx) => {
                // Approximate visual coordinates based on index and cluster
                let cx = 100 + (idx % 4) * 120;
                let cy = 50 + (idx % 3) * 65;
                if (point.clusterRoute === "Rute A (Menteng - Gambir)") {
                  cx = 80 + idx * 45;
                  cy = 60 + (idx % 2) * 50;
                } else if (point.clusterRoute === "Rute B (Senen - Cempaka)") {
                  cx = 420 + (idx % 3) * 50;
                  cy = 70 + idx * 35;
                } else {
                  cx = 120 + (idx % 3) * 70;
                  cy = 180 - (idx % 2) * 40;
                }

                const isHovered = activePin?.id === point.id;
                const pinColor =
                  point.clusterRoute === "Rute A (Menteng - Gambir)"
                    ? "#10B981"
                    : point.clusterRoute === "Rute B (Senen - Cempaka)"
                    ? "#F59E0B"
                    : "#8B5CF6";

                return (
                  <g
                    key={point.id}
                    className="cursor-pointer transition-transform hover:scale-125"
                    onClick={() => setActivePin(point)}
                    onMouseEnter={() => setActivePin(point)}
                  >
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isHovered ? "14" : "10"}
                      fill={pinColor}
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <text
                      x={cx}
                      y={cy + 3}
                      fill="#ffffff"
                      fontSize="9"
                      textAnchor="middle"
                      fontWeight="bold"
                    >
                      {idx + 1}
                    </text>
                    <text
                      x={cx}
                      y={cy - 12}
                      fill="#e2e8f0"
                      fontSize="9"
                      textAnchor="middle"
                      className="drop-shadow"
                    >
                      {point.name.length > 14 ? point.name.substring(0, 12) + "..." : point.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom Info Bar & Map Legend */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10 text-xs text-gray-300">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Rute A (Hijau)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Rute B (Kuning)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Rute C (Ungu)
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              *Klik pada pin titik sekolah untuk melihat ringkasan koordinat & porsi
            </p>
          </div>
        </div>

        {/* Sidebar Detail Card for Selected Point or Selected Cluster */}
        <div className="flex flex-col justify-between rounded-2xl bg-gray-50 p-5 dark:bg-gray-800/40 border border-gray-200/80 dark:border-gray-800">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                {activePin ? "Detail Titik Sasaran" : "Ringkasan Klaster Distribusi"}
              </h4>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300 font-semibold">
                {activePin ? activePin.category : "SOP Pengantaran"}
              </span>
            </div>

            {activePin ? (
              <div className="space-y-3.5 text-xs">
                <div>
                  <p className="font-bold text-sm text-gray-800 dark:text-white">{activePin.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5">{activePin.address}</p>
                </div>

                <div className="rounded-xl bg-white p-3 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Kuota Porsi:</span>
                    <span className="font-bold text-brand-600 dark:text-brand-400">
                      {activePin.targetPortions.toLocaleString()} Porsi
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Jadwal Drop-off:</span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {activePin.dropOffWindow}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Penanggung Jawab (PIC):</span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {activePin.picName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">WhatsApp:</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400">
                      {activePin.picPhone}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] space-y-1">
                  <div className="flex justify-between text-gray-500">
                    <span>Koordinat GPS:</span>
                    <span className="font-mono">{activePin.latitude}, {activePin.longitude}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Klaster Rute:</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{activePin.clusterRoute}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActivePin(null)}
                  className="w-full text-center text-xs text-brand-600 hover:underline pt-2 font-medium"
                >
                  ← Kembali ke Ringkasan Klaster
                </button>
              </div>
            ) : (
              <div className="space-y-3.5 text-xs text-gray-600 dark:text-gray-300">
                <div className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">Standar Waktu Logistik MBG</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    Makanan dimasak selesai pk 08:30 WIB. Muat armada pk 09:00 WIB. Tiba di sekolah maksimal pk 10:15 WIB sebelum jam istirahat pertama.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Porsi Klaster Aktif:</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {filteredPoints.reduce((acc, p) => acc + p.targetPortions, 0).toLocaleString()} Porsi
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Jumlah Sekolah Sasaran:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{filteredPoints.length} Lokasi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Armada Pengantaran:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      Blindvan & Truk Bersegel
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Suhu Target Wadah:</span>
                    <span className="font-bold text-rose-500">&gt; 60°C (Panas ISO 22000)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 mt-4">
            <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Algoritma Traveling Salesperson Problem (TSP) otomatis memprioritaskan sekolah jam istirahat lebih awal.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributionRouteMap;
