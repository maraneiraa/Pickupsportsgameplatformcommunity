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
import { mockGames, type Sport, type Game } from './data/mockGames';
import { MapPin } from 'lucide-react';

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
          console.error('Location error:', error);
          setUserLocation({ lat: 34.0522, lng: -118.2437 });
          setTimeout(() => {
            setViewMode('map');
          }, 1500);
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pb-20">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-3 leading-tight">
              Find Pickup Games Near You in Seconds
            </h1>
            <p className="text-blue-100 mb-7 text-base leading-relaxed max-w-lg mx-auto">
              No more endless group chats or last-minute cancellations. 
              Join organized games in your area, instantly.
            </p>
            <button 
              onClick={handleFindGamesNearMe}
              className="bg-white text-blue-600 px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2 mx-auto"
            >
              <MapPin className="size-5" />
              Find Games Near Me
            </button>
          </div>
        </div>

        {/* Sport Filter */}
        <div className="sticky top-[61px] z-10 bg-white border-b border-gray-200 px-4 py-3.5">
          <div className="max-w-2xl mx-auto">
            <SportFilter 
              selected={selectedSport} 
              onSelect={setSelectedSport} 
            />
          </div>
        </div>

        {/* Early Access Banner */}
        <div className="px-4 py-4">
          <div className="max-w-2xl mx-auto">
            <EarlyAccessBanner onGetAccess={() => setShowEmailModal(true)} />
          </div>
        </div>

        {/* Games List */}
        <div className="px-4 py-2">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-base text-gray-900">
                {filteredGames.length} {filteredGames.length === 1 ? 'Game' : 'Games'} Available
              </h2>
            </div>

            {filteredGames.map(game => (
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
                  className="mt-4 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  View all games
                </button>
              </div>
            )}
          </div>
        </div>
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