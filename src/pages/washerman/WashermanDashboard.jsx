import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import logo from "../../assets/rishihood-logo.webp";

function WashermanDashboard() {
    const navigate = useNavigate();
    const [washermanData, setWashermanData] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userType = localStorage.getItem('userType');
        const washermanDataStr = localStorage.getItem('washermanData');
        
        if (!isLoggedIn || userType !== 'washerman' || !washermanDataStr) {
            navigate('/washerman/login');
            return;
        }

        try {
            const washerman = JSON.parse(washermanDataStr);
            setWashermanData(washerman);
            fetchDashboardData();
            fetchOrders();
        } catch (error) {
            console.error('Error parsing washerman data:', error);
            navigate('/washerman/login');
        }
    }, [navigate]);

    const fetchDashboardData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/washerman/dashboard/');
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

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/orders/all/');
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            } else {
                setError("Failed to fetch orders");
            }
        } catch (error) {
            setError("Network error while fetching orders");
            console.error('Orders fetch error:', error);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/orders/${orderId}/status/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: newStatus
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Refresh data
                fetchDashboardData();
                fetchOrders();
            } else {
                setError(data.error || "Failed to update order status");
            }
        } catch (error) {
            setError("Network error. Please try again.");
            console.error('Status update error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('washermanData');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userType');
        navigate('/home');
    };

    if (!washermanData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#faf6f3]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a30c34]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#faf6f3] font-['Playfair_Display'] relative">
            {/* Navbar */}
            <Navbar logo={logo} user={washermanData.username} className="fixed top-0 left-0 w-full z-10 shadow-md" />

            {/* Main Content */}
            <main className="flex flex-col items-center flex-1 px-3 sm:px-6 py-28 sm:py-32 w-full max-w-4xl mx-auto">
                {/* Welcome Section */}
                <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-6 w-full text-center">
                    <h2 className="text-2xl font-bold text-[#333] mb-2">
                        Welcome, {washermanData.username}!
                    </h2>
                    <p className="text-gray-600">Washerman Dashboard</p>
                </div>

                {/* Dashboard Stats */}
                {dashboardData && (
                    <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-6 w-full">
                        <h3 className="text-xl font-bold text-[#333] mb-4 text-center">Order Overview</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
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

                {/* Orders Section */}
                <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 w-full">
                    <h3 className="text-xl font-bold text-[#333] mb-6 text-center">Manage Orders</h3>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 w-full bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-800 text-center font-medium">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Orders Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border border-gray-300 px-4 py-2 text-left">Order ID</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Bag Number</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Clothes Count</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Submission Date</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">#{order.id}</td>
                                        <td className="border border-gray-300 px-4 py-2 font-medium">{order.bag_no}</td>
                                        <td className="border border-gray-300 px-4 py-2">{order.number_of_clothes}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {new Date(order.submission_date).toLocaleDateString()}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                order.status === 'inprogress' ? 'bg-orange-100 text-orange-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {order.status === 'pending' && (
                                                <button
                                                    onClick={() => updateOrderStatus(order.id, 'inprogress')}
                                                    disabled={loading}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm disabled:bg-gray-400"
                                                >
                                                    Received
                                                </button>
                                            )}
                                            {order.status === 'inprogress' && (
                                                <button
                                                    onClick={() => updateOrderStatus(order.id, 'complete')}
                                                    disabled={loading}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm disabled:bg-gray-400"
                                                >
                                                    Ready
                                                </button>
                                            )}
                                            {order.status === 'complete' && (
                                                <span className="text-green-600 text-sm font-medium">✓ Completed</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {orders.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No orders found
                        </div>
                    )}
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="mt-6 px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
                >
                    Logout
                </button>
            </main>
        </div>
    );
}

export default WashermanDashboard;
