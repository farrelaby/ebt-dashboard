import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="min-h-screen w-20 hover:w-40 pr-4 transition-all fixed overflow-hidden bg-[#363740]">
      <div className="flex flex-col place-items-start top-1/2 absolute  ml-4 gap-8">
        <div className="flex flex-row gap-4">
          <Image
            className="h-5"
            src="/overview.svg"
            alt="overview-logo"
            width={20}
            height={20}
          />
          <p className="block">Overview</p>
        </div>
        <Image
          className="h-5"
          src="/Solar-Panel.svg"
          alt="solar-logo"
          width={24}
          height={24}
        />
        <Image
          className="h-5"
          src="/Wind-Turbine.svg"
          alt="wind-logo"
          width={24}
          height={24}
        />
      </div>
    </nav>
  );
}
