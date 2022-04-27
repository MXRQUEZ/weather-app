import { RootState } from "../store";

const getGeolocationState = (state: RootState) => state.geolocationReducer;

export default getGeolocationState;
