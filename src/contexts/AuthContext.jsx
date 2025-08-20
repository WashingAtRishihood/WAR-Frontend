import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check localStorage on component mount
        const checkAuth = () => {
            const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const storedStudentData = JSON.parse(localStorage.getItem('studentData'));
            
            setIsLoggedIn(storedIsLoggedIn);
            setStudentData(storedStudentData);
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = (data) => {
        localStorage.setItem('studentData', JSON.stringify(data));
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
        setStudentData(data);
    };

    const logout = () => {
        localStorage.removeItem('studentData');
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        setStudentData(null);
    };

    if (loading) {
        return null; // or a loading spinner
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, studentData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
