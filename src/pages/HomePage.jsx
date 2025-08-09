import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/rishihood-logo.webp";

function HomePage() {
    const navigate = useNavigate();

    const roles = [
        {
            title: "Student",
            icon: "🎓",
            gradient: "from-blue-100 to-blue-200",
            textColor: "text-blue-900",
            route: "/student/login",
        },
        {
            title: "Faculty",
            icon: "🧑‍🏫",
            gradient: "from-green-100 to-green-200",
            textColor: "text-green-900",
            route: "/faculty/login",
        },
        {
            title: "Washer Man",
            icon: "🧺",
            gradient: "from-yellow-100 to-yellow-200",
            textColor: "text-yellow-900",
            route: "/washerman/login",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col font-['Playfair_Display'] relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100">
            {/* Decorative blobs */}
            <div className="absolute top-10 left-10 w-48 h-48 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

            {/* Header */}
            <header className="p-6 relative z-10">
                <img
                    src={logo}
                    alt="Rishihood University Logo"
                    className="w-28 sm:w-32 md:w-36 object-contain"
                />
            </header>c

            {/* Main */}
            <main className="flex flex-col items-center justify-center flex-1 text-center px-4 relative z-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#333] mb-10">
                    Hey there! Who’s logging in?
                </h1>

                <div className="flex flex-col sm:flex-row gap-8">
                    {roles.map((role) => (
                        <div
                            key={role.title}
                            className={`flex flex-col items-center p-6 w-44 rounded-2xl shadow-lg bg-gradient-to-br ${role.gradient} ${role.textColor} cursor-pointer transform hover:scale-105 hover:shadow-xl transition`}
                            onClick={() => navigate(role.route)}
                        >
                            <div className="text-5xl mb-3">{role.icon}</div>
                            <p className="font-medium">{role.title}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default HomePage;
