"use client";
import React, { useState } from "react";
import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";
import { DistributionPointModal, DistributionPoint } from "./DistributionPointModal";
import { DistributionRouteMap } from "./DistributionRouteMap";

const initialPoints: DistributionPoint[] = [
  {
    id: "DP-1001",
    npsn: "20100101",
    name: "SDN Menteng 01 Pagi (Sekolah Percontohan)",
    category: "SD/MI",
    district: "Kec. Menteng, Jakarta Pusat",
    address: "Jl. Besuki No. 4, RT.3/RW.5, Menteng",
    latitude: -6.196328,
    longitude: 106.833894,
    picName: "Dra. Hj. Sri Wahyuni, M.Pd",
    picRole: "Kepala Sekolah & Koordinator Satgas MBG",
    picPhone: "0812-8822-1001",
    picEmail: "sdnmenteng01@jakarta.sch.id",
    targetPortions: 650,
    morningPortions: 400,
    noonPortions: 250,
    dropOffWindow: "09:30 - 10:00 WIB",
    clusterRoute: "Rute A (Menteng - Gambir)",
    hasDedicatedRoom: true,
    notes: "Akses gerbang timur muat truk blindvan box. Terdapat 4 siswa alergi telur.",
    status: "ACTIVE",
  },
  {
    id: "DP-1002",
    npsn: "20100204",
    name: "SMPN 1 Jakarta Pusat",
    category: "SMP/MTs",
    district: "Kec. Gambir, Jakarta Pusat",
    address: "Jl. Cikini Raya No. 8, Gambir",
    latitude: -6.189412,
    longitude: 106.838914,
    picName: "Drs. M. Ridwan, M.M",
    picRole: "Wakil Kepala Sekolah Bidang Kesiswaan",
    picPhone: "0813-1122-3344",
    picEmail: "smpn1jakarta@dki.sch.id",
    targetPortions: 820,
    morningPortions: 500,
    noonPortions: 320,
    dropOffWindow: "10:00 - 10:30 WIB",
    clusterRoute: "Rute A (Menteng - Gambir)",
    hasDedicatedRoom: true,
    notes: "Meja serah terima di aula utama lantai 1. Akses jalan lebar.",
    status: "ACTIVE",
  },
  {
    id: "DP-1003",
    npsn: "20100350",
    name: "SDN Kebon Sirih 03",
    category: "SD/MI",
    district: "Kec. Menteng, Jakarta Pusat",
    address: "Jl. Kebon Sirih Barat Dalam No. 12",
    latitude: -6.184311,
    longitude: 106.828452,
    picName: "Siti Rahmawati, S.Pd",
    picRole: "Guru Pembina UKS & MBG",
    picPhone: "0815-9988-7711",
    picEmail: "sdnkebonsirih03@jakarta.sch.id",
    targetPortions: 480,
    morningPortions: 300,
    noonPortions: 180,
    dropOffWindow: "09:15 - 09:45 WIB",
    clusterRoute: "Rute A (Menteng - Gambir)",
    hasDedicatedRoom: true,
    notes: "Gang masuk motor & roda tiga / blindvan kecil.",
    status: "ACTIVE",
  },
  {
    id: "DP-1004",
    npsn: "20100488",
    name: "SMAN 68 Jakarta Pusat",
    category: "SMA/SMK",
    district: "Kec. Senen, Jakarta Pusat",
    address: "Jl. Salemba Raya No. 18, Senen",
    latitude: -6.195612,
    longitude: 106.851221,
    picName: "Dr. Budi Santoso, M.Si",
    picRole: "Kepala Sekolah",
    picPhone: "0811-9876-5432",
    picEmail: "sman68@jakarta.sch.id",
    targetPortions: 1100,
    morningPortions: 600,
    noonPortions: 500,
    dropOffWindow: "10:30 - 11:00 WIB",
    clusterRoute: "Rute B (Senen - Cempaka)",
    hasDedicatedRoom: true,
    notes: "Pintu masuk selatan dekat kantin higienis. Lapangan luas untuk bongkar muat.",
    status: "ACTIVE",
  },
  {
    id: "DP-1005",
    npsn: "20100512",
    name: "SDN Cempaka Putih Timur 01",
    category: "SD/MI",
    district: "Kec. Cempaka Putih, Jakarta Pusat",
    address: "Jl. Cempaka Putih Tengah 33",
    latitude: -6.182103,
    longitude: 106.868945,
    picName: "Nur Hidayah, S.Pd.SD",
    picRole: "Koordinator Satgas Gizi Sekolah",
    picPhone: "0857-1234-5678",
    picEmail: "sdncempakaputih01@jakarta.sch.id",
    targetPortions: 540,
    morningPortions: 340,
    noonPortions: 200,
    dropOffWindow: "09:30 - 10:00 WIB",
    clusterRoute: "Rute B (Senen - Cempaka)",
    hasDedicatedRoom: true,
    notes: "Kantin sudah steril dan memiliki rak susun makanan hangat bertingkat.",
    status: "ACTIVE",
  },
  {
    id: "DP-1006",
    npsn: "LKS-9901",
    name: "Panti Asuhan Kasih Mandiri",
    category: "Panti Asuhan",
    district: "Kec. Tanah Abang, Jakarta Pusat",
    address: "Jl. Kebon Kacang IX No. 22",
    latitude: -6.191244,
    longitude: 106.818933,
    picName: "Ustadz H. Ahmad Fauzi",
    picRole: "Ketua Pengurus Lembaga",
    picPhone: "0813-8877-6655",
    picEmail: "pantikasihtanahabang@gmail.com",
    targetPortions: 220,
    morningPortions: 110,
    noonPortions: 110,
    dropOffWindow: "10:45 - 11:15 WIB",
    clusterRoute: "Rute C (Tanah Abang - Johar)",
    hasDedicatedRoom: true,
    notes: "Penerima program pemenuhan gizi khusus anak yatim & duafa.",
    status: "ACTIVE",
  },
  {
    id: "DP-1007",
    npsn: "20100677",
    name: "SLB Negeri 01 Jakarta",
    category: "SLB/Khusus",
    district: "Kec. Johar Baru, Jakarta Pusat",
    address: "Jl. Percetakan Negara IX No. 3",
    latitude: -6.187890,
    longitude: 106.861230,
    picName: "Endang Susilowati, S.Pd",
    picRole: "Koordinator Program MBG Inklusif",
    picPhone: "0812-4455-6677",
    picEmail: "slbn01jkt@gmail.com",
    targetPortions: 180,
    morningPortions: 100,
    noonPortions: 80,
    dropOffWindow: "09:00 - 09:30 WIB",
    clusterRoute: "Rute C (Tanah Abang - Johar)",
    hasDedicatedRoom: true,
    notes: "Perlu penanganan menu tekstur lembut untuk beberapa siswa disabilitas.",
    status: "ACTIVE",
  },
];

export const DistributionPointsTable: React.FC = () => {
  const [points, setPoints] = useState<DistributionPoint[]>(initialPoints);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [districtFilter, setDistrictFilter] = useState("ALL");
  const [clusterFilter, setClusterFilter] = useState("ALL");
  const [viewMode, setViewMode] = useState<"TABLE" | "MAP_CLUSTER">("TABLE");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPoint, setEditingPoint] = useState<DistributionPoint | null>(null);

  // Statistics calculation
  const totalPoints = points.length;
  const totalPortions = points.reduce((acc, curr) => acc + curr.targetPortions, 0);
  const activePoints = points.filter((p) => p.status === "ACTIVE").length;

  const filteredPoints = points.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.npsn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.picName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "ALL" || item.category === categoryFilter;

    const matchesDistrict =
      districtFilter === "ALL" || item.district.includes(districtFilter);

    const matchesCluster =
      clusterFilter === "ALL" || item.clusterRoute === clusterFilter;

    return matchesSearch && matchesCategory && matchesDistrict && matchesCluster;
  });

  const handleSavePoint = (savedPoint: DistributionPoint) => {
    if (editingPoint) {
      setPoints((prev) =>
        prev.map((p) => (p.id === savedPoint.id ? savedPoint : p))
      );
    } else {
      setPoints((prev) => [savedPoint, ...prev]);
    }
  };

  const handleOpenEdit = (point: DistributionPoint) => {
    setEditingPoint(point);
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingPoint(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus titik distribusi ini dari database MBG?")) {
      setPoints((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Total Titik Distribusi
              </p>
              <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white">
                {totalPoints} <span className="text-xs font-normal text-gray-400">Lembaga</span>
              </h4>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
            <span className="font-semibold">{activePoints} Titik Aktif</span>
            <span className="text-gray-400">• 100% Siap Terima</span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Target Porsi Harian
              </p>
              <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white">
                {totalPortions.toLocaleString()} <span className="text-xs font-normal text-gray-400">Porsi/Hari</span>
              </h4>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <span>Porsi Pagi & Siang Terintegrasi</span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Radius Rata-rata Pengantaran
              </p>
              <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white">
                4.2 <span className="text-xs font-normal text-gray-400">km</span>
              </h4>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
            <span className="font-semibold">&lt; 35 Menit Transit</span>
            <span className="text-gray-400">• Suhu Terjaga Panas</span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Klaster Armada Beroperasi
              </p>
              <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white">
                3 <span className="text-xs font-normal text-gray-400">Rute Klaster</span>
              </h4>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <span>Blindvan & Chiller Box Aktif</span>
          </div>
        </div>
      </div>

      {/* View Switcher: Route Cluster Map Visual vs Table */}
      {viewMode === "MAP_CLUSTER" && (
        <DistributionRouteMap
          points={points}
          selectedCluster={clusterFilter}
          onSelectCluster={(c) => setClusterFilter(c)}
        />
      )}

      {/* Main Table Container */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari sekolah, NPSN, PIC..."
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
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-xl border border-gray-300 px-3 py-2 text-xs focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="ALL">Semua Jenjang</option>
              <option value="SD/MI">SD / MI</option>
              <option value="SMP/MTs">SMP / MTs</option>
              <option value="SMA/SMK">SMA / SMK</option>
              <option value="Panti Asuhan">Panti Asuhan</option>
              <option value="SLB/Khusus">SLB / Khusus</option>
            </select>

            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="rounded-xl border border-gray-300 px-3 py-2 text-xs focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="ALL">Semua Kecamatan</option>
              <option value="Menteng">Kec. Menteng</option>
              <option value="Gambir">Kec. Gambir</option>
              <option value="Senen">Kec. Senen</option>
              <option value="Cempaka">Kec. Cempaka Putih</option>
              <option value="Tanah Abang">Kec. Tanah Abang</option>
              <option value="Johar">Kec. Johar Baru</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === "TABLE" ? "MAP_CLUSTER" : "TABLE")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
                viewMode === "MAP_CLUSTER"
                  ? "bg-brand-50 border-brand-300 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300 dark:border-brand-500/30"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              }`}
            >
              <svg className="w-4 h-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              {viewMode === "MAP_CLUSTER" ? "Tutup Peta Klaster" : "Buka Peta Klaster & Rute"}
            </button>

            <Button
              onClick={handleOpenAdd}
              size="sm"
              className="bg-brand-600 hover:bg-brand-700 text-white font-semibold flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Tambah Titik Baru
            </Button>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-[11px] font-semibold uppercase text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <th className="pb-3 pl-2">Sekolah / Lembaga Sasaran</th>
                <th className="pb-3">Jenjang & Klaster</th>
                <th className="pb-3">Wilayah & Koordinat GPS</th>
                <th className="pb-3 text-center">Kuota Porsi (Harian)</th>
                <th className="pb-3">Jadwal Drop-off</th>
                <th className="pb-3">PIC Penanggung Jawab</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right pr-2">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
              {filteredPoints.map((point) => (
                <tr key={point.id} className="hover:bg-gray-50/60 dark:hover:bg-white/[0.01]">
                  <td className="py-3.5 pl-2 max-w-[220px]">
                    <p className="font-bold text-gray-900 dark:text-white">{point.name}</p>
                    <p className="text-[11px] font-mono text-gray-400 mt-0.5">NPSN: {point.npsn}</p>
                  </td>

                  <td className="py-3.5">
                    <div className="space-y-1">
                      <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                        {point.category}
                      </span>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">
                        {point.clusterRoute.split(" ")[0]} {point.clusterRoute.split(" ")[1]}
                      </p>
                    </div>
                  </td>

                  <td className="py-3.5 max-w-[200px]">
                    <p className="text-gray-800 dark:text-gray-200 font-medium truncate">{point.address}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${point.latitude},${point.longitude}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-mono text-brand-600 dark:text-brand-400 hover:underline"
                      >
                        <svg className="w-3 h-3 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {point.latitude.toFixed(4)}, {point.longitude.toFixed(4)} ↗
                      </a>
                    </div>
                  </td>

                  <td className="py-3.5 text-center">
                    <p className="text-sm font-bold text-brand-600 dark:text-brand-400">
                      {point.targetPortions.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Pagi: {point.morningPortions} • Siang: {point.noonPortions}
                    </p>
                  </td>

                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1 font-semibold text-gray-700 dark:text-gray-300">
                      <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {point.dropOffWindow}
                    </span>
                  </td>

                  <td className="py-3.5">
                    <p className="font-medium text-gray-800 dark:text-gray-200">{point.picName}</p>
                    <a
                      href={`https://wa.me/${point.picPhone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline font-mono"
                    >
                      <span>WA: {point.picPhone}</span>
                    </a>
                  </td>

                  <td className="py-3.5">
                    {point.status === "ACTIVE" ? (
                      <Badge color="success">Aktif</Badge>
                    ) : point.status === "VERIFYING" ? (
                      <Badge color="warning">Verifikasi</Badge>
                    ) : (
                      <Badge color="light">Nonaktif</Badge>
                    )}
                  </td>

                  <td className="py-3.5 text-right pr-2">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(point)}
                        title="Edit Data Titik"
                        className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-brand-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(point.id)}
                        title="Hapus Titik"
                        className="rounded-lg p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

      {/* Modal Tambah / Edit Titik */}
      <DistributionPointModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePoint}
        initialData={editingPoint}
      />
    </div>
  );
};

export default DistributionPointsTable;
