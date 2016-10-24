import React, { Component } from 'react';
import { Link } from 'react-router';
import { Nav, Col } from 'reactstrap';
import './menu.scss';

class Menu extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <Nav className="nav-menu navbar-fixed-top" inline>
        <Col xs={{size: 6}} md={{size: 4}} lg={{size: 4, offset: 1}} xl={{size: 4, offset: 2}} className="left-nav-col">
            <Link className="menu-icon-left" to={'/posts'}>
                <i class="fa fa-instagram fa-2x" aria-hidden="true" />
                <span className="footgram-logo">Foodgram</span>
            </Link>
        </Col>
        <Col xs={{size: 6}} md={{size: 8}} lg={{size: 6}} xl={{size: 4}}>
          <Link className="menu-icon-right" to={'/'}>
              <i class="fa fa-user fa-2x" aria-hidden="true"></i>
          </Link>
          <Link className="menu-icon-right" to={'/author'}>
              <i class="fa fa-heart-o fa-2x" aria-hidden="true"></i>
          </Link>
          <Link className="menu-icon-right" to={'/'}>
              <i class="fa fa-compass fa-2x" aria-hidden="true"></i>
          </Link>
        </Col>
      </Nav>
    );
  }
}

export default Menu;
