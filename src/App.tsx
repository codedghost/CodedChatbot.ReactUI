import React from 'react';
import logo from './logo.svg';
import './App.scss';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import NavBar from './components/Navbar/NavBar';

import Home from './pages/Home';

function App(){
  
  return (
    <div className="appContent">
      <NavBar />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
      </Router>
    </div>
  );
}

export default App;
