import React, { Component } from 'react';
import { Col, Label, Button } from 'reactstrap';
import { Link } from 'react-router';
import './auth.scss';

class Auth extends Component{
  constructor(props) {
    super(props);
  }

  afterRightPanel = () => {
    return(
      <Col xs={{size:12}} md={{size:7, offset: 5}} lg={{size:6, offset:6}} className="register-footer">
        Masz konto? <Link className="register-login-text" to={'/login'}>Zaloguj się</Link>
      </Col>
    );
  }

  render = () => {
    return(
      <section>
        <Col xs={{size: 12}} md={{size: 8, offset: 2}} lg={{size: 8, offset: 2}}>
          <Col xs={{size:6}} md={{size:5}} lg={{size:6}} className="left-panel">
            <img  className="img-thumbnail"
                  height="600px"
                  width="538px"
                  src="./assets/burger.png">
            </img>
          </Col>
          <Col xs={{size:12}} md={{size:7}} lg={{size:6}} className="right-panel">
            { React.cloneElement(this.props.children.props.children, this.props) }
          </Col>
          { this.afterRightPanel() }
        </Col>
      </section>
    )
  }
}

export default Auth;
