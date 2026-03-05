import { Clock, Users, MapPin, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Group {
  id: string;
  name: string;
  sport: string;
  sportEmoji: string;
  members: number;
  schedule: string;
  location: string;
  image: string;
  description: string;
}

const featuredGroups: Group[] = [
  {
    id: '1',
    name: 'Downtown Basketball Crew',
    sport: 'Basketball',
    sportEmoji: '🏀',
    members: 24,
    schedule: 'Tuesdays & Thursdays, 6:00 PM',
    location: 'Venice Beach Courts',
    image: 'https://images.unsplash.com/photo-1765036464882-e36092ba4bb4?w=800',
    description: 'Competitive but friendly games. All skill levels welcome. Post-game pizza is a tradition!',
  },
  {
    id: '2',
    name: 'Sunday Morning Soccer League',
    sport: 'Soccer',
    sportEmoji: '⚽',
    members: 42,
    schedule: 'Sundays, 9:00 AM',
    location: 'Griffith Park Fields',
    image: 'https://images.unsplash.com/photo-1757031301094-598bdbe0cd56?w=800',
    description: 'Coed league with rotating teams. Perfect way to start your Sunday with great people.',
  },
  {
    id: '3',
    name: 'Sunset Volleyball Vibes',
    sport: 'Volleyball',
    sportEmoji: '🏐',
    members: 18,
    schedule: 'Fridays, 5:30 PM',
    location: 'Santa Monica Beach',
    image: 'https://images.unsplash.com/photo-1766385049765-5badd8a9a079?w=800',
    description: 'Beach volleyball as the sun sets. Bring good energy and stay for the bonfire after!',
  },
];

export function FeaturedGroups() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-gray-900">
            Find Your Regular Crew
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Join one of our thriving recurring groups. These aren't just games—they're weekly traditions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {featuredGroups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={group.image}
                  alt={group.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                  <span className="text-xl">{group.sportEmoji}</span>
                  <span className="font-semibold text-sm text-gray-900">{group.sport}</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-lg mb-3 text-gray-900">{group.name}</h3>
                
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {group.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Users className="size-4 text-gray-400" />
                    <span>{group.members} active members</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Clock className="size-4 text-gray-400" />
                    <span>{group.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <MapPin className="size-4 text-gray-400" />
                    <span>{group.location}</span>
                  </div>
                </div>

                <button className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group">
                  Join Group
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors inline-flex items-center gap-2">
            Explore All Groups
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
