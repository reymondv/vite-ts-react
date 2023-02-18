import React, { useRef } from 'react';
import { getMessages, getNextMessage } from '../../api/api';
import { useCollection } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { AlwaysScrollToBottom } from '../util/Utility';
const ChatRoom = () => {
  const [value, loading, error] = useCollection(getMessages(), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const getMoreMessages = async () => {
    getNextMessage();
  };

  const endMessageRef = useRef<null | HTMLDivElement>(null);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>ERROR: {JSON.stringify(error)}</div>;
  return (
    <main className='h-[92vh] flex flex-col'>
      <div className='m-auto container'>
        <h1>Chat Room</h1>
      </div>
      <div className='container m-auto overflow-y-auto min-h-0'>
        <div className='bg-neutral-200'>
          <div>
            <button onClick={getMoreMessages}>See more</button>
          </div>
          {value?.docs.map((doc) => (
            <React.Fragment key={doc.id}>
              <ChatMessage data={doc.data()} />
            </React.Fragment>
          ))}
        </div>
        <AlwaysScrollToBottom value={value} />
      </div>
      <ChatInput divRef={endMessageRef} />
    </main>
  );
};

export default ChatRoom;
