import { type Sport } from '../data/mockGames';

const sports = [
  { id: 'all', label: 'All', icon: '🏃' },
  { id: 'basketball', label: 'Basketball', icon: '🏀' },
  { id: 'soccer', label: 'Soccer', icon: '⚽' },
  { id: 'volleyball', label: 'Volleyball', icon: '🏐' },
  { id: 'pickleball', label: 'Pickleball', icon: '🎾' },
  { id: 'running', label: 'Running', icon: '👟' },
] as const;

interface SportFilterProps {
  selected: Sport | 'all';
  onSelect: (sport: Sport | 'all') => void;
}

export function SportFilter({ selected, onSelect }: SportFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {sports.map(sport => (
        <button
          key={sport.id}
          onClick={() => onSelect(sport.id as Sport | 'all')}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all
            ${selected === sport.id 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }
          `}
        >
          <span className="text-base">{sport.icon}</span>
          <span>{sport.label}</span>
        </button>
      ))}
    </div>
  );
}