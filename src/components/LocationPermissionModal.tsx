import { MapPin, X } from 'lucide-react';

interface LocationPermissionModalProps {
  isOpen: boolean;
  onAllow: () => void;
  onManual: () => void;
  onClose: () => void;
}

export function LocationPermissionModal({ isOpen, onAllow, onManual, onClose }: LocationPermissionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md overflow-hidden animate-slide-up shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="font-semibold text-lg">Enable Location</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="size-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <div className="size-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MapPin className="size-8 text-white" />
            </div>
            <h3 className="font-semibold text-lg text-center mb-2">
              Find Games Near You
            </h3>
            <p className="text-center text-gray-600 leading-relaxed text-sm">
              We use your location only to show nearby pickup games. 
              Your location is never shared with other users.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={onAllow}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Allow Location Access
            </button>
            <button
              onClick={onManual}
              className="w-full py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors border border-gray-300"
            >
              Enter Location Manually
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
            You can change this in your browser settings anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
