import React, { Component } from 'react';
import { Col, Button } from 'reactstrap';
import './register.scss';
import validator from 'validator';

class Register extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render = () => {
    return (
      <section className="register">
        <Col className="logo-container">
          <span className="auth-logo">Foodgram</span>
        </Col>
        <Col xs={{ size: 10, offset: 1}} id="form">
          <span>Sign up to add photos and comment from your favourite restaurant.</span>
          <hr />
          <form ref="registerForm" onSubmit={this.handleSubmit} className="form-inline">
            <input type="text" ref="username" placeholder="Username" className="form-control auth-input"/>
            <input type="text" ref="login" placeholder="Login" className="form-control auth-input"/>
            <input type="password" ref="password" placeholder="Password" className="form-control auth-input"/>
            <input type="password" ref="passwordTwo" placeholder="Password again" className="form-control auth-input"/>
            <Button type="submit" className="auth-button">Sign up</Button>
          </form>
          <Col id="rules">
            By signing up, you agree to our Terms & Privacy Policy.
          </Col>
        </Col>
      </section>
    );
  }
  handleSubmit(e) {
    e.preventDefault();
    const username = this.refs.username.value;
    const login = this.refs.login.value;
    const password = this.refs.password.value;
    const passwordTwo = this.refs.passwordTwo.value;
    if (validator.isEmpty(username) ||
      validator.isEmpty(login) ||
      validator.isEmpty(password) ||
      validator.isEmpty(passwordTwo)) {
      this.props.addAlert('Some of the fields are empty', 'danger');
    } else if (!validator.isLength(username, {min: 5, max: undefined})) {
      this.props.addAlert('Username is too short (min: 5 letters).', 'danger');
    } else if (!validator.isLength(login, {min: 5, max: undefined})) {
      this.props.addAlert('Login is too short (min: 5 letters).', 'danger');
    } else if (!validator.isLength(password, {min: 5, max: undefined})) {
      this.props.addAlert('Password is too short (min: 5 letters).', 'danger');
    } else if (!validator.isAlphanumeric(username)) {
      this.props.addAlert('Username can contain only letters and numbers.', 'danger');
    } else if (!validator.isAlphanumeric(login)) {
      this.props.addAlert('Login can contain only letters and numbers.', 'danger');
    } else if (!validator.isAlphanumeric(password)) {
      this.props.addAlert('Password can contain only letters and numbers.', 'danger');
    } else {
      !validator.equals(password, passwordTwo) ?
      this.props.addAlert('The two passwords do not match!', 'danger') :
      this.props.register(username, login, password, passwordTwo);
    }
    this.refs.registerForm.reset();
  }
}

Register.propTypes = {
  addAlert: React.PropTypes.func,
  register: React.PropTypes.func,
};

export default Register;
