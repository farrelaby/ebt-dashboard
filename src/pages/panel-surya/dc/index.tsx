import Head from "next/head";
import { useState } from "react";
import { DownloadButton } from "../../../components/button";
import { DownloadModal } from "@/components/modal";
import { Skeleton } from "@mui/material";
import { RealTimeCard } from "@/components/cards";
import { RealData } from "@/types/types";

import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function PanelSuryaDC() {
  const [open, setOpen] = useState(false);

  const realData = useQuery<RealData>({
    queryKey: ["realData", { data: "suryaDC" }],
    queryFn: async () => {
      const res = await axios.get("http://10.46.10.128:5000/ebt?data=suryaDC");
      return res.data.value[4];
    },
    // staleTime: 10000,

    refetchInterval: 10000,
  });

  return (
    <>
      <Head>
        <title>Panel Surya</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Solar-Panel.svg" />
      </Head>
      <div className="pb-8">
        <DownloadButton onClick={() => setOpen(true)} />
        <DownloadModal
          modalTitle="Panel Surya DC"
          open={open}
          onClose={() => setOpen(false)}
        />

        <div className="mt-4 flex flex-col bg-white shadow-md">
          <div className="mx-9 my-10">
            <div className="flex flex-row justify-between">
              <h3 className="text-2xl font-bold">
                <span className="text-[#9747FF]">Real Time</span> Monitoring
              </h3>
              {realData.isSuccess && (
                <p className="italic text-sm">
                  Last updated : {realData.data?.db_created_at}
                </p>
              )}
              {/* <p className="italic">Last updated : {}</p> */}
            </div>
            <div className="mt-9 flex flex-row gap-6 justify-center">
              {realData.isLoading && (
                <>
                  <Skeleton variant="rectangular" width={208} height={288} />
                  <Skeleton variant="rectangular" width={208} height={288} />
                  <Skeleton variant="rectangular" width={208} height={288} />
                  <Skeleton variant="rectangular" width={208} height={288} />
                </>
              )}
              {realData.isError && <p>Error...</p>}
              {realData.isSuccess && (
                <>
                  <RealTimeCard
                    value={realData.data?.voltage}
                    unit="Volt"
                    title="Tegangan"
                  />
                  <RealTimeCard
                    value={realData.data?.current}
                    unit="Ampere"
                    title="Arus"
                  />
                  <RealTimeCard
                    value={realData.data?.power}
                    unit="Watt"
                    title="Daya"
                  />
                  <RealTimeCard
                    value={realData.data?.energy}
                    unit="Watt"
                    title="Energi"
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <Skeleton variant="rounded" height={160} className="mt-4 " />
        <Skeleton variant="rounded" height={160} className="mt-4 " />
      </div>
    </>
  );
}
