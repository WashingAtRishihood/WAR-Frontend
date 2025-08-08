import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import logo from "../../../assets/rishihood-logo.webp";

const WashermanNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/home");
    };

    return (
        <header className="bg-white shadow-md px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <img
                        src={logo}
                        alt="Rishihood Logo"
                        className="w-24 sm:w-28 object-contain"
                    />
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:block">Logout</span>
                </button>
            </div>
        </header>
    );
};

export default WashermanNavbar; 