import { useState, useEffect, useRef } from 'react';
import { account, storage, databases } from '../Config/appwrite';
import { useNavigate } from 'react-router-dom';

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isLiked, setIsLiked] = useState({});
  const [posts, setPosts] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
        if (userData.prefs && userData.prefs.profileImage) {
          const fileId = userData.prefs.profileImage;
          const filePreviewURL = storage.getFilePreview('667865dc0023cc2e76aa', fileId).href;
          setProfileImage(filePreviewURL);
        }

        const likedPosts = JSON.parse(localStorage.getItem(`likedPosts_${userData.$id}`)) || {};
        setIsLiked(likedPosts);
      } catch (error) {
        setError('Failed to fetch user');
        console.error('Failed to fetch user', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      alert('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to logout');
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const response = await storage.createFile('667865dc0023cc2e76aa', 'unique()', file);
        const fileId = response.$id;
        await account.updatePrefs({ profileImage: fileId });

        const filePreviewURL = storage.getFilePreview('667865dc0023cc2e76aa', fileId).href;
        setProfileImage(filePreviewURL);

        const updatedUser = await account.get();
        setUser(updatedUser);
      } catch (error) {
        console.error('Failed to upload file', error);
        alert('Failed to upload profile picture');
      }
    }
  };

  const PostUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const PostFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && user) {
      try {
        const storageResponse = await storage.createFile('668c1aa1002169b92878', 'unique()', file);
        const fileId = storageResponse.$id;
        const fileUrl = storage.getFileView('668c1aa1002169b92878', fileId);
        const userId = user.$id;
        const Name = user.name;
        await databases.createDocument(
          '667567cd002a30d963df',
          '6675686100282b6dd0ae',
          'unique()',
          {
            userId,
            postId: fileId,
            Name,
            fileUrl,
            postDate: new Date().toISOString(),
            likes: 0,
          }
        );

        console.log('Post uploaded successfully');
      } catch (error) {
        console.error('Failed to upload file and save data', error);
        alert('Failed to upload post');
      }
    } else {
      console.error('File or user data is missing');
    }
  };

  const fetchPosts = async () => {
    try {
      const postResponse = await databases.listDocuments('667567cd002a30d963df', '6675686100282b6dd0ae');
      const postsWithUrls = postResponse.documents.map(post => {
        const fileUrl = storage.getFilePreview('668c1aa1002169b92878', post.postId).href;
        return {
          ...post,
          fileUrl,
        };
      });
      setPosts(postsWithUrls);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLikeClick = async (postId) => {
    try {
      const post = posts.find((post) => post.$id === postId);
      if (!post) {
        console.error(`Post with ID ${postId} not found`);
        return;
      }

      const currentLikes = post.likes || 0;
      const newLikesCount = isLiked[postId] ? currentLikes - 1 : currentLikes + 1;

      await databases.updateDocument(
        '667567cd002a30d963df',
        '6675686100282b6dd0ae',
        postId,
        {
          likes: newLikesCount,
        }
      );

      const updatedPosts = posts.map((p) => {
        if (p.$id === postId) {
          return {
            ...p,
            likes: newLikesCount,
          };
        }
        return p;
      });

      const updatedLikedPosts = { ...isLiked, [postId]: !isLiked[postId] };
      setPosts(updatedPosts);
      setIsLiked(updatedLikedPosts);
      localStorage.setItem(`likedPosts_${user.$id}`, JSON.stringify(updatedLikedPosts));
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  return {
    user,
    loading,
    error,
    profileImage,
    fileInputRef,
    handleLogout,
    handleUploadClick,
    handleFileChange,
    PostUploadClick,
    PostFileChange,
    posts,
    handleLikeClick,
    isLiked,
  };
};
