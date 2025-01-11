import React, { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { Timeline } from './components/Timeline';
import { AchievementCard } from './components/AchievementCard';
import { FriendshipStats } from './components/FriendshipStats';
import { MemorableQuotes } from './components/MemorableQuotes';
import { SpecialDates } from './components/SpecialDates';
import { PrivacySettings } from './components/PrivacySettings';
import { UserAvatar } from './components/UserAvatar';
import type { TimelineEvent, Achievement, FriendshipStats as Stats, UserProfile } from './types';

// Mock user data
const mockCurrentUser: UserProfile = {
  id: '1',
  name: 'Alex',
  surname: 'Smith',
  avatar: 'https://source.unsplash.com/random/200x200/?portrait',
  privacySettings: {
    isAnonymous: false,
    showFullName: true,
    showAvatar: true
  }
};

// Mock data - replace with real data from your backend
const mockStats: Stats = {
  startDate: new Date('2023-01-01'),
  totalMessages: 1523,
  totalPhotos: 89,
  totalVoiceMessages: 45,
  commonTopics: [
    { topic: 'Music', count: 156 },
    { topic: 'Movies', count: 89 },
    { topic: 'Food', count: 67 }
  ],
  locations: [
    { lat: 51.5074, lng: -0.1278, title: 'London Coffee Meet' }
  ],
  memorableQuotes: [
    {
      text: "Remember when we first met? I knew we'd be great friends!",
      date: new Date('2023-01-01'),
      author: 'Alex',
      context: 'First day of chat',
      user: mockCurrentUser
    },
    {
      text: "This is why we're best friends 😂",
      date: new Date('2023-06-15'),
      author: 'Sam',
      context: 'After sharing a funny meme'
    }
  ],
  specialDates: [
    {
      date: new Date('2023-01-01'),
      title: 'First Connection',
      type: 'milestone',
      description: 'The day we first started chatting'
    },
    {
      date: new Date('2023-03-15'),
      title: '100 Days of Friendship',
      type: 'anniversary',
      description: 'A hundred days of amazing conversations!'
    }
  ],
  users: {
    user1: mockCurrentUser,
    user2: {
      id: '2',
      name: 'Sam',
      privacySettings: {
        isAnonymous: true,
        showFullName: false,
        showAvatar: false
      }
    }
  }
};

function App() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProfile>(mockCurrentUser);

  useEffect(() => {
    // Initialize Telegram Mini App
    WebApp.ready();
    
    // Load data - replace with your actual data loading logic
    setEvents([
      {
        id: '1',
        date: new Date('2023-01-01'),
        title: 'First Message',
        description: 'The beginning of a great friendship!',
        type: 'message',
        metadata: {
          user: mockCurrentUser
        }
      },
      {
        id: '2',
        date: new Date('2023-02-15'),
        title: 'First Photo Share',
        description: 'Started sharing memories together',
        type: 'photo',
        metadata: {
          imageUrl: 'https://source.unsplash.com/random/800x600/?friendship',
          user: mockStats.users.user2
        }
      }
    ]);

    setAchievements([
      {
        id: '1',
        title: 'First Day Friends',
        description: 'Started your friendship journey',
        icon: '🌟',
        category: 'milestone',
        unlockedAt: new Date('2023-01-01')
      },
      {
        id: '2',
        title: 'Photo Enthusiasts',
        description: 'Shared 50+ photos together',
        icon: '📸',
        category: 'activity',
        progress: {
          current: 50,
          total: 100
        }
      }
    ]);
  }, []);

  const handleUpdatePrivacySettings = (settings: UserProfile['privacySettings']) => {
    setCurrentUser(prev => ({
      ...prev,
      privacySettings: settings
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Your Friendship Story</h1>
          <div className="flex items-center space-x-4">
            <UserAvatar user={currentUser} size="lg" />
            <UserAvatar user={mockStats.users.user2} size="lg" />
          </div>
        </div>

        <div className="mb-8">
          <PrivacySettings
            user={currentUser}
            onUpdateSettings={handleUpdatePrivacySettings}
          />
        </div>

        <div className="mb-8">
          <FriendshipStats stats={mockStats} />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map(achievement => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
              />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <SpecialDates dates={mockStats.specialDates} />
        </div>

        <div className="mb-8">
          <MemorableQuotes quotes={mockStats.memorableQuotes} />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Timeline</h2>
          <Timeline events={events} />
        </div>
      </div>
    </div>
  );
}

export default App;