import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogInIcon, LogOut, Menu, School2Icon, UsersIcon, X } from 'lucide-react';
import { logout } from '../Store/authSlicer';
import { useState } from 'react';
import { MdDashboard, MdOutlineLogin, MdWorkspaces } from 'react-icons/md';
import { FaSignOutAlt, FaTasks } from 'react-icons/fa';

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="mr-4 text-gray-300 hover:text-white"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold flex items-center">
                <School2Icon className="h-6 w-6 mr-2" />
                Venue 
              </span>
            </Link>
          </div>
          
          {/* User info in header (always visible) */}
          {user && (
            <div className="text-sm text-gray-300">
              Hi, {user.name}
            </div>
          )}
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="bg-gray-900 border-t-2 pb-4">
            <div className="flex flex-col space-y-2 px-4 pt-2">
                  <Link 
                    to="/" 
                    className="py-2 px-3 rounded flex gap-2 items-center hover:bg-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MdDashboard/>
                    Dashboard
                  </Link>
              {user ? (
                <>
                  <Link 
                    to="/task-list" 
                    className="py-2 px-3 flex gap-2  items-center rounded hover:bg-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaTasks/>
                    Project Tasks
                  </Link>
                  {user.role === "admin" && (
                    <Link 
                      to="/all-users" 
                      className="py-2 px-3 flex items-center gap-2 rounded hover:bg-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <UsersIcon/>
                      All Members
                    </Link>
                  )}
                  <div className="pt-2 border-t border-gray-700">
                    <div className="flex items-center justify-between py-2 px-3">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-1 text-gray-300 hover:text-white"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="py-2 flex gap-2 items-center px-3 rounded hover:bg-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                                      <MdOutlineLogin/>

                    Login
                  </Link>
             
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;