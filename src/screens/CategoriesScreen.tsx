import React from 'react';
import { ScreenId } from '../types.ts';
import { MOCK_CATEGORIES } from '../data/mockData.ts';

interface CategoriesScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectCategoryFilter?: (catName: string) => void;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  onNavigate,
  onSelectCategoryFilter,
}) => {
  const handleCategoryClick = (categoryName: string) => {
    if (onSelectCategoryFilter) {
      onSelectCategoryFilter(categoryName);
    }
    onNavigate('plp');
  };

  return (
    <div className="pb-24 px-4 pt-4 bg-[#FEF8F6] text-[#1A1918]">
      {/* Editorial Header */}
      <div className="mb-5 text-center">
        <span className="text-[11px] uppercase tracking-widest text-[#C5A059] font-bold block mb-1">
          Haute Jewellery Catalog
        </span>
        <h2 className="font-serif text-2xl font-semibold text-[#1A1918]">
          Visual Categories
        </h2>
        <p className="text-xs text-[#8C8782] mt-1 max-w-xs mx-auto">
          Explore our complete handcrafted collection across classic and contemporary adornments.
        </p>
      </div>

      {/* 2-Column Editorial Grid */}
      <div className="grid grid-cols-2 gap-3.5">
        {MOCK_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.name)}
            className="group relative rounded-2xl overflow-hidden border border-[#E8DED9] bg-white shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-end aspect-[4/5]"
          >
            {/* Background Image */}
            <img
              src={cat.image}
              alt={cat.name}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

            {/* Price Pill Tag */}
            <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/40 shadow-xs">
              <span className="text-[10px] font-semibold text-[#1A1918] tabular-nums">
                From ₹{cat.startingPrice}
              </span>
            </div>

            {/* Card Content */}
            <div className="relative p-3.5 text-white z-10">
              {cat.hindiName && (
                <span className="text-[10px] text-[#DFC48B] tracking-wide block mb-0.5">
                  {cat.hindiName}
                </span>
              )}
              <h3 className="font-serif text-base font-semibold text-white leading-tight">
                {cat.name}
              </h3>
              <div className="flex items-center justify-between text-[11px] text-stone-200 mt-1">
                <span>{cat.itemCount} Designs</span>
                <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1 transition-transform text-[#DFC48B]">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Concierge Custom Design Banner */}
      <div className="mt-6 p-4 rounded-xl bg-white border border-[#E8DED9] flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FEF8F6] border border-[#DFC48B] flex items-center justify-center text-[#C5A059] shrink-0">
            <span className="material-symbols-outlined text-[20px]">diamond</span>
          </div>
          <div>
            <h4 className="font-serif text-xs font-semibold text-[#1A1918]">
              Looking for bespoke bridal styling?
            </h4>
            <p className="text-[10px] text-[#8C8782]">
              Connect with our master jewellery stylists via WhatsApp.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('support')}
          className="text-xs font-semibold text-[#C5A059] hover:text-[#B38E47] shrink-0"
        >
          Consult
        </button>
      </div>
    </div>
  );
};
