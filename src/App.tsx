import { useState } from 'react';
import { Header } from './components/Header';
import { SportFilter } from './components/SportFilter';
import { GameCard } from './components/GameCard';
import { EarlyAccessBanner } from './components/EarlyAccessBanner';
import { EmailModal } from './components/EmailModal';
import { ConfirmationModal } from './components/ConfirmationModal';
import { LocationPermissionModal } from './components/LocationPermissionModal';
import { LoadingState } from './components/LoadingState';
import { MapView } from './components/MapView';
import { Testimonials } from './components/Testimonials';
import { HowItWorks } from './components/HowItWorks';
import { CommunityStats } from './components/CommunityStats';
import { FeaturedGroups } from './components/FeaturedGroups';
import { SecondaryCTA } from './components/SecondaryCTA';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { mockGames, type Sport, type Game } from './data/mockGames';
import { MapPin, ArrowDown } from 'lucide-react';

type ViewMode = 'home' | 'loading' | 'map';

export default function App() {
  const [selectedSport, setSelectedSport] = useState<Sport | 'all'>('all');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [joinedGame, setJoinedGame] = useState<Game | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const filteredGames = selectedSport === 'all' 
    ? mockGames 
    : mockGames.filter(game => game.sport === selectedSport);

  const handleJoinGame = (game: Game) => {
    setJoinedGame(game);
  };

  const handleFindGamesNearMe = () => {
    setShowLocationModal(true);
  };

  const handleAllowLocation = () => {
    setShowLocationModal(false);
    setViewMode('loading');

    // Simulate getting user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          // Simulate loading time
          setTimeout(() => {
            setViewMode('map');
          }, 1500);
        },
        (error) => {
          // Fallback to default location (Los Angeles) if permission denied
          console.log('Location access denied or unavailable, using default location');
          setUserLocation({ lat: 34.0522, lng: -118.2437 });
          setTimeout(() => {
            setViewMode('map');
          }, 1500);
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      // Fallback for browsers without geolocation
      setUserLocation({ lat: 34.0522, lng: -118.2437 });
      setTimeout(() => {
        setViewMode('map');
      }, 1500);
    }
  };

  const handleManualLocation = () => {
    setShowLocationModal(false);
    setViewMode('loading');
    // Use default location (Los Angeles)
    setUserLocation({ lat: 34.0522, lng: -118.2437 });
    setTimeout(() => {
      setViewMode('map');
    }, 1500);
  };

  const handleBackFromMap = () => {
    setViewMode('home');
  };

  if (viewMode === 'loading') {
    return <LoadingState />;
  }

  if (viewMode === 'map' && userLocation) {
    return (
      <>
        <MapView
          games={mockGames}
          onBack={handleBackFromMap}
          onJoinGame={handleJoinGame}
          userLocation={userLocation}
        />
        {/* Confirmation Modal */}
        <ConfirmationModal 
          game={joinedGame}
          onClose={() => setJoinedGame(null)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section - Community Focused */}
        <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-purple-600 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 size-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 size-80 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Side - Hero Content */}
              <div>
                <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <span className="font-semibold">🏆 Join 12,500+ Active Players</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
                  Find Your Game.<br />Find Your People.
                </h1>
                <p className="text-xl text-orange-100 mb-8 leading-relaxed">
                  More than just pickup games—it's where friendships are made, communities are built, and every match brings you closer to your crew.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleFindGamesNearMe}
                    className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-xl flex items-center justify-center gap-2 group"
                  >
                    <MapPin className="size-6" />
                    Find Games Near Me
                  </button>
                  <button 
                    onClick={() => setShowEmailModal(true)}
                    className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    Get Early Access
                  </button>
                </div>
                <p className="text-sm text-orange-200 mt-6">
                  ✨ New games posted daily · All skill levels welcome
                </p>
              </div>

              {/* Right Side - Hero Image */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform md:rotate-3 hover:rotate-0 transition-transform">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1765036464882-e36092ba4bb4?w=800"
                    alt="Friends celebrating on basketball court"
                    className="w-full h-96 object-cover"
                  />
                </div>
                {/* Floating Stats */}
                <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 px-6 py-4 rounded-xl shadow-xl">
                  <div className="text-2xl font-bold text-orange-600">2,300+</div>
                  <div className="text-sm font-medium">Games This Week</div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white text-gray-900 px-6 py-4 rounded-xl shadow-xl">
                  <div className="text-2xl font-bold text-purple-600">78%</div>
                  <div className="text-sm font-medium">Come Back Weekly</div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center mt-16">
              <div className="flex flex-col items-center gap-2 animate-bounce">
                <span className="text-sm font-medium text-white/80">See how it works</span>
                <ArrowDown className="size-6 text-white/60" />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonials />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Community Stats Section */}
        <CommunityStats />

        {/* Featured Groups Section */}
        <FeaturedGroups />

        {/* Early Access Banner */}
        <div className="px-4 py-8 bg-gradient-to-b from-orange-50 to-white">
          <div className="max-w-2xl mx-auto">
            <EarlyAccessBanner onGetAccess={() => setShowEmailModal(true)} />
          </div>
        </div>

        {/* Browse Games Section */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3 text-gray-900">
                Browse Upcoming Games
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Can't wait to get started? Check out what's happening near you today.
              </p>
            </div>

            {/* Sport Filter */}
            <div className="mb-6">
              <SportFilter 
                selected={selectedSport} 
                onSelect={setSelectedSport} 
              />
            </div>

            {/* Games List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-base text-gray-900">
                  {filteredGames.length} {filteredGames.length === 1 ? 'Game' : 'Games'} Available
                </h3>
              </div>

              {filteredGames.slice(0, 3).map(game => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  onJoin={() => handleJoinGame(game)}
                />
              ))}

              {filteredGames.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-base">No games found for this sport.</p>
                  <button
                    onClick={() => setSelectedSport('all')}
                    className="mt-4 text-orange-600 font-medium hover:text-orange-700 transition-colors"
                  >
                    View all games
                  </button>
                </div>
              )}

              {filteredGames.length > 3 && (
                <div className="text-center pt-6">
                  <button 
                    onClick={handleFindGamesNearMe}
                    className="text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                  >
                    View All {filteredGames.length} Games →
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Secondary CTA Section */}
        <SecondaryCTA onFindGames={handleFindGamesNearMe} />

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="size-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">PP</span>
              </div>
              <h3 className="font-bold text-2xl">PickupPlay</h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Building local sports communities, one game at a time.
            </p>
            <p className="text-sm text-gray-500">
              © 2026 PickupPlay. Made with ❤️ for the community.
            </p>
          </div>
        </footer>
      </main>

      {/* Location Permission Modal */}
      <LocationPermissionModal
        isOpen={showLocationModal}
        onAllow={handleAllowLocation}
        onManual={handleManualLocation}
        onClose={() => setShowLocationModal(false)}
      />

      {/* Email Modal */}
      <EmailModal 
        isOpen={showEmailModal} 
        onClose={() => setShowEmailModal(false)} 
      />

      {/* Confirmation Modal */}
      <ConfirmationModal 
        game={joinedGame}
        onClose={() => setJoinedGame(null)}
      />
    </div>
  );
}