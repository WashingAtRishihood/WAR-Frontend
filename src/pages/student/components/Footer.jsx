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
            <div className="max-w-md mx-auto px-4">
                {/* Glass effect background */}
                <div className="backdrop-blur-lg bg-white/80 border-t border-gray-200 rounded-t-2xl shadow-lg">
                    <div className="flex justify-around items-center py-3">
                        {nav.map((item) => {
                            const isActive = location.pathname === item.to;
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className="flex flex-col items-center gap-1 w-16 group"
                                >
                                    <div
                                        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${isActive
                                                ? "bg-[#a30c34] text-white shadow-md scale-110"
                                                : "text-gray-500 group-hover:text-[#a30c34]"
                                            }`}
                                    >
                                        {React.createElement(item.icon, {
                                            size: 22,
                                            stroke: 2,
                                        })}
                                    </div>
                                    <span
                                        className={`text-xs font-medium transition-colors ${isActive ? "text-[#a30c34]" : "text-gray-500"
                                            }`}
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