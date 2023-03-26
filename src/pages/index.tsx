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
      <div className="min-h-screen">
        <h1 className="text-4xl font-bold pt-16">Ini overview coy</h1>
        <p className="py-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          fermentum dui vel diam tempor lobortis sit amet quis enim. Aliquam
          erat volutpat. Nam ac ipsum arcu. Proin finibus nisi non consequat
          sollicitudin. Etiam et fermentum neque.
        </p>
      </div>
    </>
  );
}
