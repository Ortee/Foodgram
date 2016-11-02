import React, { Component } from 'react';
import { Col } from 'reactstrap';
import './userInformations.scss';

class UserInformations extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render = () => {
    return (
      <Col xs={{size: 10, offset: 1}} id="information-account">
        <Col xs={{size: 2}} className="avatar">
          <img  className="img-thumbnail"
                height="75px"
                width="75px"
                src="https://static1.squarespace.com/static/55355f2fe4b0bb1e28857a4c/56991220fb36b1a2d2c69b9a/56991220a976afc919db1f65/1452872520958/MealPlans.png?format=300w"/>
        </Col>
        <Col xs={{size: 12}} md={{size: 8}} id="username">
          <span>Username</span>
        </Col>
      </Col>
    );
  }
}

UserInformations.propTypes = {
};

export default UserInformations;
