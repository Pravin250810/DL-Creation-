import React from 'react';
import { ScreenId } from '../types.ts';
import { MOCK_PRODUCTS } from '../data/mockData.ts';

interface LiveTrackingScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const LiveTrackingScreen: React.FC<LiveTrackingScreenProps> = ({ onNavigate }) => {
  return (
    <div className="pb-24 px-4 pt-3 bg-[#FEF8F6] text-[#1A1918]">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block mb-0.5">
            Real-Time Logistics
          </span>
          <h2 className="font-serif text-2xl font-semibold text-[#1A1918]">
            Live Order Tracking
          </h2>
        </div>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
          In Transit
        </span>
      </div>

      {/* Courier AWB Header Card */}
      <div className="p-4 rounded-xl bg-white border border-[#E8DED9] shadow-2xs mb-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8DED9]/60">
          <div>
            <span className="text-[10px] text-[#8C8782] block">Courier Partner</span>
            <strong className="text-xs text-[#1A1918]">BlueDart Express Air</strong>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#8C8782] block">Air Waybill (AWB)</span>
            <strong className="font-mono text-xs text-[#C5A059]">BLUEDART-849204192IN</strong>
          </div>
        </div>

        <div className="pt-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#8C8782] block">Estimated Doorstep Delivery</span>
            <strong className="text-sm font-semibold text-[#1A1918]">
              Tomorrow by 7:00 PM
            </strong>
          </div>
          <button
            onClick={() => alert('Dialing BlueDart Express Air Courier Helpdesk: 1860-233-1234')}
            className="px-3 py-1.5 rounded-lg border border-[#E8DED9] text-xs font-medium text-[#1A1918] hover:bg-[#F8F2F0] flex items-center gap-1 active:scale-95"
          >
            <span className="material-symbols-outlined text-[15px]">call</span>
            <span>Contact Courier</span>
          </button>
        </div>
      </div>

      {/* 4-Step Vertical Timeline with Glowing Active Node */}
      <div className="p-4 rounded-xl bg-white border border-[#E8DED9] shadow-2xs mb-4">
        <h3 className="font-serif text-xs font-semibold text-[#1A1918] mb-4">
          Transit Progression
        </h3>

        <div className="relative pl-6 space-y-6">
          {/* Vertical line track */}
          <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-[#E8DED9]" />
          <div className="absolute left-2.5 top-2 h-2/3 w-0.5 bg-[#C5A059]" />

          {/* Node 1: Completed */}
          <div className="relative">
            <span className="absolute -left-[22px] top-0.5 w-4 h-4 rounded-full bg-[#C5A059] text-white flex items-center justify-center text-[10px] shadow-xs">
              ✓
            </span>
            <h4 className="text-xs font-semibold text-[#1A1918]">
              Order Placed & Verified
            </h4>
            <p className="text-[10px] text-[#8C8782]">
              Atelier Mumbai Hub · Today, 11:24 AM
            </p>
          </div>

          {/* Node 2: Completed */}
          <div className="relative">
            <span className="absolute -left-[22px] top-0.5 w-4 h-4 rounded-full bg-[#C5A059] text-white flex items-center justify-center text-[10px] shadow-xs">
              ✓
            </span>
            <h4 className="text-xs font-semibold text-[#1A1918]">
              18K Hallmarking & Velvet Sealed
            </h4>
            <p className="text-[10px] text-[#8C8782]">
              Quality Assured by Master Karigar · Today, 12:45 PM
            </p>
          </div>

          {/* Node 3: Active In Transit (Glowing) */}
          <div className="relative">
            <span className="absolute -left-[22px] top-0.5 w-4 h-4 rounded-full bg-[#C5A059] ring-4 ring-[#DFC48B]/50 animate-pulse flex items-center justify-center" />
            <h4 className="text-xs font-bold text-[#C5A059]">
              Dispatched via Express Air Cargo
            </h4>
            <p className="text-[10px] text-[#1A1918] font-medium">
              In transit from Mumbai Air Hub to Worli Sort Facility
            </p>
          </div>

          {/* Node 4: Future Pending */}
          <div className="relative opacity-60">
            <span className="absolute -left-[22px] top-0.5 w-4 h-4 rounded-full bg-[#E8DED9] border-2 border-white" />
            <h4 className="text-xs font-semibold text-[#8C8782]">
              Out for Doorstep Delivery
            </h4>
            <p className="text-[10px] text-[#8C8782]">
              Scheduled for Tomorrow, 10:00 AM – 7:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* Package Contents Preview */}
      <div className="p-4 rounded-xl bg-white border border-[#E8DED9] shadow-2xs mb-4">
        <h3 className="font-serif text-xs font-semibold text-[#1A1918] mb-2.5">
          Package Contents (2 Jewels)
        </h3>
        <div className="space-y-2">
          {MOCK_PRODUCTS.slice(0, 2).map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 object-cover rounded-md bg-[#F8F2F0] shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium text-[#1A1918] block truncate">
                  {item.name}
                </span>
                <span className="text-[10px] text-[#8C8782]">Qty: 1 · 18K Micro Gold</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 1-Tap WhatsApp Concierge Support */}
      <button
        onClick={() => onNavigate('support')}
        className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm hover:bg-[#20BE5A] active:scale-98 transition-all"
      >
        <span className="material-symbols-outlined text-[18px]">chat</span>
        <span>Need Live Help? WhatsApp Atelier Concierge</span>
      </button>
    </div>
  );
};
