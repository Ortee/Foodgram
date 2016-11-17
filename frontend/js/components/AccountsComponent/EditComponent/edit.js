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
      restName: '',
      description: '',
      address: '',
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

  updateDescription = (text) => {
    this.setState({description: text});
  }

  updateAddress = (text) => {
    this.setState({address: text});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.state.restName.length !== 0 ? this.props.updateRestName(this.props.auth.login, this.state.restName) : ()=>{};
    this.state.description.length !== 0 ? this.props.updateDescription(this.props.auth.login, this.state.description) : ()=>{};
    this.state.address.length !== 0 ? this.props.updateAddress(this.props.auth.login, this.state.address) : ()=>{};
    this.refs.editForm.reset();
  }
}

Edit.propTypes = {
  auth: React.PropTypes.object,
  updateRestName: React.PropTypes.func,
  updateDescription: React.PropTypes.func,
  updateAddress: React.PropTypes.func,
  user: React.PropTypes.object,
};

export default Edit;
