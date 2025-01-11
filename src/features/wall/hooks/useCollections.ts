import { useState, useEffect } from 'react';
import type { Collection } from '../types';
import api from '../services/api';

export function useCollections(userId: string) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCollections();
  }, [userId]);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const response = await api.get('/collections');
      setCollections(response.data || []);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const createCollection = async (name: string) => {
    try {
      await api.post('/collections', { name });
      await fetchCollections();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const editCollection = async (collectionId: string, newName: string) => {
    try {
      await api.put(`/collections/${collectionId}`, { name: newName });
      await fetchCollections();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteCollection = async (collectionId: string) => {
    try {
      await api.delete(`/collections/${collectionId}`);
      await fetchCollections();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const addPostToCollection = async (collectionId: string, postId: string) => {
    try {
      await api.post(`/collections/${collectionId}/posts`, { postId });
      await fetchCollections();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const removePostFromCollection = async (collectionId: string, postId: string) => {
    try {
      await api.delete(`/collections/${collectionId}/posts/${postId}`);
      await fetchCollections();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    collections,
    loading,
    error,
    createCollection,
    editCollection,
    deleteCollection,
    addPostToCollection,
    removePostFromCollection
  };
}
