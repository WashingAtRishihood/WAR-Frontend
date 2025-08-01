import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/rishihood-logo.webp";

function LaunchPage() {
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
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#333] leading-snug mb-8">
                    Rishihood University <br /> Laundry Service
                </h1>
                <button
                    onClick={() => navigate("/home")}
                    className="bg-[#a30c34] hover:bg-[#8b092d] text-white px-8 py-3 sm:px-7 sm:py-3 text-lg sm:text-l rounded-lg shadow transition"
                >
                    Let's Start
                </button>
            </main>
        </div>
    );
}

export default LaunchPage;