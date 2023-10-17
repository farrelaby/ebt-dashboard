export interface RealData {
  voltage: number | null;
  current: number | null;
  power: number | null;
  energy: number | null;
  power_factor?: number;
  db_created_at: string;
}

export interface DailyData {
  db_created_at: string;
  value: {
    voltage: number;
    current: number;
    power: number;
    energy: number;
    power_factor?: number;
  };
}

export interface MonthlyData {
  tanggal: string;
  value: {
    avg_harian_tegangan: number;
    avg_harian_arus: number;
    sum_harian_daya: number;
    sum_harian_energi: number;
  };
}

export interface YearlyData {
  bulan_ke: number;
  value: {
    avg_bulanan_tegangan: number | null;
    avg_bulanan_arus: number | null;
    sum_bulanan_daya: number | null;
    sum_bulanan_energi: number | null;
  };
}

export interface OutdoorSolarData {
  created_at: string | Date;
  value: number;
}

export interface OutdoorSolarEfficiencyData {
  timestamp: Date | string;
  panel_power: number;
  outdoor_power: number;
  efficiency: number;
}
