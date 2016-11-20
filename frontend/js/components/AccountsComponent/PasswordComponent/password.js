import React, { Component } from 'react';
import { Col, Button } from 'reactstrap';
import AccountsInput from '../accountsInput';
import UserInformations from '../userInformations';
import './password.scss';

class Password extends Component {
  constructor(props) {
    super(props);
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
          <form ref="passwordForm" className="form-inline">
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
    this.state.newPassword === null ||
    this.state.newPassword2 === null ||
    this.state.oldPassword === null ?
    this.props.addAlert('Error!', 'danger') :
    this.props.updatePassword(this.props.auth.login, this.state);
    this.setState({
      newPassword: '',
      newPassword2: '',
      oldPassword: '',
    });
    this.refs.passwordForm.reset();
  }
}

Password.propTypes = {
  addAlert: React.PropTypes.func,
  update: React.PropTypes.func,
  auth: React.PropTypes.object,
  updatePassword: React.PropTypes.object,
};

export default Password;
