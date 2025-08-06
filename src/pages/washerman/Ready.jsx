import React, { useState } from "react";
import WashermanNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CheckCircle } from "lucide-react";

const Ready = () => {
    const [search, setSearch] = useState("");

    const readyBags = [
        { 
            bagNo: "B-229", 
            clothes: 10, 
            date: "27/07/2025", 
            studentName: "Sarah Wilson", 
            receivedDate: "28/07/2025",
            readyDate: "30/07/2025"
        },
        { 
            bagNo: "G-156", 
            clothes: 5, 
            date: "29/07/2025", 
            studentName: "Alex Brown", 
            receivedDate: "30/07/2025",
            readyDate: "01/08/2025"
        },
    ];

    const filteredBags = readyBags.filter((bag) => 
        bag.bagNo.toLowerCase().includes(search.toLowerCase()) ||
        bag.studentName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#faf6f3] font-['Playfair_Display'] flex flex-col">
            {/* Navbar */}
            <WashermanNavbar />

            {/* Main Content */}
            <main className="flex-1 px-4 py-6 pb-20">
                <div className="max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-6">Ready Bags</h2>
                    
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
                                className="bg-white border rounded-lg p-4 shadow-sm border-green-200"
                            >
                                <div className="mb-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <h3 className="text-lg font-bold text-[#a30c34]">
                                            {bag.bagNo}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">{bag.studentName}</p>
                                </div>
                                
                                <div className="mb-3">
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p>Clothes: {bag.clothes} items</p>
                                        <p>Submitted: {bag.date}</p>
                                        <p>Received: {bag.receivedDate}</p>
                                        <p className="text-green-600 font-medium">Ready: {bag.readyDate}</p>
                                    </div>
                                </div>

                                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                    <p className="text-green-800 text-sm font-medium text-center">
                                        ✓ Email notification sent to student
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredBags.length === 0 && (
                        <div className="text-center py-12">
                            <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 text-lg">No ready bags</p>
                            <p className="text-gray-500">Bags will appear here after marking as ready</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Ready; 