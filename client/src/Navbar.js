import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

class Navbar extends Component {
  render() {
    const username = this.props.username || "";
    
    return (
      <nav className="navbar">
        <span className="navbar-user">{username}</span>
        <NavLink to="/" className="navbar-brand">Let&apos;s Go</NavLink>
        <NavLink to="/" className="navbar-link">Home</NavLink>
        <NavLink to="/room" className="navbar-link">Room</NavLink>
      </nav>
    );
  }
}

export default Navbar;
