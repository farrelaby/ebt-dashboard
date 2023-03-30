import Head from "next/head";
import { useState } from "react";
import { DownloadButton } from "../../../components/button";
import { DownloadModal } from "@/components/modal";
import { Skeleton } from "@mui/material";

export default function PanelSuryaAC() {
  const [open, setOpen] = useState(false);

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
          modalTitle="Panel Surya AC"
          open={open}
          onClose={() => setOpen(false)}
        />
        {/* <h2>Aku AC</h2> */}

        <Skeleton variant="rounded" className="mt-4 h-40" />
        <Skeleton variant="rounded" className="mt-4 h-40" />
      </div>
    </>
  );
}
