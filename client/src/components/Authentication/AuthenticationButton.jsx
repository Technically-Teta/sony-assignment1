import React from 'react';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';


const saveUser = (user) => {
    return fetch("/api/me", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
}

const AuthenticationButton = () => {
  const { isAuthenticated, user } = useAuth0();

  useEffect(()=>{
    if(isAuthenticated){
        saveUser(user);
    }
  }, [isAuthenticated, user]);

  return (
    <div className='login'>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </div>
  )
};

export default AuthenticationButton;