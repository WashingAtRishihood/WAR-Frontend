import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/rishihood-logo.webp";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function StudentSignup1() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSendOtp = () => {
        if (!email) {
            setError("Enter your email first");
            return;
        }
        setError("");
        setOtpSent(true);
        alert("OTP sent successfully (demo). Use 1234 to continue.");
    };

    const handleVerifyAndNext = (e) => {
        e.preventDefault();

        if (!otp || !password || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }
        if (otp !== "1234") {
            setError("Invalid OTP (use 1234 for demo)");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError("");
        navigate("/student/signup2", { state: { email } });
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#faf6f3] font-['Playfair_Display']">
            {/* Header */}
            <header className="p-3.5 relative z-10">
                <img
                    src={logo}
                    alt="Rishihood University Logo"
                    className="w-28 sm:w-32 md:w-36 object-contain drop-shadow-lg"
                />
            </header>

            {/* Main Section */}
            <main className="flex flex-col items-center justify-center flex-1 text-center px-4">
                <h1 className="text-2xl sm:text-3xl font-semibold text-[#333] mb-8">
                    Sign Up
                </h1>

                <form
                    onSubmit={handleVerifyAndNext}
                    className="flex flex-col gap-5 w-full max-w-sm"
                >
                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg"
                        required
                    />

                    <button
                        type="button"
                        onClick={handleSendOtp}
                        className="bg-[#a30c34] hover:bg-[#8b092d] text-white font-medium py-3 rounded-lg transition text-lg"
                    >
                        {otpSent ? "Resend OTP" : "Send OTP"}
                    </button>

                    {/* OTP + Passwords (only show after OTP is sent) */}
                    {otpSent && (
                        <>
                            <input
                                type="text"
                                placeholder="Enter OTP (1234)"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg"
                                required
                            />

                            <div className="border border-gray-300 rounded-md bg-[#fffdfc] focus-within:ring-2 focus-within:ring-[#a30c34] flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="New Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-lg"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="px-3 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible size={20} />
                                    ) : (
                                        <AiOutlineEye size={20} />
                                    )}
                                </button>
                            </div>

                            <div className="border border-gray-300 rounded-md bg-[#fffdfc] focus-within:ring-2 focus-within:ring-[#a30c34] flex items-center">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-lg"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                    className="px-3 text-gray-500 hover:text-gray-700"
                                >
                                    {showConfirmPassword ? (
                                        <AiOutlineEyeInvisible size={20} />
                                    ) : (
                                        <AiOutlineEye size={20} />
                                    )}
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-2 bg-[#a30c34] hover:bg-[#8b092d] disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition text-lg"
                            >
                                Next
                            </button>
                        </>
                    )}
                </form>

                {/* Error Message */}
                {error && (
                    <div className="mt-4 text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3 w-full max-w-sm">
                        {error}
                    </div>
                )}

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

export default StudentSignup1;