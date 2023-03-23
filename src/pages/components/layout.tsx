import Navbar from "./navbar";

type LayoutProps = {
  children: JSX.Element;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className="ml-24">{children}</main>
    </>
  );
}
