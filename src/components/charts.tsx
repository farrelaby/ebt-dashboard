import { DailyData, MonthlyData, YearlyData } from "@/types/types";
import { format } from "date-fns";

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

function EnergyDailyChart({ data }: { data: DailyData[] }) {
  // const barData = [10, 20, 30, 40, 50];
  const y1Data = [20, 40, 60, 80, 90];
  // const timestamps = [
  //   "2018-09-19T00:00:00.000Z",
  //   "2018-09-19T01:30:00.000Z",
  //   "2018-09-19T02:30:00.000Z",
  //   "2018-09-19T03:30:00.000Z",
  //   "2018-09-19T04:30:00.000Z",
  // ];
  const barData: number[] = [];
  const timestamps: string[] = [];

  data?.map((data) => {
    barData.push(data.value.energy);
    timestamps.push(data.db_created_at);
    // change the timestamp timezone to GMT+7 and push it to timestamps array without date-fns with format yyyy-MM-dd HH:mm:ss
    // timestamps.push(
    //   utcToZonedTime(data.db_created_at, "Asia/Jakarta").toString()
    // format(
    //   utcToZonedTime(data.db_created_at, "Asia/Jakarta"),
    //   "yyyy-MM-dd HH:mm:ss"
    // )
    // );
  });

  // console.log(timestamps);

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
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
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
      type: "datetime",
      categories: timestamps,
      labels: {
        format: "HH:mm:ss",
        datetimeUTC: false,
      },
      // labels: {
      //   formatter: (value, timestamp) => {
      //     let localTime = addHours(new Date(timestamp), 0);
      //     return format(localTime, "dd/MM/yy HH:mm:ss");
      //   },
      // },
      // min: new Date("2018-09-19T00:00:00.000Z").getTime(),
      // max: new Date("2018-09-19T23:59:00.000Z").getTime(),
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
        type: "x",
        enabled: false,
      },
      toolbar: {
        autoSelected: "zoom",
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
      type: "datetime",
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
        type: "x",
        enabled: false,
      },
      toolbar: {
        autoSelected: "zoom",
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
      //   type: "datetime",
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
