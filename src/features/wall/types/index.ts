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
  friends?: string[];
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
    type: 'milestone' | 'anniversary' | 'meetup';
    description?: string;
  }>;
  users: {
    user1: UserProfile;
    user2: UserProfile;
  };
}

export interface TimelineEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  type: 'message' | 'photo' | 'voice' | 'location' | 'milestone';
  metadata?: {
    imageUrl?: string;
    user?: UserProfile;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'milestone' | 'activity' | 'special' | 'social' | 'referral';
  unlockedAt?: Date;
  progress?: {
    current: number;
    total: number;
  };
  criteria?: {
    type: 'posts' | 'reactions' | 'comments' | 'visits' | 'messages' | 'duration' | 'groups' | 'media' | 'referrals';
    target: number;
    unit?: 'days' | 'messages' | 'photos' | 'voice' | 'stickers' | 'locations' | 'friends';
  };
}

export interface VirtualCurrency {
  userId: string;
  balance: number;
  transactions: Array<{
    id: string;
    type: 'earned' | 'spent';
    amount: number;
    reason: string;
    timestamp: Date;
  }>;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'achievement' | 'new_friend';
  userId: string;
  postId?: string;
  message: string;
  read: boolean;
  timestamp: Date;
}

export interface Collection {
  id: string;
  name: string;
  cover?: string;
  postIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  formattedContent?: {
    bold?: boolean;
    italic?: boolean;
    links?: string[];
  };
  attachments?: {
    type: 'photo' | 'video' | 'sticker' | 'voice' | 'music';
    url: string;
    thumbnail?: string;
  }[];
  reactions: {
    type: 'like' | 'heart' | 'laugh' | 'wow';
    count: number;
    userIds: string[];
  }[];
  isPinned: boolean;
  isArchived: boolean;
  visibility: 'all' | 'friends' | 'selected' | 'private';
  selectedFriends?: string[];
  createdAt: Date;
  updatedAt: Date;
}
