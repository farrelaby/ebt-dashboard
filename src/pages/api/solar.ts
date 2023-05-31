import type { NextApiRequest, NextApiResponse } from "next";
import { OutdoorSolarData } from "@/types/types";

import { prisma } from "./db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tanggal } = req.query;

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

    const data: OutdoorSolarData[] = await prisma.$queryRawUnsafe(
      `SELECT *
from Value
where sensorId = 'fa9c9a3a-8768-48f3-a184-5686cba421fe'
and DATE_FORMAT(created_at , '%Y-%m-%d') = ?
and MINUTE(created_at) % 5 = 0`,
      tanggal
    );

    const responseData: OutdoorSolarData[] = [];

    data.map((data) => {
      // const power = data.value * luasPanel;
      // const power = data.value;
      responseData.push({
        created_at: data.created_at,
        value: data.value,
      });
    });

    // At this point, `responseData` has the unit of Watt, derived from the W/m2 value from `data` multiplied with the panel area

    res.status(200).send(responseData);
    // res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
