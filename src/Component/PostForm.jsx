import React, { useState } from 'react';
import { databases, storage } from './appwrite';

const PostForm = () => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = '';

    if (file) {
      const fileResponse = await storage.createFile('unique_bucket_id', file);
      imageUrl = storage.getFileView('unique_bucket_id', fileResponse.$id);
    }

    const post = {
      content,
      image: imageUrl,
      userId: 'currentUserId', // replace with actual user ID
      likes: 0,
      createdAt: new Date().toISOString()
    };

    await databases.createDocument('667567cd002a30d963df', 'posts', 'unique()', post);
    setContent('');
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="What's on your mind?"
        required
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />
      <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
        Post
      </button>
    </form>
  );
};

export default PostForm;
