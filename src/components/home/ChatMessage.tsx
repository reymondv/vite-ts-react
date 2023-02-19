import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import dayjs from 'dayjs';

interface Message {
  data: {
    message?: string;
    uid?: string;
    photoURL?: string | undefined;
    displayName?: string;
    created_at?: {
      nanosecond: number | undefined;
      seconds: number | undefined;
    };
  };
}

const ChatMessage = ({ data }: Message) => {
  const [user] = useAuthState(auth);
  const dateTime =
    data.created_at?.seconds != undefined &&
    dayjs(data.created_at?.seconds * 1000).format('MMM DD YYYY [at] HH:mm A');

  return (
    <div
      className={
        user?.uid == data?.uid
          ? 'w-full flex justify-start flex-row-reverse p-5'
          : 'w-full flex justify-start p-5'
      }
    >
      <div title={user?.uid == data?.uid ? 'You' : data?.displayName}>
        <img
          src={data?.photoURL as string}
          alt='profile-picture'
          height={50}
          width={50}
          className='rounded-full max-w-xs'
        />
      </div>
      <div
        title={dateTime ? dateTime : undefined}
        className={
          user?.uid == data?.uid
            ? 'flex m-auto mr-6 ml-8 max-w-xl whitespace-pre-line p-3 bg-amber-200 rounded-3xl'
            : 'flex m-auto ml-6 mr-8 max-w-xl whitespace-pre-line p-3 bg-gray-200 rounded-3xl'
        }
      >
        <span>{data?.message}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
