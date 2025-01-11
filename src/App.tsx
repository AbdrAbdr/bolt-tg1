
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

// Mock user data
const mockCurrentUser: UserProfile = {
  id: '1',
