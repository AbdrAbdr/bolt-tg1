import React, { useState, useRef } from 'react';
import { Bold, Italic, Link, Image, Video, Mic, Music, Calendar, Clock } from 'lucide-react';
import { MediaUploader } from './MediaUploader';
import { format } from 'date-fns';

interface PostCreatorProps {
  onSubmit: (post: {
    content: string;
    attachments: File[];
    visibility: 'all' | 'friends' | 'selected' | 'private';
    scheduledAt?: Date;
  }) => void;
}

export function PostCreator({ onSubmit }: PostCreatorProps) {
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [visibility, setVisibility] = useState<'all' | 'friends' | 'selected' | 'private'>('all');
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduledAt, setScheduledAt] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const handleMediaUpload = (files: File[]) => {
    setAttachments(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ content, attachments, visibility, scheduledAt });
    setContent('');
    setAttachments([]);
    setScheduledAt(null);
    setIsScheduling(false);
  };

  const handleScheduleToggle = () => {
    setIsScheduling(!isScheduling);
    if (!scheduledAt) {
      setScheduledAt(new Date());
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (scheduledAt) {
      const newDate = new Date(e.target.value);
      setScheduledAt(prev => {
        if (prev) {
          prev.setDate(newDate.getDate());
          prev.setMonth(newDate.getMonth());
          prev.setFullYear(newDate.getFullYear());
          return prev;
        }
        return newDate;
      });
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (scheduledAt) {
      const [hours, minutes] = e.target.value.split(':').map(Number);
      setScheduledAt(prev => {
        if (prev) {
          prev.setHours(hours);
          prev.setMinutes(minutes);
          return prev;
        }
        return new Date();
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            className="w-full p-3 border rounded-lg resize-none"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            <button type="button" className="p-2 hover:bg-gray-100 rounded">
              <Bold className="w-5 h-5" />
            </button>
            <button type="button" className="p-2 hover:bg-gray-100 rounded">
              <Italic className="w-5 h-5" />
            </button>
            <button type="button" className="p-2 hover:bg-gray-100 rounded">
              <Link className="w-5 h-5" />
            </button>
          </div>

          <div className="flex space-x-2">
            <button type="button" className="p-2 hover:bg-gray-100 rounded">
              <Image className="w-5 h-5" />
            </button>
            <button type="button" className="p-2 hover:bg-gray-100 rounded">
              <Video className="w-5 h-5" />
            </button>
            <button type="button" className="p-2 hover:bg-gray-100 rounded">
              <Mic className="w-5 h-5" />
            </button>
            <button type="button" className="p-2 hover:bg-gray-100 rounded">
              <Music className="w-5 h-5" />
            </button>
          </div>
        </div>

        <MediaUploader onUpload={handleMediaUpload} />

        <div className="flex justify-between items-center mt-4">
          <select
            className="border rounded p-2"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as any)}
          >
            <option value="all">Everyone</option>
            <option value="friends">Friends</option>
            <option value="selected">Selected Friends</option>
            <option value="private">Only Me</option>
          </select>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleScheduleToggle}
              className={`p-2 rounded-full hover:bg-gray-100 ${
                isScheduling ? 'bg-blue-100' : ''
              }`}
            >
              <Calendar className="w-5 h-5" />
            </button>

            {isScheduling && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="flex items-center space-x-1 border rounded px-2 py-1"
                >
                  <span className="text-sm">
                    {scheduledAt ? format(scheduledAt, 'MMM d, yyyy') : 'Select Date'}
                  </span>
                </button>
                {showDatePicker && (
                  <input
                    ref={dateInputRef}
                    type="date"
                    className="absolute top-full left-0 mt-1 p-2 border rounded bg-white"
                    onChange={handleDateChange}
                    onBlur={() => setShowDatePicker(false)}
                    value={scheduledAt ? format(scheduledAt, 'yyyy-MM-dd') : ''}
                  />
                )}
              </div>
            )}

            {isScheduling && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowTimePicker(!showTimePicker)}
                  className="flex items-center space-x-1 border rounded px-2 py-1"
                >
                  <span className="text-sm">
                    {scheduledAt ? format(scheduledAt, 'HH:mm') : 'Select Time'}
                  </span>
                </button>
                {showTimePicker && (
                  <input
                    ref={timeInputRef}
                    type="time"
                    className="absolute top-full left-0 mt-1 p-2 border rounded bg-white"
                    onChange={handleTimeChange}
                    onBlur={() => setShowTimePicker(false)}
                    value={scheduledAt ? format(scheduledAt, 'HH:mm') : ''}
                  />
                )}
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
