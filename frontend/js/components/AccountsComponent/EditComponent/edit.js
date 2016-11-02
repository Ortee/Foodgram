import React, { Component } from 'react';
import { Col, Button } from 'reactstrap';
import EditInput from './editInput';
import './edit.scss';

class Edit extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render = () => {
    return (
      <article className="edit">
        <Col xs={{size: 10, offset: 1}} id="information">
          <Col xs={{size: 2}}>
            <img  className="img-thumbnail"
                  height="75px"
                  width="75px"
                  src="https://static1.squarespace.com/static/55355f2fe4b0bb1e28857a4c/56991220fb36b1a2d2c69b9a/56991220a976afc919db1f65/1452872520958/MealPlans.png?format=300w"/>
          </Col>
          <Col xs={{size: 8}} id="username">
            <span>Username</span>
          </Col>
        </Col>
        <Col id="edit-section">
          <form ref="editForm" className="form-inline">
            <EditInput text="Restaurant Name" type="text" refer="username" placeholder="AwesomeBugers"/>
            <EditInput text="Description" type="text" refer="description" placeholder="Lorem ipsum"/>
            <EditInput text="Restaurant Smth" type="text" refer="smth" placeholder="Smth text from db"/>
            <Button type="submit" className="auth-button">Send</Button>
          </form>
        </Col>
      </article>
    );
  }
}



Edit.propTypes = {
};

export default Edit;
