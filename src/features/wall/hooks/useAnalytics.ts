import { useState, useEffect } from 'react';
import api from '../services/api';

interface EngagementRate {
  rate: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

interface PostAnalytics {
  reach: number;
  likes: number;
  comments: number;
  shares: number;
  bestPostingTime: string;
  engagement: EngagementRate;
}

export function useAnalytics(postId: string) {
  const [analytics, setAnalytics] = useState<PostAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/analytics/posts/${postId}`);
        if (mounted) {
          setAnalytics(response.data);
          setError(null);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchAnalytics();

    return () => {
      mounted = false;
    };
  }, [postId]);

  const refreshAnalytics = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/analytics/posts/${postId}`);
      setAnalytics(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    analytics,
    loading,
    error,
    refreshAnalytics
  };
}
