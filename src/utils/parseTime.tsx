import dayjs from "dayjs";
import { getTime, getHours, parseISO } from "date-fns"; // Import necessary date-fns functions

export const getTimeOnly = (dateTimeString: string | number | Date) => {
  const date = new Date(dateTimeString);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  const milliseconds = date.getUTCMilliseconds().toString().padStart(3, "0");
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

// Function to extract the date only (YYYY-MM-DD format)
export const getDateOnly = (dateTimeString: string | number | Date) => {
  const date = new Date(dateTimeString);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // getUTCMonth() is zero-based
  const day = date.getUTCDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getTimeParsed = (dateTimeString: string) => {
  const parsedDate = parseISO(dateTimeString);
  return parsedDate.toTimeString().slice(0, 5); // Extract formatted time (00:00 - 23:59)
};

export const handleTimeChange = (time: any) => {
  if (time !== null) {
    const adjustedTime = new Date(time.toDate());
    adjustedTime.setHours(adjustedTime.getHours() - 3);
    console.log(adjustedTime.toISOString());
    return adjustedTime;
  } else {
    console.error("Time is undefined", time);
  }
};

export const localTime = (fecha: any) => {
  let res: Date = new Date(fecha);
  let local: string = res.toLocaleTimeString();
  local = local.split(" ")[0];
  return local;
};
