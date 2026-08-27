# Module 4: Logistics & Distribution

## 1. Objectives
Memastikan makanan terkirim ke titik distribusi tepat waktu dan dalam kondisi baik.

## 2. Features
### Distribution Point Management
- Registrasi titik distribusi (Sekolah, Panti Asuhan, dll).
- Geolocation (Lat/Lng) untuk pemetaan distribusi.

### Shipment Tracking
- Pembuatan nomor resi pengiriman.
- Update status pengiriman (Pending -> Shipped -> Delivered).
- Estimasi waktu tiba (ETA) vs Waktu tiba aktual.

### Proof of Delivery (PoD)
- Upload foto bukti pengiriman.
- Tanda tangan digital atau konfirmasi dari pengelola lokasi.

## 3. Key APIs
- `POST /shipments` - Buat pengiriman baru.
- `PATCH /shipments/:id/status` - Update status pengiriman.
- `GET /shipments/track/:shipment_id` - Melacak posisi pengiriman.
- `POST /shipments/:id/proof` - Upload bukti penerimaan.
