import React, { Component } from 'react';
import { Col } from 'reactstrap';
import config from '../../config';
import './userInformations.scss';

class UserInformations extends Component {
  constructor(props) {
    super(props);
  }
  render = () => {
    return (
      <Col xs={{size: 10, offset: 1}} id="information-account">
        <Col xs={{size: 2}} className="avatar">
          <img  className="img-thumbnail"
                height="75px"
                width="75px"
                src={this.props.user.avatar !== false ? config.image + this.props.user.login + '?type=avatar' : config.avatar}/>
        </Col>
        <Col xs={{size: 12}} md={{size: 8}} id="username">
          <span>{this.props.user.rest_name}</span>
        </Col>
      </Col>
    );
  }
}

UserInformations.propTypes = {
  user: React.PropTypes.object,
};

export default UserInformations;
