import { DailyData, MonthlyData, YearlyData } from "@/types/types";

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

function EnergyDailyChart({ data }: { data: DailyData[] }) {
  const y1Data = [20, 40, 60, 80, 90];

  const barData: number[] = [];
  const timestamps: string[] = [];

  data?.map((data) => {
    barData.push(data.value.energy);
    timestamps.push(data.db_created_at);
  });

  const series = [
    {
      name: "Energi",
      data: barData,
      fill: {
        colors: ["#A300D6"],
      },
    },
    { name: "Solar Irradiance", data: y1Data, yAxisIndex: 1 },
  ];

  const maxDataValue = Math.max(Math.max(...y1Data), Math.max(...barData));

  const options = {
    chart: {
      stacked: false,
      zoom: {
        type: "x" as "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom" as "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },

    yaxis: [
      {
        title: {
          text: "Energi (kWh)",
        },
        max: maxDataValue,
      },
      {
        opposite: true,
        title: {
          text: "Solar Irradiance (W/m^2)",
        },
        max: maxDataValue,
      },
    ],
    xaxis: {
      type: "datetime" as "datetime",
      categories: timestamps,
      labels: {
        format: "HH:mm:ss",
        datetimeUTC: false,
      },
    },
    tooltip: {
      shared: true,
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    stroke: {
      width: 2,
    },
  };

  return (
    <>
      <ApexChart
        options={options}
        series={series}
        type="area"
        width={1100}
        height={420}
      />
    </>
  );
}

function EnergyMonthlyChart({ data }: { data: MonthlyData[] }) {
  const barData: number[] = [];
  const timestamps: string[] = [];

  data?.map((data) => {
    barData.push(data.value.sum_harian_energi);
    timestamps.push(data.tanggal);
  });

  const series = [
    {
      name: "Energi",
      data: barData,
    },
  ];

  const options = {
    chart: {
      stacked: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        autoSelected: "zoom" as "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },

    yaxis: [
      {
        title: {
          text: "Energi (kWh)",
        },
      },
    ],
    xaxis: {
      type: "datetime" as "datetime",
      categories: timestamps,
    },
    tooltip: {
      x: {
        format: "ddd, dd/MM/yy",
      },
    },
  };

  return (
    <>
      <ApexChart
        options={options}
        series={series}
        type="bar"
        width={1100}
        height={420}
      />
    </>
  );
}

function EnergyYearlyChart({ data }: { data: YearlyData[] }) {
  const barData: number[] = [];
  const timestamps: string[] = [];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  data?.map((data) => {
    barData.push(data.value.sum_bulanan_energi);
    timestamps.push(monthNames[data.bulan_ke - 1]);
  });

  const series = [
    {
      name: "Energi",
      data: barData,
    },
  ];

  const options = {
    chart: {
      stacked: false,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },

    yaxis: [
      {
        title: {
          text: "Energi (kWh)",
        },
      },
    ],
    xaxis: {
      categories: timestamps,
    },
    tooltip: {
      x: {
        format: "MMMM",
      },
    },
  };

  return (
    <>
      <ApexChart
        options={options}
        series={series}
        type="bar"
        width={1100}
        height={420}
      />
    </>
  );
}

export { EnergyDailyChart, EnergyMonthlyChart, EnergyYearlyChart };
