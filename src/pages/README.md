# Selamat datang di folder `pages`

Folder ini berisi halaman-halaman yang ada pada aplikasi ini

## Apa saja isi dari `pages`?
- `api/` : folder ini berisi halaman-halaman yang berhubungan dengan API
    - `solar/index.ts`: Endpoint untuk mengambil data intensitas matahari harian yang datanya diambil dari 
    - `solar/efisiensi.ts`: Endpoint untuk mengambil data efisiensi PLTS
- `index.tsx`: halaman utama dari aplikasi ini. File ini akan di render pada [http://localhost:3000](http://localhost:3000)
- `panel-surya/`
    - `ac/index.tsx`: halaman untuk menampilkan data AC PLTS. File ini akan di render pada [http://localhost:3000/panel-surya/ac](http://localhost:3000/panel-surya/ac)
    - `dc/index.tsx`: halaman untuk menampilkan data DC PLTS. File ini akan di render pada [http://localhost:3000/panel-surya/dc](http://localhost:3000/panel-surya/dc)
    - `efisiensi/index.tsx`: halaman untuk menampilkan data efisiensi PLTS. File ini akan di render pada [http://localhost:3000/panel-surya/efisiensi](http://localhost:3000/panel-surya/efisiensi)
- `turbin-angin/`
    - `index.tsx`: halaman untuk menampilkan data PLTB. File ini akan di render pada [http://localhost:3000/turbin-angin](http://localhost:3000/turbin-angin)
    - `efisiensi/index.tsx`: halaman untuk menampilkan data efisiensi PLTB. File ini akan di render pada [http://localhost:3000/turbin-angin/efisiensi](http://localhost:3000/turbin-angin/efisiensi)
- `_app.tsx`: file ini berisi konfigurasi `custom app` untuk aplikasi ini. Informasi lebih lanjut mengenai `custom app` dapat [dicek disini](https://nextjs.org/docs/advanced-features/custom-app)
- `_document.tsx`: file ini berisi konfigurasi untuk dokumen HTML dari aplikasi ini. Informasi lebih lanjut mengenai `custom document` dapat [dicek disini](https://nextjs.org/docs/advanced-features/custom-document)
