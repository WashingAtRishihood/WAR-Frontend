import React, { useState } from "react";
import WashermanNavbar from "./components/Navbar";
import Footer from "./components/Footer";

const Received = () => {
    const [search, setSearch] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedBag, setSelectedBag] = useState(null);

    const receivedBags = [
        { bagNo: "B-232", clothes: 6, date: "27/07/2025", studentName: "John Doe", receivedDate: "28/07/2025" },
        { bagNo: "G-354", clothes: 8, date: "21/07/2025", studentName: "Jane Smith", receivedDate: "22/07/2025" },
        { bagNo: "G-121", clothes: 4, date: "28/07/2025", studentName: "Mike Johnson", receivedDate: "29/07/2025" },
    ];

    const filteredBags = receivedBags.filter((bag) =>
        bag.bagNo.toLowerCase().includes(search.toLowerCase()) ||
        bag.studentName.toLowerCase().includes(search.toLowerCase())
    );

    const handleMarkReady = (bag) => {
        setSelectedBag(bag);
        setShowConfirm(true);
    };

    const confirmMarkReady = () => {
        if (selectedBag) {
            setShowConfirm(false);
            setSelectedBag(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#faf6f3] font-['Playfair_Display'] flex flex-col">
            {/* Navbar */}
            <WashermanNavbar />

            {/* Main Content */}
            <main className="flex-1 px-4 py-6 pb-20">
                <div className="max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-6">Received Bags</h2>

                    {/* Search */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search by bag number or student name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a30c34] bg-white shadow"
                        />
                    </div>

                    {/* Bag Cards */}
                    <div className="space-y-4">
                        {filteredBags.map((bag, index) => (
                            <div
                                key={index}
                                className="bg-white border rounded-lg p-4 shadow-sm"
                            >
                                <div className="mb-3">
                                    <h3 className="text-lg font-bold text-[#a30c34]">
                                        {bag.bagNo}
                                    </h3>
                                    <p className="text-gray-600 text-sm">{bag.studentName}</p>
                                </div>

                                <div className="mb-3">
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p>Clothes: {bag.clothes} items</p>
                                        <p>Submitted: {bag.date}</p>
                                        <p>Received: {bag.receivedDate}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleMarkReady(bag)}
                                    className="w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                                >
                                    Mark as Ready
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredBags.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">No received bags</p>
                            <p className="text-gray-500">Bags will appear here after marking as received</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <Footer />

            {/* Confirmation Dialog */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md mx-4">
                        <h3 className="text-lg font-bold mb-4">Confirm Action</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to mark bag <span className="font-semibold">{selectedBag?.bagNo}</span> as ready?
                            This will send an email notification to the student.
                        </p>
                        <div className="flex gap-3">
                            <button
                                className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md font-medium"
                                onClick={() => setShowConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium"
                                onClick={confirmMarkReady}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Received; 