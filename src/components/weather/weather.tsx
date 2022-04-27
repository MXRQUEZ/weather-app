import React, { FC, useEffect, useState } from "react";
import WeatherGrid from "../forecast-grid/forecastGrid";
import { picture } from "../../constants/constants";
import useDate from "../../hooks/useDate";
import classes from "./weather.module.scss";
import WeatherSearchbar from "../forms/weather-searchbar/weatherSearchbar";
import Notes from "../notes/notes";
import { useAppDispatch, useTypedSelector } from "../../hooks/redux/redux";
import { fetchForecastAction } from "../../store/actions/weatherActions";
import { fetchLocationByCityAction } from "../../store/actions/geolocationActions";
import { weatherActions } from "../../store/reducers/weatherReducer";
import getWeatherState from "../../store/selectors/weatherSelector";
import getGeolocationState from "../../store/selectors/geolocationSelector";

const Weather: FC = () => {
  const [image, setImage] = useState<string>(picture.sun.background);
  const [timeZone, setTimeZone] = useState<string>("Europe/Minsk");
  const [date, time, hour] = useDate(timeZone);

  const dispatch = useAppDispatch();
  const {
    weather,
    error: weatherError,
    isLoading: isWeatherLoading,
  } = useTypedSelector(getWeatherState);

  const {
    geolocation,
    isLoading: isGeolocationLoading,
    error: geolocationError,
  } = useTypedSelector(getGeolocationState);

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

  const { removeWeather } = weatherActions;
  useEffect(() => {
    dispatch(removeWeather());
  }, [dispatch, removeWeather, hour]);

  useEffect(() => {
    if (geolocation && !weather) {
      dispatch(fetchForecastAction(geolocation));
      console.log(geolocation);
    }
  }, [dispatch, geolocation, weather]);

  useEffect(() => {
    if (weatherError) {
      alert(weatherError);
      return;
    }
    if (geolocationError) {
      alert(geolocationError);
    }
  }, [weatherError, geolocationError]);

  useEffect(() => {
    if (weather) {
      const { timezone, bg } = weather;
      setTimeZone(timezone);
      document.body.style.background = `url(${bg}) no-repeat center center`;
      setImage(bg);
      console.log(weather);
    }
  }, [weather]);

  return isWeatherLoading || isGeolocationLoading ? (
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

export default Weather;
