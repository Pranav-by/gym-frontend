import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'; // cool signup icon

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      alert('⚠️ Please fill in all fields!');
      return;
    }
    sessionStorage.setItem('isLogin', true);
    navigate('/Dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-black text-white">
      <Tilt scale={1.05} glareEnable={true} glareMaxOpacity={0.2} className="rounded-3xl">
        <div className="w-[350px] p-8 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.15)] relative overflow-hidden">

          {/* Icon & Title */}
          <div className="flex flex-col items-center justify-center mb-6">
            <PersonAddAlt1Icon sx={{ fontSize: 58 }} className="text-cyan-400 drop-shadow-lg mb-2" />
            <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text drop-shadow-md">
              Create Account
            </h2>
          </div>

          {/* Input Fields */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mb-3 rounded-md bg-white/10 border border-white/10 text-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-3 rounded-md bg-white/10 border border-white/10 text-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-5 rounded-md bg-white/10 border border-white/10 text-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            className="w-full bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-600 text-white font-bold py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-cyan-500/40 transition-all duration-300"
          >
            Sign Up
          </button>
        </div>
      </Tilt>
    </div>
  );
};

export default Signup;
