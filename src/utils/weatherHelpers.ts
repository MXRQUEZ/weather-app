import {
  fetchCity,
  fetchForecast,
  fetchGeolocationByIP,
  fetchIP,
} from "../services/api";
import { IWeather } from "../types/IWeather";
import { countries, picture } from "../constants/constants";
import { IDaily } from "../types/IDaily";
import { IGeolocation } from "../types/IGeolocation";

export const getWeather = async (params: IGeolocation): Promise<IWeather> => {
  const { city, country, latitude, longitude } = params;
  const forecastResponse = await fetchForecast(latitude, longitude);
  const { daily: dailyResponse, timezone } = forecastResponse;
  const dailies = dailyResponse.slice(0, -1);

  const weather: IWeather = {
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

  console.log(forecastResponse);

  return weather;
};

export const getWeatherByIP = async (): Promise<IWeather> => {
  const { ip } = await fetchIP();
  const geolocationResponse = await fetchGeolocationByIP(ip);
  const { latitude, longitude, country, city } = geolocationResponse;
  console.log(geolocationResponse);

  return getWeather({ city, country, latitude, longitude });
};

export const getWeatherByCity = async (
  city: string
): Promise<IWeather | null> => {
  const cityResponse = await fetchCity(city);
  if (!cityResponse.length) return null;
  const {
    lat: latitude,
    lon: longitude,
    country: countryCode,
  } = cityResponse[0];
  const country = countries[countryCode];

  return getWeather({ city, country, latitude, longitude });
};
