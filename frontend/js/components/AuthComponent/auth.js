import React, { Component } from 'react';
import { Col } from 'reactstrap';
import { Link } from 'react-router';
import './auth.scss';

class Auth extends Component {
  constructor(props) {
    super(props);
  }
  render = () => {
    return (
      <section className="auth">
        <Col xs={{size: 12}} md={{size: 8, offset: 2}} lg={{size: 8, offset: 2}}>
          <Col xs={{ size: 6}} md={{ size: 5}} lg={{ size: 6}} id="left-panel">
            <img  className="img-thumbnail"
                  height="600px"
                  width="538px"
                  src="./assets/burger.png" />
          </Col>
          <Col xs={{ size: 12}} md={{ size: 7}} lg={{ size: 6}} id="right-panel">
            { React.cloneElement(this.props.children.props.children, this.props) }
          </Col>
          { this.afterRightPanel(this.props.children.props.children.type.name) }
        </Col>
      </section>
    );
  }
  afterRightPanel = (childrenName) => {
    if ( childrenName === 'Register') {
      return (
        <Col xs={{ size: 12}} md={{ size: 7, offset: 5}} lg={{ size: 6, offset: 6}} className="auth-footer">
          {'Have an account?'}<Link className="footer-text" style={{ textDecoration: 'none' }} to={'/login'}>{' Log in'}</Link>
        </Col>
      );
    }
    return (
      <Col xs={{ size: 12}} md={{ size: 7, offset: 5}} lg={{ size: 6, offset: 6}} className="auth-footer">
        {'Don`t have an account?'}<Link className="footer-text" style={{ textDecoration: 'none' }} to={'/register'}>{' Sign up'}</Link>
      </Col>
    );
  }
}

Auth.propTypes =  {
  children: React.PropTypes.element.isRequired,
};

export default Auth;
