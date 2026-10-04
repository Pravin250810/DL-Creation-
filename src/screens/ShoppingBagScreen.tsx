import React, { useState } from 'react';
import { ScreenId, CartItem } from '../types.ts';

interface ShoppingBagScreenProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onNavigate: (screen: ScreenId) => void;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
}

export const ShoppingBagScreen: React.FC<ShoppingBagScreenProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [giftWrap, setGiftWrap] = useState(true);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 1000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  // Coupon calculations
  let discountAmount = 0;
  if (appliedCoupon === 'SPARKLE15') {
    discountAmount = Math.round(subtotal * 0.15);
  } else if (appliedCoupon === 'WELCOME10') {
    discountAmount = Math.round(subtotal * 0.1);
  } else if (appliedCoupon === 'GOLDEN20') {
    discountAmount = 500;
  }

  const shippingFee = subtotal >= freeShippingThreshold ? 0 : 99;
  const giftWrapFee = giftWrap ? 50 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee + giftWrapFee);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      onApplyCoupon(couponInput.trim().toUpperCase());
      setCouponInput('');
    }
  };

  return (
    <div className="pb-28 px-4 pt-3 bg-[#FEF8F6] text-[#1A1918]">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="font-serif text-2xl font-semibold text-[#1A1918]">
          Atelier Bag
        </h2>
        <span className="text-xs text-[#8C8782] tabular-nums">
          {cart.reduce((a, c) => a + c.quantity, 0)} Items
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-[#E8DED9] my-6">
          <span className="material-symbols-outlined text-4xl text-[#8C8782] mb-2">
            shopping_bag
          </span>
          <h3 className="font-serif text-base font-semibold text-[#1A1918]">
            Your atelier bag is empty
          </h3>
          <p className="text-xs text-[#8C8782] mt-1 mb-4">
            Indulge in handcrafted royal Indian jewels made for every celebration.
          </p>
          <button
            onClick={() => onNavigate('plp')}
            className="px-5 py-2.5 rounded-full bg-[#1A1918] text-white text-xs font-semibold hover:bg-[#C5A059]"
          >
            Explore Jewellery
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Dynamic Free Express Shipping Progress Bar */}
          <div className="p-3.5 rounded-xl bg-white border border-[#E8DED9] shadow-2xs">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-[#1A1918] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#C5A059] text-[18px]">
                  local_shipping
                </span>
                <span>
                  {remainingForFreeShipping > 0
                    ? `Add ₹${remainingForFreeShipping} more for FREE Express Shipping & Velvet Box`
                    : '🎉 You have unlocked FREE Express Shipping & Velvet Box!'}
                </span>
              </span>
              <span className="text-[11px] font-bold text-[#C5A059]">{shippingProgress}%</span>
            </div>
            {/* Progress bar track */}
            <div className="w-full h-1.5 bg-[#F8F2F0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C5A059] rounded-full transition-all duration-500"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item Cards */}
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="p-3 bg-white rounded-xl border border-[#E8DED9] flex gap-3 shadow-2xs"
              >
                {/* Image */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 object-cover rounded-lg bg-[#F8F2F0] shrink-0"
                />

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <span className="text-[10px] text-[#8C8782] block">
                        {item.product.category}
                      </span>
                      <h4 className="font-serif text-xs font-semibold text-[#1A1918] line-clamp-1">
                        {item.product.name}
                      </h4>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-[#8C8782] hover:text-rose-600 p-0.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#E8DED9]/60">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs font-bold text-[#1A1918] tabular-nums">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-[#8C8782] line-through tabular-nums">
                        ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Stepper (- 1 +) */}
                    <div className="flex items-center border border-[#E8DED9] rounded-lg bg-[#FEF8F6]">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-[#1A1918] hover:bg-[#F8F2F0] rounded-l-lg"
                      >
                        <span className="material-symbols-outlined text-[14px]">remove</span>
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-[#1A1918] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-[#1A1918] hover:bg-[#F8F2F0] rounded-r-lg"
                      >
                        <span className="material-symbols-outlined text-[14px]">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon Code Section */}
          <div className="p-3.5 bg-white rounded-xl border border-[#E8DED9] shadow-2xs">
            {appliedCoupon ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-[20px]">
                    check_circle
                  </span>
                  <div>
                    <span className="text-xs font-bold text-emerald-700 tracking-wider">
                      '{appliedCoupon}' APPLIED
                    </span>
                    <span className="text-[11px] text-[#8C8782] block">
                      You saved ₹{discountAmount.toLocaleString('en-IN')} on this order
                    </span>
                  </div>
                </div>
                <button
                  onClick={onRemoveCoupon}
                  className="text-xs font-semibold text-rose-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter Coupon (e.g. SPARKLE15)"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8DED9] uppercase font-medium placeholder:normal-case focus:border-[#C5A059] outline-hidden"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1A1918] text-white text-xs font-semibold rounded-lg hover:bg-[#C5A059] transition-colors"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Quick coupon tap shortcut */}
            {!appliedCoupon && (
              <div className="mt-2 pt-2 border-t border-[#E8DED9]/60 flex items-center justify-between text-[11px]">
                <span className="text-[#8C8782]">Available: SPARKLE15 (15% OFF)</span>
                <button
                  onClick={() => onApplyCoupon('SPARKLE15')}
                  className="text-[#C5A059] font-semibold hover:underline"
                >
                  Tap to Apply
                </button>
              </div>
            )}
          </div>

          {/* Luxury Gift Wrap Toggle */}
          <div className="p-3 bg-white rounded-xl border border-[#E8DED9] flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#C5A059] text-[20px]">
                featured_seasonal_and_gifts
              </span>
              <div>
                <span className="text-xs font-semibold text-[#1A1918] block">
                  Luxury Atelier Gift Wrap (+₹50)
                </span>
                <span className="text-[10px] text-[#8C8782]">
                  Includes embossed velvet box, wax seal card & gift ribbon
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={giftWrap}
              onChange={(e) => setGiftWrap(e.target.checked)}
              className="accent-[#C5A059] w-4 h-4 cursor-pointer"
            />
          </div>

          {/* Itemized Price Breakdown */}
          <div className="p-4 bg-white rounded-xl border border-[#E8DED9] space-y-2 text-xs shadow-2xs">
            <h4 className="font-serif text-xs font-semibold text-[#1A1918] pb-1 border-b border-[#E8DED9]">
              Itemized Order Summary
            </h4>

            <div className="flex justify-between text-[#8C8782]">
              <span>Bag Subtotal</span>
              <span className="text-[#1A1918] font-medium tabular-nums">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Coupon Discount ({appliedCoupon})</span>
                <span className="font-medium tabular-nums">
                  -₹{discountAmount.toLocaleString('en-IN')}
                </span>
              </div>
            )}

            <div className="flex justify-between text-[#8C8782]">
              <span>Express Insured Shipping</span>
              <span className="text-[#1A1918] font-medium tabular-nums">
                {shippingFee === 0 ? (
                  <strong className="text-emerald-700">FREE</strong>
                ) : (
                  `₹${shippingFee}`
                )}
              </span>
            </div>

            {giftWrap && (
              <div className="flex justify-between text-[#8C8782]">
                <span>Atelier Velvet Packaging</span>
                <span className="text-[#1A1918] font-medium tabular-nums">₹50</span>
              </div>
            )}

            <div className="pt-2 border-t border-[#E8DED9] flex justify-between items-baseline text-sm font-bold text-[#1A1918]">
              <span>Estimated Total</span>
              <span className="font-serif text-base text-[#1A1918] tabular-nums">
                ₹{finalTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Proceed to Checkout Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto z-40 bg-white/95 backdrop-blur-md border-t border-[#E8DED9] p-3 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#8C8782] block">Total Payable</span>
            <span className="font-serif text-lg font-bold text-[#1A1918] tabular-nums">
              ₹{finalTotal.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={() => onNavigate('checkout')}
            className="py-3 px-6 rounded-full bg-[#1A1918] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#C5A059] active:scale-95 transition-all shadow-md flex items-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      )}
    </div>
  );
};
