import { useState, useEffect } from 'react';
import type { UserProfile } from '../types';
import api from '../services/api';

export function useUserStatus(userId: string) {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserStatus();
  }, [userId]);

  const fetchUserStatus = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/users/${userId}/status`);
      setStatus(response.data?.status || null);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const updateUserStatus = async (newStatus: string) => {
    try {
      await api.put(`/users/${userId}/status`, { status: newStatus });
      await fetchUserStatus();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    status,
    loading,
    error,
    updateUserStatus
  };
}
