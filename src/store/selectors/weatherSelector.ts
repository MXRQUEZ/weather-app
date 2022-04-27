import { RootState } from "../store";

const getWeatherState = (state: RootState) => state.weatherReducer;

export default getWeatherState;
