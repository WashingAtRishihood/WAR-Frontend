import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LaunchPage from './pages/LaunchPage';
import HomePage from './pages/HomePage';
import StudentLogin from './pages/student/StudentLogin';
import StudentSignup1 from './pages/student/StudentSignup1';
import StudentSignup2 from './pages/student/StudentSignup2';
import StudentDashboard from './pages/student/Dashboard';
import StudentProfile from './pages/student/Profile';
import Completed from './pages/student/Completed';
import Incomplete from './pages/student/Incomplete';
import Orders from './pages/student/Orders';
import WashermanLogin from './pages/washerman/WashermanLogin';
import WashermanDashboard from './pages/washerman/WashermanDashboard';
import Stats from './pages/washerman/Stats';
import StudentLookup from './pages/washerman/StudentLookup';
import NotFound from './pages/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* General Pages */}
                    <Route path="/" element={<LaunchPage />} />
                    <Route path="/home" element={<HomePage />} />

                    {/* Student Auth */}
                    <Route path="/student/login" element={<StudentLogin />} />
                    <Route path="/student/signup1" element={<StudentSignup1 />} />
                    <Route path="/student/signup2" element={<StudentSignup2 />} />

                    {/* Protected Student Pages */}
                    <Route
                        path="/student/dashboard"
                        element={
                            <ProtectedRoute>
                                <StudentDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/student/profile"
                        element={
                            <ProtectedRoute>
                                <StudentProfile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/student/completed"
                        element={
                            <ProtectedRoute>
                                <Completed />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/student/incomplete"
                        element={
                            <ProtectedRoute>
                                <Incomplete />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/student/orders"
                        element={
                            <ProtectedRoute>
                                <Orders />
                            </ProtectedRoute>
                        }
                    />

                    {/* Washerman Pages */}
                    <Route path="/washerman/login" element={<WashermanLogin />} />
                    <Route path="/washerman/dashboard" element={<WashermanDashboard />} />
                    <Route path="/washerman/stats" element={<Stats />} />
                    <Route path="/washerman/student-lookup" element={<StudentLookup />} />
                    
                    {/* 404 and catch-all */}
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;