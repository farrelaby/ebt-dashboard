import Head from "next/head";
// import Image from 'next/image'
import { Inter } from "next/font/google";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* <nav className="min-h-screen w-20 hover:w-40 pr-4 transition-all fixed overflow-hidden bg-[#363740]"></nav> */}
        <h1 className="text-5xl">Tailwind test</h1>
      </main>
    </>
  );
}
