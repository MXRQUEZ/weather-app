import { fetchForecast, fetchWeather } from "./apiRequests";
import { IWeather } from "../types/IWeather";
import { countries, picture } from "../constants/constants";
import { IDaily } from "../types/IDaily";

const getWeather = async (
  latitude: number,
  longitude: number
): Promise<[IWeather, string, string]> => {
  const weatherResponse = await fetchWeather(latitude, longitude);
  const forecastResponse = await fetchForecast(latitude, longitude);
  const countryCode: string = weatherResponse.sys.country;
  const weather: IWeather = {
    city: weatherResponse.name,
    country: countries[countryCode],
    week: forecastResponse.daily.slice(0, -1).map((daily) => {
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
  };

  const weatherBgKey = weather.week[0].weather;
  const currentPicture = picture[weatherBgKey].background;

  console.log(weatherResponse);
  console.log(forecastResponse);

  return [weather, forecastResponse.timezone, currentPicture];
};

export default getWeather;
