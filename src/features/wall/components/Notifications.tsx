import React, { useState, useEffect } from 'react';
import { Bell, Heart, MessageCircle, UserPlus, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'achievement';
  userId: string;
  postId?: string;
  message: string;
  read: boolean;
  timestamp: Date;
}

interface NotificationsProps {
  notifications: Notification[];
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
}

export function Notifications({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead
}: NotificationsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like': return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment': return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'follow': return <UserPlus className="w-5 h-5 text-green-500" />;
      case 'achievement': return <Star className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50"
          >
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllAsRead}
                    className="text-sm text-blue-500 hover:text-blue-600"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    layout
                    onClick={() => onMarkAsRead(notification.id)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {getIcon(notification.type)}
                      </div>
                      <div>
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.timestamp.toRelativeTimeString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
