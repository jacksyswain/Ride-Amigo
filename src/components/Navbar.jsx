import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🚘 Ride Amigo</div>
      <ul className="nav-links">
        <li><NavLink to="/" exact="true" activeclassname="active">Home</NavLink></li>
        <li><NavLink to="/map" activeclassname="active">Map</NavLink></li>
        <li><NavLink to="/sos" activeclassname="active">SOS</NavLink></li>
        <li><NavLink to="/settings" activeclassname="active">Settings</NavLink></li>
      </ul>
    </nav>
  );
}