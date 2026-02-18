import { CheckCircle, MapPin, Calendar, Clock, Users, X } from 'lucide-react';
import { type Game } from '../data/mockGames';

interface ConfirmationModalProps {
  game: Game | null;
  onClose: () => void;
}

export function ConfirmationModal({ game, onClose }: ConfirmationModalProps) {
  if (!game) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTimeUntilGame = () => {
    const gameDateTime = new Date(`${game.date}T${convertTo24Hour(game.time)}`);
    const now = new Date();
    const diffMs = gameDateTime.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `in ${diffDays} ${diffDays === 1 ? 'day' : 'days'}`;
    } else if (diffHours > 0) {
      return `in ${diffHours} ${diffHours === 1 ? 'hour' : 'hours'}`;
    } else {
      return 'soon';
    }
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

  const updatedPlayerCount = game.currentPlayers + 1;
  const spotsLeft = game.maxPlayers - updatedPlayerCount;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md overflow-hidden animate-slide-up shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="font-semibold text-lg">You're In!</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="size-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Success Icon */}
          <div className="flex flex-col items-center mb-6">
            <div className="size-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="size-10 text-green-600" />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-center">
              Successfully Joined {game.title}
            </h3>
            <p className="text-gray-600 text-center text-sm leading-relaxed">
              Get ready to play {getTimeUntilGame()}!
            </p>
          </div>

          {/* Game Details */}
          <div className="space-y-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg space-y-3 border border-gray-200">
              <div className="flex items-start gap-3">
                <MapPin className="size-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">{game.location}</p>
                  <p className="text-sm text-gray-500">{game.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-gray-400" />
                  <span className="text-sm text-gray-700">{formatDate(game.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-5 text-gray-400" />
                  <span className="text-sm text-gray-700">{game.time}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Users className="size-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {updatedPlayerCount} / {game.maxPlayers} players
                    </p>
                    <p className="text-xs text-gray-500">
                      {spotsLeft > 0 ? `${spotsLeft} ${spotsLeft === 1 ? 'spot' : 'spots'} remaining` : 'Game is now full'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Remaining Alert */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-semibold text-blue-900 mb-1">
                Don't forget! Game starts {getTimeUntilGame()}
              </p>
              <p className="text-xs text-blue-700 leading-relaxed">
                We'll send you a reminder 1 hour before game time.
              </p>
            </div>

            {/* Host Info */}
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="size-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold">
                  {game.hostName.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Hosted by {game.hostName}
                </p>
                <p className="text-xs text-gray-600">
                  Message host if you have questions
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={onClose}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              View My Games
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors border border-gray-300"
            >
              Add to Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}