import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Star, Users, MapPin } from 'lucide-react';

const typeIcons = {
  anniversary: Star,
  milestone: Users,
  meetup: MapPin,
};

interface SpecialDate {
  date: Date;
  title: string;
  type: 'anniversary' | 'milestone' | 'meetup';
  description?: string;
}

interface SpecialDatesProps {
  dates: SpecialDate[];
}

export function SpecialDates({ dates }: SpecialDatesProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Calendar className="w-6 h-6 mr-2" />
        Special Dates
      </h2>
      <div className="space-y-4">
        {dates.map((date, index) => {
          const Icon = typeIcons[date.type];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-shrink-0">
                <Icon className="w-8 h-8 text-blue-500" />
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
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}