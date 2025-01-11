import React from 'react';
import { BarChart, Eye, MessageCircle, Heart, Clock, TrendingUp, Users } from 'lucide-react';

interface EngagementRate {
  rate: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

interface PostAnalyticsProps {
  postId: string;
  reach: number;
  likes: number;
  comments: number;
  shares: number;
  bestPostingTime: string;
  engagement: EngagementRate;
  loading?: boolean;
}

export function PostAnalytics({
  postId,
  reach,
  likes,
  comments,
  shares,
  bestPostingTime,
  engagement,
  loading = false
}: PostAnalyticsProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <BarChart className="w-6 h-6 mr-2 text-blue-500" />
          Post Analytics
        </h2>
        <div className="flex items-center space-x-2">
          <TrendingUp className={`w-5 h-5 ${getTrendColor(engagement.trend)}`} />
          <span className={`text-sm font-medium ${getTrendColor(engagement.trend)}`}>
            {engagement.change > 0 ? '+' : ''}{engagement.change}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-2xl font-bold">{reach.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Reach</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <div>
              <p className="text-2xl font-bold">{likes.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Likes</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{comments.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Comments</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-2xl font-bold">{shares.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Shares</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm font-medium">Best time to post</p>
            <p className="text-lg font-bold text-blue-600">{bestPostingTime}</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500">
          Engagement rate: {engagement.rate.toFixed(2)}%
        </p>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
          <div
            className="h-full bg-blue-500 rounded-full"
            style={{ width: `${Math.min(engagement.rate, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
