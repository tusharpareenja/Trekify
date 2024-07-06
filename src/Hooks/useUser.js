// useUser.js
import { useState, useEffect, useRef } from 'react';
import { account, storage } from '../Config/appwrite';
import { useNavigate } from 'react-router-dom';

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // flag to check if the component is still mounted

    const fetchUser = async () => {
      try {
        const userData = await account.get();
        if (isMounted) {
          setUser(userData);
          // Fetch profile image URL if exists
          if (userData.prefs && userData.prefs.profileImage) {
            const fileId = userData.prefs.profileImage;
            const filePreviewURL = storage.getFilePreview('667865dc0023cc2e76aa', fileId).href;
            setProfileImage(filePreviewURL);
          }
        }
      } catch (error) {
        if (isMounted) {
          setError('Failed to fetch user');
          console.error('Failed to fetch user', error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false; // cleanup function to set the flag to false
    };
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current'); // Delete the current session
      setUser(null); // Clear the user state
      alert('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to logout');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const response = await storage.createFile('667865dc0023cc2e76aa', 'unique()', file);
        const fileId = response.$id;

        // Update user profile with the profile image file ID
        await account.updatePrefs({ profileImage: fileId });

        const filePreviewURL = storage.getFilePreview('667865dc0023cc2e76aa', fileId).href;
        setProfileImage(filePreviewURL);
      } catch (error) {
        console.error('Failed to upload file', error);
        alert('Failed to upload profile picture');
      }
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
  };
};
