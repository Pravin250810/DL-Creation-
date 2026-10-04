import React, { useState } from 'react';
import { ScreenId, Order } from '../types.ts';
import { MOCK_ORDERS } from '../data/mockData.ts';

interface MyOrdersScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onTrackOrder: (order: Order) => void;
}

export const MyOrdersScreen: React.FC<MyOrdersScreenProps> = ({
  onNavigate,
  onTrackOrder,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'processing' | 'shipped' | 'delivered'>('all');

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    if (activeTab === 'all') return true;
    return order.status.toLowerCase() === activeTab;
  });

  return (
    <div className="pb-24 px-4 pt-3 bg-[#FEF8F6] text-[#1A1918]">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block mb-0.5">
            Purchase History
          </span>
          <h2 className="font-serif text-2xl font-semibold text-[#1A1918]">My Orders</h2>
        </div>
        <span className="text-xs text-[#8C8782] tabular-nums">{MOCK_ORDERS.length} Orders Total</span>
      </div>

      {/* Segmented Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-[#E8DED9] mb-4">
        {(['all', 'processing', 'shipped', 'delivered'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
              activeTab === tab
                ? 'bg-[#1A1918] text-white shadow-xs font-semibold'
                : 'text-[#8C8782] hover:text-[#1A1918]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-3.5">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl border border-[#E8DED9] p-3.5 shadow-2xs space-y-3"
            >
              {/* Order Meta Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[#E8DED9]/60 text-xs">
                <div>
                  <strong className="font-mono text-[#1A1918]">#{order.orderNumber}</strong>
                  <span className="text-[10px] text-[#8C8782] block">{order.date}</span>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm ${
                    order.status === 'Shipped'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : order.status === 'Delivered'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-stone-100 text-stone-700'
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {order.items.map((it, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <img
                      src={it.product.image}
                      alt={it.product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-cover rounded-lg bg-[#F8F2F0] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs font-semibold text-[#1A1918] truncate">
                        {it.product.name}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] text-[#8C8782] mt-0.5">
                        <span>Qty: {it.quantity}</span>
                        <span className="text-[#1A1918] font-semibold tabular-nums">
                          ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery ETA & Amount */}
              <div className="pt-2 border-t border-[#E8DED9]/60 flex items-center justify-between text-xs">
                <span className="text-[#8C8782] text-[11px]">{order.estimatedDelivery}</span>
                <span className="font-serif font-bold text-sm text-[#1A1918] tabular-nums">
                  Total: ₹{order.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => {
                    onTrackOrder(order);
                    onNavigate('live-tracking');
                  }}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-[#1A1918] text-white text-xs font-semibold hover:bg-[#C5A059] flex items-center justify-center gap-1 active:scale-95 transition-colors"
                >
                  <span className="material-symbols-outlined text-[15px]">local_shipping</span>
                  <span>Track Shipment</span>
                </button>

                <button
                  onClick={() => alert(`Downloading official GST Tax Invoice for Order #${order.orderNumber}`)}
                  className="py-1.5 px-3 rounded-lg border border-[#E8DED9] text-[#1A1918] text-xs font-medium hover:bg-[#F8F2F0] active:scale-95 transition-colors"
                  title="Download Invoice"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center bg-white rounded-xl border border-[#E8DED9]">
            <p className="text-xs text-[#8C8782]">No orders found under this tab</p>
          </div>
        )}
      </div>
    </div>
  );
};
