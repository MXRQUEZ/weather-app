import React, { FC, useState } from "react";
import { v4 as getUniqueId } from "uuid";
import { INote } from "../../types/INote";
import classes from "./notes.module.scss";
import { testNotes } from "../../constants/constants";
import {
  convertStringToTime,
  datesSortCondition,
} from "../../utils/timeParser";
import Note from "./note/note";

const Notes: FC = () => {
  const [notes, setNotes] = useState<INote[]>(testNotes);

  const updateNote = (updatedNote: INote) => {
    const newNotes = [...notes];
    const newNote = newNotes.find((note) => note.id === updatedNote.id);
    if (newNote) {
      newNote.time = updatedNote.time;
      newNote.text = updatedNote.text;
      setNotes(newNotes.sort(datesSortCondition));
    }
  };

  const addNote = () => {
    const newNotes = [...notes];
    newNotes.push({
      time: convertStringToTime(""),
      text: "",
      id: getUniqueId(),
    });
    setNotes(newNotes);
  };

  const checkLastNote = (allNotes: INote[]) => {
    return allNotes[allNotes.length - 1]?.time.getTime();
  };

  const deleteNote = (id: string) => {
    const note = notes.find((delNote) => delNote.id === id);
    if (note) {
      const newNotes = [...notes];
      const index = newNotes.indexOf(note);
      newNotes.splice(index, 1);
      setNotes(newNotes);
    }
  };

  return (
    <aside className={classes.notes}>
      {notes.sort(datesSortCondition).map((note) => (
        <Note
          noteInit={note}
          key={note.id}
          updateNote={updateNote}
          deleteNote={deleteNote}
        />
      ))}
      {notes.length < 5 && checkLastNote(notes) ? (
        <button type="button" className={classes.add__note} onClick={addNote}>
          <i className="fa-regular fa-square-plus fa-3x" />
        </button>
      ) : null}
    </aside>
  );
};

export default React.memo(Notes);
