import {DatePipe} from "@angular/common";

export const getTimeFromISODateString = (date: string) => {
  const defValue = "00:00:00";
  if (!date) {
    return defValue;
  }
  const parts = date.split("T");
  if (parts.length === 1) {
    return defValue;
  }
  return parts[1];
};

export const formatDate = (date: Date) => date.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});

export const utcShift = (date: Date): string => {
  date = new Date(date);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString();
};

export const convertToMinutes = (timeString: String): number => {
  let hms = timeString.split(':');
  return Math.ceil(parseInt(hms[2]) / 60) + parseInt(hms[1]) + parseInt(hms[0]) * 60
}


export const datepipe: DatePipe = new DatePipe('en-US');
