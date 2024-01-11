import { useRouter } from "next/router";
import { useState, useCallback } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";

import Tabs from "@mui/material/Tabs";

import Image from "next/image";
import { useInfoModal } from "@/hooks/info-modal.hooks";
import SuryaInfoModal from "./surya-info-modal";
import TurbinInfoModal from "./turbin-info-modal";

interface TabRouterValue {
  [key: string]: string;
}
function SolarHeader() {
  const router = useRouter();

  const tabRouterValue: TabRouterValue = {
    "/panel-surya/ac": "1",
    "/panel-surya/dc": "2",
    "/panel-surya/perbandingan": "3",
    "/panel-surya/efisiensi": "4",
  };

  const [tabValue, setTabValue] = useState(tabRouterValue[router.pathname]);

  // const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
  //   setTabValue(newValue);
  // };

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setTabValue(newValue);
    },
    []
  );

  const { infoModalHandler, openModal } = useInfoModal();

  return (
    <header>
      <div className="flex flex-row gap-4 pt-8 pb-4 items-end">
        <h1 className="text-4xl font-bold ">
          Monitoring <span className="text-[#9747FF]">Panel Surya</span>
        </h1>
        <button type="button" onClick={infoModalHandler.open}>
          <Image
            src="/info-circle.svg"
            alt="Solar Panel"
            width={30}
            height={30}
          />
        </button>
      </div>

      <SuryaInfoModal open={openModal} onClose={infoModalHandler.close} />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="lab API tabs example"
          textColor="secondary"
          indicatorColor="secondary"
          centered
          sx={{
            "& .MuiTabs-indicator": {
              // backgroundColor: "#E86826",
              // height: 5,
              // top: 2,
            },
            "& .MuiTab-root.Mui-selected": {
              // color: "#E86826",
              fontWeight: "600",
            },
            "& .MuiTab-root": {
              fontSize: "1rem",
            },
          }}
        >
          <Tab
            onClick={() => router.push("/panel-surya/ac")}
            label="AC"
            value="1"
          />
          <Tab
            onClick={() => router.push("/panel-surya/dc")}
            label="DC"
            value="2"
          />
          <Tab
            onClick={() => router.push("/panel-surya/perbandingan")}
            label="Perbandingan"
            value="3"
          />
          <Tab
            onClick={() => router.push("/panel-surya/efisiensi")}
            label="Efisiensi"
            value="4"
          />
        </Tabs>
      </Box>
      {/* </TabContext>
      </Box> */}
    </header>
  );
}

function WindHeader() {
  // const router = useRouter();

  // const tabRouterValue: TabRouterValue = {
  //   "/turbin-angin": "1",
  //   "/turbin-angin/efisiensi": "2",
  // };

  // const [tabValue, setTabValue] = useState(tabRouterValue[router.pathname]);

  // const handleTabChange = useCallback(
  //   (event: React.SyntheticEvent, newValue: string) => {
  //     setTabValue(newValue);
  //   },
  //   []
  // );

  const { infoModalHandler, openModal } = useInfoModal();

  return (
    <header>
      <div className="flex flex-row gap-4 pt-8 pb-4 items-end">
        <h1 className="text-4xl font-bold ">
          Monitoring <span className="text-[#9747FF]">Turbin Angin</span>
        </h1>
        <button type="button" onClick={infoModalHandler.open}>
          <Image
            src="/info-circle.svg"
            alt="Solar Panel"
            width={30}
            height={30}
          />
        </button>
      </div>
      <TurbinInfoModal open={openModal} onClose={infoModalHandler.close} />
      {/* <p className="pt-5 pb-8">
        Di sini Anda dapat melihat kumpulan data produksi energi yang dihasilkan
        oleh turbin angin yang terletak di gedung Departemen Teknik Nuklir dan
        Teknik Fisika Universitas Gadjah Mada (DTNTF UGM).
      </p> */}
    </header>
  );
}

export { SolarHeader, WindHeader };
