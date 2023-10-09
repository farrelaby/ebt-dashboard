import type { NextApiRequest, NextApiResponse } from "next";
import { OutdoorSolarData } from "@/types/types";
import Cors from "cors";

import { sub, format } from "date-fns";

import { prisma } from "../db";

const cors = Cors({
  methods: ["GET", "HEAD"],
  origin: "*",
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
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

  // console.log(tanggal, dayBefore);

  // const panelVar = {
  //   panjang_mm: 1956,
  //   lebar_mm: 990,
  //   jumlah: 3,
  // };

  // const luasPanel =
  //   (panelVar.panjang_mm * panelVar.lebar_mm * panelVar.jumlah) / 1_000_000;

  try {
    // const data: OutdoorSolarData[] = await prisma.$queryRaw`SELECT *
    //   from Value
    //   where sensorId = 'fa9c9a3a-8768-48f3-a184-5686cba421fe'
    //   and DATE_FORMAT(created_at , '%Y-%m-%d') = ${tanggal}
    //   and MINUTE(created_at) % 5 = 0`;

    // console.log(sub(new Date(tanggal as string), { days: 1 }));

    // const data = await prisma.$queryRaw<OutdoorSolarData[]>`
    // SELECT *
    // from Value
    // where sensorId = 'fa9c9a3a-8768-48f3-a184-5686cba421fe'
    // and DATE_FORMAT(created_at , '%Y-%m-%d') = ${tanggal}
    // and MINUTE(created_at) % 5 = 0`;

    const data = await prisma.$queryRawUnsafe<OutdoorSolarData[]>(
      `SELECT *
      from Value v 
      where sensorId = 'fa9c9a3a-8768-48f3-a184-5686cba421fe' and (created_at BETWEEN '${dayBefore} 17:00:00' AND '${tanggal} 17:00:00') and MINUTE(created_at) % 5 = 0`
    );

    // * Query data dibuat between H-1 17:00 sampe H 17:00 karena data di server itu waktunya UTC+0.
    // * Tabrakan sama data sensor yang UTC+7(jelek grafiknya).

    // console.log(data);

    const responseData: OutdoorSolarData[] = [];

    data.map((data) => {
      // const power = data.value * luasPanel;
      // const power = data.value;
      const date = data.created_at as Date;
      responseData.push({
        created_at: date,
        value: data.value,
      });
    });

    // At this point, `responseData` has the unit of Watt, derived from the W/m2 value from `data` multiplied with the panel area
    // console.log(responseData);
    res.status(200).send(responseData);

    // res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
