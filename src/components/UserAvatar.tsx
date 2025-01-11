import React from 'react';
import { User } from 'lucide-react';
import type { UserProfile } from '../types';

interface UserAvatarProps {
  user: UserProfile;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
}

export function UserAvatar({ user, size = 'md', showTooltip = true }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const displayName = user.privacySettings.showFullName 
    ? `${user.name} ${user.surname || ''}`
    : user.name;

  return (
    <div className="relative group">
      {user.privacySettings.showAvatar && user.avatar ? (
        <img
          src={user.avatar}
          alt={displayName}
          className={`${sizeClasses[size]} rounded-full object-cover`}
        />
      ) : (
        <div className={`${sizeClasses[size]} rounded-full bg-gray-200 flex items-center justify-center`}>
          {user.privacySettings.isAnonymous ? (
            <span className="text-gray-500 font-bold">DOX</span>
          ) : (
            <User className="w-1/2 h-1/2 text-gray-400" />
          )}
        </div>
      )}
      
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {user.privacySettings.isAnonymous ? (
            'Anonymous User'
          ) : (
            displayName
          )}
        </div>
      )}
    </div>
  );
}
