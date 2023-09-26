// src/SideMenuNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';

import './CompSideMenuNavbar.css';

function SideMenuNavbar() {
  const handleNavLinkClick = (event) => {
    document.getElementById('AppTitle').textContent = event.target.textContent;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
                onClick={handleNavLinkClick}
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/pass_remover"
                className="nav-link"
                onClick={handleNavLinkClick}
              >
                Password Remover
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/help"
                className="nav-link"
                onClick={handleNavLinkClick}
              >
                Help
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className="nav-link"
                onClick={handleNavLinkClick}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
        <a className="navbar-brand ms-auto" href="www.google.com">
          HB Technologies
        </a>
      </div>
    </nav>

  );
}

export default SideMenuNavbar;