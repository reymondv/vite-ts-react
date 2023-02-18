import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA5lhGwUSQKGB2gdC-oAt3aMZGceYNKZI4',
  authDomain: 'ts-react-project-53081.firebaseapp.com',
  projectId: 'ts-react-project-53081',
  storageBucket: 'ts-react-project-53081.appspot.com',
  messagingSenderId: '895677601521',
  appId: '1:895677601521:web:442fc61ddb750cecef7b50',
  measurementId: 'G-E6DZNCZDMZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
auth.useDeviceLanguage();
const googleAuthProvider = new GoogleAuthProvider();

export { db, auth, googleAuthProvider };
