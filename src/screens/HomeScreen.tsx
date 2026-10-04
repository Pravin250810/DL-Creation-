import React from 'react';
import { ScreenId, Product } from '../types.ts';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, ASSET_IMAGES } from '../data/mockData.ts';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onAddToCart: (product: Product) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onSelectProduct,
  onToggleWishlist,
  wishlistIds,
  onAddToCart,
}) => {
  return (
    <div className="pb-24 bg-[#FEF8F6] text-[#1A1918]">
      {/* Luxury Hero Banner */}
      <div className="relative w-full aspect-[4/3] bg-[#1A1817] overflow-hidden">
        <img
          src={ASSET_IMAGES.hero}
          alt="Royal Polki & Kundan Atelier Edit"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-90 scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Soft elegant gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918]/90 via-[#1A1918]/30 to-transparent" />

        {/* Content Box */}
        <div className="absolute bottom-5 left-5 right-5 text-white">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-[10px] uppercase tracking-widest text-[#DFC48B] mb-2 font-medium">
            <span>Festive Haute Joaillerie</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-normal leading-tight text-white mb-1.5">
            The Royal Rajputana Edit
          </h2>
          <p className="text-xs text-stone-200/90 line-clamp-2 mb-3.5 font-light">
            Hand-faceted polki chokers and heirloom kundan earrings dipped in 18K micro-gold.
          </p>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onNavigate('plp')}
              className="px-5 py-2.5 rounded-full bg-[#C5A059] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#B38E47] active:scale-95 transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Shop Now</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="px-4 py-2.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium hover:bg-white/30 active:scale-95 transition-all"
            >
              Our Karigari
            </button>
          </div>
        </div>
      </div>

      {/* Quick Atelier Guarantees Bar */}
      <div className="bg-white border-b border-[#E8DED9] px-4 py-2.5 flex items-center justify-between text-[11px] text-[#8C8782] overflow-x-auto no-scrollbar gap-4">
        <div className="flex items-center gap-1 shrink-0">
          <span className="material-symbols-outlined text-[#C5A059] text-[16px]">verified</span>
          <span>18K Micro Gold</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="material-symbols-outlined text-[#C5A059] text-[16px]">shield_check</span>
          <span>Anti-Tarnish Seal</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="material-symbols-outlined text-[#C5A059] text-[16px]">local_shipping</span>
          <span>Free Express Delivery</span>
        </div>
      </div>

      {/* Travelling Salesman Field Shortcuts */}
      <div className="mx-4 mt-3 p-2.5 rounded-xl bg-gradient-to-r from-[#1A1817] to-[#2C2724] text-white flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#C5A059] text-white flex items-center justify-center text-[10px] font-bold">
            B2B
          </span>
          <div>
            <strong className="text-xs text-white block leading-tight">
              Salesman Retail Counter Mode
            </strong>
            <span className="text-[10px] text-[#DFC48B]">
              Field store visits & travel kit
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onNavigate('wholesale-order')}
            className="px-2.5 py-1 bg-[#C5A059] hover:bg-[#B38E47] text-white text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[13px]">storefront</span>
            <span>Order</span>
          </button>
          <button
            onClick={() => onNavigate('travel-stock')}
            className="px-2.5 py-1 bg-white/15 hover:bg-white/25 text-white text-[10px] font-semibold rounded-lg transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[13px]">luggage</span>
            <span>Stock</span>
          </button>
        </div>
      </div>

      {/* Quick Category Circles */}
      <div className="pt-6 px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif text-lg font-semibold text-[#1A1918]">
            Curated Categories
          </h3>
          <button
            onClick={() => onNavigate('categories')}
            className="text-xs font-semibold text-[#C5A059] hover:text-[#B38E47] flex items-center gap-0.5"
          >
            <span>View All</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        <div className="flex items-center gap-3.5 overflow-x-auto no-scrollbar pb-2">
          {MOCK_CATEGORIES.slice(0, 6).map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                if (cat.id === 'earrings') {
                  onNavigate('plp');
                } else {
                  onNavigate('categories');
                }
              }}
              className="flex flex-col items-center shrink-0 cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-full p-0.5 border border-[#DFC48B] group-hover:border-[#C5A059] transition-all bg-white shadow-2xs overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-[11px] font-medium text-[#1A1918] mt-1.5 text-center truncate w-16">
                {cat.name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Festive Moodboard Spotlights */}
      <div className="px-4 pt-6 space-y-3">
        <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#E8DED9] bg-[#1A1817] p-5 text-white">
          <div className="relative z-10 max-w-[240px]">
            <span className="text-[10px] font-semibold text-[#DFC48B] uppercase tracking-widest block mb-1">
              Curated Moodboard
            </span>
            <h4 className="font-serif text-xl font-semibold leading-snug mb-1">
              The Daily Demi-Fine Edit
            </h4>
            <p className="text-xs text-stone-300 line-clamp-2 mb-3">
              Featherlight moissanite bands, tennis bracelets & minimal mangalsutras for everyday wear.
            </p>
            <button
              onClick={() => onNavigate('plp')}
              className="text-xs font-semibold text-[#C5A059] bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors inline-flex items-center gap-1"
            >
              <span>Explore Edit</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
          <div className="absolute right-0 bottom-0 top-0 w-36 overflow-hidden opacity-60">
            <img
              src={ASSET_IMAGES.rings}
              alt="Demi-Fine Rings"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Trending Masterpieces (2-Column Grid) */}
      <div className="pt-6 px-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#1A1918]">
              Trending Masterpieces
            </h3>
            <p className="text-[11px] text-[#8C8782]">Most coveted jewels this festive season</p>
          </div>
          <button
            onClick={() => onNavigate('plp')}
            className="text-xs font-semibold text-[#C5A059] hover:text-[#B38E47]"
          >
            See All
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {MOCK_PRODUCTS.slice(0, 4).map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-[#E8DED9] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                {/* Image Container */}
                <div
                  onClick={() => {
                    onSelectProduct(product);
                    onNavigate('pdp');
                  }}
                  className="relative aspect-square w-full bg-[#F8F2F0] cursor-pointer overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Discount Badge */}
                  <span className="absolute top-2 left-2 bg-[#1A1918] text-[#DFC48B] text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                    {product.discountPercent}% OFF
                  </span>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#1A1918] hover:scale-110 active:scale-95 transition-all shadow-2xs"
                  >
                    <span
                      className={`material-symbols-outlined text-[17px] ${
                        isWishlisted ? 'text-rose-600 fill' : 'text-[#8C8782]'
                      }`}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                {/* Details Container */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div
                    onClick={() => {
                      onSelectProduct(product);
                      onNavigate('pdp');
                    }}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-1 text-[10px] text-[#8C8782] mb-1">
                      <span>{product.category}</span>
                      <span>·</span>
                      <div className="flex items-center text-amber-500">
                        <span className="material-symbols-outlined text-[12px] fill">star</span>
                        <span className="font-semibold text-[#1A1918] ml-0.5">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                    <h4 className="font-serif text-xs font-semibold text-[#1A1918] line-clamp-1 group-hover:text-[#C5A059] transition-colors">
                      {product.name}
                    </h4>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#E8DED9]/60 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-semibold text-sm text-[#1A1918] tabular-nums">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-[#8C8782] line-through tabular-nums">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="w-7 h-7 rounded-lg bg-[#FEF8F6] border border-[#DFC48B] text-[#C5A059] flex items-center justify-center hover:bg-[#C5A059] hover:text-white transition-colors active:scale-90"
                      title="Add to Bag"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Atelier Karigar Heritage Callout */}
      <div className="mt-8 mx-4 p-5 rounded-2xl bg-gradient-to-br from-[#F8F2F0] to-[#FEF8F6] border border-[#E8DED9] text-center">
        <span className="w-8 h-8 rounded-full border border-[#C5A059] mx-auto flex items-center justify-center text-xs font-serif text-[#C5A059] font-bold mb-2 bg-white">
          DL
        </span>
        <h4 className="font-serif text-lg font-semibold text-[#1A1918] mb-1">
          L'Atelier Promise
        </h4>
        <p className="text-xs text-[#8C8782] leading-relaxed max-w-xs mx-auto mb-3">
          Every piece is triple-micron plated in 18K gold and inspected individually for flawless handset stones and lifetime anti-tarnish radiance.
        </p>
        <button
          onClick={() => onNavigate('about')}
          className="text-xs font-semibold text-[#C5A059] underline underline-offset-4 hover:text-[#B38E47]"
        >
          Discover Our Story & Artisans
        </button>
      </div>
    </div>
  );
};
