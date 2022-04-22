export interface IWeatherResponse {
  name: string;
  sys: { country: string };
  weather: { main: string; description: string }[];
}
