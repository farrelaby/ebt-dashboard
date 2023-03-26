import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

type NavbarProps = {
  onMouseEnter: (event: React.MouseEvent) => void;
  onMouseLeave: (event: React.MouseEvent) => void;
};

export default function Navbar({ onMouseEnter, onMouseLeave }: NavbarProps) {
  const router = useRouter();

  return (
    <nav
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="min-h-screen z-10 w-16 hover:w-52  transition-all  fixed overflow-hidden bg-[#363740] hover:bg-opacity-90 hover:backdrop-blur-sm"
    >
      <div className="flex flex-col w-full place-items-start top-1/3 absolute">
        <Link
          href={"/"}
          className={`py-4 pl-5 h-14 w-full place-items-center duration-300 flex flex-row gap-4 text-white  ${
            router.pathname === "/"
              ? "bg-slate-200 bg-opacity-30"
              : "hover:bg-slate-400 hover:bg-opacity-10"
          }`}
        >
          <Image
            className="h-5 flex-shrink-0"
            src="/overview.svg"
            alt="overview-logo"
            width={20}
            height={20}
          />
          {/* nav-text is a custom css class. Just check global.css for detail */}
          <p className="pl-4 flex-shrink-0">Overview</p>
        </Link>
        <Link
          href={"/panel-surya/ac"}
          className={`py-4 pl-5 h-14 w-full place-items-center duration-300 flex flex-row  gap-4 text-white ${
            router.pathname.startsWith("/panel-surya")
              ? "bg-slate-400 bg-opacity-30"
              : "hover:bg-slate-400 hover:bg-opacity-10"
          }`}
        >
          <Image
            className="h-5 flex-shrink-0"
            src="/Solar-Panel.svg"
            alt="solar-logo"
            width={24}
            height={24}
          />
          <p className=" min-w-max pl-4 flex-shrink-0">Panel Surya</p>
        </Link>
        <Link
          href={"/turbin-angin"}
          className={`py-4 pl-5 h-14 w-full place-items-center duration-300 flex flex-row  gap-4 text-white ${
            router.pathname.startsWith("/turbin-angin")
              ? "bg-slate-400 bg-opacity-30"
              : "hover:bg-slate-400 hover:bg-opacity-10"
          }`}
        >
          <Image
            className="h-5 flex-shrink-0"
            src="/Wind-Turbine.svg"
            alt="wind-logo"
            width={24}
            height={24}
          />
          <p className="min-w-max ml-4 flex-shrink-0">Turbin Angin</p>
        </Link>
      </div>
    </nav>
  );
}
