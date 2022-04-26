/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGeolocation } from "../../types/IGeolocation";
import { getWeather } from "../../utils/weatherHelpers";
import { IWeather } from "../../types/IWeather";

/*
const fetchForecastAction =
  (params: IGeolocation) => async (dispatch: AppDispatch) => {
    try {
      dispatch(weatherActions.changeForecast());
      const weather = await getWeather(params);
      dispatch(weatherActions.changeForecastSuccess(weather));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(weatherActions.changeForecastError(error.message));
      }
    }
  };
*/

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
