import React, { useState } from 'react';
import { ScreenId } from '../types.ts';
import { ASSET_IMAGES } from '../data/mockData.ts';

interface OnboardingCarouselProps {
  onNavigate: (screen: ScreenId) => void;
}

export const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const slides = [
    {
      image: ASSET_IMAGES.hero,
      eyebrow: 'Artisanal Karigari',
      title: 'Centuries of Rajputana Craftsmanship',
      subtitle:
        'Every uncut polki stone and hydro bead is handset by hereditary artisans in Jaipur ateliers.',
      badges: ['18K Micro Gold Plated', 'Pure Uncut Polki', 'Handmade Dori'],
    },
    {
      image: ASSET_IMAGES.jhumka,
      eyebrow: 'Engineered For Skin',
      title: 'Featherlight & 100% Skin Safe',
      subtitle:
        'Zero nickel, zero lead. Finished with an aerospace-grade anti-tarnish protective lacquer.',
      badges: ['Hypoallergenic Certified', 'Anti-Tarnish Seal', 'Sweat & Water Safe'],
    },
    {
      image: ASSET_IMAGES.rings,
      eyebrow: 'Demi-Fine Luxury',
      title: 'Effortless Everyday Brilliance',
      subtitle:
        'From high-stakes boardrooms to weekend destination weddings, elevate every moment.',
      badges: ['VVS Moissanite', 'Vermeil 18K Gold', '7-Day Easy Returns'],
    },
  ];

  const slide = slides[currentStep];

  const handleNext = () => {
    if (currentStep < slides.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onNavigate('home');
    }
  };

  return (
    <div className="relative min-h-[660px] h-full flex flex-col justify-between bg-[#FEF8F6] p-4 text-[#1A1918]">
      {/* Top Header with Skip */}
      <div className="flex items-center justify-between py-2 z-10">
        <span className="text-xs uppercase tracking-widest text-[#8C8782] font-semibold">
          Step {currentStep + 1} of 3
        </span>
        <button
          onClick={() => onNavigate('home')}
          className="text-xs font-semibold text-[#8C8782] hover:text-[#1A1918] py-1 px-3 rounded-full hover:bg-[#F8F2F0] transition-colors"
        >
          Skip to Store
        </button>
      </div>

      {/* Main Image Showcase Card */}
      <div className="relative my-2 w-full h-[320px] rounded-2xl overflow-hidden shadow-lg border border-[#E8DED9] bg-white group">
        <img
          src={slide.image}
          alt={slide.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Soft bottom vignette for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Milestone Indicator Pill in Image */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/40 shadow-xs">
          <span className="text-[11px] font-serif font-semibold text-[#C5A059]">
            DL ATELIER
          </span>
        </div>

        {/* Swipe Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-1.5 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentStep ? 'w-6 bg-[#C5A059]' : 'w-2 bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Editorial Content */}
      <div className="py-3 space-y-3 z-10">
        <div className="inline-block text-[11px] uppercase tracking-wider text-[#C5A059] font-bold">
          {slide.eyebrow}
        </div>
        <h2 className="font-serif text-2xl font-semibold text-[#1A1918] leading-tight">
          {slide.title}
        </h2>
        <p className="text-xs text-[#8C8782] leading-relaxed">{slide.subtitle}</p>

        {/* Value Proposition Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {slide.badges.map((b, i) => (
            <span
              key={i}
              className="text-[11px] px-2.5 py-1 rounded-md bg-white border border-[#E8DED9] text-[#1A1918] font-medium shadow-2xs"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="pt-2 pb-4 space-y-2 z-10">
        <button
          onClick={handleNext}
          className="w-full py-3.5 px-6 rounded-full bg-[#1A1918] text-[#FEF8F6] text-sm font-semibold tracking-wide hover:bg-[#C5A059] active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
        >
          <span>{currentStep === 2 ? 'Explore Collection' : 'Continue'}</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </button>

        <div className="text-center">
          <button
            onClick={() => onNavigate('login')}
            className="text-xs text-[#8C8782] hover:text-[#1A1918]"
          >
            Already an Atelier Club Member? <span className="text-[#C5A059] font-semibold">Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );
};
