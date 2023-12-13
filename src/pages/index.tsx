import Head from "next/head";
import Image from "next/image";
// import { Inter } from "next/font/google";

import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { RealData } from "@/types/types";

import { Skeleton } from "@mui/material";

import { ErrorSnackbar } from "@/components/snackbars";
import { useErrorSnackbar } from "@/hooks/snackbars.hooks";

import { RealChart } from "@/components/charts";

import { useState } from "react";

import terbaru from "../dummies/surya/ac/terbaru.json";

export default function Home() {
  // const [toastOpen, setToastOpen] = useState(false);
  // const toastHandler = {
  //   open: () => setToastOpen(true),
  //   close: () => setToastOpen(false),
  // };
  const { snackbarOpen, snackbarHandler } = useErrorSnackbar();

  const [solarDropdown, setSolarDropdown] = useState("suryaAC");
  const solarDropdownHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSolarDropdown(event.target.value);
  };

  // const [solarReal, windReal] = useQueries({
  //   queries: [
  //     {
  //       queryKey: ["realData", { data: `${solarDropdown}` }],
  //       queryFn: async () => {
  //         const res = await axios.get(
  //           `http://10.46.10.128:5000/ebt?data=${solarDropdown}`
  //         );
  //         return res.data.value as RealData[];
  //       },

  //       onError: () => snackbarHandler.open(),
  //       initialData: terbaru.value,
  //     },
  //     {
  //       queryKey: ["realData", { data: "turbin" }],
  //       queryFn: async () => {
  //         const res = await axios.get(
  //           "http://10.46.10.128:5000/ebt?data=turbin"
  //         );
  //         return res.data.value as RealData[];
  //       },

  //       onError: () => snackbarHandler.open(),
  //       initialData: terbaru.value,
  //     },
  //   ],
  // });

  return (
    <>
      <Head>
        <title>Dashboard EBT</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <ErrorSnackbar toastOpen={snackbarOpen} toastHandler={snackbarHandler} /> */}

      <div className="min-h-screen pb-8 w-full">
        <header className="flex flex-row pl-6">
          <Image src="/home-earth.svg" alt="earth" width={200} height={200} />
          <div className="relative bottom-4">
            <h1 className="text-4xl font-bold pt-16">
              Selamat Datang di Dashboard <br /> Sistem Monitoring EBT
            </h1>
            <p className="pt-5">
              Di sini Anda dapat melihat data terbaru produksi energi yang
              dihasilkan oleh panel surya dan turbin angin yang terletak di
              gedung Departemen Teknik Nuklir dan Teknik Fisika Universitas
              Gadjah Mada (DTNTF UGM).
            </p>
          </div>
        </header>

        <h3 className="text-2xl font-bold text-center pt-8 pb-2 border-b-2">
          <span className="text-[#9747FF]">5</span> Data Terakhir
        </h3>

        <div className="flex flex-row justify-between mt-8">
          <section id="panel-surya">
            <div className="flex flex-row gap-4 justify-center border-b pb-2">
              <h3 className="text-2xl font-semibold ">
                Panel<span className="text-[#9747FF]"> Surya</span>
              </h3>
              <select
                onChange={solarDropdownHandler}
                name=""
                id=""
                className="px-3 border border-gray-300"
              >
                <option value="suryaAC">AC</option>
                <option value="suryaDC">DC</option>
              </select>
            </div>
            <div className="flex flex-col mt-3 gap-4 rounded">
              <RealChart data={terbaru.value} />

              {/* {solarReal.isSuccess ? (
                <RealChart data={solarReal.data} />
              ) : (
                <Skeleton variant="rounded" width={650} height={290} />
              )} */}

              {/* <div className="flex flex-row gap-4 mt-2 justify-center">
                {solarReal.isSuccess ? (
                  <>
                    <OverviewCard
                      value={solarReal?.data[4]?.power}
                      unit="Watt"
                      title="Daya"
                    />
                    <OverviewCard
                      value={solarReal?.data[4]?.energy}
                      unit="Wh"
                      title="Energi"
                    />
                  </>
                ) : (
                  <>
                    <Skeleton variant="rounded" height={128} width={144} />
                    <Skeleton variant="rounded" height={128} width={144} />
                  </>
                )}
              </div> */}
            </div>
          </section>

          <section id="turbin-angin">
            <div className="border-b pb-2">
              <h3 className="text-2xl font-semibold text-center">
                Turbin<span className="text-[#9747FF]"> Angin</span>
              </h3>
            </div>
            <div className="flex flex-col mt-3 gap-4">
              {/* <div className="bg-slate-300 rounded-lg h-96 w-[1080px]"></div> */}
              <RealChart data={terbaru.value} />

              {/* {windReal.isSuccess ? (
                <RealChart data={windReal.data} />
              ) : (
                <Skeleton variant="rounded" width={650} height={290} />
              )} */}
              {/* <div className="flex flex-row gap-4 mt-2 justify-center">
                {windReal.isSuccess ? (
                  <>
                    <OverviewCard
                      value={windReal?.data[4]?.power}
                      unit="Watt"
                      title="Daya"
                    />
                    <OverviewCard
                      value={windReal?.data[4]?.energy}
                      unit="Wh"
                      title="Energi"
                    />
                  </>
                ) : (
                  <>
                    <Skeleton variant="rounded" height={128} width={144} />
                    <Skeleton variant="rounded" height={128} width={144} />
                  </>
                )}
              </div> */}
            </div>
          </section>
        </div>

        {/* <Skeleton variant="rounded" height={160} className="mt-4 " />
        <Skeleton variant="rounded" height={160} className="mt-4 " /> */}
      </div>
    </>
  );
}

// import { twoDecimalPlaces } from "@/utils";

// function OverviewCard({
//   value,
//   unit,
//   title,
// }: {
//   value: number | undefined | null;
//   unit: string;
//   title: string;
// }) {
//   return (
//     <div className="bg-white w-36 h-32 shadow-md flex flex-col place-items-center justify-center rounded-lg">
//       <h4 className="text-4xl font-semibold">
//         {typeof value === "number" ? twoDecimalPlaces(value) : "-"}
//       </h4>
//       <p className="text-lg text-[#A4A6B3]">{unit}</p>
//       <div className="text-lg font-semibold text-[#9747FF]">{title}</div>
//     </div>
//   );
// }
