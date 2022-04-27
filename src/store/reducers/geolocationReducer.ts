/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGeolocation } from "../../types/IGeolocation";
import {
  fetchLocationByCityAction,
  fetchLocationByIPAction,
} from "../actions/geolocationActions";
import { storageKey } from "../../constants/constants";
import { setStorageItem } from "../../utils/storageHelper";

interface IGeolocationState {
  geolocation: IGeolocation | null;
  isLoading: boolean;
  error: string;
}

const initialGeolocationState: IGeolocationState = {
  geolocation: null,
  isLoading: false,
  error: "",
};

export const geolocationSlice = createSlice({
  name: "geolocation",
  initialState: initialGeolocationState,
  reducers: {
    initGeolocation(state, action: PayloadAction<IGeolocation>) {
      state.geolocation = action.payload;
    },
  },
  extraReducers: {
    [fetchLocationByIPAction.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchLocationByIPAction.fulfilled.type]: (
      state,
      action: PayloadAction<IGeolocation>
    ) => {
      state.isLoading = false;
      state.geolocation = action.payload;
      state.error = "";
      setStorageItem(storageKey.geolocation, JSON.stringify(action.payload));
    },
    [fetchLocationByIPAction.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = true;
      state.error = action.payload;
    },

    [fetchLocationByCityAction.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchLocationByCityAction.fulfilled.type]: (
      state,
      action: PayloadAction<IGeolocation>
    ) => {
      state.isLoading = false;
      state.geolocation = action.payload;
      state.error = "";
      setStorageItem(storageKey.geolocation, JSON.stringify(action.payload));
    },
    [fetchLocationByCityAction.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const geolocationReducer = geolocationSlice.reducer;
export const geolocationActions = geolocationSlice.actions;
