# Master Checklist & Progress Review ERP MBG

Dokumen ini memuat daftar periksa (*checklist*) komprehensif seluruh modul, fitur, dan infrastruktur sistem **ERP Manajemen Makanan Bergizi Gratis (MBG)** beserta status perkembangan terkini.

---

## 📊 Status Progres Ringkas

- **UI/UX Foundation & Layout (`projectweb`):** ✅ Selesai (100%)
- **Struktur Rute & Layout Submodul:** ✅ Selesai (100% - Bebas 404)
- **Komponen Dashboard & Analisis Visual:** 🟡 Berjalan (40%)
- **Form Interaktif & Data Table Modul:** ⚪ Menunggu Pengerjaan
- **Backend (NestJS + Prisma + PostgreSQL):** ⚪ Menunggu Pengerjaan
- **Kepatuhan Standar ISO & Audit Trail:** 🟡 Parsial (Layout & Widget Siap)

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
- [ ] **[TODO]** Tabel Data Supplier dengan filter status (Pending, Approved, Rejected).
- [ ] **[TODO]** Form Registrasi Vendor & Upload Dokumen Legal (NIB, NPWP, Sertifikat Halal).
- [ ] **[TODO]** Verifikasi Kepatuhan Sertifikasi (Masa berlaku ISO 22000, ISO 9001, BPOM).
- [ ] **[TODO]** UI Katalog Produk & Manajemen Harga Dasar per Satuan (kg, liter, pcs).
- [ ] **[TODO]** Kartu Evaluasi & Rating Performa Pengiriman Vendor.

---

### 🏬 Modul 2: Gudang & Inventory (`04_MODULE_INVENTORY_MGMT.md`)
- [x] Layout & Rute Halaman Inventory (`/inventory`, `/movements`, `/cold-chain`, `/alerts`).
- [ ] **[TODO]** Tabel Master Stok Gudang (Kategori: Protein, Karbohidrat, Sayur, Buah).
- [ ] **[TODO]** Form Mutasi Stok (Penerimaan Barang Masuk `IN`, Pengeluaran Dapur `OUT`, Penyesuaian `ADJUST`).
- [ ] **[TODO]** Pelacakan Batch / Lot Number & Tanggal Kadaluarsa (*Expiry Date Tracker*).
- [ ] **[TODO]** Monitoring Telemetri Suhu Cold Chain (-18°C s/d 4°C) dengan grafik & log.
- [ ] **[TODO]** Sistem Peringatan Dini Stok Rendah (*Low Stock Early Warning*).

---

### 🥗 Modul 3: Menu & Nutrisi (`05_MODULE_MENU_&_NUTRISI.md`)
- [x] Layout & Rute Halaman Menu (`/menu`, `/recipes`, `/cost-analysis`).
- [x] Widget Ringkasan Kepatuhan AKG Kemenkes (Kalori, Protein, Karbohidrat, Serat).
- [ ] **[TODO]** Kalender Perencanaan Siklus Menu Harian & Mingguan MBG.
- [ ] **[TODO]** Form Resep Interaktif (Komposisi bahan baku per porsi).
- [ ] **[TODO]** Kalkulator Otomatis Makronutrisi & Validasi Batas Minimal Gizi.
- [ ] **[TODO]** Kalkulator Harga Pokok Porsi (HPP / *Cost per Portion*) real-time vs batas anggaran.

---

### 🚚 Modul 4: Logistik & Distribusi (`06_MODULE_LOGISTIK_DISTRIBUSI.md`)
- [x] Layout & Rute Halaman Logistik (`/distribution-points`, `/shipments`, `/proof-of-delivery`).
- [x] Tabel Stream Pengiriman Terkini di Dashboard Utama.
- [ ] **[TODO]** Database Master Titik Distribusi (Sekolah/Panti) dengan Koordinat Geolokasi (Lat/Lng).
- [ ] **[TODO]** Form Pembuatan Resi Surat Jalan & Alur Status (`PENDING` $\rightarrow$ `SHIPPED` $\rightarrow$ `DELIVERED`).
- [ ] **[TODO]** Halaman Proof of Delivery (PoD) dengan Upload Foto Serah Terima & Kanvas Tanda Tangan Digital.

---

### 🍳 Modul 5: Manajemen Aset Tetap (`12_MODULE_ASSET_MGMT.md`)
- [x] Layout & Rute Halaman Aset (`/assets`, `/maintenance`, `/hygiene-inspections`).
- [ ] **[TODO]** Master Data Aset (Peralatan Masak Komersial, Armada Mobil Pendingin, Alat Elektronik).
- [ ] **[TODO]** Generator & Cetak Label QR Code untuk Identifikasi Fisik Aset.
- [ ] **[TODO]** Jadwal Servis Berkala & Log Riwayat Perbaikan / Penggantian Suku Cadang.
- [ ] **[TODO]** Formulir Checklist Inspeksi Higienitas & Sanitasi Alat Masak Harian (ISO 22000).
- [ ] **[TODO]** Kalkulator Penyusutan Nilai Aset (Depresiasi).

---

### 💰 Modul 6: Finansial & Anggaran (`07_MODULE_FINANSIAL_&_BUDGET.md`)
- [x] Layout & Rute Halaman Finansial (`/finance/budgets`, `/finance/expenditures`, `/finance/payments`).
- [ ] **[TODO]** Tabel Alokasi Anggaran per Wilayah/Kabupaten dan Sisa Pagu Dana.
- [ ] **[TODO]** Form Pencatatan Biaya Operasional (BBM, Dapur) & Pembelian Bahan dengan Upload Bukti/Kwitansi.
- [ ] **[TODO]** Monitoring Pembayaran Faktur Supplier (Pending, Paid, Overdue) & Rekonsiliasi.

---

### 🛡️ Modul 7: Kualitas, ISO & Audit Trail (`10_AUDIT_TRAIL_MGMT.md` & `11_ISO_COMPLIANCE_&_QUALITY.md`)
- [x] Layout & Rute Halaman Kepatuhan (`/compliance/audit-logs`, `/compliance/iso-standards`, `/compliance/incident-reports`).
- [ ] **[TODO]** Tampilan Audit Trail Log Viewer (Immutable) dengan Diff Nilai Lama vs Baru (JSON Viewer).
- [ ] **[TODO]** Matriks Monitoring Sertifikasi Kepatuhan ISO (ISO 22000, ISO 9001, ISO 27001).
- [ ] **[TODO]** Form Pelaporan Insiden Mutu & Tindakan Perbaikan (CAPA - *Corrective and Preventive Action*).

---

### ⚙️ Modul 8: Pengguna, Keamanan (RBAC) & Backend (`01_TECH_STACK_&_INFRA.md` & `02_DATABASE_SCHEMA.md`)
- [x] Layout & Rute Manajemen Pengguna (`/settings/users`, `/profile`).
- [ ] **[TODO]** Manajemen Pengguna berbasis Peran (ADMIN_PUSAT, ADMIN_REGIONAL, SUPPLIER, PENGELOLA).
- [ ] **[TODO]** Setup Backend NestJS + Prisma ORM + PostgreSQL Schema Migration.
- [ ] **[TODO]** Integrasi TanStack Query (React Query) antara Frontend & REST API Backend.

---

## 🎯 Pilihan Prioritas untuk Task Selanjutnya

1. **Opsi A: Modul Supplier & Vendor Management (Frontend UI Lengkap)**
   - Form registrasi vendor, tabel daftar supplier terverifikasi, form upload dokumen ISO/BPOM/Halal, dan katalog produk.
2. **Opsi B: Modul Gudang, Stok & Cold Chain Monitoring**
   - Tabel stok bahan baku per kategori, form mutasi IN/OUT/ADJUST, dan monitoring suhu Cold Chain.
3. **Opsi C: Modul Perencanaan Menu & Kalkulator Gizi AKG**
   - Recipe builder interaktif, kalkulator otomatis kalori/nutrisi vs AKG Kemenkes, dan kalkulator biaya per porsi (HPP).
4. **Opsi D: Setup Database Schema & Backend NestJS (Prisma + PostgreSQL)**
   - Inisialisasi layer backend, skema relasi database lengkap, dan REST API authentication & CRUD.
