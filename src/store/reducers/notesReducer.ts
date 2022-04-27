import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { INote } from "../../types/INote";

interface INotesState {
  notes: INote[];
}

const initialNotesState: INotesState = {
  notes: [],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState: initialNotesState,
  reducers: {
    addNote(state, action: PayloadAction<INote>) {
      state.notes.push(action.payload);
    },
  },
});

export const notesReducer = notesSlice.reducer;
export const notesActions = notesSlice.actions;
