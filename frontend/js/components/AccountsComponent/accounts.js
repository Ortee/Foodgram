import React, { Component } from 'react';
import { Link } from 'react-router';
import { Col } from 'reactstrap';
import './accounts.scss';

class Accounts extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render = () => {
    return (
      <section className="accounts">
        <Col>
          <Col xs={{size: 12}} lg={{size: 10, offset: 1}} id="main">
            <Col xs={{size: 3}} id="menu">
              <ul>
                <Link style={{ textDecoration: 'none' }} to={'/accounts/photo'}><li>Add photo</li></Link>
                <Link style={{ textDecoration: 'none' }} to={'/accounts/edit'}><li>Edit profile</li></Link>
                <Link style={{ textDecoration: 'none' }} to={'/accounts/password'}><li>Change password</li></Link>
              </ul>
            </Col>
            <Col xs={{size: 9}} id="content">
              { React.cloneElement(this.props.children.props.children, this.props) }
            </Col>
          </Col>
        </Col>
      </section>
    );
  }
}

Accounts.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default Accounts;
