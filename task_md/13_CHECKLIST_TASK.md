# Master Checklist & Progress Review ERP MBG

Dokumen ini memuat daftar periksa (*checklist*) komprehensif seluruh modul, fitur, dan infrastruktur sistem **ERP Manajemen Makanan Bergizi Gratis (MBG)** beserta status perkembangan terkini.

---

## 📊 Status Progres Ringkas

- **UI/UX Foundation & Layout (`projectweb`):** ✅ Selesai (100%)
- **Struktur Rute & Layout Submodul:** ✅ Selesai (100% - Bebas 404)
- **Modul 1: Supplier & Vendor Management:** ✅ Selesai (100% - UI & Interaktif)
- **Modul 2: Gudang, Stok & Cold Chain:** ✅ Selesai (100% - UI & Telemetri)
- **Modul 3: Menu, Resep & Nutrisi AKG:** ✅ Selesai (100% - UI & Kalkulator)
- **Modul Dapur: Dashboard Dapur Sentral SPPG:** ✅ Selesai (100% - UI, Lini Masak, Telemetri CCP & Organoleptik)
- **Modul 4: Logistik & Distribusi:** ✅ Selesai (100% - UI & Live Tracking)
- **Modul 5: Manajemen Aset Tetap:** ✅ Selesai (100% - UI & QR Label)
- **Modul 6: Finansial & Anggaran:** ✅ Selesai (100% - UI & Rekonsiliasi)
- **Modul 7: Kualitas, ISO & Audit Trail:** ✅ Selesai (100% - UI & CAPA Form)
- **Modul 8: SDM, Tenaga Kerja & Payroll:** ✅ Selesai (100% - UI, Shift, MCU & Slip Gaji)
- **Modul 9: Pengguna & Sistem (RBAC):** ✅ Selesai (100% - UI, RBAC Matrix, Session & Cetak SK)
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

### 🍳 Modul Dashboard Dapur Sentral SPPG MBG (`/dashboard/kitchen`)
- [x] Layout & Rute Dashboard Dapur Sentral SPPG (`KitchenOverviewDashboard.tsx` & `/dashboard/kitchen`).
- [x] **Monitoring Real-time Lini Masak & Batch Produksi (`UpdateProductionBatchModal.tsx`):** Pantau Lini 1 (Karbohidrat), Lini 2 (Protein Hewani), Lini 3 (Sayuran Segar), Lini 4 (Protein Nabati), dan Lini 5 (Packaging & Sealing Tray), kapasitas output porsi, dan countdown waktu muat armada (Departure Lock).
- [x] **Sensor Telemetri CCP HACCP Suhu Masak ISO 22000:** Kontrol Suhu Inti Masak (≥ 75°C), Hot Holding Warmer (≥ 60°C), Chiller Bahan Segar (1°C - 4°C), dan Steam Sanitizer Ompreng (≥ 100°C).
- [x] **Formulir Uji Organoleptik & Quality Release Ahli Gizi (`OrganolepticQualityModal.tsx`):** Uji 4 pilar sensorik (Rasa, Aroma, Tekstur, Penampilan Visual), verifikasi Sampel Retensi 2x24 Jam di kulkas QC `CH-RET-01`, dan **Kanvas Tanda Tangan Digital Ahli Gizi PIC**.
- [x] **Cetak Surat Perintah Masak (SPM) / Work Order SPPG Resmi (`KitchenSpkPrintModal.tsx`):** Rincian menu MBG, komposisi takaran bahan baku, jadwal timeline produksi, serta tanda tangan resmi Kepala SPPG & Head Chef.
- [x] **Voucher Permintaan Tambahan Bahan Baku ke Gudang (`KitchenRequisitionModal.tsx`):** Kitchen Ingredient Requisition Slip darurat dengan tingkat urgensi (Normal, Urgent, Kritis) dan notifikasi instan.
- [x] **Kitchen Brigade & Health Gatekeeper Check:** Struktur tim shift dapur (Head Chef, Sous Chef, Ahli Gizi, Helper & Packaging) dengan skrining presensi higiene 100% lulus suhu <37.3°C dan APD steril lengkap.

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
- [x] Layout & Rute Halaman Finansial (`/finance/budgets`, `/finance/expenditures`, `/finance/payments`, `/finance/kitchen`, `/finance/reports`).
- [x] **Pusat Laporan Keuangan Terpadu & Akuntabilitas BPK/BGN (`ComprehensiveFinancialReports.tsx` & `OfficialFinancialReportPrintModal.tsx`):** Pelaporan keuangan terpadu 6 pilar berstandar SAP Akrual (Laporan Realisasi Anggaran LRA, Laporan Operasional LO/Laba Rugi, Neraca Keuangan Posisi Aset/Kewajiban, Laporan Arus Kas LAK, Analisis Unit Cost HPP per Porsi, dan Kepatuhan Setoran Pajak NTPN PPh 22/23/PPN 11%), grafik tren penyerapan bulanan & komposisi 4 pos belanja BGN, ekspor data CSV/Excel, serta cetak dokumen resmi Laporan Keuangan ber-QR Code integritas & tanda tangan digital KPA, PPK, dan Bendahara.
- [x] **Dashboard Finansial & Biaya Operasional Dapur Sentral SPPG (`KitchenFinancialDashboard.tsx`, `KitchenExpenseRecordModal.tsx`, `KitchenCostAnalysisModal.tsx`, & `KitchenFinancialReportPrintModal.tsx`):** Pusat kendali Kepala MBG / Kepala SPPG untuk memantau HPP riil per porsi vs pagu BGN (Rp 15.000), breakdown struktur 5 komponen biaya, telemetri biaya energi utilitas (LPG 50kg, listrik cold chain, air RO), buku kas kecil (petty cash) dapur, simulasi What-If skenario biaya, dan cetak Laporan Pertanggungjawaban Finansial SPPG resmi ber-QR Code.
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

### 👥 Modul 8: SDM, Tenaga Kerja & Payroll (`14_MODULE_HR_EMPLOYEE_MGMT.md`)
- [x] Layout & Rute Halaman Karyawan (`/employees`, `/employees/shifts`, `/employees/payroll`, `/employees/certifications`).
- [x] **Master Data Karyawan & ID Card MBG (`EmployeeRegistryTable.tsx`, `EmployeeRegistrationModal.tsx`, `EmployeeDetailModal.tsx`, & `EmployeeIdCardPrintModal.tsx`):** Direktori tenaga kerja dapur SPPG, ahli gizi, helper, driver & QC, status legalitas BPJS & bank, kelaikan food handler, serta generator cetak ID Card resmi ber-QR Code.
- [x] **Penjadwalan Shift & Presensi Higiene Harian (`ShiftScheduleManager.tsx`, `CreateShiftModal.tsx`, `DailyAttendanceModal.tsx`, & `ShiftSchedulePrintModal.tsx`):** Manajemen 3 shift dapur sentral (02:00-07:00, 05:00-11:00, 09:00-16:00), health gatekeeper harian (skrining suhu <37.3°C & bebas luka/gejala sakit sebelum masuk dapur steril), dan cetak jadwal tugas mingguan resmi.
- [x] **Penggajian (Payroll) & Insentif Kerja Dapur (`PayrollManagement.tsx`, `ProcessPayrollModal.tsx`, `PayrollDetailModal.tsx`, & `PayrollSlipPrintModal.tsx`):** Perhitungan gaji pokok, tunjangan higiene, insentif porsi MBG, potongan BPJS & PPh 21, alur otorisasi SPJ/PPK, dan cetak slip gaji resmi berstempel digital.
- [x] **Matriks Sertifikasi Food Handler & Rekam MCU ISO 22000 (`CertificationMcuMatrix.tsx`, `AddCertificationModal.tsx`, `CertificationDetailModal.tsx`, & `FoodHandlerCompliancePrintModal.tsx`):** Pelacak masa berlaku sertifikat Higiene Kemenkes RI, swab lab bebas TBC/Typhoid/Hepatitis A, countdown kedaluwarsa, dan cetak Berita Acara Kelaikan Higiene Tenaga Kerja Dapur.

---

### ⚙️ Modul 9: Pengguna, Keamanan (RBAC) & Sistem (`01_TECH_STACK_&_INFRA.md` & `02_DATABASE_SCHEMA.md`)
- [x] Layout & Rute Manajemen Pengguna (`/settings/users`, `/profile`).
- [x] **Tabel Master Pengguna & Kredensial Sistem (`UserManagementTable.tsx`):** Manajemen 10 peran pengguna (ADMIN_PUSAT, ADMIN_REGIONAL, KEPALA_SPPG, AHLI_GIZI, INSPEKTUR_MUTU_QC, BENDAHARA_PPK, TIM_LOGISTIK_DRIVER, PETUGAS_GUDANG, SUPPLIER_VENDOR, AUDITOR_EKSTERNAL), tracking 2FA TOTP ISO 27001, status akun, IP/lokasi login terakhir, dan quick status toggle.
- [x] **Form Registrasi & Edit Pengguna (`UserFormModal.tsx`):** Form pembuatan akun baru dengan generator password acak yang aman, penugasan wilayah/SPPG, konfigurasi kewajiban 2FA, dan tanggal kedaluwarsa akun.
- [x] **Matriks Hak Akses Granular / RBAC Matrix (`RolePermissionMatrixModal.tsx`):** Konfigurasi izin 7 aksi (Read, Create, Update, Delete, Approve, Export, Print) lintas 9 modul ERP MBG berprinsip *Least Privilege*.
- [x] **Monitoring Sesi Login & Keamanan ISO 27001 (`UserSecuritySessionsModal.tsx`):** Manajemen multi-sesi token aktif, fitur putuskan sesi (kick/revoke session), riwayat event login/2FA, proteksi brute-force, dan reset counter kegagalan.
- [x] **Profil Rincian Pengguna & Wewenang (`UserDetailModal.tsx`):** Viewer komprehensif identitas pegawai, unit penugasan, status keamanan, dan pintasan konfigurasi wewenang.
- [x] **Cetak Surat Keputusan Otorisasi Hak Akses Sistem Resmi (`UserAccessReportPrintModal.tsx`):** Generator SK Otorisasi RBAC berstandar ISO 27001 lengkap dengan kop BGN, matriks izin, QR Code SHA-256, dan tanda tangan digital CISO & Pegawai.

---

## 🎯 Pilihan Prioritas untuk Task Selanjutnya

1. **Opsi 1: Setup Backend Architecture (NestJS + Prisma ORM + PostgreSQL)**
   - Desain skema `schema.prisma` terpadu mencakup 10 domain entity (Users, Roles, Suppliers, Inventory, Recipes, Shipments, Assets, Budgets, AuditLogs, Employees) dengan Prisma Studio dan seed data komprehensif.
2. **Opsi 2: Integrasi REST API & State Management TanStack Query**
   - Implementasi endpoint REST API CRUD terproteksi JWT Bearer & RBAC Guard, menghubungkan UI frontend ke PostgreSQL secara real-time.

