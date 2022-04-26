import React, { FC, useEffect, useState } from "react";
import WeatherGrid from "../forecast-grid/forecastGrid";
import { picture } from "../../constants/constants";
import { IWeather } from "../../types/IWeather";
import useDate from "../../hooks/useDate";
import classes from "./weather.module.scss";
import WeatherSearchbar from "../forms/weather-searchbar/weatherSearchbar";
import Notes from "../notes/notes";
import { useAppDispatch, useTypedSelector } from "../../hooks/redux/redux";
import { fetchForecastAction } from "../../store/actions/weatherActions";
import { fetchLocationByCityAction } from "../../store/actions/geolocationActions";

const Weather: FC = () => {
  const [image, setImage] = useState<string>(picture.sun.background);
  const [weather, setWeather] = useState<IWeather | null>(null);
  const [timeZone, setTimeZone] = useState<string>("Europe/Minsk");
  const [date, time, hour] = useDate(timeZone);

  const dispatch = useAppDispatch();
  const {
    weather: currentWeather,
    error,
    isLoading,
  } = useTypedSelector((state) => state.weatherReducer);

  const { ip, geolocation } = useTypedSelector(
    (state) => state.geolocationReducer
  );

  const onEnterSearchCity = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const cityName = event.currentTarget.value;
      dispatch(fetchLocationByCityAction(cityName));
      event.currentTarget.blur();
    }
  };

  const onClickSelect = (event: React.MouseEvent<HTMLInputElement>) => {
    event.currentTarget.select();
  };

  useEffect(() => {
    if (geolocation) {
      dispatch(fetchForecastAction(geolocation));
      console.log(geolocation);
    }
    if (error) {
      alert(error);
    }
  }, [dispatch, geolocation, error]);

  useEffect(() => {
    if (currentWeather) {
      setWeather(currentWeather);
      const { timezone, bg } = currentWeather;
      setTimeZone(timezone);
      document.body.style.background = `url(${bg}) no-repeat center center`;
      setImage(bg);
      console.log(currentWeather);
    }
  }, [currentWeather, hour]);

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
            <WeatherSearchbar
              onKeyDown={onEnterSearchCity}
              onClick={onClickSelect}
            />
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

export default React.memo(Weather);
