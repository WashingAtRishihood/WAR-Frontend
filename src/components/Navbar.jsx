import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/rishihood-logo.webp";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#faf6f3] shadow-md px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
                <img
                    src={logo}
                    alt="Rishihood University Logo"
                    className="w-28 sm:w-32 object-contain"
                />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 font-medium text-gray-700">
                <Link to="/home" className="hover:text-[#a30c34]">Home</Link>
                <Link to="/student/login" className="hover:text-[#a30c34]">Student</Link>
                <Link to="/faculty/login" className="hover:text-[#a30c34]">Faculty</Link>
                <Link to="/washerman/login" className="hover:text-[#a30c34]">Washerman</Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden flex flex-col space-y-1 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="w-6 h-0.5 bg-gray-800"></span>
                <span className="w-6 h-0.5 bg-gray-800"></span>
                <span className="w-6 h-0.5 bg-gray-800"></span>
            </button>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-16 right-4 bg-white border shadow-md rounded-lg flex flex-col space-y-3 p-4 w-40 md:hidden z-50">
                    <Link to="/home" className="hover:text-[#a30c34]" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/student/login" className="hover:text-[#a30c34]" onClick={() => setIsOpen(false)}>Student</Link>
                    <Link to="/faculty/login" className="hover:text-[#a30c34]" onClick={() => setIsOpen(false)}>Faculty</Link>
                    <Link to="/washerman/login" className="hover:text-[#a30c34]" onClick={() => setIsOpen(false)}>Washerman</Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;