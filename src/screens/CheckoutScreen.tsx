import React, { useState } from 'react';
import { ScreenId, CartItem } from '../types.ts';

interface CheckoutScreenProps {
  cart: CartItem[];
  appliedCoupon: string | null;
  onNavigate: (screen: ScreenId) => void;
  onPlaceOrder: (orderDetails: {
    paymentMethod: string;
    deliverySpeed: string;
    totalAmount: number;
  }) => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  cart,
  appliedCoupon,
  onNavigate,
  onPlaceOrder,
}) => {
  const [selectedPayment, setSelectedPayment] = useState<'upi' | 'card' | 'netbanking' | 'cod'>(
    'upi'
  );
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('standard');
  const [upiMethod, setUpiMethod] = useState<'gpay' | 'phonepe' | 'paytm' | 'custom'>('gpay');
  const [customUpiId, setCustomUpiId] = useState('');
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon === 'SPARKLE15') {
    discountAmount = Math.round(subtotal * 0.15);
  } else if (appliedCoupon === 'WELCOME10') {
    discountAmount = Math.round(subtotal * 0.1);
  }

  // Extra 5% instant discount on UPI or Cards
  const prepaidDiscount = ['upi', 'card', 'netbanking'].includes(selectedPayment)
    ? Math.round((subtotal - discountAmount) * 0.05)
    : 0;

  const codFee = selectedPayment === 'cod' ? 49 : 0;
  const shippingFee = deliverySpeed === 'express' ? 99 : 0;
  const finalPayable = Math.max(0, subtotal - discountAmount - prepaidDiscount + codFee + shippingFee);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPlaceOrder({
        paymentMethod: selectedPayment.toUpperCase(),
        deliverySpeed,
        totalAmount: finalPayable,
      });
      onNavigate('order-confirmed');
    }, 800);
  };

  return (
    <div className="pb-28 px-4 pt-3 bg-[#FEF8F6] text-[#1A1918]">
      {/* 3-Step Checkout Stepper Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-[#8C8782] mb-2 px-3">
          <span className="text-[#C5A059] font-semibold flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-[#C5A059] text-white flex items-center justify-center text-[10px]">
              ✓
            </span>
            Bag
          </span>
          <span className="text-[#C5A059] font-semibold flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-[#C5A059] text-white flex items-center justify-center text-[10px]">
              ✓
            </span>
            Address
          </span>
          <span className="text-[#1A1918] font-bold flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-[#1A1918] text-white flex items-center justify-center text-[10px]">
              3
            </span>
            Payment
          </span>
        </div>
        {/* Track */}
        <div className="w-full h-1 bg-[#E8DED9] rounded-full overflow-hidden">
          <div className="w-full h-full bg-[#C5A059]" />
        </div>
      </div>

      <div className="space-y-4">
        {/* Delivery Address Card */}
        <div className="p-3.5 bg-white rounded-xl border border-[#E8DED9] shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#1A1918] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#C5A059] text-[18px]">
                location_on
              </span>
              <span>Delivery Destination</span>
            </span>
            <button className="text-[11px] font-semibold text-[#C5A059] hover:underline">
              Change
            </button>
          </div>

          <div className="text-xs space-y-0.5 text-[#8C8782] pl-6">
            <strong className="text-[#1A1918] block">Pravin Bhati · +91 98201 94820</strong>
            <p>A-402, Sea Green Heights, Worli Sea Face</p>
            <p>Mumbai, Maharashtra 400018</p>
          </div>
        </div>

        {/* Shipping Speed Selection */}
        <div className="p-3.5 bg-white rounded-xl border border-[#E8DED9] space-y-2 shadow-2xs">
          <span className="text-xs font-semibold text-[#1A1918] block mb-1">
            Delivery Preference
          </span>

          <label
            onClick={() => setDeliverySpeed('standard')}
            className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
              deliverySpeed === 'standard'
                ? 'border-[#C5A059] bg-[#FEF8F6]'
                : 'border-[#E8DED9] bg-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                name="speed"
                checked={deliverySpeed === 'standard'}
                onChange={() => {}}
                className="accent-[#C5A059]"
              />
              <div>
                <span className="text-xs font-semibold text-[#1A1918] block">
                  Complimentary Insured Air Delivery
                </span>
                <span className="text-[10px] text-[#8C8782]">
                  Delivery by Tomorrow, 7:00 PM
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700">FREE</span>
          </label>

          <label
            onClick={() => setDeliverySpeed('express')}
            className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
              deliverySpeed === 'express'
                ? 'border-[#C5A059] bg-[#FEF8F6]'
                : 'border-[#E8DED9] bg-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                name="speed"
                checked={deliverySpeed === 'express'}
                onChange={() => {}}
                className="accent-[#C5A059]"
              />
              <div>
                <span className="text-xs font-semibold text-[#1A1918] block">
                  VIP Same-Day Atelier Courier
                </span>
                <span className="text-[10px] text-[#8C8782]">
                  Delivery Today by 9:00 PM
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-[#1A1918] tabular-nums">₹99</span>
          </label>
        </div>

        {/* Payment Methods Section */}
        <div className="p-3.5 bg-white rounded-xl border border-[#E8DED9] space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#1A1918]">Select Payment Mode</span>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-sm">
              Extra 5% OFF on Prepaid
            </span>
          </div>

          {/* Option 1: UPI */}
          <div
            className={`p-3 rounded-xl border transition-all ${
              selectedPayment === 'upi'
                ? 'border-[#C5A059] bg-[#FEF8F6]'
                : 'border-[#E8DED9] bg-white'
            }`}
          >
            <label
              onClick={() => setSelectedPayment('upi')}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === 'upi'}
                  onChange={() => {}}
                  className="accent-[#C5A059]"
                />
                <div>
                  <span className="text-xs font-semibold text-[#1A1918] flex items-center gap-1.5">
                    <span>UPI (Google Pay / PhonePe / Paytm)</span>
                  </span>
                  <span className="text-[10px] text-emerald-700 block font-medium">
                    ⚡ Extra 5% Instant Atelier Discount applied
                  </span>
                </div>
              </div>
            </label>

            {selectedPayment === 'upi' && (
              <div className="mt-3 pt-2.5 border-t border-[#E8DED9] space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setUpiMethod('gpay')}
                    className={`py-1.5 px-2 rounded-lg border text-xs font-medium ${
                      upiMethod === 'gpay'
                        ? 'border-[#C5A059] bg-white text-[#C5A059] font-semibold'
                        : 'border-[#E8DED9] bg-white text-[#1A1918]'
                    }`}
                  >
                    Google Pay
                  </button>
                  <button
                    onClick={() => setUpiMethod('phonepe')}
                    className={`py-1.5 px-2 rounded-lg border text-xs font-medium ${
                      upiMethod === 'phonepe'
                        ? 'border-[#C5A059] bg-white text-[#C5A059] font-semibold'
                        : 'border-[#E8DED9] bg-white text-[#1A1918]'
                    }`}
                  >
                    PhonePe
                  </button>
                  <button
                    onClick={() => setUpiMethod('paytm')}
                    className={`py-1.5 px-2 rounded-lg border text-xs font-medium ${
                      upiMethod === 'paytm'
                        ? 'border-[#C5A059] bg-white text-[#C5A059] font-semibold'
                        : 'border-[#E8DED9] bg-white text-[#1A1918]'
                    }`}
                  >
                    Paytm
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Or enter custom UPI ID (e.g. name@okhdfcbank)"
                  value={customUpiId}
                  onChange={(e) => setCustomUpiId(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#E8DED9] bg-white outline-hidden focus:border-[#C5A059]"
                />
              </div>
            )}
          </div>

          {/* Option 2: Cards */}
          <label
            onClick={() => setSelectedPayment('card')}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              selectedPayment === 'card'
                ? 'border-[#C5A059] bg-[#FEF8F6]'
                : 'border-[#E8DED9] bg-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === 'card'}
                onChange={() => {}}
                className="accent-[#C5A059]"
              />
              <div>
                <span className="text-xs font-semibold text-[#1A1918] block">
                  Credit / Debit Card
                </span>
                <span className="text-[10px] text-[#8C8782]">Visa, Mastercard, RuPay</span>
              </div>
            </div>
          </label>

          {/* Option 3: Net Banking */}
          <label
            onClick={() => setSelectedPayment('netbanking')}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              selectedPayment === 'netbanking'
                ? 'border-[#C5A059] bg-[#FEF8F6]'
                : 'border-[#E8DED9] bg-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === 'netbanking'}
                onChange={() => {}}
                className="accent-[#C5A059]"
              />
              <div>
                <span className="text-xs font-semibold text-[#1A1918] block">Net Banking</span>
                <span className="text-[10px] text-[#8C8782]">HDFC, ICICI, SBI, Axis</span>
              </div>
            </div>
          </label>

          {/* Option 4: COD */}
          <label
            onClick={() => setSelectedPayment('cod')}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
              selectedPayment === 'cod'
                ? 'border-[#C5A059] bg-[#FEF8F6]'
                : 'border-[#E8DED9] bg-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === 'cod'}
                onChange={() => {}}
                className="accent-[#C5A059]"
              />
              <div>
                <span className="text-xs font-semibold text-[#1A1918] block">
                  Cash on Delivery (COD)
                </span>
                <span className="text-[10px] text-amber-700 font-medium">
                  +₹49 courier handling fee applies
                </span>
              </div>
            </div>
          </label>
        </div>

        {/* Collapsible Itemized Summary */}
        <div className="p-3.5 bg-white rounded-xl border border-[#E8DED9] shadow-2xs">
          <button
            onClick={() => setIsSummaryOpen(!isSummaryOpen)}
            className="w-full flex items-center justify-between text-xs font-semibold text-[#1A1918]"
          >
            <span>Review Order Items ({cart.length})</span>
            <div className="flex items-center gap-1 text-[#8C8782]">
              <span>₹{finalPayable.toLocaleString('en-IN')}</span>
              <span className="material-symbols-outlined text-[18px]">
                {isSummaryOpen ? 'expand_less' : 'expand_more'}
              </span>
            </div>
          </button>

          {isSummaryOpen && (
            <div className="mt-3 pt-2.5 border-t border-[#E8DED9] space-y-2 text-xs text-[#8C8782]">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center">
                  <span className="truncate max-w-[220px]">
                    {item.quantity}x {item.product.name}
                  </span>
                  <span className="tabular-nums font-medium text-[#1A1918]">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
              {prepaidDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Prepaid 5% Instant Discount</span>
                  <span className="tabular-nums">-₹{prepaidDiscount}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sticky Pay and Place Order Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto z-40 bg-white/95 backdrop-blur-md border-t border-[#E8DED9] p-3 shadow-xl">
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full py-3.5 px-6 rounded-full bg-[#1A1918] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#C5A059] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <span>Securing Payment & Reserving Jewels...</span>
          ) : (
            <>
              <span>PAY & PLACE ORDER (₹{finalPayable.toLocaleString('en-IN')})</span>
              <span className="material-symbols-outlined text-[16px]">lock</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
