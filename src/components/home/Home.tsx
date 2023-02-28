import React, { useEffect, useRef, useState } from 'react';
import { getNextMessage } from '../../api/api';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import {
  DocumentData,
  FirestoreError,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../../config/firebase';

const ChatRoom = () => {
  const [data, setData] = useState<DocumentData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FirestoreError>();
  const [startAfter, setStartAfter] = useState<QueryDocumentSnapshot<DocumentData>>();
  const topMostRef = useRef<HTMLDivElement>(null);

  const endMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = async () => {
      realTimeMessages();
    };

    unsubscribe();
  }, []);

  const realTimeMessages = async () => {
    setLoading(true);
    const documentSnapshots = await getDocs(
      query(collection(db, 'messages'), orderBy('created_at', 'desc'), limit(25)),
    );
    setStartAfter(documentSnapshots.docs[documentSnapshots?.docs.length - 1]);
    onSnapshot(
      query(collection(db, 'messages'), orderBy('created_at', 'desc'), limit(25)),
      (docs) => {
        const data = new Array<DocumentData>();
        docs.forEach((doc) => {
          data.push(doc.data());
        });
        setLoading(false);
        setData(data);
      },
      (error) => {
        setError(error);
        console.log(error);
      },
    );
  };

  const getMoreMessages = async () => {
    const { messages, lastMessage } = await getNextMessage(startAfter, 25);
    setStartAfter(lastMessage);
    setData([...(data as any[]), ...messages]);

    topMostRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>ERROR: {JSON.stringify(error)}</div>;

  return (
    <main className='h-[100vh] flex flex-col pt-12'>
      <div className='container m-auto overflow-y-auto min-h-0'>
        <div className='bg-slate-50 flex-col-reverse flex'>
          {data?.map(
            (
              doc: {
                message?: string | undefined;
                uid?: string | undefined;
                photoURL?: string | undefined;
                displayName?: string | undefined;
                created_at?:
                  | { nanosecond: number | undefined; seconds: number | undefined }
                  | undefined;
              },
              idx: React.Key | null | undefined,
            ) => (
              <React.Fragment key={idx}>
                <ChatMessage data={doc} />
              </React.Fragment>
            ),
          )}
          <div className='container flex' ref={topMostRef}>
            <button className='m-auto text-blue-500 p-3' onClick={getMoreMessages}>
              See more
            </button>
          </div>
        </div>
        {/* <AlwaysScrollToBottom value={data} /> */}
        <div ref={endMessageRef} />
      </div>
      <ChatInput divRef={endMessageRef} />
    </main>
  );
};

export default ChatRoom;
