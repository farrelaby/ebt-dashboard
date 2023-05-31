import {
  DailyData,
  MonthlyData,
  YearlyData,
  OutdoorSolarData,
  RealData,
} from "@/types/types";

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

function RealChart() {
  const series = [
    {
      name: "Energi",
      data: [20, 40, 60, 80, 90],
      fill: {
        colors: ["#A300D6"],
      },
    },
    {
      name: "Solar Irradiance",
      data: [10, 20, 30, 40, 50],
      yAxisIndex: 1,
      fill: { colors: ["#FFD600"] },
    },
  ];

  // const maxDataValue = Math.max(Math.max(...y1Data), Math.max(...barData));

  const options = {
    chart: {
      stacked: false,
      zoom: {
        type: "x" as "x",
        enabled: false,
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
          text: "Energi (Wh)",
        },
        // max: maxDataValue,
      },
      {
        opposite: true,
        title: {
          text: "Solar Irradiance (W/m^2)",
        },
        // max: maxDataValue,
      },
    ],
    xaxis: {
      type: "datetime" as "datetime",
      categories: ["1", "2", "3", "4", "5"],
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
    <div className="bg-white shadow-md pt-3">
      <ApexChart
        options={options}
        series={series}
        type="line"
        width={950}
        height={360}
      />
    </div>
  );
}

function EnergyDailyChart({
  data,
  outdoorData,
}: {
  data: DailyData[];
  outdoorData: OutdoorSolarData[];
}) {
  // const y1Data = [20, 40, 60, 80, 90];

  // const barData: number[] = [];
  // const timestamps: string[] = [];
  // const y1Data: number[] = [];

  // data?.map((data) => {
  //   barData.push(data.value.energy);
  //   // timestamps.push(data.db_created_at);
  // });

  // outdoorData?.map((data) => {
  //   y1Data.push(data.value);
  //   timestamps.push(data.created_at);
  // });

  const newObject = data?.map((data) => {
    return {
      date: data.db_created_at,
      energy: data.value.energy,
    };
  });

  const barData = newObject?.map((data) => Object.values(data));

  const y1Data = outdoorData?.map((data) => Object.values(data));

  // console.log(tes_data);

  // console.log(y1Data.length, barData.length, timestamps.length);

  // if y1data.length > barData.length, then slice y1data
  // if y1data.length < barData.length, then slice barData

  // if (y1Data.length > barData.length) {
  //   y1Data.splice(0, y1Data.length - barData.length);
  // }

  const series = [
    {
      name: "Energi",
      data: barData as number[][],
      fill: {
        colors: ["#A300D6"],
      },
    },
    {
      name: "Solar Irradiance",
      data: y1Data as number[][],
      yAxisIndex: 1,
      fill: { colors: ["#FFD600"] },
    },
  ];

  // const maxDataValue = Math.max(Math.max(...y1Data), Math.max(...barData));

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
          text: "Energi (Wh)",
        },
        // max: maxDataValue,
      },
      {
        opposite: true,
        title: {
          text: "Solar Irradiance (W/m^2)",
        },
        // max: maxDataValue,
      },
    ],
    xaxis: {
      type: "datetime" as "datetime",
      // categories: timestamps,
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
          text: "Energi (Wh)",
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

export { EnergyDailyChart, EnergyMonthlyChart, EnergyYearlyChart, RealChart };
