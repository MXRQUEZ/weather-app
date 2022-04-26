/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGeolocation } from "../../types/IGeolocation";
import { IWeather } from "../../types/IWeather";
import { getWeather } from "../../utils/getWeather";

export const fetchForecastAction = createAsyncThunk<IWeather, IGeolocation>(
  "fetchForecast",
  async (params, thunkAPI) => {
    try {
      return await getWeather(params);
    } catch (error: unknown) {
      const errorMsg =
        "Error happened while attempting to get the forecast of your city.";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);
