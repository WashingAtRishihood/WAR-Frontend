import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import logo from "../../assets/rishihood-logo.webp";

const Incompleted = () => {
    // Mock data - will be replaced with backend data
    const incompletedOrders = [
        { id: 4, date: "2024-01-20", count: 4, status: "In Progress" },
        { id: 5, date: "2024-01-18", count: 6, status: "Pending" },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#faf6f3] font-['Playfair_Display'] relative">
            <Navbar logo={logo} user="Student" className="fixed top-0 left-0 w-full z-10 shadow-md" />

            <main className="flex flex-col flex-1 px-4 sm:px-6 py-24 sm:py-28 w-full max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#333] mb-6 text-center">
                        Pending Orders
                    </h1>

                    {incompletedOrders.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500 text-lg">No pending orders</p>
                            <p className="text-gray-400 text-sm mt-2">Your pending laundry orders will appear here</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {incompletedOrders.map((order) => (
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
                </div>
            </main>

            <Footer className="fixed bottom-0 left-0 w-full z-10 shadow-md" />
        </div>
    );
};

export default Incompleted; 