import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { User, Mail, Phone, BookOpen, Calendar, MapPin, Edit, Save, X, ArrowLeft, Package } from "lucide-react";
import logo from "../../assets/rishihood-logo.webp";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: "Ritesh Kumar",
        email: "ritesh.kumar2024@nst.rishihood.edu.in",
        phone: "+91 98765 43210",
        enrollmentId: "2401010384",
        bagNumber: "B-558",
        department: "Computer Science",
        year: "2nd Year",
        hostel: "Residency 1, Room 246",
        joinDate: "August 2025"
    });

    const [editData, setEditData] = useState({ ...profileData });

    const handleEdit = () => {
        setEditData({ ...profileData });
        setIsEditing(true);
    };

    const handleSave = () => {
        setProfileData({ ...editData });
        setIsEditing(false);
        // Here you can add API call to update profile
    };

    const handleCancel = () => {
        setEditData({ ...profileData });
        setIsEditing(false);
    };

    const handleInputChange = (field, value) => {
        setEditData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#faf6f3] font-['Playfair_Display'] relative">
            {/* Navbar */}
            <Navbar logo={logo} user="Student" className="fixed top-0 left-0 w-full z-10 shadow-md" />

            {/* Main Content */}
            <main className="flex flex-col flex-1 px-4 sm:px-6 py-24 sm:py-28 w-full max-w-4xl mx-auto">
                {/* Back Button - Outside Card */}
                <div className="w-full mb-4">
                    <Link
                        to="/student/dashboard"
                        className="inline-flex items-center space-x-2 text-[#a30c34] hover:text-[#8b092d] transition-colors duration-200"
                    >
                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm font-medium">Back</span>
                    </Link>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8 w-full">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#333]">My Profile</h1>
                        {!isEditing ? (
                            <button
                                onClick={handleEdit}
                                className="flex items-center justify-center space-x-2 bg-[#a30c34] hover:bg-[#8b092d] text-white px-3 py-2 rounded-lg transition-colors duration-200 w-full sm:w-auto sm:px-4"
                            >
                                <Edit className="w-4 h-4" />
                                <span className="text-sm font-medium">Edit Profile</span>
                            </button>
                        ) : (
                            <div className="flex items-center space-x-2 w-full sm:w-auto">
                                <button
                                    onClick={handleSave}
                                    className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors duration-200 flex-1 sm:flex-none sm:px-4"
                                >
                                    <Save className="w-4 h-4" />
                                    <span className="text-sm font-medium">Save</span>
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center justify-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors duration-200 flex-1 sm:flex-none sm:px-4"
                                >
                                    <X className="w-4 h-4" />
                                    <span className="text-sm font-medium">Cancel</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Profile Avatar and Basic Info */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
                        <div className="relative">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-[#a30c34] flex items-center justify-center flex-shrink-0">
                                <div className="w-full h-full bg-gradient-to-r from-[#a30c34] to-[#d63384] flex items-center justify-center">
                                    <User className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-center sm:text-left flex-1">
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#333] mb-1 sm:mb-2">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-center sm:text-left"
                                    />
                                ) : (
                                    profileData.name
                                )}
                            </h2>
                            <p className="text-gray-600 text-sm sm:text-base mb-1">Student</p>
                            <p className="text-xs sm:text-sm text-gray-500">Enrollment ID: {profileData.enrollmentId}</p>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="space-y-6">
                        {/* Personal Information */}
                        <div className="space-y-4">
                            <h3 className="text-base sm:text-lg font-semibold text-[#333] border-b border-gray-200 pb-2">Personal Information</h3>
                            
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mt-1 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <label className="text-xs sm:text-sm text-gray-600 block mb-1">Email</label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                value={editData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-sm"
                                            />
                                        ) : (
                                            <p className="text-sm sm:text-base text-gray-800 break-all">{profileData.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mt-1 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <label className="text-xs sm:text-sm text-gray-600 block mb-1">Phone</label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={editData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-sm"
                                            />
                                        ) : (
                                            <p className="text-sm sm:text-base text-gray-800">{profileData.phone}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mt-1 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <label className="text-xs sm:text-sm text-gray-600 block mb-1">Department</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editData.department}
                                                onChange={(e) => handleInputChange('department', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-sm"
                                            />
                                        ) : (
                                            <p className="text-sm sm:text-base text-gray-800">{profileData.department}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Academic Information */}
                        <div className="space-y-4">
                            <h3 className="text-base sm:text-lg font-semibold text-[#333] border-b border-gray-200 pb-2">Academic Information</h3>
                            
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mt-1 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <label className="text-xs sm:text-sm text-gray-600 block mb-1">Year of Study</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editData.year}
                                                onChange={(e) => handleInputChange('year', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-sm"
                                            />
                                        ) : (
                                            <p className="text-sm sm:text-base text-gray-800">{profileData.year}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <Package className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mt-1 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <label className="text-xs sm:text-sm text-gray-600 block mb-1">Bag Number</label>
                                        <p className="text-sm sm:text-base text-gray-800">{profileData.bagNumber}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mt-1 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <label className="text-xs sm:text-sm text-gray-600 block mb-1">Join Date</label>
                                        <p className="text-sm sm:text-base text-gray-800">{profileData.joinDate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hostel Information */}
                        <div className="space-y-4">
                            <h3 className="text-base sm:text-lg font-semibold text-[#333] border-b border-gray-200 pb-2">Hostel Information</h3>
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mt-1 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <label className="text-xs sm:text-sm text-gray-600 block mb-1">Hostel & Room</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editData.hostel}
                                            onChange={(e) => handleInputChange('hostel', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-sm"
                                        />
                                    ) : (
                                        <p className="text-sm sm:text-base text-gray-800">{profileData.hostel}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Profile; 