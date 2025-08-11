import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Phone, Hash, MapPin } from "lucide-react";
import logo from "../../assets/rishihood-logo.webp";

function StudentSignup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        enrollment_no: "",
        phone_no: "",
        residency_no: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        
        // Validate required fields
        if (!formData.name || !formData.email || !formData.enrollment_no || !formData.phone_no || !formData.residency_no) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/student/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Registration successful! You can now login.");
                setFormData({
                    name: "",
                    email: "",
                    enrollment_no: "",
                    phone_no: "",
                    residency_no: ""
                });
                
                // Redirect to login after 2 seconds
                setTimeout(() => {
                    navigate("/student/login");
                }, 2000);
            } else {
                setError(data.error || "Registration failed. Please try again.");
            }
        } catch (error) {
            setError("Network error. Please try again.");
            console.error('Signup error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#faf6f3] font-['Playfair_Display']">
            {/* Header */}
            <header className="p-3.5 sm:p-6">
                <img
                    src={logo}
                    alt="Rishihood University Logo"
                    className="w-24 sm:w-28 md:w-32 object-contain"
                />
            </header>

            {/* Main */}
            <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-6 pb-8">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#333] mb-2">Student Registration</h1>
                    <p className="text-sm sm:text-base text-gray-600 px-2">Create your account to use the laundry service</p>
                </div>

                <div className="w-full max-w-sm">
                    <form onSubmit={handleSignup} className="flex flex-col gap-4 sm:gap-5">
                        {/* Name Field */}
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-base sm:text-lg"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-base sm:text-lg"
                                required
                            />
                        </div>

                        {/* Enrollment Number Field */}
                        <div className="relative">
                            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                            <input
                                type="text"
                                name="enrollment_no"
                                placeholder="Enter your enrollment number"
                                value={formData.enrollment_no}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-base sm:text-lg"
                                required
                            />
                        </div>

                        {/* Phone Number Field */}
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                            <input
                                type="tel"
                                name="phone_no"
                                placeholder="Enter your phone number"
                                value={formData.phone_no}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-base sm:text-lg"
                                required
                            />
                        </div>

                        {/* Residency Number Field */}
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                            <input
                                type="text"
                                name="residency_no"
                                placeholder="Enter your residency number"
                                value={formData.residency_no}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-base sm:text-lg"
                                required
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3">
                                {error}
                            </div>
                        )}

                        {/* Success Message */}
                        {success && (
                            <div className="text-green-600 text-sm bg-green-50 border border-green-200 rounded-md p-3">
                                {success}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 bg-[#a30c34] hover:bg-[#8b092d] disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition text-base sm:text-lg flex items-center justify-center"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Creating Account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>
                </div>

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