import React from 'react';
import { ScreenId } from '../types.ts';
import { MOCK_PRODUCTS } from '../data/mockData.ts';

interface OrderConfirmedScreenProps {
  onNavigate: (screen: ScreenId) => void;
  orderNumber?: string;
  totalAmount?: number;
}

export const OrderConfirmedScreen: React.FC<OrderConfirmedScreenProps> = ({
  onNavigate,
  orderNumber = 'DLC-849204',
  totalAmount = 1528,
}) => {
  return (
    <div className="pb-20 px-4 pt-6 bg-[#FEF8F6] text-[#1A1918] text-center">
      {/* Golden Checkmark Seal */}
      <div className="relative mx-auto w-20 h-20 mb-4 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border-2 border-[#C5A059] bg-white flex items-center justify-center shadow-lg shadow-[#C5A059]/20">
          <div className="w-16 h-16 rounded-full bg-[#FEF8F6] border border-[#DFC48B] flex items-center justify-center">
            <span className="material-symbols-outlined text-[#C5A059] text-3xl font-bold">
              check
            </span>
          </div>
        </div>
        <span className="material-symbols-outlined text-[#C5A059] absolute -top-1 -right-1 text-xl animate-bounce">
          sparkles
        </span>
      </div>

      <span className="text-[11px] uppercase tracking-widest text-[#C5A059] font-bold block mb-1">
        Atelier Order Reserved
      </span>
      <h2 className="font-serif text-2xl font-semibold text-[#1A1918]">
        Thank You for Your Order
      </h2>
      <p className="text-xs text-[#8C8782] mt-1 max-w-xs mx-auto">
        Your handcrafted jewels are now being packaged with velvet luxury in our Mumbai atelier.
      </p>

      {/* Order Badge */}
      <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8DED9] shadow-2xs text-xs">
        <span className="text-[#8C8782]">Order ID:</span>
        <strong className="font-mono text-[#1A1918]">{orderNumber}</strong>
        <span className="text-[#8C8782]">·</span>
        <strong className="text-[#C5A059] tabular-nums">
          ₹{totalAmount.toLocaleString('en-IN')}
        </strong>
      </div>

      {/* Destination Card */}
      <div className="mt-6 p-4 rounded-xl bg-white border border-[#E8DED9] text-left shadow-2xs space-y-1.5">
        <div className="flex items-center justify-between text-xs text-[#8C8782] mb-1">
          <span className="font-semibold text-[#1A1918] flex items-center gap-1">
            <span className="material-symbols-outlined text-[#C5A059] text-[16px]">
              local_shipping
            </span>
            Estimated Delivery
          </span>
          <span className="text-emerald-700 font-semibold">Tomorrow, 7:00 PM</span>
        </div>
        <p className="text-xs text-[#1A1918] font-medium">Pravin Bhati · +91 98201 94820</p>
        <p className="text-[11px] text-[#8C8782]">
          A-402, Sea Green Heights, Worli Sea Face, Mumbai 400018
        </p>
      </div>

      {/* 3-Stage Artisan Journey Timeline */}
      <div className="mt-6 p-4 rounded-xl bg-white border border-[#E8DED9] text-left shadow-2xs space-y-3">
        <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C8782] block">
          Artisan Journey Timeline
        </span>

        <div className="space-y-4 relative pl-5 border-l-2 border-[#C5A059] ml-2">
          {/* Step 1 */}
          <div className="relative">
            <span className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-[#C5A059] border-2 border-white ring-2 ring-[#C5A059]/30" />
            <h4 className="text-xs font-semibold text-[#1A1918]">Order Confirmed & Payment Verified</h4>
            <p className="text-[10px] text-[#8C8782]">Today, 11:24 AM · Invoice emailed to you</p>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <span className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-[#DFC48B] border-2 border-white" />
            <h4 className="text-xs font-semibold text-[#1A1918]">18K Hallmarking & Quality Check</h4>
            <p className="text-[10px] text-[#8C8782]">In progress · Hand-buffing & anti-tarnish sealed</p>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <span className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-[#E8DED9] border-2 border-white" />
            <h4 className="text-xs font-semibold text-[#8C8782]">Air Cargo Shipped with BlueDart</h4>
            <p className="text-[10px] text-[#8C8782]">Expected today by 4:00 PM</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 space-y-2.5">
        <button
          onClick={() => onNavigate('live-tracking')}
          className="w-full py-3.5 px-6 rounded-full bg-[#1A1918] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#C5A059] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
        >
          <span>Track Live Shipment</span>
          <span className="material-symbols-outlined text-[16px]">local_shipping</span>
        </button>

        <button
          onClick={() => onNavigate('home')}
          className="w-full py-2.5 px-6 rounded-full bg-white border border-[#E8DED9] text-[#1A1918] text-xs font-medium hover:bg-[#F8F2F0] active:scale-95 transition-all"
        >
          Continue Exploring Atelier
        </button>
      </div>
    </div>
  );
};
