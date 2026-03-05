import { ImageWithFallback } from './figma/ImageWithFallback';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  sport: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Marcus Johnson',
    location: 'Los Angeles, CA',
    sport: 'Basketball',
    quote: "I moved to LA six months ago and didn't know anyone. PickupPlay helped me find a regular Tuesday night basketball crew. Now they're some of my closest friends.",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    location: 'Austin, TX',
    sport: 'Volleyball',
    quote: "What started as a casual beach volleyball game turned into a tight-knit group that hangs out every weekend. This app brought us together.",
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  },
  {
    id: '3',
    name: 'Jordan Williams',
    location: 'Denver, CO',
    sport: 'Soccer',
    quote: "The best part isn't just the games—it's the community. We've started doing post-game coffee runs and even organized a charity tournament.",
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
  },
];

export function Testimonials() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-gray-900">
            Real Stories. Real Friendships.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Thousands of people have found their community through PickupPlay. Here's what they're saying.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 hover:shadow-md transition-shadow"
            >
              <Quote className="size-8 text-orange-400 mb-4" />
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <ImageWithFallback
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="size-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                  <p className="text-xs text-orange-600 font-medium">{testimonial.sport} Regular</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
