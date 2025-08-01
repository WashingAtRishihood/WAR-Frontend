import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import logo from "../../assets/rishihood-logo.webp";

const Dashboard = () => {
    const [selectedCount, setSelectedCount] = useState(null);
    const [customCount, setCustomCount] = useState("");

    const handleConfirm = () => {
        const count = selectedCount || Number(customCount);
        if (!count || count <= 0) return;
        
        // Backend call to submit clothes order
        console.log("Submitting clothes order:", count);
        
        // Reset form
        setSelectedCount(null);
        setCustomCount("");
        
        // Show success message or redirect
        alert(`Successfully submitted ${count} clothes for laundry!`);
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
                {/* Add Clothes Section */}
                <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 flex flex-col items-center w-full">
                    <h3 className="text-xl sm:text-2xl font-bold mb-6 text-[#333] text-center">
                        Add Clothes for Laundry
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

                    {/* Submit Button */}
                    <button
                        className="px-8 py-3 rounded-lg bg-[#a30c34] hover:bg-[#8b092d] text-white text-lg font-semibold shadow-md transition w-full sm:w-auto"
                        onClick={handleConfirm}
                    >
                        Submit
                    </button>
                </div>
            </main>

            {/* ✅ Fixed Footer */}
            <Footer className="fixed bottom-0 left-0 w-full z-10 shadow-md" />
        </div>
    );
};

export default Dashboard;