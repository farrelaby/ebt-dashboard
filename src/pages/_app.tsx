import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { SolarHeader, WindHeader } from "@/components/headers";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Layout>
        <>
          {router.pathname.startsWith("/panel-surya") && <SolarHeader />}
          {router.pathname.startsWith("/turbin-angin") && <WindHeader />}
          <Component {...pageProps} />
        </>
      </Layout>
    </>
  );
}
