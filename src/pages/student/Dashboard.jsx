import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import logo from "../../assets/rishihood-logo.webp";

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedCount, setSelectedCount] = useState(null);
    const [customCount, setCustomCount] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [studentData, setStudentData] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const studentDataStr = localStorage.getItem('studentData');
        
        if (!isLoggedIn || !studentDataStr) {
            navigate('/student/login');
            return;
        }

        try {
            const student = JSON.parse(studentDataStr);
            setStudentData(student);
            fetchDashboardData(student.bag_no);
        } catch (error) {
            console.error('Error parsing student data:', error);
            navigate('/student/login');
        }
    }, [navigate]);

    const fetchDashboardData = async (bagNo) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/student/dashboard/${bagNo}/`);
            if (response.ok) {
                const data = await response.json();
                setDashboardData(data);
            } else {
                setError("Failed to fetch dashboard data");
            }
        } catch (error) {
            setError("Network error while fetching dashboard data");
            console.error('Dashboard fetch error:', error);
        }
    };

    const handleConfirm = async () => {
        const count = selectedCount || Number(customCount);
        if (!count || count <= 0) return;
        
        if (!studentData) {
            setError("Student data not found. Please login again.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch('http://127.0.0.1:8000/api/orders/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bag_no: studentData.bag_no,
                    number_of_clothes: count
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Reset form
                setSelectedCount(null);
                setCustomCount("");
                
                // Show success message
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
                
                // Refresh dashboard data
                fetchDashboardData(studentData.bag_no);
            } else {
                setError(data.error || "Failed to create order");
            }
        } catch (error) {
            setError("Network error. Please try again.");
            console.error('Order creation error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNumberClick = (num) => {
        setSelectedCount(num);
        setCustomCount(num);
    };

    const handleLogout = () => {
        localStorage.removeItem('studentData');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userType');
        navigate('/home');
    };

    if (!studentData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#faf6f3]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a30c34]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#faf6f3] font-['Playfair_Display'] relative">
            {/* Navbar */}
            <Navbar logo={logo} user={studentData.name} className="fixed top-0 left-0 w-full z-10 shadow-md" />

            {/* Main Content */}
            <main className="flex flex-col items-center flex-1 px-3 sm:px-6 py-28 sm:py-32 w-full max-w-2xl mx-auto">
                {/* Welcome Section */}
                <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-6 w-full text-center">
                    <h2 className="text-2xl font-bold text-[#333] mb-2">
                        Welcome, {studentData.name}!
                    </h2>
                    <p className="text-gray-600">Bag Number: {studentData.bag_no}</p>
                    <p className="text-gray-600">Enrollment: {studentData.enrollment_no}</p>
                </div>

                {/* Dashboard Stats */}
                {dashboardData && (
                    <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-6 w-full">
                        <h3 className="text-xl font-bold text-[#333] mb-4 text-center">Your Orders</h3>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-2xl font-bold text-blue-600">{dashboardData.total_orders}</p>
                                <p className="text-sm text-blue-800">Total Orders</p>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <p className="text-2xl font-bold text-yellow-600">{dashboardData.pending_orders}</p>
                                <p className="text-sm text-yellow-800">Pending</p>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg">
                                <p className="text-2xl font-bold text-orange-600">{dashboardData.inprogress_orders}</p>
                                <p className="text-sm text-orange-800">In Progress</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <p className="text-2xl font-bold text-green-600">{dashboardData.complete_orders}</p>
                                <p className="text-sm text-green-800">Completed</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Clothes Section */}
                <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 flex flex-col items-center w-full">
                    <h3 className="text-xl sm:text-2xl font-bold mb-6 text-[#333] text-center">
                        Add Clothes for Laundry
                    </h3>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 w-full bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-800 text-center font-medium">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Success Message */}
                    {showSuccess && (
                        <div className="mb-6 w-full bg-green-50 border border-green-200 rounded-lg p-4">
                            <p className="text-green-800 text-center font-medium">
                                ✓ Successfully submitted clothes for laundry!
                            </p>
                        </div>
                    )}

                    {/* Custom Count Input */}
                    <input
                        type="number"
                        min="1"
                        placeholder="Enter count"
                        value={customCount}
                        onChange={(e) => {
                            setCustomCount(e.target.value);
                            setSelectedCount(null);
                        }}
                        className="mb-5 px-8 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a30c34] w-60 text-center text-lg"
                    />

                    {/* Number Buttons */}
                    <div className="grid grid-cols-5 gap-4 w-full max-w-md mb-5">
                        {[...Array(10)].map((_, i) => (
                            <button
                                key={i + 1}
                                className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center 
                                    rounded-md border text-base sm:text-lg font-semibold shadow-sm 
                                    transition-colors duration-200
                                    ${selectedCount === i + 1
                                        ? "bg-[#a30c34] text-white border-[#a30c34]"
                                        : "bg-gray-100 hover:bg-[#f9dcdc] border-gray-300"
                                    }`}
                                onClick={() => handleNumberClick(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button
                        className="px-8 py-3 rounded-lg bg-[#a30c34] hover:bg-[#8b092d] text-white text-lg font-semibold shadow-md transition w-full sm:w-auto disabled:bg-gray-400"
                        onClick={handleConfirm}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block"></div>
                                Submitting...
                            </>
                        ) : (
                            "Submit"
                        )}
                    </button>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="mt-6 px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
                >
                    Logout
                </button>
            </main>

            {/* Footer */}
            <Footer className="fixed bottom-0 left-0 w-full z-10 shadow-md" />
        </div>
    );
};

export default Dashboard;