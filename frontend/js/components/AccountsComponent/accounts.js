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
    console.log(this.props);
    return (
      <section className="accounts">
        <Col xs={{size: 10, offset: 1}} id="main">
          <Col xs={{size: 3}} id="menu">
            <ul>
              <li><Link style={{ textDecoration: 'none' }} to={'/accounts/photo'}>Add photo</Link></li>
              <li><Link style={{ textDecoration: 'none' }} to={'/accounts/edit'}>Edit profile</Link></li>
              <li><Link style={{ textDecoration: 'none' }} to={'/accounts/password'}>Change password</Link></li>
            </ul>
          </Col>
          <Col xs={{size: 9}} id="content">
            { React.cloneElement(this.props.children.props.children, this.props) }
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
