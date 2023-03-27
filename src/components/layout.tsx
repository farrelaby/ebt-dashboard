import Navbar from "./navbar";
import { useState } from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      />

      <main
        className={` pr-10 ${isOpen ? "pl-72 blur-sm " : "pl-32"} duration-200`}
      >
        {children}
      </main>
    </>
  );
}
