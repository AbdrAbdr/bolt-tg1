import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Quote {
  text: string;
  date: Date;
  author: string;
  context?: string;
}

interface MemorableQuotesProps {
  quotes: Quote[];
}

export function MemorableQuotes({ quotes }: MemorableQuotesProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Quote className="w-6 h-6 mr-2" />
        Memorable Quotes
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {quotes.map((quote, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <blockquote className="text-lg italic mb-4">"{quote.text}"</blockquote>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>— {quote.author}</span>
              <time>{quote.date.toLocaleDateString()}</time>
            </div>
            {quote.context && (
              <p className="mt-2 text-sm text-gray-500">{quote.context}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
