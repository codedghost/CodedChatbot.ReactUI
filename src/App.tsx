import './App.scss';
import { useState, useEffect } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import NavBar from './components/Navbar/NavBar';

import Home from './pages/Home/Home';
import Info from './pages/Stream/Info/Info';
import Playlist from './pages/Stream/Playlist/Playlist';

import TwitchAuthBaseModel from './models/TwitchAuthBaseModel';

function App(){
  const [loginUrl, setLoginUrl] = useState<string>("#");
  const [authBaseModel, setAuthBaseModel] = useState<TwitchAuthBaseModel>();
  
  return (
    <div className="appContent">
      <BrowserRouter>
        <NavBar AuthBaseModel={authBaseModel} LoginUrl={loginUrl} SetLoginUrlCallback={setLoginUrl} SetAuthModelCallback={setAuthBaseModel} />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/stream/info">
          <Info />
        </Route>
        <Route exact path="/stream/playlist">
          <Playlist LoginUrl={loginUrl} {...authBaseModel} />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
