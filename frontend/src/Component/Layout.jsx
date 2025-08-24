import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
function Layout() {
  return (
    <div className="flex h-[calc(100vh-4rem)]"> {/* 4rem = navbar height */}
    
      
      <nav className=''>
      <Navbar /> 
      </nav>
    
      <main className="flex-1 mt-10 overflow-y-auto p-2 ">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;