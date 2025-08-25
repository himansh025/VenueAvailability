import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Component/Login';
import Layout from './Component/Layout';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {  setVenues } from './Store/slicer';
import axiosInstance from './Config/apiconfig';
function App() {
  const { user } = useSelector(state => state.auth);
  const { venues } = useSelector(state => state.venue);
  const [loading,setLoading]= useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const today = new Date();

    const formattedDate = format(today, "yyyy-MM-dd");
// console.log(formattedDate)
    const fetchVenues = async () => {
      try {
        const res = await axiosInstance.get(`/venues?date=${formattedDate}`);
        console.log("res",res?.data?.data)
        const updated = transformApiDataToSampleFormat(res?.data?.data)
        setVenues(updated);
        dispatch(setVenues(updated))
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
      finally{
        setLoading(false)
      }
    };

    fetchVenues();

    if(venues?.length>0){
      setLoading(false)
    }
     console.log(venues)
    },[]);
    

  // Transform API data to UI-friendly format
  const transformApiDataToSampleFormat = (apiData) => {
    return apiData.map((venue) => ({

      id: venue._id,
      name: venue.name,
      category: venue.type?.toLowerCase() || "other", // normalize type
      capacity: venue.capacity,
      isAvailable: venue.isAvailable,
      location: venue.location,
      availableTimes: venue.availableTimes || [],
      unavailableTimes: venue.unavailableTimes || [],
      image: getDefaultImage(venue.type),
      bookingDetials: venue?.bookedSlots
    }));
  };

  // Default images per category
  const getDefaultImage = (type) => {
    const imageMap = {
      "Seminar Hall":
        "https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg?auto=compress&cs=tinysrgb&w=400",
      Classroom:
        "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=400",
    };
    return (
      imageMap[type] ||
      "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=400"
    );
  };


  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">

        <Routes>
          <Route path="/" element={<Layout />}>
            {user && user.role==="superadmin" ?(
              <Route path="/" element={<AdminDashboard />} />
            ):(
              <Route path="/" element={<HomePage loader={loading} />} />
            )
            }
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;