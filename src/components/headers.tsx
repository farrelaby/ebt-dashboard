import { useRouter } from "next/router";
import { useState } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

function SolarHeader() {
  const router = useRouter();

  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <>
      <h1 className="text-4xl font-bold pt-16 ">Monitoring Solar Panel</h1>
      <p className="pt-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        fermentum dui vel diam tempor lobortis sit amet quis enim. Aliquam erat
        volutpat. Nam ac ipsum arcu. Proin finibus nisi non consequat
        sollicitudin. Etiam et fermentum neque.
      </p>
      <Box className="py-10" sx={{ width: "100%", typography: "body1" }}>
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
    </>
  );
}

function WindHeader() {
  const router = useRouter();

  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <>
      <h1 className="text-4xl font-bold pt-16">Monitoring Turbin Angin</h1>
      <p className="pt-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        fermentum dui vel diam tempor lobortis sit amet quis enim. Aliquam erat
        volutpat. Nam ac ipsum arcu. Proin finibus nisi non consequat
        sollicitudin. Etiam et fermentum neque.
      </p>
      <Box className="py-10" sx={{ width: "100%", typography: "body1" }}>
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
                label="AC"
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
    </>
  );
}

export { SolarHeader, WindHeader };
