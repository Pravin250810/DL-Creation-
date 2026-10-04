import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types.ts';

interface LoginScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onLoginSuccess: (phone: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigate, onLoginSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('9820194820');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['7', '8', '4', '2']);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpSent && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, timeLeft]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setOtpSent(true);
      setTimeLeft(45);
    }
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onLoginSuccess('+91 ' + phoneNumber);
      onNavigate('home');
    }, 600);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length <= 1) {
      const nextOtp = [...otp];
      nextOtp[index] = val;
      setOtp(nextOtp);
      // Auto focus next if available
      if (val && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) (nextInput as HTMLInputElement).focus();
      }
    }
  };

  return (
    <div className="min-h-[660px] h-full flex flex-col justify-between p-6 bg-[#FEF8F6] text-[#1A1918]">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-full bg-white border border-[#E8DED9] flex items-center justify-center text-[#1A1918] shadow-2xs hover:bg-[#F8F2F0]"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <span className="font-serif text-sm tracking-widest text-[#C5A059] font-bold">
            DL CREATION
          </span>
          <div className="w-9" />
        </div>

        {/* Title */}
        <div className="mb-6">
          <span className="text-[11px] uppercase tracking-wider text-[#C5A059] font-bold block mb-1">
            VIP Atelier Membership
          </span>
          <h2 className="font-serif text-2xl font-semibold text-[#1A1918]">
            {otpSent ? 'Enter 4-Digit Passcode' : 'Sign in to Your Atelier'}
          </h2>
          <p className="text-xs text-[#8C8782] mt-1.5 leading-relaxed">
            {otpSent
              ? `Verification OTP dispatched via SMS to +91 ${phoneNumber}`
              : 'Unlock exclusive preview access, order tracking & 1,240 Sparkle rewards points.'}
          </p>
        </div>

        {/* Form State */}
        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1A1918]">
                Mobile Number
              </label>
              <div className="flex items-center rounded-xl bg-white border border-[#E8DED9] px-3 py-2.5 shadow-2xs focus-within:border-[#C5A059] focus-within:ring-1 focus-within:ring-[#C5A059] transition-all">
                {/* Indian Flag +91 */}
                <div className="flex items-center gap-1.5 pr-2.5 border-r border-[#E8DED9] select-none">
                  <span className="text-base" role="img" aria-label="India flag">
                    🇮🇳
                  </span>
                  <span className="text-xs font-medium text-[#1A1918]">+91</span>
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10-digit number"
                  className="w-full bg-transparent px-2.5 text-sm font-medium tracking-wide text-[#1A1918] outline-hidden placeholder:text-[#8C8782]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#1A1918] text-[#FEF8F6] text-xs font-semibold tracking-wider uppercase hover:bg-[#C5A059] active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Get 4-Digit Passcode</span>
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </form>
        ) : (
          <div className="space-y-5">
            {/* 4-digit OTP grid */}
            <div className="flex items-center justify-center gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-13 h-14 rounded-xl bg-white border-2 border-[#C5A059] text-center font-serif text-xl font-bold text-[#1A1918] shadow-sm focus:border-[#B38E47] focus:outline-hidden"
                />
              ))}
            </div>

            {/* Countdown timer */}
            <div className="flex items-center justify-between text-xs text-[#8C8782] px-1">
              <span>
                Resend passcode in:{' '}
                <strong className="text-[#1A1918] font-mono tabular-nums">
                  {timeLeft > 0 ? `00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}` : 'Ready'}
                </strong>
              </span>
              <button
                disabled={timeLeft > 0}
                onClick={() => setTimeLeft(45)}
                className={`font-semibold transition-colors ${
                  timeLeft > 0
                    ? 'text-[#8C8782] opacity-50 cursor-not-allowed'
                    : 'text-[#C5A059] hover:text-[#B38E47]'
                }`}
              >
                Resend OTP
              </button>
            </div>

            <button
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full py-3.5 px-4 rounded-xl bg-[#1A1918] text-[#FEF8F6] text-xs font-semibold tracking-wider uppercase hover:bg-[#C5A059] active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <span>Authenticating Passcode...</span>
              ) : (
                <>
                  <span>Verify & Unlock Atelier</span>
                  <span className="material-symbols-outlined text-base">verified_user</span>
                </>
              )}
            </button>

            <div className="text-center">
              <button
                onClick={() => setOtpSent(false)}
                className="text-xs text-[#8C8782] hover:text-[#1A1918] underline underline-offset-2"
              >
                Change mobile number
              </button>
            </div>
          </div>
        )}

        {/* Social Auth Dividers */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E8DED9]" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[#FEF8F6] px-3 text-[#8C8782] text-[11px] font-medium">
              or connect with
            </span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              onLoginSuccess('Google User');
              onNavigate('home');
            }}
            className="py-2.5 px-3 rounded-xl bg-white border border-[#E8DED9] text-xs font-medium text-[#1A1918] flex items-center justify-center gap-2 shadow-2xs hover:bg-[#F8F2F0] active:scale-98 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.87c2.26-2.09 3.58-5.17 3.58-9.15z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.05c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.25v3.15C3.25 21.36 7.31 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24 0-.75.13-1.52.38-2.24V6.61H1.25C.45 8.22 0 10.05 0 12s.45 3.78 1.25 5.39l4.02-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.64 1.25 6.61l4.02 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
              />
            </svg>
            <span>Google</span>
          </button>

          <button
            onClick={() => {
              onLoginSuccess('Apple User');
              onNavigate('home');
            }}
            className="py-2.5 px-3 rounded-xl bg-white border border-[#E8DED9] text-xs font-medium text-[#1A1918] flex items-center justify-center gap-2 shadow-2xs hover:bg-[#F8F2F0] active:scale-98 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">phone_iphone</span>
            <span>Apple</span>
          </button>
        </div>
      </div>

      {/* Guest Mode & Disclaimer */}
      <div className="pt-6 text-center space-y-3">
        <button
          onClick={() => onNavigate('home')}
          className="text-xs font-semibold text-[#1A1918] hover:text-[#C5A059] underline underline-offset-4"
        >
          Continue as Guest
        </button>

        <p className="text-[10px] text-[#8C8782] leading-tight">
          By signing in, you agree to DL Creation's{' '}
          <span
            onClick={() => onNavigate('returns')}
            className="underline cursor-pointer hover:text-[#1A1918]"
          >
            Terms & Craft Guarantee
          </span>
          .
        </p>
      </div>
    </div>
  );
};
