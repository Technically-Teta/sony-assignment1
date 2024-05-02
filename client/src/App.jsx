import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import Nav from './components/Nav/Nav';
import Books from './components/Books/Books';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App"> 
        <Router> {/* Wrap your Routes inside a Router */}
          <Nav />
          <Routes>
            <Route path="/" exact component={Books} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
