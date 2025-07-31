import React, { useState, useEffect } from "react";
import logo from "../../assets/rishihood-logo.webp";
// Removed: import "./Dashboard.css";

const Dashboard = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [selectedCount, setSelectedCount] = useState(null);
    const [history, setHistory] = useState([
        { date: "2025-07-26", count: 10 },
        { date: "2025-07-26", count: 7 },
        { date: "2025-07-27", count: 8 },
        { date: "2025-07-27", count: 4 },
    ]);

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setSelectedDate(today);
        setCurrentDate(today);
    }, []);

    const handleConfirm = () => {
        if (!selectedCount) return;
        setHistory([...history, { date: selectedDate, count: selectedCount }]);
        setSelectedCount(null);
    };

    const isToday = selectedDate === currentDate;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
            <header className="flex items-center justify-between w-full max-w-2xl mb-8 px-4">
                <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
                <div className="flex items-center gap-2 text-lg font-semibold">
                    <span className="text-2xl">👤</span> User
                </div>
            </header>

            <main className="w-full max-w-2xl flex flex-col gap-8 px-4">
                <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center mb-8">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <h3 className="text-xl font-semibold mb-4">Select the count of clothes</h3>
                    <div className="flex flex-wrap gap-2 mb-4 justify-center">
                        {[...Array(10)].map((_, i) => (
                            <button
                                key={i + 1}
                                className={`px-4 py-2 rounded border font-medium transition ${selectedCount === i + 1 ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-green-100"} ${!isToday ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={() => setSelectedCount(i + 1)}
                                disabled={!isToday}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        className={`px-6 py-2 rounded bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition ${!isToday ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={handleConfirm}
                        disabled={!isToday}
                    >
                        Confirm
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold mb-4">Your Laundry History</h3>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Date</th>
                                <th className="py-2 px-4 border-b">Clothes Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history
                                .filter((item) => item.date === selectedDate)
                                .map((item, index) => (
                                    <tr key={index}>
                                        <td className="py-2 px-4 border-b">{item.date}</td>
                                        <td className="py-2 px-4 border-b">{item.count}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;