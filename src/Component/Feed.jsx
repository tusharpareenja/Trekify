import React from 'react';
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
import Create from '../assets/Icon/add-file.png'
import './Feed.css';

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
  } = useUser();

  return (
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

      <div className='fixed block md:hidden h-96 w-16 bg-white shadow-xl right-0 top-64 sm:top-80 rounded-l-lg '>
         <div className=' w-full h-12 items-center rounded-l-lg cursor-pointer hover:bg-slate-200 hover:border-purple-500 border-r-4 '>
          <img src={Home1} className='w-11 h-11 ml-2 p-2'></img>
         </div>

         <div className=' w-full h-12 items-center rounded-l-lg cursor-pointer hover:bg-slate-200 hover:border-purple-500 border-r-4 '>
          <img src={Notification} className='w-11 h-11 ml-2 p-2'></img>
         </div>

         <div className=' w-full h-12 items-center rounded-l-lg cursor-pointer hover:bg-slate-200 hover:border-purple-500 border-r-4 '>
          <img src={Bookmark} className='w-11 h-11 ml-2 p-2'></img>
         </div>

         <div className=' w-full h-12 items-center rounded-l-lg cursor-pointer hover:bg-slate-200 hover:border-purple-500 border-r-4 ' onClick={handleUploadClick}>
          <img src={Update} className='w-11 h-11 ml-2 p-2'></img>
         </div>

         <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept="image/*"
          />

         <div className=' w-full h-12 items-center rounded-l-lg cursor-pointer hover:bg-slate-200 hover:border-purple-500 border-r-4 '>
          <img src={Plane} className='w-11 h-11 ml-2 p-2'></img>
         </div>

         <div className=' w-full h-12 items-center rounded-l-lg cursor-pointer hover:bg-slate-200 hover:border-purple-500 border-r-4 '>
          <img src={hotel} className='w-11 h-11 ml-2 p-2'></img>
         </div>

         <div className=' w-full h-12 items-center rounded-l-lg cursor-pointer  hover:bg-slate-200'>
          <img src={Create} className='w-11 h-11 ml-2 p-2'></img>
         </div>

         <div className=' w-full h-12 items-center rounded-l-lg cursor-pointer  hover:bg-slate-200' onClick={handleLogout} >
          <img src={Logout} className='w-11 h-11 ml-2 p-2'></img>
         </div>
      </div>
    </div>
  );
}

export default Feed;
