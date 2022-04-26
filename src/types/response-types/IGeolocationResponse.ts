import { IGeolocation } from "../IGeolocation";

export interface IGeolocationResponse extends IGeolocation {
  country_code: string;
  time_zone: string;
}
