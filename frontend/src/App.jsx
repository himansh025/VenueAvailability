import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './Component/Login';
import Signup from './Component/Signup';
import Layout from './Component/Layout';
import HomePage from './Component/HomePage';

function App() {
  const { user } = useSelector(state => state.auth);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;