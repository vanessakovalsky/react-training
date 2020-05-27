import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
    <nav>
      <div className="nav-wrapper">
        <a href="/" className="brand-logo">Demo</a>
        <ul id="nav-mobile" className="right">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/hall-of-fame">Hall of fame</Link></li>
        </ul>
      </div>
    </nav>
  );