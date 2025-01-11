import { useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  token: string | null;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      // Validate token and fetch user data
      setUser({
        id: 'user1',
        username: 'testuser',
        email: 'test@example.com',
        token: storedToken
      });
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      // Implement login logic
      const token = 'test-jwt-token';
      localStorage.setItem('authToken', token);
      setUser({
        id: 'user1',
        username,
        email: 'test@example.com',
        token
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    login,
    logout
  };
}
