import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/rishihood-logo.webp";
// Removed: import "./StudentLogin.css";

function StudentLogin() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            {/* Header */}
            <header className="mb-8">
                <img src={logo} alt="Rishihood University Logo" className="w-32 h-32 object-contain mx-auto" />
            </header>

            {/* Main Content */}
            <main className="flex flex-col items-center w-full">
                <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
                <form className="flex flex-col gap-4 w-full max-w-sm bg-white p-8 rounded-lg shadow">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <input
                        type="text"
                        placeholder="Enter your enrollment id"
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <button type="button" className="px-6 py-2 rounded bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition">
                        Continue
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Don't have an account?{' '}
                    <span
                        className="text-green-600 hover:underline cursor-pointer"
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