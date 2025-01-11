import React, { useState } from 'react';
import { Folder, Plus, Edit, Trash2, CheckCircle, X } from 'lucide-react';

interface Collection {
  id: string;
  name: string;
  cover?: string;
  postIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface ContentCollectionsProps {
  collections: Collection[] | undefined;
  onCreateCollection: (name: string) => void;
  onEditCollection: (collectionId: string, newName: string) => void;
  onDeleteCollection: (collectionId: string) => void;
  onAddPostToCollection: (collectionId: string, postId: string) => void;
  onRemovePostFromCollection: (collectionId: string, postId: string) => void;
}

export function ContentCollections({
  collections,
  onCreateCollection,
  onEditCollection,
  onDeleteCollection,
  onAddPostToCollection,
  onRemovePostFromCollection
}: ContentCollectionsProps) {
  const [newCollectionName, setNewCollectionName] = useState('');
  const [editingCollectionId, setEditingCollectionId] = useState<string | null>(null);
  const [editCollectionName, setEditCollectionName] = useState('');

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCollectionName.trim()) {
      onCreateCollection(newCollectionName);
      setNewCollectionName('');
    }
  };

  const handleEditCollection = (collection: Collection) => {
    setEditingCollectionId(collection.id);
    setEditCollectionName(collection.name);
  };

  const handleSaveEdit = () => {
    if (editingCollectionId && editCollectionName.trim()) {
      onEditCollection(editingCollectionId, editCollectionName);
      setEditingCollectionId(null);
      setEditCollectionName('');
    }
  };

  const handleCancelEdit = () => {
    setEditingCollectionId(null);
    setEditCollectionName('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <Folder className="w-6 h-6 mr-2 text-blue-500" />
          Collections
        </h2>
        <form onSubmit={handleCreateCollection} className="flex space-x-2">
          <input
            type="text"
            placeholder="New collection name"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            className="border rounded px-3 py-1"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center"
          >
            <Plus className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {Array.isArray(collections) && collections.map((collection) => (
          <div
            key={collection.id}
            className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              {editingCollectionId === collection.id ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={editCollectionName}
                    onChange={(e) => setEditCollectionName(e.target.value)}
                    className="border rounded px-2 py-1"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="text-green-600 hover:bg-green-100 rounded p-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="text-gray-600 hover:bg-gray-100 rounded p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold">{collection.name}</h3>
                  <p className="text-xs text-gray-500">
                    Created {new Date(collection.createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}

              <div className="flex space-x-2">
                {!editingCollectionId && (
                  <button
                    onClick={() => handleEditCollection(collection)}
                    className="text-gray-600 hover:bg-gray-100 rounded p-1"
                    title="Edit collection"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => onDeleteCollection(collection.id)}
                  className="text-red-600 hover:bg-red-100 rounded p-1"
                  title="Delete collection"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {collection.postIds.length} {collection.postIds.length === 1 ? 'post' : 'posts'}
                </p>
                {collection.cover && (
                  <img
                    src={collection.cover}
                    alt={collection.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        ))}

        {Array.isArray(collections) && collections.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Folder className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No collections yet</p>
            <p className="text-sm">Create your first collection to organize your posts</p>
          </div>
        )}
      </div>
    </div>
  );
}
