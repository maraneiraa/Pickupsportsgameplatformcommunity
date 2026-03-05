export type NotificationCategory = 'game-updates' | 'invites' | 'reminders' | 'social';

export interface Notification {
  id: string;
  category: NotificationCategory;
  sportEmoji: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  relativeTime: string;
}

export const mockNotifications: Notification[] = [
  {
    id: '1',
    category: 'reminders',
    sportEmoji: '🏀',
    message: 'Your basketball game starts in 30 minutes at Venice Beach Courts',
    timestamp: '2026-03-03T14:30:00',
    isRead: false,
    relativeTime: '30 min ago',
  },
  {
    id: '2',
    category: 'social',
    sportEmoji: '⚽',
    message: 'Alex joined your Sunday Morning Soccer League game',
    timestamp: '2026-03-03T13:15:00',
    isRead: false,
    relativeTime: '1 hour ago',
  },
  {
    id: '3',
    category: 'game-updates',
    sportEmoji: '🏐',
    message: 'Game location updated: Sunset Volleyball moved to Manhattan Beach',
    timestamp: '2026-03-03T10:45:00',
    isRead: false,
    relativeTime: '3 hours ago',
  },
  {
    id: '4',
    category: 'invites',
    sportEmoji: '🎾',
    message: 'Jordan invited you to join Friday Night Pickleball at Griffith Park',
    timestamp: '2026-03-02T18:20:00',
    isRead: true,
    relativeTime: 'Yesterday',
  },
  {
    id: '5',
    category: 'game-updates',
    sportEmoji: '🏃',
    message: '5 new players joined your running group this week',
    timestamp: '2026-03-02T09:00:00',
    isRead: true,
    relativeTime: 'Yesterday',
  },
  {
    id: '6',
    category: 'social',
    sportEmoji: '🏀',
    message: 'Marcus commented: "Great game yesterday! Same time next week?"',
    timestamp: '2026-03-01T20:30:00',
    isRead: true,
    relativeTime: '2 days ago',
  },
];
