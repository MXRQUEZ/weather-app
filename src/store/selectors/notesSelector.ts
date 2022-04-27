import { RootState } from "../store";

const getNotesState = (state: RootState) => state.notesReducer;

export default getNotesState;
