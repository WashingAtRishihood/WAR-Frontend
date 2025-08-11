import React from "react";
import Navbar from "./components/Navbar";

function WashermanDashboard() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
			<h1 className="text-2xl font-bold mb-4">Washerman Dashboard</h1>
			<p className="text-gray-600">This is a placeholder for the washerman dashboard page.</p>
			<Navbar />
		</div>
	);
}

export default WashermanDashboard;
