import React from 'react';
import { ScreenId } from '../types.ts';
import { ASSET_IMAGES } from '../data/mockData.ts';

interface SplashScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-[640px] h-[calc(100vh-60px)] flex flex-col items-center justify-between p-6 bg-[#FEF8F6] text-center overflow-hidden">
      {/* Background soft ambient luxury aura */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#DFC48B]/20 blur-3xl pointer-events-none" />

      {/* Top subtle brand badge */}
      <div className="pt-6 z-10">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C8782] font-medium">
          L'Atelier de Bijoux · Est. 2018
        </span>
      </div>

      {/* Center Monogram, Tagline & Gold Seal */}
      <div className="flex flex-col items-center my-auto z-10 max-w-xs">
        {/* Monogram Emblem */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full border-2 border-[#C5A059] p-1 flex items-center justify-center bg-white shadow-lg shadow-[#C5A059]/15">
            <div className="w-full h-full rounded-full border border-[#DFC48B] flex flex-col items-center justify-center bg-[#FEF8F6]">
              <span className="font-serif text-3xl font-bold tracking-wider text-[#C5A059]">
                DL
              </span>
            </div>
          </div>
          {/* Sparkle decorative */}
          <span className="material-symbols-outlined absolute -top-1 -right-1 text-[#C5A059] text-xl">
            sparkles
          </span>
        </div>

        {/* Brand Name */}
        <h1 className="font-serif text-3xl font-semibold tracking-wide text-[#1A1918] mb-2">
          DL CREATION
        </h1>

        {/* Tagline */}
        <p className="font-serif italic text-lg text-[#C5A059] mb-4">
          “Every Look. A Little More Beautiful.”
        </p>

        {/* Subtitle */}
        <p className="text-xs text-[#8C8782] leading-relaxed max-w-[260px] mb-6">
          Handcrafted royal Indian polki, kundan, and daily demi-fine jewellery crafted with 18K micro-gold brilliance.
        </p>

        {/* 18K Hypoallergenic Gold Seal */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E8DED9] shadow-xs text-xs text-[#1A1918]">
          <span className="material-symbols-outlined text-[#C5A059] text-base fill">
            verified
          </span>
          <span className="text-[11px] font-medium">18K Micro-Gold · Hypoallergenic</span>
        </div>
      </div>

      {/* Bottom Action CTAs */}
      <div className="w-full max-w-xs space-y-3 pb-4 z-10">
        <button
          onClick={() => onNavigate('onboarding')}
          className="w-full py-3.5 px-6 rounded-full bg-[#1A1918] text-[#FEF8F6] text-sm font-semibold tracking-wide hover:bg-[#C5A059] active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
        >
          <span>Explore Atelier</span>
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>

        <div className="flex items-center justify-between text-xs px-2 pt-1">
          <button
            onClick={() => onNavigate('home')}
            className="text-[#8C8782] hover:text-[#1A1918] font-medium underline underline-offset-4"
          >
            Enter Store Direct
          </button>
          <button
            onClick={() => onNavigate('login')}
            className="text-[#C5A059] hover:text-[#B38E47] font-semibold"
          >
            VIP Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
