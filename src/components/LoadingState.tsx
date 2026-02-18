import { Loader2, MapPin } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="size-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <MapPin className="size-10 text-blue-600" />
          </div>
          <Loader2 className="size-6 text-blue-600 absolute top-0 right-1/4 animate-spin" />
        </div>
        <h2 className="font-semibold text-xl mb-2">Finding games near you...</h2>
        <p className="text-gray-600 text-sm">This will only take a moment</p>
      </div>
    </div>
  );
}
