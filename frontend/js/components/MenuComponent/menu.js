import React, { Component } from 'react';
import { Link } from 'react-router';
import { Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';
import Alerts from '../AlertsComponent/alerts';
import './menu.scss';

class Menu extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const username = this.props.auth.login === null ? ' ' : this.props.auth.login.toLowerCase();
    return (
      <Navbar className="navbar-custom" fixed="top">
        <Alerts {...this.props} />
        <div className="container">
          <NavbarBrand href="/">
            <Link className="menu-icon-left" to={'/'} style={{ textDecoration: 'none' }}>
                <i id="insta-logo" className="fa fa-instagram fa-2x" aria-hidden="true"/>
                <span className="footgram-logo">Foodgram</span>
            </Link>
          </NavbarBrand>
          <Nav className="pull-xs-right" navbar>
            <NavItem>
              <Link className="menu-icon-right" to={'/accounts/photo'}>
                <i className="fa fa-compass fa-2x" aria-hidden="true"/>
              </Link>
            </NavItem>
            <NavItem>
              <Link className="menu-icon-right" to={`/profile/${username}`}>
                <i className="fa fa-heart-o fa-2x" aria-hidden="true"/>
              </Link>
            </NavItem>
            <NavItem>
              <Link className="menu-icon-right" to={`/profile/${username}`}>
                <i className="fa fa-user fa-2x" aria-hidden="true"/>
              </Link>
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    );
  }
}

Menu.propTypes = {
  auth: React.PropTypes.object,
};

export default Menu;
