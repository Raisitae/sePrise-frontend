import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import {
  Calendar as ReactCalendar,
  CalendarProps as ReactCalendarProps,
} from "react-calendar";

type CalendarDate = Date | [Date, Date];

interface CalendarProps extends Omit<ReactCalendarProps, "onChange"> {
  mode?: "single" | "range";
  initialFocus?: boolean;
  onSelect: (date: CalendarDate) => void;
}

export function Calendar({
  mode,
  initialFocus,
  onSelect,
  ...props
}: CalendarProps) {
  const [date, setDate] = useState<CalendarDate>(new Date());

  useEffect(() => {
    if (initialFocus) {
      // Ensure calendar is focused on mount if required
      // Logic for initial focus (if any)
    }
  }, [initialFocus]);

  const handleDateChange = (selectedDate: CalendarDate) => {
    setDate(selectedDate);
    onSelect(selectedDate);
  };

  return (
    <div className="p-4">
      <ReactCalendar
        value={date}
        onChange={(value) => handleDateChange(value as CalendarDate)}
        selectRange={mode === "range"}
        showNeighboringMonth={false}
        className="react-calendar"
        {...props}
      />
    </div>
  );
}
