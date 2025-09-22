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
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
