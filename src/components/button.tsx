import { Button } from "@mui/material";
import Image from "next/image";

type DownloadButtonProps = {
  onClick: (event: React.MouseEvent) => void;
};

function DownloadButton({ onClick }: DownloadButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      color="primary"
      size="medium"
      style={{
        textTransform: "none",
        backgroundColor: "#000000",
      }}
      className="m-2"
    >
      <div className="flex flex-row gap-2">
        <Image src="/download-logo.svg" alt="" width={20} height={20} />
        Download Data Mentah
      </div>
    </Button>
  );
}

export { DownloadButton };
