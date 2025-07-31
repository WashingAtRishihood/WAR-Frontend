import React from "react";
import { useNavigate } from "react-router-dom";
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
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#333] mb-10">
                    Who you are?
                </h1>

                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                    <div
                        className="bg-white hover:bg-[#f9ecef] shadow-md rounded-lg px-10 py-6 cursor-pointer text-lg sm:text-xl font-medium transition"
                        onClick={() => navigate("/student/login")}
                    >
                        Student
                    </div>
                    <div
                        className="bg-white hover:bg-[#f9ecef] shadow-md rounded-lg px-10 py-6 cursor-pointer text-lg sm:text-xl font-medium transition"
                        onClick={() => navigate("/faculty/login")}
                    >
                        Faculty
                    </div>
                    <div
                        className="bg-white hover:bg-[#f9ecef] shadow-md rounded-lg px-10 py-6 cursor-pointer text-lg sm:text-xl font-medium transition"
                        onClick={() => navigate("/washerman/login")}
                    >
                        Washer Man
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HomePage;