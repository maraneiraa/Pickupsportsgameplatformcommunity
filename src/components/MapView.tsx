import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Search, SlidersHorizontal, Navigation as NavigationIcon, ZoomIn, ZoomOut } from 'lucide-react';
import { GameBottomSheet } from './GameBottomSheet';
import { FilterPanel } from './FilterPanel';
import { type Game, type Sport, type SkillLevel } from '../data/mockGames';

interface MapViewProps {
  games: Game[];
  onBack: () => void;
  onJoinGame: (game: Game) => void;
  userLocation: { lat: number; lng: number };
}

const sportColors: Record<string, string> = {
  basketball: '#f97316', // orange
  soccer: '#22c55e', // green
  volleyball: '#3b82f6', // blue
  pickleball: '#a855f7', // purple
  running: '#ef4444', // red
};

interface GameMarker {
  id: string;
  x: number;
  y: number;
  game: Game;
}

export function MapView({ games, onBack, onJoinGame, userLocation }: MapViewProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    sports: [] as Sport[],
    skillLevels: [] as SkillLevel[],
    dateFilter: 'any',
    maxDistance: 10,
  });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameMarkers, setGameMarkers] = useState<GameMarker[]>([]);

  // Filter games based on current filters
  const filteredGames = games.filter(game => {
    if (filters.sports.length > 0 && !filters.sports.includes(game.sport)) return false;
    if (filters.skillLevels.length > 0 && !filters.skillLevels.includes(game.skillLevel)) return false;
    if (game.distance > filters.maxDistance) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return game.title.toLowerCase().includes(query) || 
             game.location.toLowerCase().includes(query) ||
             game.address.toLowerCase().includes(query);
    }
    return true;
  });

  // Generate marker positions
  useEffect(() => {
    const markers: GameMarker[] = filteredGames.map((game, index) => {
      // Generate random positions in a circle around center
      const angle = (index / filteredGames.length) * Math.PI * 2;
      const radius = 100 + Math.random() * 150;
      const x = 400 + Math.cos(angle) * radius;
      const y = 300 + Math.sin(angle) * radius;
      
      return { id: game.id, x, y, game };
    });
    setGameMarkers(markers);
  }, [filteredGames]);

  // Draw map
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Apply zoom and pan
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i < 20; i++) {
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(i * 50, 0);
      ctx.lineTo(i * 50, 1000);
      ctx.stroke();
      
      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(0, i * 50);
      ctx.lineTo(1000, i * 50);
      ctx.stroke();
    }

    // Draw roads/paths
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 1000);
    ctx.moveTo(600, 0);
    ctx.lineTo(600, 1000);
    ctx.moveTo(0, 300);
    ctx.lineTo(1000, 300);
    ctx.moveTo(0, 600);
    ctx.lineTo(1000, 600);
    ctx.stroke();

    // Draw green spaces (parks)
    ctx.fillStyle = '#86efac33';
    ctx.fillRect(50, 50, 120, 120);
    ctx.fillRect(680, 380, 140, 140);
    ctx.fillRect(250, 680, 160, 100);

    // Draw user location
    ctx.fillStyle = '#3b82f6';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(400, 300, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Draw game markers
    gameMarkers.forEach(marker => {
      const color = sportColors[marker.game.sport] || '#6b7280';
      const isSelected = selectedGame?.id === marker.game.id;
      const radius = isSelected ? 20 : 16;

      // Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.beginPath();
      ctx.arc(marker.x + 2, marker.y + 2, radius, 0, Math.PI * 2);
      ctx.fill();

      // Marker circle
      ctx.fillStyle = color;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(marker.x, marker.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Emoji
      ctx.font = `${isSelected ? '20px' : '16px'} sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(getSportEmoji(marker.game.sport), marker.x, marker.y);

      // Selection ring
      if (isSelected) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(marker.x, marker.y, radius + 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });

    ctx.restore();
  }, [gameMarkers, selectedGame, zoom, pan]);

  const getSportEmoji = (sport: string) => {
    const emojis: Record<string, string> = {
      basketball: '🏀',
      soccer: '⚽',
      volleyball: '🏐',
      pickleball: '🎾',
      running: '🏃',
    };
    return emojis[sport] || '🎯';
  };

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    // Find marker and pan to it
    const marker = gameMarkers.find(m => m.game.id === game.id);
    if (marker && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const targetX = rect.width / 2 - marker.x * zoom;
      const targetY = rect.height / 2 - marker.y * zoom;
      setPan({ x: targetX, y: targetY });
    }
  };

  const handleRecenter = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.5));
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicked on a marker
    const clickedMarker = gameMarkers.find(marker => {
      const markerX = marker.x * zoom + pan.x;
      const markerY = marker.y * zoom + pan.y;
      const distance = Math.sqrt((x - markerX) ** 2 + (y - markerY) ** 2);
      return distance < 20;
    });

    if (clickedMarker) {
      setSelectedGame(clickedMarker.game);
      setIsBottomSheetExpanded(false);
    } else {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="fixed inset-0 z-30 bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm relative z-50">
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="size-5 text-gray-700" />
          </button>
          
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search city, park, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(true)}
            className="p-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors relative"
          >
            <SlidersHorizontal className="size-5 text-white" />
            {(filters.sports.length > 0 || filters.skillLevels.length > 0 || filters.dateFilter !== 'any') && (
              <span className="absolute -top-1 -right-1 size-4 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </button>
        </div>

        {/* Active Filters */}
        {(filters.sports.length > 0 || filters.skillLevels.length > 0) && (
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-gray-600">Active filters:</span>
              {filters.sports.map(sport => (
                <span key={sport} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                  {sport}
                </span>
              ))}
              {filters.skillLevels.map(level => (
                <span key={level} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                  {level}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onMouseLeave={handleCanvasMouseUp}
        />
        
        {/* Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <button
            onClick={handleZoomIn}
            className="p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <ZoomIn className="size-5 text-gray-700" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <ZoomOut className="size-5 text-gray-700" />
          </button>
          <button
            onClick={handleRecenter}
            className="p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <NavigationIcon className="size-5 text-gray-700" />
          </button>
        </div>

        {/* Legend */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3 text-xs z-10">
          <div className="font-semibold mb-2 text-gray-900">Sports</div>
          <div className="space-y-1">
            {Object.entries(sportColors).map(([sport, color]) => (
              <div key={sport} className="flex items-center gap-2">
                <div 
                  className="size-3 rounded-full" 
                  style={{ backgroundColor: color }}
                ></div>
                <span className="text-gray-700 capitalize">{sport}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <GameBottomSheet
        games={filteredGames}
        selectedGame={selectedGame}
        onGameSelect={handleGameSelect}
        onJoinGame={onJoinGame}
        isExpanded={isBottomSheetExpanded}
        onToggleExpand={() => setIsBottomSheetExpanded(!isBottomSheetExpanded)}
      />

      {/* Filter Panel */}
      <FilterPanel
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFilterChange={setFilters}
      />
    </div>
  );
}