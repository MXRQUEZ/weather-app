import React, { FC, useEffect, useState } from "react";
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
    let newNote = newNotes.find((note) => note.id === updatedNote.id);
    if (newNote) {
      newNote = { ...newNote, ...updatedNote };
      setNotes(newNotes);
      console.log(newNote);
    }
  };

  useEffect(() => {
    setNotes(notes.sort(datesSortCondition));
  }, [notes, notes.length]);

  const addNote = () => {
    const newNotes = [...notes];
    newNotes.push({
      time: convertStringToTime(""),
      text: "",
      id: getUniqueId(),
    });
    setNotes(newNotes);
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
          note={note}
          key={note.id}
          updateNote={updateNote}
          deleteNote={deleteNote}
        />
      ))}
      {notes.length < 5 ? (
        <button type="button" className={classes.add__note} onClick={addNote}>
          <i className="fa-regular fa-square-plus fa-3x" />
        </button>
      ) : null}
    </aside>
  );
};

export default React.memo(Notes);
