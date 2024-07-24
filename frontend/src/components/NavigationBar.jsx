import React from 'react';
import '../styles/NavigationBar.css';
import { useNavigate } from 'react-router-dom';


function NavigationBar() {

  const navigate = useNavigate();

  const handleLogoutNavigation = () => {
    navigate('/logout');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">PrepTalk</a>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/" className="nav-link">About</a>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link">Contact</a>
        </li>
        <li className="nav-item">
          <a href="/" onClick={handleLogoutNavigation} className="nav-link">Logout</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
