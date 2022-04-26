/* eslint-disable import/prefer-default-export */
import { fetchForecast } from "../services/api";
import { IWeather } from "../types/IWeather";
import { picture } from "../constants/constants";
import { IDaily } from "../types/IDaily";
import { IGeolocation } from "../types/IGeolocation";

export const getWeather = async (params: IGeolocation): Promise<IWeather> => {
  const { city, country, latitude, longitude } = params;
  const forecastResponse = await fetchForecast(latitude, longitude);
  const { daily: dailyResponse, timezone } = forecastResponse;
  const dailies = dailyResponse.slice(0, -1);

  return {
    city,
    country,
    latitude,
    longitude,
    week: dailies.map((daily) => {
      const { dt } = daily;
      const temp = daily.temp.day.toFixed(0);
      const weatherMain = daily.weather[0].main.toLowerCase();

      const dayname: string = new Date(dt * 1000).toLocaleDateString("en", {
        weekday: "long",
      });
      const day: IDaily = {
        id: dt,
        dayname,
        temp,
        weather: weatherMain,
      };

      return day;
    }),
    timezone,
    bg: picture[dailies[0].weather[0].main.toLowerCase()].background,
  };
};
