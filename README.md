# Final Project Otomasi Pengujian UI OrangeHRM dengan Cypress & BDD

Proyek ini merupakan implementasi pengujian UI otomatis untuk aplikasi web [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/). Proyek ini dibangun menggunakan **Cypress** dengan menerapkan pendekatan **Behavior-Driven Development (BDD)** dan desain pattern **Page Object Model (POM)** untuk memastikan skrip pengujian yang modular, mudah dibaca, dan skalabel.

## Daftar Isi

- [Fitur yang Diuji](#fitur-yang-diuji)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Struktur Folder](#struktur-folder)
- [Prasyarat](#prasyarat)
- [Menjalankan Pengujian](#menjalankan-pengujian)
- [Hasil Pengujian](#hasil-pengujian)
- [Catatan Penting: Data Dinamis](#catatan-penting-data-dinamis)

## Fitur yang Diuji

Pengujian otomatis mencakup skenario fungsional pada fitur-fitur berikut:
1.  **Login**: Skenario login dengan kredensial valid dan tidak valid.
2.  **Admin**: Manajemen pengguna, seperti pencarian pengguna.
3.  **PIM (Personal Information Management)**: Menambahkan dan memvalidasi data imigrasi untuk seorang karyawan.
4.  **MyInfo**: Memvalidasi penambahan dan tampilan informasi personal pengguna yang sedang login.

## Teknologi yang Digunakan

-   **Framework Pengujian**: [Cypress](https://www.cypress.io/)
-   **Pendekatan BDD**: [Cypress Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)
-   **Pelaporan (Reporting)**: [Cypress Mochawesome Reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter)
-   **Desain Pattern**: Page Object Model (POM)
-   **Bahasa**: JavaScript
-   **Package Manager**: npm

## Struktur Folder

Proyek ini disusun dengan struktur yang modular untuk memisahkan antara skenario, implementasi langkah, dan elemen halaman.

```
my-cypress-orangehrm-project/
├── cypress/
│   ├── features/               # (BDD) Skenario pengujian dalam format Gherkin (.feature)
│   ├── fixtures/               # Data statis dan dinamis untuk pengujian (JSON)
│   ├── pages/                  # (POM) Page Object classes, berisi elemen dan aksi halaman
│   ├── step_definitions/       # Implementasi kode untuk setiap langkah Gherkin
│   ├── support/                # Konfigurasi global dan custom commands Cypress
│   ├── screenshots/            # Dihasilkan otomatis apabila ada tes gagal              
│   └── reports/                # Folder output untuk laporan HTML
│
├── cypress.config.js           # File konfigurasi utama Cypress
├── package.json                # Daftar dependensi dan skrip proyek
├── screenshot_hasil/           # Screenshot hasil saat running di pc local
└── README.md                   # Dokumentasi ini
```

## Prasyarat

Pastikan Anda telah menginstal software berikut:
-   [Node.js](https://nodejs.org/en/)
-   npm (biasanya terinstal bersama Node.js)

## Menjalankan Pengujian

Anda dapat menjalankan pengujian dalam dua mode:

1.  **Mode Interaktif (Cypress Test Runner):**
    Mode ini membuka antarmuka visual Cypress di mana Anda dapat memilih dan melihat tes berjalan secara *real-time*. Laporan HTML tidak dihasilkan dalam mode ini.
    ```bash
    npx cypress open
    ```

2.  **Mode Headless:**
    Mode ini menjalankan semua tes di terminal tanpa membuka browser. Run ini **diperlukan untuk menghasilkan laporan HTML**.
    ```bash
    npx cypress run
    ```

## Hasil Pengujian

Setelah menjalankan pengujian dalam mode headless, hasil eksekusi akan tersedia dalam format html. Laporan ini berisi ringkasan hasil eksekusi, grafik, durasi, dan tangkapan layar (screenshot) untuk setiap tes yang gagal.
    
    Buka file berikut di browser Anda:
    ```
    cypress/reports/html/index.html
    ```

Jika ada tes yang gagal, Cypress akan mengambil screenshot pada titik kegagalan dan menyimpannya di folder `cypress/screenshots/`.

## Catatan Penting: Data Dinamis

Aplikasi demo OrangeHRM sering kali me-reset databasenya. Akibatnya, `employee Name` dan `employee ID` yang digunakan dalam pengujian (terutama untuk fitur PIM dan Admin) dapat berubah atau menjadi tidak valid.

**Sebelum menjalankan pengujian, Anda WAJIB memperbarui data di dalam folder `cypress/fixtures/`.**

1.  **Buka situs [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/)** dan login dengan kredensial standar (`Admin` / `admin123`).
2.  **Cari Karyawan:** Buka menu **PIM** atau **Admin** untuk mencari nama karyawan atau ID yang valid dan masih ada di sistem.
3.  **Perbarui Fixtures:** Buka file JSON yang relevan di dalam `cypress/fixtures/` (`pim.json` atau `admin.json`) dan ganti nilai `employeeName` atau `employeeID` dengan data yang baru Anda temukan.

Contoh `cypress/fixtures/pim.json`:
```json
{
  "employeeID": "4343"
}
```

Dengan memperbarui data ini, Anda memastikan bahwa tes dapat menemukan elemen yang benar dan berjalan dengan sukses.
