# 📘 Panduan Menjalankan Backend API (`projectapi`)

Panduan lengkap dapat diakses di:
👉 **[`PANDUAN_MENJALANKAN_PROJECTAPI.md`](file:///d:/dev2026/mbgerp/PANDUAN_MENJALANKAN_PROJECTAPI.md)**

---

## ⚡ Quick Reference Commands

```bash
# 1. Start PostgreSQL Container (dari root project)
docker compose up -d

# 2. Masuk ke projectapi
cd projectapi

# 3. Install & Prisma Generate
npm install
npm run prisma:generate

# 4. Migrasi & Seed Data BGN
npx prisma migrate dev --name init
npm run prisma:seed

# 5. Jalankan Server API
npm run dev
# atau
npm run start:dev
```

- **Health Check**: `http://localhost:4000/api/v1/health`
- **Swagger Docs**: `http://localhost:4000/api/docs`
- **Prisma Studio**: `npx prisma studio` (`http://localhost:5555`)
- **Default Password**: `MbgAdmin2026!`
