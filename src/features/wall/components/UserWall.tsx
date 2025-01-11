import React, { useState, useEffect, useRef } from 'react';
import { PostCreator } from './PostCreator';
import { Post } from './Post';
import type { Post as PostType, UserProfile } from '../types';
import { RichTextEditor } from './RichTextEditor';
import { analytics } from '../services/analytics';
import { rateLimiter } from '../services/rateLimiter';
import { useWall } from '../hooks/useWall';
import { ContentCollections } from './ContentCollections';
import { useCollections } from '../hooks/useCollections';
import { useAnalytics } from '../hooks/useAnalytics';
import { useFriends } from '../hooks/useFriends';
import { UserAvatar } from './UserAvatar';
import { PaperClip, Mic, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function UserWall() {
  const [editorValue, setEditorValue] = useState('');
  const { posts, createPost, loading } = useWall('user1');
  const { collections, createCollection, editCollection, deleteCollection, addPostToCollection, removePostFromCollection } = useCollections('user1');
  const { friends, addFriend, removeFriend, checkFriendship } = useFriends('user1');
  const [showFriends, setShowFriends] = useState(false);
  const [message, setMessage] = useState('');
  const messageInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const handleCreatePost = async (postData: {
    content: string;
    attachments: File[];
    visibility: 'all' | 'friends' | 'selected' | 'private';
    scheduledAt?: Date;
  }) => {
    try {
      await rateLimiter.checkLimit('user1', 'post_creation');
      await createPost(postData);
      analytics.trackPostCreation('user1', 'new-post-id');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleReact = (postId: string, reactionType: string) => {
    try {
      rateLimiter.checkLimit('user1', 'post_reaction');
      // Implementation for handling reactions
      analytics.trackPostEngagement('user1', postId, 'like');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleComment = (postId: string, comment: string) => {
    try {
      rateLimiter.checkLimit('user1', 'comment_creation');
      // Implementation for handling comments
      analytics.trackPostEngagement('user1', postId, 'comment');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleToggleFriends = () => {
    setShowFriends(!showFriends);
  };

  const handleAddFriend = async (friendId: string) => {
    await addFriend(friendId);
  };

  const handleRemoveFriend = async (friendId: string) => {
    await removeFriend(friendId);
  };

  const handleCheckFriendship = async (friendId: string) => {
    const isFriend = await checkFriendship(friendId);
    console.log(`User ${friendId} is ${isFriend ? '' : 'not '}a friend`);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Implement sending message logic
      console.log('Sending message:', message);
      setMessage('');
      if (messageInputRef.current) {
        messageInputRef.current.focus();
      }
    }
  };

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <RichTextEditor value={editorValue} onChange={setEditorValue} />
      <PostCreator onSubmit={handleCreatePost} />
      <ContentCollections
        collections={collections || []}
        onCreateCollection={createCollection}
        onEditCollection={editCollection}
        onDeleteCollection={deleteCollection}
        onAddPostToCollection={addPostToCollection}
        onRemovePostFromCollection={removePostFromCollection}
      />
      <div className="mt-8 space-y-6">
        {Array.isArray(posts) && posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onReact={handleReact}
            onComment={handleComment}
          />
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={handleToggleFriends}
          className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
        >
          {showFriends ? t('hide_friends') : t('show_friends')}
        </button>

        {showFriends && (
          <div className="mt-4 flex flex-wrap gap-4">
            {friends && friends.map((friend) => (
              <div key={friend.id} className="flex items-center space-x-2">
                <UserAvatar user={friend} size="md" showTooltip={true} />
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleRemoveFriend(friend.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    {t('remove')}
                  </button>
                  <button
                    onClick={() => handleCheckFriendship(friend.id)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    {t('check')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="message-input">
        <button className="attachment-button">
          <PaperClip className="w-5 h-5 text-gray-400" />
        </button>
        <input
          ref={messageInputRef}
          type="text"
          placeholder="Write a message..."
          className="message-input-field"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <button className="send-button" onClick={handleSendMessage}>
          {message.trim() ? <ArrowRight className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-white" />}
        </button>
      </div>
    </div>
  );
}
