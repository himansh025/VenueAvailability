import { useState, useEffect } from "react";
import axiosInstance from "../Config/apiconfig";
import classImg from "../assets/class.jpg";
import lab from "../assets/lab.webp";
import { useDispatch } from "react-redux";
import { setVenues } from "../Store/slicer"; // adjust import

export const useVacantVenues = (selectedDay, selectedTimeIndex, timeSlots) => {
  const [allDayVenues, setAllDayVenues] = useState({});
  const [vacantVenues, setVacantVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // transform function (same as before)
  const transformVacantVenues = (venueData, timeIndex) => {
    if (!venueData) return [];
    const transformedVenues = [];
    let venueId = 1;

    if (venueData.availableTheory && Array.isArray(venueData.availableTheory)) {
      venueData.availableTheory.forEach((venueName) => {
        transformedVenues.push({
          id: `theory-${venueId++}`,
          name: venueName,
          category: "classroom",
          image: classImg,
          isAvailable: true,
          availableTimes: [
            timeSlots.find((slot) => slot.index === timeIndex)?.label || "",
          ],
          description: `Classroom - ${venueName}`,
          selectedDay,
          selectedTime: timeIndex,
          timeSlot:
            timeSlots.find((slot) => slot.index === timeIndex)?.time || "",
          venueType: "theory",
        });
      });
    }

    if (venueData.availableLab && Array.isArray(venueData.availableLab)) {
      const uniqueLabVenues = [...new Set(venueData.availableLab)];
      uniqueLabVenues.forEach((venueName) => {
        transformedVenues.push({
          id: `lab-${venueId++}`,
          name: venueName,
          category: "lab",
          capacity: 30,
          image: lab,
          isAvailable: true,
          availableTimes: [
            timeSlots.find((slot) => slot.index === timeIndex)?.label || "",
          ],
          description: `Laboratory - ${venueName}`,
          selectedDay,
          selectedTime: timeIndex,
          timeSlot:
            timeSlots.find((slot) => slot.index === timeIndex)?.time || "",
          venueType: "lab",
        });
      });
    }

    return transformedVenues;
  };

  const filterVenuesByTime = (dayVenues, timeIndex) => {
    if (!dayVenues || !dayVenues[timeIndex]) {
      setVacantVenues([]);
      return;
    }
    const timeSlotData = dayVenues[timeIndex];
    const transformedVenues = transformVacantVenues(timeSlotData, timeIndex);
    setVacantVenues(transformedVenues);
    dispatch(setVenues(transformedVenues));
  };

  const fetchVacantVenues = async () => {
    setLoading(true);
    try {
      console.log("fdegvd",selectedDay)
      const res = await axiosInstance.post(`/vacent`, {
        reqday: selectedDay,
        lectureindex: selectedTimeIndex,
      });

      console.log("eqchvfedc",res.data)
      setAllDayVenues(res?.data || {});
      filterVenuesByTime(res?.data, selectedTimeIndex);
    } catch (error) {
      console.error("Error fetching vacant venues:", error);
      setVacantVenues([]);
      setAllDayVenues({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacantVenues();
  }, [selectedDay]);

  useEffect(() => {
    if (Object.keys(allDayVenues).length > 0) {
      filterVenuesByTime(allDayVenues, selectedTimeIndex);
    }
  }, [selectedTimeIndex, allDayVenues]);

  return { vacantVenues, allDayVenues, loading, fetchVacantVenues };
};
