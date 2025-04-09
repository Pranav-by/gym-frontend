import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './Components/Sidebar/Sidebar';
import Dashboard from './Pages/Home/Dashboard/Dashboard';
import Home from './Pages/Home/home';
import Member from './Pages/Home/Members/member';
import MembershipPlans from './Pages/Plans/MembershipPlans';
import Trainers from './Pages/Trainers/Trainers';
import GymAttendance from './Pages/Attendance/GymAttendance';
import EarningsPayments from './Pages/Payments/EarningsPayments';
import WorkoutSchedule from './Pages/Workout/WorkoutSchedule';
import EquipmentStatus from './Pages/Equipment/EquipmentStatus';
import DietNutritionPlans from './Pages/DietNutrition/DietNutritionPlans';
import MemberFeedback from './Pages/Feedback/MemberFeedback';
import Members from './Pages/Members/Members';
import NewRegistration from './Pages/Registration/NewRegistration';
import UserProfile from './Pages/Profile/UserProfile'; // Optional Profile Page
import { Routes, Route, useNavigate } from 'react-router-dom';

// Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ProtectedRoute wrapper
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLogin");
    if (isLoggedIn) {
      setIsLogin(true);
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen overflow-hidden bg-black">
      {isLogin && <Sidebar />}

      <div className="flex-1 overflow-auto">
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/member" element={<ProtectedRoute><Member /></ProtectedRoute>} />
          <Route path="/plans" element={<ProtectedRoute><MembershipPlans /></ProtectedRoute>} />
          <Route path="/trainers" element={<ProtectedRoute><Trainers /></ProtectedRoute>} />
          <Route path="/attendance" element={<ProtectedRoute><GymAttendance /></ProtectedRoute>} />
          <Route path="/payments" element={<ProtectedRoute><EarningsPayments /></ProtectedRoute>} />
          <Route path="/schedules" element={<ProtectedRoute><WorkoutSchedule /></ProtectedRoute>} />
          <Route path="/equipment" element={<ProtectedRoute><EquipmentStatus /></ProtectedRoute>} />
          <Route path="/nutrition" element={<ProtectedRoute><DietNutritionPlans /></ProtectedRoute>} />
          <Route path="/feedback" element={<ProtectedRoute><MemberFeedback /></ProtectedRoute>} />
          <Route path="/members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
          <Route path="/registrations" element={<ProtectedRoute><NewRegistration /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />

          {/* Fallback Route */}
          <Route path="*" element={<div className="p-4 text-white">404 - Page Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
