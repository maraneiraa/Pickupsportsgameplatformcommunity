import { ChevronUp, Navigation, Clock, Users } from 'lucide-react';
import { type Game } from '../data/mockGames';

interface GameBottomSheetProps {
  games: Game[];
  selectedGame: Game | null;
  onGameSelect: (game: Game) => void;
  onJoinGame: (game: Game) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const sportIcons: Record<string, string> = {
  basketball: '🏀',
  soccer: '⚽',
  volleyball: '🏐',
  pickleball: '🎾',
  running: '🏃',
};

const skillLevelColors: Record<string, string> = {
  casual: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  competitive: 'bg-red-100 text-red-800',
};

export function GameBottomSheet({ 
  games, 
  selectedGame, 
  onGameSelect, 
  onJoinGame,
  isExpanded,
  onToggleExpand 
}: GameBottomSheetProps) {
  
  const getUrgencyTag = (game: Game) => {
    const gameDateTime = new Date(`${game.date}T${convertTo24Hour(game.time)}`);
    const now = new Date();
    const diffHours = Math.floor((gameDateTime.getTime() - now.getTime()) / (1000 * 60 * 60));
    const spotsLeft = game.maxPlayers - game.currentPlayers;

    if (diffHours <= 1 && diffHours >= 0) {
      return { text: 'Happening Now', color: 'bg-green-600 text-white' };
    } else if (diffHours <= 3 && diffHours > 1) {
      return { text: 'Starting Soon', color: 'bg-blue-600 text-white' };
    } else if (spotsLeft <= 2 && spotsLeft > 0) {
      return { text: 'Almost Full', color: 'bg-orange-600 text-white' };
    }
    return null;
  };

  const convertTo24Hour = (time12h: string) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = String(parseInt(hours, 10) + 12);
    }
    return `${hours}:${minutes}:00`;
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl transition-all duration-300 z-40 ${
        isExpanded ? 'h-[75vh]' : 'h-[45vh]'
      }`}
    >
      {/* Handle */}
      <div 
        onClick={onToggleExpand}
        className="flex justify-center items-center py-3 cursor-pointer border-b border-gray-200"
      >
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
            <span className="font-medium">{games.length} games nearby</span>
            <ChevronUp className={`size-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </div>

      {/* Games List */}
      <div className="overflow-y-auto h-[calc(100%-60px)] p-4 space-y-3">
        {games.map(game => {
          const spotsLeft = game.maxPlayers - game.currentPlayers;
          const urgencyTag = getUrgencyTag(game);
          const isSelected = selectedGame?.id === game.id;

          return (
            <div
              key={game.id}
              onClick={() => onGameSelect(game)}
              className={`bg-white border rounded-lg p-4 cursor-pointer transition-all ${
                isSelected 
                  ? 'border-blue-600 shadow-md ring-2 ring-blue-100' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Sport Icon */}
                <div className="size-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                  {sportIcons[game.sport]}
                </div>

                {/* Game Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-base mb-1">{game.title}</h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${skillLevelColors[game.skillLevel]}`}>
                          {game.skillLevel}
                        </span>
                        {urgencyTag && (
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${urgencyTag.color}`}>
                            {urgencyTag.text}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="size-4" />
                        <span>{game.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Navigation className="size-4" />
                        <span>{game.distance} mi</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Users className="size-4 text-gray-400" />
                      <span className="text-gray-700 font-medium">
                        {game.currentPlayers}/{game.maxPlayers} players
                      </span>
                      <span className="text-gray-500">
                        · {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} left
                      </span>
                    </div>
                  </div>

                  {/* Join Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onJoinGame(game);
                    }}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
                    disabled={spotsLeft === 0}
                  >
                    {spotsLeft === 0 ? 'Game Full' : 'Join Game'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
