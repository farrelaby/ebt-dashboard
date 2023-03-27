import Image from "next/image";
import { useState } from "react";

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
import { format } from "date-fns";

type DownloadModalProps = {
  open: boolean;
  onClose: () => void;
  modalTitle: "Panel Surya AC" | "Panel Surya DC" | "Turbin Angin";
};

function DownloadModal({ open, onClose, modalTitle }: DownloadModalProps) {
  const [startValue, setStartValue] = useState<Date | null>();
  const [endValue, setEndValue] = useState<Date | null>();
  const [fileFormat, setFileFormat] = useState("csv");

  const deviceParam = {
    "Panel Surya AC": "solarAC",
    "Panel Surya DC": "solarDC",
    "Turbin Angin": "Turbin",
  };

  const handleFormatChange = (event: SelectChangeEvent) => {
    setFileFormat(event.target.value);
  };

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
              onChange={(newValue) => setStartValue(newValue)}
              disableFuture
            />
            <DatePicker
              label="Tanggal Akhir"
              value={endValue}
              onChange={(newValue) => setEndValue(newValue)}
              disableFuture
            />
          </div>
          <h3>Pilih format file</h3>
          <Select value={fileFormat} onChange={handleFormatChange}>
            <MenuItem value="csv">CSV</MenuItem>
            <MenuItem value="xml">XML</MenuItem>
          </Select>
          <div className="flex flex-row gap-4 mt-4 justify-end">
            <div> </div>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              style={{
                textTransform: "none",
                backgroundColor: "#000000",
              }}
              onClick={
                () =>
                  alert(
                    `${modalTitle} | ${
                      deviceParam[modalTitle]
                    } | ${fileFormat} | ${format(
                      startValue as Date,
                      "yyyy-MM-dd"
                    )} | ${format(endValue as Date, "yyyy-MM-dd")}`
                  )
                // to get desired date
                // format(endValue as Date, "yyyy-MM-dd")
              }
            >
              <div className="flex flex-row gap-2">
                <Image src="/download-logo.svg" alt="" width={20} height={20} />
                Download Data
              </div>
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export { DownloadModal };
