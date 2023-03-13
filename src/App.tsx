import React from 'react';
import './App.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';

import Home from './components/home/Home';
import Header from './components/header/Header';
import { Login } from './components/authentication/GoogleAuthenticate';

const App = () => {
  const [user] = useAuthState(auth);
  return (
    <div className='App flex justify-center items-center'>
      <Header />
      {user ? <Home /> : <Login />}
    </div>
  );
};

export default App;
