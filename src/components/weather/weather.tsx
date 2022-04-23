import React, { FC, useEffect, useState } from "react";
import WeatherGrid from "./weatherGrid";
import { picture } from "../../constants/constants";
import { IWeather } from "../../types/IWeather";
import useDate from "../../hooks/useDate";
import classes from "./weather.module.scss";
import WeatherCalendar from "./weatherCalendar";
import WeatherSearchbar from "../forms/weather-searchbar/weatherSearchbar";
import getWeather from "../../utils/getWeather";

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
          const [newWeather, currentTimeZone, currentPicture] =
            await getWeather(latitude, longitude);
          setWeather(newWeather);
          setTimeZone(currentTimeZone);
          document.body.style.background = `url(${currentPicture}) no-repeat center center`;
          setImage(currentPicture);
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
