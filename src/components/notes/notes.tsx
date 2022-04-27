import React, { FC, useEffect, useState } from "react";
import { v4 as getUniqueId } from "uuid";
import { INote } from "../../types/INote";
import classes from "./notes.module.scss";
import { storageKey } from "../../constants/constants";
import {
  convertStringToTime,
  datesSortCondition,
} from "../../utils/timeParser";
import Note from "./note/note";

interface IStorageNote {
  id: string;
  time: string;
  text: string;
}

const Notes: FC = () => {
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    const storageNotesStr = localStorage.getItem(storageKey.notes);
    if (storageNotesStr) {
      const storageNotes: IStorageNote[] = JSON.parse(storageNotesStr);
      const validNotes: INote[] = storageNotes.map((note) => {
        return {
          id: note.id,
          time: new Date(note.time),
          text: note.text,
        };
      });
      setNotes(validNotes);
    }
  }, []);

  const updateNote = (updatedNote: INote) => {
    const newNotes = [...notes];
    const newNote = newNotes.find((note) => note.id === updatedNote.id);
    if (newNote) {
      newNote.time = updatedNote.time;
      newNote.text = updatedNote.text;
      const sortedNotes = newNotes.sort(datesSortCondition);
      setNotes(sortedNotes);
      localStorage.setItem(storageKey.notes, JSON.stringify(sortedNotes));
    }
  };

  const addNote = () => {
    const newNotes = [...notes];
    newNotes.push({
      time: convertStringToTime(":"),
      text: "",
      id: getUniqueId(),
    });
    setNotes(newNotes);
    localStorage.setItem(storageKey.notes, JSON.stringify(newNotes));
  };

  const checkLastNote = (allNotes: INote[]) => {
    if (notes.length !== 0) {
      const time = allNotes[allNotes.length - 1]?.time;
      return time?.getHours() && time?.getMinutes();
    }
    return true;
  };

  const deleteNote = (id: string) => {
    const note = notes.find((delNote) => delNote.id === id);
    if (note) {
      const newNotes = [...notes];
      const index = newNotes.indexOf(note);
      newNotes.splice(index, 1);
      setNotes(newNotes);
      localStorage.setItem(storageKey.notes, JSON.stringify(newNotes));
    }
  };

  return (
    <aside className={classes.notes}>
      {notes.map((note) => (
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
