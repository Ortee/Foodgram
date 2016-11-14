import React, { Component } from 'react';
import { Col, Button } from 'reactstrap';
import UserInformations from '../userInformations';
import AccountsInput from '../accountsInput';
import './photo.scss';

class Photo extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render = () => {
    return (
      <article className="photo">
        <UserInformations/>
        <Col id="photo-section">
          <form ref="photoForm" className="form-inline">
            <AccountsInput text="Upload picture" type="file" refer="image" accept="image/*"/>
            <AccountsInput text="Description" type="text" refer="description" placeholder="Picture description"/>
            <AccountsInput text="Hashtags" type="text" refer="hashtags" placeholder="#food"/>
            <Button type="submit" className="auth-button">Add</Button>
          </form>
          <Button type="button" onClick={this.props.logout.bind()} className="auth-button">TEMP LOGOUT</Button>
        </Col>
      </article>
    );
  }
}



Photo.propTypes = {
};

export default Photo;
