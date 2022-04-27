/* eslint-disable import/prefer-default-export */

import { INote } from "../../types/INote";
import { AppDispatch } from "../store";
import { notesActions } from "../reducers/notesReducer";

export const addNoteAction = (note: INote) => (dispatch: AppDispatch) => {
  dispatch(notesActions.addNote(note));
};
