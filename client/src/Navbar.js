import React, { Component } from 'react';

import './Navbar.css';

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

export default Navbar;
