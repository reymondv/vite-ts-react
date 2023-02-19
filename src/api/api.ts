import { User } from 'firebase/auth';
import { db } from '../config/firebase';
import {
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  limit,
  getDocs,
  startAfter,
  DocumentData,
} from 'firebase/firestore';

export async function getNextMessage() {
  const data = new Array<DocumentData>();
  const documentSnapshots = await getDocs(collection(db, 'messages'));

  const lastMessage = documentSnapshots.docs[documentSnapshots.docs.length - 1];

  const nextQuery = await getDocs(
    query(
      collection(db, 'messages'),
      orderBy('created_at', 'desc'),
      startAfter(lastMessage),
      limit(25),
    ),
  );

  nextQuery.forEach((doc) => {
    const message = doc.data();
    data.push(message);
  });

  return data;
}

export async function addMessage(
  message: string | undefined,
  displayName: string | null,
  uid: string | null,
  photoURL: string | null,
) {
  return await addDoc(collection(db, 'messages'), {
    displayName: displayName,
    message: message,
    uid: uid,
    photoURL: photoURL,
    created_at: serverTimestamp(),
  }).catch((e) => console.error('Error adding document: ', e));
}
