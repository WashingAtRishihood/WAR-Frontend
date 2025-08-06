import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WashermanDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/washerman/home");
    }, [navigate]);

    return (
        <div className="min-h-screen bg-[#faf6f3] flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a30c34] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading...</p>
            </div>
        </div>
    );
};

export default WashermanDashboard;