# Modul Backend API & Panduan Pengujian REST API ERP MBG

Dokumen ini memuat spesifikasi arsitektur backend, skema relasi database Prisma ORM, katalog endpoint REST API, mekanisme keamanan otorisasi RBAC & JWT, serta tata cara pengujian otomatis untuk sistem **ERP Manajemen Makanan Bergizi Gratis (MBG) Nasional**.

---

## 🏛️ 1. Arsitektur Backend (`projectapi`)

Sistem backend dibangun dengan pendekatan **Modular Enterprise Architecture** berbasis **NestJS**, **TypeScript**, dan **Prisma ORM** yang menghubungkan seluruh modul ke database relasional **PostgreSQL**.

### 📁 Struktur Direktori Backend
```
projectapi/
├── prisma/
│   ├── schema.prisma          # Skema PostgreSQL 10 Domain Entity
│   └── seed.ts                # Seeder Data Riil BGN (SPPG, Resep, Pagu DPA)
├── src/
│   ├── common/
│   │   ├── decorators/        # @Roles() RBAC Decorator
│   │   ├── filters/           # HttpExceptionFilter (Standard Error JSON)
│   │   ├── guards/            # RolesGuard & JWT Auth Guards
│   │   └── interceptors/      # TransformInterceptor (Standard Response Wrapper)
│   ├── modules/
│   │   ├── health/            # Liveness & DB connection check
│   │   ├── auth/              # JWT issuance, bcrypt password verification
│   │   ├── users/             # Master pengguna & wewenang RBAC
│   │   ├── suppliers/         # Vendor rekanan, sertifikasi & scorecard
│   │   ├── inventory/         # Master stok, mutasi & telemetri cold chain
│   │   ├── menu/              # Resep, standar gizi AKG & analisis biaya
│   │   ├── kitchen/           # Dapur sentral SPPG, batch & kontrol CCP
│   │   ├── logistics/         # Titik sekolah sasaran, armada & bukti terima PoD
│   │   ├── assets/            # Aset tetap dapur & inspeksi sanitasi ISO 22000
│   │   ├── finance/           # Realisasi DPA, BKK, faktur & SP2D
│   │   ├── compliance/        # Audit trail forensik BPK & matriks ISO
│   │   └── employees/         # SDM, shift presensi, MCU & payroll
│   ├── prisma/
│   │   ├── prisma.service.ts  # Singleton database lifecycle service
│   │   └── prisma.module.ts   # Global Prisma module
│   ├── app.module.ts          # Root application module
│   └── main.ts                # Bootstrap, Swagger OpenAPI, Global Pipes
├── scripts/
│   └── test-api.ts            # Automated test runner suite
├── api-test.http              # VS Code REST Client test collection
├── .env                       # Environment configuration
└── package.json
```

---

## 🗄️ 2. Skema Database Prisma (10 Domain Entity)

Skema database PostgreSQL pada [`projectapi/prisma/schema.prisma`](file:///d:/dev2026/mbgerp/projectapi/prisma/schema.prisma) mencakup:

| No | Domain Entity | Tabel Utama Prisma | Deskripsi & Cakupan Data |
|:---|:---|:---|:---|
| 1 | **Tata Kelola & RBAC** | `User`, `UserSession` | 10 Peran BGN, Multi-sesi token, pelacakan IP login & 2FA TOTP |
| 2 | **Supplier & Vendor** | `Supplier`, `SupplierCertificate`, `SupplierProduct`, `PurchaseOrder` | Kepatuhan ISO 22000/Halal BPJPH, HAP Bapanas, Scorecard KPI |
| 3 | **Gudang & Inventory** | `Warehouse`, `Product`, `Stock`, `StockMovement`, `ColdChainSensor`, `SensorReading` | Dry/Cold storage (-18°C ~ 4°C), ROP Buffer, Mutasi IN/OUT/ADJUST |
| 4 | **Menu & Nutrisi AKG** | `Recipe`, `RecipeIngredient`, `DailyMenu` | Formula resep, takaran gram/porsi, Makronutrisi (Kalori, Protein, Serat) |
| 5 | **Dapur SPPG & Produksi** | `KitchenUnit`, `ProductionBatch`, `CcpTelemetryLog`, `OrganolepticQc`, `KitchenRequisition` | Lini 1-5, Sensor CCP HACCP (≥75°C/≥60°C), Uji Sensorik & Retensi 2x24 Jam |
| 6 | **Logistik & Distribusi** | `DistributionPoint`, `DistributionRoute`, `FleetVehicle`, `Shipment`, `DeliveryProof` | GIS Lat/Lng sekolah, resi waybill, BAST & Tanda Tangan Digital PoD |
| 7 | **Manajemen Aset Tetap** | `FixedAsset`, `AssetMaintenance`, `HygieneInspection` | Depresiasi garis lurus, QR Code aset, Audit sanitasi mesin ISO 22000 |
| 8 | **Finansial & Anggaran** | `Budget`, `BudgetAllocation`, `Expenditure`, `SupplierInvoice`, `Payment`, `KitchenPettyCash` | Pagu DPA APBN, 4 Pos Belanja BGN, Kuitansi BKK, PPh 22/23/PPN 11%, SP2D |
| 9 | **Mutu, ISO & Audit** | `QualityIncident`, `AuditLog` | Audit Trail Forensik SHA-256 Chained Hash, Investigasi 5-Why RCA & CAPA |
| 10 | **SDM & Tenaga Kerja** | `Employee`, `ShiftSchedule`, `ShiftAssignment`, `DailyAttendance`, `PayrollRun`, `EmployeeMcu` | 3 Shift dapur, Health Gatekeeper (<37.3°C), MCU Bebas Typhoid/TBC, Payroll |

---

## 🌐 3. Katalog Endpoint REST API

Base URL API: `http://localhost:4000/api/v1`  
Dokumentasi Interaktif: `http://localhost:4000/api/docs` (Swagger UI)

### 🔹 3.1. System Health
- `GET /health` — Status liveness server, database connectivity, memori & uptime.

### 🔹 3.2. Authentication & Profile
- `POST /auth/login` — Login pengguna & penerbitan token JWT Bearer (7 hari).
- `GET /auth/profile` — Profil pengguna yang sedang aktif (Memerlukan Bearer Token).

### 🔹 3.3. Users & RBAC
- `GET /users` — Daftar seluruh pengguna sistem (Filter: `role`, `status`, `search`).
- `GET /users/:id` — Detail akun, unit penugasan & wewenang.

### 🔹 3.4. Supplier & Vendor
- `GET /suppliers` — Direktori supplier (Filter: `status`, `tier`, `search`).
- `GET /suppliers/scorecard` — Ringkasan performa On-Time Delivery & mutu ISO 22000.
- `GET /suppliers/:id` — Detail supplier, legalitas NIB/NPWP, produk & histori PO.

### 🔹 3.5. Gudang & Stok
- `GET /inventory/stocks` — Master data stok gudang & level buffer ROP.
- `GET /inventory/movements` — Histori mutasi bahan masuk/keluar.
- `GET /inventory/cold-chain` — Telemetri sensor IoT suhu cold storage.
- `GET /inventory/alerts` — Peringatan stok menipis & mendekati kadaluarsa (<7 hari).

### 🔹 3.6. Menu & Nutrisi AKG
- `GET /menu/recipes` — Katalog formula resep & standar makronutrisi.
- `GET /menu/recipes/:id` — Detail takaran bahan & instruksi masak.
- `GET /menu/daily-plans` — Kalender perencanaan siklus menu harian.
- `GET /menu/cost-analysis` — Analisis HPP biaya porsi terhadap pagu nasional Rp 15.000.

### 🔹 3.7. Dapur Sentral SPPG
- `GET /kitchen/units` — Direktori unit Sentra Produksi Pangan Gizi (SPPG).
- `GET /kitchen/batches` — Monitoring lini masak & batch produksi harian.
- `GET /kitchen/batches/:id` — Detail batch, log CCP HACCP & uji mutu organoleptik.
- `GET /kitchen/requisitions` — Voucher permintaan darurat bahan baku ke gudang.

### 🔹 3.8. Logistik & Distribusi
- `GET /logistics/distribution-points` — Master titik sekolah sasaran & koordinat GPS.
- `GET /logistics/shipments` — Status pengiriman makanan bergizi & resi waybill.
- `GET /logistics/shipments/:id` — Detail pengiriman, tracking timeline & bukti terima PoD.
- `GET /logistics/fleet` — Daftar armada kendaraan boks thermal berpendingin.

### 🔹 3.9. Manajemen Aset
- `GET /assets` — Master inventaris aset tetap dapur & armada.
- `GET /assets/maintenance` — Jadwal servis berkala & perbaikan mesin.
- `GET /assets/hygiene-inspections` — Log audit sanitasi kelaikan alat ISO 22000.

### 🔹 3.10. Finansial & Anggaran
- `GET /finance/overview` — Ringkasan eksekutif realisasi anggaran APBN BGN.
- `GET /finance/budgets` — Alokasi pagu DPA per wilayah & 4 pos belanja.
- `GET /finance/expenditures` — Pencatatan belanja, BKK & potongan pajak PPh/PPN.
- `GET /finance/invoices` — Tagihan supplier & validasi 3-Way Match.
- `GET /finance/payments` — Histori pencairan dana SP2D & voucher bank BPV.

### 🔹 3.11. Audit & Kepatuhan ISO
- `GET /compliance/audit-logs` — Stream audit trail forensik BPK (SHA-256 Chained Hash).
- `GET /compliance/incidents` — Daftar laporan anomali mutu & tindakan perbaikan CAPA.
- `GET /compliance/iso-overview` — Matriks kepatuhan standar ISO 22000, 9001, 27001 & Halal.

### 🔹 3.12. SDM & Karyawan
- `GET /employees` — Direktori tenaga kerja dapur SPPG & staf MBG.
- `GET /employees/shifts` — Jadwal shift kerja tim dapur sentral & presensi.
- `GET /employees/payroll` — Riwayat slip penggajian payroll bulanan.

---

## 🧪 4. Panduan Menjalankan Pengujian API

### A. Automated Test Runner (CLI)
Jalankan perintah berikut di folder `projectapi`:
```bash
npm run test:api
```
Script ini akan:
1. Menghubungi endpoint `/health` untuk memeriksa status server.
2. Melakukan otentikasi login `/auth/login` menggunakan kredensial default Admin Pusat (`admin_pusat` / `MbgAdmin2026!`).
3. Mengakuisisi token JWT Bearer dan menguji seluruh 30+ endpoint secara berurutan.
4. Menghitung latensi milidetik dan mencetak tabel hasil ringkasan status **PASS/FAIL**.

### B. Interactive Test via VS Code (`api-test.http`)
Buka file [`projectapi/api-test.http`](file:///d:/dev2026/mbgerp/projectapi/api-test.http) di VS Code dengan ekstensi **REST Client**:
1. Klik tautan **`Send Request`** pada blok login `POST {{baseUrl}}/auth/login`.
2. Token JWT akan tersimpan otomatis ke variabel `@authToken`.
3. Klik tautan **`Send Request`** pada endpoint mana pun untuk melihat respon JSON secara instan.

### C. Visual Testing via Swagger UI
Buka browser di URL:
```
http://localhost:4000/api/docs
```
1. Klik tombol hijau **Authorize** di kanan atas.
2. Masukkan token JWT yang didapat dari `/auth/login` dengan format: `Bearer <token>`.
3. Klik **Try it out** dan **Execute** pada endpoint yang diinginkan.

---

## 🛠️ 5. Panduan Database Seeding & Migration

Untuk menyinkronkan skema Prisma ke database PostgreSQL lokal dan mengisi data riil:

```bash
# 1. Validasi skema Prisma
npm run prisma:validate

# 2. Generate Prisma Client
npm run prisma:generate

# 3. Jalankan migrasi database
npm run prisma:migrate

# 4. Jalankan seeder data komprehensif
npm run prisma:seed

# 5. Buka Prisma Studio GUI
npm run prisma:studio
```
