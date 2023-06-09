export interface RealData {
  voltage: number;
  current: number;
  power: number;
  energy: number;
  power_factor: number;
  db_created_at: string;
}

export interface DailyData {
  db_created_at: string;
  value: {
    voltage: number;
    current: number;
    power: number;
    energy: number;
    power_factor: number;
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
    avg_bulanan_tegangan: number;
    avg_bulanan_arus: number;
    sum_bulanan_daya: number;
    sum_bulanan_energi: number;
  };
}

export interface OutdoorSolarData {
  created_at: string;
  value: number;
}
