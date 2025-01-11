import { useState, useEffect } from 'react';
import type { UserProfile } from '../types';
import api from '../services/api';

export function useFriends(userId: string) {
  const [friends, setFriends] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFriends();
  }, [userId]);

  const fetchFriends = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/users/${userId}/friends`);
      setFriends(response.data || []);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const addFriend = async (friendId: string) => {
    try {
      await api.post(`/users/${userId}/friends`, { friendId });
      await fetchFriends();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const removeFriend = async (friendId: string) => {
    try {
      await api.delete(`/users/${userId}/friends/${friendId}`);
      await fetchFriends();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const checkFriendship = async (friendId: string) => {
    try {
      const response = await api.get(`/users/${userId}/friends/${friendId}`);
      return response.data;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  return {
    friends,
    loading,
    error,
    addFriend,
    removeFriend,
    checkFriendship
  };
}
