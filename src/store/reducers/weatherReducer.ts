/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWeather } from "../../types/IWeather";
import {
  fetchForecastActionOWM,
  fetchForecastActionWAPI,
} from "../actions/weatherActions";
import { storageKey } from "../../constants/constants";
import { setStorageItem } from "../../utils/storageHelper";

interface IWeatherState {
  openWeather: IWeather | null;
  weatherAPI: IWeather | null;
  isLoading: boolean;
  error: string;
}

const initialWeatherState: IWeatherState = {
  openWeather: null,
  weatherAPI: null,
  isLoading: false,
  error: "",
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState: initialWeatherState,
  reducers: {
    initOpenWeather(state, action: PayloadAction<IWeather>) {
      state.openWeather = action.payload;
    },
    initWeatherAPI(state, action: PayloadAction<IWeather>) {
      state.weatherAPI = action.payload;
    },
    removeWeather(state) {
      state.openWeather = null;
      state.weatherAPI = null;
    },
  },
  extraReducers: {
    [fetchForecastActionOWM.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchForecastActionOWM.fulfilled.type]: (
      state,
      action: PayloadAction<IWeather>
    ) => {
      state.isLoading = false;
      state.openWeather = action.payload;
      state.error = "";
      setStorageItem(storageKey.openWeather, JSON.stringify(action.payload));
    },
    [fetchForecastActionOWM.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [fetchForecastActionWAPI.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchForecastActionWAPI.fulfilled.type]: (
      state,
      action: PayloadAction<IWeather>
    ) => {
      state.isLoading = false;
      state.weatherAPI = action.payload;
      state.error = "";
      setStorageItem(storageKey.weatherApi, JSON.stringify(action.payload));
    },
    [fetchForecastActionWAPI.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const weatherReducer = weatherSlice.reducer;
export const weatherActions = weatherSlice.actions;
