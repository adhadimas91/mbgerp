# Module 2: Inventory Management

## 1. Objectives
Mengelola stok bahan baku di gudang pusat dan regional agar selalu tersedia untuk pemenuhan menu harian.

## 2. Features
### Warehouse Management
- Manajemen lokasi gudang.
- Kapasitas gudang dan kategori penyimpanan (Cold Storage, Dry Storage, dll).

### Stock Tracking
- Input barang masuk (dari Supplier) dan barang keluar (untuk Produksi/Distribusi).
- Penyesuaian stok (Stock Adjustment) untuk barang rusak atau hilang.
- **Traceability & Food Safety**:
    - Pelacakan Batch/Lot Number.
    - Monitoring Tanggal Kadaluarsa (Expiry Date).
    - Pencatatan Suhu Penyimpanan (Cold Chain Monitoring) untuk produk protein/sayuran.

### Alerts & Notifications
- Notifikasi stok rendah (Low Stock Alert) berdasarkan `min_stock_threshold`.
- Laporan mutasi stok harian/mingguan.

## 3. Key APIs
- `GET /inventory/stocks` - List semua stok di gudang tertentu.
- `POST /inventory/movements` - Catat pergerakan stok (IN/OUT/ADJUST).
- `GET /inventory/alerts` - List barang yang stoknya di bawah batas minimum.
- `GET /inventory/reports/movements` - Laporan mutasi stok.
