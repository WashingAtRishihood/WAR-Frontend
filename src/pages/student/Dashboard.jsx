import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import logo from "../../assets/rishihood-logo.webp";

const Dashboard = () => {
    const [selectedCount, setSelectedCount] = useState(null);
    const [customCount, setCustomCount] = useState("");
    const [history, setHistory] = useState([]);

    const today = new Date().toISOString().split("T")[0];

    const handleConfirm = () => {
        const count = selectedCount || Number(customCount);
        if (!count || count <= 0) return;
        setHistory((prev) => [...prev, { date: today, count }]);
        setSelectedCount(null);
        setCustomCount("");
    };

    const handleNumberClick = (num) => {
        setSelectedCount(num);
        setCustomCount(num);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#faf6f3] font-['Playfair_Display'] relative">
            {/* ✅ Fixed Navbar */}
            <Navbar logo={logo} user="Student" className="fixed top-0 left-0 w-full z-10 shadow-md" />

            {/* Main Content */}
            <main className="flex flex-col items-center flex-1 px-3 sm:px-6 py-28 sm:py-32 w-full max-w-2xl mx-auto">
                {/* Clothes selection */}
                <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 flex flex-col items-center w-full mb-8">
                    <h3 className="text-xl sm:text-2xl font-bold mb-6 text-[#333] text-center">
                        Select the count of clothes
                    </h3>

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

                    {/* Confirm Button */}
                    <button
                        className="px-8 py-3 rounded-lg bg-[#a30c34] hover:bg-[#8b092d] text-white text-lg font-semibold shadow-md transition w-full sm:w-auto"
                        onClick={handleConfirm}
                    >
                        Confirm
                    </button>
                </div>

                {/* Laundry History */}
                <div className="bg-white rounded-lg shadow p-5 sm:p-8 w-full mb-28 sm:mb-10">
                    <h3 className="text-lg sm:text-xl font-semibold mb-4">
                        Your Laundry History
                    </h3>
                    {history.length === 0 ? (
                        <p className="text-gray-500 text-center text-base sm:text-lg">
                            No clothes submitted yet
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[300px]">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b">Date</th>
                                        <th className="py-2 px-4 border-b">Clothes Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((item, index) => (
                                        <tr key={index}>
                                            <td className="py-2 px-4 border-b">{item.date}</td>
                                            <td className="py-2 px-4 border-b">{item.count}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            {/* ✅ Fixed Footer */}
            <Footer className="fixed bottom-0 left-0 w-full z-10 shadow-md" />
        </div>
    );
};

export default Dashboard;