export interface UserProfile {
  id: string;
  name: string;
  surname?: string;
  avatar?: string;
  privacySettings: {
    isAnonymous: boolean;
    showFullName: boolean;
    showAvatar: boolean;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  category: 'milestone' | 'activity' | 'special';
  progress?: {
    current: number;
    total: number;
  };
}

export interface TimelineEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  type: 'message' | 'photo' | 'voice' | 'location' | 'milestone' | 'quote';
  metadata?: {
    quote?: string;
    author?: string;
    imageUrl?: string;
    reaction?: string;
    user?: UserProfile;
  };
}

export interface FriendshipStats {
  startDate: Date;
  totalMessages: number;
  totalPhotos: number;
  totalVoiceMessages: number;
  commonTopics: Array<{ topic: string; count: number }>;
  locations: Array<{ lat: number; lng: number; title: string }>;
  memorableQuotes: Array<{
    text: string;
    date: Date;
    author: string;
    context?: string;
    user?: UserProfile;
  }>;
  specialDates: Array<{
    date: Date;
    title: string;
    type: 'anniversary' | 'milestone' | 'meetup';
    description?: string;
  }>;
  users: {
    user1: UserProfile;
    user2: UserProfile;
  };
}
