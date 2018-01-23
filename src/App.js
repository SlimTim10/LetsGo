import React, { Component } from 'react';
import './App.css';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <span className="navbar-user">{this.props.username}</span>
        <a href="/" className="navbar-brand">Let&apos;s Go</a>
      </nav>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar username="Tim" />
      </div>
    );
  }
}

export default App;
