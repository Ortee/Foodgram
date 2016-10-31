import React, { Component } from 'react';
import { Col, Label, Button } from 'reactstrap';
import './register.scss';

class Register extends Component {
  constructor() {
    super();
  }
  render = () => {
    return (
      <section className="register">
        <Col id="logo-container">
          <span className="auth-logo">Foodgram</span>
        </Col>
        <Col xs={{ size: 10, offset: 1}} id="form">
          <span>Sign up to add photos and comment from your favourite restaurant.</span>
          <hr />
          <form ref="registerForm" className="form-inline">
            <Label hidden>Email</Label>
            <input type="email" ref="email" placeholder="Email" className="form-control input"/>
            <Label hidden>Restaurant Name</Label>
            <input type="text" ref="Username" placeholder="Username" className="form-control input"/>
            <Label hidden>Login</Label>
            <input type="text" ref="login" placeholder="Login" className="form-control input"/>
            <Label hidden>Password</Label>
            <input type="password" ref="password" placeholder="Password" className="form-control input"/>
            <Button type="submit" id="button">Sign up</Button>
          </form>
          <Col id="rules">
            By signing up, you agree to our Terms & Privacy Policy.
          </Col>
        </Col>
      </section>
    );
  }
}

export default Register;
