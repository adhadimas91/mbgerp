# ERP MBG Enterprise Backend API Service (`projectapi`)

Layanan Backend REST API Enterprise untuk **Sistem ERP Manajemen Makanan Bergizi Gratis (MBG) Nasional** yang dikembangkan untuk Badan Gizi Nasional (BGN).

---

## 🚀 Quick Start

### 1. Prasyarat Sistem
- **Node.js**: v20+ atau v24+
- **PostgreSQL**: v15+ atau v16+
- **NPM**: v10+ atau v11+

### 2. Instalasi Dependensi
```bash
cd projectapi
npm install
```

### 3. Konfigurasi Environment (`.env`)
Salin berkas `.env.example` ke `.env`:
```env
PORT=4000
API_PREFIX=/api/v1
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mbgerp_db?schema=public"
JWT_SECRET=super_secret_mbg_jwt_key_2026_production_grade_bgn
JWT_EXPIRES_IN=7d
CORS_ORIGIN="http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000"
```

### 4. Setup Database & Seeder
```bash
# Generate Prisma Client
npm run prisma:generate

# Migrasi Schema PostgreSQL
npm run prisma:migrate

# Seed Data Riil BGN
npm run prisma:seed
```

### 5. Menjalankan Server API
```bash
# Mode Development (Watch)
npm run start:dev

# Mode Production
npm run build
npm run start:prod
```

API Server akan aktif di: `http://localhost:4000/api/v1`  
Swagger API Docs: `http://localhost:4000/api/docs`

---

## 🧪 Panduan Pengujian API

### Menjalankan Automated Test Runner
```bash
npm run test:api
```

### Menggunakan VS Code REST Client
Buka file [`api-test.http`](file:///d:/dev2026/mbgerp/projectapi/api-test.http) dan klik `Send Request`.

---

## 📦 Ringkasan 12 Modul REST API

| Prefix Rute | Modul | Fungsi Utama |
|:---|:---|:---|
| `/api/v1/health` | System Health | Liveness, Uptime & Status Koneksi DB |
| `/api/v1/auth` | Autentikasi | Login JWT & Profil Pengguna |
| `/api/v1/users` | Pengguna & RBAC | Direktori Staf & Matriks Peran BGN |
| `/api/v1/suppliers` | Vendor & Supplier | Legalitas, HAP Bapanas & Rating Mutu |
| `/api/v1/inventory` | Gudang & Stok | Mutasi IN/OUT & Sensor Suhu Cold Chain |
| `/api/v1/menu` | Menu & Nutrisi | Resep Gizi AKG & Analisis HPP Porsi |
| `/api/v1/kitchen` | Dapur Sentral SPPG | Lini Masak, Kontrol CCP & Organoleptik |
| `/api/v1/logistics` | Logistik & Armada | Sekolah Sasaran, Resi Waybill & PoD |
| `/api/v1/assets` | Manajemen Aset | Inventaris Alat Dapur & Audit Sanitasi |
| `/api/v1/finance` | Finansial & Budget | Pagu DPA, Kuitansi BKK & SP2D |
| `/api/v1/compliance` | Audit & Mutu ISO | Audit Trail SHA-256 & Laporan CAPA |
| `/api/v1/employees` | SDM & Karyawan | Shift Dapur, Presensi Steril & Slip Gaji |

---

## 🛡️ Standar Kepatuhan
- **ISO 22000:2018**: Food Safety Management System (HACCP CCP Telemetry & Retensi Sampel 2x24 Jam).
- **ISO 9001:2015**: Quality Management System & Standar Operasional Prosedur (SOP).
- **ISO 27001:2022**: Information Security Management (RBAC Least Privilege & Immutable Audit Logs).
- **HAS 23000**: Standar Jaminan Produk Halal (BPJPH Kemenag RI).
