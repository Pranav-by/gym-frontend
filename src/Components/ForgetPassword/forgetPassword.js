import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = () => {
    if (step === 1) {
      if (!email) {
        toast.error("Please enter your email.");
        return;
      }
      // Simulate email submission
      toast.success("OTP sent to your email!");
      setStep(2);
    } else if (step === 2) {
      if (!otp || otp.length < 4) {
        toast.error("Enter a valid OTP.");
        return;
      }
      // Simulate OTP check
      toast.success("OTP verified.");
      setStep(3);
    } else if (step === 3) {
      if (!newPassword || newPassword.length < 6) {
        toast.error("Password must be at least 6 characters.");
        return;
      }
      // Simulate password reset
      toast.success("Password reset successful!");
      setStep(1);
      setEmail('');
      setOtp('');
      setNewPassword('');
    }
  };

  const getButtonLabel = () => {
    if (step === 1) return "Submit Email";
    if (step === 2) return "Submit OTP";
    if (step === 3) return "Set New Password";
  };

  return (
    <div className='w-full'>
      {step >= 1 && (
        <div className='w-full mb-5'>
          <label className='block mb-1 font-medium'>Email</label>
          <input
            type="email"
            className='w-full mb-2 p-2 rounded-lg border border-slate-400 text-sm'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      )}

      {step >= 2 && (
        <div className='w-full mb-5'>
          <label className='block mb-1 font-medium'>OTP</label>
          <input
            type="text"
            className='w-full mb-2 p-2 rounded-lg border border-slate-400 text-sm'
            placeholder='Enter OTP'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
      )}

      {step === 3 && (
        <div className='w-full mb-5'>
          <label className='block mb-1 font-medium'>New Password</label>
          <input
            type="password"
            className='w-full mb-2 p-2 rounded-lg border border-slate-400 text-sm'
            placeholder='Enter new password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
      )}

      <button
        className='bg-slate-800 text-white w-full p-3 rounded-lg font-semibold hover:bg-white hover:text-black transition'
        onClick={handleSubmit}
      >
        {getButtonLabel()}
      </button>
    </div>
  );
};

export default ForgetPassword;
