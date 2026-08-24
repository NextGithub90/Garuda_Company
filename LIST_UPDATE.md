# List Update Website PT. Garuda Mas Shipping

Dokumen ini mencatat seluruh pembaruan desain, konten, formulir, teks layanan, slider, tautan navigasi, profil perusahaan, dan struktur bahasa (i18n) yang telah diterapkan pada situs web PT. Garuda Mas Shipping.

---

## Batch Pembaruan 9: Tautan Menu Services di Halaman Home (`index.html`)

| No | Komponen / Bagian | Deskripsi Perubahan | File Terkait |
|---|---|---|---|
| **1** | **Menu Navigasi Header Services** | Mengubah link menu navbar **SERVICES** pada `index.html` dari tautan anchor `#services` menjadi mengarah langsung ke halaman **`services.html`**. | `index.html` |
| **2** | **Tombol Hero Slider "Our Services"** | Mengubah link tombol *Our Services* pada seluruh 3 slide carousel hero dari `#services` menjadi **`services.html`**. | `index.html` |
| **3** | **Kartu Unit Layanan (5 Core Services)** | Membungkus ke-5 kartu layanan di beranda ke dalam tautan link `<a>` sehingga ketika diklik langsung menuju ke halaman **`services.html`**. | `index.html` |

---

## Rincian Perubahan Batch 9 per File

### 1. `index.html`
* **Navbar Header (Line ~47):**
  * `<a class="nav-link" href="services.html" data-i18n="nav_services">Services</a>` kini langsung membuka file `services.html`.
* **Hero Carousel Slides (Lines ~128, 158, 187):**
  * Tombol CTA *Our Services* pada Slide 1, Slide 2, dan Slide 3 kini membuka `services.html`.
* **Unit Service Cards (Lines ~310-405):**
  * Seluruh 5 unit-card (*Sea Freight*, *Customs Clearance*, *Project Logistic*, *Warehousing*, *Land Transportation*) kini berupa clickable link menuju `services.html`.

---

## Rekapitulasi Pembaruan Sebelumnya

### Batch 8: Quote Card Manajemen & Hapus Foto (`about.html`)
- **Hapus Foto:** Menghapus foto pendiri pada kartu quote.
- **Teks Quote:** *“Building trust through precision, integrity, and excellence to deliver strategic logistics solutions for global business growth.”*
- **Atribusi:** **`Management of PT. Garuda Mas Shipping`**.

### Batch 7: Halaman About Us (Badge 25+, Our Reach Text & Hapus Statistik)
- **Badge Peta:** Hapus badge overlay *"25+ Years Of Trusted Service"*.
- **Our Reach Text:** *"Our global network connects key shipping routes and markets, supported by strong local expertise and trusted industry relationships. We provide seamless coordination, reliable execution, and consistent service across borders."*
- **Hapus Statistik:** Hapus 4 kartu statistik (*Port Terminals*, *Modern Vessels*, *Professionals*, *ISO 9001*).

### Batch 6: CTA Services, Our Story & Why Choose Us
- **CTA Services:** Judul `Ready to Elevate Your Logistics?` & teks ajakan baru.
- **Our Story (`about.html`):** 3 paragraf baru pendirian 2025 di Jakarta dan keahlian tim maritim.
- **Why Choose Our Services:** 4 kartu keunggulan diperbarui teksnya (*Global Network*, *24/7 Operations*, *Secure & Safe*, *Cost Efficient*).

### Batch 5: Hero Slides (1 & 2), Services Overview, Our Vision & Mission
- **Hero Slide 1:** Judul `Global Shipping & Logistics` & deskripsi konektivitas pasar global.
- **Hero Slide 2:** Judul `Advanced Port & Terminal Solutions` & deskripsi optimasi gerbang logistik global.
- **Services Overview:** Deskripsi menyeluruh pengantar layanan terintegrasi.
- **Our Vision (01) & Our Mission (02):** Pembaruan visi dan misi di beranda dan kamus i18n.

### Batch 4: Hero Slide 3, About Us Teaser & Our Values Header
- **Hero Slide 3:** *"Connecting every stage of your logistics journey with efficiency and precision."*
- **About Us Section (Beranda):** Hapus badge 25+, hapus counter statistik, dan pembaruan teks 2025.
- **Our Values Intro:** *"Our principles define our culture and guide our pursuit of operational excellence, integrity, and trusted maritime services."*

### Batch 3: Deskripsi Seluruh 5 Layanan
- Pembaruan deskripsi *Sea Freight*, *Customs Clearance*, *Project Logistic*, *Warehousing*, dan *Land Transportation*.

### Batch 2: Contact Form & Section Jaringan
- Tanda bintang merah (`*`), hapus `"e.g. "`, pemilih kode negara pada nomor telepon, tag `"HEAD OFFICE & BRANCH NETWORK"`, dan footer deskripsi.

### Batch 1: Navigasi, Kartu Kantor & Our Values Grid
- Navigasi **HOME &rarr; SERVICES &rarr; ABOUT US**, hapus info kontak pada kartu kantor, dan hapus kartu HSSE Excellence.
