import { Routes, Route} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './Component/Login';
import Signup from './Component/Signup';
import Layout from './components/Layout';

function App() {
  const { user } = useSelector(state => state.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
          <Route element={<Layout />}>
              <Route path="/login" element={<Login /> } />
              <Route path="/register" element={ <Signup />} />
          
          </Route>

      </Routes>
    </div>
  );
}

export default App;