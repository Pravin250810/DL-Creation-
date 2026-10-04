import React from 'react';
import { ScreenId } from '../types.ts';

interface AccountScreenProps {
  onNavigate: (screen: ScreenId) => void;
  userPhone?: string;
  wishlistCount: number;
  ordersCount: number;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({
  onNavigate,
  userPhone = '+91 98201 94820',
  wishlistCount,
  ordersCount,
}) => {
  return (
    <div className="pb-24 px-4 pt-3 bg-[#FEF8F6] text-[#1A1918]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-2xl font-semibold text-[#1A1918]">My Account</h2>
        <button
          onClick={() => onNavigate('notifications')}
          className="w-8 h-8 rounded-full bg-white border border-[#E8DED9] flex items-center justify-center text-[#1A1918] relative shadow-2xs"
          title="Notifications"
        >
          <span className="material-symbols-outlined text-[19px]">notifications</span>
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C5A059]" />
        </button>
      </div>

      {/* Gold Member Club Card */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1A1817] via-[#2A2624] to-[#1A1817] p-4 text-white shadow-md border border-[#DFC48B]/40 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full border border-[#DFC48B] flex items-center justify-center text-xs font-serif font-bold text-[#DFC48B] bg-black/40">
              DL
            </span>
            <span className="text-xs uppercase tracking-widest text-[#DFC48B] font-semibold">
              Gold Club Member
            </span>
          </div>
          <span className="text-[10px] text-stone-300">Tier: Elite Atelier</span>
        </div>

        <div className="my-2">
          <span className="text-[10px] text-stone-300 uppercase tracking-wider block">
            Sparkle Rewards Balance
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-[#DFC48B] tabular-nums">
              1,240
            </span>
            <span className="text-xs text-stone-200">Points (Worth ₹1,240)</span>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
          <span className="text-stone-300 font-mono text-[11px]">{userPhone}</span>
          <button
            onClick={() => onNavigate('offers')}
            className="text-[#DFC48B] font-semibold hover:underline flex items-center gap-0.5 text-[11px]"
          >
            <span>Redeem Rewards</span>
            <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Quick Counters (Orders, Wishlist, Addresses) */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        <button
          onClick={() => onNavigate('my-orders')}
          className="p-3 bg-white rounded-xl border border-[#E8DED9] text-center shadow-2xs hover:border-[#C5A059] transition-all"
        >
          <span className="font-serif text-lg font-bold text-[#1A1918] tabular-nums block">
            {ordersCount}
          </span>
          <span className="text-[10px] text-[#8C8782] font-medium">Orders</span>
        </button>

        <button
          onClick={() => onNavigate('wishlist')}
          className="p-3 bg-white rounded-xl border border-[#E8DED9] text-center shadow-2xs hover:border-[#C5A059] transition-all"
        >
          <span className="font-serif text-lg font-bold text-[#1A1918] tabular-nums block">
            {wishlistCount}
          </span>
          <span className="text-[10px] text-[#8C8782] font-medium">Saved Jewels</span>
        </button>

        <div className="p-3 bg-white rounded-xl border border-[#E8DED9] text-center shadow-2xs">
          <span className="font-serif text-lg font-bold text-[#1A1918] tabular-nums block">
            2
          </span>
          <span className="text-[10px] text-[#8C8782] font-medium">Addresses</span>
        </div>
      </div>

      {/* B2B Salesman Hub Banner Card */}
      <div className="p-4 bg-gradient-to-br from-[#1A1817] to-[#2E2A27] text-white rounded-2xl border border-[#DFC48B]/40 shadow-sm mb-4 space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#DFC48B] text-[20px]">
              badge
            </span>
            <span className="font-serif text-xs font-bold text-white">
              B2B Retailer & Salesman Hub
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold bg-white/10 px-2 py-0.5 rounded-full">
            Active Tour
          </span>
        </div>

        <p className="text-[11px] text-stone-300">
          Tools for field sales executives visiting jewellery showrooms, boutiques, and retail counters across cities.
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onNavigate('wholesale-order')}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-colors flex flex-col justify-between active:scale-95"
          >
            <span className="material-symbols-outlined text-[#DFC48B] text-[20px] mb-1">
              storefront
            </span>
            <strong className="text-xs font-semibold text-white block">
              Wholesale Order
            </strong>
            <span className="text-[9px] text-stone-300">Book retailer visit order</span>
          </button>

          <button
            onClick={() => onNavigate('travel-stock')}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-left transition-colors flex flex-col justify-between active:scale-95"
          >
            <span className="material-symbols-outlined text-[#DFC48B] text-[20px] mb-1">
              luggage
            </span>
            <strong className="text-xs font-semibold text-white block">
              Travel Kit Stock
            </strong>
            <span className="text-[9px] text-stone-300">Carried, sold & remaining</span>
          </button>
        </div>
      </div>

      {/* Atelier Navigation Menu List */}
      <div className="bg-white rounded-2xl border border-[#E8DED9] divide-y divide-[#E8DED9] shadow-2xs overflow-hidden mb-4">
        <button
          onClick={() => onNavigate('offers')}
          className="w-full px-4 py-3 flex items-center justify-between text-xs text-[#1A1918] hover:bg-[#FEF8F6] transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#C5A059] text-[20px]">sell</span>
            <span className="font-medium">Offers & Atelier Vouchers</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-sm">
            5 Active
          </span>
        </button>

        <button
          onClick={() => onNavigate('notifications')}
          className="w-full px-4 py-3 flex items-center justify-between text-xs text-[#1A1918] hover:bg-[#FEF8F6] transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#C5A059] text-[20px]">
              notifications
            </span>
            <span className="font-medium">Notifications & Price Alerts</span>
          </div>
          <span className="material-symbols-outlined text-[#8C8782] text-[18px]">
            chevron_right
          </span>
        </button>

        <button
          onClick={() => onNavigate('about')}
          className="w-full px-4 py-3 flex items-center justify-between text-xs text-[#1A1918] hover:bg-[#FEF8F6] transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#C5A059] text-[20px]">
              auto_awesome
            </span>
            <span className="font-medium">About DL Creation & Artisans</span>
          </div>
          <span className="material-symbols-outlined text-[#8C8782] text-[18px]">
            chevron_right
          </span>
        </button>

        <button
          onClick={() => onNavigate('support')}
          className="w-full px-4 py-3 flex items-center justify-between text-xs text-[#1A1918] hover:bg-[#FEF8F6] transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#C5A059] text-[20px]">
              support_agent
            </span>
            <span className="font-medium">Help & 24/7 Concierge</span>
          </div>
          <span className="material-symbols-outlined text-[#8C8782] text-[18px]">
            chevron_right
          </span>
        </button>

        <button
          onClick={() => onNavigate('returns')}
          className="w-full px-4 py-3 flex items-center justify-between text-xs text-[#1A1918] hover:bg-[#FEF8F6] transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#C5A059] text-[20px]">
              assignment_return
            </span>
            <span className="font-medium">7-Day Returns & Doorstep Exchange</span>
          </div>
          <span className="material-symbols-outlined text-[#8C8782] text-[18px]">
            chevron_right
          </span>
        </button>
      </div>

      {/* Logout / Switch Account */}
      <button
        onClick={() => onNavigate('login')}
        className="w-full py-2.5 rounded-xl border border-[#E8DED9] bg-white text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors shadow-2xs"
      >
        Sign Out of Atelier
      </button>
    </div>
  );
};
