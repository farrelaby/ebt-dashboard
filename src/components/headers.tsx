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
    "/panel-surya/efisiensi": "3",
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
      <h1 className="text-4xl font-bold pt-16 ">Monitoring Panel Surya</h1>
      <p className="pt-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        fermentum dui vel diam tempor lobortis sit amet quis enim. Aliquam erat
        volutpat. Nam ac ipsum arcu. Proin finibus nisi non consequat
        sollicitudin. Etiam et fermentum neque.
      </p>
      <Box className="pt-6 pb-8" sx={{ width: "100%", typography: "body1" }}>
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
                onClick={() => router.push("/panel-surya/efisiensi")}
                label="Efisiensi"
                value="3"
              />
            </TabList>
          </Box>
        </TabContext>
      </Box>
    </header>
  );
}

function WindHeader() {
  const router = useRouter();

  const tabRouterValue: TabRouterValue = {
    "/turbin-angin": "1",
    "/turbin-angin/efisiensi": "2",
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
      <h1 className="text-4xl font-bold pt-16">Monitoring Turbin Angin</h1>
      <p className="pt-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        fermentum dui vel diam tempor lobortis sit amet quis enim. Aliquam erat
        volutpat. Nam ac ipsum arcu. Proin finibus nisi non consequat
        sollicitudin. Etiam et fermentum neque.
      </p>
      <Box className="pt-6 pb-8" sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="lab API tabs example"
              textColor="secondary"
              indicatorColor="secondary"
            >
              <Tab
                onClick={() => router.push("/turbin-angin")}
                label="Data"
                value="1"
              />
              <Tab
                onClick={() => router.push("/turbin-angin/efisiensi")}
                label="Efisiensi"
                value="2"
              />
            </TabList>
          </Box>
        </TabContext>
      </Box>
    </header>
  );
}

export { SolarHeader, WindHeader };
