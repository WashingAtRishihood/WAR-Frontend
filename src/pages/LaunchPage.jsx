import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/rishihood-logo.webp";
// Removed: import "./LaunchPage.css";

function LaunchPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            {/* Header */}
            <header className="mb-8">
                <img
                    src={logo}
                    alt="Rishihood University Logo"
                    className="w-32 h-32 object-contain mx-auto"
                />
            </header>

            {/* Main Section */}
            <main className="flex flex-col items-center">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Rishihood University <br /> Laundry Service
                </h1>
                <button
                    onClick={() => navigate("/home")}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                >
                    Let's Start
                </button>
            </main>
        </div>
    );
}

export default LaunchPage;