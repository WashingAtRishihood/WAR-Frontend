import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LaunchPage from './pages/LaunchPage';
import HomePage from './pages/HomePage';
import StudentLogin from './pages/student/StudentLogin';
import StudentSignup from './pages/student/StudentSignup';
import StudentDashboard from './pages/student/Dashboard';
import StudentProfile from './pages/student/Profile';
import Completed from './pages/student/Completed';
import Incompleted from './pages/student/Incompleted';
import AboutUs from './pages/AboutUs';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LaunchPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/student/login" element={<StudentLogin />} />
                <Route path="/student/signup" element={<StudentSignup />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/profile" element={<StudentProfile />} />
                <Route path="/student/completed" element={<Completed />} />
                <Route path="/student/incompleted" element={<Incompleted />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/about-us" element={<AboutUs />} />
            </Routes>
        </Router>
    );
}

export default App;