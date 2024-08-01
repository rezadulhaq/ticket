# ticket

# Proyek Setup

Panduan ini akan memandu Anda melalui proses setup server dan frontend proyek.

## Setup Server

1. **Navigasi ke direktori backend:**

    ```bash
    cd backend
    ```

2. **Install semua paket yang dibutuhkan:**

    ```bash
    npm install
    ```

3. **Setel file `.env` Anda:**

    Buat atau perbarui file `.env` di direktori `backend` dengan variabel lingkungan berikut:

    ```env
    NODE_ENV=development
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    SECRET_JWT=your_jwt_secret
    XENDIT_SECRET_KEY=your_xendit_secret_key
    ```

4. **Setup database:**

    Jalankan perintah berikut untuk setup database:

    ```bash
    npm run setupdb
    ```

5. **Jalankan server:**

    Untuk menjalankan server, gunakan perintah berikut:

    ```bash
    nodemon app.js
    ```

## Setup Frontend

1. **Buka terminal baru dan navigasi ke direktori frontend:**

    ```bash
    cd fe
    ```

2. **Install semua paket yang dibutuhkan:**

    ```bash
    npm install
    ```

3. **Jalankan frontend:**

    Untuk menjalankan frontend, gunakan perintah berikut:

    ```bash
    npm run dev
    ```

## Catatan

-   Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) dan [npm](https://www.npmjs.com/) pada sistem Anda.
-   Sesuaikan nilai variabel di file `.env` sesuai dengan konfigurasi dan kredensial sistem Anda.
-   Gunakan `nodemon` untuk pengembangan agar server dapat otomatis memuat ulang saat Anda melakukan perubahan pada kode.

Jika Anda menemui masalah atau membutuhkan bantuan tambahan, silakan hubungi tim pengembang atau periksa dokumentasi proyek lebih lanjut.
