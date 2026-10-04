import React, { useState } from 'react';
import { ScreenId, Product } from '../types.ts';
import { MOCK_PRODUCTS } from '../data/mockData.ts';

interface ProductDetailScreenProps {
  product: Product;
  onNavigate: (screen: ScreenId) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onBuyNow: (product: Product) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onNavigate,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onBuyNow,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [pincode, setPincode] = useState('400018');
  const [pincodeChecked, setPincodeChecked] = useState(true);
  const [isPincodeValid, setIsPincodeValid] = useState(true);
  const [openSpec, setOpenSpec] = useState<'details' | 'care' | 'shipping' | null>('details');
  const [bundleChecked, setBundleChecked] = useState(true);

  // Fallback gallery images if none defined
  const gallery =
    product.galleryImages && product.galleryImages.length > 0
      ? product.galleryImages
      : [product.image];

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeChecked(true);
      setIsPincodeValid(true);
    } else {
      setIsPincodeValid(false);
    }
  };

  const matchingChoker = MOCK_PRODUCTS[1]; // Royal Heritage Choker
  const bundleTotalPrice = product.price + (bundleChecked ? matchingChoker.price - 300 : 0);

  return (
    <div className="pb-28 bg-[#FEF8F6] text-[#1A1918]">
      {/* Top Gallery Showcase */}
      <div className="relative w-full aspect-square bg-[#F8F2F0] overflow-hidden">
        <img
          src={gallery[activeImageIndex]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="bg-[#1A1918] text-[#DFC48B] text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-xs">
            {product.discountPercent}% OFF
          </span>
          <span className="bg-white/95 backdrop-blur-md text-[#1A1918] text-[10px] font-semibold px-2 py-0.5 rounded-sm border border-[#E8DED9] shadow-xs">
            18K Micro-Gold
          </span>
        </div>

        {/* Wishlist Toggle Button */}
        <button
          onClick={() => onToggleWishlist(product)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1A1918] shadow-md active:scale-90 transition-transform z-10"
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              isWishlisted ? 'text-rose-600 fill' : 'text-[#8C8782]'
            }`}
          >
            favorite
          </span>
        </button>

        {/* Bottom Thumbnail Selector Bar */}
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 z-10">
          {gallery.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`w-11 h-11 rounded-lg overflow-hidden border-2 bg-white transition-all shadow-xs ${
                activeImageIndex === idx
                  ? 'border-[#C5A059] scale-105'
                  : 'border-white/80 opacity-70'
              }`}
            >
              <img
                src={img}
                alt={`angle ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Information Container */}
      <div className="p-4 space-y-4">
        {/* Title, Category & Ratings */}
        <div>
          <div className="flex items-center justify-between text-xs text-[#8C8782] mb-1">
            <span className="uppercase tracking-widest text-[10px] font-bold text-[#C5A059]">
              {product.category} · Atelier Signature
            </span>
            <div className="flex items-center text-amber-500">
              <span className="material-symbols-outlined text-[14px] fill">star</span>
              <span className="font-semibold text-[#1A1918] ml-0.5">{product.rating}</span>
              <span className="text-[#8C8782] text-[10px] ml-1">
                ({product.ratingCount} reviews)
              </span>
            </div>
          </div>

          <h1 className="font-serif text-xl font-semibold text-[#1A1918] leading-snug">
            {product.name}
          </h1>
          <p className="text-xs text-[#8C8782] mt-0.5">{product.subtitle}</p>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2.5 mt-3">
            <span className="font-serif text-2xl font-bold text-[#1A1918] tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-[#8C8782] line-through tabular-nums">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
              Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} (
              {product.discountPercent}%)
            </span>
          </div>
          <span className="text-[10px] text-[#8C8782] block mt-0.5">
            Inclusive of all GST taxes · Free Express Shipping
          </span>
        </div>

        {/* Hallmark Certifications Badges */}
        <div className="p-3 rounded-xl bg-white border border-[#E8DED9] space-y-2 shadow-2xs">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C8782] block">
            Atelier Quality Hallmarks
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {product.certifications.map((cert, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#1A1918]">
                <span className="material-symbols-outlined text-[#C5A059] text-[16px] fill">
                  verified
                </span>
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Delivery Pincode Checker */}
        <div className="p-3.5 rounded-xl bg-white border border-[#E8DED9] shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#1A1918] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#C5A059] text-[18px]">
                local_shipping
              </span>
              <span>Check Delivery Pincode</span>
            </span>
          </div>

          <form onSubmit={handleCheckPincode} className="flex gap-2">
            <input
              type="text"
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 6-digit Pincode"
              className="flex-1 px-3 py-2 text-xs rounded-lg border border-[#E8DED9] outline-hidden focus:border-[#C5A059]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#1A1918] text-white text-xs font-semibold rounded-lg hover:bg-[#C5A059] transition-colors"
            >
              Verify
            </button>
          </form>

          {pincodeChecked && isPincodeValid && (
            <div className="mt-2 text-[11px] text-emerald-700 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              <span>
                Delivering to <strong>{pincode} (Mumbai)</strong> by{' '}
                <strong>Tomorrow, 7:00 PM</strong> via BlueDart Express
              </span>
            </div>
          )}
        </div>

        {/* "Complete the Look" Bundle Cross-Sell */}
        <div className="p-3.5 rounded-xl bg-[#F8F2F0] border border-[#DFC48B] shadow-2xs">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#C5A059]">
              Complete The Look Bundle
            </span>
            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-sm">
              Bundle Extra ₹300 OFF
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Jhumka */}
            <div className="w-14 h-14 rounded-lg overflow-hidden border border-[#E8DED9] bg-white shrink-0">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[#C5A059] font-bold text-base">+</span>
            {/* Choker */}
            <div className="w-14 h-14 rounded-lg overflow-hidden border border-[#E8DED9] bg-white shrink-0">
              <img
                src={matchingChoker.image}
                alt={matchingChoker.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-serif text-xs font-semibold text-[#1A1918] truncate">
                {matchingChoker.name}
              </h4>
              <div className="text-[11px] text-[#8C8782]">
                Bundle Price:{' '}
                <strong className="text-[#1A1918] tabular-nums">
                  ₹{bundleTotalPrice.toLocaleString('en-IN')}
                </strong>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#E8DED9]">
            <label className="flex items-center gap-2 text-xs text-[#1A1918] cursor-pointer">
              <input
                type="checkbox"
                checked={bundleChecked}
                onChange={(e) => setBundleChecked(e.target.checked)}
                className="accent-[#C5A059] w-4 h-4 rounded"
              />
              <span>Add Royal Choker set with matching jhumkas</span>
            </label>
          </div>
        </div>

        {/* Specifications & Care Accordions */}
        <div className="rounded-xl border border-[#E8DED9] bg-white divide-y divide-[#E8DED9] shadow-2xs overflow-hidden">
          {/* Item Details */}
          <div>
            <button
              onClick={() => setOpenSpec(openSpec === 'details' ? null : 'details')}
              className="w-full px-3.5 py-3 flex items-center justify-between text-xs font-semibold text-[#1A1918] hover:bg-[#FEF8F6]"
            >
              <span>Artisan Specifications</span>
              <span className="material-symbols-outlined text-[18px]">
                {openSpec === 'details' ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {openSpec === 'details' && (
              <div className="px-3.5 pb-3 text-xs text-[#8C8782] space-y-1.5 pt-1">
                <p className="text-[#1A1918] leading-relaxed">{product.description}</p>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8DED9]/60 text-[11px]">
                  <div>
                    <span className="text-[#8C8782] block">Base Metal</span>
                    <strong className="text-[#1A1918]">{product.metal}</strong>
                  </div>
                  <div>
                    <span className="text-[#8C8782] block">Gold Plating</span>
                    <strong className="text-[#1A1918]">{product.plating}</strong>
                  </div>
                  <div>
                    <span className="text-[#8C8782] block">Stone Details</span>
                    <strong className="text-[#1A1918]">{product.stone}</strong>
                  </div>
                  <div>
                    <span className="text-[#8C8782] block">Net Weight</span>
                    <strong className="text-[#1A1918]">{product.weight}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Jewellery Care */}
          <div>
            <button
              onClick={() => setOpenSpec(openSpec === 'care' ? null : 'care')}
              className="w-full px-3.5 py-3 flex items-center justify-between text-xs font-semibold text-[#1A1918] hover:bg-[#FEF8F6]"
            >
              <span>Care & Longevity Guide</span>
              <span className="material-symbols-outlined text-[18px]">
                {openSpec === 'care' ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {openSpec === 'care' && (
              <div className="px-3.5 pb-3 text-xs text-[#8C8782] space-y-1 pt-1 leading-relaxed">
                <p>• Avoid direct contact with heavy perfumes, chlorine, and hair sprays.</p>
                <p>• Store in the provided DL velvet gift pouch away from dampness.</p>
                <p>• Clean gently using a dry micro-fibre cloth after each wear.</p>
              </div>
            )}
          </div>
        </div>

        {/* Verified Customer Reviews */}
        <div className="p-4 rounded-xl bg-white border border-[#E8DED9] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-sm font-semibold text-[#1A1918]">
              Customer Reviews ({product.ratingCount})
            </h3>
            <span className="text-xs font-semibold text-[#C5A059]">4.9 out of 5</span>
          </div>

          <div className="border-t border-[#E8DED9]/60 pt-3 space-y-3">
            <div className="text-xs space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-[#1A1918]">Ananya S. · Mumbai</strong>
                <span className="text-[10px] text-emerald-700 flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[12px] fill">verified</span>
                  Verified Purchase
                </span>
              </div>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[13px] fill">
                    star
                  </span>
                ))}
              </div>
              <p className="text-[#8C8782] leading-relaxed">
                "Wore these for my cousin's Sangeet in Udaipur. Everyone assumed these were pure gold Kundan from Tanishq! Featherlight on the earlobes, absolutely no stretching or redness."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Dual-Action Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto z-40 bg-white/95 backdrop-blur-md border-t border-[#E8DED9] p-3 shadow-xl flex items-center gap-2.5">
        <button
          onClick={() => onAddToCart(product)}
          className="flex-1 py-3 px-4 rounded-full border border-[#1A1918] text-[#1A1918] text-xs font-semibold tracking-wider uppercase hover:bg-[#F8F2F0] active:scale-95 transition-all flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
          <span>Add to Bag</span>
        </button>

        <button
          onClick={() => onBuyNow(product)}
          className="flex-1 py-3 px-4 rounded-full bg-[#1A1918] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#C5A059] active:scale-95 transition-all shadow-md flex items-center justify-center gap-1.5"
        >
          <span>Buy Now</span>
          <span className="material-symbols-outlined text-[18px]">bolt</span>
        </button>
      </div>
    </div>
  );
};
