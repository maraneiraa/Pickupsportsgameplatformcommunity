export type Sport = 'basketball' | 'soccer' | 'volleyball' | 'running' | 'pickleball';
export type SkillLevel = 'casual' | 'intermediate' | 'competitive';

export interface Game {
  id: string;
  sport: Sport;
  title: string;
  location: string;
  address: string;
  date: string;
  time: string;
  currentPlayers: number;
  maxPlayers: number;
  skillLevel: SkillLevel;
  isOutdoor: boolean;
  weatherCondition?: 'sunny' | 'cloudy' | 'rainy' | 'hot';
  temperature?: number;
  hostName: string;
  description: string;
  distance: number; // in miles
}

export const mockGames: Game[] = [
  {
    id: '1',
    sport: 'basketball',
    title: '5v5 Full Court Run',
    location: 'Venice Beach Courts',
    address: '1800 Ocean Front Walk, Venice, CA',
    date: '2026-02-17',
    time: '6:00 PM',
    currentPlayers: 8,
    maxPlayers: 10,
    skillLevel: 'intermediate',
    isOutdoor: true,
    weatherCondition: 'sunny',
    temperature: 68,
    hostName: 'Marcus J.',
    description: 'Competitive but friendly run. Looking for 2 more players to round out the teams.',
    distance: 0.8
  },
  {
    id: '2',
    sport: 'soccer',
    title: 'Casual 7v7 Pickup',
    location: 'UCLA Intramural Field',
    address: 'Sunset Rec Fields, Los Angeles, CA',
    date: '2026-02-17',
    time: '4:30 PM',
    currentPlayers: 11,
    maxPlayers: 14,
    skillLevel: 'casual',
    isOutdoor: true,
    weatherCondition: 'cloudy',
    temperature: 58,
    hostName: 'Sofia R.',
    description: 'All skill levels welcome! Just looking to have fun and get some exercise.',
    distance: 1.2
  },
  {
    id: '3',
    sport: 'volleyball',
    title: 'Beach Volleyball - 4v4',
    location: 'Manhattan Beach',
    address: 'Manhattan Beach Pier, Manhattan Beach, CA',
    date: '2026-02-18',
    time: '10:00 AM',
    currentPlayers: 6,
    maxPlayers: 8,
    skillLevel: 'intermediate',
    isOutdoor: true,
    weatherCondition: 'sunny',
    temperature: 72,
    hostName: 'Tyler M.',
    description: 'Saturday morning beach volleyball. Intermediate players preferred but all welcome!',
    distance: 2.5
  },
  {
    id: '4',
    sport: 'pickleball',
    title: 'Doubles Round Robin',
    location: 'USC Lyon Center',
    address: '1026 Childs Way, Los Angeles, CA',
    date: '2026-02-17',
    time: '7:00 PM',
    currentPlayers: 8,
    maxPlayers: 12,
    skillLevel: 'casual',
    isOutdoor: false,
    hostName: 'Janet K.',
    description: 'Indoor courts, round robin format. Great for meeting new players!',
    distance: 1.8
  },
  {
    id: '5',
    sport: 'running',
    title: 'Wednesday Night 5K Run',
    location: 'Griffith Park Trails',
    address: '4730 Crystal Springs Dr, Los Angeles, CA',
    date: '2026-02-18',
    time: '6:30 PM',
    currentPlayers: 15,
    maxPlayers: 25,
    skillLevel: 'casual',
    isOutdoor: true,
    weatherCondition: 'cloudy',
    temperature: 65,
    hostName: 'Running Club LA',
    description: 'Weekly social run. We stick together and welcome all paces!',
    distance: 3.1
  },
  {
    id: '6',
    sport: 'basketball',
    title: '3v3 Half Court',
    location: 'Westwood Recreation Center',
    address: '1350 Sepulveda Blvd, Los Angeles, CA',
    date: '2026-02-17',
    time: '8:00 PM',
    currentPlayers: 5,
    maxPlayers: 6,
    skillLevel: 'competitive',
    isOutdoor: true,
    weatherCondition: 'cloudy',
    temperature: 62,
    hostName: 'DJ W.',
    description: 'Competitive 3v3. Looking for skilled players who can shoot and defend.',
    distance: 0.5
  },
  {
    id: '7',
    sport: 'soccer',
    title: 'Sunday Morning Kickabout',
    location: 'Santa Monica College Fields',
    address: '1900 Pico Blvd, Santa Monica, CA',
    date: '2026-02-23',
    time: '9:00 AM',
    currentPlayers: 14,
    maxPlayers: 20,
    skillLevel: 'intermediate',
    isOutdoor: true,
    weatherCondition: 'sunny',
    temperature: 64,
    hostName: 'LA Footie Crew',
    description: 'Regular Sunday game. Mix of experienced and newer players.',
    distance: 2.2
  },
  {
    id: '8',
    sport: 'volleyball',
    title: 'Indoor 6v6 Competitive',
    location: 'Loyola Marymount Gym',
    address: '1 LMU Drive, Los Angeles, CA',
    date: '2026-02-19',
    time: '7:30 PM',
    currentPlayers: 10,
    maxPlayers: 12,
    skillLevel: 'competitive',
    isOutdoor: false,
    hostName: 'Amanda P.',
    description: 'High-level play. Must have competitive experience. $5 court fee.',
    distance: 3.4
  },
  {
    id: '9',
    sport: 'pickleball',
    title: 'Morning Pickleball Social',
    location: 'Culver City Park',
    address: '9910 Jefferson Blvd, Culver City, CA',
    date: '2026-02-18',
    time: '8:00 AM',
    currentPlayers: 6,
    maxPlayers: 10,
    skillLevel: 'casual',
    isOutdoor: true,
    weatherCondition: 'sunny',
    temperature: 66,
    hostName: 'Bob S.',
    description: 'Friendly morning games. Coffee after at the local cafe!',
    distance: 2.8
  },
  {
    id: '10',
    sport: 'running',
    title: 'Sunset Beach Run - 3 Miles',
    location: 'Santa Monica Beach Path',
    address: 'Santa Monica State Beach, CA',
    date: '2026-02-18',
    time: '5:45 PM',
    currentPlayers: 8,
    maxPlayers: 15,
    skillLevel: 'intermediate',
    isOutdoor: true,
    weatherCondition: 'sunny',
    temperature: 70,
    hostName: 'Beach Runners',
    description: 'Scenic beach path run at sunset. Moderate pace (~9 min/mile).',
    distance: 1.9
  },
  {
    id: '11',
    sport: 'basketball',
    title: 'Lunchtime Hoops',
    location: 'UCLA Pauley Pavilion Outdoor Courts',
    address: '301 Westwood Plaza, Los Angeles, CA',
    date: '2026-02-17',
    time: '12:30 PM',
    currentPlayers: 7,
    maxPlayers: 10,
    skillLevel: 'casual',
    isOutdoor: true,
    weatherCondition: 'sunny',
    temperature: 70,
    hostName: 'Chris P.',
    description: 'Quick pickup game during lunch break. All levels welcome!',
    distance: 1.1
  },
  {
    id: '12',
    sport: 'soccer',
    title: 'Thursday Evening League',
    location: 'Penmar Golf Course Field',
    address: '1233 Rose Ave, Venice, CA',
    date: '2026-02-20',
    time: '6:00 PM',
    currentPlayers: 16,
    maxPlayers: 18,
    skillLevel: 'intermediate',
    isOutdoor: true,
    weatherCondition: 'cloudy',
    temperature: 66,
    hostName: 'Venice FC',
    description: 'Weekly pickup league. Fast-paced and fun!',
    distance: 1.5
  }
];