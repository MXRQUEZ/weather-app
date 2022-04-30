import axios from "axios";
import { IWeatherResponse } from "../types/response-types/IWeatherResponse";
import { geolocationAPI, openWeatherAPI } from "../constants/constants";
import { IForecastResponse } from "../types/response-types/IForecastResponse";
import { ICityResponse } from "../types/response-types/ICityResponse";
import { IGeolocationResponse } from "../types/response-types/IGeolocationResponse";

export const fetchWeather = async (
  latitude: number,
  longitude: number
): Promise<IWeatherResponse> => {
  const weatherUrl = `${openWeatherAPI.weather}?lat=${latitude}&lon=${longitude}&units=metric&appid=${openWeatherAPI.key}`;
  const response = await fetch(weatherUrl);
  return response.json();
};

export const fetchForecastOWM = async (
  latitude: number,
  longitude: number
): Promise<IForecastResponse> => {
  const forecastUrl = `${openWeatherAPI.forecast}?lat=${latitude}&lon=${longitude}&units=metric&exclude=current,minutely,hourly,alerts&appid=${openWeatherAPI.key}`;
  const response = await axios.get<IForecastResponse>(forecastUrl);
  return response.data;
};

/*
export const fetchForecastWAPI = async (
  latitude: number,
  longitude: number
): Promise<IForecastResponse> => {
  // const forecastUrl = `${weatherAPI.forecast}?key=${weatherAPI.key}&q=${latitude},${longitude}&days=10`;
  const forecastUrl = `http://api.weatherstack.com/forecast?access_key=976691ea7a998ef947634bc6dd4c18ef&query=${latitude},${longitude}&forecast_days=7&units=m`;
  const response = await axios.get<IForecastResponse>(forecastUrl);
  return response.data;
};
*/

export const fetchDirect = async (city: string): Promise<ICityResponse[]> => {
  const cityUrl = `${openWeatherAPI.direct}?q=${city}&appid=${openWeatherAPI.key}`;
  const response = await axios.get<ICityResponse[]>(cityUrl);
  return response.data;
};

export const fetchIP = async (): Promise<{ ip: string }> => {
  const response = await axios.get<{ ip: string }>(geolocationAPI.ip);
  return response.data;
};

export const fetchGeolocationByIP = async (
  ip: string
): Promise<IGeolocationResponse> => {
  const response = await axios.get<IGeolocationResponse>(
    `${geolocationAPI.geo}/${ip}`
  );
  return response.data;
};
