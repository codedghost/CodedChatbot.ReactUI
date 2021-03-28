import './App.scss';
import {BrowserRouter, Route} from 'react-router-dom';

import NavBar from './components/Navbar/NavBar';

import Home from './pages/Home/Home';
import StreamInfo from './pages/StreamInfo/StreamInfo'

function App(){
  
  return (
    <div className="appContent">
      <BrowserRouter>
        <NavBar />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/stream/info">
          <StreamInfo />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
