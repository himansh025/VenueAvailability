
import { format } from "date-fns";

    const days = {
      0: "sunday",
      1: "monday",
      2: "tuesday",
      3: "wednesday",
      4: "thursday",
      5: "friday",
      6: "saturday",
    };
      const newDate=new Date
      const dayName = days[newDate.getDay()]; // Get day name
      const formattedDate = format(newDate, "yyyy-MM-dd"); // Format date
  
  const timeSlots = [
    { index: '0', time: '9:00-10:00', label: '9:00 AM - 10:00 AM' },
    { index: '1', time: '10:00-11:00', label: '10:05 AM - 11:05 AM' },
    { index: '2', time: '11:00-12:00', label: '11:25 AM - 12:25 PM' },
    { index: '3', time: '12:00-13:00', label: '12:30 PM - 1:30 PM' },
    { index: '4', time: '13:00-14:00', label: '1:35 PM - 2:35 PM' },
    { index: '5', time: '14:00-15:00', label: '2:40 PM - 3:40 PM' },
    { index: '6', time: '15:00-16:00', label: '3:40 PM - 4:40 PM' }
  ];

  export {timeSlots,days,dayName,formattedDate}