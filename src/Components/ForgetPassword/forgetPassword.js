import React, { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { toast } from 'react-toastify';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { useNavigate } from 'react-router-dom';

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
      setTimeout(() => navigate('/'), 2000); // optional auto-redirect to login
    }
  };

  const getButtonLabel = () => {
    if (step === 1) return "Submit Email";
    if (step === 2) return "Submit OTP";
    if (step === 3) return "Set New Password";
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Tilt scale={1.05} glareEnable={true} glareMaxOpacity={0.2} className="rounded-3xl">
        <div className="w-[350px] p-8 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.15)] text-white relative overflow-hidden">

          {/* Icon & Title */}
          <div className="flex flex-col items-center justify-center mb-6">
            <LockPersonIcon sx={{ fontSize: 60 }} className="text-purple-400 drop-shadow-lg mb-2" />
            <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-fuchsia-400 to-indigo-500 text-transparent bg-clip-text drop-shadow-md">
              Reset Password
            </h2>
          </div>

          {/* Email */}
          {step >= 1 && (
            <div className='mb-4'>
              <label className='block mb-1 text-purple-300 font-medium text-sm'>Email</label>
              <input
                type="email"
                className='w-full mb-2 p-3 rounded-lg border border-purple-600 bg-black bg-opacity-30 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          {/* OTP */}
          {step >= 2 && (
            <div className='mb-4'>
              <label className='block mb-1 text-purple-300 font-medium text-sm'>OTP</label>
              <input
                type="text"
                className='w-full mb-2 p-3 rounded-lg border border-purple-600 bg-black bg-opacity-30 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500'
                placeholder='Enter OTP'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          )}

          {/* New Password */}
          {step === 3 && (
            <div className='mb-4'>
              <label className='block mb-1 text-purple-300 font-medium text-sm'>New Password</label>
              <input
                type="password"
                className='w-full mb-2 p-3 rounded-lg border border-purple-600 bg-black bg-opacity-30 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500'
                placeholder='Enter new password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            className='w-full mt-4 p-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 text-white font-bold text-sm hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-purple-700'
            onClick={handleSubmit}
          >
            {getButtonLabel()}
          </button>

          {/* Back to Login */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-purple-300 hover:text-fuchsia-400 transition-all duration-200 underline"
            >
              ⬅️ Back to Login
            </button>
          </div>

        </div>
      </Tilt>
    </div>
  );
};

export default ForgetPassword;
