import React, { FC, useState } from "react";
import { INote } from "../../../types/INote";
import {
  convertStringToTime,
  convertTimeToString,
} from "../../../utils/timeParser";
import classes from "./note.module.scss";

interface NoteProps {
  note: INote;
  deleteNote: (id: string) => void;
  updateNote: (updatedNote: INote) => void;
}

const Note: FC<NoteProps> = ({ note, updateNote, deleteNote }) => {
  const [time, setTime] = useState<string>(convertTimeToString(note.time));
  const [text, setText] = useState<string>(note.text);

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    updateNote({ ...note, text });
  };

  const onChangeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
    updateNote({ ...note, time: convertStringToTime(time) });
  };

  const clickDelete = () => {
    deleteNote(note.id);
  };

  return (
    <div className={classes.note}>
      <input
        type="time"
        className={classes.note__time}
        value={time}
        onChange={onChangeTime}
      />
      <input
        type="text"
        className={classes.note__text}
        value={text}
        maxLength={23}
        onChange={onChangeText}
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
