import React from 'react';
import { Shield, Eye, EyeOff, User } from 'lucide-react';
import type { UserProfile } from '../types';

interface PrivacySettingsProps {
  user: UserProfile;
  onUpdateSettings: (settings: UserProfile['privacySettings']) => void;
}

export function PrivacySettings({ user, onUpdateSettings }: PrivacySettingsProps) {
  const handleToggle = (key: keyof UserProfile['privacySettings']) => {
    const newSettings = {
      ...user.privacySettings,
      [key]: !user.privacySettings[key]
    };

    // If user becomes anonymous, automatically hide full name
    if (key === 'isAnonymous' && newSettings.isAnonymous) {
      newSettings.showFullName = false;
    }

    onUpdateSettings(newSettings);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Shield className="w-6 h-6 mr-2" />
        Privacy Settings
      </h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-600" />
            <span>Anonymous Mode</span>
          </div>
          <button
            onClick={() => handleToggle('isAnonymous')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              user.privacySettings.isAnonymous ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                user.privacySettings.isAnonymous ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {!user.privacySettings.isAnonymous && (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-gray-600" />
                <span>Show Full Name</span>
              </div>
              <button
                onClick={() => handleToggle('showFullName')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  user.privacySettings.showFullName ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    user.privacySettings.showFullName ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <EyeOff className="w-5 h-5 text-gray-600" />
                <span>Show Avatar</span>
              </div>
              <button
                onClick={() => handleToggle('showAvatar')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  user.privacySettings.showAvatar ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    user.privacySettings.showAvatar ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </>
        )}
      </div>

      {user.privacySettings.isAnonymous && (
        <p className="mt-4 text-sm text-gray-500">
          While in anonymous mode, only your first name will be visible to others.
          Your avatar will be replaced with a DOX symbol.
        </p>
      )}
    </div>
  );
}