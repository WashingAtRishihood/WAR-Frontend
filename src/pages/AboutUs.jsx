import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Github, Linkedin, Mail, Code, Database, Palette } from "lucide-react";
import adityaPhoto from "../assets/aditya-photo.jpg";
import riteshPhoto from "../assets/ritesh-photo.jpg";
import sankalpPhoto from "../assets/sankalp-photo.jpg";
import vasudevPhoto from "../assets/vasudev-photo.jpg";

const AboutUs = () => {
    const teamMembers = [
        {
            name: "Aditya Shankar",
            role: "Frontend Developer",
            linkedin: "https://www.linkedin.com/in/aditya-shankar-1bb0b8323/",
            github: "https://github.com/Racer-95",
            email: "aditya.shankar2024@nst.rishihood.edu.in",
            photo: adityaPhoto
        },
        {
            name: "Ritesh Kumar",
            role: "Backend Developer",
            linkedin: "https://www.linkedin.com/in/ritesh-kumar-sd/",
            github: "https://github.com/ratinto",
            email: "ritesh.kumar2024@nst.rishihood.edu.in",
            photo: riteshPhoto
        },
        {
            name: "Sankalp M Tellur",
            role: "Frontend Developer",
            linkedin: "#",
            github: "https://github.com/sankalpmtellur",
            email: "sankalp.tellur@rishihood.edu.in",
            photo: sankalpPhoto
        }
    ];

    const techStack = [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS",
        "Vite"
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#faf6f3] font-['Playfair_Display'] relative">
            {/* Back Button */}
            <div className="w-full px-4 sm:px-6 pt-20 sm:pt-24 pb-4">
                <Link
                    to="/student/dashboard"
                    className="inline-flex items-center space-x-2 text-[#a30c34] hover:text-[#8b092d] transition-colors duration-200"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">Back</span>
                </Link>
            </div>

            {/* Main Content */}
            <main className="flex flex-col flex-1 px-4 sm:px-6 pb-8 w-full max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#333] mb-2">About Us</h1>
                    <p className="text-sm sm:text-base text-gray-600 px-2">Meet the team behind Rishihood University Laundry Service</p>
                </div>

                {/* Team Members */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
                    <h2 className="text-lg sm:text-xl font-semibold text-[#333] mb-4 sm:mb-6 text-center">Our Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="text-center p-3 sm:p-4">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mx-auto mb-3 border-2 border-[#a30c34]">
                                    <img
                                        src={member.photo}
                                        alt={`${member.name} photo`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            // Fallback to gradient icon if image fails to load
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="w-full h-full bg-gradient-to-r from-[#a30c34] to-[#d63384] flex items-center justify-center" style={{ display: 'none' }}>
                                        {index === 0 ? (
                                            <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        ) : index === 1 ? (
                                            <Database className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        ) : (
                                            <Code className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        )}
                                    </div>
                                </div>
                                <h3 className="font-semibold text-[#333] text-sm sm:text-base mb-1">{member.name}</h3>
                                <p className="text-[#a30c34] text-xs sm:text-sm mb-3">{member.role}</p>

                                <div className="flex justify-center space-x-1 sm:space-x-2">
                                    <a href={member.linkedin} className="p-1.5 sm:p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200">
                                        <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                                    </a>
                                    <a href={member.github} className="p-1.5 sm:p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200">
                                        <Github className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                                    </a>
                                    <a href={`mailto:${member.email}`} className="p-1.5 sm:p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200">
                                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
                    <h2 className="text-lg sm:text-xl font-semibold text-[#333] mb-3 sm:mb-4 text-center">Tech Stack</h2>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                        {techStack.map((tech, index) => (
                            <span key={index} className="px-2 sm:px-3 py-1 bg-[#a30c34] text-white rounded-full text-xs sm:text-sm">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Special Thanks */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-[#333] mb-3 sm:mb-4 text-center">Special Thanks</h2>
                    <div className="text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mx-auto mb-3 sm:mb-4 border-2 border-[#a30c34]">
                            <img
                                src={vasudevPhoto}
                                alt="Vasudev Murthy photo"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    // Fallback to gradient icon if image fails to load
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className="w-full h-full bg-gradient-to-r from-[#a30c34] to-[#d63384] flex items-center justify-center" style={{ display: 'none' }}>
                                <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                        </div>
                        <h3 className="font-semibold text-[#333] text-sm sm:text-base mb-1 sm:mb-2">Vasudev Murthy</h3>
                        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">Project Guide & Mentor</p>
                        <div className="flex justify-center space-x-1 sm:space-x-2">
                            <a href="https://www.linkedin.com/in/vasudev-murthy-3113661/" className="p-1.5 sm:p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200">
                                <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                            </a>
                            <a href="mailto:vasudev.m@rishihood.edu.in" className="p-1.5 sm:p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200">
                                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AboutUs;
