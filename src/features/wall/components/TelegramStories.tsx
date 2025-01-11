import React from 'react';
import { UserAvatar } from './UserAvatar';
import type { UserProfile } from '../types';

interface Story {
  id: string;
  userId: string;
  imageUrl: string;
  timestamp: Date;
}

interface TelegramStoriesProps {
  stories: Story[];
}

const mockStories: Story[] = [
  {
    id: '1',
    userId: '2',
    imageUrl: 'https://source.unsplash.com/random/200x300/?nature',
    timestamp: new Date()
  },
  {
    id: '2',
    userId: '3',
    imageUrl: 'https://source.unsplash.com/random/200x300/?city',
    timestamp: new Date()
  },
  {
    id: '3',
    userId: '4',
    imageUrl: 'https://source.unsplash.com/random/200x300/?food',
    timestamp: new Date()
  }
];

export function TelegramStories({ stories = mockStories }: TelegramStoriesProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">Telegram Stories</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {stories.map((story) => (
          <div key={story.id} className="relative">
            <UserAvatar user={{
              id: story.userId,
              name: 'User',
              avatar: story.imageUrl,
              privacySettings: {
                isAnonymous: false,
                showFullName: true,
                showAvatar: true
              }
            }} size="md" showTooltip={false} />
            <span className="absolute bottom-1 right-1 w-2 h-2 bg-green-500 rounded-full border border-white" />
          </div>
        ))}
      </div>
    </div>
  );
}
