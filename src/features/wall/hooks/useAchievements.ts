import { useState, useEffect } from 'react';
import type { Achievement } from '../types';
import api from '../services/api';

const defaultAchievements: Achievement[] = [
  {
    id: 'first-post',
    title: 'First Post',
    description: 'Create your first wall post',
    reward: 100,
    category: 'milestone',
    criteria: {
      type: 'posts',
      target: 1
    }
  },
  {
    id: 'popular-post',
    title: 'Going Viral',
    description: 'Get 100 reactions on a single post',
    reward: 500,
    category: 'activity',
    criteria: {
      type: 'reactions',
      target: 100
    }
  },
  {
    id: 'engagement',
    title: 'Active Engager',
    description: 'Comment on 50 different posts',
    reward: 300,
    category: 'activity',
    criteria: {
      type: 'comments',
      target: 50
    }
  },
  {
    id: 'wall-fame',
    title: 'Wall of Fame',
    description: 'Receive 1000 profile visits',
    reward: 1000,
    category: 'social',
    criteria: {
      type: 'visits',
      target: 1000
    }
  },
  {
    id: 'first-message',
    title: 'First Steps',
    description: 'Send your first message to a friend',
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
    title: 'Chatty Friend',
    description: 'Send 1000 messages to one friend',
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
    title: 'Voice Master',
    description: 'Send 50 voice messages',
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
    title: 'Photo Archivist',
    description: 'Share 20 photos with friends',
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
    title: 'First Week',
    description: 'Communicate with a friend for 7 days',
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
    title: 'Month Together',
    description: 'Communicate with a friend for 30 days',
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
    title: 'Year Anniversary',
    description: 'Communicate with a friend for a year',
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
    title: 'Eternal Friends',
    description: 'Communicate with a friend for 5 years',
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
    title: 'Group Fan',
    description: 'Send 10 messages in a group with a friend',
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
    title: 'Active Participant',
    description: 'React to a friend\'s message in a group',
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
    title: 'Group for Two',
    description: 'Start a private chat after a group discussion',
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
    title: 'Birthday Wisher',
    description: 'Congratulate a friend on their birthday',
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
    title: 'Travelers',
    description: 'Share 5 locations with a friend',
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
    title: 'Meme Masters',
    description: 'Share 10 stickers or memes with a friend',
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
    title: 'Invite and Win',
    description: 'Invite 5 friends via referral link',
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
    title: 'Cool Mentor',
    description: '10 friends registered via your referral link',
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
    title: 'Wall Star',
    description: 'Get 20 likes on a post',
    reward: 200,
    category: 'social',
    criteria: {
      type: 'reactions',
      target: 20
    }
  },
  {
    id: 'commentator',
    title: 'Commentator',
    description: 'Leave 10 comments on friends\' walls',
    reward: 150,
    category: 'social',
    criteria: {
      type: 'comments',
      target: 10
    }
  },
  {
    id: 'inspiration',
    title: 'Inspiration',
    description: 'Write a post that gets 5 comments',
    reward: 300,
    category: 'social',
    criteria: {
      type: 'comments',
      target: 5
    }
  },
  {
    id: 'wall-guest',
    title: 'Wall Guest',
    description: 'Visit a friend\'s wall',
    reward: 50,
    category: 'social',
    criteria: {
      type: 'visits',
      target: 1
    }
  },
  {
    id: 'story-of-month',
    title: 'Story of the Month',
    description: 'Write a popular post',
    reward: 500,
    category: 'social',
    criteria: {
      type: 'reactions',
      target: 50
    }
  }
];

export function useAchievements(userId: string) {
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
  const [userProgress, setUserProgress] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProgress();
  }, [userId]);

  const fetchUserProgress = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/users/${userId}/achievements`);
      setUserProgress(response.data || {});
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch achievements:', error);
      setLoading(false);
    }
  };

  const checkAchievement = async (type: string, value: number) => {
    try {
      await api.post(`/users/${userId}/achievements/check`, { type, value });
      await fetchUserProgress();
    } catch (error) {
      console.error('Failed to check achievement:', error);
    }
  };

  const trackProgress = async (type: string, value: number) => {
    try {
      await api.post(`/users/${userId}/achievements/track`, { type, value });
      await fetchUserProgress();
    } catch (error) {
      console.error('Failed to track progress:', error);
    }
  };

  return {
    achievements,
    userProgress,
    loading,
    checkAchievement,
    trackProgress
  };
}
