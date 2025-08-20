import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/rishihood-logo.webp';

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-[#faf6f3] font-['Playfair_Display']">
            {/* Header */}
            <header className="p-3.5 relative z-10">
                <img
                    src={logo}
                    alt="Rishihood University Logo"
                    className="w-28 sm:w-32 md:w-36 object-contain drop-shadow-lg"
                />
            </header>

            {/* Main Section */}
            <main className="flex flex-col items-center justify-center flex-1 text-center px-4">
                <h1 className="text-4xl sm:text-5xl font-semibold text-[#333] mb-4">
                    404
                </h1>
                <p className="text-xl sm:text-2xl text-gray-600 mb-8">
                    Page Not Found
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-[#a30c34] hover:bg-[#8b092d] text-white font-medium rounded-lg transition text-lg"
                >
                    Go Home
                </button>
            </main>
        </div>
    );
}

export default NotFound;
