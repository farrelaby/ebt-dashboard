import { useQueries } from "@tanstack/react-query";
import axios from "axios";

import { RealData, DailyData, MonthlyData, YearlyData } from "@/types/types";

import { format, getMonth, getYear } from "date-fns";

import { SERVER_EBT_URL } from "@/configs/url";

// import terbaru from "@/dummies/angin/terbaru.json";
// import harian from "@/dummies/angin/harian.json";
// import bulanan from "@/dummies/angin/bulanan.json";
// import tahunan from "@/dummies/angin/tahunan.json";

export const useWindFetch = (
  dailyDate: Date | null,
  monthlyDate: Date | null,
  yearlyDate: Date | null
) =>
  useQueries({
    queries: [
      {
        queryKey: ["realData", { data: "turbin" }],
        queryFn: async () => {
          const res = await axios.get(`${SERVER_EBT_URL}/ebt?data=turbin`);
          return res.data.value as RealData[];
        },
        // placeholderData: terbaru.value,
      },
      {
        queryKey: [
          "dailyData",
          { data: "turbin", waktu: format(dailyDate as Date, "yyyy-MM-dd") },
        ],
        queryFn: async () => {
          const res = await axios.get(
            `${SERVER_EBT_URL}/ebt/harian?data=turbin&waktu=${format(
              dailyDate as Date,
              "yyyy-MM-dd"
            )}`
          );
          return res.data.value as DailyData[];
        },
        // placeholderData: harian.value,
      },
      {
        queryKey: [
          "monthlyData",
          {
            data: "turbin",
            bulan: getMonth(monthlyDate as Date) + 1,
            tahun: getYear(monthlyDate as Date),
          },
        ],
        queryFn: async () => {
          const res = await axios.get(
            `${SERVER_EBT_URL}/ebt/akumulasi/harian/turbin?bulan=${
              getMonth(monthlyDate as Date) + 1
            }&tahun=${getYear(monthlyDate as Date)}`
          );
          return res.data.value as MonthlyData[];
        },
        // placeholderData: bulanan.value,
      },
      {
        queryKey: [
          "yearlyData",
          {
            data: "turbin",
            tahun: getYear(yearlyDate as Date),
          },
        ],
        queryFn: async () => {
          const res = await axios.get(
            `${SERVER_EBT_URL}/ebt/akumulasi/bulanan/turbin?tahun=${getYear(
              yearlyDate as Date
            )}`
          );
          return res.data.value as YearlyData[];
        },
        // placeholderData: tahunan.value,
      },
    ],
  });
