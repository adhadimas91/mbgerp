# Module 5: Financial & Budget Management

## 1. Objectives
Mengelola anggaran program dan mencatat semua pengeluaran secara transparan.

## 2. Features
### Budgeting
- Alokasi anggaran per wilayah/kabupaten.
- Monitoring sisa anggaran secara real-time.

### Expenditure Tracking
- Pencatatan biaya operasional (BBM, biaya admin, biaya tak terduga).
- Pencatatan biaya bahan baku (berdasarkan PO ke supplier).
- Upload invoice dan bukti pembayaran.

### Payment Management
- Monitoring status pembayaran ke supplier (Pending, Paid, Overdue).

## 3. Key APIs
- `GET /finance/budgets` - Lihat alokasi anggaran.
- `POST /finance/expenditures` - Catat pengeluaran.
- `GET /finance/payments` - List status pembayaran supplier.
- `GET /finance/reports/budget-usage` - Laporan penggunaan anggaran.
