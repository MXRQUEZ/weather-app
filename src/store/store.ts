/* eslint-disable import/no-cycle */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { weatherReducer } from "./reducers/weatherReducer";
import { geolocationReducer } from "./reducers/geolocationReducer";
import { notesReducer } from "./reducers/notesReducer";

const rootReducer = combineReducers({
  geolocationReducer,
  weatherReducer,
  notesReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
