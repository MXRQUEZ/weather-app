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

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNote({ ...note, text: event.target.value });

  const onChangeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = convertStringToTime(event.target.value);
    setNote({ ...note, time });
  };

  const onBlurUpdate = () => updateNote(note);

  const onClickDelete = () => deleteNote(note.id);

  const onEnterUpdate = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
        onBlur={onBlurUpdate}
        onKeyDown={onEnterUpdate}
      />
      <input
        type="text"
        className={classes.note__text}
        value={note.text}
        maxLength={23}
        onChange={onChangeText}
        onBlur={onBlurUpdate}
        onKeyDown={onEnterUpdate}
      />
      <button
        type="button"
        className={classes.note__delete}
        onClick={onClickDelete}
      >
        <i className="fa-solid fa-trash" />
      </button>
    </div>
  );
};

export default React.memo(Note);
