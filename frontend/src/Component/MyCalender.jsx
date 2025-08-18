import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";

export default function MyCalendar({onDateChange}) {
  const now = new Date();
  const [date, setDate] = useState(now);
const handleChange=(newDate)=>{
  setDate(newDate)
onDateChange(format(date, "yyyy-MM-dd"))
}
  return (
    <div className="p-4">
      <Calendar onChange={handleChange} value={date} />
      {/* Show formatted date */}
      <p className="mt-2">
        Selected Date: {format(date, "yyyy-MM-dd")}
      </p>
    </div>
  );
}
