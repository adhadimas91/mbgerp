# Module 7: Audit Trail Management

## 1. Objectives
Menyediakan catatan aktivitas sistem yang lengkap, tidak dapat diubah (immutable), dan mudah dilacak untuk keperluan keamanan dan audit keuangan.

## 2. Features
### Automatic Logging
- Mencatat setiap aksi sensitif secara otomatis:
    - Perubahan stok (Stock Movements).
    - Perubahan status pengiriman (Shipment Status).
    - Perubahan data keuangan (Budget, Expenditures, Payments).
    - Verifikasi supplier.
    - Perubahan hak akses user/role.
- Data yang dicatat: User ID, IP Address, User Agent, Aksi (Create/Update/Delete), Entitas yang diubah, Nilai Lama (Old Values), dan Nilai Baru (New Values).

### Audit Dashboard & Filters
- Filter berdasarkan: Rentang tanggal, User tertentu, Entitas tertentu, dan jenis aksi.
- Pencarian teks pada nilai lama/baru.

### Security & Immutability
- Log hanya bisa ditambah (Append-only), tidak bisa diubah atau dihapus oleh user biasa.
- Akses log hanya diberikan kepada Admin Pusat.

### Export Reports
- Ekspor log audit ke format CSV atau PDF untuk kebutuhan audit internal/eksternal.

## 3. Key APIs
- `GET /audit/logs` - List log dengan filter (admin only).
- `GET /audit/logs/:entity_id` - Lihat riwayat perubahan pada satu data spesifik.
- `GET /audit/logs/user/:user_id` - Lihat semua aktivitas user tertentu.
