import React, { useState } from 'react';
import { ScreenId } from '../types.ts';
import { MOCK_COUPONS } from '../data/mockData.ts';

interface OffersScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onApplyCoupon: (code: string) => void;
}

export const OffersScreen: React.FC<OffersScreenProps> = ({ onNavigate, onApplyCoupon }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleApply = (code: string) => {
    onApplyCoupon(code);
    onNavigate('bag');
  };

  return (
    <div className="pb-24 px-4 pt-3 bg-[#FEF8F6] text-[#1A1918]">
      {/* Header */}
      <div className="mb-4">
        <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block mb-0.5">
          Exclusive Privileges
        </span>
        <h2 className="font-serif text-2xl font-semibold text-[#1A1918]">
          Atelier Voucher Vault
        </h2>
        <p className="text-xs text-[#8C8782] mt-0.5">
          Handpicked promotional rewards and complimentary shipping codes.
        </p>
      </div>

      {/* Coupon Cards */}
      <div className="space-y-3.5">
        {MOCK_COUPONS.map((coupon) => (
          <div
            key={coupon.code}
            className="bg-white rounded-2xl border border-[#E8DED9] p-4 shadow-2xs relative overflow-hidden"
          >
            {/* Cutout styling notches */}
            <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#FEF8F6] border-r border-[#E8DED9]" />
            <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#FEF8F6] border-l border-[#E8DED9]" />

            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#C5A059] block">
                  {coupon.discountText}
                </span>
                <h3 className="font-serif text-sm font-semibold text-[#1A1918]">
                  {coupon.title}
                </h3>
                <span className="text-[11px] text-[#8C8782] block mt-0.5">
                  {coupon.expiresOn}
                </span>
              </div>

              {/* Code Chip */}
              <div className="border border-dashed border-[#C5A059] bg-[#FEF8F6] px-2.5 py-1 rounded-lg text-center shrink-0">
                <span className="font-mono text-xs font-bold text-[#1A1918] tracking-wider block">
                  {coupon.code}
                </span>
              </div>
            </div>

            {/* Actions & Terms Toggle */}
            <div className="mt-3 pt-3 border-t border-[#E8DED9]/60 flex items-center justify-between text-xs">
              <button
                onClick={() =>
                  setExpandedCode(expandedCode === coupon.code ? null : coupon.code)
                }
                className="text-[#8C8782] hover:text-[#1A1918] text-[11px] flex items-center gap-0.5"
              >
                <span>{expandedCode === coupon.code ? 'Hide Terms' : 'View Terms'}</span>
                <span className="material-symbols-outlined text-[14px]">
                  {expandedCode === coupon.code ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="px-2.5 py-1 rounded-lg border border-[#E8DED9] text-[#1A1918] text-[11px] font-medium hover:bg-[#F8F2F0]"
                >
                  {copiedCode === coupon.code ? 'Copied!' : 'Copy Code'}
                </button>
                <button
                  onClick={() => handleApply(coupon.code)}
                  className="px-3 py-1 rounded-lg bg-[#1A1918] text-white text-[11px] font-semibold hover:bg-[#C5A059]"
                >
                  Apply to Bag
                </button>
              </div>
            </div>

            {/* Expanded Terms */}
            {expandedCode === coupon.code && (
              <div className="mt-2 pt-2 border-t border-[#E8DED9]/40 text-[10px] text-[#8C8782] space-y-0.5">
                {coupon.terms.map((t, idx) => (
                  <p key={idx}>• {t}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
