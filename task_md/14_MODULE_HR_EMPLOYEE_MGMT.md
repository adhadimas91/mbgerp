# Modul: Manajemen SDM, Tenaga Kerja Dapur & Payroll MBG

## 1. Deskripsi Modul
Modul Manajemen SDM & Karyawan (**Human Resources & Workforce Management**) mengelola seluruh siklus hidup tenaga kerja dalam ekosistem Program Makanan Bergizi Gratis (MBG), mulai dari Satuan Pelayanan Program Gizi (SPPG/Dapur Sentral), armada logistik, ahli gizi, juru masak, helper, hingga tim penjamin mutu (HACCP & K3).

Modul ini dirancang dengan kepatuhan penuh terhadap standar:
1. **Permenkes No. 1096/MENKES/PER/VI/2011** tentang Higiene Sanitasi Jasaboga (Sertifikasi Penjamah Makanan / Food Handler).
2. **ISO 22000:2018 & HACCP Clause 7.1.2** (People & Competency in Food Safety).
3. **Standar Operasional Prosedur (SOP) Badan Gizi Nasional (BGN)** mengenai alokasi shift dini hari, uji organoleptik, dan skrining kesehatan harian sebelum memasuki zona dapur steril.
4. **Regulasi Ketenagakerjaan & BPJS**: BPJS Ketenagakerjaan (JKK, JKM, JHT, JP), BPJS Kesehatan, dan insentif berbasis KPI volume porsi tersalurkan.

---

## 2. Struktur Submodul & Fitur Utama

### A. Direktori Master Data Karyawan (`/employees`)
- **Struktur Posisi Tenaga Kerja**:
  - `KEPALA_SPPG`: Penanggung jawab operasional harian dapur sentral.
  - `AHLI_GIZI`: Nutrisionis penanggung jawab formulasi menu AKG & uji lab.
  - `CHEF_KEPALA`: Head Chef penanggung jawab takaran resep & organoleptik.
  - `JURU_MASAK`: Cook / pengolah bahan baku sesuai alur CCP.
  - `HELPER_DAPUR`: Asisten persiapan bahan, pemotongan, dan pengemasan termal.
  - `DRIVER_LOGISTIK`: Pengemudi kendaraan pendingin/boks bersegel MBG.
  - `QC_AUDITOR`: Pengawas sanitasi, CCP temperature, dan kepatuhan ISO 22000.
  - `ADMIN_KEUANGAN`: Staf verifikasi SPJ, belanja bahan baku & payroll.
- **Data & Legalitas Lengkap**:
  - NIK, NIP internal SPPG, NPWP, BPJS Kesehatan & Ketenagakerjaan.
  - Penempatan unit dapur SPPG (misal: SPPG Harmoni Jakarta Pusat).
  - Status kepegawaian (Tetap, Kontrak BGN, Harian Lepas Mitra).
  - Tanggal Medical Check Up (MCU) terakhir & status Bebas TBC / Typhoid / Hepatitis A.
- **Generator ID Card Resmi**:
  - Kartu identitas tenaga kerja ber-QR Code dengan foto, barcode NIP, unit SPPG, dan label kelaikan Food Handler Kemenkes.

### B. Penjadwalan Shift & Presensi Higiene Harian (`/employees/shifts`)
- **Struktur 3 Shift Dapur Sentral**:
  - `SHIFT 1 (02:00 - 07:00 WIB)`: Persiapan subuh, pemotongan bahan segar, dan proses masak awal menu sarapan/snack pagi.
  - `SHIFT 2 (05:00 - 11:00 WIB)`: Pengolahan utama, pengemasan termal (suhu >60°C), dan serah terima loading armada distribusi sekolah.
  - `SHIFT 3 (09:00 - 16:00 WIB)`: Distribusi porsi makan siang, penarikan ompreng/wadah, sanitasi kimia alat dapur, dan sterilisasi ruangan.
- **Presensi & Daily Health Gatekeeper**:
  - Pencatatan kehadiran digital berbasis timestamp.
  - Skrining wajib harian: Pengecekan Suhu Tubuh (Maks 37.3°C), Bebas Luka Terbuka di Tangan, Bebas Gejala Batuk/Pilek/Diare sebelum diizinkan memasuki ruang steril dapur.

### C. Penggajian & Insentif Kerja MBG (`/employees/payroll`)
- **Komponen Penghasilan**:
  - Gaji Pokok (UMP/UMK setempat).
  - Tunjangan Higiene Dapur & Kehadiran Penuh.
  - Insentif Output Porsi Terdistribusi Tepat Waktu (On-Time Delivery).
  - Uang Lembur Shift Dini Hari.
- **Komponen Potongan**:
  - Iuran BPJS Ketenagakerjaan (JKK, JKM, JHT, JP).
  - Iuran BPJS Kesehatan (1% Karyawan + 4% Pemberi Kerja).
  - Potongan PPh 21 Terhitung Otomatis.
- **Otorisasi & Slip Gaji**:
  - Alur persetujuan: Draft Payroll ➔ Verifikasi Kepala SPPG ➔ Approval PPK BGN ➔ Eksekusi Transfer Bank BUMN.
  - Cetak Bukti Pembayaran Upah & Slip Gaji resmi berstempel digital.

### D. Sertifikasi Food Handler & Medical Check Up (`/employees/certifications`)
- **Matriks Monitoring Sertifikat**:
  - Sertifikat Penjamah Makanan Kemenkes RI (Berlaku 3 Tahun).
  - Sertifikasi Halal Food Handler (HAS 23000).
  - Sertifikasi K3 Dapur Komersial & HACCP Level 2/3.
  - Hasil Uji Laboratorium Rectal Swab (Bebas Salmonella typhi & Hepatitis A).
- **Sistem Early Warning Kedaluwarsa**:
  - Notifikasi 60 hari & 30 hari sebelum sertifikat atau MCU kedaluwarsa untuk penjadwalan ulang audit kesehatan.

---

## 3. Hubungan Antar Modul
- **Modul 3 (Menu & Nutrisi)**: Penugasan Ahli Gizi untuk validasi menu harian.
- **Modul 4 (Logistik & Distribusi)**: Penugasan Driver resmi yang terdaftar dengan SIM & sertifikat pengantaran makanan panas.
- **Modul 5 (Manajemen Aset)**: Penugasan operator berlisensi untuk mesin boiler dan chiller.
- **Modul 6 (Finansial & Anggaran)**: Pencatatan beban payroll ke dalam pos belanja operasional DPA BGN (15% pagu belanja non-bahan baku).
- **Modul 7 (Audit Trail & Kepatuhan ISO)**: Audit log perubahan data kepegawaian dan kepatuhan klausul 7.1 ISO 22000.
