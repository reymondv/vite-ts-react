import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export type LastDoc = QueryDocumentSnapshot<DocumentData> | undefined;
export type LimitQuery = number;
export type Message = string | undefined;
export type displayName = string | null;
export type uid = string | null;
export type photoURL = string | null;
