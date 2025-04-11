import React, { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { toast } from 'react-toastify';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = () => {
    if (step === 1) {
      if (!email) return toast.error("Please enter your email.");
      toast.success("OTP sent to your email!");
      setStep(2);
    } else if (step === 2) {
      if (!otp || otp.length < 4) return toast.error("Enter a valid OTP.");
      toast.success("OTP verified.");
      setStep(3);
    } else if (step === 3) {
      if (!newPassword || newPassword.length < 6) return toast.error("Password must be at least 6 characters.");
      toast.success("Password reset successful!");
      setStep(1);
      setEmail('');
      setOtp('');
      setNewPassword('');
      setTimeout(() => navigate('/'), 2000);
    }
  };

  const getButtonLabel = () => {
    if (step === 1) return "Submit Email";
    if (step === 2) return "Submit OTP";
    if (step === 3) return "Set New Password";
  };

  return (
    <motion.div
      initial={{ scaleX: 0, transformOrigin: 'left', opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden"
    >
      {/* 🌌 Stars Background */}
      <div
        className="absolute inset-0 z-0 bg-repeat bg-center bg-cover pointer-events-none"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/stars.gif)` }}
      />

      {/* 🧠 HUD Overlay */}
      <div
        className="absolute inset-0 z-10 bg-cover bg-center opacity-20 pointer-events-none"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/hud-overlay.png)` }}
      />

      {/* ✨ Animated Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute w-[300px] h-[300px] bg-fuchsia-500 opacity-30 blur-3xl top-[10%] left-[20%] animate-pulse rounded-full"></div>
        <div className="absolute w-[400px] h-[400px] bg-indigo-500 opacity-20 blur-3xl top-[60%] left-[60%] animate-ping rounded-full"></div>
        <div className="absolute w-[200px] h-[200px] bg-cyan-400 opacity-20 blur-2xl top-[5%] left-[75%] rounded-full animate-bounce"></div>
      </div>

      {/* 🔒 Forget Password Card */}
      <Tilt scale={1.05} glareEnable={true} glareMaxOpacity={0.2} className="rounded-3xl z-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-[350px] p-8 rounded-3xl bg-black/40 backdrop-blur-lg border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.15)] relative overflow-hidden"
        >
          {/* Shine */}
          <div className="absolute top-0 left-[-75%] w-[50%] h-full bg-white/10 rotate-[30deg] animate-[shine_1.5s_linear_infinite] z-10 pointer-events-none"></div>

          {/* Title */}
          <div className="flex flex-col items-center justify-center mb-6 z-20 relative">
            <LockPersonIcon sx={{ fontSize: 60 }} className="text-purple-400 drop-shadow-lg mb-2" />
            <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-pink-400 via-fuchsia-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-md">
              Reset Password
            </h2>
          </div>

          {/* Step Inputs */}
          <div className="space-y-4 z-20 relative">
            {step >= 1 && (
              <div>
                <label className="block text-purple-300 text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-3 rounded-lg border border-purple-600 bg-black bg-opacity-30 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}

            {step >= 2 && (
              <div>
                <label className="block text-purple-300 text-sm font-medium mb-1">OTP</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-purple-600 bg-black bg-opacity-30 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}

            {step === 3 && (
              <div>
                <label className="block text-purple-300 text-sm font-medium mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full p-3 rounded-lg border border-purple-600 bg-black bg-opacity-30 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full mt-6 p-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 text-white font-bold text-sm hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-pink-700"
          >
            {getButtonLabel()}
          </button>

          {/* Back to Login */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-purple-300 hover:text-pink-400 transition-all duration-200 underline"
            >
              ⬅️ Back to Login
            </button>
          </div>
        </motion.div>
      </Tilt>
    </motion.div>
  );
};

export default ForgetPassword;
