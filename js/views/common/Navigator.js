import React, { Component } from 'react';
import Relay from 'react-relay';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import { clearLoginObj } from '../../reusable/auth';

class Navigator extends Component {
	constructor(props) {
		super(props);

		this.doLogout = this.doLogout.bind(this);
	}

	doLogout() {
		clearLoginObj();
	}

	render() {
		return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Memoirs</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">Memoirs</NavItem>
          <NavDropdown eventKey={3} title={this.props.userInfo.name} id="basic-nav-dropdown">
            <MenuItem eventKey={3.3}>Create Memoir</MenuItem>
            <MenuItem divider />
            <MenuItem href="#/login" onClick={this.doLogout}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
		);
	}
}

export default Navigator;
