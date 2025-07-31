import React from "react";
import { Home, CheckCircle, PlusCircle, XCircle } from "lucide-react";

const Footer = () => {
    return (
        <footer className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around py-3 border-t">
            <button className="flex flex-col items-center text-gray-600 hover:text-[#a30c34]">
                <CheckCircle size={24} />
                <span className="text-xs">Completed</span>
            </button>
            <button className="flex flex-col items-center text-gray-600 hover:text-[#a30c34]">
                <PlusCircle size={28} />
                <span className="text-xs">Add</span>
            </button>
            <button className="flex flex-col items-center text-gray-600 hover:text-[#a30c34]">
                <XCircle size={24} />
                <span className="text-xs">Incompleted</span>
            </button>
        </footer>
    );
};

export default Footer;