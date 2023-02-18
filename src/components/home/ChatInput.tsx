import React, { MutableRefObject, useRef } from 'react';
import { addMessage } from '../../api/api';
import { auth } from '../../config/firebase';
import { User } from 'firebase/auth';

interface Ref {
  divRef: MutableRefObject<HTMLDivElement | null>;
}

const ChatInput = ({ divRef }: Ref) => {
  const messageRef = useRef<HTMLInputElement>(null);
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!auth.currentUser) return;

    const { displayName, uid, photoURL } = auth.currentUser;
    addMessage(messageRef.current?.value, displayName, uid, photoURL);

    if (messageRef.current?.value != undefined) {
      messageRef.current.value = '';
    }

    divRef.current?.scrollIntoView({ behavior: 'smooth' });
    console.log(divRef.current);
  };

  return (
    <div className='container flex m-auto self-end mb-4'>
      <form onSubmit={sendMessage} className='flex w-full p-2 bg-white justify-evenly'>
        <div className='w-[80%]'>
          <input
            ref={messageRef}
            className='m-auto h-12 rounded-full px-6 w-full bg-gray-200 border border-gray-400'
            type='text'
            id='chat-message'
            placeholder='Write your message'
          />
        </div>
        <button className='rounded-full px-8 bg-blue-700 font-semibold text-white'>Send</button>
      </form>
    </div>
  );
};

export default ChatInput;
