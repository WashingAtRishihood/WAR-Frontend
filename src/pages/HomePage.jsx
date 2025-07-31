import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/rishihood-logo.webp";

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            {/* Header */}
            <header className="mb-8">
                <img src={logo} alt="Rishihood University Logo" className="w-32 h-32 object-contain mx-auto" />
            </header>

            {/* Main Section */}
            <main className="flex flex-col items-center">
                <h1 className="text-3xl font-bold text-center mb-8">Who you are?</h1>
                <div className="flex gap-8">
                    <div
                        className="px-8 py-6 bg-white rounded-lg shadow cursor-pointer hover:bg-green-100 text-lg font-semibold"
                        onClick={() => navigate("/student/login")}
                    >
                        Student
                    </div>
                    <div
                        className="px-8 py-6 bg-white rounded-lg shadow cursor-pointer hover:bg-blue-100 text-lg font-semibold"
                        onClick={() => navigate("/faculty/login")}
                    >
                        Faculty
                    </div>
                    <div
                        className="px-8 py-6 bg-white rounded-lg shadow cursor-pointer hover:bg-yellow-100 text-lg font-semibold"
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