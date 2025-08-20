import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            try {
                const storedStudentDataStr = localStorage.getItem('studentData');
                
                if (!storedStudentDataStr) {
                    console.log('No stored data found');
                    setIsLoggedIn(false);
                    setStudentData(null);
                    return;
                }

                const storedStudentData = JSON.parse(storedStudentDataStr);
                
                if (storedStudentData && storedStudentData.email) {
                    console.log('Valid student data found, restoring session');
                    setIsLoggedIn(true);
                    setStudentData(storedStudentData);
                    localStorage.setItem('isLoggedIn', 'true');
                } else {
                    console.log('Invalid stored data');
                    setIsLoggedIn(false);
                    setStudentData(null);
                    localStorage.removeItem('studentData');
                    localStorage.removeItem('isLoggedIn');
                }
            } catch (error) {
                console.error('Error checking auth:', error);
                setIsLoggedIn(false);
                setStudentData(null);
                localStorage.removeItem('studentData');
                localStorage.removeItem('isLoggedIn');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = (data) => {
        console.log('Storing login data:', { hasData: !!data });
        if (!data || !data.email) {
            console.error('Invalid login data');
            return;
        }
        localStorage.setItem('studentData', JSON.stringify(data));
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
        setStudentData(data);
    };

    const logout = (navigate) => {
        console.log('Logging out, clearing storage');
        localStorage.removeItem('studentData');
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        setStudentData(null);
        
        // Redirect to home page
        if (navigate) {
            navigate('/home');
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, studentData, login, logout, loading }}>
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
