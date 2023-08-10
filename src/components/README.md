# Selamat datang di folder `components`

Folder ini berisi komponen-komponen `React` yang digunakan pada aplikasi ini.
Komponen-komponen ini dibuat dengan menggunakan `React-TypeScript` dan `Tailwind CSS`.

## Apa saja isi dari `components`?
Terdapat 7 files didalam folder ini, yaitu:

- `button.tsx` : file ini berisi komponen `Button` yang digunakan pada aplikasi ini. Satu-satunya komponen yang terdapat didalam file ini adalah `DownloadButton` yang digunakan untuk menampilkan tombol download pada halaman `Dashboard`.
- `cards.tsx` : file ini berisi komponen `Card` yang digunakan pada aplikasi ini. Komponen yang terdapat didalam file ini adalah `RealTimeCard`yang digunakan untuk menampilkan data terbaru pada halaman `Dashboard`.
- `chart.tsx` : file ini berisi komponen-komponen grafik yang digunakan pada aplikasi ini. Komponen-komponen yang terdapat dalam file ini adalah `RealChart`, `EnergyDailyChart`, `EnergyMonthlyChart`, `EnergyYearlyChart`, dan `EfficiencyChart`. Pada tiap komponen terdapat pula proses transformasi data yang diperlukan bagi tiap komponen grafik karena kebutuhan dari jenis bentuk data tiap komponen berbeda.
- `headers.tsx` : file ini berisi komponen-komponen `Header`yang berfungsi untuk menampilkan informasi singkat mengenai laman `/panel-surya/*` dan `/panel-angin/*`. Komponen-komponen yang terdapat dalam file ini adalah `SolarHeader` dan `WindHeader`.
- `layout.tsx` : file ini berisi komponen `Layout` yang berfungsi sebagai layout utama dari aplikasi ini. Didalam komponen ini terdapat `Header` dan `Navbar` yang akan ditampilkan pada setiap halaman.
- `modals.tsx` : file ini berisi komponen `DownloadModal` yang berfungsi sebagai modal yang akan ditampilkan pada halaman `Dashboard` untuk fungsi download data mentah. Modal akan muncul ketika `DownloadButton` ditekan didalam `Dashboard`.
- `navbar.tsx` : file ini berisi komponen `Navbar` yang berfungsi sebagai navigasi utama dari aplikasi ini. Didalam komponen ini terdapat `Link` yang akan mengarahkan pengguna ke halaman yang dituju.