import axios, { AxiosError, AxiosResponse } from 'axios';
import { rateLimiter } from './rateLimiter';

// Создаем базовый инстанс axios с общими настройками
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Перехватчик запросов
api.interceptors.request.use(
  async (config) => {
    // Добавляем токен авторизации
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Проверяем ограничение запросов
    const endpoint = config.url?.split('/')[1] || 'default';
    try {
      await rateLimiter.checkLimit('user1', endpoint);
    } catch (error) {
      return Promise.reject(error);
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Перехватчик ответов
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Обработка неавторизованного доступа
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }

    if (error.response?.status === 429) {
      // Обработка превышения лимита запросов
      const retryAfter = error.response.headers['retry-after'];
      if (retryAfter) {
        await new Promise(resolve => setTimeout(resolve, parseInt(retryAfter) * 1000));
        return api.request(error.config);
      }
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  auth: {
    login: (data: { username: string; password: string }) => 
      api.post('/auth/login', data),
    logout: () => 
      api.post('/auth/logout'),
    refresh: () => 
      api.post('/auth/refresh'),
  },
  posts: {
    list: () => api.get('/posts'),
    create: (data: any) => api.post('/posts', data),
    get: (id: string) => api.get(`/posts/${id}`),
    update: (id: string, data: any) => api.put(`/posts/${id}`, data),
    delete: (id: string) => api.delete(`/posts/${id}`),
    like: (id: string) => api.post(`/posts/${id}/like`),
    unlike: (id: string) => api.delete(`/posts/${id}/like`),
    comment: (id: string, data: { content: string }) => 
      api.post(`/posts/${id}/comments`, data),
  },
  collections: {
    list: () => api.get('/collections'),
    create: (data: any) => api.post('/collections', data),
    update: (id: string, data: any) => api.put(`/collections/${id}`, data),
    delete: (id: string) => api.delete(`/collections/${id}`),
    addPost: (collectionId: string, postId: string) => 
      api.post(`/collections/${collectionId}/posts`, { postId }),
    removePost: (collectionId: string, postId: string) =>
      api.delete(`/collections/${collectionId}/posts/${postId}`),
  },
  analytics: {
    getPostStats: (postId: string) => api.get(`/analytics/posts/${postId}`),
    getBestPostingTime: () => api.get('/analytics/best-posting-time'),
    getEngagementRate: () => api.get('/analytics/engagement'),
  },
  settings: {
    getPrivacy: () => api.get('/settings/privacy'),
    updatePrivacy: (data: any) => api.put('/settings/privacy', data),
    getTheme: () => api.get('/settings/theme'),
    updateTheme: (data: any) => api.put('/settings/theme', data),
  },
  virtualCurrency: {
    getBalance: () => api.get('/virtual-currency/balance'),
    getTransactions: () => api.get('/virtual-currency/transactions'),
    purchase: (data: { itemId: string; amount: number }) => 
      api.post('/virtual-currency/purchase', data),
  },
};

export default api;
