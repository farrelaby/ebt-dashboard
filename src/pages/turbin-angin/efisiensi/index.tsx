import Head from "next/head";
import { Skeleton } from "@mui/material";

// ! Deprecataed page soalnya sistem monitoring PLTB tidak bisa mengukur efisiensi
// ! Karena posisi PLTB & anemometer berbeda
// ! Informasi lebih lanjut dapat ditemui di skripsi "RANCANG BANGUN SISTEM PEMANTAUAN EFISIENSI DAYA DC PADA TURBIN ANGIN (Studi Kasus Turbin Angin Sumbu Vertikal Darrieus Tipe H)" karya Dimas Baihaqi Teknik Fisika 2019

export default function TurbinAnginEfisiensi() {
  return (
    <>
      <Head>
        <title>Turbin Angin</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Wind-Turbine.svg" />
      </Head>
      <div className="pb-8">
        {/* <h2>aku Efisiensi angin</h2> */}
        <Skeleton variant="rounded" className="mt-4 h-40" />
        <Skeleton variant="rounded" className="mt-4 h-40" />
      </div>
    </>
  );
}
