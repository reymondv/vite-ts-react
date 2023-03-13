import React, { MutableRefObject, useRef, useState } from 'react';
import { addMessage } from '../../api/api';
import { auth } from '../../config/firebase';

interface Ref {
  divRef: MutableRefObject<HTMLDivElement | null>;
}

const ChatInput = ({ divRef }: Ref) => {
  const [message, setMessage] = useState<string>('');
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message == '') return;

    if (!auth.currentUser) return;

    const { displayName, uid, photoURL } = auth.currentUser;
    addMessage(message, displayName, uid, photoURL);

    setMessage('');

    divRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='container flex m-auto self-end'>
      <form
        onSubmit={sendMessage}
        className='flex w-full p-2 bg-white justify-evenly'>
        <div className='w-[80%]'>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='m-auto h-12 rounded-full px-6 w-full bg-gray-100 border border-gray-400 focus-visible:outline-none focus:bg-gray-50'
            type='text'
            id='chat-message'
            placeholder='Write your message'
          />
        </div>
        <button
          className='rounded-full px-8 bg-amber-400 font-semibold text-white disabled:opacity-50 hover:enabled:bg-amber-500'
          disabled={message == ''}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
