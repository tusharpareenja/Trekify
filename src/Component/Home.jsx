import React, { useState } from 'react';
import { useUser } from '../Hooks/useUser';
import Logo from '../assets/Logo.png';
import SearchIcon from '../assets/Icon/search_icon.png';
import Home1 from '../assets/Icon/home_icon.png';
import Bookmark from '../assets/Icon/bookmark.png';
import hotel from '../assets/Icon/hotel (2).png';
import Plane from '../assets/Icon/plane.png';
import Update from '../assets/Icon/update.png';
import Notification from '../assets/Icon/notification_icon.png';
import Feed from './Feed';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {
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
  } = useUser();

  const navigate = useNavigate();
  const [showUploadForm, setShowUploadForm] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className='w-full min-h-screen bg-pink-100 flex flex-col'>
        <nav className='w-full h-14 bg-white flex items-center justify-between px-4 md:px-8 fixed shadow-md z-10'>
          <div className='w-28 h-12 md:w-44 md:h-16 flex'>
            <img src={Logo} className='w-full h-full object-cover' alt="Logo" />
          </div>
          <div className='relative flex-1 max-w-xs md:max-w-md lg:max-w-lg h-10 mx-4'>
            <input 
              className='w-full h-full rounded-xl p-2 pl-10 bg-slate-200' 
              placeholder='Search for Destination, Travelers'
            />
            <img 
              src={SearchIcon} 
              className='absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6'
              alt="Search"
            />
          </div>
          <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center overflow-hidden cursor-pointer"
               onClick={() => navigate('/profile')}>
            {profileImage && <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />}
          </div>
        </nav>

        <div className='h-20 w-64 bg-white fixed mt-28 ml-20 rounded-3xl md:flex justify-center items-center shadow-md hidden'>
          <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center overflow-hidden">
            {profileImage && <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />}
          </div>
          <h1 className='font-sans font-semibold ml-10 text-gray-500'>{user ? user.name : 'Loading...'}</h1>
        </div>

        <div className='h-3/6 w-64 bg-white fixed mt-52 ml-20 rounded-3xl shadow-md md:block hidden'>
          <div className='w-full h-14 rounded-xl flex items-center cursor-pointer hover:bg-slate-200 border-l-8 border-transparent hover:border-purple-500 hover:text-purple-500 text-gray-500'> 
            <img src={Home1} className='w-5 h-5 ml-10' alt="Home" />
            <span className='ml-8'>Home</span>
          </div>

          <div className='w-full h-14 rounded-xl flex items-center cursor-pointer hover:bg-slate-200 border-l-8 border-transparent hover:border-purple-500 hover:text-purple-500 text-gray-500'> 
            <img src={Notification} className='w-5 h-5 ml-10' alt="Notification" />
            <span className='ml-8'>Notification</span>
          </div>
        
          <div className='w-full h-14 rounded-xl flex items-center cursor-pointer hover:bg-slate-200 border-l-8 border-transparent hover:border-purple-500 hover:text-purple-500 text-gray-500'> 
            <img src={Bookmark} className='w-5 h-5 ml-10' alt="Bookmark" />
            <span className='ml-8'>Bookmarks</span>
          </div>

          <div 
            className='w-full h-14 rounded-xl flex items-center cursor-pointer hover:bg-slate-200 border-l-8 border-transparent hover:border-purple-500 hover:text-purple-500 text-gray-500'
            onClick={handleUploadClick}
          > 
            <img src={Update} className='w-5 h-5 ml-10' alt="Profile Picture" />
            <span className='ml-8'>Profile Picture</span>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept="image/*"
          />

          <div className='w-full h-14 rounded-xl flex items-center cursor-pointer hover:bg-slate-200 border-l-8 border-transparent hover:border-purple-500 hover:text-purple-500 text-gray-500'> 
            <img src={Plane} className='w-5 h-5 ml-10' alt="Travel" />
            <span className='ml-8'>Travel</span>
          </div>

          <div className='w-full h-14 rounded-xl flex items-center cursor-pointer hover:bg-slate-200 border-l-8 border-transparent hover:border-purple-500 hover:text-purple-500 text-gray-500'> 
            <img src={hotel} className='w-5 h-5 ml-10' alt="Hotel" />
            <span className='ml-8'>Hotel</span>
          </div>
        </div>

        <div className='h-10 w-64 bg-purple-500 fixed bottom-32 ml-20 rounded-3xl md:flex justify-center items-center shadow-md text-white hover:bg-purple-900 cursor-pointer hidden'
        onClick={PostUploadClick}
        >
          <h1>Create</h1>
        </div>
        <input
            type="file"
            ref={fileInputRef}
            onChange={PostFileChange}
            style={{ display: 'none' }}
            accept="image/*"
          />


        {user && (
          <div className='h-10 w-64 bg-red-400 fixed bottom-20 ml-20 rounded-3xl md:flex justify-center items-center shadow-md text-black hover:bg-red-900 cursor-pointer hidden'>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}

        <Feed showUploadForm={showUploadForm} setShowUploadForm={setShowUploadForm} />
      </div>
    </>
  );
};

export default Home;
