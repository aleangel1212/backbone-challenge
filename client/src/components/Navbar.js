import React from 'react';

import logo from '../img/logo.png';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-brand">
      <a className="navbar-item">
        <img src={logo} alt="Logo" width="112" height="28" />
      </a>
      <div
        className="navbar-burger burger"
        data-target="navbarExampleTransparentExample"
      >
        <span />
        <span />
        <span />
      </div>
    </div>

    <div className="navbar-menu">
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="control">
            <a className="button" target="_blank">
              <span className="icon">
                <i className="fas fa-plus" />
              </span>
              <span>Add Product</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
