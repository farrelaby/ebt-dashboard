import Head from "next/head";
import { useState, useCallback, useEffect, useRef } from "react";
import { format } from "date-fns";

import { ErrorSnackbar } from "@/components/snackbars";
import { useErrorSnackbar } from "@/hooks/snackbars.hooks";

import { Skeleton } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers";

import { ComparisonChart } from "@/components/charts";
import { DailyData, OutdoorSolarData, RealData } from "@/types/types";

import axios from "axios";
import { useQuery, useQueries } from "@tanstack/react-query";
import { SERVER_EBT_URL } from "@/configs/url";

import terbaru from "@/dummies/surya/ac/terbaru.json";
import dayaAc from "@/dummies/surya/perbandingan/daya/ac.json";
import dayaDc from "@/dummies/surya/perbandingan/daya/dc.json";
import teganganAc from "@/dummies/surya/perbandingan/tegangan/ac.json";
import teganganDc from "@/dummies/surya/perbandingan/tegangan/dc.json";
import arusAc from "@/dummies/surya/perbandingan/arus/ac.json";
import arusDc from "@/dummies/surya/perbandingan/arus/dc.json";

import { realTimeCardItems } from "@/utils";

export default function PerbandinganAcDc() {
  // const { snackbarOpen, snackbarHandler } = useErrorSnackbar();

  const [compareParameter, setCompareParameter] = useState<string>("daya");

  const [powerDate, setPowerDate] = useState<Date | null>(
    new Date("2023-06-10T23:59:58")
  );
  const [dailyDate, setDailyDate] = useState<Date | null>(new Date());
  const [monthlyDate, setMonthlyDate] = useState<Date | null>(new Date());
  const [yearlyDate, setYearlyDate] = useState<Date | null>(new Date());

  const changeDate = {
    power: useCallback((date: Date | null) => setPowerDate(date), []),
    daily: useCallback((date: Date | null) => setDailyDate(date), []),
    monthly: useCallback((date: Date | null) => setMonthlyDate(date), []),
    yearly: useCallback((date: Date | null) => setYearlyDate(date), []),
  };

  // const realData = useQuery({
  //   queryKey: ["realData", { data: "suryaAC" }],
  //   queryFn: async () => {
  //     const res = await axios.get(`${SERVER_EBT_URL}/ebt?data=suryaAC`);

  //     return res.data.value as RealData[];
  //   },
  // });

  // const [dataAC, dataDC] = useQueries({
  //   queries: [
  //     {
  //       queryKey: [
  //         "AC",
  //         compareParameter,
  //         format(powerDate as Date, "yyyy-MM-dd"),
  //       ],
  //       queryFn: async () => {
  //         const res = await axios.get(
  //           `/api/solar/compare?device=AC&parameter=${compareParameter}&date=${format(
  //             powerDate as Date,
  //             "yyyy-MM-dd"
  //           )}`
  //         );
  //         return res.data;
  //       },
  //     },
  //     {
  //       queryKey: [
  //         "DC",
  //         compareParameter,
  //         format(powerDate as Date, "yyyy-MM-dd"),
  //       ],
  //       queryFn: async () => {
  //         const res = await axios.get(
  //           `/api/solar/compare?device=DC&parameter=${compareParameter}&date=${format(
  //             powerDate as Date,
  //             "yyyy-MM-dd"
  //           )}`
  //         );
  //         return res.data;
  //       },
  //     },
  //   ],
  // });

  const [dataAC, setDataAC] = useState<(string | number)[][]>([]);
  const [dataDC, setDataDC] = useState<(string | number)[][]>([]);

  useEffect(() => {
    if (compareParameter === "daya") {
      setDataAC(dayaAc);
      setDataDC(dayaDc);
    } else if (compareParameter === "tegangan") {
      setDataAC(teganganAc);
      setDataDC(teganganDc);
    } else if (compareParameter === "arus") {
      setDataAC(arusAc);
      setDataDC(arusDc);
    }
  }, [compareParameter]);

  return (
    <>
      <Head>
        <title>Panel Surya</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Solar-Panel.svg" />
      </Head>

      {/* <ErrorSnackbar toastOpen={snackbarOpen} toastHandler={snackbarHandler} /> */}

      <div className="pb-8 pt-4">
        <section
          id="daya-jam"
          className="mt-2 flex flex-col bg-white shadow-md rounded-3xl  "
        >
          <div className="mx-6 mt-4">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-2">
                <div className="text-2xl font-bold flex flex-row gap-2 items-center">
                  <p>Perbandingan</p>
                  <Select
                    value={compareParameter}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      fontSize: "1.3rem",
                      "& .MuiInputBase-input": {
                        // borderRadius: 4,
                        position: "relative",
                        // backgroundColor: theme.palette.background.paper,
                        border: "1px solid #9747FF",

                        padding: "10px 26px 10px 12px",
                      },
                      "&:focus": {
                        borderColor: "#9747FF",
                      },
                    }}
                    onChange={(e) => setCompareParameter(e.target.value)}
                    variant="outlined"
                  >
                    <MenuItem value="daya">Daya</MenuItem>
                    <MenuItem value="tegangan">Tegangan</MenuItem>
                    <MenuItem value="arus">Arus</MenuItem>
                  </Select>
                  <p className="text-[#9747FF]">AC</p>
                  <p>vs</p>
                  <p className="text-[#9747FF]">DC</p>
                </div>

                <p className="italic bg-[#9747FF] bg-opacity-30 px-2 w-fit rounded font-semibold">
                  Update Terbaru :{" "}
                  <span className="font-bold ">
                    {format(
                      new Date("2023-06-30T23:59:58"),
                      "dd/MM/yyyy HH:mm:ss"
                    )}{" "}
                    WIB
                  </span>
                </p>

                {/* {realData.isSuccess && (
                  <p className="italic text-sm ">
                    Last updated :{" "}
                    {format(
                      new Date(realData.data[4]?.db_created_at),
                      "dd/MM/yyyy HH:mm:ss"
                    )}{" "}
                    WIB
                  </p>
                )} */}
              </div>
              <DatePicker
                label="Masukkan Tanggal"
                value={powerDate}
                views={["year", "month", "day"]}
                defaultValue={new Date()}
                onChange={changeDate.power}
                disableFuture
                format="dd/MM/yyyy"
              />
            </div>
            <div className="mt-3">
              <ComparisonChart
                firstData={dataAC as number[][]}
                secondData={dataDC as number[][]}
                parameter={compareParameter}
              />

              {/* {dataAC.isSuccess && dataDC.isSuccess ? (
                <ComparisonChart
                  firstData={dataAC.data}
                  secondData={dataDC.data}
                  parameter={compareParameter}
                />
              ) : (
                <Skeleton variant="rectangular" width={"100%"} height={435} />
              )} */}
            </div>
          </div>
        </section>

        {/* <Skeleton variant="rounded" height={160} className="mt-4 " />
        <Skeleton variant="rounded" height={160} className="mt-4 " /> */}
      </div>
    </>
  );
}
