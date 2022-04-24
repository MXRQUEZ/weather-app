import { IDaily } from "./IDaily";

export interface IWeather {
  city: string;
  country: string;
  week: IDaily[];
  timezone: string;
  bg: string;
}
