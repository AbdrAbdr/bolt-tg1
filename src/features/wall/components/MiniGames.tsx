import React from 'react';
import { Puzzle, Brain, Target, Users } from 'lucide-react';

interface Game {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  type: 'single' | 'competitive';
}

const games: Game[] = [
  {
    id: 'puzzle',
    title: 'Puzzle',
    description: 'Solve a puzzle',
    icon: <Puzzle className="w-6 h-6" />,
    type: 'single'
  },
  {
    id: 'memory',
    title: 'Memory Game',
    description: 'Test your memory',
    icon: <Brain className="w-6 h-6" />,
    type: 'single'
  },
  {
    id: 'reaction',
    title: 'Reaction Game',
    description: 'Test your reaction time',
    icon: <Target className="w-6 h-6" />,
    type: 'single'
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic-Tac-Toe',
    description: 'Play against a friend',
    icon: <Users className="w-6 h-6" />,
    type: 'competitive'
  }
];

export function MiniGames() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">Mini Games</h2>
      <div className="grid grid-cols-2 gap-4">
        {games.map((game) => (
          <div
            key={game.id}
            className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-2 mb-2">
              {game.icon}
              <h3 className="font-semibold">{game.title}</h3>
            </div>
            <p className="text-sm text-gray-500">{game.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
