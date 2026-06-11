import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, ShieldAlert, CreditCard, Wallet, Coins, Inbox, Trash2, X,
  BadgePercent, AlertTriangle, CheckCircle 
} from 'lucide-react';
import { SystemNotification } from '../types';

interface NotificationsProps {
  notifications: SystemNotification[];
  onClearNotification: (id: string) => void;
  onClearAllNotifications: () => void;
}

export default function Notifications({ 
  notifications, 
  onClearNotification, 
  onClearAllNotifications 
}: NotificationsProps) {
  
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredNotifications = notifications.filter(notif => {
    if (activeCategory === 'All') return true;
    return notif.category === activeCategory;
  });

  const getIcon = (category: string) => {
    switch (category) {
      case 'Security':
        return <ShieldAlert className="w-5 h-5 text-red-500" />;
      case 'Risk warnings':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'Credit':
        return <Coins className="w-5 h-5 text-purple-600" />;
      case 'Payments':
        return <CreditCard className="w-5 h-5 text-pink-500" />;
      default:
        return <Bell className="w-5 h-5 text-purple-600" />;
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Security':
        return 'bg-red-50 text-red-700 border-red-100';
      case 'Risk warnings':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Credit':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'Payments':
        return 'bg-pink-50 text-pink-750 border-pink-100';
      default:
        return 'bg-purple-50 text-purple-700 border-purple-100';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-purple-950 font-sans tracking-tight">System Live Feed & Alert center</h1>
          <p className="text-xs text-purple-900/60 font-semibold uppercase tracking-wider font-mono">B2B NBFC Node transaction logs & security telemetry</p>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={onClearAllNotifications}
            className="px-4 py-2 bg-purple-150 border border-purple-200 text-purple-750 font-bold text-xs rounded-xl hover:bg-purple-200 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4 text-purple-600" /> Clear Logs Archive
          </button>
        )}
      </div>

      {/* Category Pills Filters */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Security', 'Risk warnings', 'Credit', 'Payments'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
              activeCategory === cat 
                ? 'bg-purple-600 text-white shadow-xs' 
                : 'bg-purple-100/50 text-purple-700 hover:bg-purple-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notifications Queue list */}
      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16 bg-white/40 border border-purple-200/20 rounded-3xl">
              <Inbox className="w-10 h-10 text-purple-300 mx-auto mb-3" />
              <p className="text-xs font-bold text-purple-950/50 uppercase tracking-widest">Feed cleared</p>
              <p className="text-[11px] text-purple-900/40 font-semibold mt-1">All audit alerts and notices successfully processed.</p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="glass-card border border-white rounded-[24px] p-5 flex gap-4 items-start relative hover:shadow-md transition-shadow group"
              >
                {/* Accent marker for unread */}
                {!notif.read && (
                  <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                )}

                {/* Categorized symbol */}
                <div className="p-3 bg-white border border-purple-100 rounded-2xl shrink-0 shadow-xs">
                  {getIcon(notif.category)}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black text-purple-950">{notif.title}</span>
                    <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full border font-mono ${getCategoryBadgeClass(notif.category)}`}>
                      {notif.category}
                    </span>
                    <span className="text-[10px] font-mono text-purple-950/40">{notif.date}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-purple-900/60 leading-relaxed">{notif.message}</p>
                </div>

                <button
                  onClick={() => onClearNotification(notif.id)}
                  className="p-1.5 rounded-lg text-purple-950/30 hover:text-purple-950 hover:bg-purple-100/50 transition-all opacity-0 group-hover:opacity-100 cursor-pointer ml-4 self-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
