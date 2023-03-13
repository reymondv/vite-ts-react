import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export type LastDoc = QueryDocumentSnapshot<DocumentData> | undefined;
export type LimitQuery = number;
export type Message = string | undefined;
export type DisplayName = string | null;
export type UID = string | null;
export type PhotoURL = string | null;
