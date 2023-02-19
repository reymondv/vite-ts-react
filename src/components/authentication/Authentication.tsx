import React, { useState } from 'react';
import { auth, googleAuthProvider } from '../../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

const Authentication = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string | null>();

  const handleSubmit = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((data) => setName(data.user.email))
      .catch((error) => console.log(error));
  };

  const handleGoogleLogin = async () => {
    await signInWithPopup(auth, googleAuthProvider)
      .then((data) => setName(data.user.email))
      .catch((error) => console.log(error));
  };

  const logout = async () => {
    await signOut(auth)
      .then((data) => {
        setName(null);
        setPassword('');
        setEmail('');
      })
      .catch((error) => console.log(error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.name == 'email' && setEmail(e.target.value);
    e.target.name == 'password' && setPassword(e.target.value);
  };

  return (
    <>
      {auth.currentUser ? (
        <div>
          Signed in {auth.currentUser?.email}{' '}
          <button className='bg-red-500' onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h1> {name} </h1>
          <div className='email'>
            <label htmlFor='email'>Email Address</label>
            <input
              type='text'
              name='email'
              className='rounded-md border-black border px-2 ml-1'
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div className='password'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              className='rounded-md border-black border px-2 ml-1'
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleSubmit} className='rounded-md bg-sky-500 px-2'>
            Submit
          </button>
          <button onClick={handleGoogleLogin} className='rounded-md bg-green-500 px-2'>
            Sign-in with Google
          </button>
          <button onClick={logout} className='rounded-md bg-red-500 px-2'>
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Authentication;
