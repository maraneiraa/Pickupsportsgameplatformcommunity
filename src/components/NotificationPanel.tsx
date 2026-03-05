import { X, Check, ArrowRight, Inbox } from 'lucide-react';
import { type Notification } from '../data/mockNotifications';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onViewAll: () => void;
}

const categoryLabels: Record<string, string> = {
  'game-updates': 'Game Updates',
  'invites': 'Invites',
  'reminders': 'Reminders',
  'social': 'Social',
};

const categoryColors: Record<string, string> = {
  'game-updates': 'bg-blue-100 text-blue-700',
  'invites': 'bg-purple-100 text-purple-700',
  'reminders': 'bg-orange-100 text-orange-700',
  'social': 'bg-green-100 text-green-700',
};

export function NotificationPanel({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onViewAll,
}: NotificationPanelProps) {
  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const groupedNotifications = notifications.reduce((acc, notification) => {
    if (!acc[notification.category]) {
      acc[notification.category] = [];
    }
    acc[notification.category].push(notification);
    return acc;
  }, {} as Record<string, Notification[]>);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-[61px] right-0 w-full sm:w-96 bg-white shadow-2xl z-50 max-h-[calc(100vh-61px)] flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div>
            <h2 className="font-bold text-lg">Notifications</h2>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-600">
                {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                <Check className="size-4" />
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="size-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
              <div className="size-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Inbox className="size-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                No new notifications yet
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Join a game to get started and stay updated on your sports community!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {Object.entries(groupedNotifications).map(([category, categoryNotifications]) => (
                <div key={category} className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${categoryColors[category]}`}>
                      {categoryLabels[category]}
                    </span>
                    <span className="text-xs text-gray-500">
                      {categoryNotifications.length}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {categoryNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => !notification.isRead && onMarkAsRead(notification.id)}
                        className={`
                          p-3 rounded-lg transition-all cursor-pointer group
                          ${notification.isRead 
                            ? 'bg-white hover:bg-gray-50' 
                            : 'bg-blue-50 hover:bg-blue-100 border border-blue-200'
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">
                          {/* Sport Icon */}
                          <div className="size-10 bg-white rounded-lg flex items-center justify-center text-xl flex-shrink-0 shadow-sm">
                            {notification.sportEmoji}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm leading-relaxed mb-1 ${
                              notification.isRead ? 'text-gray-700' : 'text-gray-900 font-medium'
                            }`}>
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                {notification.relativeTime}
                              </span>
                              {!notification.isRead && (
                                <span className="size-2 bg-blue-600 rounded-full"></span>
                              )}
                            </div>
                          </div>

                          {/* Mark as Read Button */}
                          {!notification.isRead && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onMarkAsRead(notification.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white rounded"
                            >
                              <Check className="size-4 text-blue-600" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-white">
            <button
              onClick={onViewAll}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group"
            >
              View All Notifications
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
