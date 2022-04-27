/* eslint-disable import/no-cycle */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { weatherReducer } from "./reducers/weatherReducer";
import { geolocationReducer } from "./reducers/geolocationReducer";

const rootReducer = combineReducers({
  geolocationReducer,
  weatherReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
