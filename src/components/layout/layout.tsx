import React, { FC, useEffect } from "react";
import { fetchLocationByIPAction } from "../../store/actions/geolocationActions";
import { useAppDispatch } from "../../hooks/redux/redux";
import { storageKey } from "../../constants/constants";
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
  const { initWeather } = weatherActions;

  useEffect(() => {
    const geolocationStorage = getStorageItem(storageKey.geolocation);
    const weatherStorage = getStorageItem(storageKey.weather);
    if (!geolocationStorage || !weatherStorage) {
      dispatch(fetchLocationByIPAction());
      return;
    }

    const geolocation: IGeolocation = JSON.parse(geolocationStorage);
    dispatch(initGeolocation(geolocation));
    const weather: IWeather = JSON.parse(weatherStorage);
    dispatch(initWeather(weather));
  }, [dispatch, initGeolocation, initWeather]);

  return <main>{children}</main>;
};

export default Layout;
