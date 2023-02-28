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
  CollectionReference,
} from 'firebase/firestore';
import { LastDoc, LimitQuery, Message, DisplayName, UID, PhotoURL } from './types';

const col: CollectionReference<DocumentData> = collection(db, 'messages');

/**
 * Paginated query results for messages
 * @param lastDoc the last document of the collection
 * @param limit the maximum number of documents to return
 * @returns A an object containing the results of the query and last document of the collection
 */
export async function getNextMessage(lastDoc: LastDoc, limitBy: LimitQuery) {
  const messages = new Array<DocumentData>();

  const nextQuery = await getDocs(
    query(col, orderBy('created_at', 'desc'), startAfter(lastDoc), limit(limitBy)),
  );

  const lastMessage = nextQuery.docs[nextQuery.docs.length - 1];

  nextQuery.forEach((doc) => {
    const message = doc.data();
    messages.push(message);
  });

  return { messages, lastMessage };
}

/**
 * Get the last document from the collection
 * @returns A `QueryDocumentSnapshot<DocumentData>` from the collection
 */
export async function getLastDoc() {
  const documentSnapshots = await getDocs(query(col, orderBy('created_at', 'desc'), limit(25)));
  const lastDoc: LastDoc = documentSnapshots.docs[documentSnapshots?.docs.length - 1];

  return lastDoc;
}

/**
 * Add a new document to the collection of messages containing the following parameters:
 * @param message the message to be added to the collection
 * @param displayName the name of the sender of the message
 * @param uid the uid associated with the sender of the message
 * @param photoURL the URL of the photo of the sender of the message
 * @returns A `Promise` resolved with a DocumentReference pointing to the newly created document after it has been written to the backend (Note that it won't resolve while you're offline).
 */
export async function addMessage(
  message: Message,
  displayName: DisplayName,
  uid: UID,
  photoURL: PhotoURL,
) {
  return await addDoc(col, {
    displayName: displayName,
    message: message,
    uid: uid,
    photoURL: photoURL,
    created_at: serverTimestamp(),
  }).catch((e) => console.error('Error adding document: ', e));
}
