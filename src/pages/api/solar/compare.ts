import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { SERVER_EBT_URL } from "@/configs/url";
import { twoDecimalPlaces } from "@/utils";

type FetchData = {
  db_created_at: string;
  value: {
    client_id: number;
    send_to_db_at: string;
    processing_time: string;
    voltage: number;
    current: number;
    power: number;
    energy: number;
    power_factor?: number;
  };
}[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const device = req.query.device;
  const parameter = req.query.parameter;
  const date = req.query.date;

  if (!device || !date || !parameter) {
    return res.status(400).send("Bad Request");
  }

  try {
    const fetch = await axios.get(
      `${SERVER_EBT_URL}/ebt/harian?data=surya${device}&waktu=${date}`
    );

    const data: FetchData = fetch.data.value;

    //   console.log(data);
    let newObject;

    if (parameter === "daya") {
      newObject = data?.map((data) => {
        return {
          date: data.db_created_at,

          power:
            data.value.power !== null
              ? twoDecimalPlaces(data.value.power)
              : data.value.power,
        };
      });
    } else if (parameter === "arus") {
      newObject = data?.map((data) => {
        return {
          date: data.db_created_at,

          current:
            data.value.current !== null
              ? twoDecimalPlaces(data.value.current)
              : data.value.current,
        };
      });
    } else if (parameter === "tegangan") {
      newObject = data?.map((data) => {
        return {
          date: data.db_created_at,

          voltage:
            data.value.voltage !== null
              ? twoDecimalPlaces(data.value.voltage)
              : data.value.voltage,
        };
      });
    }

    const resData = newObject?.map((data) => Object.values(data));

    // console.log(resData);

    return res.send(resData);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
}
