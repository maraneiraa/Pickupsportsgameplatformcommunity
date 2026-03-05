import { MapPin, Users, Heart } from 'lucide-react';

const steps = [
  {
    icon: MapPin,
    title: 'Discover Games Near You',
    description: 'Browse local pickup games across all your favorite sports. Filter by skill level, distance, and time.',
    color: 'bg-blue-500',
  },
  {
    icon: Users,
    title: 'Join & Connect',
    description: 'Show up, meet new people, and play. Every game is a chance to make friends and build your local sports community.',
    color: 'bg-orange-500',
  },
  {
    icon: Heart,
    title: 'Become a Regular',
    description: 'Find your crew, join recurring games, and turn strangers into teammates. Build friendships that go beyond the court.',
    color: 'bg-purple-500',
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-gray-900">
            How PickupPlay Brings People Together
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            It's simple: find a game, show up, and connect. The friendships happen naturally.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`${step.color} size-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg transform hover:scale-110 transition-transform`}>
                <step.icon className="size-8 text-white" />
              </div>
              <div className="mb-3 flex items-center justify-center gap-2">
                <span className="text-2xl font-bold text-gray-300">{index + 1}</span>
                <h3 className="font-bold text-xl text-gray-900">{step.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-to-r from-orange-100 to-purple-100 rounded-2xl p-6">
            <p className="text-gray-800 text-lg font-medium mb-2">
              💡 <span className="font-bold">Pro Tip:</span> Join the same game a few times—that's how the magic happens
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
