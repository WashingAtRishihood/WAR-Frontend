import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/rishihood-logo.webp";
import { Clock, X, User, LogOut, Star } from "lucide-react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Service status state for toggle
  const [serviceStatus, setServiceStatus] = useState({
    status: "Open",
    isOpen: true,
    color: "text-green-600"
  });

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

        {/* Right: Service Status (editable) & Stats button */}
        <div className="flex items-center space-x-4">
          {/* Editable Service Status */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-full bg-white border border-gray-200 shadow-sm relative group">
            <Clock className="w-4 h-4 text-gray-600 mr-1" />
            <button
              onClick={handleStatusToggle}
              className={`flex items-center px-4 py-1 rounded-full border transition font-semibold text-xs focus:outline-none shadow-sm ${serviceStatus.isOpen ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'}`}
              aria-pressed={serviceStatus.isOpen}
            >
              <span className="mr-2">{serviceStatus.isOpen ? 'Open' : 'Closed'}</span>
              <span className={`w-2 h-2 rounded-full ${serviceStatus.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </button>
          </div>
          {/* Stats Button */}
          <Link
            to="/washerman/stats"
            className="bg-[#a30c34] hover:bg-[#8b092d] text-white px-6 py-2 rounded-lg font-semibold shadow transition text-base sm:text-lg"
          >
            Stats
          </Link>
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

          {/* Menu Content */}
          <div className="mobile-menu absolute top-0 right-0 w-80 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
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

            {/* User Profile Section */}
            {/* Profile section removed for washerman */}

            {/* Service Status */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-600" />
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${serviceStatus.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`text-sm font-medium ${serviceStatus.color}`}>
                    Service: {serviceStatus.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Menu - Simplified */}
            <div className="py-4">
              <Link
                to="/student/profile"
                className="flex items-center px-6 py-4 hover:bg-gray-50 text-gray-700 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-base font-medium">My Profile</span>
              </Link>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.open('https://forms.gle/tyKosaoDJZAGUqDA9', '_blank');
                }}
                className="flex items-center px-6 py-4 hover:bg-gray-50 text-gray-700 transition-colors duration-200 w-full text-left"
              >
                <span className="text-base font-medium">Feedback</span>
              </button>
            </div>

            {/* Rate Us section removed for washerman */}

            {/* Sign Out Button */}
            <div className="absolute bottom-6 left-6 right-6">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  // Add logout logic here
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