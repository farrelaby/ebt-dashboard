import type { NextApiRequest, NextApiResponse } from "next";
import {
  OutdoorSolarData,
  OutdoorSolarEfficiencyData,
  DailyData,
} from "@/types/types";
import Cors from "cors";
import axios from "axios";

import { twoDecimalPlaces } from "@/utils";
import {
  format,
  sub,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

import { prisma } from "../db";

const cors = Cors({
  methods: ["GET", "HEAD"],
  origin: "*",
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  const { tanggal } = req.query;
  const dayBefore = format(
    sub(new Date(tanggal as string), { days: 1 }),
    "yyyy-MM-dd"
  );

  const panelVar = {
    panjang_mm: 1956,
    lebar_mm: 990,
    jumlah: 3,
  };

  const luasPanel =
    (panelVar.panjang_mm * panelVar.lebar_mm * panelVar.jumlah) / 1_000_000;

  try {
    // console.time("serial");
    const panelFetch = await axios
      .get(`http://10.46.10.128:5000/ebt/harian?data=suryaAC&waktu=${tanggal}`)
      .then((response) => response.data.value as DailyData[]);

    let panelData;

    // console.log(panelData);

    // const data: OutdoorSolarData[] = await prisma.$queryRaw`SELECT *
    //   from Value
    //   where sensorId = 'fa9c9a3a-8768-48f3-a184-5686cba421fe'
    //   and DATE_FORMAT(created_at , '%Y-%m-%d') = ${tanggal}
    //   and MINUTE(created_at) % 5 = 0`;

    const outdoorFetch = await prisma.$queryRawUnsafe<OutdoorSolarData[]>(
      `SELECT *
      from Value v
      where sensorId = 'fa9c9a3a-8768-48f3-a184-5686cba421fe' and (created_at BETWEEN '${dayBefore} 17:00:00' AND '${tanggal} 17:00:00') and MINUTE(created_at) % 5 = 0`
    );
    // console.timeEnd("serial");
    let outdoorData;

    // const dayBeforeSQL = `'${dayBefore} 17:00:00'`;
    // const tanggalSQL = `'${tanggal} 17:00:00'`;

    // const outdoorData = await prisma.$queryRaw<OutdoorSolarData[]>`SELECT *
    // from Value v
    // where sensorId = 'fa9c9a3a-8768-48f3-a184-5686cba421fe' and (created_at BETWEEN ${dayBeforeSQL} AND ${tanggalSQL}) and MINUTE(created_at) % 5 = 0`;
    // console.log(outdoorData);

    console.time("paralel");
    const [panel, outdoor] = await Promise.allSettled([
      panelFetch,
      outdoorFetch,
    ]);
    if (panel.status == "fulfilled") {
      //   console.log(panel.value);
      panelData = panel.value;
    } else {
      return res.status(500).send("Server Error");
    }

    if (outdoor.status == "fulfilled") {
      //   console.log(panel.value);
      outdoorData = outdoor.value;
    } else {
      return res.status(500).send("Server Error");
    }
    console.timeEnd("paralel");

    // console.log(panelData);

    const panelPower = panelData.map((data) => {
      return {
        timestamp: data.db_created_at,
        power: twoDecimalPlaces(data.value.power),
      };
    });

    const outdoorPower = outdoorData.map((data) => {
      return {
        timestamp: data.created_at,
        power: twoDecimalPlaces(data.value * luasPanel),
      };
    });

    // console.log(panelPower);
    // console.log(outdoorPower);

    const alignedData: OutdoorSolarEfficiencyData[] = [];
    let maxPower: number;

    panelPower.map((data) => {
      // console.log(outdoorPower[0]);
      // console.log(new Date(data.timestamp));

      for (let i = 0; i < outdoorPower.length; i++) {
        const timeDiff = Math.abs(
          differenceInMinutes(
            new Date(data.timestamp),
            outdoorPower[i].timestamp as Date
          )
        );
        // console.log(`timeDiff: ${timeDiff}`);
        // console.log({
        //   timestamp: new Date(data.timestamp),
        //   outdoor_timestamp: outdoorPower[i].timestamp,
        //   timeDiff,
        // });
        if (timeDiff < 4) {
          alignedData.push({
            timestamp: new Date(data.timestamp),
            // outdoor_timestamp: outdoorPower[i].timestamp,
            panel_power: data.power,
            outdoor_power: outdoorPower[i].power,
            efficiency: twoDecimalPlaces(
              (data.power * 100) / outdoorPower[i].power
            ),
          });
          break;
        } else {
          continue;
        }
        // else {
        //   console.log(`timeDiff: ${timeDiff}`);
        //   console.log({
        //     timestamp: new Date(data.timestamp),
        //     outdoor_timestamp: outdoorPower[i].timestamp,
        //   });
        // }
      }

      // panelPower.shift();
      outdoorPower.shift();
      // console.log(timeDiff);
    });

    // console.log(alignedData);

    // const responseData: OutdoorSolarEfficiencyData[] = [];

    // outdoorData.map((data) => {
    //   const power = data.value * luasPanel;
    //   // const power = data.value;
    //   responseData.push({
    //     created_at: data.created_at as string,
    //     // irradiance: data.value,
    //     irradiance_power: twoDecimalPlaces(power),
    //   });
    // });
    // // console.log(responseData);

    // // At this point, `responseData` has the unit of Watt, derived from the W/m2 value from `data` multiplied with the panel area
    // console.log(responseData.length);
    // if (responseData.length > panelData.length) {
    //   responseData.splice(0, responseData.length - panelData.length);
    // }
    // res.status(200).send(responseData);
    return res.status(200).send(alignedData);

    // res.status(200).send(data);
  } catch (error) {
    // console.log(error);
    return res.status(500).send(error);
  }
}
