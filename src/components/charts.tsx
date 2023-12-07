import {
  DailyData,
  MonthlyData,
  YearlyData,
  OutdoorSolarData,
  RealData,
  OutdoorSolarEfficiencyData,
} from "@/types/types";

import { twoDecimalPlaces } from "@/utils";
import FormatNumber from "@/utils/numFormatter";
import { format } from "date-fns";

import { use, useMemo } from "react";

import dynamic from "next/dynamic";
import { title } from "process";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

function RealChart({ data }: { data: RealData[] }) {
  // console.log(data);

  const newObject = data?.map((data) => {
    return {
      // date: data.db_created_at,
      // energy:
      //   data.energy !== null ? twoDecimalPlaces(data.energy) : data.energy,

      x: data.db_created_at,
      y: data.power !== null ? twoDecimalPlaces(data.power) : data.power,
      additionalInfo: {
        voltage:
          data.voltage !== null ? twoDecimalPlaces(data.voltage) : data.voltage,
        current:
          data.current !== null ? twoDecimalPlaces(data.current) : data.current,
      },
    };
  });

  const timestamps = data?.map((data) => data.db_created_at);
  // console.log(newObject);
  // console.log(timestamps.length);

  const realData = newObject?.map((data) => Object.values(data));

  // console.log(realData);

  const series = [
    {
      name: "Daya",
      // data: realData as number[][],
      data: newObject,
      // fill: {
      //   colors: ["#A300D6"],
      // },
    },
    // {
    //   name: "Solar Irradiance",
    //   data: [10, 20, 30, 40, 50],
    //   yAxisIndex: 1,
    //   fill: { colors: ["#FFD600"] },
    // },
  ];

  // const maxDataValue = Math.max(Math.max(...y1Data), Math.max(...barData));

  const options: ApexCharts.ApexOptions = {
    chart: {
      stacked: false,
      zoom: {
        type: "x" as "x",
        enabled: false,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom" as "zoom",
        tools: {
          download: false,
        },
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
          text: "Daya (W)",
        },
        // max: maxDataValue,
      },
      // {
      //   opposite: true,
      //   title: {
      //     text: "Solar Irradiance (W/m^2)",
      //   },
      //   // max: maxDataValue,
      // },
    ],
    xaxis: {
      type: "datetime" as "datetime",
      // categories: ["1", "2", "3", "4", "5"],
      // categories: timestamps,
      labels: {
        format: "HH:mm:ss",
        datetimeUTC: false,
      },
      title: {
        text: "Waktu",
        style: {
          // fontSize: "15px",
          fontWeight: 600,
        },
        offsetY: 4,
      },
    },

    tooltip: {
      // shared: true,
      // x: {
      //   format: "dd/MM/yy HH:mm",
      // },
      custom: function ({
        seriesIndex,
        dataPointIndex,
        w,
      }: {
        seriesIndex: number;
        dataPointIndex: number;
        w: any;
      }) {
        const data = w.config.series[seriesIndex].data[dataPointIndex];
        return `<div class="bg-white shadow-md ">
        <div class="bg-gray-300 px-3 py-1 flex justify-between text-xs font-semibold">
        <div>${format(new Date(data.x), "dd/MM/yyyy")}</div>
        <div>${format(new Date(data.x), "HH:mm:ss")}</div>
        </div>
        <div class="flex flex-col text-sm p-3">
        <div class="flex flex-row gap-10 justify-between border-b-2">
        <div class="">Daya</div>
        <div class="font-semibold">${FormatNumber(data.y)} W</div>
        </div>
        <div class="flex flex-row gap-10 justify-between border-b-2">
        <div class="">Tegangan</div>
        <div class="font-semibold">${FormatNumber(
          data.additionalInfo.voltage
        )} V</div>
        </div>
        <div class="flex flex-row gap-10 justify-between">
        <div class="">Arus</div>
        <div class="font-semibold">${data.additionalInfo.current} A</div>
        </div>
          
            </div>
            </div>
            `;
      },
    },
    stroke: {
      width: 2,
    },
  };

  return (
    <div className="bg-white shadow-md pt-3 h-72">
      <ApexChart
        options={options}
        series={series}
        type="line"
        width={650}
        height={260}
      />
    </div>
  );
}

export function PowerDailyChart({
  data,
}: // outdoorData,
// dailyDate,
{
  data: DailyData[];
  // outdoorData: OutdoorSolarData[];
  // dailyDate: Date | null;
}) {
  const newObject = data?.map((data) => {
    return {
      // date: data.db_created_at,
      // power:
      //   data.value.power !== null
      //     ? twoDecimalPlaces(data.value.power)
      //     : data.value.power,
      x: data.db_created_at,
      y:
        data.value.power !== null
          ? twoDecimalPlaces(data.value.power)
          : data.value.power,
      additionalInfo: {
        voltage:
          data.value.voltage !== null
            ? twoDecimalPlaces(data.value.voltage)
            : data.value.voltage,
        current:
          data.value.current !== null
            ? twoDecimalPlaces(data.value.current)
            : data.value.current,
      },
    };
  });

  // const y0Data = newObject?.map((data) => Object.values(data));

  // const newOutdoorObject = outdoorData?.map((data) => {
  //   return {
  //     x: data.created_at,
  //     y: data.value,
  //   };
  // });
  // console.log(newOutdoorObject);

  // const y1Data = outdoorData?.map((data) => Object.values(data));

  const series = [
    {
      name: "Daya",
      // data: y0Data as number[][],
      data: newObject,
      fill: {
        colors: ["#A300D6"],
      },
    },
    // {
    //   name: "Solar Irradiance",
    //   // data: y1Data as number[][],
    //   data: newOutdoorObject,
    //   yAxisIndex: 1,
    //   fill: { colors: ["#FFD600"] },
    // },
  ];

  // const maxDataValue = Math.max(Math.max(...y1Data), Math.max(...barData));

  // dailyDate?.setHours(23, 59, 59, 999);

  const options: ApexCharts.ApexOptions = {
    // colors: ["#9747FF"],
    chart: {
      stacked: false,
      zoom: {
        type: "x" as "x",
        enabled: true,
        autoScaleYaxis: true,
      },

      toolbar: {
        autoSelected: "zoom" as "zoom",

        tools: {
          download: false,
        },
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
          text: "Daya (W)",
          style: {
            fontSize: "15px",
            fontWeight: 600,
          },
        },
        // max: maxDataValue,
      },
      // {
      //   opposite: true,
      //   title: {
      //     text: "Solar Irradiance (W/m^2)",
      //   },
      //   // max: maxDataValue,
      // },
    ],
    xaxis: {
      type: "datetime" as "datetime",
      // categories: timestamps,
      labels: {
        format: "HH:mm:ss",
        datetimeUTC: false,
      },
      title: {
        text: "Waktu",
        style: {
          fontSize: "15px",
          fontWeight: 600,
        },
        offsetY: 4,
      },
      // max: dailyDate?.getTime(),
    },
    tooltip: {
      // shared: true,
      // x: {
      //   format: "dd/MM/yy HH:mm",
      // },
      // custom: function ({
      //   series,
      //   seriesIndex,
      //   dataPointIndex,
      //   w,
      // }: {
      //   series: any;
      //   seriesIndex: number;
      //   dataPointIndex: number;
      //   w: any;
      // }) {
      //   let tooltip = '<div class="custom-tooltip">';
      //   tooltip +=
      //     '<span class="series-name">' +
      //     w.globals.seriesNames[seriesIndex] +
      //     "</span>";
      //   tooltip +=
      //     '<span class="value">' +
      //     series[seriesIndex][dataPointIndex] +
      //     "</span>";
      //   console.log(w.globals.initialConfig.series);
      //   if (w.globals.seriesNames[seriesIndex] === "Daya") {
      //     tooltip +=
      //       '<span class="additional-info">Additional info for Daya series</span>';
      //   }
      //   tooltip += "</div>";
      //   return tooltip;
      // },

      custom: function ({
        seriesIndex,
        dataPointIndex,
        w,
        series,
      }: {
        seriesIndex: number;
        dataPointIndex: number;
        w: any;
        series: any;
      }) {
        const data = w.config.series[seriesIndex].data[dataPointIndex];
        return `<div class="bg-white shadow-md ">
        <div class="bg-gray-300 px-3 py-1 flex justify-between text-xs font-semibold">
        <div>${format(new Date(data.x), "dd/MM/yyyy")}</div>
        <div>${format(new Date(data.x), "HH:mm:ss")}</div>
        </div>
        <div class="flex flex-col text-sm p-3">
          <div class="flex flex-row gap-10 justify-between border-b-2">
            <div class="">Daya</div>
            <div class="font-semibold">${FormatNumber(data.y)} W</div>
            </div>
            <div class="flex flex-row gap-10 justify-between border-b-2">
            <div class="">Tegangan</div>
            <div class="font-semibold">${FormatNumber(
              data.additionalInfo.voltage
            )} V</div>
            </div>
            <div class="flex flex-row gap-10 justify-between">
            <div class="">Arus</div>
            <div class="font-semibold">${data.additionalInfo.current} A</div>
            </div>
            </div>
            </div>
            `;
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
        width={"100%"}
        height={420}
      />
    </>
  );
}

function EnergyDailyChart({
  data,
}: // outdoorData,
// dailyDate,
{
  data: DailyData[];
  // outdoorData: OutdoorSolarData[];
  // dailyDate: Date | null;
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
      energy:
        data.value.energy !== null
          ? twoDecimalPlaces(data.value.energy)
          : data.value.energy,
    };
  });

  const y0Data = newObject?.map((data) => Object.values(data));

  // console.log(y0Data);

  // const y1Data = outdoorData?.map((data) => Object.values(data));

  // console.log(y0Data[0][0]);
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
      data: y0Data as number[][],
      fill: {
        colors: ["#A300D6"],
      },
    },
    // {
    //   name: "Solar Irradiance",
    //   data: y1Data as number[][],
    //   yAxisIndex: 1,
    //   fill: { colors: ["#FFD600"] },
    // },
  ];

  // const maxDataValue = Math.max(Math.max(...y1Data), Math.max(...barData));

  // dailyDate?.setHours(23, 59, 59, 999);

  const options: ApexCharts.ApexOptions = {
    // colors: ["#378ffd", "#e6e600"],
    chart: {
      stacked: false,
      zoom: {
        type: "x" as "x",
        enabled: true,
        autoScaleYaxis: true,
      },

      toolbar: {
        autoSelected: "zoom" as "zoom",
        tools: {
          download: false,
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "100%",
        // strokeWidth: 2,

        borderRadius: 5,
        borderRadiusApplication: "end" as "end",
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
      // {
      //   opposite: true,
      //   title: {
      //     text: "Solar Irradiance (W/m^2)",
      //   },
      //   // max: maxDataValue,
      // },
    ],
    xaxis: {
      type: "datetime" as "datetime",
      // categories: timestamps,
      labels: {
        format: "HH:mm:ss",
        datetimeUTC: false,
      },
      title: {
        text: "Waktu",
        style: {
          fontSize: "15px",
          fontWeight: 600,
        },
        offsetY: 4,
      },
      // max: dailyDate?.getTime(),
    },

    tooltip: {
      // shared: true,
      x: {
        format: "dd/MM/yy HH:mm",
      },
      y: {
        formatter: function (value: number) {
          return FormatNumber(value) + " Wh";
        },
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
        type="bar"
        width={"100%"}
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

  const options: ApexCharts.ApexOptions = {
    chart: {
      stacked: false,
      zoom: {
        enabled: false,
      },

      toolbar: {
        autoSelected: "zoom" as "zoom",
        tools: {
          download: false,
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "100%",
        // strokeWidth: 2,
        borderRadius: 5,
        borderRadiusApplication: "end" as "end",
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
      title: {
        text: "Hari",
        style: {
          fontSize: "15px",
          fontWeight: 600,
        },
        offsetY: 4,
      },
    },
    tooltip: {
      x: {
        format: "ddd, dd/MM/yy",
      },
      y: {
        formatter: function (value: number) {
          return FormatNumber(value) + " Wh";
        },
      },
    },
  };

  return (
    <>
      <ApexChart
        options={options}
        series={series}
        type="bar"
        width={"100%"}
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
    barData.push(data.value.sum_bulanan_energi as number);
    timestamps.push(monthNames[data.bulan_ke - 1]);
  });

  const series = [
    {
      name: "Energi",
      data: barData,
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      stacked: false,
      zoom: {
        enabled: false,
      },
      toolbar: {
        tools: {
          download: false,
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "100%",
        // strokeWidth: 2,
        borderRadius: 5,
        borderRadiusApplication: "end" as "end",
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
      categories: timestamps,
      title: {
        text: "Bulan",
        style: {
          fontSize: "15px",
          fontWeight: 600,
        },
        offsetY: 4,
      },
    },
    tooltip: {
      x: {
        format: "MMMM",
      },
      y: {
        formatter: function (value: number) {
          return FormatNumber(value) + " Wh";
        },
      },
    },
  };

  return (
    <>
      <ApexChart
        options={options}
        series={series}
        type="bar"
        width={"100%"}
        height={420}
      />
    </>
  );
}

function EfficiencyChart({ data }: { data: OutdoorSolarEfficiencyData[] }) {
  const efficiencyData: number[] = [];
  const timestamps: Date[] = [];

  data?.map((data) => {
    efficiencyData.push(data.efficiency);
    timestamps.push(data.timestamp as Date);
  });

  const series = [
    {
      name: "Efisiensi",
      data: efficiencyData,
      // fill: {
      //   colors: ["#A300D6"],
      // },
    },
  ];

  // const maxDataValue = Math.max(Math.max(...y1Data), Math.max(...barData));

  const options: ApexCharts.ApexOptions = {
    chart: {
      stacked: false,
      zoom: {
        type: "x" as "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom" as "zoom",
        tools: {
          download: false,
        },
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
          text: "Efisiensi (%)",
        },
        // max: maxDataValue,
      },
      // {
      //   opposite: true,
      //   title: {
      //     text: "Solar Irradiance (W/m^2)",
      //   },
      //   // max: maxDataValue,
      // },
    ],
    xaxis: {
      type: "datetime" as "datetime",
      categories: timestamps,
      labels: {
        format: "HH:mm:ss",
        datetimeUTC: false,
      },
      title: {
        text: "Waktu",
        style: {
          fontSize: "15px",
          fontWeight: 600,
        },
        offsetY: 4,
      },
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
      y: {
        formatter: function (value: number) {
          return FormatNumber(value) + " %";
        },
      },
    },
    stroke: {
      width: 2,
      curve: "smooth" as "smooth",
    },
  };

  return (
    <>
      <ApexChart
        options={options}
        series={series}
        type="line"
        width={"100%"}
        height={420}
      />
    </>
  );
}

export {
  EnergyDailyChart,
  EnergyMonthlyChart,
  EnergyYearlyChart,
  RealChart,
  EfficiencyChart,
};

import { useState, useEffect } from "react";

export function ComparisonChart({
  firstData,
  secondData,
  parameter,
}: {
  firstData: number[][];
  secondData: number[][];
  parameter: string;
}) {
  const [titleText, setTitleText] = useState<string>("");
  const [tooltipUnit, setTooltipUnit] = useState<string>("");

  useEffect(() => {
    if (parameter === "daya") {
      setTitleText("Daya (W)");
      setTooltipUnit("W");
    } else if (parameter === "tegangan") {
      setTitleText("Tegangan (V)");
      setTooltipUnit("V");
    } else if (parameter === "arus") {
      setTitleText("Arus (A)");
      setTooltipUnit("A");
    }
  }, [parameter]);

  const series = [
    {
      name: "AC",
      data: firstData as number[][],
      fill: {
        colors: ["#A300D6"],
      },
    },
    {
      name: "DC",
      data: secondData as number[][],
      yAxisIndex: 1,
      fill: { colors: ["#FFD600"] },
    },
  ];

  const options: ApexCharts.ApexOptions = {
    // colors: ["#9449ff", "#00e396"],
    chart: {
      stacked: false,
      zoom: {
        type: "x" as "x",
        enabled: true,
        autoScaleYaxis: true,
      },

      toolbar: {
        autoSelected: "zoom" as "zoom",
        tools: {
          download: false,
        },
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
          text: titleText,
        },
      },
    ],
    xaxis: {
      type: "datetime" as "datetime",

      labels: {
        format: "HH:mm:ss",
        datetimeUTC: false,
      },
      // title: {
      //   text: "Waktu",
      //   style: {
      //     fontSize: "15px",
      //     fontWeight: 600,
      //   },
      //   offsetY: 30,
      // },
    },

    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
      y: {
        formatter: function (value: number) {
          return FormatNumber(value) + ` ${tooltipUnit}`;
        },
      },
    },
    stroke: {
      width: 2,
    },
  };
  return (
    <ApexChart
      options={options}
      series={series}
      type="area"
      width={"100%"}
      height={420}
    />
  );
}
