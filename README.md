# Manajer Toko - Sistem Manajemen Inventaris Produk

Aplikasi manajemen produk premium dan modern untuk toko online kecil. Dibangun dengan fokus pada kemudahan penggunaan, estetika visual yang bersih, dan responsivitas penuh.

## Fitur Utama
- **Katalog Produk**: Tampilan daftar produk dalam bentuk kartu premium.
- **Manajemen CRUD**: Tambah, Edit, dan Hapus produk dengan mudah.
- **Status Inventaris**: Indikator produk Aktif/Draf.
- **Desain Responsif**: Optimal untuk tampilan Mobile, Tablet, dan Desktop.
- **Mode Gelap**: Mendukung tema gelap yang elegan secara otomatis.

---

## Persiapan Backend (FastAPI)

Pastikan Anda memiliki Python 3.9+ terinstal di sistem Anda.

1. **Masuk ke direktori backend:**
   ```bash
   cd backend
   ```

2. **Buat Virtual Environment (opsional tapi direkomendasikan):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Untuk Mac/Linux
   # venv\Scripts\activate     # Untuk Windows
   ```

3. **Instal dependensi:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Jalankan server backend:**
   ```bash
   uvicorn main:app --reload
   ```
   Server akan berjalan di [http://127.0.0.1:8000](http://127.0.0.1:8000).

---

## Persiapan Frontend (Vite + React)

Pastikan Anda memiliki Node.js terinstal.

1. **Masuk ke direktori frontend:**
   ```bash
   cd frontend
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variable:**
   Buat atau pastikan file `.env` di dalam folder `frontend` berisi:
   ```env
   VITE_API_URL=http://127.0.0.1:8000
   ```

4. **Jalankan aplikasi frontend:**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di [http://localhost:5173](http://localhost:5173).

---

## Struktur Proyek
- `/backend`: API menggunakan FastAPI dan database SQLite (`products.db`).
- `/frontend`: Aplikasi web menggunakan React, TypeScript, dan Tailwind CSS.