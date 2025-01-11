import React from 'react';
import { Palette } from 'lucide-react';
import type { Theme } from '../types';

interface ThemeCustomizerProps {
  themes: Theme[];
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
  virtualBalance: number;
}

export function ThemeCustomizer({
  themes,
  currentTheme,
  onThemeChange,
  virtualBalance
}: ThemeCustomizerProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Palette className="w-6 h-6 mr-2" />
          Wall Themes
        </h2>
        <span className="text-sm text-gray-500">Balance: {virtualBalance} coins</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`relative p-4 rounded-lg cursor-pointer transition-all ${
              currentTheme === theme.id
                ? 'ring-2 ring-blue-500'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onThemeChange(theme.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{theme.name}</h3>
              <span className="text-sm font-medium">
                {theme.price} coins
              </span>
            </div>

            <div className="flex space-x-2">
              {Object.entries(theme.colors).map(([key, color]) => (
                <div
                  key={key}
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: color }}
                  title={key}
                />
              ))}
            </div>

            {currentTheme === theme.id && (
              <span className="absolute top-2 right-2 text-sm text-blue-500 font-medium">
                Active
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
