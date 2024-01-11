import { SERVER_EBT_URL } from "@/configs/url";
import { MonthlyData, YearlyData } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format, getMonth, getYear, isSameDay } from "date-fns";

export const useOverviewDataFetch = (
  dailyDate: Date | null,
  device: "suryaAC" | "suryaDC" | "turbin"
) => {
  const dailyEnergy = useQuery({
    queryKey: [
      "dailyEnergy",
      { data: "suryaAC", waktu: format(dailyDate as Date, "yyyy-MM-dd") },
    ],
    queryFn: async () => {
      const res = await axios.get(
        `${SERVER_EBT_URL}/ebt/akumulasi/harian/${device}?bulan=${
          getMonth(dailyDate as Date) + 1
        }&tahun=${getYear(dailyDate as Date)}`
      );
      const resValue = res.data.value as MonthlyData[];
      return resValue.filter((item) =>
        isSameDay(new Date(item.tanggal), dailyDate as Date)
      );
    },
  });

  const monthlyEnergy = useQuery({
    queryKey: ["month", format(dailyDate as Date, "yyyy-MM-dd")],
    queryFn: async () => {
      const res = await axios.get(
        `${SERVER_EBT_URL}/ebt/akumulasi/bulanan/${device}?tahun=${getYear(
          dailyDate as Date
        )}`
      );
      const resValue = res.data.value as YearlyData[];
      return resValue.filter(
        (item) => item.bulan_ke == getMonth(dailyDate as Date) + 1
      );
    },
  });

  return { dailyEnergy, monthlyEnergy };
};
