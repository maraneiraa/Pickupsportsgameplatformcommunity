import { X, Home, Compass, Plus, Calendar, MessageCircle, User, Settings, LogOut } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home, color: 'text-orange-600' },
  { id: 'discover', label: 'Discover Games', icon: Compass, color: 'text-blue-600' },
  { id: 'create', label: 'Create Game', icon: Plus, color: 'text-purple-600' },
  { id: 'my-games', label: 'My Games', icon: Calendar, color: 'text-green-600' },
  { id: 'messages', label: 'Messages', icon: MessageCircle, color: 'text-pink-600' },
  { id: 'profile', label: 'Profile', icon: User, color: 'text-indigo-600' },
  { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-600' },
];

export function NavigationDrawer({ isOpen, onClose, onNavigate }: NavigationDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 left-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl z-50 flex flex-col animate-slide-in-left">
        {/* User Profile Section */}
        <div className="bg-gradient-to-br from-orange-500 to-purple-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="size-5 text-white" />
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
              alt="User profile"
              className="size-16 rounded-full border-4 border-white/30 object-cover"
            />
            <div>
              <h3 className="font-bold text-lg mb-0.5">Alex Thompson</h3>
              <p className="text-sm text-orange-100">Basketball Regular</p>
            </div>
          </div>
          
          <div className="flex gap-4 text-sm">
            <div>
              <div className="font-bold text-lg">24</div>
              <div className="text-orange-100">Games Joined</div>
            </div>
            <div>
              <div className="font-bold text-lg">12</div>
              <div className="text-orange-100">Friends</div>
            </div>
            <div>
              <div className="font-bold text-lg">3</div>
              <div className="text-orange-100">Groups</div>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onClose();
              }}
              className="w-full flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors group"
            >
              <div className={`${item.color} group-hover:scale-110 transition-transform`}>
                <item.icon className="size-5" />
              </div>
              <span className="font-medium text-gray-900">{item.label}</span>
              {item.id === 'messages' && (
                <span className="ml-auto size-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={() => {
              console.log('Logout clicked');
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
          >
            <LogOut className="size-5" />
            <span>Log Out</span>
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-4">
            PickupPlay v1.0 · Made with ❤️
          </p>
        </div>
      </div>
    </>
  );
}
