import { TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const stats = [
  {
    value: '12,500+',
    label: 'Active Players',
    subtext: 'Building connections weekly',
  },
  {
    value: '78%',
    label: 'Returning Members',
    subtext: 'Come back for the community',
  },
  {
    value: '2,300+',
    label: 'Games This Week',
    subtext: 'Across all sports',
  },
  {
    value: '450+',
    label: 'Recurring Groups',
    subtext: 'Meeting every week',
  },
];

export function CommunityStats() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 size-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 size-40 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <TrendingUp className="size-5" />
            <span className="font-semibold">Growing Every Day</span>
          </div>
          <h2 className="text-3xl font-bold mb-3">
            Join a Thriving Sports Community
          </h2>
          <p className="text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto">
            From casual players to competitive athletes, we're building the largest local sports community.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-blue-100">{stat.subtext}</div>
            </div>
          ))}
        </div>

        {/* Featured Community Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1603775412251-dff024902369?w=1200"
            alt="Community playing together"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-6">
              <p className="text-white text-xl font-bold mb-1">
                "This isn't just an app—it's where I found my second family."
              </p>
              <p className="text-white/80">— Alex M., Soccer Regular</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
