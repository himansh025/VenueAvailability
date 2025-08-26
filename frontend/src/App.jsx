import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import Login from './Component/Login';
import Layout from './Component/Layout';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import {  useState } from 'react';

function App() {
  const { user } = useSelector(state => state.auth);
  const [loading,setLoading]= useState(false)


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