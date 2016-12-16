import React, { Component } from 'react';
import { Col, Button } from 'reactstrap';
import AccountsInput from '../accountsInput';
import UserInformations from '../userInformations';
import './password.scss';
import validator from 'validator';

class Password extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      newPassword: '',
      newPassword2: '',
      oldPassword: '',
    };
  }
  render = () => {
    return (
      <article className="password">
        <UserInformations {...this.props}/>
        <Col id="password-section">
          <form ref="passwordForm" onSubmit={this.handleSubmit} className="form-inline">
            <AccountsInput onChange={this.updateOldPassword} text="Old password" type="password" refer="oldpassword" placeholder="Old password"/>
            <AccountsInput onChange={this.updateNewPassword} text="New password" type="password" refer="newpassword" placeholder="New password"/>
            <AccountsInput onChange={this.updateNewPassword2} text="New password" type="password" refer="newpassword2" placeholder="New password"/>
            <Button type="submit" className="auth-button">Change password</Button>
          </form>
        </Col>
      </article>
    );
  }

  updateNewPassword = (text) => {
    this.setState({newPassword: text});
  }

  updateNewPassword2 = (text) => {
    this.setState({newPassword2: text});
  }

  updateOldPassword = (text) => {
    this.setState({oldPassword: text});
  }

  handleSubmit(e) {
    e.preventDefault();
    if (validator.isEmpty(this.state.oldPassword) ||
    validator.isEmpty(this.state.newPassword) ||
    validator.isEmpty(this.state.newPassword2)) {
      this.props.addAlert('Some of the fields are empty', 'danger');
    } else {
      !validator.equals(this.state.newPassword, this.state.newPassword2) ?
      this.props.addAlert('New passwords are different.', 'danger') :
      this.props.updatePassword(this.props.auth.login, this.state, this.props.auth.token);
      this.setState({
        newPassword: '',
        newPassword2: '',
        oldPassword: '',
      });
      this.refs.passwordForm.reset();
    }
  }
}

Password.propTypes = {
  addAlert: React.PropTypes.func,
  auth: React.PropTypes.object,
  updatePassword: React.PropTypes.func,
};

export default Password;
