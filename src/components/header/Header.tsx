import React from 'react';
import { Logout } from '../authentication/GoogleAuthenticate';

const Header = () => {
  return (
    <header className='flex h-[8vh] bg-gray-600 text-white'>
      <div className='flex justify-between container m-auto'>
        <div className='font-semibold'>Chat App</div>
        <div>
          <Logout />
        </div>
      </div>
    </header>
  );
};

export default Header;
