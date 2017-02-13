import React, { Component } from 'react';
import Relay from 'react-relay';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';

import { clearLoginObj } from '../../reusable/auth';

class Navigator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showOverlay: true,
			widthSize: window.outerWidth,
			isClosed: false,
			toggled: null,
		};

		this.doLogout = this.doLogout.bind(this);
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

	doLogout() {
		clearLoginObj();
	}

	render() {
		console.log('NAV state', this.state);
		return (
			<div>
				{ (this.state.widthSize >= 768) ?
					(
						<Navbar>
							<Navbar.Header>
								<Navbar.Brand>
									<a href="/">Memoirs</a>
								</Navbar.Brand>
							</Navbar.Header>
						<Nav className="floating-right-nav-item">
							<NavItem eventKey={1} href="#">Memoirs</NavItem>
							<NavDropdown eventKey={3} title={this.props.userInfo.name} id="basic-nav-dropdown">
								<MenuItem eventKey={3.3}>Create Memoir</MenuItem>
								<MenuItem divider />
								<MenuItem href="#/login" onClick={this.doLogout}>Logout</MenuItem>
							</NavDropdown>
						</Nav>
						</Navbar>
					) : (
						<div id="wrapper" className={this.state.toggled}>
							{this.state.showOverlay ? <div className="overlay" style={{display: this.state.isClosed? 'block': 'none'}}></div> : null}
							<nav className="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation">
								<ul className="nav sidebar-nav">
									<li className="sidebar-brand">
										<a href="#">Memoirs</a>
									</li>
									<li>
										<a href="#"><i className="fa fa-fw fa-home"></i> Home</a>
									</li>
									<li>
										<a href="#/login"><i className="fa fa-fw fa-sign-out"></i> Logout</a>
									</li>
								</ul>
							</nav>
							<div id="page-content-wrapper">
								<button id="hamburger-element" type="button" className="hamburger is-closed animated fadeInLeft" onClick={this.hamburgerCross}>
									<span className="hamb-top"></span>
									<span className="hamb-middle"></span>
									<span className="hamb-bottom"></span>
								</button>
							</div>
						</div>
					)
				}
			</div>
		);
	}
}

export default Navigator;
