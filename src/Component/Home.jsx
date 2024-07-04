import React, { useEffect, useState, useRef } from 'react';
import { account, storage } from '../Config/appwrite';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-xl">
        <div className="flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-black flex items-center justify-center overflow-hidden">
            {profileImage && <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center">
          {user ? `Hello, ${user.name}` : 'Loading...'}
        </h2>
        <div className="flex items-center justify-center">
          <h2
            className="font-bold bg-lime-400 h-8 w-20 text-center cursor-pointer"
            onClick={handleUploadClick}
          >
            Upload
          </h2>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept="image/*"
        />
        {user && (
          <button
            onClick={handleLogout}
            className="w-full py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
