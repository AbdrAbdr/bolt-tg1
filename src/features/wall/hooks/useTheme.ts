import { useState, useEffect } from 'react';
import type { Theme } from '../types';

const defaultThemes: Theme[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    price: 0,
    colors: {
      primary: '#3B82F6',
      secondary: '#60A5FA',
      background: '#F3F4F6',
      text: '#1F2937'
    }
  },
  {
    id: 'space',
    name: 'Space',
    price: 1000,
    colors: {
      primary: '#6366F1',
      secondary: '#818CF8',
      background: '#1E1B4B',
      text: '#E0E7FF'
    }
  },
  {
    id: 'retro',
    name: 'Retro',
    price: 800,
    colors: {
      primary: '#F59E0B',
      secondary: '#FBBF24',
      background: '#FFFBEB',
      text: '#92400E'
    }
  }
];

export function useTheme() {
  const [themes, setThemes] = useState<Theme[]>(defaultThemes);
  const [currentTheme, setCurrentTheme] = useState<string>('minimal');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user's theme preference
    setLoading(false);
  }, []);

  const applyTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (!theme) return;

    // Apply theme colors to CSS variables
    document.documentElement.style.setProperty('--color-primary', theme.colors.primary);
    document.documentElement.style.setProperty('--color-secondary', theme.colors.secondary);
    document.documentElement.style.setProperty('--color-background', theme.colors.background);
    document.documentElement.style.setProperty('--color-text', theme.colors.text);

    setCurrentTheme(themeId);
  };

  const purchaseTheme = async (themeId: string) => {
    try {
      // Implement theme purchase logic
      applyTheme(themeId);
      return true;
    } catch (error) {
      console.error('Failed to purchase theme:', error);
      return false;
    }
  };

  return {
    themes,
    currentTheme,
    loading,
    applyTheme,
    purchaseTheme
  };
}
