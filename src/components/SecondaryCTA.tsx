import { Plus, Search } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SecondaryCTAProps {
  onFindGames: () => void;
}

export function SecondaryCTA({ onFindGames }: SecondaryCTAProps) {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-600 to-blue-600 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 size-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 size-48 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1571745612875-6b66ea516a0a?w=800"
                alt="People playing basketball"
                className="w-full h-80 object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 px-6 py-4 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-orange-600">2,300+</div>
              <div className="text-sm font-medium">Games This Week</div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div>
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              Your Next Best Friend Might Be One Game Away
            </h2>
            <p className="text-lg text-blue-100 leading-relaxed mb-8">
              Whether you're looking to find games or host your own, PickupPlay makes it easy to bring people together. Start building your local sports community today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onFindGames}
                className="flex-1 py-3.5 px-6 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <Search className="size-5" />
                Find Games Near Me
              </button>
              <button className="flex-1 py-3.5 px-6 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-semibold rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                <Plus className="size-5" />
                Host a Game
              </button>
            </div>

            <p className="text-sm text-blue-200 mt-6">
              ✨ Join 12,500+ players who've already found their community
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
