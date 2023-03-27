import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { SolarHeader, WindHeader } from "@/components/headers";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Layout>
          <>
            {router.pathname.startsWith("/panel-surya") && <SolarHeader />}
            {router.pathname.startsWith("/turbin-angin") && <WindHeader />}
            <Component {...pageProps} />
          </>
        </Layout>
      </LocalizationProvider>
    </>
  );
}
