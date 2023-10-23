import { twoDecimalPlaces } from "@/utils";
import FormatNumber from "@/utils/numFormatter";

export function RealTimeCard({
  value,
  unit,
  title,
}: {
  value: number | undefined | null;
  unit: string;
  title: string;
}) {
  return (
    <div className="h-72 w-52 bg-[#f2e9ff]  flex flex-col place-items-center justify-center rounded-lg">
      <h4 className="text-5xl font-semibold">
        {typeof value == "number"
          ? FormatNumber(twoDecimalPlaces(value as number))
          : "-"}
      </h4>
      <p className="text-xl mt-3 text-[#A4A6B3]">{unit}</p>
      <div className="text-2xl font-semibold mt-9">{title}</div>
    </div>
  );
}

export function EnergyOverviewCard({
  value = 0,
  unit = "kWh",
  title = "",
}: {
  value?: number | undefined | null;
  unit?: string;
  title?: string;
}) {
  // console.log(value === NaN);
  return (
    <div className="bg-white w-full shadow-md flex flex-col place-items-center justify-center rounded-3xl">
      <h4 className="text-4xl font-semibold">
        {typeof value === "number" ? twoDecimalPlaces(value) : "-"}
      </h4>
      <p className="text-lg text-[#A4A6B3]">{unit}</p>
      <p className="text-lg font-semibold ">Total Energi</p>
      <p className="text-lg font-semibold text-[#9747FF] ">{title}</p>
    </div>
  );
}
