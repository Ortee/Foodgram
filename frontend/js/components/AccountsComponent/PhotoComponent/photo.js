import React, { Component } from 'react';
import { Col, Button } from 'reactstrap';
import validator from 'validator';
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
      if (new RegExp(/^data:image.(jpeg|jpg|png);base64/).test(reader.result) === false) {
        this.props.addAlert('Wrong File Extension!', 'danger');
        this.setState({ image: null });
      } else {
        if (Buffer.byteLength(reader.result, 'utf8') < 2097152) {
          this.setState({
            image: reader.result,
          });
          this.props.addAlert('Photo loaded correctly!', 'success');
        } else {
          this.props.addAlert('Photo is too large!', 'danger');
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
      this.props.addAlert('Invalid photo!', 'danger');
    } else {
      if (new RegExp(/^(#[a-zA-Z0-9]+)(\s#[a-zA-Z0-9]+)*$/).test(this.state.hashTags) === true) {
        if (!validator.isLength(this.state.description, {min: 2, max: 250})) {
          this.props.addAlert('Description is too long or too short (min: 2, max: 250 letters).', 'danger');
        } else if (!validator.isLength(this.state.hashTags, {min: 2, max: 250})) {
          this.props.addAlert('Hashtags is too long or too short (min: 2, max: 250 letters).', 'danger');
        } else if (!validator.isAscii(this.state.hashTags)) {
          this.props.addAlert('Incorrect hashTags', 'danger');
        } else if (!validator.isAscii(this.state.description)) {
          this.props.addAlert('Incorrect description', 'danger');
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
        this.props.addAlert('Invalid hashtags!', 'danger');
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
