import { INote } from "../types/INote";

export const convertTimeToString = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  if (hours >= 0 && minutes >= 0) {
    const hoursText = hours < 10 ? `0${hours}` : hours;
    const minutesText = minutes < 10 ? `0${minutes}` : minutes;
    return `${hoursText}:${minutesText}`;
  }

  const hoursText = Number.isNaN(hours) ? "00" : hours;
  const minutesText = Number.isNaN(minutes) ? "00" : minutes;
  return `${hoursText}:${minutesText}`;
};

export const convertStringToTime = (text: string): Date => {
  const [hours, minutes] = text.split(":");
  const date = new Date();
  const hoursText = !hours ? 0 : hours;
  const minutesText = !minutes ? 0 : minutes;
  date.setHours(+hoursText, +minutesText);
  return date;
};

export const datesSortCondition = (a: INote, b: INote): number => {
  return a.time > b.time ? 1 : -1;
};
