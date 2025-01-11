import React from 'react';
import { motion } from 'framer-motion';
import type { Achievement } from '../types';

interface AchievementCardProps {
  achievement: Achievement;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4"
    >
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <span className="text-2xl">{achievement.icon}</span>
      </div>
      <div>
        <h3 className="font-semibold text-lg">{achievement.title}</h3>
        <p className="text-gray-600 text-sm">{achievement.description}</p>
        {achievement.unlockedAt && (
          <p className="text-xs text-gray-400 mt-1">
            Unlocked: {achievement.unlockedAt.toLocaleDateString()}
          </p>
        )}
      </div>
    </motion.div>
  );
}
