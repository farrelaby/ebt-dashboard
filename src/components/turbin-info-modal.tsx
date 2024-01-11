import { Modal, Box, Typography, Divider } from "@mui/material";

import Image from "next/image";
import { useState } from "react";

export default function TurbinInfoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [page, setPage] = useState(1);
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white text-black border-2 rounded-md">
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="font-semibold"
        >
          Informasi Tambahan Turbin Angin
        </Typography>
        <Divider />

        <ul className="pt-4 list-disc px-8">
          {page === 1 && <PageOne />}
          {page === 2 && <PageTwo />}
        </ul>

        <div className="flex flex-row gap-4 pt-4 pr-4 justify-end">
          {page > 1 && (
            <button
              type="button"
              className=" p-2 bg-slate-300 rounded"
              onClick={() => setPage(page - 1)}
            >
              <Image
                src="/arrow-right.svg"
                alt=""
                width={20}
                height={20}
                className="rotate-180"
              />
            </button>
          )}

          <button
            type="button"
            className={` p-2 bg-slate-300 rounded ${page != 1 && "invisible"}`}
            onClick={() => setPage(page + 1)}
          >
            <Image src="/arrow-right.svg" alt="" width={20} height={20} />
          </button>
        </div>
      </Box>
    </Modal>
  );
}

function PageOne() {
  return (
    <>
      <li>
        <p>
          Sistem ini merupakan sistem monitoring yang digunakan untuk memantau
          turbin angin yang terletak di{" "}
          <b>Laboratorium Energi Terbarukan DTNTF UGM</b>
        </p>
      </li>
      <li>
        <p>Skema sederhana dari sistem monitoring ini adalah sebagai berikut</p>
      </li>
      <Image
        src="/flow-turbin.png"
        unoptimized
        alt="Solar Panel"
        width={800}
        height={550}
      />
    </>
  );
}

function PageTwo() {
  return (
    <>
      <li>Spesifikasi Turbin Angin</li>
      <Image
        src="/spek-turbin.png"
        unoptimized
        alt="Solar Panel"
        width={400}
        height={450}
      />
    </>
  );
}
