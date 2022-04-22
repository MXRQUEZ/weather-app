import { IWeatherResponse } from "../types/IWeatherResponse";
import { api } from "../constants/constants";
import { IForecastResponse } from "../types/IForecastResponse";

export const fetchWeather = async (
  latitude: number,
  longitude: number
): Promise<IWeatherResponse> => {
  const weatherUrl = `${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`;
  const response = await fetch(weatherUrl);
  return response.json();
};

export const fetchForecast = async (
  latitude: number,
  longitude: number
): Promise<IForecastResponse> => {
  const forecastUrl = `${api.base}onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=current,minutely,hourly,alerts&appid=${api.key}`;
  const response = await fetch(forecastUrl);
  return response.json();
};
