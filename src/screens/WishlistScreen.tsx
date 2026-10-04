import React from 'react';
import { ScreenId, Product } from '../types.ts';
import { MOCK_PRODUCTS } from '../data/mockData.ts';

interface WishlistScreenProps {
  onNavigate: (screen: ScreenId) => void;
  wishlistIds: string[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToBag: (product: Product) => void;
  onMoveAllToBag: (products: Product[]) => void;
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({
  onNavigate,
  wishlistIds,
  onRemoveFromWishlist,
  onMoveToBag,
  onMoveAllToBag,
}) => {
  // Use wishlisted products, or default to first 4 mock products for showcase if empty
  const savedProducts =
    wishlistIds.length > 0
      ? MOCK_PRODUCTS.filter((p) => wishlistIds.includes(p.id))
      : MOCK_PRODUCTS.slice(0, 4);

  const totalWishlistValue = savedProducts.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="pb-28 px-4 pt-3 bg-[#FEF8F6] text-[#1A1918]">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block mb-0.5">
            Personal Atelier Vault
          </span>
          <h2 className="font-serif text-2xl font-semibold text-[#1A1918]">
            Wishlist Hub
          </h2>
        </div>
        <span className="text-xs text-[#8C8782] tabular-nums">
          {savedProducts.length} Jewels Saved
        </span>
      </div>

      {savedProducts.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-[#E8DED9] my-6">
          <span className="material-symbols-outlined text-4xl text-[#C5A059] mb-2">favorite</span>
          <h3 className="font-serif text-base font-semibold text-[#1A1918]">Your vault is empty</h3>
          <p className="text-xs text-[#8C8782] mt-1 mb-4">
            Save pieces you love to track price drops and restock alerts.
          </p>
          <button
            onClick={() => onNavigate('plp')}
            className="px-5 py-2.5 rounded-full bg-[#1A1918] text-white text-xs font-semibold hover:bg-[#C5A059]"
          >
            Explore Masterpieces
          </button>
        </div>
      ) : (
        <>
          {/* 4-Card Grid */}
          <div className="grid grid-cols-2 gap-3.5 mb-6">
            {savedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-[#E8DED9] overflow-hidden shadow-2xs flex flex-col justify-between group"
              >
                {/* Image & Badges */}
                <div className="relative aspect-square w-full bg-[#F8F2F0]">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />

                  <span className="absolute top-2 left-2 bg-[#1A1918] text-[#DFC48B] text-[9px] font-bold px-1.5 py-0.5 rounded-xs">
                    {product.discountPercent}% OFF
                  </span>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveFromWishlist(product.id)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 text-[#8C8782] hover:text-rose-600 flex items-center justify-center shadow-xs"
                    title="Remove from Wishlist"
                  >
                    <span className="material-symbols-outlined text-[15px]">close</span>
                  </button>
                </div>

                {/* Details */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#8C8782] block">{product.category}</span>
                    <h4 className="font-serif text-xs font-semibold text-[#1A1918] line-clamp-1 mt-0.5">
                      {product.name}
                    </h4>
                    <div className="flex items-baseline gap-1.5 mt-1.5">
                      <span className="text-xs font-bold text-[#1A1918] tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-[#8C8782] line-through tabular-nums">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Move to Bag Action */}
                  <button
                    onClick={() => onMoveToBag(product)}
                    className="mt-3 w-full py-1.5 px-2 rounded-lg bg-[#FEF8F6] border border-[#DFC48B] text-[#C5A059] hover:bg-[#C5A059] hover:text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[14px]">shopping_bag</span>
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Move All to Bag Bar */}
          <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto z-40 bg-white/95 backdrop-blur-md border-t border-[#E8DED9] p-3 shadow-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#8C8782] block">Total Vault Value</span>
              <span className="font-serif text-base font-bold text-[#1A1918] tabular-nums">
                ₹{totalWishlistValue.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={() => onMoveAllToBag(savedProducts)}
              className="py-2.5 px-5 rounded-full bg-[#1A1918] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#C5A059] active:scale-95 transition-all shadow-md flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
              <span>Move All to Bag ({savedProducts.length})</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
