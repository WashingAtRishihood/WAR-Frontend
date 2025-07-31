import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/rishihood-logo.webp";

function StudentLogin() {
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
                <h1 className="text-2xl sm:text-3xl font-semibold text-[#333] mb-8">
                    Student Login
                </h1>

                <form className="flex flex-col gap-5 w-full max-w-sm">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="px-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg"
                    />
                    <input
                        type="text"
                        placeholder="Enter your enrollment ID"
                        className="px-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg"
                    />
                    <button
                        type="button"
                        className="mt-4 bg-[#a30c34] hover:bg-[#8b092d] text-white font-medium py-3 rounded-lg transition text-lg"
                    >
                        Continue
                    </button>
                </form>

                <p className="mt-6 text-gray-700 text-base">
                    Don’t have an account?{" "}
                    <span
                        className="text-[#c45c29] font-medium hover:underline cursor-pointer"
                        onClick={() => navigate("/student/signup")}
                    >
                        Sign up
                    </span>
                </p>
            </main>
        </div>
    );
}

export default StudentLogin;