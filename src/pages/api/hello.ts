// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// import { prisma } from "@/prismaclient";

type Data = {
  name: string;
};

// create a list of names
const names = ["John", "Jane", "Joe", "Jill", "Jack"];

export default function handler(
  req: NextApiRequest,
  // res: NextApiResponse<Data>
  res: NextApiResponse
) {
  const { anjas } = req.query;

  // res.status(200).json({ name: 'John Doe' })
  // create a response with a random name from the list for each request

  // setTimeout(() => {
  //   res
  //     .status(200)
  //     .json({ name: names[Math.floor(Math.random() * names.length)] });
  // }, 5000);

  // res
  //   .status(200)
  //   .json({ name: names[Math.floor(Math.random() * names.length)] });
  // console.log(prisma.$connect);
  res.send(`Hello ${anjas}`);
}
