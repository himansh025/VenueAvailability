<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Component/Login";
import Layout from "./Component/Layout";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
import LandingPage from "./Component/LandingPage";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public route */}
          <Route path="/" element={<LandingPage />} />

          {/* Routes inside Layout */}
          <Route element={<Layout />}>
            {/* Role-based dashboard */}
            {user && user.role === "superadmin" ? (
              <Route path="dashboard" element={<AdminDashboard />} />
            ) : (
              <Route path="dashboard" element={<HomePage />} />
            )}

            {/* Login page */}
            <Route path="login" element={<Login />} />
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './Component/Login';
import Layout from './Component/Layout';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import { useState } from 'react';

function App() {
  const { user } = useSelector(state => state.auth);

  // console.log("rerender")
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">

        <Routes>
          <Route path="/" element={<Layout />}>
            {user && user.role === "superadmin" ? (
              <Route path="/" element={<AdminDashboard />} />
            ) : (
              <Route path="/" element={<HomePage />} />
            )
            }
            <Route path="/login" element={<Login />} />
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
