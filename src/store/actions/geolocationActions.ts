// noinspection ExceptionCaughtLocallyJS

import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCity, fetchGeolocationByIP, fetchIP } from "../../services/api";
import { countries } from "../../constants/constants";
import { IGeolocation } from "../../types/IGeolocation";

/* export const fetchIPAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(geolocationActions.initIP());
    const { ip } = await fetchIP();
    dispatch(geolocationActions.initIPSuccess(ip));
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(geolocationActions.initIPError(error.message));
    }
  }
}; */

/* export const fetchIPAction = createAsyncThunk(
  "fetchIP",
  async (_, thunkAPI) => {
    try {
      const { ip } = await fetchIP();
      return ip;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return thunkAPI.rejectWithValue("Error");
    }
  }
); */

export const fetchLocationByIPAction = createAsyncThunk<IGeolocation, void>(
  "fetchLocationByIP",
  async (_, thunkAPI) => {
    try {
      const { ip } = await fetchIP();
      return await fetchGeolocationByIP(ip);
    } catch (error) {
      const errorMsg =
        "Error happened while attempting to get your geolocation";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

/* export const fetchLocationByIPAction =
  (ip: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(geolocationActions.changeLocation());
      const geolocationResponse = await fetchGeolocationByIP(ip);
      dispatch(geolocationActions.changeLocationSuccess(geolocationResponse));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(geolocationActions.changeLocationError(error.message));
      }
    }
  }; */

export const fetchLocationByCityAction = createAsyncThunk<IGeolocation, string>(
  "fetchLocationByCity",
  async (city, thunkAPI) => {
    try {
      const cityResponse = await fetchCity(city);
      if (!cityResponse.length) {
        const errorMsg = `City with name ${city} was not found`;
        throw new Error(errorMsg);
      }
      const {
        lat: latitude,
        lon: longitude,
        country: countryCode,
      } = cityResponse[0];
      const country = countries[countryCode];
      const geolocation: IGeolocation = { city, latitude, longitude, country };
      return geolocation;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return thunkAPI.rejectWithValue("Error!");
    }
  }
);

/* export const fetchLocationByCityAction =
  (city: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(geolocationActions.changeLocation());
      const cityResponse = await fetchCity(city);
      if (!cityResponse.length) {
        const errorMsg = `City with name ${city} was not found`;
        throw new Error(errorMsg);
      }
      const {
        lat: latitude,
        lon: longitude,
        country: countryCode,
      } = cityResponse[0];
      const country = countries[countryCode];
      const geolocation: IGeolocation = { city, latitude, longitude, country };
      dispatch(geolocationActions.changeLocationSuccess(geolocation));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(geolocationActions.changeLocationError(error.message));
      }
    }
  }; */
