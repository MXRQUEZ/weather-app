import React, { FC, useEffect, useState } from "react";
import WeatherGrid from "../forecast-grid/forecastGrid";
import {
  openWeatherMap,
  otherAPI,
  picture,
  storageKey,
  weatherOptions,
} from "../../constants/constants";
import useDate from "../../hooks/useDate";
import classes from "./weather.module.scss";
import WeatherSearchbar from "../weather-searchbar/weatherSearchbar";
import Notes from "../notes/notes";
import { useAppDispatch, useTypedSelector } from "../../hooks/redux/redux";
import {
  fetchForecastActionOWM,
  fetchForecastActionWAPI,
} from "../../store/actions/weatherActions";
import { fetchLocationByCityAction } from "../../store/actions/geolocationActions";
import { weatherActions } from "../../store/reducers/weatherReducer";
import getWeatherState from "../../store/selectors/weatherSelector";
import getGeolocationState from "../../store/selectors/geolocationSelector";
import Select from "../ui/select/select";
import { IWeather } from "../../types/IWeather";

const Weather: FC = () => {
  const [image, setImage] = useState<string>(picture.sun.background);
  const [timeZone, setTimeZone] = useState<string>("Europe/Minsk");
  const [currentAPI, setCurrentAPI] = useState<string>(
    localStorage.getItem(storageKey.selectedApi)!
  );
  const [weather, setWeather] = useState<IWeather | null>(null);
  const [date, time, hour] = useDate(timeZone);

  const dispatch = useAppDispatch();
  const { removeWeather } = weatherActions;
  const {
    openWeather,
    weatherAPI,
    error: weatherError,
    isLoading: isWeatherLoading,
  } = useTypedSelector(getWeatherState);

  const {
    geolocation,
    isLoading: isGeolocationLoading,
    error: geolocationError,
  } = useTypedSelector(getGeolocationState);

  const onChangeGetOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const option = event.target.value;
    localStorage.setItem(storageKey.selectedApi, option);
    setCurrentAPI(option);
  };

  const onEnterSearchCity = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      (async () => {
        const cityName = event.currentTarget.value;
        await dispatch(fetchLocationByCityAction(cityName));
        dispatch(removeWeather());
      })();
      event.currentTarget.blur();
    }
  };

  useEffect(() => {
    dispatch(removeWeather());
  }, [dispatch, removeWeather, hour]);

  useEffect(() => {
    if (currentAPI === openWeatherMap) {
      setWeather(openWeather);
      console.log(openWeather);
      return;
    }

    if (currentAPI === otherAPI) {
      setWeather(weatherAPI);
      console.log(weatherAPI);
    }
  }, [currentAPI, openWeather, weatherAPI]);

  useEffect(() => {
    if (!geolocation) {
      return;
    }

    if (currentAPI === openWeatherMap && !openWeather) {
      dispatch(fetchForecastActionOWM(geolocation));
      console.log("openweather request");
      return;
    }

    if (currentAPI === otherAPI && !weatherAPI) {
      dispatch(fetchForecastActionWAPI(geolocation));
      console.log("weatherAPI request");
    }
  }, [dispatch, geolocation, openWeather, weatherAPI, currentAPI]);

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
    }
  }, [weather]);

  return isWeatherLoading || isGeolocationLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className={classes.container}>
      <div className={classes.weather}>
        <img
          className={classes.weather__bg}
          src={image}
          alt="weather background"
        />
        <div className={classes.weather__info}>
          <div className={classes.api__select}>
            <Select
              options={weatherOptions}
              onChange={onChangeGetOption}
              defaultValue={currentAPI || undefined}
            />
          </div>
          <div className={classes.geolocation}>
            <time className={classes.geolocation__date}>
              <h2>{time}</h2>
              <h5>{date}</h5>
            </time>
            <div className={classes.geolocation__location}>
              <WeatherSearchbar onKeyDown={onEnterSearchCity} />
              <h4>{weather?.city || "Not identified"}</h4>
              <h6>{weather?.country}</h6>
            </div>
          </div>
          <Notes />
          {weather && <WeatherGrid weather={weather} />}
        </div>
      </div>
    </div>
  );
};

export default Weather;
