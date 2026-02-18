import { Sparkles } from 'lucide-react';

interface EarlyAccessBannerProps {
  onGetAccess: () => void;
}

export function EarlyAccessBanner({ onGetAccess }: EarlyAccessBannerProps) {
  return (
    <div className="bg-purple-600 rounded-lg p-5 text-white">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-purple-500 rounded-lg">
          <Sparkles className="size-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base mb-1.5">Get Early Access & Unlock Your Discount</h3>
          <p className="text-sm text-purple-100 mb-3.5 leading-relaxed">
            Be the first to experience PickupPlay and receive exclusive discounts at launch.
          </p>
          <button
            onClick={onGetAccess}
            className="bg-white text-purple-600 px-5 py-2 rounded-lg font-semibold text-sm hover:bg-purple-50 transition-colors"
          >
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  );
}