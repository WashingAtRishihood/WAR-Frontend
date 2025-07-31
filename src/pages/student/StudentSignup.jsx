import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/rishihood-logo.webp";

function StudentSignup() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-[#faf6f3] font-['Playfair_Display']">
            {/* Header */}
            <header className="p-6">
                <img
                    src={logo}
                    alt="Rishihood University Logo"
                    className="w-28 sm:w-32 md:w-36 object-contain ml-2"
                />
            </header>

            {/* Main */}
            <main className="flex flex-col items-center justify-center flex-1 px-4">
                <h1 className="text-2xl sm:text-3xl font-semibold text-[#333] mb-8">
                    Sign Up
                </h1>
                <form className="flex flex-col gap-5 w-full max-w-sm">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        required
                        className="px-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg"
                    />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="px-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg"
                    />
                    <input
                        type="tel"
                        placeholder="Enter your phone number"
                        required
                        className="px-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg"
                    />
                    <input
                        type="text"
                        placeholder="Enter your enrollment ID"
                        required
                        className="px-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg"
                    />
                    <input
                        type="text"
                        placeholder="Enter your bag number"
                        required
                        className="px-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg"
                    />
                    <button
                        type="submit"
                        className="mt-4 bg-[#a30c34] hover:bg-[#8b092d] text-white font-medium py-3 rounded-lg transition text-lg"
                    >
                        Create Account
                    </button>
                </form>
                <p className="mt-6 text-gray-700 text-base">
                    Already have an account?{" "}
                    <span
                        className="text-[#c45c29] font-medium hover:underline cursor-pointer"
                        onClick={() => navigate("/student/login")}
                    >
                        Login
                    </span>
                </p>
            </main>
        </div>
    );
}

export default StudentSignup;