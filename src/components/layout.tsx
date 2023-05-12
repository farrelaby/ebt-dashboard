import Navbar from "./navbar";
import { useState } from "react";

import { useRouter } from "next/router";
import { SolarHeader, WindHeader } from "@/components/headers";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  return (
    <>
      <Navbar
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      />

      <main
        className={` pr-10 ${
          isOpen ? "pl-72 blur-sm " : "pl-32"
        } duration-200 bg-[#fafafa]`}
      >
        {router.pathname.startsWith("/panel-surya") && <SolarHeader />}
        {router.pathname.startsWith("/turbin-angin") && <WindHeader />}
        {children}
      </main>
    </>
  );
}
