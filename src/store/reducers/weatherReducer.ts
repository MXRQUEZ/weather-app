/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWeather } from "../../types/IWeather";
import { fetchForecastAction } from "../actions/weatherActions";
import { storageKey } from "../../constants/constants";
import { setStorageItem } from "../../utils/storageHelper";

interface IWeatherState {
  weather: IWeather | null;
  isLoading: boolean;
  error: string;
}

const initialWeatherState: IWeatherState = {
  weather: null,
  isLoading: false,
  error: "",
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState: initialWeatherState,
  reducers: {
    initWeather(state, action: PayloadAction<IWeather>) {
      state.weather = action.payload;
    },
    removeWeather(state) {
      state.weather = null;
    },
  },
  extraReducers: {
    [fetchForecastAction.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchForecastAction.fulfilled.type]: (
      state,
      action: PayloadAction<IWeather>
    ) => {
      state.isLoading = false;
      state.weather = action.payload;
      state.error = "";
      setStorageItem(storageKey.weather, JSON.stringify(action.payload));
    },
    [fetchForecastAction.rejected.type]: (
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
