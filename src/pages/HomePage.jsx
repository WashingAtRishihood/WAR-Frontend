import React from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, UserCheck } from "lucide-react";
import logo from "../assets/rishihood-logo.webp";

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-[#faf6f3] font-['Playfair_Display']">
            {/* Header */}
            <header className="p-6">
                <img
                    src={logo}
                    alt="Rishihood University Logo"
                    className="w-28 sm:w-32 md:w-36 object-contain"
                />
            </header>

            {/* Main Section */}
            <main className="flex flex-col items-center justify-center flex-1 text-center px-4">
                <div className="max-w-sm mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-bold text-[#333] mb-4">
                        Welcome
                    </h1>
                    <p className="text-gray-600 text-lg mb-16">
                        Choose your role to continue
                    </p>

                    <div className="space-y-6">
                        <button
                            onClick={() => navigate("/student/login")}
                            className="w-full bg-white shadow-lg hover:shadow-xl border border-gray-200 hover:border-[#a30c34] rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="flex flex-col items-center space-y-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#a30c34] to-[#d63384] rounded-2xl flex items-center justify-center shadow-md">
                                    <GraduationCap className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-[#333] mb-2">Student</h3>
                                    <p className="text-gray-500 text-sm">Submit & track your laundry</p>
                                </div>
                            </div>
                        </button>

                        <button
                            onClick={() => navigate("/washerman/login")}
                            className="w-full bg-white shadow-lg hover:shadow-xl border border-gray-200 hover:border-[#a30c34] rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="flex flex-col items-center space-y-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#a30c34] to-[#d63384] rounded-2xl flex items-center justify-center shadow-md">
                                    <UserCheck className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-[#333] mb-2">Washer Man</h3>
                                    <p className="text-gray-500 text-sm">Manage laundry orders</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HomePage