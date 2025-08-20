import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const PublicRoute = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return null; // or a loading spinner
    }

    if (isLoggedIn) {
        // Redirect to dashboard if user is already logged in
        return <Navigate to="/student/dashboard" replace />;
    }

    return children;
};
