// noinspection ExceptionCaughtLocallyJS

import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDirect, fetchGeolocationByIP, fetchIP } from "../../services/api";
import { countries } from "../../constants/constants";
import { IGeolocation } from "../../types/IGeolocation";

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

export const fetchLocationByCityAction = createAsyncThunk<IGeolocation, string>(
  "fetchLocationByCity",
  async (cityName, thunkAPI) => {
    try {
      const cityResponse = await fetchDirect(cityName);
      if (!cityResponse.length) {
        const errorMsg = `City with name ${cityName} was not found`;
        throw new Error(errorMsg);
      }
      const {
        name: city,
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
