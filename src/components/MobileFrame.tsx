import React from 'react';
import { ScreenId } from '../types.ts';

interface MobileFrameProps {
  children: React.ReactNode;
  currentScreen: ScreenId;
  onOpenDirectory: () => void;
  onQuickNavigate: (screen: ScreenId) => void;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  currentScreen,
  onOpenDirectory,
  onQuickNavigate,
}) => {
  return (
    <div className="min-h-screen bg-[#1F1C1A] text-[#1A1918] flex flex-col items-center justify-start lg:py-6 lg:px-4">
      {/* Desktop Atelier Header Strip */}
      <div className="hidden lg:flex w-full max-w-[860px] items-center justify-between mb-4 px-4 py-2.5 rounded-full bg-[#2A2623] border border-[#DFC48B]/30 text-white shadow-xl text-xs">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full border border-[#DFC48B] flex items-center justify-center font-serif text-[10px] text-[#DFC48B] font-bold">
            DL
          </span>
          <span className="font-serif tracking-wider font-semibold text-[#DFC48B]">
            DL CREATION ATELIER
          </span>
          <span className="text-[#8C8782]">·</span>
          <span className="text-stone-300">22 Production Screens</span>
        </div>

        {/* Quick Flow Jumpers */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onQuickNavigate('splash')}
            className={`px-2 py-1 rounded-full text-[11px] transition-colors ${
              ['splash', 'onboarding', 'login'].includes(currentScreen)
                ? 'bg-[#C5A059] text-white font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-white/10'
            }`}
          >
            A: Intro
          </button>
          <button
            onClick={() => onQuickNavigate('home')}
            className={`px-2 py-1 rounded-full text-[11px] transition-colors ${
              ['home', 'categories', 'plp', 'search'].includes(currentScreen)
                ? 'bg-[#C5A059] text-white font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-white/10'
            }`}
          >
            B: Catalog
          </button>
          <button
            onClick={() => onQuickNavigate('pdp')}
            className={`px-2 py-1 rounded-full text-[11px] transition-colors ${
              ['pdp', 'wishlist', 'bag', 'checkout'].includes(currentScreen)
                ? 'bg-[#C5A059] text-white font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-white/10'
            }`}
          >
            C: Bag
          </button>
          <button
            onClick={() => onQuickNavigate('order-confirmed')}
            className={`px-2 py-1 rounded-full text-[11px] transition-colors ${
              [
                'order-confirmed',
                'live-tracking',
                'my-orders',
                'account',
                'offers',
                'notifications',
                'about',
                'support',
                'returns',
              ].includes(currentScreen)
                ? 'bg-[#C5A059] text-white font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-white/10'
            }`}
          >
            D: Support
          </button>
          <button
            onClick={() => onQuickNavigate('wholesale-order')}
            className={`px-2 py-1 rounded-full text-[11px] transition-colors ${
              ['wholesale-order', 'travel-stock'].includes(currentScreen)
                ? 'bg-[#C5A059] text-white font-semibold'
                : 'text-[#DFC48B] hover:text-white hover:bg-white/10 font-medium'
            }`}
          >
            E: B2B Wholesale & Travel Stock
          </button>
        </div>

        <button
          onClick={onOpenDirectory}
          className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-[#DFC48B] font-semibold text-[11px] flex items-center gap-1 transition-all"
        >
          <span className="material-symbols-outlined text-[15px]">apps</span>
          <span>All 22 Screens</span>
        </button>
      </div>

      {/* Mobile Device Viewport Container */}
      <div className="w-full max-w-[430px] min-h-screen bg-[#FEF8F6] relative shadow-2xl flex flex-col overflow-x-hidden lg:rounded-[40px] lg:border-[8px] lg:border-[#2C2926] lg:min-h-[880px] lg:max-h-[920px] lg:overflow-y-auto no-scrollbar">
        {/* Mobile Status Bar */}
        <div className="sticky top-0 z-50 bg-[#FEF8F6]/95 backdrop-blur-md px-6 pt-2.5 pb-1 flex items-center justify-between text-[11px] font-semibold text-[#1A1918] select-none">
          <span>9:41</span>
          {/* Dynamic Island / Speaker Pill */}
          <div className="w-20 h-4 bg-[#1A1817] rounded-full mx-auto hidden lg:block" />
          <div className="flex items-center gap-1.5 text-xs text-[#1A1918]">
            <span className="material-symbols-outlined text-[13px]">signal_cellular_alt</span>
            <span className="material-symbols-outlined text-[13px]">wifi</span>
            <span className="material-symbols-outlined text-[16px]">battery_full</span>
          </div>
        </div>

        {/* Screen Content */}
        <main className="flex-1 w-full">{children}</main>

        {/* Mobile Floating 20 Screens Quick Switcher Button */}
        <button
          onClick={onOpenDirectory}
          className="fixed bottom-20 right-4 z-40 lg:hidden w-11 h-11 rounded-full bg-[#1A1817] text-[#DFC48B] border border-[#DFC48B]/50 shadow-xl flex items-center justify-center active:scale-90 transition-transform"
          aria-label="View All 20 Screens"
          title="All 20 Screens"
        >
          <span className="material-symbols-outlined text-[20px]">apps</span>
        </button>
      </div>
    </div>
  );
};
