import React, { useState, useMemo } from 'react';
import { ScreenId, Product } from '../types.ts';
import { MOCK_PRODUCTS } from '../data/mockData.ts';

interface SearchScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  onNavigate,
  onSelectProduct,
  onAddToCart,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    'Kundan Jhumka',
    'Polki Choker Set',
    'Moissanite Ring',
    'Temple Bangles',
  ]);

  const trendingPills = [
    'Kundan Earrings',
    'Bridal Chokers',
    'Moissanite Bands',
    'Anti-Tarnish Sets',
    'Daily Mangalsutras',
  ];

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.stone.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleDismissRecent = (itemToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches((prev) => prev.filter((item) => item !== itemToRemove));
  };

  const handleVoiceSearchSimulate = () => {
    setIsVoiceActive(true);
    setTimeout(() => {
      setSearchQuery('Kundan Jhumka');
      setIsVoiceActive(false);
    }, 1800);
  };

  return (
    <div className="pb-24 px-4 pt-3 bg-[#FEF8F6] text-[#1A1918]">
      {/* Search Bar Input */}
      <div className="relative mb-4">
        <div className="flex items-center rounded-2xl bg-white border border-[#E8DED9] px-3.5 py-2.5 shadow-2xs focus-within:border-[#C5A059] focus-within:ring-1 focus-within:ring-[#C5A059] transition-all">
          <span className="material-symbols-outlined text-[#8C8782] text-[20px] mr-2">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search jewels, kundan, polki, rings..."
            className="w-full bg-transparent text-xs text-[#1A1918] outline-hidden placeholder:text-[#8C8782] font-medium"
            autoFocus
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#8C8782] hover:text-[#1A1918] p-1"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          ) : (
            <button
              onClick={handleVoiceSearchSimulate}
              className="text-[#C5A059] hover:text-[#B38E47] p-1 flex items-center"
              title="Voice Search"
            >
              <span className="material-symbols-outlined text-[20px]">mic</span>
            </button>
          )}
        </div>
      </div>

      {/* Voice Listening Modal Overlay */}
      {isVoiceActive && (
        <div className="p-4 mb-4 rounded-2xl bg-[#1A1817] text-white border border-[#C5A059] flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C5A059] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[18px]">mic</span>
            </div>
            <div>
              <div className="text-xs font-semibold">Atelier Voice Search Active</div>
              <div className="text-[11px] text-stone-300">Listening: "Kundan Jhumka"...</div>
            </div>
          </div>
          <span className="text-[10px] text-[#DFC48B] uppercase tracking-wider">Listening</span>
        </div>
      )}

      {/* Results View when typing */}
      {searchQuery.trim() !== '' ? (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#1A1918]">
              Search Results ({searchResults.length})
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-[#C5A059] hover:underline"
            >
              Clear
            </button>
          </div>

          {searchResults.length > 0 ? (
            <div className="space-y-2.5">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onNavigate('pdp');
                  }}
                  className="p-2.5 rounded-xl bg-white border border-[#E8DED9] flex items-center gap-3 cursor-pointer hover:shadow-2xs transition-all"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover rounded-lg bg-[#F8F2F0] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-[#8C8782] block">{product.category}</span>
                    <h4 className="font-serif text-xs font-semibold text-[#1A1918] truncate">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs font-bold text-[#1A1918] tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-[#8C8782] line-through tabular-nums">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="w-7 h-7 rounded-lg bg-[#FEF8F6] border border-[#DFC48B] text-[#C5A059] flex items-center justify-center shrink-0 hover:bg-[#C5A059] hover:text-white"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#E8DED9]">
              <span className="material-symbols-outlined text-[#8C8782] text-3xl mb-2">
                sentiment_dissatisfied
              </span>
              <p className="text-xs text-[#1A1918] font-semibold">No direct match found</p>
              <p className="text-[11px] text-[#8C8782] mt-0.5">
                Try searching for 'Kundan', 'Choker', or 'Ring'
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Recent Search Chips */}
          {recentSearches.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#1A1918]">Recent Searches</span>
                <button
                  onClick={() => setRecentSearches([])}
                  className="text-[11px] text-[#8C8782] hover:text-[#1A1918]"
                >
                  Clear All
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {recentSearches.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSearchQuery(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E8DED9] text-xs text-[#1A1918] hover:bg-[#F8F2F0] cursor-pointer shadow-2xs group"
                  >
                    <span className="material-symbols-outlined text-[14px] text-[#8C8782]">
                      history
                    </span>
                    <span>{item}</span>
                    <button
                      onClick={(e) => handleDismissRecent(item, e)}
                      className="text-[#8C8782] hover:text-[#1A1918] ml-0.5"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches Pills */}
          <div>
            <span className="text-xs font-semibold text-[#1A1918] block mb-2">
              Trending Atelier Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {trendingPills.map((trend, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(trend)}
                  className="px-3 py-1.5 rounded-full bg-white border border-[#E8DED9] text-xs font-medium text-[#1A1918] hover:border-[#C5A059] hover:text-[#C5A059] transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#C5A059]">
                    trending_up
                  </span>
                  <span>{trend}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Occasion Moodboard Cards */}
          <div>
            <span className="text-xs font-semibold text-[#1A1918] block mb-2.5">
              Shop by Occasion Moodboards
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => setSearchQuery('Wedding')}
                className="p-3.5 rounded-xl bg-gradient-to-br from-[#1A1817] to-[#322E2B] text-white cursor-pointer hover:shadow-md transition-all relative overflow-hidden"
              >
                <span className="text-[10px] text-[#DFC48B] font-semibold uppercase tracking-wider block mb-1">
                  Festive Gala
                </span>
                <h4 className="font-serif text-sm font-semibold mb-0.5">Wedding Gala</h4>
                <p className="text-[10px] text-stone-300">Heirloom Kundan & Polki sets</p>
              </div>

              <div
                onClick={() => setSearchQuery('Ring')}
                className="p-3.5 rounded-xl bg-gradient-to-br from-[#F8F2F0] to-[#FEF8F6] border border-[#DFC48B] text-[#1A1918] cursor-pointer hover:shadow-md transition-all relative overflow-hidden"
              >
                <span className="text-[10px] text-[#C5A059] font-semibold uppercase tracking-wider block mb-1">
                  Daily Demi-Fine
                </span>
                <h4 className="font-serif text-sm font-semibold mb-0.5">Modern Office</h4>
                <p className="text-[10px] text-[#8C8782]">Moissanite bands & tennis jewels</p>
              </div>
            </div>
          </div>

          {/* Quick-Add Bestsellers */}
          <div>
            <span className="text-xs font-semibold text-[#1A1918] block mb-2.5">
              Atelier Bestsellers
            </span>
            <div className="space-y-2">
              {MOCK_PRODUCTS.slice(0, 2).map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onNavigate('pdp');
                  }}
                  className="p-2.5 rounded-xl bg-white border border-[#E8DED9] flex items-center justify-between cursor-pointer hover:border-[#C5A059] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-cover rounded-lg bg-[#F8F2F0]"
                    />
                    <div>
                      <h4 className="font-serif text-xs font-semibold text-[#1A1918]">{p.name}</h4>
                      <span className="text-xs font-bold text-[#1A1918] tabular-nums">
                        ₹{p.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(p);
                    }}
                    className="px-3 py-1 rounded-full bg-[#1A1918] text-white text-[11px] font-semibold hover:bg-[#C5A059]"
                  >
                    Quick Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
