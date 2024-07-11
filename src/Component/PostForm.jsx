import React, { useState, useRef } from 'react';
import { databases, storage } from '../Config/appwrite';
import { useUser } from '../Hooks/useUser';

const PostForm = ({ onClose, addNewPost }) => {
  const [Caption, setCaption] = useState('');
  const { user } = useUser();
  const postFileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const PostUploadClick = () => {
    if (postFileInputRef.current) {
      postFileInputRef.current.click();
    }
  };

  const PostFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePostSubmit = async () => {
    if (file && user) {
      try {
        const storageResponse = await storage.createFile('668c1aa1002169b92878', 'unique()', file);
        const fileId = storageResponse.$id;
        const fileUrl = storage.getFileView('668c1aa1002169b92878', fileId);

        const userProfileImageId = user.prefs.profileImage;
        const userProfileImageUrl = userProfileImageId
          ? storage.getFileView('667865dc0023cc2e76aa', userProfileImageId).href
          : null;

        const userId = user.$id;
        const Name = user.name;
        const newPost = {
          ProfilePicture: userProfileImageUrl,
          userId,
          postId: fileId,
          Name,
          fileUrl,
          postDate: new Date().toISOString(),
          likes: 0,
          Caption,
        };
        await databases.createDocument(
          '667567cd002a30d963df',
          '6675686100282b6dd0ae',
          'unique()',
          newPost
        );

        console.log('Post uploaded successfully');
        if (addNewPost) {
          addNewPost(newPost);
        }
        onClose(); // Close the form after successful submission
      } catch (error) {
        console.error('Failed to upload file and save data', error);
        alert('Failed to upload post');
      }
    } else {
      console.error('File or user data is missing');
      alert('Please select a file to upload');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <form onSubmit={(e) => e.preventDefault()} className="bg-white p-4 rounded shadow-md w-full max-w-sm">
        <textarea
          value={Caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          placeholder="What's on your mind?"
          required
        />
        <input
          type="file"
          ref={postFileInputRef}
          onChange={(e) => PostFileChange(e)}
          className="mb-2"
          style={{ display: 'none' }}
        />
        <div className="flex justify-end">
          <button type="button" onClick={PostUploadClick} className="px-4 py-2 text-white bg-blue-500 rounded">
            Choose File
          </button>
          <button type="button" onClick={handlePostSubmit} className="px-4 py-2 text-white bg-blue-500 rounded ml-2">
            Post
          </button>
          <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-200 rounded ml-2">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
