import React from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 max-w-[380px] w-[90%] animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="px-4 py-2.5 rounded-full bg-[#1A1817]/95 backdrop-blur-md text-white border border-[#DFC48B]/50 shadow-xl flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="material-symbols-outlined text-[#DFC48B] text-[18px]">
            sparkles
          </span>
          <span className="font-medium text-stone-100">{message}</span>
        </div>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-white p-0.5 rounded-full"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  );
};
