function RealTimeCard({
  value,
  unit,
  title,
}: {
  value: number | undefined | null;
  unit: string;
  title: string;
}) {
  return (
    <div className="h-72 w-52 bg-[#f2e9ff] flex flex-col place-items-center justify-center rounded-lg">
      <h4 className="text-5xl font-semibold">{value ?? "-"}</h4>
      <p className="text-xl mt-3 text-[#A4A6B3]">{unit}</p>
      <div className="text-2xl font-semibold mt-9">{title}</div>
    </div>
  );
}

export { RealTimeCard };
