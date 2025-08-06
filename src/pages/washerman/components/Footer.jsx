import React from "react";
import { Link } from "react-router-dom";
import { Home, Package, CheckCircle } from "lucide-react";

const Footer = () => {
    return (
        <footer className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around py-3 border-t z-50">
            <Link to="/washerman/received" className="flex flex-col items-center text-gray-600 hover:text-[#a30c34] transition-colors duration-200">
                <Package size={24} />
                <span className="text-xs">Received</span>
            </Link>
            <Link to="/washerman/home" className="flex flex-col items-center text-gray-600 hover:text-[#a30c34] transition-colors duration-200">
                <Home size={24} />
                <span className="text-xs">Home</span>
            </Link>
            <Link to="/washerman/ready" className="flex flex-col items-center text-gray-600 hover:text-[#a30c34] transition-colors duration-200">
                <CheckCircle size={24} />
                <span className="text-xs">Ready</span>
            </Link>
        </footer>
    );
};

export default Footer; 