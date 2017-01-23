import React, { Component } from 'react';
import Relay from 'react-relay';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class Navigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.userInfo.userName,
    }
  }

  render() {
    console.log('Navigator props', this.props);
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Memoirs</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">Memoirs</NavItem>
          <NavDropdown eventKey={3} title={this.state.name} id="basic-nav-dropdown">
            <MenuItem eventKey={3.3}>Create Memoir</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    )
  }
}

export default Relay.createContainer(Navigator, {
  fragments: {
    userInfo: () => Relay.QL`
      fragment on UserInfo {
        userName
      }
    `,
  }
})
