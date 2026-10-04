import React from 'react';
import { ScreenId } from '../types.ts';

interface BottomNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  cartCount: number;
  wishlistCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  wishlistCount,
}) => {
  // Hide bottom nav on specific fullscreen flows (like splash, onboarding, checkout)
  const hideOnScreens: ScreenId[] = ['splash', 'onboarding', 'checkout'];
  if (hideOnScreens.includes(currentScreen)) {
    return null;
  }

  const tabs: { id: ScreenId; label: string; icon: string; count?: number }[] = [
    { id: 'home', label: 'Atelier', icon: 'diamond' },
    { id: 'categories', label: 'Categories', icon: 'grid_view' },
    { id: 'wishlist', label: 'Wishlist', icon: 'favorite', count: wishlistCount },
    { id: 'my-orders', label: 'Orders', icon: 'local_shipping' },
    { id: 'account', label: 'Account', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#E8DED9] px-2 py-1.5 flex items-center justify-around shadow-lg">
      {tabs.map((tab) => {
        const isActive =
          currentScreen === tab.id ||
          (tab.id === 'categories' && currentScreen === 'plp') ||
          (tab.id === 'account' &&
            ['offers', 'notifications', 'about', 'support', 'returns'].includes(currentScreen));

        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className="flex-1 py-1 flex flex-col items-center justify-center relative group active:scale-95 transition-transform"
          >
            <div className="relative flex items-center justify-center">
              <span
                className={`material-symbols-outlined text-[23px] transition-colors ${
                  isActive ? 'text-[#C5A059] fill' : 'text-[#8C8782] group-hover:text-[#1A1918]'
                }`}
              >
                {tab.icon}
              </span>
              {Boolean(tab.count && tab.count > 0) && (
                <span className="absolute -top-1 -right-2.5 px-1 min-w-[15px] h-[15px] bg-[#C5A059] text-white text-[9px] font-semibold rounded-full flex items-center justify-center tabular-nums">
                  {tab.count}
                </span>
              )}
            </div>
            <span
              className={`text-[10px] mt-0.5 tracking-tight font-medium transition-colors ${
                isActive ? 'text-[#1A1918] font-semibold' : 'text-[#8C8782]'
              }`}
            >
              {tab.label}
            </span>
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] absolute -bottom-1" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
