import React, { FC, useEffect } from "react";
import { fetchLocationByIPAction } from "../../store/actions/geolocationActions";
import { useAppDispatch } from "../../hooks/redux/redux";
import { openWeatherMap, storageKey } from "../../constants/constants";
import { geolocationActions } from "../../store/reducers/geolocationReducer";
import { IGeolocation } from "../../types/IGeolocation";
import { weatherActions } from "../../store/reducers/weatherReducer";
import { IWeather } from "../../types/IWeather";
import { getStorageItem } from "../../utils/storageHelper";

interface ILayoutProps {
  children: JSX.Element;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { initGeolocation } = geolocationActions;
  const { initOpenWeather, initWeatherAPI } = weatherActions;

  useEffect(() => {
    const geolocationStorage = getStorageItem(storageKey.geolocation);
    if (!geolocationStorage) {
      dispatch(fetchLocationByIPAction());
      return;
    }

    const selectedAPIStorage = localStorage.getItem(storageKey.selectedApi);
    if (!selectedAPIStorage) {
      localStorage.setItem(storageKey.selectedApi, openWeatherMap);
    }

    const geolocation: IGeolocation = JSON.parse(geolocationStorage);
    dispatch(initGeolocation(geolocation));
    const openWeatherStorage = getStorageItem(storageKey.openWeather);
    if (openWeatherStorage) {
      const openWeather: IWeather = JSON.parse(openWeatherStorage);
      dispatch(initOpenWeather(openWeather));
    }

    const weatherAPIStorage = getStorageItem(storageKey.weatherApi);
    if (weatherAPIStorage) {
      const weatherAPI: IWeather = JSON.parse(weatherAPIStorage);
      dispatch(initWeatherAPI(weatherAPI));
    }
  }, [dispatch, initGeolocation, initOpenWeather, initWeatherAPI]);

  return <main>{children}</main>;
};

export default Layout;
