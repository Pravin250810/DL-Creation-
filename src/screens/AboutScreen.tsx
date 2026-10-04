import React from 'react';
import { ScreenId } from '../types.ts';
import { ASSET_IMAGES } from '../data/mockData.ts';

interface AboutScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate }) => {
  const pillars = [
    {
      title: 'Design & Royal Style',
      desc: 'Inspired by Rajputana polki archives, redesigned with featherlight modern ergonomics.',
      icon: 'palette',
    },
    {
      title: 'Uncompromising Quality',
      desc: 'Triple 18K micro-gold electroplating sealed with aerospace anti-tarnish protective lacquer.',
      icon: 'verified',
    },
    {
      title: 'Honest Affordability',
      desc: 'Direct from Jaipur karigar ateliers to your doorstep, eliminating traditional luxury markups.',
      icon: 'savings',
    },
    {
      title: 'Empowering Confidence',
      desc: 'Democratizing royal Indian adornment so every woman shines fearlessly at every celebration.',
      icon: 'auto_awesome',
    },
  ];

  return (
    <div className="pb-24 px-4 pt-3 bg-[#FEF8F6] text-[#1A1918]">
      {/* Brand Hero Story */}
      <div className="text-center mb-6">
        <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block mb-1">
          L'Atelier Heritage
        </span>
        <h2 className="font-serif text-2xl font-semibold text-[#1A1918]">
          Jewellery That Celebrates You
        </h2>
        <p className="font-serif italic text-sm text-[#C5A059] mt-1">
          “Every Look. A Little More Beautiful.”
        </p>
      </div>

      {/* Visual Karigari Craft Split Showcase */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#E8DED9] bg-white mb-6">
        <div className="grid grid-cols-2 aspect-[16/9]">
          <img
            src={ASSET_IMAGES.hero}
            alt="Royal Heritage Karigari"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <img
            src={ASSET_IMAGES.jhumka}
            alt="Handset Kundan Jhumka"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3.5 bg-white text-center">
          <p className="text-xs text-[#8C8782] leading-relaxed">
            Hereditary artisans hand-setting uncut polki glass and hydro gems in our Jaipur and Mumbai ateliers.
          </p>
        </div>
      </div>

      {/* 4 Core Brand Pillars */}
      <div className="mb-6 space-y-3">
        <h3 className="font-serif text-base font-semibold text-[#1A1918]">
          Our Four Pillars of Craft
        </h3>

        <div className="grid grid-cols-1 gap-2.5">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white border border-[#E8DED9] flex items-start gap-3 shadow-2xs"
            >
              <div className="w-8 h-8 rounded-lg bg-[#FEF8F6] border border-[#DFC48B] flex items-center justify-center text-[#C5A059] shrink-0">
                <span className="material-symbols-outlined text-[18px]">{p.icon}</span>
              </div>
              <div>
                <h4 className="font-serif text-xs font-semibold text-[#1A1918]">{p.title}</h4>
                <p className="text-[11px] text-[#8C8782] mt-0.5 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Founder's Note */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-[#F8F2F0] to-[#FEF8F6] border border-[#DFC48B] text-center shadow-2xs space-y-3">
        <span className="text-[10px] uppercase tracking-widest font-bold text-[#C5A059] block">
          A Note from Our Founder
        </span>
        <blockquote className="font-serif italic text-xs text-[#1A1918] leading-relaxed">
          “Growing up in India, I watched our grandmothers cherish ancestral gold jewellery that felt too precious to wear daily. At DL Creation, we craft demi-fine and imitation jewels that look, feel, and shimmer like genuine royal gold — but are made to be worn fearlessly, joyfully, and every single day.”
        </blockquote>
        <div className="pt-2">
          <span className="font-serif text-sm font-bold text-[#1A1918] block">
            Divya Lakshmanan
          </span>
          <span className="text-[10px] text-[#8C8782]">
            Founder & Creative Director · DL Creation
          </span>
        </div>
      </div>
    </div>
  );
};
