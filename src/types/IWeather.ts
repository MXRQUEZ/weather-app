import { IDaily } from "./IDaily";

export interface IWeather {
  city: string;
  latitude: number;
  longitude: number;
  country: string;
  week: IDaily[];
  timezone: string;
  bg: string;
}
