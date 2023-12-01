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
      color="secondary"
      size="medium"
      style={{
        textTransform: "none",
        backgroundColor: "#9747FF",
        // backgroundColor: "#000000",
      }}
      className="m-2 my-4"
    >
      <div className="flex flex-row gap-2 text-lg">
        <Image src="/download-logo.svg" alt="" width={20} height={20} />
        Download Data Excel/CSV
      </div>
    </Button>
  );
}

export { DownloadButton };
