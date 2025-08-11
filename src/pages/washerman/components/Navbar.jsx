import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/rishihood-logo.webp";
import { Clock, X, User, LogOut, Star, Settings, BarChart2, Menu } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [serviceStatus, setServiceStatus] = useState({
    status: "Open",
    isOpen: true,
    color: "text-green-600"
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = React.useRef();

  // Handler for toggle
  const handleStatusToggle = () => {
    setServiceStatus(prev => {
      const isOpen = !prev.isOpen;
      return {
        status: isOpen ? "Open" : "Closed",
        isOpen,
        color: isOpen ? "text-green-600" : "text-red-600"
      };
    });
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-[#faf6f3] shadow-lg px-4 sm:px-6 py-3 flex items-center justify-between font-medium z-50">
        {/* Left: Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Rishihood Logo"
            className="w-24 sm:w-28 md:w-32 object-contain drop-shadow-lg"
          />
        </div>

        {/* Center: (empty for now) */}
        <div className="hidden lg:flex flex-1 justify-center"></div>

        {/* Right: Service Status (editable) & Profile Dropdown */}
        <div className="flex items-center space-x-4">
          {/* Editable Service Status */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-full bg-white border border-gray-200 shadow group relative">
            <Clock className="w-4 h-4 text-gray-600 mr-1" />
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setServiceStatus({ status: 'Open', isOpen: true, color: 'text-green-600' })}
                className={`px-4 py-1 rounded-full font-semibold text-xs transition-colors duration-200 focus:outline-none ${serviceStatus.status === 'Open' ? 'bg-green-500 text-white shadow' : 'bg-transparent text-gray-700'}`}
                aria-pressed={serviceStatus.status === 'Open'}
              >
                Open
              </button>
              <button
                onClick={() => setServiceStatus({ status: 'Closed', isOpen: false, color: 'text-red-600' })}
                className={`px-4 py-1 rounded-full font-semibold text-xs transition-colors duration-200 focus:outline-none ml-1 ${serviceStatus.status === 'Closed' ? 'bg-red-500 text-white shadow' : 'bg-transparent text-gray-700'}`}
                aria-pressed={serviceStatus.status === 'Closed'}
              >
                Closed
              </button>
            </div>
            <span className={`w-2 h-2 rounded-full ${serviceStatus.status === 'Open' ? 'bg-green-500' : 'bg-red-500'}`}></span>
          </div>
          {/* Profile Dropdown - Desktop Only */}
          <div className="hidden lg:block relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
              aria-label="Washerman Menu"
            >
              <Settings className="w-7 h-7 text-[#a30c34]" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-xl rounded-xl z-50 overflow-hidden">
                <div className="py-1">
                  <Link
                    to="/washerman/stats"
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 transition-colors duration-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <BarChart2 className="w-4 h-4" />
                    <span>Stats</span>
                  </Link>
                  <Link
                      to="/washerman/student-lookup"
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 transition-colors duration-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Student Lookup</span>
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate('/washerman/login');
                    }}
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 text-sm text-red-600 transition-colors duration-200 w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden mobile-menu-button p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </nav>
      {/* Mobile Menu - Full Screen Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          <div className="mobile-menu absolute top-0 right-0 w-80 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">Rishihood University</h3>
                <p className="text-xs text-gray-500">Laundry Service</p>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            {/* Service Status Toggle */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-600" />
                <div className="flex items-center bg-gray-100 rounded-full p-1">
                  <button
                    onClick={() => setServiceStatus({ status: 'Open', isOpen: true, color: 'text-green-600' })}
                    className={`px-4 py-1 rounded-full font-semibold text-xs transition-colors duration-200 focus:outline-none ${serviceStatus.status === 'Open' ? 'bg-green-500 text-white shadow' : 'bg-transparent text-gray-700'}`}
                    aria-pressed={serviceStatus.status === 'Open'}
                  >
                    Open
                  </button>
                  <button
                    onClick={() => setServiceStatus({ status: 'Closed', isOpen: false, color: 'text-red-600' })}
                    className={`px-4 py-1 rounded-full font-semibold text-xs transition-colors duration-200 focus:outline-none ml-1 ${serviceStatus.status === 'Closed' ? 'bg-red-500 text-white shadow' : 'bg-transparent text-gray-700'}`}
                    aria-pressed={serviceStatus.status === 'Closed'}
                  >
                    Closed
                  </button>
                </div>
                <span className={`w-2 h-2 rounded-full ${serviceStatus.status === 'Open' ? 'bg-green-500' : 'bg-red-500'}`}></span>
              </div>
            </div>
            {/* Navigation Menu */}
            <div className="py-4 flex-1">
              <Link
                to="/washerman/stats"
                className="flex items-center px-6 py-4 hover:bg-gray-50 text-gray-700 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BarChart2 className="w-5 h-5 mr-3" />
                <span className="text-base font-medium">Stats</span>
              </Link>
              <Link
                to="/washerman/student-lookup"
                className="flex items-center px-6 py-4 hover:bg-gray-50 text-gray-700 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-5 h-5 mr-3" />
                <span className="text-base font-medium">Student Lookup</span>
              </Link>
            </div>
            {/* Sign Out Button */}
            <div className="px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/washerman/login');
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;