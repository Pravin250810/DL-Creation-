import React, { useState, useMemo } from 'react';
import { ScreenId, Product } from '../types.ts';
import { MOCK_PRODUCTS } from '../data/mockData.ts';

interface ProductListingScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onAddToCart: (product: Product) => void;
}

export const ProductListingScreen: React.FC<ProductListingScreenProps> = ({
  onNavigate,
  onSelectProduct,
  onToggleWishlist,
  wishlistIds,
  onAddToCart,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');

  const filterOptions = ['All', 'Under ₹499', 'Kundan', '18K Gold Plated', 'Bestsellers'];

  const filteredProducts = useMemo(() => {
    let list = [...MOCK_PRODUCTS];

    // Apply Filter
    if (selectedFilter === 'Under ₹499') {
      list = list.filter((p) => p.price <= 499);
    } else if (selectedFilter === 'Kundan') {
      list = list.filter((p) => p.name.includes('Kundan') || p.stone.includes('Kundan'));
    } else if (selectedFilter === '18K Gold Plated') {
      list = list.filter((p) => p.plating.includes('18K'));
    } else if (selectedFilter === 'Bestsellers') {
      list = list.filter((p) => p.isBestseller);
    }

    // Apply Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedFilter, sortBy]);

  return (
    <div className="pb-24 px-4 pt-3 bg-[#FEF8F6] text-[#1A1918]">
      {/* Breadcrumb & Collection Header */}
      <div className="mb-3">
        <div className="flex items-center gap-1.5 text-[11px] text-[#8C8782] mb-1">
          <span onClick={() => onNavigate('home')} className="hover:text-[#1A1918] cursor-pointer">
            Atelier
          </span>
          <span>/</span>
          <span
            onClick={() => onNavigate('categories')}
            className="hover:text-[#1A1918] cursor-pointer"
          >
            Collections
          </span>
          <span>/</span>
          <span className="text-[#1A1918] font-medium">Earrings & Jhumkas</span>
        </div>

        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-2xl font-semibold text-[#1A1918]">
            Earrings Collection
          </h2>
          <span className="text-xs text-[#8C8782] tabular-nums">
            {filteredProducts.length} Designs
          </span>
        </div>
      </div>

      {/* Interactive Filter Chips (Horizontal Scroll) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 mb-3">
        {filterOptions.map((filter) => {
          const isSelected = selectedFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all active:scale-95 ${
                isSelected
                  ? 'bg-[#1A1918] text-white shadow-xs'
                  : 'bg-white border border-[#E8DED9] text-[#1A1918] hover:bg-[#F8F2F0]'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Sort & Quick Filter Bar */}
      <div className="flex items-center justify-between py-2 border-y border-[#E8DED9] mb-4 text-xs text-[#8C8782]">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[17px] text-[#C5A059]">sort</span>
          <label htmlFor="sort-select" className="font-medium text-[#1A1918]">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent font-medium text-[#1A1918] outline-hidden cursor-pointer"
          >
            <option value="featured">Featured Atelier</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Customer Rated</option>
          </select>
        </div>

        <span className="text-[11px] text-[#8C8782]">18K Micro-Gold</span>
      </div>

      {/* Atelier Concierge Advice Banner */}
      <div className="mb-4 p-3 rounded-xl bg-[#F8F2F0] border border-[#DFC48B] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[#C5A059] text-[20px]">
            stylus_note
          </span>
          <div className="text-[11px]">
            <strong className="text-[#1A1918] font-semibold block">
              Atelier Stylist Advice
            </strong>
            <span className="text-[#8C8782]">
              Need help pairing earrings with your outfit?
            </span>
          </div>
        </div>
        <button
          onClick={() => onNavigate('support')}
          className="text-[11px] font-semibold text-[#C5A059] hover:underline"
        >
          Ask Stylist
        </button>
      </div>

      {/* 2-Column Responsive Product Cards Grid */}
      <div className="grid grid-cols-2 gap-3.5">
        {filteredProducts.map((product) => {
          const isWishlisted = wishlistIds.includes(product.id);
          return (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-[#E8DED9] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Product Thumbnail */}
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

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.discountPercent > 0 && (
                    <span className="bg-[#1A1918] text-[#DFC48B] text-[9px] font-bold px-1.5 py-0.5 rounded-xs">
                      {product.discountPercent}% OFF
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="bg-[#C5A059] text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-xs">
                      BESTSELLER
                    </span>
                  )}
                </div>

                {/* Wishlist Heart */}
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

              {/* Card Body */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div
                  onClick={() => {
                    onSelectProduct(product);
                    onNavigate('pdp');
                  }}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-1 text-[10px] text-[#8C8782] mb-1">
                    <span>{product.plating.split(' ')[0]}</span>
                    <span>·</span>
                    <div className="flex items-center text-amber-500">
                      <span className="material-symbols-outlined text-[12px] fill">star</span>
                      <span className="font-semibold text-[#1A1918] ml-0.5">
                        {product.rating}
                      </span>
                      <span className="text-[#8C8782] text-[9px]">({product.ratingCount})</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xs font-semibold text-[#1A1918] line-clamp-1 group-hover:text-[#C5A059] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-[#8C8782] line-clamp-1 mt-0.5">
                    {product.subtitle}
                  </p>
                </div>

                {/* Price & Add to Bag */}
                <div className="mt-2.5 pt-2 border-t border-[#E8DED9]/60 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-semibold text-sm text-[#1A1918] tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-[#8C8782] line-through tabular-nums">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-7 h-7 rounded-lg bg-[#1A1918] text-white flex items-center justify-center hover:bg-[#C5A059] transition-colors active:scale-90"
                    title="Add to Bag"
                  >
                    <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
