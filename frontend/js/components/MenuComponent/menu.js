import React, { Component } from 'react';
import { Link } from 'react-router';
import { Nav, Col, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import './menu.scss';

class Menu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Navbar className="navbar-custom" fixed="top">
        <div className="container">
          <NavbarBrand href="/">
            <Link className="menu-icon-left" to={'/posts'} style={{ textDecoration: 'none' }}>
                <i id="insta-logo" class="fa fa-instagram fa-2x" aria-hidden="true"/>
                <span className="footgram-logo">Foodgram</span>
            </Link>
          </NavbarBrand>
          <Nav className="pull-xs-right" navbar>
            <NavItem>
              <Link className="menu-icon-right" to={'/'}>
                <i class="fa fa-user fa-2x" aria-hidden="true"></i>
              </Link>
            </NavItem>
            <NavItem>
              <Link className="menu-icon-right" to={'/author'}>
                <i class="fa fa-heart-o fa-2x" aria-hidden="true"></i>
              </Link>
            </NavItem>
            <NavItem>
              <Link className="menu-icon-right" to={'/'}>
                <i class="fa fa-compass fa-2x" aria-hidden="true"></i>
              </Link>
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    );
  }
}

export default Menu;
