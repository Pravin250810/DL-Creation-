import React from 'react';
import { ScreenId } from '../types.ts';

interface ScreenNavigatorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
}

interface ScreenItem {
  id: ScreenId;
  number: string;
  name: string;
  desc: string;
  icon: string;
}

export const ScreenNavigatorDrawer: React.FC<ScreenNavigatorDrawerProps> = ({
  isOpen,
  onClose,
  currentScreen,
  onSelectScreen,
}) => {
  if (!isOpen) return null;

  const flows: { category: string; screens: ScreenItem[] }[] = [
    {
      category: 'Flow A: Onboarding & Authentication',
      screens: [
        {
          id: 'splash',
          number: '01',
          name: 'Splash Screen',
          desc: 'Monogram logo, atelier tagline & 18K seal',
          icon: 'token',
        },
        {
          id: 'onboarding',
          number: '02',
          name: 'Onboarding Carousel',
          desc: '3-step value proposition & hero imagery',
          icon: 'view_carousel',
        },
        {
          id: 'login',
          number: '03',
          name: 'Login & Verification',
          desc: '+91 phone, 4-digit live OTP timer & guest mode',
          icon: 'lock_open',
        },
      ],
    },
    {
      category: 'Flow B: Discovery, Catalog & Search',
      screens: [
        {
          id: 'home',
          number: '04',
          name: 'Flagship Home',
          desc: 'Hero banner, category circles & trending grid',
          icon: 'home',
        },
        {
          id: 'categories',
          number: '05',
          name: 'Visual Categories',
          desc: '8 editorial categories with starting prices',
          icon: 'grid_view',
        },
        {
          id: 'plp',
          number: '06',
          name: 'PLP - Earrings Collection',
          desc: 'Filter chips, sorting & 2-column cards',
          icon: 'view_agenda',
        },
        {
          id: 'search',
          number: '07',
          name: 'Search & Discovery',
          desc: 'Voice search, moodboard cards & recent chips',
          icon: 'search',
        },
      ],
    },
    {
      category: 'Flow C: Product Details & Purchasing',
      screens: [
        {
          id: 'pdp',
          number: '08',
          name: 'PDP - Kundan Jhumka',
          desc: 'Gallery, certifications, pincode checker & bundle',
          icon: 'diamond',
        },
        {
          id: 'wishlist',
          number: '09',
          name: 'Wishlist Hub',
          desc: '4 saved jewels & "Move All to Bag"',
          icon: 'favorite',
        },
        {
          id: 'bag',
          number: '10',
          name: 'Shopping Bag',
          desc: 'Shipping threshold progress, coupons & stepper',
          icon: 'shopping_bag',
        },
        {
          id: 'checkout',
          number: '11',
          name: 'Checkout Flow',
          desc: '3-step stepper, address, UPI & COD options',
          icon: 'credit_card',
        },
      ],
    },
    {
      category: 'Flow D: Post-Purchase, Account & Support',
      screens: [
        {
          id: 'order-confirmed',
          number: '12',
          name: 'Order Confirmed',
          desc: 'Golden seal, #DLC-849204 & artisan timeline',
          icon: 'check_circle',
        },
        {
          id: 'live-tracking',
          number: '13',
          name: 'Live Order Tracking',
          desc: 'BlueDart live transit & courier contact',
          icon: 'local_shipping',
        },
        {
          id: 'my-orders',
          number: '14',
          name: 'My Orders',
          desc: 'Order history, invoice download & repeat order',
          icon: 'receipt_long',
        },
        {
          id: 'account',
          number: '15',
          name: 'My Account / Profile',
          desc: 'Gold Member club card & 1,240 Sparkle points',
          icon: 'badge',
        },
        {
          id: 'offers',
          number: '16',
          name: 'Offers & Atelier Vouchers',
          desc: '5 coupon cards with 1-tap copy/apply',
          icon: 'sell',
        },
        {
          id: 'notifications',
          number: '17',
          name: 'Notifications Center',
          desc: 'Orders, price drops, restocks & rewards',
          icon: 'notifications',
        },
        {
          id: 'about',
          number: '18',
          name: 'About Us & Heritage',
          desc: 'Karigari craftsmanship & founder Divya Lakshmanan',
          icon: 'auto_awesome',
        },
        {
          id: 'support',
          number: '19',
          name: 'Help & Concierge',
          desc: 'WhatsApp 24/7 concierge, FAQs & feedback',
          icon: 'support_agent',
        },
        {
          id: 'returns',
          number: '20',
          name: 'Returns & Refunds Policy',
          desc: '7-day doorstep pickup guarantee & portal',
          icon: 'assignment_return',
        },
      ],
    },
    {
      category: 'Flow E: B2B Wholesale & Travelling Salesman',
      screens: [
        {
          id: 'wholesale-order',
          number: '21',
          name: 'Wholesale Order Form',
          desc: 'Retailer store visit booking, wholesale matrix & margins',
          icon: 'storefront',
        },
        {
          id: 'travel-stock',
          number: '22',
          name: 'Salesman Travel Stock',
          desc: 'Suitcase & tray inventory: carried, sold & remaining',
          icon: 'luggage',
        },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-in Drawer */}
      <div className="relative w-full max-w-[360px] bg-[#FEF8F6] h-full shadow-2xl z-10 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-[#E8DED9] bg-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full border border-[#C5A059] flex items-center justify-center text-[9px] font-serif font-bold text-[#C5A059]">
                DL
              </span>
              <h2 className="font-serif text-lg font-semibold text-[#1A1918]">Atelier Directory</h2>
            </div>
            <p className="text-xs text-[#8C8782] mt-0.5">Explore all 20 interactive screens</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#8C8782] hover:text-[#1A1918] hover:bg-[#F8F2F0]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Directory List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {flows.map((flow, fIdx) => (
            <div key={fIdx} className="space-y-2">
              <span className="text-[11px] font-semibold text-[#C5A059] tracking-wider uppercase block">
                {flow.category}
              </span>
              <div className="space-y-1 bg-white rounded-xl border border-[#E8DED9] p-1.5 shadow-2xs">
                {flow.screens.map((item) => {
                  const isCurrent = currentScreen === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectScreen(item.id);
                        onClose();
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-colors ${
                        isCurrent
                          ? 'bg-[#F8F2F0] text-[#1A1918] font-medium border-l-2 border-[#C5A059]'
                          : 'hover:bg-[#FEF8F6] text-[#1A1918]'
                      }`}
                    >
                      <span className="text-[11px] font-mono font-medium text-[#8C8782] w-5">
                        {item.number}
                      </span>
                      <span
                        className={`material-symbols-outlined text-[19px] ${
                          isCurrent ? 'text-[#C5A059]' : 'text-[#8C8782]'
                        }`}
                      >
                        {item.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-[#1A1918] truncate">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-[#8C8782] truncate">{item.desc}</div>
                      </div>
                      {isCurrent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#E8DED9] bg-white text-center">
          <p className="text-[11px] text-[#8C8782]">
            DL Creation · Haute Imitation Jewellery Atelier
          </p>
        </div>
      </div>
    </div>
  );
};
