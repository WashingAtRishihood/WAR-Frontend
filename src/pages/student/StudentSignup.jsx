import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Send } from "lucide-react";
import logo from "../../assets/rishihood-logo.webp";

function StudentSignup() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);

    const handleSendOtp = () => {
        if (email) {
            setOtpSent(true);
            // Backend call to send OTP
            console.log("OTP sent to:", email);
        }
    };

    const handleVerifyOtp = () => {
        if (otp) {
            setEmailVerified(true);
            // Backend call to verify OTP
            console.log("OTP verified:", otp);
        }
    };

    const handleCreateAccount = () => {
        if (password === confirmPassword && emailVerified) {
            setStep(2);
            // Backend call to create account
            console.log("Account created, moving to step 2");
        }
    };

    const handleCompleteSignUp = () => {
        // Backend call to save personal details
        console.log("Personal details saved, navigating to dashboard");
        navigate("/student/dashboard");
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#faf6f3] font-['Playfair_Display']">
            {/* Header */}
            <header className="p-4 sm:p-6">
                <img
                    src={logo}
                    alt="Rishihood University Logo"
                    className="w-24 sm:w-28 md:w-32 object-contain"
                />
            </header>

            {/* Main */}
            <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-6 pb-8">
                {step === 1 ? (
                    // Step 1: Email Verification & Password Setup
                    <>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#333] mb-6 sm:mb-8">
                    Sign Up
                </h1>
                        <div className="w-full max-w-sm">
                            <form className="flex flex-col gap-4 sm:gap-5">
                                {/* Email and OTP Section */}
                                <div className="space-y-3">
                                    <div className="flex gap-2">
                                        <div className="flex-1 relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                        type="email"
                        placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-base sm:text-lg"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleSendOtp}
                                            disabled={!email || otpSent}
                                            className="px-4 py-3 bg-[#a30c34] hover:bg-[#8b092d] disabled:bg-gray-400 text-white font-medium rounded-md transition flex items-center justify-center gap-2 text-sm sm:text-base"
                                        >
                                            <Send className="w-4 h-4" />
                                            {otpSent ? "Sent" : "OTP"}
                                        </button>
                                    </div>

                                    {otpSent && (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Enter OTP"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                className="flex-1 px-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-base sm:text-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleVerifyOtp}
                                                disabled={!otp || emailVerified}
                                                className="px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium rounded-md transition text-sm sm:text-base"
                                            >
                                                {emailVerified ? "✓" : "Verify"}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Password Fields */}
                                {emailVerified && (
                                    <div className="space-y-3">
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-base sm:text-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                                            </button>
                                        </div>

                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Confirm your password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-base sm:text-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={handleCreateAccount}
                                    disabled={!emailVerified || !password || !confirmPassword || password !== confirmPassword}
                                    className="mt-4 bg-[#a30c34] hover:bg-[#8b092d] disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition text-base sm:text-lg"
                                >
                                    Create Account
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    // Step 2: Personal Details
                    <>
                        <div className="text-center mb-6 sm:mb-8">
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#333] mb-2">Complete Your Profile</h1>
                            <p className="text-sm sm:text-base text-gray-600 px-2">Please provide your details</p>
                        </div>
                        <div className="w-full max-w-sm">
                            <form className="flex flex-col gap-4 sm:gap-5">
                    <input
                        type="tel"
                        placeholder="Enter your phone number"
                                    className="px-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-base sm:text-lg"
                    />
                    <input
                        type="text"
                        placeholder="Enter your enrollment ID"
                                    className="px-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-base sm:text-lg"
                    />
                    <input
                        type="text"
                        placeholder="Enter your bag number"
                                    className="px-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-base sm:text-lg"
                    />
                    <button
                        type="submit"
                                    onClick={handleCompleteSignUp}
                                    className="mt-4 bg-[#a30c34] hover:bg-[#8b092d] text-white font-medium py-3 rounded-lg transition text-base sm:text-lg"
                    >
                                    Complete Sign Up
                    </button>
                </form>
                        </div>
                    </>
                )}

                <p className="mt-6 text-gray-700 text-sm sm:text-base">
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