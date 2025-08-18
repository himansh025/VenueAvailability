import { Outlet } from 'react-router-dom';
// import Sidebar from './';
import Navbar from './Navbar';
function Layout() {
  return (
    <div className="flex h-[calc(100vh-4rem)]"> {/* 4rem = navbar height */}
      {/* Sidebar only visible on medium and above */}
      
      <nav className=' md:hidden'>
      <Navbar /> {/* Show navbar on all pages */}
      </nav>
      {/* <aside className="hidden md:block md:w-64 bg-gray-950 text-white">
        <Sidebar />
      </aside> */}

      <main className="flex-1 mt-5 overflow-y-auto p-4 md:ml-10 md:mt-5">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;