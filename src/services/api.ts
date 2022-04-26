import axios from "axios";
import { IWeatherResponse } from "../types/response-types/IWeatherResponse";
import { api } from "../constants/constants";
import { IForecastResponse } from "../types/response-types/IForecastResponse";
import { ICityResponse } from "../types/response-types/ICityResponse";
import { IGeolocationResponse } from "../types/response-types/IGeolocationResponse";

export const fetchWeather = async (
  latitude: number,
  longitude: number
): Promise<IWeatherResponse> => {
  const weatherUrl = `${api.weather}?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`;
  const response = await fetch(weatherUrl);
  return response.json();
};

export const fetchForecast = async (
  latitude: number,
  longitude: number
): Promise<IForecastResponse> => {
  const forecastUrl = `${api.forecast}?lat=${latitude}&lon=${longitude}&units=metric&exclude=current,minutely,hourly,alerts&appid=${api.key}`;
  const response = await axios.get<IForecastResponse>(forecastUrl);
  return response.data;
};

export const fetchCity = async (city: string): Promise<ICityResponse[]> => {
  const cityUrl = `${api.geo}?q=${city}&appid=${api.key}`;
  const response = await axios.get<ICityResponse[]>(cityUrl);
  return response.data;
};

export const fetchWeatherByCity = async (
  city: string
): Promise<IForecastResponse> => {
  const cityUrl = `${api.weather}?q=${city}&units=metric&appid=${api.key}`;
  const response = await axios.get<IForecastResponse>(cityUrl);
  return response.data;
};

export const fetchIP = async (): Promise<{ ip: string }> => {
  const response = await axios.get<{ ip: string }>(api.ip);
  return response.data;
};

export const fetchGeolocationByIP = async (
  ip: string
): Promise<IGeolocationResponse> => {
  const response = await axios.get<IGeolocationResponse>(`${api.geo}/${ip}`);
  return response.data;
};
