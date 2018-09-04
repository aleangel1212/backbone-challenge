import React, { Component } from 'react';

import logo from '../img/logo.png';

class Navbar extends Component {
  state = {
    active: false,
  };

  toggleNavBar() {
    this.setState({ active: !this.state.active });
  }

  render() {
    const { active } = this.state;

    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-item">
            <img src={logo} alt="Logo" width="112" height="28" />
          </div>
          <div
            className={`navbar-burger burger ${active ? 'is-active' : ''}`}
            onClick={this.toggleNavBar.bind(this)}
          >
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className={`navbar-menu ${active ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <div className="navbar-item">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  placeholder="Search"
                  onChange={e => this.props.ps.search(e.target.value)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-search" />
                </span>
              </p>
            </div>
            <div className="navbar-item">
              <div className="control">
                <a
                  className="button is-text"
                  onClick={() => {
                    this.toggleNavBar();
                    this.props.ps.toggleModal();
                  }}
                >
                  <span className="icon">
                    <i className="fas fa-plus" />
                  </span>
                  <span>Product</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
