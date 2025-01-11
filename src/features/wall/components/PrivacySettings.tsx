import React from 'react';
import { Shield, Eye, EyeOff, User } from 'lucide-react';
import type { UserProfile } from '../types';

interface PrivacySettingsProps {
  user: UserProfile | null;
  onUpdateSettings: (settings: UserProfile['privacySettings']) => void;
}

export function PrivacySettings({ user, onUpdateSettings }: PrivacySettingsProps) {
  if (!user) {
    return <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold flex items-center">
        <Shield className="w-6 h-6 mr-2 text-blue-500" />
        Privacy Settings
      </h2>
      <p className="text-center text-gray-500">Loading privacy settings...</p>
    </div>;
  }

  const handleToggle = (key: keyof UserProfile['privacySettings']) => {
    const newSettings = {
      ...user.privacySettings,
      [key]: !user.privacySettings[key]
    };

    // If user becomes anonymous, automatically hide full name and avatar
    if (key === 'isAnonymous' && newSettings.isAnonymous) {
      newSettings.showFullName = false;
      newSettings.showAvatar = false;
    }

    onUpdateSettings(newSettings);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <Shield className="w-6 h-6 mr-2 text-blue-500" />
          Privacy Settings
        </h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-600" />
            <div>
              <span className="font-medium">Anonymous Mode</span>
              <p className="text-sm text-gray-500">Hide your identity from other users</p>
            </div>
          </div>
          <button
            onClick={() => handleToggle('isAnonymous')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
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
                <div>
                  <span className="font-medium">Show Full Name</span>
                  <p className="text-sm text-gray-500">Display your full name to others</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('showFullName')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
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
                <div>
                  <span className="font-medium">Show Avatar</span>
                  <p className="text-sm text-gray-500">Display your profile picture</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('showAvatar')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
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
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> While in anonymous mode, only your first name will be visible to others.
            Your avatar will be replaced with a default icon.
          </p>
        </div>
      )}
    </div>
  );
}
