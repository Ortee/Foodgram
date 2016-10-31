import React, { Component } from 'react';
import { Col, Label, Button } from 'reactstrap';
import './login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
  }
  render = () => {
    return (
      <section className="login">
        <Col className="logo-container">
          <span className="auth-logo">Foodgram</span>
        </Col>
        <Col xs={{ size: 10, offset: 1}} id="form">
          <form ref="loginForm" className="form-inline">
            <Label hidden>Login</Label>
            <input type="text" ref="login" placeholder="Login" className="form-control auth-input"/>
            <Label hidden>Password</Label>
            <input type="password" ref="password" placeholder="Password" className="form-control auth-input"/>
            <Button type="submit" className="auth-button">Log in</Button>
          </form>
        </Col>
      </section>
    );
  }
};

export default Login;
