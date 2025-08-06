import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LaunchPage from './pages/LaunchPage';
import HomePage from './pages/HomePage';
import StudentLogin from './pages/student/StudentLogin';
import StudentSignup from './pages/student/StudentSignup';
import StudentDashboard from './pages/student/Dashboard';
import StudentProfile from './pages/student/Profile';
import Completed from './pages/student/Completed';
import Incompleted from './pages/student/Incompleted';
import WashermanLogin from './pages/washerman/WashermanLogin';
import WashermanDashboard from './pages/washerman/WashermanDashboard';
import WashermanHome from './pages/washerman/Home';
import WashermanReceived from './pages/washerman/Received';
import WashermanReady from './pages/washerman/Ready';
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
                <Route path="/washerman/login" element={<WashermanLogin />} />
                <Route path="/washerman/dashboard" element={<WashermanDashboard />} />
                <Route path="/washerman/home" element={<WashermanHome />} />
                <Route path="/washerman/received" element={<WashermanReceived />} />
                <Route path="/washerman/ready" element={<WashermanReady />} />
                <Route path="/about-us" element={<AboutUs />} />
            </Routes>
        </Router>
    );
}

export default App;