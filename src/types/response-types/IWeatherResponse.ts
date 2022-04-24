export interface IWeatherResponse {
  name: string;
  sys: { country: string };
  coord: { lon: number; lat: number };
  weather: { main: string; description: string }[];
}
