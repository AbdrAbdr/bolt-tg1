import React from 'react';
import { User } from 'lucide-react';
import type { UserProfile } from '../types';

interface UserAvatarProps {
  user: UserProfile | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTooltip?: boolean;
  onClick?: () => void;
}

export function UserAvatar({ 
  user, 
  size = 'md', 
  showTooltip = true,
  onClick 
}: UserAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10'
  };

  if (!user) {
    return <div className={`${sizeClasses[size]} rounded-full bg-gray-200 flex items-center justify-center`}>
      <User className={`${iconSizes[size]} text-gray-400`} />
    </div>;
  }

  const displayName = user.privacySettings.showFullName 
    ? `${user.name} ${user.surname || ''}`
    : user.name;

  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`
          relative
          rounded-full
          overflow-hidden
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:ring-offset-2
          ${onClick ? 'cursor-pointer hover:opacity-90' : 'cursor-default'}
        `}
      >
        {user.privacySettings.showAvatar && user.avatar ? (
          <img
            src={user.avatar}
            alt={displayName}
            className={`
              ${sizeClasses[size]}
              object-cover
              transition-opacity
              duration-200
            `}
          />
        ) : (
          <div className={`
            ${sizeClasses[size]}
            bg-gray-200
            flex
            items-center
            justify-center
            transition-colors
            duration-200
            ${user.privacySettings.isAnonymous ? 'bg-gray-300' : 'bg-blue-100'}
          `}>
            {user.privacySettings.isAnonymous ? (
              <span className="text-gray-500 font-bold text-sm">
                {size === 'sm' ? 'A' : 'ANON'}
              </span>
            ) : (
              <User className={`${iconSizes[size]} ${user.privacySettings.isAnonymous ? 'text-gray-400' : 'text-blue-500'}`} />
            )}
          </div>
        )}

        {user.privacySettings.isAnonymous && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-10 rounded-full" />
        )}
      </button>
      
      {showTooltip && (
        <div className="
          absolute 
          bottom-full 
          left-1/2 
          transform 
          -translate-x-1/2 
          mb-2 
          px-2 
          py-1 
          bg-gray-900 
          text-white 
          text-xs 
          rounded 
          opacity-0 
          group-hover:opacity-100 
          transition-opacity 
          whitespace-nowrap
          pointer-events-none
        ">
          {user.privacySettings.isAnonymous ? (
            'Anonymous User'
          ) : (
            displayName
          )}
        </div>
      )}

      {user.privacySettings.isAnonymous && showTooltip && (
        <div className="
          absolute 
          top-full 
          left-1/2 
          transform 
          -translate-x-1/2 
          mt-1 
          px-2 
          py-1 
          bg-yellow-100 
          text-yellow-800 
          text-xs 
          rounded 
          opacity-0 
          group-hover:opacity-100 
          transition-opacity 
          whitespace-nowrap
          pointer-events-none
        ">
          Privacy Mode Active
        </div>
      )}
    </div>
  );
}
