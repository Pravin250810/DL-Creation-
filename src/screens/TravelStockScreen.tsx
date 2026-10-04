import React, { useState } from 'react';
import { ScreenId, TravelStockItem } from '../types.ts';

interface TravelStockScreenProps {
  onNavigate: (screen: ScreenId) => void;
  travelStock: TravelStockItem[];
  onUpdateStock: (itemId: string, newCarried: number, newSold: number) => void;
  onQuickSpotSale: (itemId: string, qtySold: number) => void;
  onRequestRefill: (itemId: string, qty: number) => void;
}

export const TravelStockScreen: React.FC<TravelStockScreenProps> = ({
  onNavigate,
  travelStock,
  onUpdateStock,
  onQuickSpotSale,
  onRequestRefill,
}) => {
  const [selectedCity, setSelectedCity] = useState('Ahmedabad (Ratanpole)');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [spotSaleModalItem, setSpotSaleModalItem] = useState<TravelStockItem | null>(null);
  const [spotSaleQty, setSpotSaleQty] = useState(2);
  const [refillModalItem, setRefillModalItem] = useState<TravelStockItem | null>(null);
  const [refillQty, setRefillQty] = useState(20);

  const cities = [
    'Ahmedabad (Ratanpole)',
    'Surat (Chauta Bazaar)',
    'Jaipur (Johari Bazaar)',
    'Rajkot (Soni Bazaar)',
    'Indore (Sarafa Bazaar)',
  ];

  const categories = ['All', 'Earrings', 'Jewellery Sets', 'Bangles & Kadas', 'Rings', 'Mangalsutras', 'Bracelets', 'Hair Adornments'];

  // Aggregates
  const totalCarried = travelStock.reduce((acc, curr) => acc + curr.carriedQty, 0);
  const totalSold = travelStock.reduce((acc, curr) => acc + curr.soldQty, 0);
  const totalRemaining = travelStock.reduce((acc, curr) => acc + (curr.carriedQty - curr.soldQty), 0);
  const totalKitValueRemaining = travelStock.reduce(
    (acc, curr) => acc + (curr.carriedQty - curr.soldQty) * curr.wholesaleRate,
    0
  );
  const totalRevenueCollected = travelStock.reduce(
    (acc, curr) => acc + curr.soldQty * curr.wholesaleRate,
    0
  );

  const filteredStock = travelStock.filter((item) => {
    const matchCat = filterCategory === 'All' || item.category === filterCategory;
    const matchSearch =
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.boxNumber && item.boxNumber.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleConfirmSpotSale = () => {
    if (spotSaleModalItem) {
      onQuickSpotSale(spotSaleModalItem.id, spotSaleQty);
      setSpotSaleModalItem(null);
    }
  };

  const handleConfirmRefill = () => {
    if (refillModalItem) {
      onRequestRefill(refillModalItem.id, refillQty);
      setRefillModalItem(null);
    }
  };

  return (
    <div className="pb-28 px-4 pt-3 bg-[#FEF8F6] text-[#1A1918]">
      {/* Tour & City Header */}
      <div className="p-4 bg-gradient-to-br from-[#1A1817] via-[#2A2624] to-[#1A1817] text-white rounded-2xl border border-[#DFC48B]/40 shadow-sm mb-4 space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-[#C5A059] text-white flex items-center justify-center font-serif font-bold text-xs">
              DL
            </span>
            <div>
              <span className="text-[10px] text-[#DFC48B] uppercase tracking-wider block font-semibold">
                Salesman Travel Stock Kit
              </span>
              <strong className="text-xs text-white">Pravin Bhati · SM-104</strong>
            </div>
          </div>

          <button
            onClick={() => onNavigate('wholesale-order')}
            className="px-2.5 py-1 rounded-lg bg-[#C5A059] text-white text-[11px] font-semibold flex items-center gap-1 hover:bg-[#B38E47] transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[14px]">edit_note</span>
            <span>Book Retailer Order</span>
          </button>
        </div>

        {/* Current City Selector */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-stone-300">
            <span className="material-symbols-outlined text-[#DFC48B] text-[16px]">
              location_on
            </span>
            <span>Current Tour Hub:</span>
          </div>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-black/40 border border-white/20 rounded-lg px-2 py-1 text-xs text-[#DFC48B] font-semibold outline-hidden cursor-pointer"
          >
            {cities.map((c) => (
              <option key={c} value={c} className="bg-[#1A1817] text-white">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Aggregate Stock Summary Metrics */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="p-3 bg-white rounded-xl border border-[#E8DED9] text-center shadow-2xs">
          <span className="text-[9px] uppercase tracking-wider text-[#8C8782] block font-semibold">
            Carried in Kit
          </span>
          <span className="font-serif text-lg font-bold text-[#1A1918] tabular-nums">
            {totalCarried}
          </span>
          <span className="text-[9px] text-[#8C8782] block">pieces</span>
        </div>

        <div className="p-3 bg-white rounded-xl border border-[#E8DED9] text-center shadow-2xs">
          <span className="text-[9px] uppercase tracking-wider text-emerald-700 block font-semibold">
            Sold on Tour
          </span>
          <span className="font-serif text-lg font-bold text-emerald-700 tabular-nums">
            {totalSold}
          </span>
          <span className="text-[9px] text-emerald-800 block">pieces</span>
        </div>

        <div className="p-3 bg-white rounded-xl border border-[#DFC48B] text-center shadow-2xs bg-[#FEF8F6]">
          <span className="text-[9px] uppercase tracking-wider text-[#C5A059] block font-semibold">
            Kit Remaining
          </span>
          <span className="font-serif text-lg font-bold text-[#C5A059] tabular-nums">
            {totalRemaining}
          </span>
          <span className="text-[9px] text-[#8C8782] block">pieces</span>
        </div>
      </div>

      {/* Financial Valuation Strip */}
      <div className="p-3 bg-white rounded-xl border border-[#E8DED9] mb-4 flex items-center justify-between text-xs shadow-2xs">
        <div>
          <span className="text-[10px] text-[#8C8782] block">Remaining Kit Valuation:</span>
          <strong className="font-serif text-sm text-[#1A1918] tabular-nums">
            ₹{totalKitValueRemaining.toLocaleString('en-IN')}
          </strong>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-emerald-700 block">Spot Revenue Realized:</span>
          <strong className="font-serif text-sm text-emerald-700 tabular-nums">
            ₹{totalRevenueCollected.toLocaleString('en-IN')}
          </strong>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-2 mb-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items by SKU, name, or tray box..."
            className="w-full px-3 py-2 pl-8 text-xs rounded-xl border border-[#E8DED9] bg-white outline-hidden focus:border-[#C5A059] shadow-2xs"
          />
          <span className="material-symbols-outlined text-[#8C8782] text-[16px] absolute left-2.5 top-2.5">
            search
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filterCategory === cat
                  ? 'bg-[#1A1918] text-white shadow-2xs'
                  : 'bg-white border border-[#E8DED9] text-[#1A1918] hover:bg-[#F8F2F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Item Ledger Cards */}
      <div className="space-y-3">
        {filteredStock.map((item) => {
          const remaining = item.carriedQty - item.soldQty;
          const isLowStock = remaining <= 5;
          const percentageSold = Math.min(
            100,
            item.carriedQty > 0 ? Math.round((item.soldQty / item.carriedQty) * 100) : 0
          );

          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border transition-all bg-white shadow-2xs ${
                isLowStock ? 'border-amber-300' : 'border-[#E8DED9]'
              }`}
            >
              <div className="flex items-start gap-3">
                <img
                  src={item.image}
                  alt={item.productName}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover bg-[#F8F2F0] shrink-0 border border-[#E8DED9]"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#C5A059] tracking-wider block">
                        {item.sku}
                      </span>
                      <h4 className="font-serif text-xs font-bold text-[#1A1918] truncate max-w-[160px]">
                        {item.productName}
                      </h4>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-[#1A1918] tabular-nums block">
                        ₹{item.wholesaleRate}
                      </span>
                      <span className="text-[10px] text-[#8C8782]">wholesale/unit</span>
                    </div>
                  </div>

                  {/* Tray / Case Location Tag */}
                  {item.boxNumber && (
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-[#8C8782]">
                      <span className="material-symbols-outlined text-[12px] text-[#C5A059]">
                        luggage
                      </span>
                      <span>Tray: <strong>{item.boxNumber}</strong></span>
                    </div>
                  )}

                  {/* Carried / Sold / Remaining Matrix */}
                  <div className="grid grid-cols-3 gap-1 mt-2.5 p-2 bg-[#FEF8F6] rounded-xl border border-[#E8DED9] text-center text-xs">
                    <div>
                      <span className="text-[9px] text-[#8C8782] block">Carried</span>
                      <strong className="text-[#1A1918] tabular-nums">{item.carriedQty}</strong>
                    </div>

                    <div>
                      <span className="text-[9px] text-emerald-700 block">Sold</span>
                      <strong className="text-emerald-700 tabular-nums">{item.soldQty}</strong>
                    </div>

                    <div>
                      <span className="text-[9px] text-[#C5A059] block">Remaining</span>
                      <strong
                        className={`tabular-nums font-bold ${
                          isLowStock ? 'text-amber-700' : 'text-[#1A1918]'
                        }`}
                      >
                        {remaining}
                      </strong>
                    </div>
                  </div>

                  {/* Visual Depletion Progress Bar */}
                  <div className="mt-2 w-full h-1 bg-[#E8DED9] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isLowStock ? 'bg-amber-500' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${percentageSold}%` }}
                    />
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E8DED9]/60">
                    {/* Quick Physical Audit (+/-) */}
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-[10px] text-[#8C8782]">Physical Audit:</span>
                      <div className="flex items-center border border-[#E8DED9] rounded-lg bg-white">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateStock(item.id, Math.max(0, item.carriedQty - 1), item.soldQty)
                          }
                          className="w-6 h-6 flex items-center justify-center text-[#1A1918] hover:bg-[#F8F2F0]"
                          title="Reduce Count"
                        >
                          <span className="material-symbols-outlined text-[13px]">remove</span>
                        </button>
                        <span className="w-6 text-center font-bold text-[11px] tabular-nums">
                          {remaining}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateStock(item.id, item.carriedQty + 1, item.soldQty)
                          }
                          className="w-6 h-6 flex items-center justify-center text-[#1A1918] hover:bg-[#F8F2F0]"
                          title="Increase Count"
                        >
                          <span className="material-symbols-outlined text-[13px]">add</span>
                        </button>
                      </div>
                    </div>

                    {/* Spot Sale & Refill Buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setSpotSaleModalItem(item);
                          setSpotSaleQty(1);
                        }}
                        disabled={remaining === 0}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-colors ${
                          remaining > 0
                            ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                            : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[12px]">payments</span>
                        <span>Spot Sale</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setRefillModalItem(item);
                          setRefillQty(20);
                        }}
                        className="px-2 py-1 rounded-lg border border-[#E8DED9] text-[10px] font-semibold text-[#1A1918] hover:bg-[#F8F2F0]"
                        title="Request Refill from Mumbai Atelier"
                      >
                        Refill
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto z-40 bg-white/95 backdrop-blur-md border-t border-[#E8DED9] p-3 shadow-xl flex items-center gap-2">
        <button
          type="button"
          onClick={() =>
            alert(
              `Downloading Traveling Kit Audit Report for ${selectedCity}. Total remaining stock: ${totalRemaining} pieces (Value: ₹${totalKitValueRemaining.toLocaleString('en-IN')}).`
            )
          }
          className="py-3 px-3.5 rounded-full border border-[#1A1918] text-[#1A1918] text-xs font-semibold hover:bg-[#F8F2F0] flex items-center gap-1"
          title="Export Stock Audit"
        >
          <span className="material-symbols-outlined text-[16px]">download</span>
          <span>Audit Report</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('wholesale-order')}
          className="flex-1 py-3 px-4 rounded-full bg-[#1A1918] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#C5A059] active:scale-95 transition-all shadow-md flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
          <span>Book Order with Retailer</span>
        </button>
      </div>

      {/* Spot Sale Modal */}
      {spotSaleModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-[#DFC48B] text-center space-y-3.5">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">payments</span>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#8C8782] font-semibold block mb-0.5">
                On-The-Spot Retailer Delivery
              </span>
              <h3 className="font-serif text-sm font-bold text-[#1A1918]">
                {spotSaleModalItem.productName}
              </h3>
              <p className="text-[11px] text-[#8C8782] mt-0.5">
                SKU: {spotSaleModalItem.sku} · Wholesale: ₹{spotSaleModalItem.wholesaleRate}/pc
              </p>
            </div>

            <div className="p-3 bg-[#FEF8F6] rounded-xl border border-[#E8DED9] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#8C8782]">Available in Tray:</span>
                <strong className="text-[#1A1918]">
                  {spotSaleModalItem.carriedQty - spotSaleModalItem.soldQty} pieces
                </strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#8C8782]">Units Handed Over:</span>
                <div className="flex items-center border border-[#E8DED9] rounded-lg bg-white">
                  <button
                    type="button"
                    onClick={() => setSpotSaleQty(Math.max(1, spotSaleQty - 1))}
                    className="w-7 h-7 flex items-center justify-center text-[#1A1918]"
                  >
                    <span className="material-symbols-outlined text-[14px]">remove</span>
                  </button>
                  <span className="w-8 text-center font-bold">{spotSaleQty}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setSpotSaleQty(
                        Math.min(
                          spotSaleModalItem.carriedQty - spotSaleModalItem.soldQty,
                          spotSaleQty + 1
                        )
                      )
                    }
                    className="w-7 h-7 flex items-center justify-center text-[#1A1918]"
                  >
                    <span className="material-symbols-outlined text-[14px]">add</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E8DED9] flex items-center justify-between">
                <span className="font-semibold text-[#1A1918]">Cash/UPI Collected:</span>
                <strong className="font-serif text-base text-emerald-700 tabular-nums">
                  ₹{(spotSaleModalItem.wholesaleRate * spotSaleQty).toLocaleString('en-IN')}
                </strong>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleConfirmSpotSale}
                className="w-full py-2.5 rounded-full bg-emerald-700 text-white text-xs font-semibold shadow-xs hover:bg-emerald-800"
              >
                Confirm Spot Sale & Deduct from Kit
              </button>

              <button
                type="button"
                onClick={() => setSpotSaleModalItem(null)}
                className="w-full py-2 rounded-full border border-[#E8DED9] text-xs font-medium text-[#1A1918]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Refill Request Modal */}
      {refillModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-[#E8DED9] text-center space-y-3.5">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FEF8F6] text-[#C5A059] border border-[#DFC48B] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">local_shipping</span>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#8C8782] font-semibold block mb-0.5">
                Request Refill from Mumbai Atelier
              </span>
              <h3 className="font-serif text-sm font-bold text-[#1A1918]">
                {refillModalItem.productName}
              </h3>
              <p className="text-[11px] text-[#8C8782] mt-0.5">SKU: {refillModalItem.sku}</p>
            </div>

            <div className="p-3 bg-[#FEF8F6] rounded-xl border border-[#E8DED9] text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#8C8782]">Refill Quantity Needed:</span>
                <input
                  type="number"
                  value={refillQty}
                  onChange={(e) => setRefillQty(parseInt(e.target.value) || 0)}
                  className="w-16 px-2 py-1 bg-white border border-[#E8DED9] rounded-lg text-center font-bold"
                />
              </div>
              <p className="text-[10px] text-[#8C8782] text-left">
                📦 Stock will be dispatched via BlueDart Air cargo to your next destination in {selectedCity}.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleConfirmRefill}
                className="w-full py-2.5 rounded-full bg-[#1A1918] text-white text-xs font-semibold shadow-xs hover:bg-[#C5A059]"
              >
                Send Refill Request to Factory
              </button>

              <button
                type="button"
                onClick={() => setRefillModalItem(null)}
                className="w-full py-2 rounded-full border border-[#E8DED9] text-xs font-medium text-[#1A1918]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
