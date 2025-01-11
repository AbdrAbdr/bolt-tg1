import React from 'react';
import { Calendar, Star, Users, MapPin } from 'lucide-react';

interface SpecialDate {
  date: Date;
  title: string;
  type: 'milestone' | 'anniversary' | 'meetup';
  description?: string;
}

interface SpecialDatesProps {
  dates: SpecialDate[];
}

const typeIcons = {
  milestone: Users,
  anniversary: Star,
  meetup: MapPin,
};

const typeColors = {
  milestone: 'text-blue-500',
  anniversary: 'text-yellow-500',
  meetup: 'text-green-500',
};

export function SpecialDates({ dates }: SpecialDatesProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Calendar className="w-6 h-6 mr-2 text-blue-500" />
        Special Dates
      </h2>

      <div className="space-y-4">
        {dates.map((date, index) => {
          const Icon = typeIcons[date.type];
          const colorClass = typeColors[date.type];

          return (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-shrink-0">
                <Icon className={`w-8 h-8 ${colorClass}`} />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-lg">{date.title}</h3>
                <time className="text-sm text-gray-600">
                  {date.date.toLocaleDateString()}
                </time>
                {date.description && (
                  <p className="text-gray-600 mt-1">{date.description}</p>
                )}
              </div>
            </div>
          );
        })}

        {dates.length === 0 && (
          <p className="text-center text-gray-500">No special dates yet</p>
        )}
      </div>
    </div>
  );
}
