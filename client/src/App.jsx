import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {  Route, Routes } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Books from './components/Books/Books';
import Profile from "./components/Authentication/Profile";
import Loading from "./components/Authentication/Loading";
import AuthenticationButton from './components/Authentication/AuthenticationButton';
import './App.css';

function App() {
  const { isLoading, user } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App"> 
      
        <Nav />
        <AuthenticationButton />
        <Routes>
          <Route path="/" exact element={<Books />} />
          <Route path="api/myprofile" element={<Profile user={user}/>} /> 
        </Routes>
       
    </div>
  );
}

export default App;
