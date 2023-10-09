import type { NextApiRequest, NextApiResponse } from "next";
import {
  OutdoorSolarData,
  OutdoorSolarEfficiencyData,
  DailyData,
} from "@/types/types";
import Cors from "cors";

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

  const fetch = await prisma.value.findMany({
    where: {
      sensorId: "fa9c9a3a-8768-48f3-a184-5686cba421fe",
    },
    orderBy: {
      created_at: "desc",
    },
    take: 1,
  });

  console.log(fetch);

  return res.status(200).send(fetch);
}
