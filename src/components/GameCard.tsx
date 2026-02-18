import { MapPin, Calendar, Clock, Users, CloudRain, Cloud, Sun, Thermometer, Navigation } from 'lucide-react';
import { type Game, type SkillLevel } from '../data/mockGames';

interface GameCardProps {
  game: Game;
  onJoin: () => void;
}

const skillLevelColors: Record<SkillLevel, string> = {
  casual: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  competitive: 'bg-red-100 text-red-800',
};

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  hot: Thermometer,
};

export function GameCard({ game, onJoin }: GameCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  const spotsLeft = game.maxPlayers - game.currentPlayers;
  const WeatherIcon = game.weatherCondition ? weatherIcons[game.weatherCondition] : null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-4 pb-3 border-b border-gray-100">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{game.title}</h3>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${skillLevelColors[game.skillLevel]}`}>
                {game.skillLevel}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-blue-600 font-medium">
              <Navigation className="size-4" />
              <span>{game.distance} mi away</span>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 space-y-3">
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="size-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-gray-900">{game.location}</p>
            <p className="text-gray-500 text-xs">{game.address}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-gray-400" />
            <span className="text-gray-700">{formatDate(game.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-gray-400" />
            <span className="text-gray-700">{game.time}</span>
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2">
            <Users className="size-5 text-green-700" />
            <div>
              <p className="text-sm font-semibold text-green-900">
                {game.currentPlayers} players confirmed
              </p>
              <p className="text-xs text-green-700">
                {spotsLeft > 0 ? `${spotsLeft} ${spotsLeft === 1 ? 'spot' : 'spots'} left` : 'Game is full'}
              </p>
            </div>
          </div>
          {spotsLeft <= 3 && spotsLeft > 0 && (
            <span className="text-xs font-semibold text-orange-700 bg-orange-100 px-2 py-1 rounded-md">
              Filling up!
            </span>
          )}
        </div>

        {/* Weather Alert */}
        {game.isOutdoor && WeatherIcon && (
          <div className="flex items-center gap-2 p-2.5 bg-blue-50 rounded-lg text-sm border border-blue-200">
            <WeatherIcon className="size-4 text-blue-600" />
            <span className="text-blue-900">
              {game.temperature}°F · {game.weatherCondition}
            </span>
            {game.weatherCondition === 'rainy' && (
              <span className="ml-auto text-xs font-medium text-blue-700">Check forecast</span>
            )}
          </div>
        )}

        {/* Host Info */}
        <div className="flex items-center gap-2 pt-1">
          <div className="size-8 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-semibold">
              {game.hostName.charAt(0)}
            </span>
          </div>
          <span className="text-sm text-gray-600">Hosted by {game.hostName}</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-4 pt-0">
        <button 
          onClick={onJoin}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={spotsLeft === 0}
        >
          {spotsLeft === 0 ? 'Game Full' : 'Join Game'}
        </button>
      </div>
    </div>
  );
}