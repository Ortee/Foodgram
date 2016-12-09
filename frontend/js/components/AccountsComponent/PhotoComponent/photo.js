import React, { Component } from 'react';
import { Col, Button } from 'reactstrap';
import UserInformations from '../userInformations';
import AccountsInput from '../accountsInput';
import './photo.scss';

class Photo extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      image: null,
      description: null,
      hashTags: null,
    };
  }
  render = () => {
    return (
      <article className="photo">
        <UserInformations {...this.props}/>
        <Col id="photo-section">
          <form ref="photoForm" onSubmit={this.handleSubmit} className="form-inline">
            <AccountsInput onChange={this.updateImage} text="Upload picture" type="file" refer="image" accept="image/*" id="img-input"/>
            {/* <AccountsInput onChange={this.updateImage} text="Upload picture" type="text" refer="image" placeholder="Url to image"/> */}
            <AccountsInput onChange={this.updateDescription} text="Description" type="text" refer="description" placeholder="Picture description"/>
            <AccountsInput onChange={this.updateHashTags} text="Hashtags" type="text" refer="hashTags" placeholder="#food"/>
            <Button type="submit" className="auth-button">Add</Button>
          </form>
          <Button type="button" onClick={this.props.logout.bind()} className="auth-button">TEMP LOGOUT</Button>
        </Col>
      </article>
    );
  }
  updateImage = (text, e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        image: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  updateDescription = (text) => {
    this.setState({description: text});
  }

  updateHashTags = (text) => {
    this.setState({hashTags: text});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.state.image === null ||
    this.state.description === null ?
    this.props.addAlert('Error!', 'danger') :
    this.props.addFood(this.props.auth.login, this.props.auth.rest_name, this.state);
    this.setState({
      image: null,
      description: null,
      hashTags: null,
    });
    this.refs.photoForm.reset();
  }
}

Photo.propTypes = {
  addAlert: React.PropTypes.func,
  addFood: React.PropTypes.func,
  auth: React.PropTypes.object,
};

export default Photo;
