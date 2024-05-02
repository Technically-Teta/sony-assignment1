import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import Nav from './components/Nav/Nav';
import Books from './components/Books/Books';
import Profile from "./components/Authentication/Profile";
import Loading from "./components/Authentication/Loading";
import AuthenticationButton from './components/Authentication/AuthenticationButton';

import './App.css';

class App extends React.Component {
  render() {

    const { isLoading } = useAuth0();
    const { user } = useAuth0();
    if (isLoading) {
      return <Loading />;
    } 





    return (
      <div className="App"> 
        <Router> {/* Wrap your Routes inside a Router */}
          <Nav />
          <AuthenticationButton />
          <Routes>
            <Route path="/" exact component={Books} />
            <Route path="api/myprofile" element={<Profile user={user}/>} /> 
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
