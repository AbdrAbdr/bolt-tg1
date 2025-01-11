import React from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { MessageCircle, Image, Mic, MapPin, Star } from 'lucide-react';
import type { TimelineEvent } from '../types';

const iconMap = {
  message: MessageCircle,
  photo: Image,
  voice: Mic,
  location: MapPin,
  milestone: Star,
};

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative w-full py-8">
      <div className="absolute left-1/2 h-full w-0.5 bg-gray-200 transform -translate-x-1/2" />
      {events.map((event, index) => {
        const Icon = iconMap[event.type];
        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative flex items-center mb-8 ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-500">
                    {format(event.date, 'MMM d, yyyy')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>
              </div>
            </div>
            <div className="absolute left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2" />
          </motion.div>
        );
      })}
    </div>
  );
}
