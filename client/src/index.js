import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import './index.css';
import Navbar from './Navbar';
// import Home from './Home';
import Room from './Room';
import registerServiceWorker from './registerServiceWorker';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

ReactDOM.render(
  <Router>
    <div>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/room" component={Room} />
    </div>
  </Router>,
  document.getElementById('root'));
registerServiceWorker();
