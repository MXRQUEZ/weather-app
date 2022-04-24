export interface IDailyResponse {
  dt: number;
  temp: { day: number };
  weather: { main: string; description: string }[];
}
