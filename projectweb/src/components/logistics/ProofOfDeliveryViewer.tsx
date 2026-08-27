"use client";
import React, { useState } from "react";
import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";
import { PodRecord, PodSubmissionModal } from "./PodSubmissionModal";
import { PodDetailModal } from "./PodDetailModal";

const sampleSignatureSvg1 =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='100' viewBox='0 0 300 100'><path d='M25,65 Q60,15 100,50 T180,30 T260,60' stroke='%230f172a' stroke-width='3.5' fill='none' stroke-linecap='round'/><path d='M70,75 L210,60' stroke='%230f172a' stroke-width='2' fill='none'/><text x='190' y='85' font-family='sans-serif' font-size='9' fill='%2364748b'>[Verified BAST Digital]</text></svg>";

const sampleSignatureSvg2 =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='100' viewBox='0 0 300 100'><path d='M30,70 Q90,20 120,40 T190,50 T270,30' stroke='%230f172a' stroke-width='3.5' fill='none' stroke-linecap='round'/><path d='M40,40 Q100,80 180,70' stroke='%230f172a' stroke-width='2' fill='none'/><text x='180' y='85' font-family='sans-serif' font-size='9' fill='%2364748b'>[Certified MBG 2026]</text></svg>";

const initialPods: PodRecord[] = [
  {
    id: "POD-2026-0827-01",
    waybillNumber: "SJ-MBG-20260827-0101",
    schoolName: "SDN Menteng 01 Pagi (Sekolah Percontohan)",
    schoolNpsn: "20100101",
    district: "Kec. Menteng, Jakarta Pusat",
    recipientName: "Dra. Hj. Sri Wahyuni, M.Pd",
    recipientNip: "19720814 199803 2 004",
    recipientRole: "Kepala Sekolah & Koordinator Satgas MBG",
    portionsDelivered: 650,
    portionsAccepted: 650,
    receivedTemperature: 58.8,
    deliveryTime: "27 Agu 2026, 09:32 WIB",
    photoUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
    signatureUrl: sampleSignatureSvg1,
    sealIntact: true,
    organolepticCheckPassed: true,
    temperatureCheckPassed: true,
    gpsLatitude: -6.196328,
    gpsLongitude: 106.833894,
    gpsAccuracy: "± 2.8 meter (GPS Verified)",
    notes: "Diterima tepat waktu, kemasan sangat rapi, porsi lengkap untuk kelas 1 sampai 6.",
    status: "VERIFIED",
  },
  {
    id: "POD-2026-0827-02",
    waybillNumber: "SJ-MBG-20260827-0102",
    schoolName: "SMPN 1 Jakarta Pusat",
    schoolNpsn: "20100204",
    district: "Kec. Gambir, Jakarta Pusat",
    recipientName: "Drs. M. Ridwan, M.M",
    recipientNip: "19691120 199512 1 002",
    recipientRole: "Wakil Kepala Sekolah Bidang Kesiswaan",
    portionsDelivered: 820,
    portionsAccepted: 820,
    receivedTemperature: 59.1,
    deliveryTime: "27 Agu 2026, 09:40 WIB",
    photoUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80",
    signatureUrl: sampleSignatureSvg2,
    sealIntact: true,
    organolepticCheckPassed: true,
    temperatureCheckPassed: true,
    gpsLatitude: -6.189412,
    gpsLongitude: 106.838914,
    gpsAccuracy: "± 3.1 meter (GPS Verified)",
    notes: "Kondisi ikan gurame renyah saus terpisah rapi, buah jeruk manis segar.",
    status: "VERIFIED",
  },
];

export const ProofOfDeliveryViewer: React.FC = () => {
  const [pods, setPods] = useState<PodRecord[]>(initialPods);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Modals
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [selectedPod, setSelectedPod] = useState<PodRecord | null>(null);

  // Statistics
  const totalPods = pods.length;
  const verifiedCount = pods.filter((p) => p.status === "VERIFIED").length;
  const totalPortionsAccepted = pods.reduce((acc, curr) => acc + curr.portionsAccepted, 0);

  const filteredPods = pods.filter((item) => {
    const matchesSearch =
      item.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.waybillNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.recipientName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleNewPod = (newPod: PodRecord) => {
    setPods((prev) => [newPod, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Total Bukti Terima (PoD)
              </p>
              <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white">
                {totalPods} <span className="text-xs font-normal text-gray-400">BAST</span>
              </h4>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600">
            <span className="font-semibold">{verifiedCount} Terverifikasi 100%</span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Porsi Diterima Sah
              </p>
              <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white">
                {totalPortionsAccepted.toLocaleString()} <span className="text-xs font-normal text-gray-400">Porsi</span>
              </h4>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
            <span>Deviasi Porsi 0% (Sesuai Pesanan)</span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Rata-rata Suhu Diterima
              </p>
              <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white font-mono">
                59.0°C
              </h4>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600">
            <span className="font-semibold">Sangat Hangat</span>
            <span className="text-gray-400">• Standar &gt; 50°C</span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Integritas Geotag & TTD
              </p>
              <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white">
                100%
              </h4>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-purple-600">
            <span>Validasi Tanda Tangan & GPS Aktif</span>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari sekolah, no. resi, PIC..."
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

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-gray-300 px-3 py-2 text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="ALL">Semua Status Audit</option>
              <option value="VERIFIED">Terverifikasi (Sah)</option>
              <option value="PENDING_AUDIT">Menunggu Review</option>
            </select>
          </div>

          <Button
            onClick={() => setIsSubmitOpen(true)}
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Input Bukti Terima (PoD) Baru
          </Button>
        </div>

        {/* Gallery / Table Grid of PoD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPods.map((pod) => (
            <div
              key={pod.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-800/40 hover:shadow-md transition space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[11px] font-bold text-brand-600 dark:text-brand-400">
                    {pod.waybillNumber}
                  </span>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mt-0.5">
                    {pod.schoolName}
                  </h4>
                  <p className="text-xs text-gray-500">{pod.district}</p>
                </div>
                <Badge color="success">Sah & Lengkap</Badge>
              </div>

              {/* Photo & Specs Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div
                  onClick={() => setSelectedPod(pod)}
                  className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 cursor-pointer border border-gray-200 dark:border-gray-700 group relative"
                >
                  <img
                    src={pod.photoUrl}
                    alt={pod.schoolName}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-[10px] font-bold">
                    Perbesar
                  </div>
                </div>

                <div className="col-span-2 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Penerima:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{pod.recipientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Porsi Diterima:</span>
                    <span className="font-bold text-emerald-600">{pod.portionsAccepted} Box (100%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Suhu Terima:</span>
                    <span className="font-bold text-rose-600 font-mono">{pod.receivedTemperature}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Waktu Serah Terima:</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{pod.deliveryTime}</span>
                  </div>
                </div>
              </div>

              {/* GPS Geotag info & Audit button */}
              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
                  <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Geotag: {pod.gpsLatitude?.toFixed(4)}, {pod.gpsLongitude?.toFixed(4)}</span>
                </div>

                <button
                  onClick={() => setSelectedPod(pod)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 hover:underline"
                >
                  <span>Lihat BAST Digital</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <PodSubmissionModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onSuccess={handleNewPod}
      />

      <PodDetailModal
        isOpen={!!selectedPod}
        onClose={() => setSelectedPod(null)}
        pod={selectedPod}
      />
    </div>
  );
};

export default ProofOfDeliveryViewer;
