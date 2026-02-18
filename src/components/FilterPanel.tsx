import { X } from 'lucide-react';
import { type Sport, type SkillLevel } from '../data/mockGames';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    sports: Sport[];
    skillLevels: SkillLevel[];
    dateFilter: string;
    maxDistance: number;
  };
  onFilterChange: (filters: any) => void;
}

const sportOptions: { id: Sport; label: string; icon: string }[] = [
  { id: 'basketball', label: 'Basketball', icon: '🏀' },
  { id: 'soccer', label: 'Soccer', icon: '⚽' },
  { id: 'volleyball', label: 'Volleyball', icon: '🏐' },
  { id: 'pickleball', label: 'Pickleball', icon: '🎾' },
  { id: 'running', label: 'Running', icon: '🏃' },
];

const skillOptions: { id: SkillLevel; label: string }[] = [
  { id: 'casual', label: 'Casual' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'competitive', label: 'Competitive' },
];

const dateOptions = [
  { id: 'today', label: 'Today' },
  { id: 'tomorrow', label: 'Tomorrow' },
  { id: 'this-week', label: 'This Week' },
  { id: 'any', label: 'Anytime' },
];

export function FilterPanel({ isOpen, onClose, filters, onFilterChange }: FilterPanelProps) {
  if (!isOpen) return null;

  const toggleSport = (sport: Sport) => {
    const newSports = filters.sports.includes(sport)
      ? filters.sports.filter(s => s !== sport)
      : [...filters.sports, sport];
    onFilterChange({ ...filters, sports: newSports });
  };

  const toggleSkillLevel = (level: SkillLevel) => {
    const newLevels = filters.skillLevels.includes(level)
      ? filters.skillLevels.filter(l => l !== level)
      : [...filters.skillLevels, level];
    onFilterChange({ ...filters, skillLevels: newLevels });
  };

  const clearFilters = () => {
    onFilterChange({
      sports: [],
      skillLevels: [],
      dateFilter: 'any',
      maxDistance: 10,
    });
  };

  const activeFilterCount = filters.sports.length + filters.skillLevels.length + 
    (filters.dateFilter !== 'any' ? 1 : 0) + (filters.maxDistance !== 10 ? 1 : 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-2xl w-full max-w-2xl overflow-hidden animate-slide-up shadow-lg max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-lg">Filters</h2>
            {activeFilterCount > 0 && (
              <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="size-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-4 space-y-6">
          {/* Sport Type */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-3">Sport Type</h3>
            <div className="flex flex-wrap gap-2">
              {sportOptions.map(sport => (
                <button
                  key={sport.id}
                  onClick={() => toggleSport(sport.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${filters.sports.includes(sport.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }
                  `}
                >
                  <span>{sport.icon}</span>
                  <span>{sport.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Skill Level */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-3">Skill Level</h3>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map(level => (
                <button
                  key={level.id}
                  onClick={() => toggleSkillLevel(level.id)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${filters.skillLevels.includes(level.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }
                  `}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-3">Date & Time</h3>
            <div className="grid grid-cols-2 gap-2">
              {dateOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => onFilterChange({ ...filters, dateFilter: option.id })}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${filters.dateFilter === option.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Distance */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-gray-900">Maximum Distance</h3>
              <span className="text-sm font-medium text-blue-600">{filters.maxDistance} miles</span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="1"
              value={filters.maxDistance}
              onChange={(e) => onFilterChange({ ...filters, maxDistance: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 mi</span>
              <span>25 mi</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex gap-3">
          <button
            onClick={clearFilters}
            className="flex-1 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors border border-gray-300"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
}
