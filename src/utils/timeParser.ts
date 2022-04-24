import { INote } from "../types/INote";

export const convertTimeToString = (date: Date): string => {
  const hours = date.getHours();
  const hoursText = hours < 10 ? `0${hours}` : hours;
  const minutes = date.getMinutes();
  const minutesText = minutes < 10 ? `0${minutes}` : minutes;
  return `${hoursText}:${minutesText}`;
};

export const convertStringToTime = (text: string): Date => {
  const [hours, minutes] = text.split(":");
  const date = new Date();
  date.setHours(+hours, +minutes);
  return date;
};

export const datesSortCondition = (a: INote, b: INote): number => {
  return a.time > b.time ? 1 : -1;
};
