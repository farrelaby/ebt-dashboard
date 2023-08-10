# Selamat datang di repository dashboard EBT (PLTS & PLTB) DTNTF UGM  

Aplikasi ini adalah aplikasi yang dibuat menggunakan [Next.js](https://nextjs.org/) melalui [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Bagaimana cara menjalankan aplikasi ini?

1. Pastikan anda sudah menginstall [Git](https://git-scm.com/downloads), [Node.js](https://nodejs.org/en/) dan [pnpm](https://pnpm.io/) pada device yang akan menjalankan server aplikasi ini.

2. Clone repository ini dengan cara menjalankan perintah berikut pada terminal anda:

```bash
git clone https://github.com/farrelaby/ebt-dashboard
```

3. Masuk ke dalam folder repository yang sudah anda clone dengan cara menjalankan perintah berikut pada terminal anda:

```bash
cd ebt-dashboard
```

4. Install semua dependencies yang dibutuhkan dengan cara menjalankan perintah berikut pada terminal anda:

```bash
pnpm install
```
5. Buat file `.env` yang berisikan variabel bernama `DATABASE_URL` dengan isi variabel berupa URL dari database sistem sensor outdoor. Hal ini perlu dilakukan agar dapat menjalankan bagian `efisiensi` dari dashboard ini dengan baik.

6. Jalankan perintah berikut untuk membuat instance database agar prisma dapat berjalan dengan baik:

```bash
pnpm exec prisma generate
```

7. Jalankan aplikasi dengan cara menjalankan perintah berikut pada terminal anda:

```bash
# Untuk menjalankan di mode development
pnpm dev

# Untuk menjalankan di mode production
pnpm build
pnpm start
```

8. Buka [http://localhost:3000](http://localhost:3000) dengan browser anda untuk melihat hasilnya.

9. Untuk menghentikan aplikasi, tekan `Ctrl + C` pada terminal anda.

## Bagaimana cara berkontribusi atau jika ingin melakukan pengembangan lebih lanjut?

1. Fork repository ini dengan cara klik tombol fork pada pojok kanan atas halaman ini.

2. Clone repository hasil fork anda dengan cara menjalankan perintah berikut pada terminal anda:

```bash
git clone #link repository hasil fork anda
```

> Forking dilakukan agar anda dapat melakukan perubahan/pengembangan pada aplikasi ini tanpa harus melakukan perubahan langsung pada repository ini.

### Pre-requisites pengembangan lebih lanjut
Berikut adalah beberapa hal yang perlu dipersiapkan sebelum melakukan pengembangan aplikasi ini lebih lanjut:

Core Knowledge:
- [Git](https://git-scm.com/)
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Next.js](https://nextjs.org/) (pages directory)



Important Additional Libraries & Tools:
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/latest/docs/react/overview) + [Axios](https://axios-http.com/docs/intro)
- [ApexCharts](https://apexcharts.com/docs/react-charts/)
- [Prisma](https://www.prisma.io/)

## Struktur folder
```
ebt_dashboard
├── prisma/
├── public/*
├── src/*
├── Dockerfile
├── package.json
├── pnpm-lock.yaml
├── next.config.js
├── tsconfig.json
├── postcss.config.js
├── tailwind.config.js
└── .env**

* Disaranakan untuk hanya melakukan perubahan pada folder/file ini
** File ini tidak ada pada repository ini (untuk alasan keamanan), namun perlu dibuat untuk menjalankan aplikasi ini secara utuh
```

### Folder `prisma`
Folder ini berisi file `schema.prisma` yang berisikan schema dari salah satu database yang digunakan pada aplikasi ini, yaitu database sistem sensor heb. Tidak disarankan untuk mengubah schema dari database ini, namun jika anda ingin mengubah schema dari database ini, anda dapat mengubah file `schema.prisma` ini.

### Folder `public`
Folder ini berisi file-file seperti gambar dan logo yang digunakan pada aplikasi ini. Jika anda ingin menambahkan file-file seperti gambar dan logo, anda dapat menambahkan file-file tersebut pada folder ini.

### Folder `src`
Folder ini berisi source code dari aplikasi ini. Untuk informasi lebih lanjut mengenai folder ini, anda dapat membaca [README.md ini](src/README.md).

### File `Dockerfile`
File ini berisi konfigurasi untuk membuat image docker untuk deployment dari aplikasi ini. File ini tidak perlu diubah jika anda tidak ingin melakukan perubahan pada aplikasi ini.

### File `package.json` & `pnpm-lock.yaml`
File ini berisi konfigurasi untuk package manager yang digunakan pada aplikasi ini. File ini tidak perlu diubah jika anda tidak ingin melakukan perubahan pada aplikasi ini.

### File `next.config.js`
File ini berisi konfigurasi Next.js untuk aplikasi ini. File ini tidak perlu diubah jika anda tidak ingin melakukan perubahan pada aplikasi ini.

### File `tsconfig.json`
File ini berisi konfigurasi TypeScript untuk aplikasi ini. File ini tidak perlu diubah jika anda tidak ingin melakukan perubahan pada aplikasi ini.

### File `postcss.config.js`
File ini berisi konfigurasi PostCSS untuk keperluan Tailwind CSS yang digunakan didalam aplikasi ini. File ini tidak perlu diubah jika anda tidak ingin melakukan perubahan pada aplikasi ini.

### File `tailwind.config.js`
File ini berisi konfigurasi Tailwind CSS untuk aplikasi ini. File ini tidak perlu diubah jika anda tidak ingin melakukan perubahan pada aplikasi ini.

### File `.env`
File ini berisi variabel-variabel yang dibutuhkan untuk menjalankan aplikasi ini. File ini tidak ada pada repository ini (untuk alasan keamanan), namun perlu dibuat untuk menjalankan aplikasi ini secara utuh (untuk keperluan menerima data dari sistem sensor luar).