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

      <main className={`pl-32 pr-10 ${isOpen ? " blur-sm duration-200" : ""}`}>
        {children}
      </main>
    </>
  );
}
