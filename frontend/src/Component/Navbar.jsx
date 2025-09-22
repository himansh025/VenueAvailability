import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
<<<<<<< HEAD
import { LogInIcon, LogOut, Menu, School2Icon, UsersIcon, X, User } from 'lucide-react';
=======
import { LogInIcon, LogOut, Menu, School2Icon, UsersIcon, X } from 'lucide-react';
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
import { logout } from '../Store/slicer';
import { useState } from 'react';
import { MdDashboard, MdOutlineLogin, MdWorkspaces } from 'react-icons/md';
import { FaSignOutAlt, FaTasks } from 'react-icons/fa';
<<<<<<< HEAD
import LoginModal from './LoginModal';  
=======
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
<<<<<<< HEAD
  const [loginModalOpen, setLoginModalOpen] = useState(false);
=======
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

<<<<<<< HEAD
  const openLoginModal = () => {
    setLoginModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="mr-4 text-gray-300 hover:text-white transition-colors duration-200 md:hidden"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <Link to="/" className="flex items-center group">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <School2Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    VENUEIFY
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <MdDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>

              {user && user.role === "admin" && (
                <Link
                  to="/all-users"
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  <UsersIcon className="h-4 w-4" />
                  <span>All Members</span>
                </Link>
              )}
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-gray-700 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">{user.name || 'User'}</div>
                      <div className="text-gray-400 text-xs capitalize">{user.role}</div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:block">Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={openLoginModal}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                >
                  <LogInIcon className="h-4 w-4" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-gray-800 border-t border-gray-700 rounded-b-lg">
              <div className="flex flex-col space-y-1 px-4 py-3">
                <Link
                  to="/"
                  className="flex items-center space-x-3 py-3 px-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MdDashboard className="h-5 w-5 text-blue-400" />
                  <span>Dashboard</span>
                </Link>
                
                {user ? (
                  <>
                    {user.role === "admin" && (
                      <Link
                        to="/all-users"
                        className="flex items-center space-x-3 py-3 px-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <UsersIcon className="h-5 w-5 text-green-400" />
                        <span>All Members</span>
                      </Link>
                    )}
                    
                    <div className="pt-3 border-t border-gray-700">
                      <div className="flex items-center space-x-3 py-2 px-3 bg-gray-700 rounded-lg mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{user.name || 'User'}</div>
                          <div className="text-gray-400 text-xs capitalize">{user.role}</div>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 py-3 px-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={openLoginModal}
                    className="flex items-center space-x-3 py-3 px-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                  >
                    <LogInIcon className="h-5 w-5" />
                    <span>Login</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      {loginModalOpen && (
        <LoginModal 
          isOpen={loginModalOpen} 
          onClose={() => setLoginModalOpen(false)} 
        />
      )}
    </>
  );
}

export default Navbar;
=======
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
          {user&&(
              <button
                        onClick={handleLogout}
                        className="  md:flex items-center gap-1 border px-2 md:px-3 py-1 md:py-1  bg-red-700 rounded-full hover:text-white"
                      >
                        Logout
                      </button>)
                      }
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
                <MdDashboard />
                Dashboard
              </Link>
              {user ? (
                <>
                  {/* <Link
                    to="/task-"
                    className="py-2 px-3 flex gap-2  items-center rounded hover:bg-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaTasks />
                    Project Tasks
                  </Link> */}
                  {user.role === "admin" && (
                    <Link
                      to="/all-users"
                      className="py-2 px-3 flex items-center gap-2 rounded hover:bg-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <UsersIcon />
                      All Members
                    </Link>
                  )}
                  <div className="pt-2 border-t border-gray-700">
                    <div className="flex items-center justify-between py-2 px-3">
                   
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
                    <MdOutlineLogin />

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
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
