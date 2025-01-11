import React from 'react';
import { Quote } from 'lucide-react';
import type { UserProfile } from '../types';

interface QuoteType {
  text: string;
  date: Date;
  author: string;
  context?: string;
  user?: UserProfile;
}

interface MemorableQuotesProps {
  quotes: QuoteType[];
}

export function MemorableQuotes({ quotes }: MemorableQuotesProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Quote className="w-6 h-6 mr-2 text-blue-500" />
        Memorable Quotes
      </h2>

      <div className="space-y-4">
        {quotes.map((quote, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <blockquote className="text-lg italic mb-2">"{quote.text}"</blockquote>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                {quote.user?.avatar && (
                  <img
                    src={quote.user.avatar}
                    alt={quote.author}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span>— {quote.author}</span>
              </div>
              <time>{quote.date.toLocaleDateString()}</time>
            </div>
            {quote.context && (
              <p className="mt-2 text-sm text-gray-500">{quote.context}</p>
            )}
          </div>
        ))}

        {quotes.length === 0 && (
          <p className="text-center text-gray-500">No memorable quotes yet</p>
        )}
      </div>
    </div>
  );
}
