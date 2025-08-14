
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IconAlertCircle, IconPlus, IconListCheck } from "@tabler/icons-react";

const Footer = () => {
    const location = useLocation();
    const nav = [
        { to: "/student/incomplete", label: "Incomplete", icon: IconAlertCircle },
        { to: "/student/dashboard", label: "Dashboard", icon: IconPlus },
        { to: "/student/completed", label: "Completed", icon: IconListCheck },
    ];

    return (
        <footer className="md:hidden fixed bottom-0 left-0 w-full z-50">
            <div className="max-w-md mx-auto px-2 sm:px-4">
                <div className="backdrop-blur-xl bg-white/80 border-t border-gray-200 rounded-t-3xl shadow-2xl">
                    <div className="flex justify-between items-center py-2 px-2 sm:px-4">
                        {nav.map((item) => {
                            const isActive = location.pathname === item.to;
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className="flex flex-col items-center gap-1 flex-1 group"
                                >
                                    <div
                                        className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 shadow-sm border border-transparent ${isActive
                                            ? "bg-gradient-to-tr from-[#a30c34] to-[#e85d75] text-white shadow-lg border-[#a30c34] scale-110"
                                            : "bg-white text-gray-500 group-hover:text-[#a30c34] group-hover:bg-gray-100"
                                            }`}
                                    >
                                        {React.createElement(item.icon, {
                                            size: 24,
                                            stroke: 2,
                                        })}
                                    </div>
                                    <span
                                        className={`text-[0.8rem] font-semibold transition-colors ${isActive ? "text-[#a30c34]" : "text-gray-500 group-hover:text-[#a30c34]"}`}
                                    >
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;