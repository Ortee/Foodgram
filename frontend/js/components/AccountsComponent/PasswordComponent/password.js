import React, { Component } from 'react';
import { Col, Button } from 'reactstrap';
import AccountsInput from '../accountsInput';
import UserInformations from '../userInformations';
import './password.scss';

class Password extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render = () => {
    return (
      <article className="password">
        <UserInformations {...this.props}/>
        <Col id="password-section">
          <form ref="passwordForm" className="form-inline">
            <AccountsInput text="Old password" type="password" refer="username" placeholder="Old password"/>
            <AccountsInput text="New password" type="password" refer="description" placeholder="New password"/>
            <AccountsInput text="New password" type="password" refer="smth" placeholder="New password"/>
            <Button type="submit" className="auth-button">Change password</Button>
          </form>
        </Col>
      </article>
    );
  }
}



Password.propTypes = {
};

export default Password;
