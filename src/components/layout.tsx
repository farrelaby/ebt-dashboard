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
      <div className={`pl-32`}>
        <main className={`${isOpen ? " blur-sm duration-200" : ""}`}>
          {children}
        </main>
      </div>
    </>
  );
}
