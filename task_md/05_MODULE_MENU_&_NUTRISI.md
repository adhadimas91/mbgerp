# Module 3: Menu & Nutrition Management

## 1. Objectives
Merencanakan menu harian yang memenuhi standar gizi dengan perhitungan biaya yang akurat.

## 2. Features
### Menu Planning
- Pembuatan variasi menu mingguan/bulanan.
- Penentuan jumlah porsi target per menu.

### Nutritional Calculation
- Perhitungan otomatis kalori, protein, lemak, dan karbohidrat berdasarkan bahan baku (`recipe_items`).
- Validasi apakah menu memenuhi standar nutrisi minimal yang ditetapkan pemerintah.

### Cost Analysis
- Perhitungan Biaya per Porsi (Cost per Portion) secara real-time berdasarkan harga bahan baku saat ini di gudang.

## 3. Key APIs
- `POST /menus` - Buat menu baru.
- `POST /menus/:id/recipe` - Tambahkan bahan ke resep.
- `GET /menus/:id/nutrition` - Ambil data nutrisi menu.
- `GET /menus/:id/cost-analysis` - Ambil estimasi biaya per porsi.
