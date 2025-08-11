import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import logo from "../../assets/rishihood-logo.webp";

const Incomplete = () => {
    // Mock data - will be replaced with backend data
    const incompleteOrders = [
        { id: 4, date: "2024-01-20", count: 4, status: "In Progress" },
        { id: 5, date: "2024-01-18", count: 6, status: "Pending" },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#faf6f3] font-['Playfair_Display'] relative">
            <Navbar logo={logo} user={studentData?.name} className="fixed top-0 left-0 w-full z-10 shadow-md" />
            <main className="flex flex-col flex-1 px-4 sm:px-6 py-24 sm:py-28 w-full max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-6 text-center">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#333] mb-2">
                        Pending Orders
                    </h1>
                    <p className="text-gray-600">Bag Number: {studentData.bag_no}</p>
                    <p className="text-gray-600">Enrollment: {studentData.enrollment_no}</p>
                </div>

                {incompleteOrders.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500 text-lg">No pending orders</p>
                        <p className="text-gray-400 text-sm mt-2">Your pending laundry orders will appear here</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {incompleteOrders.map((order) => (
                            <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-gray-800">Order #{order.id}</p>
                                        <p className="text-sm text-gray-600">Date: {order.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-orange-600">{order.count} clothes</p>
                                        <p className="text-sm text-orange-500">{order.status}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
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
                        {incompletedOrders && incompletedOrders.length === 0 ? (
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
                                {incompletedOrders && incompletedOrders.map((order) => (
                                    <div key={order.id} className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${getStatusColor(order.status)}`}>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold text-gray-800">Order #{order.id}</p>
                                                <p className="text-sm text-gray-600">
                                                    Submitted: {order.submission_date ? new Date(order.submission_date).toLocaleDateString() : ''}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Last Updated: {order.updated_at ? new Date(order.updated_at).toLocaleDateString() : ''}
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

export default Incomplete; 