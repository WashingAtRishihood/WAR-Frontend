import React, { useState } from "react";
import { FaTshirt, FaCalendarAlt } from "react-icons/fa";
import Navbar from "./components/Navbar";
import logo from "../../assets/rishihood-logo.webp";

function WashermanDashboard() {
  const [selectedTab, setSelectedTab] = useState("B");
  const [searchTerm, setSearchTerm] = useState("");
  const [bagStatus, setBagStatus] = useState({});

  const bagsData = [
    { id: 1, bagNo: "B-232", clothes: 6, date: "27/07/2025" },
    { id: 2, bagNo: "G-354", clothes: 3, date: "21/07/2025" },
    { id: 3, bagNo: "G-121", clothes: 7, date: "8/07/2025" },
    { id: 5, bagNo: "B-229", clothes: 12, date: "29/08/2025" },
    { id: 6, bagNo: "G-423", clothes: 5, date: "9/07/2025" },
    { id: 7, bagNo: "B-675", clothes: 10, date: "19/08/2025" },
    { id: 8, bagNo: "G-129", clothes: 8, date: "9/06/2025" },
  ];

  const handleReceived = (id) => {
    setBagStatus((prev) => ({
      ...prev,
      [id]: { ...prev[id], received: true },
    }));
  };

  const handleReady = (id) => {
    setBagStatus((prev) => ({
      ...prev,
      [id]: { ...prev[id], ready: true },
    }));
  };

  const filteredBags = bagsData.filter((bag) => {
    const matchesTab = bag.bagNo.startsWith(selectedTab);
    const matchesSearch = bag.bagNo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#faf6f3] pt-20">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 font-['Playfair_Display']">
        <h1 className="text-3xl font-bold text-center mb-6">Students Bags</h1>

        {/* Tabs + Search */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex border rounded-lg overflow-hidden">
            <button
              className={`px-4 py-2 font-semibold ${selectedTab === "B" ? "bg-[#a30c34] text-white" : "bg-white"
                }`}
              onClick={() => setSelectedTab("B")}
            >
              B
            </button>
            <button
              className={`px-4 py-2 font-semibold ${selectedTab === "G" ? "bg-[#a30c34] text-white" : "bg-white"
                }`}
              onClick={() => setSelectedTab("G")}
            >
              G
            </button>
          </div>
          <input
            type="text"
            placeholder="🔍 Bag Number"
            className="flex-1 border rounded-lg px-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Bag Cards */}
        <div className="space-y-4">
          {filteredBags.map((bag) => {
            const status = bagStatus[bag.id] || {};
            return (
              <div
                key={bag.id}
                className="flex justify-between items-center bg-[#fff9f0] shadow-sm rounded-xl p-4 border transition-transform transform hover:scale-[1.02] hover:shadow-md"
              >
                <div>
                  <p className="font-semibold text-lg">
                    Bag No: <span className="text-red-700">{bag.bagNo}</span>
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <FaTshirt className="text-gray-500" /> Clothes: {bag.clothes}
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-500" /> Date:{" "}
                    <span className="text-red-600">{bag.date}</span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  {!status.received && (
                    <button
                      className="bg-green-600 text-white px-4 sm:px-4 py-1 sm:py-1 rounded-lg hover:bg-green-700 text-sm sm:text-base"
                      onClick={() => handleReceived(bag.id)}
                    >
                      Mark as Received
                    </button>
                  )}
                  {status.received && !status.ready && (
                    <button
                      className="bg-blue-600 text-white px-3 sm:px-4 py-1 sm:py-1 rounded-lg hover:bg-blue-700 text-xs sm:text-base"
                      onClick={() => handleReady(bag.id)}
                    >
                      Mark as Ready
                    </button>
                  )}
                  {status.ready && (
                    <span className="text-green-700 font-semibold">Ready</span>
                  )}
                </div>
              </div>
            );
          })}

          {filteredBags.length === 0 && (
            <p className="text-center text-gray-500">No bags found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WashermanDashboard;
