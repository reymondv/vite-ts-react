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
} from 'firebase/firestore';

export function getMessages() {
  const docRef = collection(db, 'messages');
  return query(docRef, orderBy('created_at', 'desc'), limit(5));
}

export async function getNextMessage() {
  const documentSnapshots = await getDocs(getMessages());

  const lastMessage = documentSnapshots.docs[documentSnapshots.docs.length - 1];
  console.log();

  const nextQuery = query(
    collection(db, 'messages'),
    orderBy('created_at', 'desc'),
    startAfter(lastMessage),
    limit(5),
  );

  return nextQuery;
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
