import React, { FC, useEffect, useState } from "react";
import WeatherGrid from "./weatherGrid";
import { countries, picture } from "../../constants/constants";
import { IWeather } from "../../types/IWeather";
import useDate from "../../hooks/useDate";
import { fetchForecast, fetchWeather } from "../../utils/apiRequests";
import { IDaily } from "../../types/IDaily";
import classes from "./weather.module.scss";
import WeatherCalendar from "./weatherCalendar";
import WeatherSearchbar from "../forms/weather-searchbar/weatherSearchbar";

const Weather: FC = () => {
  const [image, setImage] = useState<string>(picture.sun.background);
  const [weather, setWeather] = useState<IWeather | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [timeZone, setTimeZone] = useState<string>("Europe/Minsk");
  const [date, time, hour] = useDate(timeZone);

  useEffect(() => {
    (async () => {
      await window.navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLoading(true);
          const { latitude, longitude } = position.coords;
          const weatherResponse = await fetchWeather(latitude, longitude);
          const forecastResponse = await fetchForecast(latitude, longitude);
          const countryCode: string = weatherResponse.sys.country;
          setTimeZone(forecastResponse.timezone);
          const newWeather: IWeather = {
            city: weatherResponse.name,
            country: countries[countryCode],
            week: forecastResponse.daily.slice(0, -1).map((daily) => {
              const { dt } = daily;
              const temp = daily.temp.day.toFixed(0);
              const weatherMain = daily.weather[0].main.toLowerCase();

              const dayname: string = new Date(dt * 1000).toLocaleDateString(
                "en",
                {
                  weekday: "long",
                }
              );
              const day: IDaily = {
                id: dt,
                dayname,
                temp,
                weather: weatherMain,
              };

              return day;
            }),
          };
          setWeather(newWeather);
          const weatherBgKey = newWeather.week[0].weather;
          const currentPicture = picture[weatherBgKey].background;
          document.body.style.background = `url(${currentPicture}) no-repeat center center`;
          setImage(currentPicture);
          console.log(weatherResponse);
          console.log(forecastResponse);
          setLoading(false);
        }
      );
    })();
  }, [hour]);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className={classes.weather}>
      <img
        className={classes.weather__bg}
        src={image}
        alt="weather background"
      />
      <div className={classes.weather__info}>
        <div className={classes.geolocation}>
          <time className={classes.geolocation__date}>
            <h2>{time}</h2>
            <h5>{date}</h5>
          </time>
          <div className={classes.geolocation__location}>
            <WeatherSearchbar />
            <h4>{weather?.city}</h4>
            <h6>{weather?.country}</h6>
          </div>
        </div>
        <WeatherCalendar />
        {weather && <WeatherGrid weather={weather} />}
      </div>
    </div>
  );
};

export default Weather;
