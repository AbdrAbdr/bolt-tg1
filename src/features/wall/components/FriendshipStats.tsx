import React from 'react';
import { MessageCircle, Image, Mic, MapPin, Hash } from 'lucide-react';
import type { FriendshipStats as Stats } from '../types';

interface FriendshipStatsProps {
  stats: Stats;
}

export function FriendshipStats({ stats }: FriendshipStatsProps) {
  const duration = Math.floor(
    (new Date().getTime() - stats.startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Friendship Statistics</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <MessageCircle className="w-6 h-6 text-blue-500" />
          <div>
            <p className="text-2xl font-bold">{stats.totalMessages.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Messages</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Image className="w-6 h-6 text-blue-500" />
          <div>
            <p className="text-2xl font-bold">{stats.totalPhotos.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Photos</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Mic className="w-6 h-6 text-blue-500" />
          <div>
            <p className="text-2xl font-bold">{stats.totalVoiceMessages.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Voice Messages</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <MapPin className="w-6 h-6 text-blue-500" />
          <div>
            <p className="text-2xl font-bold">{stats.locations.length}</p>
            <p className="text-sm text-gray-600">Places</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <Hash className="w-5 h-5 mr-2" />
          Common Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {stats.commonTopics.map((topic) => (
            <span
              key={topic.topic}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {topic.topic} ({topic.count})
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-600">
          {duration} days of friendship and counting!
        </p>
      </div>
    </div>
  );
}
