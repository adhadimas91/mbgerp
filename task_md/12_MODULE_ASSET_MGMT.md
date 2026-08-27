# Module 12: Asset Management System

## Overview
Modul ini bertujuan untuk mengelola siklus hidup aset tetap (fixed assets) yang digunakan dalam program MBG, termasuk peralatan masak, kendaraan distribusi, fasilitas gudang, dan peralatan kantor lainnya. Berbeda dengan modul Inventory yang menangani barang habis pakai, modul ini fokus pada barang dengan masa pakai panjang dan nilai penyusutan.

## Key Features

### 1. Asset Categorization & Registry
- **Kategori Aset:** Peralatan Masak (Kitchenware), Kendaraan (Vehicles), Elektronik, Furnitur, dan Fasilitas Bangunan.
- **Data Master Aset:**
    - ID Aset (QR Code/Barcode Ready)
    - Nama & Spesifikasi Teknis
    - Nomor Seri / Nomor Polisi (untuk kendaraan)
    - Tanggal Perolehan & Harga Beli
    - Lokasi Penempatan (Kitchen, Warehouse, Distribution Point)
    - Status Aset (Aktif, Maintenance, Rusak, Dihapus)
    - Masa Depresiasi (Depreciation Schedule)

### 2. Procurement & Lifecycle
- **Request Aset:** Form pengajuan kebutuhan aset oleh unit terkait.
- **Approval Workflow:** Alur persetujuan dari pengelola program hingga bagian keuangan.
- **Receiving:** Pencatatan aset yang baru masuk ke sistem (integrasi dengan Supplier).
- **Disposal:** Prosedur penghapusan aset dari sistem (penjualan, pembuangan, atau hibah) beserta dokumentasinya.

### 3. Maintenance & Tracking
- **Maintenance Schedule:** Jadwal servis rutin untuk kendaraan dan peralatan elektronik.
- **Repair Logs:** Riwayat perbaikan aset yang rusak (biaya, suku cadang, teknisi).
- **Vehicle Tracking:** Integrasi dengan data GPS atau log perjalanan untuk kendaraan distribusi (bekerja sama dengan modul Logistik).
- **Inspection Checklist:** Checklist kebersihan dan kelaikan peralatan masak secara berkala (mendukung standar ISO 22000).

### 4. Financial Integration
- **Depreciation Tracking:** Perhitungan penyusutan nilai aset secara otomatis setiap bulan/tahun.
- **Cost Center:** Pengelompokan biaya aset berdasarkan lokasi atau unit kerja untuk laporan anggaran.

## ISO Compliance & Audit
- **ISO 9001 & 22000:** Memastikan semua peralatan masak dalam kondisi layak pakai dan higienis melalui log pemeliharaan yang terdokumentasi.
- **Audit Trail:** Setiap perubahan status, perpindahan lokasi, atau aktivitas perbaikan aset wajib tercatat dalam sistem Audit Trail (Module 10).
- **Traceability:** Kemampuan melacak riwayat pemeliharaan dan lokasi aset dari awal pembelian hingga penghapusan.

## Technical Requirements
- **QR Code Generation:** Sistem untuk mencetak label QR Code pada setiap aset fisik.
- **Geo-tagging:** Untuk pencatatan lokasi aset dan kendaraan secara akurat.
- **Dashboard:** Visualisasi aset berdasarkan status (misal: % aset yang butuh servis, nilai total aset per wilayah).
