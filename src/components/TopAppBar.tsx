import React from 'react';
import { ScreenId } from '../types.ts';

interface TopAppBarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenMenu: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenMenu,
}) => {
  const isRootScreen = ['home', 'splash', 'onboarding'].includes(currentScreen);
  const showBack = !isRootScreen;

  return (
    <header className="sticky top-0 z-40 bg-[#FEF8F6]/95 backdrop-blur-md border-b border-[#E8DED9] px-4 py-3 flex items-center justify-between transition-all">
      {/* Zone 1: Navigation / Menu */}
      <div className="flex items-center gap-2">
        {showBack ? (
          <button
            onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#1A1918] hover:bg-[#F8F2F0] active:scale-95 transition-transform"
            aria-label="Go Back"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
        ) : (
          <button
            onClick={onOpenMenu}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#1A1918] hover:bg-[#F8F2F0] active:scale-95 transition-transform"
            aria-label="Open Navigation Directory"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
        )}
      </div>

      {/* Zone 2: Monogram Brand Wordmark */}
      <div
        onClick={() => onNavigate('home')}
        className="flex items-center gap-1.5 cursor-pointer select-none group text-center"
      >
        <span className="w-6 h-6 rounded-full border border-[#C5A059] flex items-center justify-center text-[10px] font-serif font-semibold tracking-wider text-[#C5A059] bg-white shadow-xs">
          DL
        </span>
        <span className="font-serif text-lg tracking-wide text-[#1A1918] group-hover:text-[#C5A059] transition-colors">
          DL CREATION
        </span>
      </div>

      {/* Zone 3: Actions (Search, Wishlist, Bag) */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onNavigate('search')}
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#1A1918] hover:bg-[#F8F2F0] active:scale-95 transition-transform"
          aria-label="Search Collection"
        >
          <span className="material-symbols-outlined text-[22px]">search</span>
        </button>

        <button
          onClick={() => onNavigate('wishlist')}
          className="w-9 h-9 rounded-full relative flex items-center justify-center text-[#1A1918] hover:bg-[#F8F2F0] active:scale-95 transition-transform"
          aria-label="Wishlist"
        >
          <span className="material-symbols-outlined text-[22px]">favorite</span>
          {wishlistCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#C5A059] text-white text-[10px] font-semibold rounded-full flex items-center justify-center tabular-nums shadow-xs">
              {wishlistCount}
            </span>
          )}
        </button>

        <button
          onClick={() => onNavigate('bag')}
          className="w-9 h-9 rounded-full relative flex items-center justify-center text-[#1A1918] hover:bg-[#F8F2F0] active:scale-95 transition-transform"
          aria-label="Shopping Bag"
        >
          <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
          {cartCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#1A1918] text-white text-[10px] font-semibold rounded-full flex items-center justify-center tabular-nums shadow-xs">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
