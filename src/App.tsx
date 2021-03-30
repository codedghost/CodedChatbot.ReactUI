import './App.scss';
import { useState } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import NavBar from './components/Navbar/NavBar';

import Home from './pages/Home/Home';
import Info from './pages/Stream/Info/Info';
import Playlist from './pages/Stream/Playlist/Playlist';

function App(){
  const [username, setUsername] = useState<string>("");
  const [loginUrl, setLoginUrl] = useState<string>("#");

  
  return (
    <div className="appContent">
      <BrowserRouter>
        <NavBar CurrentUsername={username} LoginUrl={loginUrl} SetUsernameCallback={setUsername} SetLoginUrlCallback={setLoginUrl}  />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/stream/info">
          <Info />
        </Route>
        <Route exact path="/stream/playlist">
          <Playlist Username={username} LoginUrl={loginUrl} />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
