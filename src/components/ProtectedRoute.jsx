import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return null; // or a loading spinner component
    }

    if (!isLoggedIn) {
        return <Navigate to="/student/login" replace />;
    }

    return children;
};
