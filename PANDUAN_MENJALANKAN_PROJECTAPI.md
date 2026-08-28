# 📘 Panduan Menjalankan Backend API (`projectapi`)
### ERP Manajemen Makanan Bergizi Gratis (MBG) Nasional — Badan Gizi Nasional (BGN)

Dokumen ini berisi panduan lengkap langkah demi langkah untuk melakukan instalasi, konfigurasi database, migrasi data seeder, dan menjalankan server backend **NestJS API (`projectapi`)**.

---

## 📋 Daftar Isi
1. [Prasyarat Sistem](#1-prasyarat-sistem)
2. [Menyalakan Database PostgreSQL](#2-menyalakan-database-postgresql)
   - [Opsi A: Menggunakan Docker Desktop (Paling Mudah)](#opsi-a-menggunakan-docker-desktop-direkomendasikan)
   - [Opsi B: Menggunakan PostgreSQL Lokal / Cloud](#opsi-b-menggunakan-postgresql-lokal--cloud)
3. [Konfigurasi Environment (.env)](#3-konfigurasi-environment-env)
4. [Instalasi Dependensi & Generate Prisma Client](#4-instalasi-dependensi--generate-prisma-client)
5. [Migrasi Database & Seeding Data](#5-migrasi-database--seeding-data)
6. [Menjalankan Server API](#6-menjalankan-server-api)
7. [Verifikasi API & Swagger Documentation](#7-verifikasi-api--swagger-documentation)
8. [Daftar Akun Login Dummy (BGN Seeder)](#8-daftar-akun-login-dummy-bgn-seeder)
9. [Solusi Masalah Umum (Troubleshooting)](#9-solusi-masalah-umum-troubleshooting)

---

## 1. Prasyarat Sistem

Pastikan perangkat Anda sudah terpasang:
- **Node.js**: versi `20.x` atau `22.x` / `24.x` (Cek: `node -v`)
- **NPM**: versi `10.x` atau `11.x` (Cek: `npm -v`)
- **Docker Desktop** (direkomendasikan untuk PostgreSQL) ATAU **PostgreSQL 15+/16+** lokal.

---

## 2. Menyalakan Database PostgreSQL

### Opsi A: Menggunakan Docker Desktop (Direkomendasikan)
Jika Anda memiliki **Docker Desktop**:
1. Buka aplikasi **Docker Desktop** dan tunggu hingga statusnya *Engine running*.
2. Di root proyek (`d:\dev2026\mbgerp`), jalankan perintah:
   ```bash
   docker compose up -d
   ```
   > File `docker-compose.yml` akan membuat container PostgreSQL otomatis dengan port `5432`, user `postgres`, password `postgres`, dan database `mbgerp_db`.

3. Untuk mengecek apakah container sudah aktif:
   ```bash
   docker ps
   ```

### Opsi B: Menggunakan PostgreSQL Lokal / Cloud
Jika Anda menggunakan PostgreSQL yang terpasang di Windows (via installer EDB/Postgres app) atau database cloud (seperti Supabase / Neon / AWS RDS):
1. Pastikan service PostgreSQL sudah berjalan di Windows Services.
2. Buat database baru bernama `mbgerp_db` (misalnya via pgAdmin / DBeaver / psql):
   ```sql
   CREATE DATABASE mbgerp_db;
   ```

---

## 3. Konfigurasi Environment (`.env`)

Buka atau buat file [`.env`](file:///d:/dev2026/mbgerp/projectapi/.env) di dalam folder `projectapi/`:

```env
# Konfigurasi Server
NODE_ENV=development
PORT=4000
API_PREFIX=/api/v1

# URL Koneksi PostgreSQL
# Format: postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>?schema=public
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mbgerp_db?schema=public"

# Kunci JWT Auth
JWT_SECRET=super_secret_mbg_jwt_key_2026_production_grade_bgn
JWT_EXPIRES_IN=7d

# CORS Frontend
CORS_ORIGIN="http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000"

# Metadata Aplikasi
APP_NAME="MBG ERP Enterprise API"
APP_VERSION="1.0.0"
```

---

## 4. Instalasi Dependensi & Generate Prisma Client

Masuk ke folder `projectapi` dan pasang modul yang dibutuhkan:

```bash
cd d:\dev2026\mbgerp\projectapi

# Install dependencies
npm install

# Generate Prisma Client Types
npm run prisma:generate
```

---

## 5. Migrasi Database & Seeding Data

Jalankan perintah berikut untuk membuat seluruh tabel dan mengisi data awal (10 role user, master gizi, supplier, gudang, SPPG, menu, aset, dan budget):

```bash
# 1. Jalankan migrasi Prisma ke PostgreSQL
npx prisma migrate dev --name init

# 2. Seed data dummy enterprise BGN
npm run prisma:seed
```

> **Catatan**: Jika database baru pertama kali dibuat, `prisma migrate` akan otomatis sinkron dengan [schema.prisma](file:///d:/dev2026/mbgerp/projectapi/prisma/schema.prisma).

---

## 6. Menjalankan Server API

Pilih salah satu mode di bawah ini:

### Mode Development (Hot Reload / Watch Mode)
```bash
# Menggunakan npm run dev
npm run dev

# ATAU menggunakan npm run start:dev
npm run start:dev
```

### Mode Debugging
```bash
npm run start:debug
```

### Mode Production (Build & Run)
```bash
npm run build
npm run start:prod
```

Output terminal saat berhasil:
```
[Nest] LOG [NestApplication] Nest application successfully started
[Nest] LOG [Bootstrap] 🚀 MBG ERP Backend API is running on: http://localhost:4000/api/v1
[Nest] LOG [Bootstrap] 📑 Swagger Interactive API Docs: http://localhost:4000/api/docs
```

---

## 7. Verifikasi API & Swagger Documentation

Setelah server berjalan, Anda dapat mengakses:

1. **Health Check Endpoint**:
   - URL: `http://localhost:4000/api/v1/health`
   - Response:
     ```json
     {
       "status": "ok",
       "database": "connected",
       "uptime": 12.34,
       "timestamp": "2026-08-28T02:35:00.000Z"
     }
     ```

2. **Swagger Interactive API Documentation**:
   - URL: `http://localhost:4000/api/docs`
   - Menyediakan dokumentasi interaktif untuk seluruh 12 modul REST API.

3. **Prisma Studio (Database GUI Web)**:
   - Jalankan di terminal baru:
     ```bash
     npx prisma studio
     ```
   - Buka browser di: `http://localhost:5555`

---

## 8. Daftar Akun Login Dummy (BGN Seeder)

Semua akun dummy hasil seeding menggunakan kata sandi default:
> 🔑 **Password Default:** `MbgAdmin2026!`

| No | Peran / Role | Username | Email | Wilayah Tugas |
|:---|:---|:---|:---|:---|
| 1 | **ADMIN_PUSAT** | `admin_pusat` | `admin.pusat@mbg.go.id` | Pusat BGN Jakarta |
| 2 | **ADMIN_REGIONAL** | `admin_bogor` | `admin.bogor@mbg.go.id` | Kota Bogor |
| 3 | **KEPALA_SPPG** | `kepala_sppg` | `kepala.sppg@mbg.go.id` | Sentra Dapur Harmoni |
| 4 | **AHLI_GIZI** | `gizi_sppg` | `gizi.sppg@mbg.go.id` | Sentra Dapur Harmoni |
| 5 | **PETUGAS_GUDANG** | `gudang_sppg` | `gudang.sppg@mbg.go.id` | Gudang Hub Bogor |
| 6 | **PETUGAS_DAPUR** | `chef_sppg` | `chef.sppg@mbg.go.id` | Sentra Dapur Harmoni |
| 7 | **DRIVER_LOGISTIK** | `driver_sppg` | `driver.sppg@mbg.go.id` | Sentra Dapur Harmoni |
| 8 | **TIM_QC_AUDITOR** | `qc_sppg` | `qc.sppg@mbg.go.id` | Sentra Dapur Harmoni |
| 9 | **PPK_KEUANGAN** | `keuangan_ppk` | `keuangan.ppk@mbg.go.id` | Sentra Dapur Harmoni |
| 10 | **SUPPLIER** | `vendor_primafarm`| `supplier.primafarm@mbg.go.id` | Mitra Jawa Barat |

---

## 9. Solusi Masalah Umum (Troubleshooting)

### A. `ERROR [PackageLoader] No driver (HTTP) has been selected...`
- **Penyebab**: Terjadi kerusakan file pada modul internal `busboy` di `node_modules`.
- **Solusi**:
  ```powershell
  Remove-Item -Recurse -Force .\node_modules\busboy
  npm install busboy
  ```

### B. `WARN [PrismaService] Can't reach database server at localhost:5432`
- **Penyebab**: Database PostgreSQL belum menyala atau port 5432 tidak dapat diakses.
- **Solusi**:
  1. Jalankan `docker compose up -d` di root project, atau pastikan PostgreSQL service aktif.
  2. Periksa kecocokan password & port di file `.env`.

### C. Port 4000 sudah digunakan (`EADDRINUSE: address already in use :::4000`)
- **Penyebab**: Masih ada proses Node/NestJS lama yang berjalan di background.
- **Solusi (Windows PowerShell)**:
  ```powershell
  # Cari proses di port 4000 lalu matikan
  Get-Process -Id (Get-NetTCPConnection -LocalPort 4000).OwningProcess | Stop-Process -Force
  ```

### D. Reset Ulang Database dari Awal
Jika Anda ingin menghapus seluruh data dan menjalankan seeding ulang:
```bash
cd projectapi
npx prisma migrate reset --force
npm run prisma:seed
```
