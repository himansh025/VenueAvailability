import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Component/Login';
import Layout from './Component/Layout';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import { useEffect, useState } from 'react';
import axiosInstance from '../src/Config/apiconfig';
import { format } from 'date-fns';
import {  setVenues } from './Store/slicer';
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
        // console.log("res",res.data.data)
        const updated = transformApiDataToSampleFormat(res?.data?.data)
        // setVenues(updated);
        dispatch(setVenues(updated))
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();

    if(venues?.length>=0){
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

  if(loading){
    return(
     <div
       style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
     <div style={{ textAlign: 'center' }}>
        <div
          style={{
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 10px',
          }}
        >

        </div>
        <p>Loading...</p>
      </div>
    </div>
    )
  }
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">

        <Routes>
          <Route path="/" element={<Layout />}>
            {user && user.role==="superadmin" ?(
              <Route path="/" element={<AdminDashboard />} />
            ):(
              <Route path="/" element={<HomePage />} />
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