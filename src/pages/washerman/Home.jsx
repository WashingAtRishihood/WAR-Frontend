import React, { useState } from "react";
import WashermanNavbar from "./components/Navbar";
import Footer from "./components/Footer";

const Home = () => {
    const [search, setSearch] = useState("");

    const bags = [
        { bagNo: "B-232", clothes: 6, date: "27/07/2025", studentName: "John Doe" },
        { bagNo: "G-354", clothes: 8, date: "21/07/2025", studentName: "Jane Smith" },
        { bagNo: "G-121", clothes: 4, date: "28/07/2025", studentName: "Mike Johnson" },
        { bagNo: "B-229", clothes: 10, date: "27/07/2025", studentName: "Sarah Wilson" },
        { bagNo: "B-156", clothes: 5, date: "29/07/2025", studentName: "Alex Brown" },
        { bagNo: "G-298", clothes: 7, date: "30/07/2025", studentName: "Emma Davis" },
    ];

    const filteredBags = bags.filter((bag) => 
        bag.bagNo.toLowerCase().includes(search.toLowerCase()) ||
        bag.studentName.toLowerCase().includes(search.toLowerCase())
    );

    const handleMarkReceived = (bagNo) => {
        // TODO: Update bag status to received
        console.log(`Marking bag ${bagNo} as received`);

    };

    return (
        <div className="min-h-screen bg-[#faf6f3] font-['Playfair_Display'] flex flex-col">
            {/* Navbar */}
            <WashermanNavbar />

            {/* Main Content */}
            <main className="flex-1 px-4 py-6 pb-20">
                <div className="max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-6">New Bags</h2>
                    
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
                                
                                <div className="flex justify-between items-center mb-3">
                                    <div className="text-sm text-gray-600">
                                        <p>Clothes: {bag.clothes} items</p>
                                        <p>Date: {bag.date}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleMarkReceived(bag.bagNo)}
                                    className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                                >
                                    Mark as Received
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredBags.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">No bags found</p>
                            <p className="text-gray-500">Try adjusting your search</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home; 