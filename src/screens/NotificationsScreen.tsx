import React, { useState } from 'react';
import { ScreenId, NotificationItem } from '../types.ts';
import { MOCK_NOTIFICATIONS } from '../data/mockData.ts';

interface NotificationsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onNavigate }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'order' | 'price-drop' | 'restock' | 'reward'>('all');

  const filtered = notifications.filter((n) => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'order':
        return 'local_shipping';
      case 'reward':
        return 'stars';
      case 'price-drop':
        return 'trending_down';
      case 'restock':
        return 'inventory_2';
      default:
        return 'notifications';
    }
  };

  return (
    <div className="pb-24 px-4 pt-3 bg-[#FEF8F6] text-[#1A1918]">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block mb-0.5">
            Updates & Alerts
          </span>
          <h2 className="font-serif text-2xl font-semibold text-[#1A1918]">
            Notifications
          </h2>
        </div>
        <button
          onClick={handleMarkAllRead}
          className="text-xs text-[#C5A059] font-semibold hover:underline"
        >
          Mark all as read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-3">
        {(['all', 'order', 'price-drop', 'restock', 'reward'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap capitalize transition-colors ${
              filter === tab
                ? 'bg-[#1A1918] text-white shadow-2xs font-semibold'
                : 'bg-white border border-[#E8DED9] text-[#1A1918] hover:bg-[#F8F2F0]'
            }`}
          >
            {tab === 'all'
              ? 'All'
              : tab === 'order'
              ? 'Orders'
              : tab === 'price-drop'
              ? 'Price Drops'
              : tab === 'restock'
              ? 'Restocks'
              : 'Rewards'}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              if (item.type === 'order') onNavigate('live-tracking');
              if (item.type === 'price-drop') onNavigate('wishlist');
              if (item.type === 'reward') onNavigate('offers');
            }}
            className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
              item.isRead
                ? 'bg-white border-[#E8DED9]'
                : 'bg-[#FFFDFB] border-[#DFC48B] shadow-2xs'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                item.isRead
                  ? 'bg-[#F8F2F0] text-[#8C8782]'
                  : 'bg-[#FEF8F6] border border-[#DFC48B] text-[#C5A059]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {getIcon(item.type)}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-1">
                <h4
                  className={`text-xs font-semibold ${
                    item.isRead ? 'text-[#1A1918]' : 'text-[#1A1918] font-bold'
                  }`}
                >
                  {item.title}
                </h4>
                {!item.isRead && (
                  <span className="w-2 h-2 rounded-full bg-[#C5A059] shrink-0 mt-1" />
                )}
              </div>
              <p className="text-[11px] text-[#8C8782] leading-relaxed mt-0.5">
                {item.description}
              </p>
              <span className="text-[10px] text-[#8C8782] block mt-1">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
