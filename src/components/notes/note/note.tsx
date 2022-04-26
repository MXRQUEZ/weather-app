import React, { FC, useState } from "react";
import { INote } from "../../../types/INote";
import {
  convertStringToTime,
  convertTimeToString,
} from "../../../utils/timeParser";
import classes from "./note.module.scss";

interface NoteProps {
  noteInit: INote;
  deleteNote: (id: string) => void;
  updateNote: (updatedNote: INote) => void;
}

const Note: FC<NoteProps> = ({ noteInit, updateNote, deleteNote }) => {
  const [note, setNote] = useState<INote>(noteInit);

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote({ ...note, text: event.target.value });
  };

  const onChangeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = convertStringToTime(event.target.value);
    setNote({ ...note, time });
  };

  const onBlurInput = () => {
    updateNote(note);
  };

  const clickDelete = () => {
    deleteNote(note.id);
  };

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      updateNote(note);
      event.currentTarget.blur();
    }
  };

  return (
    <div className={classes.note}>
      <input
        type="time"
        className={classes.note__time}
        value={convertTimeToString(note.time)}
        onChange={onChangeTime}
        onBlur={onBlurInput}
        onKeyDown={onEnter}
      />
      <input
        type="text"
        className={classes.note__text}
        value={note.text}
        maxLength={23}
        onChange={onChangeText}
        onBlur={onBlurInput}
        onKeyDown={onEnter}
      />
      <button
        type="button"
        className={classes.note__delete}
        onClick={clickDelete}
      >
        <i className="fa-solid fa-trash" />
      </button>
    </div>
  );
};

export default React.memo(Note);
