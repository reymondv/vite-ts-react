import React from 'react';
import { Logout } from '../authentication/GoogleAuthenticate';

const Header = () => {
  return (
    <header className='flex h-12 bg-amber-400 text-white fixed w-full top-0 left-0'>
      <div className='flex justify-between container m-auto px-4 text-black'>
        <div className='font-semibold'>Chat App</div>
        <div>
          <Logout />
        </div>
      </div>
    </header>
  );
};

export default Header;
