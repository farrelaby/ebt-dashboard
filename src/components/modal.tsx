import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

import {
  Modal,
  Box,
  Typography,
  Divider,
  Select,
  SelectChangeEvent,
  MenuItem,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { format, sub } from "date-fns";

import { SERVER_EBT_URL } from "@/configs/url";

type DownloadModalProps = {
  open: boolean;
  onClose: () => void;
  modalTitle: "Panel Surya AC" | "Panel Surya DC" | "Turbin Angin";
};

function DownloadModal({ open, onClose, modalTitle }: DownloadModalProps) {
  const [startValue, setStartValue] = useState<Date | null>(
    sub(new Date(), { days: 1 })
  );
  const [endValue, setEndValue] = useState<Date | null>(new Date());
  const [fileFormat, setFileFormat] = useState("xls");

  const deviceParam = {
    "Panel Surya AC": "suryaAC",
    "Panel Surya DC": "suryaDC",
    "Turbin Angin": "turbin",
  };

  const handleFormatChange = (event: SelectChangeEvent) => {
    setFileFormat(event.target.value);
  };

  // console.log(sub(new Date(), { days: 1 }));

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white text-black border-2 rounded-md">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Download Data {modalTitle}
        </Typography>
        <Divider />
        <div className="flex flex-col mt-2">
          <h3>Pilih rentang waktu</h3>
          <div className="flex flex-row mt-4 gap-4">
            <DatePicker
              label="Tanggal Mulai"
              value={startValue}
              defaultValue={sub(new Date(), { days: 1 })}
              onChange={(newValue) => setStartValue(newValue)}
              disableFuture
              views={["year", "month", "day"]}
            />
            <DatePicker
              label="Tanggal Akhir"
              value={endValue}
              defaultValue={new Date()}
              onChange={(newValue) => setEndValue(newValue)}
              disableFuture
              views={["year", "month", "day"]}
            />
          </div>
          <h3>Pilih format file</h3>
          <Select value={fileFormat} onChange={handleFormatChange}>
            <MenuItem value="xls">XLS (Excel Spreadsheet)</MenuItem>
            <MenuItem value="csv">CSV (Comma Separated Value)</MenuItem>
          </Select>
          <div className="flex flex-row gap-4 mt-4 justify-end">
            {/* http://10.46.10.128:5000/ebt/download/report/csv?data=suryaDC&from=2023-02-21&to=2023-02-25 */}
            <Link
              href={`${SERVER_EBT_URL}/ebt/download/report/${fileFormat}?data=${
                deviceParam[modalTitle]
              }&from=${format(startValue as Date, "yyyy-MM-dd")}&to=${format(
                endValue as Date,
                "yyyy-MM-dd"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="contained"
                color="primary"
                size="medium"
                style={{
                  textTransform: "none",
                  backgroundColor: "#000000",
                }}
                // onClick={
                //   () =>
                //     alert(
                //       `${modalTitle} | ${
                //         deviceParam[modalTitle]
                //       } | ${fileFormat} | ${format(
                //         startValue as Date,
                //         "yyyy-MM-dd"
                //       )} | ${format(endValue as Date, "yyyy-MM-dd")}`
                //     )
                //   // to get desired date
                //   // format(endValue as Date, "yyyy-MM-dd")
                // }
              >
                <div className="flex flex-row gap-2">
                  <Image
                    src="/download-logo.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                  Download Data
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export { DownloadModal };
