export function twoDecimalPlaces(num: number) {
  return parseFloat(num.toFixed(2));
}

type RealTimeCardItem = {
  valueKey: "voltage" | "current" | "power" | "energy" | "power_factor";
  unit: string;
  title: string;
};

export const realTimeCardItems: RealTimeCardItem[] = [
  {
    valueKey: "voltage",
    unit: "Volt",
    title: "Tegangan",
  },
  {
    valueKey: "current",
    unit: "Ampere",
    title: "Arus",
  },
  {
    valueKey: "power",
    unit: "Watt",
    title: "Daya",
  },
  {
    valueKey: "energy",
    unit: "Wh",
    title: "Energi",
  },
  {
    valueKey: "power_factor",
    unit: "",
    title: "Power Factor",
  },
];
