import React from 'react';
import { Trophy, Star, TrendingUp } from 'lucide-react';
import type { Achievement } from '../types';

interface AchievementsProps {
  achievements: Achievement[];
  userProgress: Record<string, number>;
}

export function Achievements({ achievements, userProgress }: AchievementsProps) {
  const calculateProgress = (achievement: Achievement) => {
    const current = userProgress[achievement.id] || 0;
    return Math.min((current / achievement.criteria.target) * 100, 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
          Achievements
        </h2>
        <button className="text-sm text-blue-500 hover:text-blue-600">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {achievements.map((achievement) => {
          const progress = calculateProgress(achievement);
          const isCompleted = progress === 100;

          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg ${
                isCompleted ? 'bg-green-50' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold flex items-center">
                    {achievement.name}
                    {isCompleted && (
                      <Star className="w-4 h-4 text-yellow-500 ml-2" />
                    )}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {achievement.description}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-blue-500">
                    {achievement.reward} coins
                  </span>
                </div>
              </div>

              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">
                    {userProgress[achievement.id] || 0} / {achievement.criteria.target}
                  </span>
                  <span className="text-xs font-medium text-gray-700">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isCompleted ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {!isCompleted && (
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>
                    {achievement.criteria.target - (userProgress[achievement.id] || 0)}{' '}
                    more {achievement.criteria.type} to go
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
