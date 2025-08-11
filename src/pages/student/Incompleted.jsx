import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import logo from "../../assets/rishihood-logo.webp";

const Incompleted = () => {
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState(null);
    const [incompletedOrders, setIncompletedOrders] = useState([]);
    const [loading, setLoading] = useState(true);
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
            fetchIncompletedOrders(student.bag_no);
        } catch (error) {
            console.error('Error parsing student data:', error);
            navigate('/student/login');
        }
    }, [navigate]);

    const fetchIncompletedOrders = async (bagNo) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/orders/student/${bagNo}/`);
            if (response.ok) {
                const data = await response.json();
                // Filter only pending and in-progress orders
                const incompleted = data.orders.filter(order => 
                    order.status === 'pending' || order.status === 'inprogress'
                );
                setIncompletedOrders(incompleted);
            } else {
                setError("Failed to fetch orders");
            }
        } catch (error) {
            setError("Network error while fetching orders");
            console.error('Orders fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'inprogress':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending':
                return 'Pending';
            case 'inprogress':
                return 'In Progress';
            default:
                return status;
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return (
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'inprogress':
                return (
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                );
            default:
                return null;
        }
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
            <Navbar logo={logo} user={studentData.name} className="fixed top-0 left-0 w-full z-10 shadow-md" />

            <main className="flex flex-col flex-1 px-4 sm:px-6 py-24 sm:py-28 w-full max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-6 text-center">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#333] mb-2">
                        Pending Orders
                    </h1>
                    <p className="text-gray-600">Bag Number: {studentData.bag_no}</p>
                    <p className="text-gray-600">Enrollment: {studentData.enrollment_no}</p>
                </div>

                {/* Orders Section */}
                <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 w-full bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-800 text-center font-medium">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a30c34] mx-auto mb-4"></div>
                            <p className="text-gray-500 text-lg">Loading pending orders...</p>
                        </div>
                    )}

                    {/* Orders List */}
                    {!loading && (
                        <>
                            {incompletedOrders.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-500 text-lg">No pending orders</p>
                                    <p className="text-gray-400 text-sm mt-2">All your orders are completed!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {incompletedOrders.map((order) => (
                                        <div key={order.id} className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${getStatusColor(order.status)}`}>
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-semibold text-gray-800">Order #{order.id}</p>
                                                    <p className="text-sm text-gray-600">
                                                        Submitted: {new Date(order.submission_date).toLocaleDateString()}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Last Updated: {new Date(order.updated_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-gray-800">{order.number_of_clothes} clothes</p>
                                                    <div className="flex items-center space-x-2 mt-2">
                                                        {getStatusIcon(order.status)}
                                                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                                                            {getStatusText(order.status)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="mt-6 px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition self-center"
                >
                    Logout
                </button>
            </main>

            <Footer className="fixed bottom-0 left-0 w-full z-10 shadow-md" />
        </div>
    );
};

export default Incompleted; 