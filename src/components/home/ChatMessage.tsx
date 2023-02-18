import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';

interface Message {
  data: { message?: string; uid?: string; photoURL?: string | undefined; displayName?: string };
}

const ChatMessage = ({ data }: Message) => {
  const [user] = useAuthState(auth);

  return (
    <div
      className={
        user?.uid == data?.uid
          ? 'w-full flex justify-start flex-row-reverse p-5'
          : 'w-full flex justify-start p-5'
      }
    >
      <div>
        <img
          src={data?.photoURL as string}
          alt='profile-picture'
          height={50}
          width={50}
          className='rounded-full'
        />
        {user?.uid == data?.uid ? <span>You</span> : <span>{data.displayName}</span>}
      </div>
      <div
        className={
          user?.uid == data?.uid
            ? 'flex m-auto mr-6 ml-32 whitespace-pre-line p-3 bg-cyan-500 rounded-3xl'
            : 'flex m-auto ml-6 mr-32 whitespace-pre-line p-3 bg-cyan-500 rounded-3xl'
        }
      >
        <span>{data.message}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
