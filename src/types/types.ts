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
