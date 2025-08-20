import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const PublicRoute = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return null; // or a loading spinner
    }

    // Always allow access to home page
    if (location.pathname === '/home') {
        return children;
    }

    // Only redirect from login/auth pages if logged in
    if (isLoggedIn && location.pathname.includes('/student/')) {
        return <Navigate to="/student/dashboard" replace />;
    }

    return children;
};
