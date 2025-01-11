import React, { useState, useRef } from 'react';
import { Image, Video, Music, X } from 'lucide-react';

interface MediaUploaderProps {
  onUpload: (files: File[]) => void;
  maxFiles?: number;
  allowedTypes?: string[];
}

export function MediaUploader({ 
  onUpload, 
  maxFiles = 10,
  allowedTypes = ['image/*', 'video/*', 'audio/*']
}: MediaUploaderProps) {
  const [previews, setPreviews] = useState<{ file: File; preview: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + previews.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const newPreviews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setPreviews(prev => [...prev, ...newPreviews]);
    onUpload(files);
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index].preview);
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          <Image className="w-5 h-5" />
          <span>Add Media</span>
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={allowedTypes.join(',')}
        onChange={handleFileSelect}
        className="hidden"
      />

      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              {preview.file.type.startsWith('image/') ? (
                <img
                  src={preview.preview}
                  alt=""
                  className="w-full h-32 object-cover rounded-lg"
                />
              ) : preview.file.type.startsWith('video/') ? (
                <video
                  src={preview.preview}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Music className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <button
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
