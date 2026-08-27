# Master Checklist & Progress Review ERP MBG

Dokumen ini memuat daftar periksa (*checklist*) komprehensif seluruh modul, fitur, dan infrastruktur sistem **ERP Manajemen Makanan Bergizi Gratis (MBG)** beserta status perkembangan terkini.

---

## 📊 Status Progres Ringkas

- **UI/UX Foundation & Layout (`projectweb`):** ✅ Selesai (100%)
- **Struktur Rute & Layout Submodul:** ✅ Selesai (100% - Bebas 404)
- **Modul 1: Supplier & Vendor Management:** ✅ Selesai (100% - UI & Interaktif)
- **Modul 2: Gudang, Stok & Cold Chain:** ✅ Selesai (100% - UI & Telemetri)
- **Modul 3: Menu, Resep & Nutrisi AKG:** ✅ Selesai (100% - UI & Kalkulator)
- **Modul 4: Logistik & Distribusi:** ✅ Selesai (100% - UI & Live Tracking)
- **Modul 5: Manajemen Aset Tetap:** ✅ Selesai (100% - UI & QR Label)
- **Modul 6: Finansial & Anggaran:** ✅ Selesai (100% - UI & Rekonsiliasi)
- **Modul 7: Kualitas, ISO & Audit Trail:** 🟡 Parsial (Layout Siap)
- **Backend (NestJS + Prisma + PostgreSQL):** ⚪ Menunggu Fase Integrasi

---

## 📋 Checklist Lengkap Modul & Task

### 🏗️ Fase 0: Setup Proyek & Arsitektur Frontend UI
- [x] Inisialisasi folder mandiri `projectweb` berbasis Next.js 16 + React 19 + Tailwind CSS v4.
- [x] Folder `uiweb` dipertahankan 100% utuh sebagai acuan desain murni.
- [x] Desain dan integrasi aset Logo ERP MBG (Light, Dark, dan Icon mode).
- [x] Kustomisasi navigasi sidebar `AppSidebar.tsx` untuk 9 modul ERP MBG.
- [x] Kustomisasi header `AppHeader.tsx` dengan pencarian cepat (`Ctrl+K`) & badge Admin Pusat.
- [x] Pembuatan widget status kepatuhan ISO 22000, 9001, 27001 di sidebar.
- [x] Pembuatan layout standar submodul `ModulePageLayout.tsx`.
- [x] Pembuatan 26 halaman rute submodul (bebas dari error 404).
- [x] Dashboard Monitoring Utama dengan KPI MBG, Live Delivery Stream, dan Gauge AKG Nutrisi.
- [x] Sinkronisasi commit awal ke Git repository (`main`).

---

### 📦 Modul 1: Supplier & Vendor Management (`03_MODULE_SUPPLIER_MGMT.md`)
- [x] Layout & Rute Halaman Supplier (`/suppliers`, `/verification`, `/catalog`, `/performance`).
- [x] **Tabel Data Supplier Master (`SupplierTable.tsx`):** Filter status (Approved, Pending, Rejected), filter kategori komoditas, pencarian instan, dan rating bintang.
- [x] **Form Registrasi Vendor (`SupplierRegistrationModal.tsx`):** NIB, NPWP, legalitas usaha, kapasitas suplai harian, dan upload dokumen sertifikat.
- [x] **Verifikasi Kepatuhan ISO & Sertifikasi (`SupplierVerificationQueue.tsx`):** Antrean audit dokumen (NIB, Halal, ISO 22000, BPOM), indikator expiry date, dan modal persetujuan/revisi dengan CAPA.
- [x] **Katalog Produk & Analisis Harga (`SupplierCatalogGrid.tsx`):** Harga satuan bahan pangan vs Harga Acuan Pemerintah (HAP Badan Pangan Nasional) & kuota mingguan.
- [x] **Evaluasi & Rating Performa Vendor (`SupplierPerformanceScorecard.tsx`):** KPI On-Time Delivery Rate, Quality Acceptance Rate, Skor ISO 22000, dan Leaderboard Platinum/Gold.

---

### 🏬 Modul 2: Gudang & Inventory (`04_MODULE_INVENTORY_MGMT.md`)
- [x] Layout & Rute Halaman Inventory (`/inventory`, `/movements`, `/cold-chain`, `/alerts`).
- [x] **Tabel Master Stok Bahan Baku (`InventoryTable.tsx`):** Klasifikasi Cold Storage (-18°C ~ 4°C) vs Dry Storage, level stok aman/menipis/kritis terhadap buffer, dan tracking Batch/Lot.
- [x] **Form Mutasi Stok Masuk & Keluar (`StockMovementModal.tsx`):** Penerimaan PO `IN`, pengeluaran masak `OUT`, penyesuaian `ADJUST`, pencatatan suhu terima, dan tanggal kadaluarsa.
- [x] **Telemetri Suhu Cold Chain Real-time (`ColdChainTelemetry.tsx`):** Widget sensor IoT ruang pendingin/freezer, batas ambang ISO 22000, dan grafik tren suhu 24 jam dengan ApexCharts.
- [x] **Sistem Peringatan Dini Stok & Kadaluarsa (`LowStockAlerts.tsx`):** Early Warning Reorder Point, countdown kedaluwarsa (< 7 hari) untuk alur masak FIFO, dan generator PO Darurat.

---

### 🥗 Modul 3: Menu & Nutrisi (`05_MODULE_MENU_&_NUTRISI.md`)
- [x] Layout & Rute Halaman Menu (`/menu`, `/recipes`, `/cost-analysis`).
- [x] Widget Ringkasan Kepatuhan AKG Kemenkes (Kalori, Protein, Karbohidrat, Serat).
- [x] **Kalender Perencanaan Siklus Menu Harian & Mingguan (`MenuPlannerCalendar.tsx`):** Siklus menu harian (Senin s/d Jumat) per kelompok umur, target porsi, rincian 4 Sehat 5 Sempurna, dan persetujuan Ahli Gizi.
- [x] **Form Resep Interaktif & Kalkulator Makronutrisi (`RecipeBuilder.tsx`):** Form racik komposisi takaran gram/ml per porsi, perhitungan instan Kalori, Protein, Karbohidrat, Lemak, Serat, dan validasi standar AKG Kemenkes RI.
- [x] **Kalkulator Harga Pokok Porsi & Simulator Anggaran (`MenuCostAnalysis.tsx`):** Breakdown detail struktur biaya per porsi, evaluasi deviasi terhadap pagu nasional (Rp 15.000), dan simulator kebutuhan anggaran bulanan makro.

---

### 🚚 Modul 4: Logistik & Distribusi (`06_MODULE_LOGISTIK_DISTRIBUSI.md`)
- [x] Layout & Rute Halaman Logistik (`/distribution-points`, `/shipments`, `/proof-of-delivery`).
- [x] Tabel Stream Pengiriman Terkini di Dashboard Utama.
- [x] **Database Master Titik Distribusi & Optimasi Rute Klaster (`DistributionPointsTable.tsx` & `DistributionRouteMap.tsx`):** Registrasi sekolah/panti, koordinat Lat/Lng, kuota porsi harian, kontak PIC, preferensi drop-off, dan simulator visual klaster rute pengantaran dapur sentral (SPPG Harmoni).
- [x] **Manajemen Surat Jalan & Tracking Armada Real-time (`ShipmentManagement.tsx`, `CreateShipmentModal.tsx`, `LiveTrackingModal.tsx`, & `ShipmentWaybillPrintModal.tsx`):** Generator surat jalan resi waybill, penugasan driver, pemantauan suhu muat termal (> 60°C ISO 22000), live GPS timeline 5 tahap, dan cetak dokumen resmi Surat Jalan BAST MBG.
- [x] **Verifikasi Bukti Penerimaan / Proof of Delivery (`ProofOfDeliveryViewer.tsx`, `PodSubmissionModal.tsx`, & `PodDetailModal.tsx`):** Form verifikasi penerimaan porsi, ceklis uji organoleptik, upload foto dokumentasi, **Kanvas Interaktif Tanda Tangan Digital (Signature Pad)**, dan Geotagging GPS presisi.

---

### 🍳 Modul 5: Manajemen Aset Tetap (`12_MODULE_ASSET_MGMT.md`)
- [x] Layout & Rute Halaman Aset (`/assets`, `/maintenance`, `/hygiene-inspections`).
- [x] **Master Data Aset & Generator Label QR Code (`AssetRegistryTable.tsx`, `AssetRegistrationModal.tsx`, `AssetDetailModal.tsx`, & `AssetQrPrintModal.tsx`):** Database aset dapur & armada, perhitungan depresiasi garis lurus (Straight-line Depreciation), filter kondisi/status, dan generator preview cetak stiker label QR Code barcode MBG.
- [x] **Jadwal Servis Berkala & Riwayat Perbaikan Armada / Mesin Dapur (`AssetMaintenanceSchedule.tsx`, `CreateMaintenanceModal.tsx`, & `MaintenanceDetailModal.tsx`):** Manajemen Work Order pemeliharaan (Preventive Service vs Corrective Repair), pelacak suku cadang & estimasi biaya perbaikan, serta log histori kalibrasi alat.
- [x] **Formulir Checklist Inspeksi Higienitas Alat Masak Harian ISO 22000 (`HygieneInspectionsAudit.tsx`, `NewHygieneInspectionModal.tsx`, & `HygieneInspectionDetailModal.tsx`):** 8 kriteria audit sanitasi alat ISO 22000/HACCP, kalkulator skor mutu instan (Grade A/B/C), formulir CAPA temuan audit, dan **Kanvas Tanda Tangan Digital Lead Auditor**.

---

### 💰 Modul 6: Finansial & Anggaran (`07_MODULE_FINANSIAL_&_BUDGET.md`)
- [x] Layout & Rute Halaman Finansial (`/finance/budgets`, `/finance/expenditures`, `/finance/payments`).
- [x] **Alokasi Anggaran per Wilayah & Monitoring Realisasi DPA (`BudgetManagement.tsx`, `CreateBudgetModal.tsx`, `BudgetDetailModal.tsx`, & `BudgetReportPrintModal.tsx`):** Plafon pagu DPA per kabupaten/kota, rincian pos belanja standar BGN (Bahan Baku 75%, Operasional 15%, Logistik 8%, Mutu 2%), tracking serapan SP2D vs Komitmen PO, serta cetak dokumen resmi DPA & LRA.
- [x] **Pencatatan Biaya Operasional & Belanja Bahan Baku (`ExpenditureManagement.tsx`, `CreateExpenditureModal.tsx`, `ExpenditureDetailModal.tsx`, & `ExpenditureReceiptPrintModal.tsx`):** Pencatatan belanja multi-item, kalkulasi otomatis potongan PPh 22/23 dan PPN 11%, alur otorisasi SPJ PPK, dan cetak Kuitansi Resmi / Bukti Kas Keluar (BKK).
- [x] **Manajemen Pembayaran Supplier & Rekonsiliasi Bank (`PaymentManagement.tsx`, `ProcessPaymentModal.tsx`, `PaymentInvoiceDetailModal.tsx`, `BankReconciliationModal.tsx`, & `PaymentProofPrintModal.tsx`):** Validasi 3-Way Matching (PO ↔ BAST ↔ Faktur), eksekusi pembayaran SP2D transfer bank BUMN, rekonsiliasi mutasi rekening koran bank vs buku kas ERP, dan cetak Bank Payment Voucher (BPV).

---

### 🛡️ Modul 7: Kualitas, ISO & Audit Trail (`10_AUDIT_TRAIL_MGMT.md` & `11_ISO_COMPLIANCE_&_QUALITY.md`)
- [x] Layout & Rute Halaman Kepatuhan (`/compliance/audit-logs`, `/compliance/iso-standards`, `/compliance/incident-reports`).
- [x] **Tampilan Audit Trail Log Viewer (Immutable) dengan Diff Nilai Lama vs Baru (`AuditLogViewer.tsx`, `AuditLogDetailModal.tsx`, & `AuditReportPrintModal.tsx`):** Append-only stream log forensik audit BPK/Inspektorat, viewer JSONB diff perbandingan nilai lama vs baru secara visual, validasi integritas kriptografi SHA-256 rantai hash, filter multi-entitas, dan cetak dokumen resmi Laporan Hasil Audit Trail Sistem.
- [x] **Matriks Monitoring Sertifikasi Kepatuhan ISO & Halal (`IsoComplianceMatrix.tsx`, `AddCertificateModal.tsx`, `CertificateDetailModal.tsx`, & `IsoAuditReportPrintModal.tsx`):** Dashboard kepatuhan ISO 22000 (Food Safety/HACCP), ISO 9001:2015 (Mutu & SOP), ISO 27001:2022 (Keamanan Informasi & Log), Halal BPJPH (HAS 23000), pelacak jadwal surveillance audit KAN, dan cetak dokumen Matriks Kepatuhan Standar Mutu.
- [x] **Form Pelaporan Insiden Mutu & Tindakan Perbaikan CAPA (`IncidentReportManagement.tsx`, `CreateIncidentReportModal.tsx`, `IncidentDetailModal.tsx`, & `IncidentReportPrintModal.tsx`):** Pencatatan insiden mutu (anomali CCP suhu >60°C, kerusakan kemasan, ketidaksesuaian bahan baku), investigasi 5-Whys Root Cause Analysis (RCA), penetapan tindakan Corrective & Preventive Action (CAPA), **Kanvas Interaktif Tanda Tangan Digital Lead Auditor**, dan cetak Berita Acara Form LKTK / CAPA resmi MBG.

---

### ⚙️ Modul 8: Pengguna, Keamanan (RBAC) & Backend (`01_TECH_STACK_&_INFRA.md` & `02_DATABASE_SCHEMA.md`)
- [x] Layout & Rute Manajemen Pengguna (`/settings/users`, `/profile`).
- [ ] **[TODO]** Manajemen Pengguna berbasis Peran (ADMIN_PUSAT, ADMIN_REGIONAL, SUPPLIER, PENGELOLA).
- [ ] **[TODO]** Setup Backend NestJS + Prisma ORM + PostgreSQL Schema Migration.
- [ ] **[TODO]** Integrasi TanStack Query (React Query) antara Frontend & REST API Backend.

---

## 🎯 Pilihan Prioritas untuk Task Selanjutnya

1. **Opsi 1: Modul 4 (Logistik & Distribusi)**
   - Database master titik distribusi (Sekolah/Panti) dengan koordinat Lat/Lng, form pembuatan resi surat jalan pengiriman, dan halaman Proof of Delivery (PoD) dengan upload foto serah terima & tanda tangan digital.
2. **Opsi 2: Modul 5 (Manajemen Aset) & Modul 6 (Finansial & Anggaran)**
   - Generator label QR Code aset dapur/armada, jadwal servis armada pendingin, checklist higienitas alat dapur ISO 22000, dan monitoring pagu anggaran APBN/APBD.
3. **Opsi 3: Modul 7 (Audit Trail & Kepatuhan ISO) & Setup Database Backend NestJS**
   - Immutable audit log viewer dengan diff JSONB, form CAPA insiden mutu, skema database Prisma PostgreSQL, dan integrasi API.
