import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, PlusCircle, XCircle } from "lucide-react";

const Footer = () => {
    return (
        <footer className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around py-3 border-t">
            <Link to="/student/completed" className="flex flex-col items-center text-gray-600 hover:text-[#a30c34] transition-colors duration-200">
                <CheckCircle size={24} />
                <span className="text-xs">Completed</span>
            </Link>
            <Link to="/student/dashboard" className="flex flex-col items-center text-gray-600 hover:text-[#a30c34] transition-colors duration-200">
                <PlusCircle size={28} />
                <span className="text-xs">Add</span>
            </Link>
            <Link to="/student/incompleted" className="flex flex-col items-center text-gray-600 hover:text-[#a30c34] transition-colors duration-200">
                <XCircle size={24} />
                <span className="text-xs">Incompleted</span>
            </Link>
        </footer>
    );
};

export default Footer;