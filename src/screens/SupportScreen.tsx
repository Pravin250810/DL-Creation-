import React, { useState } from 'react';
import { ScreenId } from '../types.ts';

interface SupportScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const SupportScreen: React.FC<SupportScreenProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [userRating, setUserRating] = useState<number>(5);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const faqs = [
    {
      q: 'Will the 18K micro-gold plating tarnish or turn black?',
      a: 'Never under normal wear. Every DL jewel is sealed with a proprietary aerospace anti-tarnish e-coating that shields against moisture and gentle perspiration for years.',
    },
    {
      q: 'Are your earrings heavy on sensitive earlobes?',
      a: 'No! We engineer featherlight brass alloys and nickel-free ear posts designed specifically for sensitive Indian skin, ensuring 10-12 hours of painless festive wear.',
    },
    {
      q: 'How does the 7-Day Doorstep Reverse Pickup work?',
      a: 'If you are unsatisfied for any reason, simply request a return via our portal within 7 days of delivery. BlueDart will collect the package from your doorstep without any charges.',
    },
    {
      q: 'What payment options do you support?',
      a: 'We accept all Indian UPI apps (Google Pay, PhonePe, Paytm), RuPay/Visa/Mastercard cards, Net Banking, and Cash on Delivery (COD) across 19,000+ pincodes.',
    },
  ];

  return (
    <div className="pb-24 px-4 pt-3 bg-[#FEF8F6] text-[#1A1918]">
      {/* Header */}
      <div className="mb-4">
        <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block mb-0.5">
          24/7 Atelier Concierge
        </span>
        <h2 className="font-serif text-2xl font-semibold text-[#1A1918]">
          Help & Support
        </h2>
        <p className="text-xs text-[#8C8782] mt-0.5">
          Our master jewellery stylists are always here to assist you.
        </p>
      </div>

      {/* Active Order Help Card */}
      <div className="p-3.5 bg-white rounded-xl border border-[#DFC48B] shadow-2xs mb-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-[#8C8782] uppercase tracking-wider block">
            Recent Order Help
          </span>
          <strong className="text-xs text-[#1A1918]">Order #DLC-849204 (In Transit)</strong>
          <span className="text-[11px] text-emerald-700 block">Arriving Tomorrow by 7 PM</span>
        </div>
        <button
          onClick={() => onNavigate('live-tracking')}
          className="px-3 py-1.5 rounded-lg bg-[#1A1918] text-white text-[11px] font-semibold hover:bg-[#C5A059]"
        >
          Track Live
        </button>
      </div>

      {/* Instant Support Channels */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        {/* WhatsApp */}
        <button
          onClick={() => alert('Opening WhatsApp conversation with DL Atelier Concierge (+91 98201 94820)')}
          className="p-3 bg-white rounded-xl border border-[#E8DED9] flex flex-col items-center text-center shadow-2xs hover:border-[#25D366] transition-colors active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mb-1.5">
            <span className="material-symbols-outlined text-[18px]">chat</span>
          </div>
          <span className="text-xs font-semibold text-[#1A1918]">WhatsApp</span>
          <span className="text-[9px] text-emerald-700 font-medium">Online Now</span>
        </button>

        {/* Toll-Free Phone */}
        <button
          onClick={() => alert('Dialing DL Toll-Free Helpline: 1800-209-8800')}
          className="p-3 bg-white rounded-xl border border-[#E8DED9] flex flex-col items-center text-center shadow-2xs hover:border-[#C5A059] transition-colors active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-[#FEF8F6] border border-[#DFC48B] text-[#C5A059] flex items-center justify-center mb-1.5">
            <span className="material-symbols-outlined text-[18px]">call</span>
          </div>
          <span className="text-xs font-semibold text-[#1A1918]">1800 Toll Free</span>
          <span className="text-[9px] text-[#8C8782]">9 AM - 9 PM</span>
        </button>

        {/* Email */}
        <button
          onClick={() => alert('Opening email client for concierge@dlcreation.in')}
          className="p-3 bg-white rounded-xl border border-[#E8DED9] flex flex-col items-center text-center shadow-2xs hover:border-[#1A1918] transition-colors active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-stone-100 text-[#1A1918] flex items-center justify-center mb-1.5">
            <span className="material-symbols-outlined text-[18px]">mail</span>
          </div>
          <span className="text-xs font-semibold text-[#1A1918]">Email Us</span>
          <span className="text-[9px] text-[#8C8782]">2h response</span>
        </button>
      </div>

      {/* Categorized FAQs Accordion */}
      <div className="bg-white rounded-xl border border-[#E8DED9] divide-y divide-[#E8DED9] shadow-2xs overflow-hidden mb-6">
        <div className="p-3.5 bg-[#F8F2F0]">
          <h3 className="font-serif text-xs font-semibold text-[#1A1918]">
            Frequently Asked Questions
          </h3>
        </div>

        {faqs.map((faq, idx) => (
          <div key={idx}>
            <button
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="w-full px-3.5 py-3 flex items-center justify-between text-left text-xs font-medium text-[#1A1918] hover:bg-[#FEF8F6]"
            >
              <span className="pr-2">{faq.q}</span>
              <span className="material-symbols-outlined text-[18px] text-[#8C8782] shrink-0">
                {openFaq === idx ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {openFaq === idx && (
              <div className="px-3.5 pb-3 text-xs text-[#8C8782] leading-relaxed pt-1">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 5-Star Feedback Rating Widget */}
      <div className="p-4 rounded-xl bg-white border border-[#E8DED9] text-center shadow-2xs space-y-2">
        <h4 className="font-serif text-xs font-semibold text-[#1A1918]">
          Rate Your Atelier Experience
        </h4>
        <p className="text-[11px] text-[#8C8782]">How satisfied are you with our designs and concierge?</p>

        <div className="flex justify-center items-center gap-1.5 py-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => {
                setUserRating(star);
                setFeedbackSent(true);
              }}
              className="text-amber-500 hover:scale-125 transition-transform"
            >
              <span
                className={`material-symbols-outlined text-[24px] ${
                  star <= userRating ? 'fill' : ''
                }`}
              >
                star
              </span>
            </button>
          ))}
        </div>

        {feedbackSent && (
          <p className="text-xs text-emerald-700 font-semibold animate-in fade-in">
            ✨ Thank you! Your feedback honors our master karigars.
          </p>
        )}
      </div>
    </div>
  );
};
