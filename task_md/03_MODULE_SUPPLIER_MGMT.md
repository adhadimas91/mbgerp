# Module 1: Supplier Management

## 1. Objectives
Mengelola pendaftaran, verifikasi, dan performa supplier bahan baku makanan.

## 2. Features
### Supplier Registration & Verification
- Form pendaftaran supplier (Nama, Kontak, Alamat, Dokumen Legal).
- Upload dokumen (NIB, NPWP, Sertifikasi Halal/Pangan).
- **Sertifikasi Kepatuhan (ISO 22000, ISO 9001, BPOM)** - Verifikasi masa berlaku sertifikasi keamanan pangan dan mutu.
- Status Verifikasi (Pending, Approved, Rejected).

### Supplier Catalog
- Daftar produk yang disediakan setiap supplier.
- Harga dasar per unit.
- Kategori produk.

### Supplier Performance
- Rating berdasarkan ketepatan pengiriman.
- Riwayat transaksi dengan supplier.
- Dashboard performa supplier untuk Admin Regional.

## 3. Key APIs
- `POST /suppliers` - Register supplier.
- `PATCH /suppliers/:id/verify` - Update status verifikasi.
- `GET /suppliers` - List suppliers with filters.
- `GET /suppliers/:id/performance` - Get performance metrics.
