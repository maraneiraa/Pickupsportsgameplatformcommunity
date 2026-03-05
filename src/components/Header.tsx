import { Menu, Bell } from 'lucide-react';
import { useState } from 'react';
import { NotificationPanel } from './NotificationPanel';
import { NavigationDrawer } from './NavigationDrawer';
import { mockNotifications as initialNotifications } from '../data/mockNotifications';
import type { Notification } from '../data/mockNotifications';

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNavDrawer, setShowNavDrawer] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const handleViewAllNotifications = () => {
    console.log('Navigate to notifications page');
    setShowNotifications(false);
  };

  const handleNavigate = (page: string) => {
    console.log(`Navigate to: ${page}`);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowNavDrawer(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="size-5 text-gray-700" />
            </button>
            <div className="flex items-center gap-2">
              <div className="size-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PP</span>
              </div>
              <h1 className="font-bold text-lg">PickupPlay</h1>
            </div>
          </div>
          
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
          >
            <Bell className="size-5 text-gray-700" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full"></span>
            )}
          </button>
        </div>
      </header>

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onViewAll={handleViewAllNotifications}
      />

      {/* Navigation Drawer */}
      <NavigationDrawer
        isOpen={showNavDrawer}
        onClose={() => setShowNavDrawer(false)}
        onNavigate={handleNavigate}
      />
    </>
  );
}