import React, { Component } from 'react';
import { Col, Button } from 'reactstrap';
import validator from 'validator';
import UserInformations from '../userInformations';
import AccountsInput from '../accountsInput';
import { addFoodText } from '../../../alertsConfig';
import { isHashTag, isPhoto, checkPhotoSize } from '../../../foodgramValidator';
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
            <AccountsInput onChange={this.updateDescription} text="Description" type="text" refer="description" placeholder="Picture description"/>
            <AccountsInput onChange={this.updateHashTags} text="Hashtags" type="text" refer="hashTags" placeholder="#food"/>
            <Button type="submit" className="auth-button">Add</Button>
          </form>
        </Col>
      </article>
    );
  }

  updateImage = (text, e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      if (!isPhoto(reader.result)) {
        this.props.addAlert(addFoodText.photo.extension, 'danger');
        this.setState({ image: null });
      } else {
        if (checkPhotoSize(reader.result)) {
          this.setState({ image: reader.result });
          this.props.addAlert(addFoodText.photo.loaded, 'success');
        } else {
          this.props.addAlert(addFoodText.photo.large, 'danger');
          this.setState({ image: null });
        }
      }
    };
    reader.readAsDataURL(file);
  }

  updateDescription = (text) => {
    this.setState({description: text});
  }

  updateHashTags = (text) => {
    this.setState({hashTags: text});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.image === null) {
      this.props.addAlert(addFoodText.photo.invalid, 'danger');
    } else {
      if (isHashTag(this.state.hashTags)) {
        if (!validator.isLength(this.state.description, {min: 2, max: 250})) {
          this.props.addAlert(addFoodText.description.length, 'danger');
        } else if (!validator.isLength(this.state.hashTags, {min: 2, max: 250})) {
          this.props.addAlert(addFoodText.hashtags.length, 'danger');
        } else if (!validator.isAscii(this.state.hashTags)) {
          this.props.addAlert(addFoodText.hashtags.ascii, 'danger');
        } else if (!validator.isAscii(this.state.description)) {
          this.props.addAlert(addFoodText.description.ascii, 'danger');
        } else {
          this.props.addFood(this.props.auth.login, this.props.auth.rest_name, this.state, this.props.auth.token);
          this.setState({
            image: null,
            description: null,
            hashTags: null,
          });
          this.refs.photoForm.reset();
        }
      } else {
        this.props.addAlert(addFoodText.hashtags.invalid, 'danger');
      }
    }
  }
}

Photo.propTypes = {
  addAlert: React.PropTypes.func,
  addFood: React.PropTypes.func,
  auth: React.PropTypes.object,
};

export default Photo;
