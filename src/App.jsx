import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LaunchPage from './pages/LaunchPage';
import HomePage from './pages/HomePage';
import StudentLogin from './pages/student/StudentLogin';
import StudentSignup from './pages/student/StudentSignup';
import StudentDashboard from './pages/student/Dashboard';
import StudentProfile from './pages/student/Profile';
import Completed from './pages/student/Completed';
import Incomplete from './pages/student/Incomplete';
import Orders from './pages/student/Orders';
import WashermanLogin from './pages/washerman/WashermanLogin';
import WashermanDashboard from './pages/washerman/WashermanDashboard';
import Stats from './pages/washerman/Stats';
import StudentLookup from './pages/washerman/StudentLookup';

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
                <Route path="/student/incomplete" element={<Incomplete />} />
                <Route path="/washerman/login" element={<WashermanLogin />} />
                <Route path="/washerman/dashboard" element={<WashermanDashboard />} />
                <Route path="/washerman/stats" element={<Stats />} />
                <Route path="/washerman/student-lookup" element={<StudentLookup />} />
                <Route path="/student/orders" element={<Orders />} />
            </Routes>
        </Router>
    );
}

export default App;