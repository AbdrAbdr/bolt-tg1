import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreVertical, Smile, ThumbsUp, Laugh, Wow } from 'lucide-react';
import type { Post as PostType, UserProfile } from '../types';
import { RichTextEditor } from './RichTextEditor';
import { UserAvatar } from './UserAvatar';
import { motion, AnimatePresence } from 'framer-motion';

interface PostProps {
  post: PostType;
  onReact: (postId: string, reactionType: string) => void;
  onComment: (postId: string, comment: string) => void;
}

const reactionIcons = {
  heart: Heart,
  like: ThumbsUp,
  laugh: Laugh,
  wow: Wow
};

export function Post({ post, onReact, onComment }: PostProps) {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [showReactions, setShowReactions] = useState(false);

  const handleReact = (type: string) => {
    onReact(post.id, type);
    setShowReactions(false);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(post.id, comment);
      setComment('');
    }
  };

  const handleToggleReactions = () => {
    setShowReactions(!showReactions);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`bg-white rounded-lg shadow-md p-4 mb-4 vk-card message-animation`}
    >
      <div className="flex justify-between items-start mb-4 vk-header">
        <div className="flex items-center space-x-2">
          <UserAvatar user={post.metadata?.user || {
            id: '1',
            name: 'User',
            privacySettings: {
              isAnonymous: false,
              showFullName: true,
              showAvatar: true
            }
          }} size="md" showTooltip={true} />
          <div>
            <h3 className="font-semibold">{post.metadata?.user?.name || 'User'}</h3>
            <span className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-4 vk-content">
        <div dangerouslySetInnerHTML={{ __html: post.content }} className="message-text" />
      </div>

      {post.attachments && post.attachments.length > 0 && (
        <div className="mb-4">
          {post.attachments.map((attachment, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              {attachment.type === 'photo' && (
                <img src={attachment.url} alt="" className="w-full h-auto" />
              )}
              {/* Add handlers for other attachment types */}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between py-2 border-t border-b vk-footer">
        <div className="flex items-center space-x-1">
          <button
            onClick={handleToggleReactions}
            className="flex items-center space-x-1 text-gray-500 hover:text-red-500 relative"
          >
            <Heart className="w-5 h-5" />
            <span>{post.reactions.find(r => r.type === 'heart')?.count || 0}</span>
            <AnimatePresence>
              {showReactions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full left-0 mb-2 reaction-panel"
                >
                  {Object.keys(reactionIcons).map((type) => {
                    const Icon = reactionIcons[type as keyof typeof reactionIcons];
                    return (
                      <button
                        key={type}
                        onClick={() => handleReact(type)}
                        className="reaction-item"
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1 text-gray-500 hover:text-blue-500"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Comment</span>
        </button>

        <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500">
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>

      {showComments && (
        <div className="mt-4">
          <form onSubmit={handleComment} className="flex space-x-2">
            <input
              type="text"
              className="flex-1 border rounded-full px-4 py-2"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </motion.div>
  );
}
