# ERP MBG — Sistem Manajemen Makanan Bergizi Gratis Nasional

Sistem Enterprise Resource Planning (ERP) terintegrasi untuk pengelolaan rantai pasok pangan, operasional dapur sentral SPPG, kontrol nutrisi AKG Kemenkes, logistik berpendingin, akuntabilitas finansial, dan audit mutu kepatuhan ISO Badan Gizi Nasional (BGN).

---

## 🏛️ Arsitektur Proyek

Repository ini terdiri dari beberapa direktori utama:

| Direktori | Teknologi | Deskripsi |
|:---|:---|:---|
| **[`projectweb`](file:///d:/dev2026/mbgerp/projectweb)** | Next.js 16 + React 19 + Tailwind CSS v4 | Aplikasi Frontend Web Dashboard Admin ERP MBG (9 Modul Operasional) |
| **[`projectapi`](file:///d:/dev2026/mbgerp/projectapi)** | NestJS + Prisma ORM + PostgreSQL | Layanan Backend REST API Enterprise (12 Modul Domain & RBAC) |
| **[`uiweb`](file:///d:/dev2026/mbgerp/uiweb)** | HTML/CSS Template Source | Referensi desain asli dipertahankan 100% utuh |
| **[`task_md`](file:///d:/dev2026/mbgerp/task_md)** | Markdown Specifications | Spesifikasi arsitektur teknis, domain entity & checklist progres modul |

---

## 🚀 Memulai Proyek (Development Setup)

### 1. Menjalankan Backend API (`projectapi`)
> 📖 Panduan lengkap & troubleshooting database: [`PANDUAN_MENJALANKAN_PROJECTAPI.md`](file:///d:/dev2026/mbgerp/PANDUAN_MENJALANKAN_PROJECTAPI.md)

```bash
# Start PostgreSQL Database (Docker)
docker compose up -d

# Jalankan Backend API
cd projectapi
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```
- **API URL:** `http://localhost:4000/api/v1`
- **Swagger Docs:** `http://localhost:4000/api/docs`
- **Automated Test:** `npm run test:api`

### 2. Menjalankan Frontend Web (`projectweb`)
```bash
cd projectweb
npm install
npm run dev
```
- **Web App URL:** `http://localhost:3000`

---

## 📋 Modul & Fitur ERP MBG

1. **Supplier & Vendor Management**: Registrasi NIB/NPWP, sertifikasi Halal & ISO 22000, katalog harga vs HAP Bapanas, dan evaluasi scorecard performa vendor.
2. **Gudang, Stok & Cold Chain IoT**: Master stok dry & cold storage (-18°C ~ 4°C), reorder point buffer, pelacakan lot/batch, dan sensor suhu real-time.
3. **Menu, Resep & Nutrisi AKG**: Formula resep per kelompok usia, kalkulator makronutrisi Kemenkes RI, dan evaluasi HPP porsi terhadap pagu Rp 15.000.
4. **Dapur Sentral SPPG**: Monitoring lini 1-5, telemetri CCP HACCP (≥75°C inti masak), form uji organoleptik & pelepasan sampel retensi 2x24 jam.
5. **Logistik & Distribusi**: Peta sebaran titik sekolah sasaran, simulator rute klaster, surat jalan waybill, dan verifikasi bukti terima (PoD) ber-tanda tangan digital.
6. **Manajemen Aset Tetap**: Inventaris alat masak & armada, depresiasi garis lurus, generator stiker QR code, jadwal servis & inspeksi sanitasi.
7. **Finansial & Anggaran**: Alokasi pagu DPA APBN per wilayah, pencatatan belanja (BKK), pemotongan pajak PPh 22/23/PPN 11%, faktur 3-Way Match & SP2D.
8. **Kualitas, ISO & Audit Trail**: Stream log forensik audit BPK (SHA-256 Chained Hash), pelacak sertifikasi ISO, dan formulir pelaporan insiden CAPA RCA.
9. **SDM, Presensi & Payroll**: Direktori tenaga kerja dapur SPPG, 3 shift kerja, health gatekeeper (<37.3°C), rekam medis MCU bebas infeksi & slip gaji resmi.

---

## 📚 Dokumentasi Lengkap (`task_md/`)

- [00_PROJECT_OVERVIEW.md](file:///d:/dev2026/mbgerp/task_md/00_PROJECT_OVERVIEW.md) — Gambaran Umum Program MBG
- [01_TECH_STACK_&_INFRA.md](file:///d:/dev2026/mbgerp/task_md/01_TECH_STACK_&_INFRA.md) — Infrastruktur & Arsitektur Sistem
- [02_DATABASE_SCHEMA.md](file:///d:/dev2026/mbgerp/task_md/02_DATABASE_SCHEMA.md) — Desain Entitas Database Relasional
- [13_CHECKLIST_TASK.md](file:///d:/dev2026/mbgerp/task_md/13_CHECKLIST_TASK.md) — Master Checklist & Status Progres
- [15_BACKEND_API_&_TESTING_GUIDE.md](file:///d:/dev2026/mbgerp/task_md/15_BACKEND_API_&_TESTING_GUIDE.md) — Panduan REST API & Pengujian
