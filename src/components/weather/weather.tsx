import React, { FC, useEffect, useState } from "react";
import WeatherGrid from "../forecast-grid/forecastGrid";
import { picture } from "../../constants/constants";
import { IWeather } from "../../types/IWeather";
import useDate from "../../hooks/useDate";
import classes from "./weather.module.scss";
import WeatherSearchbar from "../forms/weather-searchbar/weatherSearchbar";
import { getWeatherByCity, getWeatherByIP } from "../../utils/weatherHelpers";
import Notes from "../notes/notes";

const Weather: FC = () => {
  const [image, setImage] = useState<string>(picture.sun.background);
  const [weather, setWeather] = useState<IWeather | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [timeZone, setTimeZone] = useState<string>("Europe/Minsk");
  const [date, time, hour] = useDate(timeZone);

  const onEnterSearchCity = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      (async () => {
        const cityName = event.currentTarget.value;
        const newWeather = await getWeatherByCity(event.currentTarget.value);
        if (!newWeather) {
          alert(`City with name ${cityName} was not found!`);
          return;
        }
        setWeather(newWeather);
        const { timezone, bg } = newWeather;
        setTimeZone(timezone);
        document.body.style.background = `url(${bg}) no-repeat center center`;
        setImage(bg);
      })();
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const newWeather = await getWeatherByIP();
      setWeather(newWeather);
      const { timezone, bg } = newWeather;
      setTimeZone(timezone);
      document.body.style.background = `url(${bg}) no-repeat center center`;
      setImage(bg);
      setLoading(false);
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
            <WeatherSearchbar onKeyDown={onEnterSearchCity} />
            <h4>{weather?.city}</h4>
            <h6>{weather?.country}</h6>
          </div>
        </div>
        <Notes />
        {weather && <WeatherGrid weather={weather} />}
      </div>
    </div>
  );
};

export default Weather;
