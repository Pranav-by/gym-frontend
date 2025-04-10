import React, { useState, useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';

// Hover Sound Logic
let userInteracted = false;
if (typeof window !== 'undefined') {
  window.addEventListener(
    'click',
    () => {
      userInteracted = true;
    },
    { once: true }
  );
}
const playHoverSound = () => {
  if (!userInteracted) return;
  const audio = new Audio('/sounds/hover.mp3');
  audio.volume = 0.5;
  audio.play().catch((e) => console.warn('Audio blocked:', e));
};

const Sidebar = () => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) setGreeting('Good Morning ☀️');
    else if (hour >= 12 && hour < 17) setGreeting('Good Afternoon 🌤');
    else if (hour >= 17 && hour < 21) setGreeting('Good Evening 🌆');
    else setGreeting('Good Night 🌙');
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('isLogin');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="w-72 min-h-screen bg-[#0a0a0a] relative text-white flex flex-col items-center p-6 border-r border-white/10 shadow-2xl overflow-hidden">

      {/* Subtle Glow Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -inset-10 bg-gradient-to-tr from-purple-800 via-indigo-900 to-blue-900 opacity-25 blur-2xl animate-spin-slow rounded-full"></div>
      </div>

      {/* Sidebar content */}
      <div className="relative z-10 flex flex-col items-center w-full space-y-10">
        {/* Branding */}
        <div className="flex items-center gap-3">
          <img
            src="/image.png"
            alt="Logo"
            className="h-14 w-14 rounded-full border border-purple-700 shadow-md"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 text-transparent bg-clip-text">
            FITTRACK
          </span>
        </div>

        {/* Greeting */}
        <div className="text-center text-sm font-semibold text-purple-300 animate-pulse">
          {greeting}
        </div>
        <div className="text-xs text-gray-500 tracking-wider uppercase">
          Admin Panel
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-6 w-full">
          <Link to="/dashboard">
            <div
              onMouseEnter={playHoverSound}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#111111] hover:bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-[1.03] shadow-md hover:shadow-purple-700/40"
            >
              <HomeIcon />
              <span className="font-medium tracking-wide">Dashboard</span>
            </div>
          </Link>

          <Link to="/member">
            <div
              onMouseEnter={playHoverSound}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#111111] hover:bg-gradient-to-r from-green-600 via-emerald-700 to-teal-700 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-[1.03] shadow-md hover:shadow-emerald-600/40"
            >
              <GroupIcon />
              <span className="font-medium tracking-wide">Members</span>
            </div>
          </Link>

          <div
            onClick={handleLogout}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-4 p-4 rounded-xl bg-[#111111] hover:bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-[1.03] shadow-md hover:shadow-pink-500/40"
          >
            <LogoutIcon />
            <span className="font-medium tracking-wide">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
