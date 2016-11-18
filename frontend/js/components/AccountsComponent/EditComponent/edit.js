import React, { Component } from 'react';
import { Col, Button } from 'reactstrap';
import AccountsInput from '../accountsInput';
import UserInformations from '../userInformations';
import './edit.scss';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      restName: null,
      description: null,
      address: null,
      avatar: null,
    };
  }
  componentDidMount() {
  }
  render = () => {
    return (
      <article className="edit">
        <UserInformations {...this.props}/>
        <Col id="edit-section">
          <form ref="editForm" onSubmit={this.handleSubmit} className="form-inline">
            <AccountsInput onChange={this.updateAvatar} text="Avatar" type="text" refer="avatar" placeholder={this.props.auth.avatar}/>
            <AccountsInput onChange={this.updateRestName} text="Restaurant Name" type="text" refer="restName" placeholder={this.props.auth.rest_name}/>
            <AccountsInput onChange={this.updateDescription} text="Description" type="text" refer="description" placeholder={this.props.auth.description}/>
            <AccountsInput onChange={this.updateAddress} text="Address" type="text" refer="address" placeholder={this.props.auth.address}/>
            <Button type="submit" className="auth-button">Save</Button>
          </form>
        </Col>
      </article>
    );
  }

  updateRestName = (text) => {
    this.setState({restName: text});
  }

  updateAvatar = (text) => {
    this.setState({avatar: text});
  }

  updateDescription = (text) => {
    this.setState({description: text});
  }

  updateAddress = (text) => {
    this.setState({address: text});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.state.restName === null &&
    this.state.description === null &&
    this.state.avatar === null &&
    this.state.address === null ?
    this.props.addAlert('Fields are empty!', 'danger') :
    this.props.update(this.props.auth.login, this.state);
    this.refs.editForm.reset();
  }
}

Edit.propTypes = {
  auth: React.PropTypes.object,
  update: React.PropTypes.func,
  addAlert: React.PropTypes.func,
  user: React.PropTypes.object,
};

export default Edit;
