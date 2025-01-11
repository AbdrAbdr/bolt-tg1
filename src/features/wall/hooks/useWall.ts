import { useState, useEffect } from 'react';
import type { Post } from '../types';
import api from '../services/api';

export function useWall(userId: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/posts');
      setPosts(response.data || []);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const createPost = async (post: Partial<Post>) => {
    try {
      await api.post('/posts', post);
      await fetchPosts();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await api.delete(`/posts/${postId}`);
      await fetchPosts();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    posts,
    loading,
    error,
    createPost,
    deletePost,
  };
}
