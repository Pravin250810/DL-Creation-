import React, { useState } from 'react';
import { ScreenId } from '../types.ts';
import { MOCK_ORDERS } from '../data/mockData.ts';

interface ReturnsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const ReturnsScreen: React.FC<ReturnsScreenProps> = ({ onNavigate }) => {
  const [selectedOrder, setSelectedOrder] = useState('ord-2');
  const [returnInitiated, setReturnInitiated] = useState(false);

  const eligibleOrders = MOCK_ORDERS.filter((o) => o.status === 'Delivered');

  const handleInitiateReturn = () => {
    setReturnInitiated(true);
  };

  return (
    <div className="pb-24 px-4 pt-3 bg-[#FEF8F6] text-[#1A1918]">
      {/* Header */}
      <div className="mb-4">
        <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block mb-0.5">
          Zero-Risk Indulgence
        </span>
        <h2 className="font-serif text-2xl font-semibold text-[#1A1918]">
          7-Day Return Guarantee
        </h2>
        <p className="text-xs text-[#8C8782] mt-0.5">
          Complimentary doorstep reverse pickup across all Indian pincodes.
        </p>
      </div>

      {/* Guarantee Badge Card */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-[#1A1817] to-[#2E2926] text-white shadow-sm mb-5 flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-full border border-[#DFC48B] flex items-center justify-center text-[#DFC48B] bg-white/10 shrink-0">
          <span className="material-symbols-outlined text-[24px]">verified</span>
        </div>
        <div>
          <h3 className="font-serif text-sm font-semibold text-white">
            100% Hassle-Free Returns
          </h3>
          <p className="text-[11px] text-stone-300 mt-0.5 leading-snug">
            Not completely in love? Return or exchange with zero questions asked within 7 days of delivery.
          </p>
        </div>
      </div>

      {/* 3-Step Return Walkthrough */}
      <div className="p-4 rounded-xl bg-white border border-[#E8DED9] shadow-2xs mb-5 space-y-4">
        <h3 className="font-serif text-xs font-semibold text-[#1A1918]">
          How Our Doorstep Return Works
        </h3>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="space-y-1">
            <span className="w-7 h-7 mx-auto rounded-full bg-[#FEF8F6] border border-[#DFC48B] text-[#C5A059] font-bold text-xs flex items-center justify-center">
              1
            </span>
            <strong className="block text-[#1A1918] text-[11px]">Request</strong>
            <p className="text-[10px] text-[#8C8782]">Select order below in 10 seconds</p>
          </div>

          <div className="space-y-1">
            <span className="w-7 h-7 mx-auto rounded-full bg-[#FEF8F6] border border-[#DFC48B] text-[#C5A059] font-bold text-xs flex items-center justify-center">
              2
            </span>
            <strong className="block text-[#1A1918] text-[11px]">Doorstep Pickup</strong>
            <p className="text-[10px] text-[#8C8782]">BlueDart courier collects package</p>
          </div>

          <div className="space-y-1">
            <span className="w-7 h-7 mx-auto rounded-full bg-[#FEF8F6] border border-[#DFC48B] text-[#C5A059] font-bold text-xs flex items-center justify-center">
              3
            </span>
            <strong className="block text-[#1A1918] text-[11px]">Instant Refund</strong>
            <p className="text-[10px] text-[#8C8782]">100% credited to your original UPI/bank</p>
          </div>
        </div>
      </div>

      {/* Eligibility Checklist */}
      <div className="p-3.5 rounded-xl bg-white border border-[#E8DED9] shadow-2xs mb-5 text-xs space-y-1.5">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8782] block">
          Item Return Eligibility
        </span>
        <div className="space-y-1 text-[11px] text-[#1A1918]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-emerald-700 text-[15px]">check</span>
            <span>Jewellery must be unused and unworn</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-emerald-700 text-[15px]">check</span>
            <span>Original DL velvet gift box and tags attached</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-emerald-700 text-[15px]">check</span>
            <span>Initiated within 7 days from verified delivery date</span>
          </div>
        </div>
      </div>

      {/* Instant Return Portal Order Selector */}
      <div className="p-4 rounded-xl bg-white border border-[#E8DED9] shadow-2xs space-y-3">
        <h3 className="font-serif text-xs font-semibold text-[#1A1918]">
          Select Delivered Order to Return or Exchange
        </h3>

        {returnInitiated ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <span className="material-symbols-outlined text-3xl text-emerald-700">
              check_circle
            </span>
            <h4 className="text-xs font-bold text-emerald-800">
              Reverse Pickup Scheduled Successfully!
            </h4>
            <p className="text-[11px] text-emerald-700 leading-relaxed">
              Our BlueDart executive will visit your address tomorrow between 10 AM - 1 PM to collect the package.
            </p>
            <button
              onClick={() => onNavigate('my-orders')}
              className="text-xs font-semibold text-[#1A1918] underline mt-1"
            >
              View in My Orders
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {eligibleOrders.map((order) => (
              <label
                key={order.id}
                onClick={() => setSelectedOrder(order.id)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedOrder === order.id
                    ? 'border-[#C5A059] bg-[#FEF8F6]'
                    : 'border-[#E8DED9] bg-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="return-order"
                    checked={selectedOrder === order.id}
                    onChange={() => {}}
                    className="accent-[#C5A059]"
                  />
                  <div>
                    <strong className="font-mono text-xs text-[#1A1918]">
                      #{order.orderNumber}
                    </strong>
                    <span className="text-[10px] text-[#8C8782] block">
                      {order.items[0]?.product.name}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#1A1918] tabular-nums">
                  ₹{order.totalAmount.toLocaleString('en-IN')}
                </span>
              </label>
            ))}

            <button
              onClick={handleInitiateReturn}
              className="w-full py-3 px-4 rounded-xl bg-[#1A1918] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#C5A059] active:scale-95 transition-all shadow-md"
            >
              Request Doorstep Pickup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
