import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { logout } from '../Store/slicer';
import { useState } from 'react';
import LoginModal from './LoginModal';

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-950 text-white shadow-2xl fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-gray-700/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center gap-8">
              <button
                onClick={toggleMobileMenu}
                className="mr-2 text-gray-300 hover:text-white transition-colors duration-200 md:hidden p-2 hover:bg-gray-700 rounded-lg"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <Link to="/" className="flex items-center group">
                <div className="flex items-center gap-3">
                  {/* Logo Icon */}
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                    <span className="text-lg font-bold text-white">V</span>
                  </div>
                  {/* Brand Name */}
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent group-hover:from-blue-300 transition-all duration-300 hidden sm:block">
                    VENUEIFY
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center gap-1">
              {user && (
                <Link
                  to="/"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
                >
                  <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-medium">Dashboard</span>
                </Link>
              )}

              {user && user.role === 'superadmin' && (
                <>
                  <Link
                    to="/all-users"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
                  >
                    <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="font-medium">Members</span>
                  </Link>

                  {/* <Link
                    to="/venues"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
                  >
                    <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m4-4h1m-1 4h1" />
                    </svg>
                    <span className="font-medium">Venues</span>
                  </Link> */}

                  <Link
                    to="/timetable"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
                  >
                    <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">TimeTable</span>
                  </Link>
                </>
              )}
            </div>

            {/* User Actions - Right */}
            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  {/* User Dropdown */}
                  <div className="relative hidden md:block">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2.5 px-3 py-2.5 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-200"
                    >
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-sm leading-none">{user.name || 'User'}</div>
                        <div className="text-gray-400 text-xs capitalize mt-1">{user.role}</div>
                      </div>
                      <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl overflow-hidden z-10">
                        <div className="px-4 py-3 border-b border-gray-700 bg-gray-700/50">
                          <p className="text-sm font-semibold text-white">{user.name}</p>
                          <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                        </div>
                        <button
                          onClick={() => {
                            handleLogout();
                            setDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors duration-200 font-medium"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Logout Button (Mobile) */}
                  <button
                    onClick={handleLogout}
                    className="md:hidden flex items-center gap-2 px-3 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200 font-medium"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={openLoginModal}
                  className="flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-blue-500/30 active:scale-95 text-sm md:text-base"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-gray-800/80 backdrop-blur-lg border-t border-gray-700 rounded-b-xl animate-in">
              <div className="flex flex-col gap-1 px-4 py-4">
                {user && (
                  <>
                    {/* User Card */}
                    <div className="px-3 py-3 rounded-lg bg-gray-700/50 border border-gray-600 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{user.name}</p>
                          <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                        </div>
                      </div>
                    </div>

                    {/* Dashboard */}
                    <Link
                      to="/"
                      className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <span className="font-medium">Dashboard</span>
                    </Link>

                    {/* Superadmin Links */}
                    {user.role === 'superadmin' && (
                      <>
                        <Link
                          to="/all-users"
                          className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span className="font-medium">Members</span>
                        </Link>

                        {/* <Link
                          to="/venues"
                          className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m4-4h1m-1 4h1" />
                          </svg>
                          <span className="font-medium">Venues</span>
                        </Link> */}

                        <Link
                          to="/timetable"
                          className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium">TimeTable</span>
                        </Link>
                      </>
                    )}

                    {/* Logout */}
                    <div className="pt-3 mt-2 border-t border-gray-700">
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-3 px-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg transition-colors duration-200 font-medium"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                )}

                {!user && (
                  <button
                    onClick={openLoginModal}
                    className="flex items-center justify-center gap-2 py-3 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-colors duration-200 font-medium"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
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