import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  RealData,
  DailyData,
  MonthlyData,
  YearlyData,
  OutdoorSolarData,
} from "@/types/types";

import { format, getMonth, getYear } from "date-fns";

import { SERVER_EBT_URL, SERVER_HEB_URL } from "@/configs/url";

export const useSolarFetch = (
  device: "suryaAC" | "suryaDC",
  dailyDate: Date | null,
  monthlyDate: Date | null,
  yearlyDate: Date | null
) =>
  useQueries({
    queries: [
      {
        queryKey: ["realData", { data: device }],
        queryFn: async () => {
          const res = await axios.get(`${SERVER_EBT_URL}/ebt?data=${device}`);
          // console.log(res.data.value[4]);
          return res.data.value as RealData[];
        },
        // select: (data: RealData[]) => data[4],
      },
      {
        queryKey: [
          "dailyData",
          { data: device, waktu: format(dailyDate as Date, "yyyy-MM-dd") },
        ],
        queryFn: async () => {
          const res = await axios.get(
            `${SERVER_EBT_URL}/ebt/harian?data=${device}&waktu=${format(
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
            data: device,
            bulan: getMonth(monthlyDate as Date) + 1,
            tahun: getYear(monthlyDate as Date),
          },
        ],
        queryFn: async () => {
          const res = await axios.get(
            `${SERVER_EBT_URL}/ebt/akumulasi/harian/${device}?bulan=${
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
            data: device,
            tahun: getYear(yearlyDate as Date),
          },
        ],
        queryFn: async () => {
          const res = await axios.get(
            `${SERVER_EBT_URL}/ebt/akumulasi/bulanan/${device}?tahun=${getYear(
              yearlyDate as Date
            )}`
          );
          return res.data.value as YearlyData[];
        },
      },
      {
        queryKey: [
          "outdoorSolarData",
          { tanggal: format(dailyDate as Date, "yyyy-MM-dd") },
        ],
        queryFn: async () => {
          const res = await axios.get(
            `/api/solar?tanggal=${format(
              dailyDate as Date,
              "yyyy-MM-dd"
            )}`
          );
          return res.data as OutdoorSolarData[];
        },
      },
    ],
  });

export const useOutdoorSolarFetch = () => {
  const data = useQuery({
    queryKey: ["latestOutdoorSolarData"],
    queryFn: async () => {
      const res = await axios.get(`${SERVER_HEB_URL}/site/outdoor/solar_power
      `);
      return res.data;
    },
  });
  return data;
};
