import { useState } from 'react';
import { X, Mail, CheckCircle } from 'lucide-react';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmailModal({ isOpen, onClose }: EmailModalProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In production, this would send to your backend
      console.log('Email submitted:', email);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setEmail('');
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md overflow-hidden animate-slide-up shadow-lg">
        {!submitted ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="font-semibold text-lg">Join the Waitlist</h2>
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
                  <Mail className="size-8 text-white" />
                </div>
                <p className="text-center text-gray-600 leading-relaxed text-sm">
                  Get early access to PickupPlay and receive exclusive launch discounts. 
                  We'll keep you updated on our progress!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Early Access
                </button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="size-9 text-green-600" />
            </div>
            <h3 className="font-semibold text-xl mb-2">You're on the list!</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              We'll send you an email when PickupPlay launches.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}