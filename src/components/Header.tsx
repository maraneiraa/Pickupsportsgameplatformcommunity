import { Menu, Bell } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-2xl mx-auto px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden">
            <Menu className="size-5 text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <div className="size-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PP</span>
            </div>
            <h1 className="font-bold text-lg">PickupPlay</h1>
          </div>
        </div>
        
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
          <Bell className="size-5 text-gray-700" />
          <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
}