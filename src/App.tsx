import React, { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { UserWall } from './features/wall/components/UserWall';
import { AchievementCard } from './features/wall/components/AchievementCard';
import { FriendshipStats } from './features/wall/components/FriendshipStats';
import { MemorableQuotes } from './features/wall/components/MemorableQuotes';
import { SpecialDates } from './features/wall/components/SpecialDates';
import { PrivacySettings } from './features/wall/components/PrivacySettings';
import { UserAvatar } from './features/wall/components/UserAvatar';
import { ThemeCustomizer } from './features/wall/components/ThemeCustomizer';
import { Achievements } from './features/wall/components/Achievements';
import { VirtualCurrency } from './features/wall/components/VirtualCurrency';
import { ContentModeration } from './features/wall/components/ContentModeration';
import { Notifications } from './features/wall/components/Notifications';
import { useTheme } from './features/wall/hooks/useTheme';
import { useAchievements } from './features/wall/hooks/useAchievements';
import { useNotifications } from './features/wall/hooks/useNotifications';
import { useAuth } from './features/wall/hooks/useAuth';
import type { TimelineEvent, Achievement, FriendshipStats as Stats, UserProfile, Theme, VirtualCurrency as VirtualCurrencyType } from './features/wall/types';
import { useAnalytics } from './features/wall/hooks/useAnalytics';
import { PostAnalytics } from './features/wall/components/PostAnalytics';
import { useFriends } from './features/wall/hooks/useFriends';
import i18n from './i18n';
import { useTranslation } from 'react-i18next';
import { StatusPurchase } from './features/wall/components/StatusPurchase';
import { MiniGames } from './features/wall/components/MiniGames';
import { TelegramStories } from './features/wall/components/TelegramStories';
import { TelegramWallet } from './features/wall/components/TelegramWallet';
import { useUserStatus } from './features/wall/hooks/useUserStatus';

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
  },
  friends: ['2']
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

const mockVirtualCurrency: VirtualCurrencyType = {
  userId: 'user1',
  balance: 1250,
  transactions: [
    {
      id: '1',
      type: 'earned',
      amount: 500,
      reason: 'Daily login bonus',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'spent',
      amount: 200,
      reason: 'Purchased theme',
      timestamp: new Date()
    }
  ]
};

const mockReports = [
  {
    id: '1',
    postId: 'post1',
    reporterId: 'user2',
    reason: 'Inappropriate content',
    status: 'pending',
    timestamp: new Date()
  },
  {
    id: '2',
    postId: 'post2',
    reporterId: 'user3',
    reason: 'Spam',
    status: 'resolved',
    timestamp: new Date()
  }
];

export function App() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [achievementsData, setAchievementsData] = useState<Achievement[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const { themes, currentTheme, applyTheme, purchaseTheme } = useTheme();
  const { achievements, userProgress, checkAchievement } = useAchievements('user1');
  const { notifications, markAsRead, markAllAsRead } = useNotifications('user1');
  const { user, login, logout } = useAuth();
  const { friends, addFriend, removeFriend, checkFriendship } = useFriends('user1');
  const { t } = useTranslation();
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const { status, updateUserStatus } = useUserStatus('user1');

  useEffect(() => {
    // Initialize Telegram Mini App
    WebApp.ready();
    applyTheme(currentTheme);

    const userData = WebApp.initDataUnsafe?.user;
    if (userData) {
      setCurrentUser({
        id: String(userData.id),
        name: userData.first_name || '',
        surname: userData.last_name || '',
        avatar: userData.photo_url || '',
        privacySettings: {
          isAnonymous: false,
          showFullName: true,
          showAvatar: true
        },
        friends: ['2']
      });
    }

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

    setAchievementsData([
      {
        id: 'first-post',
        title: t('first_post'),
        description: t('first_post_description'),
        reward: 100,
        category: 'milestone',
        criteria: {
          type: 'posts',
          target: 1
        }
      },
      {
        id: 'popular-post',
        title: t('popular_post'),
        description: t('popular_post_description'),
        reward: 500,
        category: 'activity',
        criteria: {
          type: 'reactions',
          target: 100
        }
      },
      {
        id: 'engagement',
        title: t('engagement'),
        description: t('engagement_description'),
        reward: 300,
        category: 'activity',
        criteria: {
          type: 'comments',
          target: 50
        }
      },
      {
        id: 'wall-fame',
        title: t('wall_fame'),
        description: t('wall_fame_description'),
        reward: 1000,
        category: 'social',
        criteria: {
          type: 'visits',
          target: 1000
        }
      },
      {
        id: 'first-message',
        title: t('first_message'),
        description: t('first_message_description'),
        reward: 50,
        category: 'milestone',
        criteria: {
          type: 'messages',
          target: 1,
          unit: 'messages'
        }
      },
      {
        id: 'chatty-friend',
        title: t('chatty_friend'),
        description: t('chatty_friend_description'),
        reward: 1000,
        category: 'activity',
        criteria: {
          type: 'messages',
          target: 1000,
          unit: 'messages'
        }
      },
      {
        id: 'voice-master',
        title: t('voice_master'),
        description: t('voice_master_description'),
        reward: 500,
        category: 'activity',
        criteria: {
          type: 'messages',
          target: 50,
          unit: 'voice'
        }
      },
      {
        id: 'photo-archivist',
        title: t('photo_archivist'),
        description: t('photo_archivist_description'),
        reward: 400,
        category: 'activity',
        criteria: {
          type: 'messages',
          target: 20,
          unit: 'photos'
        }
      },
      {
        id: 'first-week',
        title: t('first_week'),
        description: t('first_week_description'),
        reward: 150,
        category: 'milestone',
        criteria: {
          type: 'duration',
          target: 7,
          unit: 'days'
        }
      },
      {
        id: 'month-together',
        title: t('month_together'),
        description: t('month_together_description'),
        reward: 300,
        category: 'milestone',
        criteria: {
          type: 'duration',
          target: 30,
          unit: 'days'
        }
      },
      {
        id: 'year-anniversary',
        title: t('year_anniversary'),
        description: t('year_anniversary_description'),
        reward: 1000,
        category: 'milestone',
        criteria: {
          type: 'duration',
          target: 365,
          unit: 'days'
        }
      },
      {
        id: 'eternal-friends',
        title: t('eternal_friends'),
        description: t('eternal_friends_description'),
        reward: 5000,
        category: 'milestone',
        criteria: {
          type: 'duration',
          target: 1825,
          unit: 'days'
        }
      },
      {
        id: 'group-fan',
        title: t('group_fan'),
        description: t('group_fan_description'),
        reward: 200,
        category: 'activity',
        criteria: {
          type: 'groups',
          target: 10,
          unit: 'messages'
        }
      },
      {
        id: 'active-participant',
        title: t('active_participant'),
        description: t('active_participant_description'),
        reward: 100,
        category: 'activity',
        criteria: {
          type: 'groups',
          target: 1,
          unit: 'messages'
        }
      },
      {
        id: 'group-for-two',
        title: t('group_for_two'),
        description: t('group_for_two_description'),
        reward: 300,
        category: 'activity',
        criteria: {
          type: 'groups',
          target: 1,
          unit: 'messages'
        }
      },
      {
        id: 'birthday-wisher',
        title: t('birthday_wisher'),
        description: t('birthday_wisher_description'),
        reward: 250,
        category: 'special',
        criteria: {
          type: 'messages',
          target: 1,
          unit: 'messages'
        }
      },
      {
        id: 'travelers',
        title: t('travelers'),
        description: t('travelers_description'),
        reward: 400,
        category: 'special',
        criteria: {
          type: 'messages',
          target: 5,
          unit: 'locations'
        }
      },
      {
        id: 'meme-masters',
        title: t('meme_masters'),
        description: t('meme_masters_description'),
        reward: 300,
        category: 'special',
        criteria: {
          type: 'messages',
          target: 10,
          unit: 'stickers'
        }
      },
      {
        id: 'invite-and-win',
        title: t('invite_and_win'),
        description: t('invite_and_win_description'),
        reward: 500,
        category: 'referral',
        criteria: {
          type: 'referrals',
          target: 5,
          unit: 'friends'
        }
      },
      {
        id: 'cool-mentor',
        title: t('cool_mentor'),
        description: t('cool_mentor_description'),
        reward: 1000,
        category: 'referral',
        criteria: {
          type: 'referrals',
          target: 10,
          unit: 'friends'
        }
      },
      {
        id: 'wall-star',
        title: t('wall_star'),
        description: t('wall_star_description'),
        reward: 200,
        category: 'social',
        criteria: {
          type: 'reactions',
          target: 20
        }
      },
      {
        id: 'commentator',
        title: t('commentator'),
        description: t('commentator_description'),
        reward: 150,
        category: 'social',
        criteria: {
          type: 'comments',
          target: 10
        }
      },
      {
        id: 'inspiration',
        title: t('inspiration'),
        description: t('inspiration_description'),
        reward: 300,
        category: 'social',
        criteria: {
          type: 'comments',
          target: 5
        }
      },
      {
        id: 'wall-guest',
        title: t('wall_guest'),
        description: t('wall_guest_description'),
        reward: 50,
        category: 'social',
        criteria: {
          type: 'visits',
          target: 1
        }
      },
      {
        id: 'story-of-month',
        title: t('story_of_month'),
        description: t('story_of_month_description'),
        reward: 500,
        category: 'social',
        criteria: {
          type: 'reactions',
          target: 50
        }
      }
    ]);
  }, [currentTheme, applyTheme, t]);

  const handleUpdatePrivacySettings = (settings: UserProfile['privacySettings']) => {
    setCurrentUser(prev => ({
      ...prev,
      privacySettings: settings
    }));
  };

  const handleThemeChange = async (themeId: string) => {
    const success = await purchaseTheme(themeId);
    if (success) {
      // Update user's virtual currency
    }
  };

  const handleReviewReport = (reportId: string, action: 'approve' | 'reject') => {
    // Implement report review logic
  };

  const handleAddFriend = async (friendId: string) => {
    await addFriend(friendId);
  };

  const handleRemoveFriend = async (friendId: string) => {
    await removeFriend(friendId);
  };

  const handleCheckFriendship = async (friendId: string) => {
    const isFriend = await checkFriendship(friendId);
    console.log(`User ${friendId} is ${isFriend ? '' : 'not '}a friend`);
  };

  const handleStatusChange = (status: string) => {
    setUserStatus(status);
    updateUserStatus(status);
  };

  const handleWalletConnect = () => {
    // Implement wallet connect logic
  };

  return (
    <div className="min-h-screen bg-gray-100 dark-mode">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">{t('your_friendship_story')}</h1>
          <div className="flex items-center space-x-4">
            {currentUser && <UserAvatar user={currentUser} size="lg" />}
            {currentUser && mockStats.users.user2 && <UserAvatar user={mockStats.users.user2} size="lg" />}
            <Notifications
              notifications={notifications}
              onMarkAsRead={markAsRead}
              onMarkAllAsRead={markAllAsRead}
            />
          </div>
        </div>

        {user ? (
          <>
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
              <ThemeCustomizer
                themes={themes}
                currentTheme={currentTheme}
                onThemeChange={handleThemeChange}
                virtualBalance={mockVirtualCurrency.balance}
              />
            </div>

            <div className="mb-8">
              <StatusPurchase
                user={currentUser}
                onStatusChange={handleStatusChange}
              />
            </div>

            <div className="mb-8">
              <Achievements
                achievements={achievements}
                userProgress={userProgress}
              />
            </div>

            <div className="mb-8">
              <VirtualCurrency currency={mockVirtualCurrency} />
            </div>

            <div className="mb-8">
              <SpecialDates dates={mockStats.specialDates} />
            </div>

            <div className="mb-8">
              <MemorableQuotes quotes={mockStats.memorableQuotes} />
            </div>

            <div className="mb-8">
              <ContentModeration
                reports={mockReports}
                onReviewReport={handleReviewReport}
              />
            </div>

            <div className="mb-8">
              <MiniGames />
            </div>

            <div className="mb-8">
              <TelegramStories />
            </div>

            <div className="mb-8">
              <TelegramWallet onWalletConnect={handleWalletConnect} />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">{t('your_wall')}</h2>
              <UserWall />
            </div>
          </>
        ) : (
          <div>
            <button 
              onClick={() => login('testuser', 'password')} 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              {t('login')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
