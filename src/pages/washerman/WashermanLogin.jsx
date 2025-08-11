import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/rishihood-logo.webp";

function WashermanLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        // Common credentials for all washermen
        if (email === "1" && password === "1") {
            setError("");
            navigate("/washerman/dashboard");
        } else {
            setError("Invalid credentials. Please try again.");
        }
    };

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
                    Login
                </h1>

                <form className="flex flex-col gap-5 w-full max-w-sm">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg"
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg"
                    />
                    
                    {/* Error Message */}
                    {error && (
                        <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3">
                            {error}
                        </div>
                    )}
                    
                    <button
                        type="button"
                        onClick={handleLogin}
                        className="mt-4 bg-[#a30c34] hover:bg-[#8b092d] text-white font-medium py-3 rounded-lg transition text-lg"
                    >
                        Continue
                    </button>
                </form>
            </main>
        </div>
    );
}

export default WashermanLogin; 