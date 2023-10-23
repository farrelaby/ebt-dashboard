import { useRouter } from "next/router";
import { useState, useCallback } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

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

  return (
    <header>
      <h1 className="text-4xl font-bold pt-8">
        Monitoring <span className="text-[#9747FF]">Panel Surya</span>
      </h1>
      {/* <p className="pt-2">
        Di sini Anda dapat melihat kumpulan data produksi energi yang dihasilkan
        oleh panel surya yang terletak di gedung Departemen Teknik Nuklir dan
        Teknik Fisika Universitas Gadjah Mada (DTNTF UGM).
      </p> */}
      <Box className=" py-4" sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="lab API tabs example"
              textColor="secondary"
              indicatorColor="secondary"
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
            </TabList>
          </Box>
        </TabContext>
      </Box>
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

  return (
    <header>
      <h1 className="text-4xl font-bold py-8 ">
        Monitoring <span className="text-[#9747FF]">Turbin Angin</span>
      </h1>
      {/* <p className="pt-5 pb-8">
        Di sini Anda dapat melihat kumpulan data produksi energi yang dihasilkan
        oleh turbin angin yang terletak di gedung Departemen Teknik Nuklir dan
        Teknik Fisika Universitas Gadjah Mada (DTNTF UGM).
      </p> */}
    </header>
  );
}

export { SolarHeader, WindHeader };
