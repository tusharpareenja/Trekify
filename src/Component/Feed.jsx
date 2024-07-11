import React, { useState, useRef } from 'react';
import { useUser } from '../Hooks/useUser';
import Bali from '../assets/Images/bali2.png.png';
import Chitkul from '../assets/Images/chitkul.png.png';
import Gwalior from '../assets/Images/gwalior.png';
import Shimla from '../assets/Images/shimla.png';
import Laddakh from '../assets/Images/laddakh.png';
import Nainital from '../assets/Images/nainital.png.png';
import Solan from '../assets/Images/solan.png.png';
import Home1 from '../assets/Icon/home_icon.png';
import Bookmark from '../assets/Icon/bookmark.png';
import hotel from '../assets/Icon/hotel (2).png';
import Plane from '../assets/Icon/plane.png';
import Update from '../assets/Icon/update.png';
import Notification from '../assets/Icon/notification_icon.png';
import Logout from '../assets/Icon/logout (1).png';
import Create from '../assets/Icon/add-file.png';
import PostForm from './PostForm';
import './Feed.css';
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from 'react-icons/fa';

const contentArray = [
  { id: 1, backgroundImage: `url(${Bali})` },
  { id: 2, backgroundImage: `url(${Chitkul})` },
  { id: 3, backgroundImage: `url(${Gwalior})` },
  { id: 4, backgroundImage: `url(${Shimla})` },
  { id: 5, backgroundImage: `url(${Laddakh})` },
  { id: 6, backgroundImage: `url(${Nainital})` },
  { id: 7, backgroundImage: `url(${Solan})` },
];

function Feed() {
  const {
    handleLogout,
    handleUploadClick,
    fileInputRef,
    handleFileChange,
    PostUploadClick,
    PostFileChange,
    postFileInputRef,
    posts,
    handleLikeClick,
    isLiked,
  } = useUser();

  const [likes, setLikes] = useState({});
  const [isSaved, setIsSaved] = useState({});
  const [showUploadForm, setShowUploadForm] = useState(false);
  return (
    <>
      <div className='h-screen md:w-4/6 absolute flex right-0 w-full overflow-y-auto'>
        <div className='w-full h-52 mt-16 sm:mt-24 hide-scrollbar' style={{ overflowX: 'scroll', overflowY: 'hidden' }}>
          <div className='flex space-x-4 p-4'>
            {contentArray.map((item) => (
              <div
                key={item.id}
                className='w-32 h-40 flex-shrink-0 bg-cover bg-center flex items-center justify-center bg-black rounded-2xl'
                style={{ backgroundImage: item.backgroundImage }}
              >
                <p className='text-center text-white'>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='w-full absolute left-0 top-80'>
          {posts.map((post) => (
            <div key={post.$id} className='flex justify-between w-52 h-96 ml-20 mb-48 mt-20 text-black rounded-xl sm:w-100 border-2 border-slate-700 sm:h-130 relative shadow-xl'>
              <div className='w-full h-auto shadow-lg p-2 flex flex-col rounded-t-lg sm:h-auto'>
                <div className='flex items-center'>
                  <div className='w-7 h-7 rounded-full bg-black sm:w-9 sm:h-9'>
                    <img
                      src={post.ProfilePicture}
                      className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-black"
                    />
                  </div>
                  <h1 className='ml-4 mt-1 font-sans text-sm sm:text-xl'>{post.Name}</h1>
                </div>
                <p className='mt-2 text-xs sm:text-sm'>{post.caption}</p>
                <div className='mt-4 rounded-lg  object-contain'>
                  <img src={post.fileUrl} alt="Post" className='w-full h-4/6 rounded-lg' />
                </div>
              </div>
              <div className='w-full h-7 sm:h-9 rounded-b-lg absolute bottom-0 flex justify-between items-center p-2'>
                <div className='flex items-center'>
                  <button onClick={() => handleLikeClick(post.$id)} className='mr-2 flex items-center'>
                    {isLiked[post.$id] ? <FaHeart className='text-red-500' /> : <FaRegHeart className='text-black' />}
                    <span className='ml-1'>{post.likes}</span>
                  </button>
                </div>
                <button onClick={() => handleSaveClick(post.$id)}>
                  {isSaved[post.$id] ? <FaBookmark className='text-black' /> : <FaRegBookmark />}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='fixed block md:hidden h-96 w-16 bg-white shadow-xl right-0 top-64 sm:top-80 rounded-l-lg'>
          <div className='w-full h-12 items-center rounded-l-lg cursor-pointer hover:bg-slate-200 hover:border-purple-500 border-r-4'>
            <img src={Home1} className='w-11 h-11 ml-2 p-2' alt='Home' />
          </div>

          <div className='w-full h-12 items-center rounded-l-lg cursor-pointer hover:bg-slate-200 hover:border-purple-500 border-r-4'>
            <img src={Notification} className='w-11 h-11 ml-2 p-2' alt='Notification' />
          </div>

          <div className='w-full h-12 items-center rounded-l-lg cursor-pointer hover:bg-slate-200 hover:border-purple-500 border-r-4'>
            <img src={Bookmark} className='w-11 h-11 ml-2 p-2' alt='Bookmark' />
          </div>

          <div className='w-full h-12 items-center rounded-l-lg cursor-pointer  hover:bg-slate-200 hover:border-purple-500 border-r-4' onClick={handleUploadClick}>
            <img src={Update} className='w-11 h-11 ml-2 p-2 cursor-pointer' alt='Update' />
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{
                opacity:0,
                backgroundColor: 'black',
                position: 'absolute', 
                top:145,
                width: '100%',
                height: '10%',
                cursor: 'pointer', 
              }} 
              accept='image/*'
            />
          </div>
          

          <div className='w-full h-12 items-center rounded-l-lg cursor-pointer hover:bg-slate-200 hover:border-purple-500 border-r-4'>
            <img src={Plane} className='w-11 h-11 ml-2 p-2' alt='Plane' />
          </div>

          <div className='w-full h-12 items-center rounded-l-lg cursor-pointer hover:bg-slate-200 hover:border-purple-500 border-r-4'>
            <img src={hotel} className='w-11 h-11 ml-2 p-2' alt='Hotel' />
          </div>

          <div className='w-full h-12 items-center rounded-l-lg cursor-pointer hover:bg-slate-200' onClick={() => setShowUploadForm(true)}>
            <img src={Create} className='w-11 h-11 ml-2 p-2' alt='Create' />
          </div>

          <input
            type='file'
            ref={postFileInputRef}
            onChange={PostFileChange}
            style={{ display: 'none' }}
            accept='image/*'
          />

          <div className='w-full h-12 items-center rounded-l-lg cursor-pointer hover:bg-slate-200' onClick={handleLogout}>
            <img src={Logout} className='w-11 h-11 ml-2 p-2' alt='Logout' />
          </div>
        </div>
        {showUploadForm && <PostForm onClose={() => setShowUploadForm(false)} />}

        <input
          type="file"
          ref={postFileInputRef}
          onChange={PostFileChange}
          style={{ display: 'none' }}
          accept="image/*"
        />
      </div>
    </>
  );
}

export default Feed;
