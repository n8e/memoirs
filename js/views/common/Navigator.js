import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link, hashHistory } from 'react-router';
import { clearLoginObj } from '../../reusable/auth';

const doLogout = () => clearLoginObj();

class Navigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOverlay: true,
      widthSize: window.outerWidth,
      isClosed: false,
      toggled: null,
    };

    this.goToMemoir = this.goToMemoir.bind(this);
    this.hamburgerCross = this.hamburgerCross.bind(this);
  }

  hamburgerCross() {
    if (this.state.isClosed) {
      document.getElementById('hamburger-element').classList.remove('is-open');
      document.getElementById('hamburger-element').classList.add('is-closed');
      this.setState({ isClosed: false, showOverlay: false, toggled: null });
    } else {
      document.getElementById('hamburger-element').classList.remove('is-closed');
      document.getElementById('hamburger-element').classList.add('is-open');
      this.setState({ isClosed: true, showOverlay: true, toggled: 'toggled' });
    }
  }

  goToMemoir() {
    hashHistory.push('/memoir');
    this.setState({ isClosed: true, showOverlay: true, toggled: 'toggled' });
  }

  render() {
    return (
      <div>
        { (this.state.widthSize >= 768) ?
          (
            <Navbar className="navbar-overall">
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/welcome" className="nav-dropdown-menu">Memoirs</Link>
                </Navbar.Brand>
              </Navbar.Header>
              <Nav className="floating-right-nav-item">
                <NavDropdown
                  title={this.props.userInfo.name}
                  id="basic-nav-dropdown"
                  className="nav-dropdown-menu"
                >
                  <MenuItem href="#/memoir" onClick={this.goToMemoir}>Create Memoir</MenuItem>
                  <MenuItem divider />
                  <MenuItem href="#/login" onClick={doLogout}>Logout</MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar>
          ) : (
            <div id="wrapper" className={this.state.toggled}>
              {
                this.state.showOverlay ?
                  <div
                    className="overlay"
                    style={{ display: this.state.isClosed ? 'block' : 'none' }}
                  />
                : null
              }
              <nav
                className="navbar navbar-inverse navbar-fixed-top"
                id="sidebar-wrapper"
                role="navigation"
              >
                <ul className="nav sidebar-nav">
                  <li className="sidebar-brand">
                    <Link to={'/welcome'} onClick={this.hamburgerCross}>
                      Memoirs
                    </Link>
                  </li>
                  <li>
                    <Link to={'/welcome'} onClick={this.hamburgerCross}><i className="fa fa-fw fa-home" />
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to={'/memoir'} onClick={this.hamburgerCross}><i className="fa fa-fw fa-file" />
                      Create Memoir
                    </Link>
                  </li>
                  <li>
                    <Link to={'/login'} onClick={this.doLogout}><i className="fa fa-fw fa-sign-out" />
                      Logout
                    </Link>
                  </li>
                </ul>
              </nav>
              <div id="page-content-wrapper">
                <button
                  id="hamburger-element"
                  type="button"
                  className="hamburger is-closed animated fadeInLeft"
                  onClick={this.hamburgerCross}
                >
                  <span className="hamb-top" />
                  <span className="hamb-middle" />
                  <span className="hamb-bottom" />
                </button>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

Navigator.propTypes = {
  userInfo: PropTypes.object.isRequired,
};

export default Navigator;
