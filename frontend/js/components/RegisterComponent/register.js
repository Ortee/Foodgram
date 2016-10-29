import React, { Component } from 'react';
import { Col, Label, Button } from 'reactstrap';
import './register.scss';

class Register extends Component{
  constructor(props) {
    super();
  }
  render = () => {
    return(
      <section>
        <Col xs={{size:8, offset: 2}}>
          <span className="register-logo">Foodgram</span>
        </Col>
        <Col xs={{size:10, offset: 1}} className="register">
          <span>Zarejestruj się, aby przeglądać zdjęcia i filmy znajomych.</span>
          <hr />
          <Label hidden>Email</Label>
          <input type="email" ref="email" placeholder="Email" className="form-control register-input"/>
          <Label hidden>Username</Label>
          <input type="text" ref="Username" placeholder="Username" className="form-control register-input"/>
          <Label hidden>Login</Label>
          <input type="text" ref="login" placeholder="Login" className="form-control register-input"/>
          <Label hidden>Password</Label>
          <input type="password" ref="password" placeholder="Password" className="form-control register-input"/>
          <Button type="submit" className="register-button">Dalej</Button>
          <Col className="register-rules-text">
            Rejestracja oznacza zgodę na nasze Regulamin i Zasady ochrony prywatności.
          </Col>
        </Col>
      </section>
    )
  }
}

export default Register;
