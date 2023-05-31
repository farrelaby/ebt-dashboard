import { useQueries } from "@tanstack/react-query";
import axios from "axios";

import { RealData, DailyData, MonthlyData, YearlyData } from "@/types/types";

import { format, getMonth, getYear } from "date-fns";

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
          const res = await axios.get(
            `http://10.46.10.128:5000/ebt?data=turbin`
          );
          return res.data.value[4] as RealData;
        },
      },
      {
        queryKey: [
          "dailyData",
          { data: "turbin", waktu: format(dailyDate as Date, "yyyy-MM-dd") },
        ],
        queryFn: async () => {
          const res = await axios.get(
            `http://10.46.10.128:5000/ebt/harian?data=turbin&waktu=${format(
              dailyDate as Date,
              "yyyy-MM-dd"
            )}`
          );
          return res.data.value as DailyData[];
        },
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
            `http://10.46.10.128:5000/ebt/akumulasi/harian/turbin?bulan=${
              getMonth(monthlyDate as Date) + 1
            }&tahun=${getYear(monthlyDate as Date)}`
          );
          return res.data.value as MonthlyData[];
        },
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
            `http://10.46.10.128:5000/ebt/akumulasi/bulanan/turbin?tahun=${getYear(
              yearlyDate as Date
            )}`
          );
          return res.data.value as YearlyData[];
        },
      },
    ],
  });
